"use client";
import { useEffect, useState, type RefObject } from "react";
import type { DetectedObject } from "@tensorflow-models/coco-ssd";
type ModelStatus = "loading" | "running" | "error";
/** A general-purpose person model only. This never produces safety events. */
export function PersonDetector({
  video,
  onStatus,
}: {
  video: RefObject<HTMLVideoElement | null>;
  onStatus: (s: ModelStatus) => void;
}) {
  const [boxes, setBoxes] = useState<DetectedObject[]>([]);
  const [size, setSize] = useState({ width: 1, height: 1 });
  useEffect(() => {
    let cancelled = false;
    let epoch = 0;
    let sentEpoch = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let worker: Worker;
    try {
      worker = new Worker(new URL("./detector.worker.ts", import.meta.url));
    } catch {
      onStatus("error");
      return;
    }
    onStatus("loading");
    const onSeek = () => {
      epoch++;
      setBoxes([]);
    };
    video.current?.addEventListener("seeking", onSeek);
    async function frame() {
      if (cancelled) return;
      const el = video.current;
      if (!el || el.readyState < 2 || el.paused || !el.videoWidth) {
        timer = setTimeout(frame, 400);
        return;
      }
      try {
        const bitmap = await createImageBitmap(el, {
          resizeWidth: 640,
          resizeHeight: Math.round((640 * el.videoHeight) / el.videoWidth),
          resizeQuality: "low",
        });
        if (cancelled) {
          bitmap.close();
          return;
        }
        sentEpoch = epoch;
        worker.postMessage({ type: "frame", bitmap }, [bitmap]);
      } catch {
        if (!cancelled) onStatus("error");
      }
    }
    worker.onmessage = (
      e: MessageEvent<{
        type: string;
        predictions?: DetectedObject[];
        width?: number;
        height?: number;
      }>,
    ) => {
      if (cancelled) return;
      if (e.data.type === "ready") {
        onStatus("running");
        void frame();
      } else if (e.data.type === "result") {
        if (sentEpoch === epoch)
          setBoxes(
            (e.data.predictions || []).filter((b) => b.class === "person"),
          );
        setSize({ width: e.data.width || 1, height: e.data.height || 1 });
        timer = setTimeout(frame, 500);
      } else if (e.data.type === "error") {
        onStatus("error");
        worker.terminate();
      }
    };
    worker.onerror = () => {
      if (!cancelled) onStatus("error");
    };
    worker.postMessage({ type: "init" });
    const currentVideo = video.current;
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      currentVideo?.removeEventListener("seeking", onSeek);
      worker.terminate();
    };
  }, [video, onStatus]);
  return (
    <div
      className="story-overlays actual-person-layer"
      aria-label="Actual person model predictions"
    >
      {boxes.map((b, i) => (
        <div
          className="story-box actual"
          key={i}
          style={{
            left: `${(b.bbox[0] / size.width) * 100}%`,
            top: `${(b.bbox[1] / size.height) * 100}%`,
            width: `${(b.bbox[2] / size.width) * 100}%`,
            height: `${(b.bbox[3] / size.height) * 100}%`,
          }}
        >
          <span>PERSON · MODEL</span>
        </div>
      ))}
    </div>
  );
}
