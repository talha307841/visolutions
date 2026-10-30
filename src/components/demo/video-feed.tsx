"use client";
import { useEffect, useRef, useState } from "react";
import type { DetectedObject } from "@tensorflow-models/coco-ssd";

type Status = "idle" | "loading" | "running" | "error";
export function VideoFeed({
  src,
  poster,
  overlays,
  detection,
  onStatus,
}: {
  src: string;
  poster: string;
  overlays: boolean;
  detection: boolean;
  onStatus: (status: Status) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const callback = useRef(onStatus);
  const [visible, setVisible] = useState(false);
  const [boxes, setBoxes] = useState<DetectedObject[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
  useEffect(() => {
    callback.current = onStatus;
  }, [onStatus]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (
          entry.isIntersecting &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);
  useEffect(() => {
    if (!detection || !overlays || !visible) {
      callback.current("idle");
      return;
    }
    if (
      typeof Worker === "undefined" ||
      typeof createImageBitmap === "undefined"
    ) {
      callback.current("error");
      return;
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let worker: Worker;
    callback.current("loading");
    try {
      worker = new Worker(new URL("./detector.worker.ts", import.meta.url));
    } catch {
      callback.current("error");
      return;
    }
    const nextFrame = async () => {
      if (cancelled) return;
      const video = videoRef.current;
      if (!video || video.readyState < 2 || video.paused || !video.videoWidth) {
        timer = setTimeout(nextFrame, 500);
        return;
      }
      try {
        const bitmap = await createImageBitmap(video, {
          resizeWidth: 320,
          resizeHeight: Math.round(
            (320 * video.videoHeight) / video.videoWidth,
          ),
          resizeQuality: "low",
        });
        if (cancelled) {
          bitmap.close();
          return;
        }
        worker.postMessage({ type: "frame", bitmap }, [bitmap]);
      } catch {
        if (!cancelled) callback.current("error");
      }
    };
    worker.onmessage = (
      event: MessageEvent<{
        type: string;
        predictions?: DetectedObject[];
        width?: number;
        height?: number;
      }>,
    ) => {
      if (cancelled) return;
      if (event.data.type === "ready") {
        callback.current("running");
        void nextFrame();
      } else if (event.data.type === "result") {
        setBoxes(event.data.predictions || []);
        setDimensions({
          width: event.data.width || 1,
          height: event.data.height || 1,
        });
        timer = setTimeout(nextFrame, 500);
      } else if (event.data.type === "error") {
        callback.current("error");
        worker.terminate();
      }
    };
    worker.onerror = () => {
      if (!cancelled) callback.current("error");
    };
    worker.postMessage({ type: "init" });
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      worker.terminate();
    };
  }, [src, detection, overlays, visible]);
  return (
    <div className="sample-video-wrap">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        controls
        preload="metadata"
        aria-label="Prerecorded, publicly licensed sample video"
      />
      {detection &&
        overlays &&
        visible &&
        boxes.map((box, i) => (
          <div
            key={`${box.class}-${i}`}
            className="object-box"
            style={{
              left: `${(box.bbox[0] / dimensions.width) * 100}%`,
              top: `${(box.bbox[1] / dimensions.height) * 100}%`,
              width: `${(box.bbox[2] / dimensions.width) * 100}%`,
              height: `${(box.bbox[3] / dimensions.height) * 100}%`,
            }}
          >
            <span>
              {box.class} · {Math.round(box.score * 100)}%
            </span>
          </div>
        ))}
    </div>
  );
}
