"use client";
import { useEffect, useRef, useState } from "react";
import { useHydrated } from "@/hooks/use-hydrated";
import type { DemoScenario } from "@/data/demo-scenarios";

type OverlayBox = {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "amber";
};
/** Illustrative keyframes, hand-placed against the licensed stock clip. Not detections. */
function boxesAt(s: DemoScenario, time: number): OverlayBox[] {
  if (s.type === "forklift")
    return [
      {
        id: "fork",
        label: "VEHICLE · EXAMPLE",
        x: 51 + Math.min(time, 6) * 1.8,
        y: 28,
        w: 26,
        h: 48,
        tone: "amber",
      },
    ];
  if (s.type === "ppe")
    return [
      { id: "worker", label: "WORKER · EXAMPLE", x: 51, y: 40, w: 11, h: 48 },
    ];
  return [];
}
export function Overlay({
  scenario,
  time,
}: {
  scenario: DemoScenario;
  time: number;
}) {
  return (
    <div className="story-overlays" aria-hidden="true">
      {boxesAt(scenario, time).map((b) => (
        <div
          key={b.id}
          className={`story-box ${b.tone || ""}`}
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.w}%`,
            height: `${b.h}%`,
          }}
        >
          <span>{b.label}</span>
        </div>
      ))}
    </div>
  );
}
export function StoryPreview({
  scenario,
  hero = false,
}: {
  scenario: DemoScenario;
  hero?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const hydrated = useHydrated();
  const [time, setTime] = useState(0);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [scenario.id, hydrated]);
  if (!scenario.video) return null;
  return (
    <div className={`story-preview ${hero ? "story-preview-hero" : ""}`}>
      {hydrated ? (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="metadata"
          poster={scenario.poster}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          aria-label={`${scenario.title}: prerecorded stock video with illustrative overlays`}
        >
          <source src={scenario.video} type="video/mp4" />
        </video>
      ) : (
        <div
          className="video-poster"
          style={{ backgroundImage: `url(${scenario.poster})` }}
          role="img"
          aria-label={`${scenario.title} sample video preview`}
        />
      )}
      <Overlay scenario={scenario} time={time} />
      <div className="story-preview-top">
        <span>▣ {scenario.area}</span>
        <span>RECORDED SAMPLE</span>
      </div>
      <div className="story-preview-bottom">
        <span>
          <i /> ILLUSTRATIVE OVERLAY
        </span>
        <span>
          {scenario.type === "package"
            ? "01 / PARCEL FLOW"
            : "SCENARIO PREVIEW"}
        </span>
      </div>
    </div>
  );
}
