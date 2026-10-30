/**
 * Offline inference on the licensed, 5-second warehouse clip.
 * Requires ffmpeg and @huggingface/transformers 3.8.1 (install separately; see docs).
 * This is a demonstration pipeline, not production tracking or inventory counting.
 */
import { pipeline, env } from "@huggingface/transformers";
import { mkdtemp, readdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { execFileSync } from "node:child_process";
const root = process.cwd();
const video = resolve(root, "public/demo/warehouse-operations.mp4");
const output = resolve(root, "src/data/warehouse-detections.json");
const dir = await mkdtemp(join(tmpdir(), "visolution-warehouse-"));
const ffmpeg = process.env.VISOLUTION_FFMPEG || "ffmpeg";
const model = "onnx-community/grounding-dino-tiny-ONNX";
env.cacheDir =
  process.env.VISOLUTION_MODEL_CACHE ||
  join(tmpdir(), "visolution-model-cache");
const iou = (a, b) => {
  const x = Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0]));
  const y = Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
  const inter = x * y;
  return (
    inter /
    ((a[2] - a[0]) * (a[3] - a[1]) + (b[2] - b[0]) * (b[3] - b[1]) - inter || 1)
  );
};
try {
  execFileSync(ffmpeg, [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    video,
    "-vf",
    "fps=2,scale=960:540",
    join(dir, "frame-%03d.jpg"),
  ]);
  const detector = await pipeline("zero-shot-object-detection", model, {
    dtype: "q8",
    device: "cpu",
  });
  const files = (await readdir(dir)).filter((x) => x.endsWith(".jpg")).sort();
  let nextId = 1,
    tracks = [];
  const frames = [];
  for (let index = 0; index < files.length; index++) {
    const image = join(dir, files[index]);
    // Single-element prompt arrays avoid unsupported batched text inputs in this ONNX export.
    const packages = await detector(
      image,
      ["a cardboard box. a wheeled cart."],
      { threshold: 0.23 },
    );
    const persons = await detector(image, ["person."], { threshold: 0.3 });
    const candidates = [...packages, ...persons]
      .map((d) => {
        const raw = d.label.toLowerCase();
        const kind = raw.includes("person")
          ? "person"
          : raw.includes("cart")
            ? "cart"
            : raw.includes("box") || raw.includes("cardboard")
              ? "parcel"
              : null;
        return {
          kind,
          rawLabel: d.label,
          score: d.score,
          box: [
            d.box.xmin / 960,
            d.box.ymin / 540,
            d.box.xmax / 960,
            d.box.ymax / 540,
          ].map((v) => Math.max(0, Math.min(1, v))),
        };
      })
      .filter((x) => x.kind && x.box[2] > x.box[0] && x.box[3] > x.box[1])
      .sort((a, b) => b.score - a.score);
    // Same-class overlap suppression removes obvious duplicate queries without inventing detections.
    const accepted = [];
    for (const item of candidates)
      if (
        !accepted.some(
          (a) => a.kind === item.kind && iou(a.box, item.box) > 0.55,
        )
      )
        accepted.push(item);
    const used = new Set();
    const objects = [];
    for (const item of accepted) {
      const match = tracks
        .filter(
          (t) =>
            t.kind === item.kind && !used.has(t.id) && index - t.lastFrame <= 2,
        )
        .map((t) => ({ t, overlap: iou(t.box, item.box) }))
        .sort((a, b) => b.overlap - a.overlap)[0];
      let track;
      if (match && match.overlap >= 0.25) {
        track = match.t;
        track.box = item.box;
        track.lastFrame = index;
      } else {
        track = {
          id: `T${String(nextId++).padStart(3, "0")}`,
          kind: item.kind,
          box: item.box,
          lastFrame: index,
        };
        tracks.push(track);
      }
      used.add(track.id);
      objects.push({
        id: track.id,
        kind: item.kind,
        box: item.box.map((v) => Number(v.toFixed(4))),
        score: Number(item.score.toFixed(3)),
        rawLabel: item.rawLabel,
      });
    }
    tracks = tracks.filter((t) => index - t.lastFrame <= 2);
    frames.push({
      time: Number((Math.floor((index / 2 + 0.25) * 25) / 25).toFixed(2)),
      objects,
    });
    console.log(
      `Frame ${index + 1}/${files.length} (${frames[frames.length - 1].time}s): ${objects.length} detections`,
    );
  }
  const data = {
    version: 1,
    source: "Pexels 10472376",
    model,
    modelLicense: "Apache-2.0",
    method:
      "Grounding DINO Tiny quantized CPU; text prompts; greedy same-class IoU association",
    source_frame_selection:
      "FFmpeg fps=2 selects frames at .24, .72, 1.24, 1.72, etc. seconds from 25fps input; annotations are held until the next sampled frame.",
    sampleRate: 2,
    width: 960,
    height: 540,
    duration: 5.04,
    thresholds: { parcelAndCart: 0.23, person: 0.3 },
    limitations:
      "Predictions are unvalidated and may miss or merge items; IDs can change or swap. Current visible candidates are not verified inventory counts.",
    frames,
  };
  await writeFile(output, JSON.stringify(data, null, 2) + "\n");
  console.log(`Wrote ${output}`);
} finally {
  await rm(dir, { recursive: true, force: true });
}
