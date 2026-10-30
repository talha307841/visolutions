"use client";
import { useState, useRef, useEffect } from "react";
import {
  Activity,
  ArrowUpRight,
  Bell,
  Camera,
  Check,
  ChevronRight,
  LayoutDashboard,
  Maximize2,
  Play,
  RotateCcw,
  Settings,
  ShieldAlert,
  X,
} from "lucide-react";
import {
  cameras,
  initialEvents,
  sampleEvents,
  type DemoEvent,
} from "@/data/demo";
import { Scene } from "./scene";
import { VideoFeed } from "./video-feed";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const tabs = [
  ["Overview", LayoutDashboard],
  ["Camera monitoring", Camera],
  ["Violations", ShieldAlert],
  ["Analytics", Activity],
  ["Settings", Settings],
] as const;
export function Console({
  compact = false,
  initialCamera = 0,
}: {
  compact?: boolean;
  initialCamera?: number;
}) {
  const [selected, setSelected] = useState(initialCamera),
    [overlays, setOverlays] = useState(true),
    [detection, setDetection] = useState(true),
    [detectionStatus, setDetectionStatus] = useState<
      "idle" | "loading" | "running" | "error"
    >("idle"),
    [events, setEvents] = useState<DemoEvent[]>(initialEvents),
    [tab, setTab] = useState("Overview"),
    [category, setCategory] = useState("All categories"),
    [severity, setSeverity] = useState("All severities"),
    [detail, setDetail] = useState<DemoEvent | null>(null),
    [expanded, setExpanded] = useState(false),
    [notice, setNotice] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (detail || expanded) dialog.current?.showModal();
    else dialog.current?.close();
  }, [detail, expanded]);
  const filtered = events.filter(
    (e) =>
      (category === "All categories" || e.category === category) &&
      (severity === "All severities" || e.severity === severity),
  );
  function trigger() {
    const event = sampleEvents[events.length % sampleEvents.length];
    setEvents([
      ...events,
      {
        ...event,
        id: events.length,
        acknowledged: false,
        time: `10:${String(43 + Math.floor(events.length / 60)).padStart(2, "0")}:${String(events.length % 60).padStart(2, "0")}`,
      },
    ]);
    setSelected(event.camera);
    setNotice(`Sample event generated: ${event.title}`);
  }
  function reset() {
    setEvents(initialEvents());
    setSelected(initialCamera);
    setOverlays(true);
    setDetection(true);
    setCategory("All categories");
    setSeverity("All severities");
    setTab("Overview");
    setNotice("Demonstration reset.");
    setDetail(null);
    setExpanded(false);
  }
  function acknowledge(id: number) {
    setEvents(
      events.map((e) => (e.id === id ? { ...e, acknowledged: true } : e)),
    );
    setDetail(null);
    setNotice("Sample event acknowledged. No external notification was sent.");
  }
  return (
    <div className={`console ${compact ? "console-compact" : ""}`}>
      <div className="console-top">
        <span className="console-brand">
          <span className="console-symbol">◈</span> visolution <span>/</span>{" "}
          <span>Console</span>
        </span>
        <span className="demo-badge">
          <span className="status-dot" /> DEMO ENVIRONMENT
        </span>
        <span className="console-avatar">V</span>
      </div>
      <div className="console-body">
        {!compact && (
          <aside className="console-sidebar">
            <span className="mono">WORKSPACE</span>
            {tabs.map(([label, Icon]) => (
              <button
                key={label}
                className={tab === label ? "active" : ""}
                onClick={() => setTab(label)}
                aria-label={label}
                aria-pressed={tab === label}
                title={label}
              >
                <Icon size={17} />
                <span>{label}</span>
              </button>
            ))}
            <div className="sidebar-bottom">
              <span className="status-dot" /> Simulated system
              <br />
              <small>No cameras connected</small>
            </div>
          </aside>
        )}
        <div className="console-main">
          <div className="console-heading">
            <div>
              <span className="mono">YOUR OPERATIONS, IN FOCUS</span>
              <h3>{compact ? "Site overview" : tab}</h3>
            </div>
            <span className="health-status">
              <span className="status-dot" />{" "}
              {compact ? "Simulation active" : "Local simulation"}
            </span>
          </div>
          {!compact && (
            <div className="simulation-notice">
              Sample videos and event simulation — No live cameras connected
            </div>
          )}
          {tab === "Settings" ? (
            <div className="settings-panel">
              <h3>Simulation preferences</h3>
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={overlays}
                  onChange={(e) => setOverlays(e.target.checked)}
                />{" "}
                Show detection overlays
              </label>
              <p>
                Video clips are licensed stock footage. Optional object
                detection runs in your browser. Sample violation events and
                their confidence values are fictional and unrelated to the
                videos. Changes last only for this page session.
              </p>
              <Button variant="outline" onClick={reset}>
                <RotateCcw size={15} /> Reset demonstration
              </Button>
            </div>
          ) : tab === "Analytics" ? (
            <div className="analytics-panel">
              <span className="eyebrow">SIMULATED EVENT DISTRIBUTION</span>
              <h3>{events.length} sample events. One clear view.</h3>
              {["Access", "PPE", "Vehicle", "Waste"].map((c) => (
                <div className="analytics-row" key={c}>
                  <span>{c}</span>
                  <div>
                    <i
                      style={{
                        width: `${(events.filter((e) => e.category === c).length / events.length) * 100}%`,
                      }}
                    />
                  </div>
                  <strong>
                    {events.filter((e) => e.category === c).length}
                  </strong>
                </div>
              ))}
              <p>
                {events.filter((e) => e.acknowledged).length} acknowledged ·{" "}
                {events.filter((e) => !e.acknowledged).length} awaiting review
              </p>
              <span className="fine-print">
                These counts describe the demonstration only, not detection
                performance.
              </span>
            </div>
          ) : (
            <>
              {tab !== "Violations" && (
                <>
                  <div className="console-stats">
                    <div>
                      <span>Sample cameras</span>
                      <strong>
                        04 <small>prerecorded feeds</small>
                      </strong>
                    </div>
                    <div>
                      <span>Events to review</span>
                      <strong>
                        {String(
                          events.filter((e) => !e.acknowledged).length,
                        ).padStart(2, "0")}{" "}
                        <small className="amber">requires attention</small>
                      </strong>
                    </div>
                    <div>
                      <span>Review activity</span>
                      <div
                        className="mini-chart"
                        aria-label="Decorative simulated activity chart"
                      >
                        {[
                          22, 36, 25, 48, 35, 55, 29, 43, 60, 45, 66, 51, 70,
                          57, 73, 62,
                        ].map((n, i) => (
                          <i key={i} style={{ height: `${n}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="feed-layout">
                    <div className="main-feed">
                      <div className="feed-top">
                        <span>
                          <span className="status-dot" /> CAM 0{selected + 1}{" "}
                          <b>{cameras[selected].name}</b>
                        </span>
                        <button
                          onClick={() => setExpanded(true)}
                          aria-label="Expand camera view"
                        >
                          <Maximize2 size={14} />
                        </button>
                      </div>
                      <div className="feed-image">
                        <VideoFeed
                          key={`${selected}-${overlays}-${detection}`}
                          src={cameras[selected].video}
                          poster={cameras[selected].poster}
                          overlays={overlays}
                          detection={detection}
                          onStatus={setDetectionStatus}
                        />
                        <div className="feed-timestamp">
                          SAMPLE VIDEO / LOOP
                        </div>
                        <span className="feed-location">
                          {cameras[selected].location}
                        </span>
                      </div>
                      <div className="feed-bottom">
                        <span>
                          <ScanIcon />{" "}
                          {!overlays
                            ? "Detection overlays hidden"
                            : !detection
                              ? "Prerecorded sample footage"
                              : detectionStatus === "loading"
                                ? "Loading local object detector…"
                                : detectionStatus === "running"
                                  ? "Browser object detection active"
                                  : detectionStatus === "error"
                                    ? "Detector unavailable — try again"
                                    : "Detection paused"}
                        </span>
                        <button
                          onClick={() => setOverlays(!overlays)}
                          aria-pressed={overlays}
                        >
                          {overlays ? "Hide" : "Show"} overlays
                        </button>
                      </div>
                      {!compact && (
                        <div className="detection-controls">
                          <button
                            onClick={() => {
                              setOverlays(true);
                              setDetection(!detection);
                            }}
                            aria-pressed={detection}
                          >
                            {detection
                              ? "Stop object detection"
                              : "Start object detection"}
                          </button>
                          <span>Runs locally on this sample video</span>
                        </div>
                      )}
                    </div>
                    <div className="camera-picker">
                      {cameras.map((c, i) => (
                        <button
                          className={
                            selected === i
                              ? "camera-tile selected"
                              : "camera-tile"
                          }
                          key={c.name}
                          onClick={() => setSelected(i)}
                          aria-label={`Select camera ${i + 1}: ${c.name}`}
                          aria-pressed={selected === i}
                        >
                          <Image
                            src={c.poster}
                            alt=""
                            fill
                            sizes="160px"
                            className="camera-thumbnail"
                          />
                          <span>
                            0{i + 1} <b>{c.name}</b>
                            <span className="status-dot" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className="event-heading">
                <h4>
                  <Bell size={14} />{" "}
                  {compact ? "Sample event scenarios" : "Event review"}{" "}
                  <span>{events.length}</span>
                </h4>
                {compact ? (
                  <span className="mono">SIMULATED EVENTS</span>
                ) : (
                  <Button variant="outline" size="small" onClick={trigger}>
                    <Play size={13} /> Trigger sample violation
                  </Button>
                )}
              </div>
              {!compact && (
                <div className="event-filters">
                  <label>
                    <span className="sr-only">Filter category</span>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {[
                        "All categories",
                        "Access",
                        "PPE",
                        "Vehicle",
                        "Waste",
                      ].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="sr-only">Filter severity</span>
                    <select
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                    >
                      {["All severities", "Critical", "Warning", "Review"].map(
                        (c) => (
                          <option key={c}>{c}</option>
                        ),
                      )}
                    </select>
                  </label>
                  <button onClick={reset} className="reset-button">
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              )}
              {!compact && (
                <p className="event-explainer">
                  Illustrative event scenarios — these are not detections from
                  the sample videos.
                </p>
              )}
              <div className="event-list">
                {filtered.length === 0 ? (
                  <p className="empty-state">
                    No sample events match these filters.
                  </p>
                ) : (
                  (compact ? filtered.slice(0, 2) : filtered).map((e) => (
                    <button
                      className="event-row"
                      key={e.id}
                      onClick={() => {
                        setDetail(e);
                        setSelected(e.camera);
                      }}
                    >
                      <span
                        className={`event-indicator ${e.severity.toLowerCase()}`}
                      />
                      <span className="event-title">
                        {e.title}
                        <small>
                          CAM 0{e.camera + 1} · {cameras[e.camera].location}
                        </small>
                      </span>
                      <span
                        className={`severity ${e.acknowledged ? "acknowledged" : e.severity.toLowerCase()}`}
                      >
                        {e.acknowledged ? "Reviewed" : e.severity}
                      </span>
                      <span className="event-time mono">{e.time}</span>
                      <ChevronRight size={14} />
                    </button>
                  ))
                )}
              </div>
            </>
          )}
          <div
            aria-live="polite"
            className={notice ? "console-notice" : "sr-only"}
          >
            {notice}
          </div>
          <div className="console-foot">
            <span>
              <span className="status-dot" /> Sample footage and events
            </span>
            <span>
              HUMAN REVIEW BY DESIGN <ArrowUpRight size={11} />
            </span>
          </div>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="event-dialog"
        aria-label="Simulated event evidence"
        onCancel={() => {
          setDetail(null);
          setExpanded(false);
        }}
        onClick={(e) => {
          if (e.target === dialog.current) {
            setDetail(null);
            setExpanded(false);
          }
        }}
      >
        <button
          className="dialog-close"
          onClick={() => {
            setDetail(null);
            setExpanded(false);
          }}
          aria-label="Close details"
        >
          <X />
        </button>
        <span className="eyebrow">
          {detail ? "SIMULATED EVENT EVIDENCE" : "PRERECORDED SAMPLE VIDEO"}
        </span>
        <h2>{detail?.title || cameras[selected].name}</h2>
        {detail ? (
          <Scene camera={detail.camera} overlays={overlays} />
        ) : (
          <VideoFeed
            src={cameras[selected].video}
            poster={cameras[selected].poster}
            overlays={false}
            detection={false}
            onStatus={() => {}}
          />
        )}
        <p>
          CAM 0{(detail?.camera ?? selected) + 1} · {detail?.time || "10:42:08"}{" "}
          {detail && (
            <> · {cameras[detail.camera].confidence}% simulated confidence</>
          )}
        </p>
        <p>
          {detail
            ? "This fictional sample event demonstrates review. It was not detected in the sample video."
            : "This is prerecorded stock footage, not a live camera."}
        </p>
        {detail && (
          <Button
            disabled={events.find((e) => e.id === detail.id)?.acknowledged}
            onClick={() => acknowledge(detail.id)}
          >
            <Check size={17} />
            {events.find((e) => e.id === detail.id)?.acknowledged
              ? "Already acknowledged"
              : "Acknowledge event"}
          </Button>
        )}
      </dialog>
    </div>
  );
}
function ScanIcon() {
  return (
    <span className="scan-icon" aria-hidden="true">
      ⌖
    </span>
  );
}
