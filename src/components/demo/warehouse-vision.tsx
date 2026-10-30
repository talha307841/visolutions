"use client";
import { useEffect, useRef, useState } from "react";
import {
  CirclePause,
  CirclePlay,
  Expand,
  Eye,
  EyeOff,
  RotateCcw,
  ScanLine,
} from "lucide-react";
import raw from "@/data/warehouse-detections.json";
import { useHydrated } from "@/hooks/use-hydrated";

type Kind = "parcel" | "person" | "cart";
type Detection = {
  id: string;
  kind: Kind;
  box: number[];
  score: number;
  rawLabel: string;
};
type Dataset = {
  sampleRate: number;
  frames: { time: number; objects: Detection[] }[];
};
const data = raw as unknown as Dataset;
const labels: Record<Kind, string> = {
  parcel: "PARCEL",
  person: "PERSON",
  cart: "CART",
};
function frameAt(time: number) {
  let result: Dataset["frames"][number] | undefined;
  for (const frame of data.frames) {
    if (frame.time > time) break;
    result = frame;
  }
  return result;
}
function format(n: number) {
  return `00:${String(Math.floor(n)).padStart(2, "0")}`;
}
function PredictionBoxes({
  time,
  filter = "all",
  select,
  selected,
}: {
  time: number;
  filter?: Kind | "all";
  select?: (id: string) => void;
  selected?: string;
}) {
  const objects = frameAt(time)?.objects || [];
  return (
    <div className="warehouse-overlay" aria-label="Model prediction overlay">
      {objects
        .filter((o) => filter === "all" || o.kind === filter)
        .map((o) => {
          const [x, y, x2, y2] = o.box;
          const style = {
            left: `${x * 100}%`,
            top: `${y * 100}%`,
            width: `${(x2 - x) * 100}%`,
            height: `${(y2 - y) * 100}%`,
          };
          return select ? (
            <button
              key={o.id}
              style={style}
              className={`warehouse-box ${o.kind} ${selected === o.id ? "selected" : ""}`}
              onClick={() => select(o.id)}
              aria-label={`Inspect ${labels[o.kind].toLowerCase()} candidate ${o.id}`}
            >
              <span>
                {labels[o.kind]} {o.id}
              </span>
            </button>
          ) : (
            <div key={o.id} style={style} className={`warehouse-box ${o.kind}`}>
              <span>
                {labels[o.kind]} {o.id}
              </span>
            </div>
          );
        })}
    </div>
  );
}
export function WarehousePreview({ hero = false }: { hero?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const hydrated = useHydrated();
  const [time, setTime] = useState(0.24);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const o = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    o.observe(v);
    return () => o.disconnect();
  }, [hydrated]);
  return (
    <div
      className={`story-preview warehouse-preview ${hero ? "story-preview-hero" : ""}`}
    >
      {hydrated ? (
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/demo/posters/warehouse-operations.webp"
          onLoadedMetadata={(e) => {
            e.currentTarget.currentTime = 0.24;
          }}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          aria-label="Recorded warehouse footage with sampled model predictions"
        >
          <source src="/demo/warehouse-operations.mp4" type="video/mp4" />
        </video>
      ) : (
        <div
          className="video-poster"
          style={{
            backgroundImage: "url(/demo/posters/warehouse-operations.webp)",
          }}
          role="img"
          aria-label="Warehouse sample video preview"
        />
      )}
      <PredictionBoxes time={time} />
      <div className="story-preview-top">
        <span>▣ WAREHOUSE / PARCEL SORTING</span>
        <span>RECORDED FOOTAGE</span>
      </div>
      <div className="story-preview-bottom">
        <span>
          <i /> MODEL PREDICTIONS · SAMPLED
        </span>
        <span>
          {frameAt(time)
            ? `${frameAt(time)!.objects.length} CANDIDATES IN FRAME`
            : "AWAITING FIRST SAMPLE"}
        </span>
      </div>
    </div>
  );
}
export function WarehouseView() {
  const video = useRef<HTMLVideoElement>(null),
    screen = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const [time, setTime] = useState(0.24),
    [playing, setPlaying] = useState(false),
    [overlay, setOverlay] = useState(true),
    [filter, setFilter] = useState<Kind | "all">("all"),
    [selected, setSelected] = useState<string | null>(null);
  const frame = frameAt(time);
  const objects = frame?.objects || [];
  const counts = {
    parcel: objects.filter((o) => o.kind === "parcel").length,
    person: objects.filter((o) => o.kind === "person").length,
    cart: objects.filter((o) => o.kind === "cart").length,
  };
  const parcelTracksSeen = new Set(
    data.frames
      .filter((f) => f.time <= time)
      .flatMap((f) =>
        f.objects.filter((o) => o.kind === "parcel").map((o) => o.id),
      ),
  ).size;
  const shown = objects.filter((o) => filter === "all" || o.kind === filter);
  const item = objects.find((o) => o.id === selected);
  async function toggle() {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      try {
        await v.play();
      } catch {
        setPlaying(false);
      }
    } else v.pause();
  }
  function reset() {
    if (!video.current) return;
    video.current.currentTime = 0;
    setTime(0);
    setSelected(null);
    void video.current.play().catch(() => {});
  }
  return (
    <>
      <div className="sc-main warehouse-main">
        <div className="sc-main-head">
          <div>
            <span className="sc-overline">WAREHOUSE / PARCEL SORTING</span>
            <h3>Warehouse intelligence</h3>
          </div>
          <span className="sc-illustrative">MODEL PREDICTIONS</span>
        </div>
        <div className="warehouse-summary">
          <div>
            <span>VISIBLE PARCEL CANDIDATES</span>
            <strong>
              {frame ? String(counts.parcel).padStart(2, "0") : "—"}
            </strong>
            <small>Current sampled frame</small>
          </div>
          <div>
            <span>PEOPLE / CARTS</span>
            <strong>
              {frame ? String(counts.person).padStart(2, "0") : "—"} <em>/</em>{" "}
              {frame ? String(counts.cart).padStart(2, "0") : "—"}
            </strong>
            <small>Model candidates</small>
          </div>
          <div>
            <span>PARCEL TRACK IDS SEEN</span>
            <strong>
              {frame ? String(parcelTracksSeen).padStart(2, "0") : "—"}
            </strong>
            <small>Estimated IDs, not unique items</small>
          </div>
        </div>
        <div className="sc-video-frame warehouse-stage" ref={screen}>
          {hydrated ? (
            <video
              ref={video}
              controls
              playsInline
              preload="metadata"
              poster="/demo/posters/warehouse-operations.webp"
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = 0.24;
                setTime(0.24);
              }}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              aria-label="Recorded warehouse footage with model predictions"
            >
              <source src="/demo/warehouse-operations.mp4" type="video/mp4" />
              <track
                kind="captions"
                src="/demo/warehouse-operations.vtt"
                srcLang="en"
                label="English descriptions"
                default
              />
            </video>
          ) : (
            <div
              className="video-poster"
              style={{
                backgroundImage: "url(/demo/posters/warehouse-operations.webp)",
              }}
              role="img"
              aria-label="Warehouse sample video preview"
            />
          )}
          {overlay && (
            <PredictionBoxes
              time={time}
              filter={filter}
              select={setSelected}
              selected={selected || undefined}
            />
          )}
          <div className="sc-video-label">
            RECORDED VIDEO · ACTUAL MODEL OUTPUT
          </div>
          <span className="warehouse-sample-time">
            {frame ? `SAMPLE ${frame.time.toFixed(2)}s` : "AWAITING SAMPLE"}
          </span>
        </div>
        <div className="sc-video-controls">
          <button
            onClick={toggle}
            aria-label={playing ? "Pause video" : "Play video"}
          >
            {playing ? <CirclePause size={19} /> : <CirclePlay size={19} />}
          </button>
          <button onClick={reset} aria-label="Replay video">
            <RotateCcw size={16} />
          </button>
          <span className="sc-clock">{format(time)} / 00:05</span>
          <label className="sc-scrubber">
            <span className="sr-only">Seek video</span>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={Math.min(time, 5)}
              onChange={(e) => {
                const t = Number(e.target.value);
                if (video.current) video.current.currentTime = t;
                setTime(t);
                setSelected(null);
              }}
            />
          </label>
          <button
            onClick={() => setOverlay(!overlay)}
            aria-pressed={overlay}
            className="sc-overlay-button"
          >
            {overlay ? <Eye size={15} /> : <EyeOff size={15} />}{" "}
            <span>Overlays {overlay ? "on" : "off"}</span>
          </button>
          <button
            onClick={() => {
              if (screen.current?.requestFullscreen)
                void screen.current.requestFullscreen();
            }}
            aria-label="Fullscreen video"
          >
            <Expand size={16} />
          </button>
        </div>
        <div className="warehouse-filter-head">
          <div>
            <span className="sc-overline">MODEL CANDIDATES</span>
            <h4>Objects in this frame</h4>
          </div>
          <span className="sc-clock">
            {frame ? `SAMPLED ${frame.time.toFixed(2)}s` : "AWAITING SAMPLE"}
          </span>
        </div>
        <div
          className="warehouse-filters"
          role="group"
          aria-label="Filter objects by class"
        >
          {(
            [
              ["all", "All", objects.length],
              ["parcel", "Parcels", counts.parcel],
              ["person", "People", counts.person],
              ["cart", "Carts", counts.cart],
            ] as const
          ).map(([value, label, count]) => (
            <button
              key={value}
              aria-pressed={filter === value}
              onClick={() => {
                setFilter(value);
                setSelected(null);
              }}
            >
              {label} <span>{frame ? count : "—"}</span>
            </button>
          ))}
        </div>
        <div className="warehouse-object-list">
          {shown.length ? (
            shown.map((o) => (
              <button
                key={o.id}
                onClick={() => setSelected(o.id)}
                className={selected === o.id ? "selected" : ""}
              >
                <span className={`warehouse-dot ${o.kind}`} />
                <strong>{labels[o.kind]}</strong>
                <span>{o.id}</span>
                <small>{Math.round(o.score * 100)}% model score</small>
                <span>↗</span>
              </button>
            ))
          ) : (
            <p>
              {frame
                ? `No ${filter === "all" ? "objects" : filter + "s"} predicted in this sampled frame.`
                : "First analyzed sample appears at 0.24 seconds."}
            </p>
          )}
        </div>
        <p className="sc-media-note">
          Recorded, licensed footage. Boxes are real model predictions sampled
          at 2 fps; IDs use approximate IoU association. Predictions can miss,
          merge or misclassify objects. Counts are visible candidate regions,
          not verified individual parcels.
        </p>
      </div>
      <aside className="sc-inspector warehouse-inspector">
        <span className="sc-overline">OBJECT INSPECTOR</span>
        <div className="sc-inspector-heading">
          <ScanLine size={20} />
          <span>{selected ? "SELECTED TRACK" : "SELECT AN OBJECT"}</span>
        </div>
        {item ? (
          <>
            <h3>
              {labels[item.kind]}{" "}
              <span className="warehouse-id">{item.id}</span>
            </h3>
            <p>
              This candidate was predicted in the selected sample. Its identity
              is associated across frames by overlap and can change when objects
              are obscured.
            </p>
            <div className="sc-inspector-rule">
              <span>MODEL SCORE</span>
              <p>
                {Math.round(item.score * 100)}% · uncalibrated prediction score
              </p>
            </div>
            <div className="sc-inspector-rule">
              <span>MODEL LABEL</span>
              <p>{item.rawLabel}</p>
            </div>
            <div className="sc-inspector-rule">
              <span>FRAME TIME</span>
              <p>{(frame?.time || 0).toFixed(2)} seconds</p>
            </div>
          </>
        ) : (
          <>
            <h3>
              {selected ? "Track not in this frame" : "Explore an object."}
            </h3>
            <p>
              {selected
                ? "This track is not predicted in the current sampled frame. Seek to a frame where it is visible or select another object."
                : "Select a bounding box or a row in the object list to inspect its model label, track ID and score."}
            </p>
            <div className="sc-inspector-rule">
              <span>WHAT YOU ARE SEEING</span>
              <p>
                Actual predictions on prerecorded footage. No events or
                violations are generated by this demonstration.
              </p>
            </div>
          </>
        )}
        <div className="sc-inspector-rule">
          <span>TRACKING LIMIT</span>
          <p>
            IDs are estimated from box overlap and are not guaranteed to persist
            across occlusion.
          </p>
        </div>
        <div className="sc-inspector-foot">
          <span>◈</span> Human review is essential
          <br />
          Not a live safety system
        </div>
      </aside>
    </>
  );
}
