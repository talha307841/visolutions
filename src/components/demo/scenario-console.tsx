"use client";
import { useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Check,
  CirclePause,
  CirclePlay,
  Expand,
  Eye,
  EyeOff,
  LockKeyhole,
  Package,
  RotateCcw,
  Shield,
  Siren,
  Stethoscope,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { scenarios, scenarioById } from "@/data/demo-scenarios";
import { Overlay } from "./story-video";
import { useHydrated } from "@/hooks/use-hydrated";
import { PersonDetector } from "./person-detector";
import { WarehouseView } from "./warehouse-vision";
const icons = {
  package: Package,
  forklift: Truck,
  ppe: Shield,
  exit: Siren,
  drawer: LockKeyhole,
  waste: Stethoscope,
};
function clock(n: number) {
  return `${Math.floor(n / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(n % 60)
    .toString()
    .padStart(2, "0")}`;
}
export function ScenarioConsole({
  initialId = "package-flow",
}: {
  initialId?: string;
}) {
  const [id, setId] = useState(initialId),
    [time, setTime] = useState(0),
    [playing, setPlaying] = useState(false),
    [overlays, setOverlays] = useState(true),
    [personModel, setPersonModel] = useState(false),
    [modelStatus, setModelStatus] = useState<"loading" | "running" | "error">(
      "loading",
    ),
    [ack, setAck] = useState<Record<string, boolean>>({}),
    [filter, setFilter] = useState("all");
  const hydrated = useHydrated();
  const video = useRef<HTMLVideoElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const scenario = scenarioById(id);
  const eventVisible =
    scenario.eventAt !== undefined && time >= scenario.eventAt;
  const showEvent =
    eventVisible &&
    (filter === "all" ||
      (filter === "reviewed" && ack[id]) ||
      (filter === "open" && !ack[id]));
  function choose(next: string) {
    video.current?.pause();
    setId(next);
    setTime(0);
    setPlaying(false);
    setOverlays(true);
    setPersonModel(false);
    setFilter("all");
  }
  async function toggle() {
    if (!video.current) return;
    if (video.current.paused) {
      try {
        await video.current.play();
      } catch {
        setPlaying(false);
      }
    } else video.current.pause();
  }
  function replay() {
    if (!video.current) return;
    video.current.currentTime = 0;
    setTime(0);
    void video.current.play().catch(() => {});
  }
  const Icon = icons[scenario.type];
  return (
    <div className="sc-console">
      <div className="sc-topbar">
        <div className="sc-brand">
          <span>◈</span> visolution <i>/</i> <b>Scenario explorer</b>
        </div>
        <div className="sc-top-right">
          <span className="sc-demo-tag">PRODUCT PREVIEW</span>
          <span>NO LIVE CAMERAS</span>
        </div>
      </div>
      <div className="sc-layout">
        <aside className="sc-sidebar" aria-label="Demo scenarios">
          <div className="sc-side-head">
            <span>EXPLORE SCENARIOS</span>
            <small>03 VIDEO / 03 CONCEPT</small>
          </div>
          {scenarios.map((s, i) => {
            const ItemIcon = icons[s.type];
            return (
              <button
                key={s.id}
                onClick={() => choose(s.id)}
                aria-pressed={id === s.id}
                className={`sc-scenario ${id === s.id ? "active" : ""}`}
              >
                <div
                  className={`sc-thumb ${s.status === "concept" ? "concept" : ""}`}
                >
                  {s.poster ? (
                    <span
                      className="sc-thumb-image"
                      style={{ backgroundImage: `url(${s.poster})` }}
                    />
                  ) : (
                    <ItemIcon size={20} />
                  )}
                </div>
                <span className="sc-scenario-text">
                  <strong>{s.title}</strong>
                  <small>{s.short}</small>
                </span>
                <span className="sc-scenario-no">0{i + 1}</span>
              </button>
            );
          })}
        </aside>
        {scenario.type === "package" ? (
          <WarehouseView />
        ) : (
          <>
            <div className="sc-main">
              <div className="sc-main-head">
                <div>
                  <span className="sc-overline">{scenario.area}</span>
                  <h3>{scenario.title}</h3>
                </div>
                <span className="sc-illustrative">
                  {scenario.video
                    ? personModel
                      ? "PERSON MODEL + SCRIPTED EVENT"
                      : "ILLUSTRATIVE OVERLAYS"
                    : "CONCEPT ONLY"}
                </span>
              </div>
              {scenario.video ? (
                <>
                  <div className="sc-video-frame" ref={screen}>
                    {hydrated ? (
                      <video
                        key={scenario.id}
                        ref={video}
                        controls
                        playsInline
                        preload="metadata"
                        poster={scenario.poster}
                        onTimeUpdate={(e) =>
                          setTime(e.currentTarget.currentTime)
                        }
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onEnded={() => setPlaying(false)}
                        aria-label={`${scenario.title} prerecorded stock footage`}
                      >
                        <source src={scenario.video} type="video/mp4" />
                        <track
                          kind="captions"
                          src={`/demo/${scenario.id}.vtt`}
                          srcLang="en"
                          label="English descriptions"
                          default
                        />
                      </video>
                    ) : (
                      <div
                        className="video-poster"
                        style={{ backgroundImage: `url(${scenario.poster})` }}
                        role="img"
                        aria-label={`${scenario.title} sample video preview`}
                      />
                    )}
                    {overlays && !personModel && (
                      <Overlay scenario={scenario} time={time} />
                    )}
                    {overlays && personModel && (
                      <PersonDetector
                        key={scenario.id}
                        video={video}
                        onStatus={setModelStatus}
                      />
                    )}
                    <div className="sc-video-label">
                      STOCK FOOTAGE · SCRIPTED EXAMPLE
                    </div>
                  </div>
                  <div className="sc-video-controls">
                    <button
                      onClick={toggle}
                      aria-label={playing ? "Pause video" : "Play video"}
                    >
                      {playing ? (
                        <CirclePause size={19} />
                      ) : (
                        <CirclePlay size={19} />
                      )}
                    </button>
                    <button onClick={replay} aria-label="Replay video">
                      <RotateCcw size={16} />
                    </button>
                    <span className="sc-clock">
                      {clock(time)} / {clock(scenario.duration)}
                    </span>
                    <label className="sc-scrubber">
                      <span className="sr-only">Seek video</span>
                      <input
                        type="range"
                        min="0"
                        max={scenario.duration}
                        step="0.1"
                        value={Math.min(time, scenario.duration)}
                        onChange={(e) => {
                          const n = Number(e.target.value);
                          if (video.current) video.current.currentTime = n;
                          setTime(n);
                        }}
                      />
                    </label>
                    <button
                      onClick={() => setOverlays(!overlays)}
                      aria-pressed={overlays}
                      className="sc-overlay-button"
                    >
                      {overlays ? <Eye size={15} /> : <EyeOff size={15} />}{" "}
                      <span>Overlays {overlays ? "on" : "off"}</span>
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
                  <p className="sc-media-note">
                    {personModel
                      ? "Person boxes are actual general-purpose model predictions, not PPE or forklift detections. Timeline events remain scripted examples."
                      : "Recorded footage. Boxes, IDs and event cues are illustrative, not model output."}{" "}
                    Video controls include playback, volume and captions.
                  </p>
                  {(scenario.type === "forklift" ||
                    scenario.type === "ppe") && (
                    <div className="sc-model-option">
                      <button
                        onClick={() => {
                          setPersonModel(!personModel);
                          setOverlays(true);
                        }}
                        aria-pressed={personModel}
                      >
                        {personModel
                          ? "Return to illustrative overlay"
                          : "Try actual person detection"}
                      </button>
                      <span>
                        {personModel
                          ? modelStatus === "loading"
                            ? "Loading local model…"
                            : modelStatus === "error"
                              ? "Model unavailable; retry or use the illustrative overlay."
                              : "Person model active · play the clip"
                          : "Optional browser model · people only"}
                      </span>
                    </div>
                  )}
                  <div className="sc-timeline-head">
                    <div>
                      <span className="sc-overline">SCENARIO TIMELINE</span>
                      <h4>Example events</h4>
                    </div>
                    <label>
                      <span className="sr-only">Filter events</span>
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      >
                        <option value="all">All events</option>
                        <option value="open">Needs review</option>
                        <option value="reviewed">Acknowledged</option>
                      </select>
                    </label>
                  </div>
                  <div className="sc-timeline">
                    {showEvent ? (
                      <button
                        onClick={() => {
                          if (video.current)
                            video.current.currentTime = scenario.eventAt!;
                          setTime(scenario.eventAt!);
                        }}
                        className="sc-event"
                      >
                        <span className="sc-event-icon">
                          <AlertTriangle size={16} />
                        </span>
                        <span>
                          <strong>{scenario.eventTitle}</strong>
                          <small>
                            Scripted example ·{" "}
                            {ack[id] ? "Acknowledged" : "Ready for review"}
                          </small>
                        </span>
                        <span className="sc-clock">
                          {clock(scenario.eventAt!)}
                        </span>
                      </button>
                    ) : (
                      <div className="sc-timeline-empty">
                        {eventVisible
                          ? "No events match this filter."
                          : `Play the clip to reveal the example event at ${clock(scenario.eventAt!)}.`}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className={`sc-concept sc-concept-${scenario.type}`}>
                  <div className="sc-concept-graphic">
                    <Icon size={56} strokeWidth={1} />
                    <div className="sc-concept-cross">+</div>
                  </div>
                  <span className="sc-overline">CONCEPTUAL WORKFLOW</span>
                  <h4>Purpose-built footage is not yet available.</h4>
                  <p>
                    This scenario is a product direction, not a detection demo.
                    We’ll validate it using suitable footage and
                    deployment-specific rules.
                  </p>
                  <Link href="/contact">
                    Discuss this use case <ArrowUpRight size={16} />
                  </Link>
                </div>
              )}
            </div>
            <aside className="sc-inspector">
              <span className="sc-overline">CONTEXT / REVIEW</span>
              <div className="sc-inspector-heading">
                <Icon size={21} />
                <span>
                  {scenario.video
                    ? eventVisible
                      ? "EXAMPLE EVENT"
                      : "WAITING FOR CUE"
                    : "PLANNED SCENARIO"}
                </span>
              </div>
              <h3>
                {scenario.video
                  ? eventVisible
                    ? scenario.eventTitle
                    : "Play to see the workflow"
                  : scenario.eventTitle}
              </h3>
              <p>
                {scenario.video && !eventVisible
                  ? "The inspector updates when the scripted example event appears in the recorded clip."
                  : scenario.eventDetail}
              </p>
              <div className="sc-inspector-rule">
                <span>SEVERITY</span>
                <p>Review example · not a verified incident</p>
              </div>
              <div className="sc-inspector-rule">
                <span>PROPOSED RULE</span>
                <p>{scenario.rule}</p>
              </div>
              <div className="sc-inspector-rule">
                <span>REVIEW ACTION</span>
                <p>{scenario.action}</p>
              </div>
              {scenario.video && eventVisible && (
                <button
                  className="sc-ack"
                  disabled={!!ack[id]}
                  onClick={() => setAck({ ...ack, [id]: true })}
                >
                  <Check size={16} />
                  {ack[id] ? "Acknowledged" : "Acknowledge example"}
                </button>
              )}
              <div className="sc-inspector-foot">
                <span>◈</span> Designed for human review
                <br />
                Not a live safety system
              </div>
            </aside>
          </>
        )}
      </div>
    </div>
  );
}
