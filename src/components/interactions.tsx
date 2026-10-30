"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Camera,
  Cpu,
  ScanLine,
  Bell,
  ArrowRight,
  ShieldCheck,
  Database,
  Monitor,
} from "lucide-react";
import { VideoFeed } from "./demo/video-feed";
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        reduce ? { opacity: 1, y: 0 } : { opacity: [0.65, 1], y: [15, 0] }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
export function Comparison() {
  const [active, setActive] = useState(true);
  const [status, setStatus] = useState<
    "idle" | "loading" | "running" | "error"
  >("idle");
  return (
    <div className="comparison">
      <div className="comparison-visual">
        <VideoFeed
          key={String(active)}
          src="/videos/logistics.mp4"
          poster="/images/warehouse.jpg"
          overlays={active}
          detection={active}
          onStatus={setStatus}
        />
        <span className="comparison-video-label">PRERECORDED STOCK VIDEO</span>
        <span className="comparison-video-status">
          {!active
            ? "CAMERA VIEW"
            : status === "running"
              ? "OBJECT DETECTION ACTIVE"
              : status === "loading"
                ? "LOADING DETECTOR"
                : status === "error"
                  ? "DETECTOR UNAVAILABLE"
                  : "DETECTION PAUSED"}
        </span>
      </div>
      <div className="comparison-copy">
        <div className="segmented" aria-label="Monitoring mode">
          <button aria-pressed={!active} onClick={() => setActive(false)}>
            Traditional CCTV
          </button>
          <button aria-pressed={active} onClick={() => setActive(true)}>
            With Visolution
          </button>
        </div>
        <h3>
          {active
            ? "See the signal. Take the next step."
            : "Footage is only the beginning."}
        </h3>
        <p>
          {active
            ? "On this sample video, the browser highlights objects it recognizes. The planned platform would add configured rules, event evidence and alerts for your team to review."
            : "A camera records the scene. Someone still needs to spot the risk or find it in the recording later."}
        </p>
        <ul className="clean-list">
          {(active
            ? [
                "Surface potential violations",
                "Review alerts and event evidence",
                "Support timely corrective action",
              ]
            : [
                "Record video footage",
                "Rely on manual observation",
                "Review after an incident",
              ]
          ).map((x) => (
            <li key={x}>
              <span className={active ? "mint" : ""}>↗</span>
              {x}
            </li>
          ))}
        </ul>
        <span className="fine-print">
          Object boxes are browser predictions on stock footage. Safety alerts
          are planned and require human review.
        </span>
      </div>
    </div>
  );
}
const steps = [
  {
    name: "Your existing cameras",
    label: "01 / CONNECT",
    icon: Camera,
    detail:
      "We assess supported NVR, DVR and RTSP streams. Camera placement, stream access and image quality are reviewed before a pilot.",
  },
  {
    name: "Visolution Edge",
    label: "02 / CAPTURE",
    icon: Cpu,
    detail:
      "A compact onsite gateway manages camera connections and captures selected frames or clips. Capacity depends on hardware, resolution and sampling rate.",
  },
  {
    name: "Managed AI analysis",
    label: "03 / UNDERSTAND",
    icon: ScanLine,
    detail:
      "Selected data travels over a secure outbound connection to Visolution Managed AI Infrastructure. Models and configured rules generate candidate events.",
  },
  {
    name: "Actionable alerts",
    label: "04 / RESPOND",
    icon: Bell,
    detail:
      "Structured events, authorized evidence and planned notifications help your team review what happened and decide how to respond.",
  },
];
export function Pipeline() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="pipeline">
      <div className="pipeline-steps">
        {steps.map((s, i) => (
          <button
            key={s.name}
            className={
              selected === i ? "pipeline-step active" : "pipeline-step"
            }
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
          >
            <span className="mono">{s.label}</span>
            <s.icon size={34} strokeWidth={1} />
            <h3>{s.name}</h3>
            {i < 3 && <ArrowRight className="pipeline-arrow" size={20} />}
          </button>
        ))}
      </div>
      <div className="pipeline-detail" aria-live="polite">
        <span className="status-dot" />
        <p>{steps[selected].detail}</p>
        <span className="mono">PLANNED ARCHITECTURE</span>
      </div>
    </div>
  );
}
const components = [
  [
    "Edge",
    "Onsite camera gateway",
    "Connect supported streams, select frames or clips, monitor gateway health and buffer interruptions where feasible.",
    Cpu,
  ],
  [
    "Inference",
    "Managed GPU analysis",
    "Run configured vision models on managed compute, with capacity assessed for each installation.",
    ScanLine,
  ],
  [
    "Detect",
    "Rules that reflect your operation",
    "Apply configured zones and conditions, validate candidate detections and reduce duplicate events.",
    ShieldCheck,
  ],
  [
    "Events",
    "Evidence with context",
    "Organize authorized event evidence and structured records for review, with retention controls on the roadmap.",
    Database,
  ],
  [
    "Console",
    "An operational overview",
    "Bring camera status, review queues and historical reports into a planned monitoring dashboard.",
    Monitor,
  ],
  [
    "Alerts",
    "The next action, made clearer",
    "Route events through agreed notification channels and escalation policies during a future deployment.",
    Bell,
  ],
] as const;
export function Architecture() {
  const [index, setIndex] = useState(0);
  const item = components[index];
  const Icon = item[3];
  return (
    <div className="architecture">
      <div className="architecture-tabs">
        {components.map(([name, , , Icon], i) => (
          <button
            aria-pressed={index === i}
            onClick={() => setIndex(i)}
            key={name}
          >
            <Icon size={22} />
            <span>
              <small>VISOLUTION</small>
              {name}
            </span>
            <span className="mono">0{i + 1}</span>
          </button>
        ))}
      </div>
      <div className="architecture-content">
        <Icon size={64} strokeWidth={1} />
        <span className="eyebrow">PROPOSED PLATFORM COMPONENT</span>
        <h2>{item[1]}</h2>
        <p className="lead">{item[2]}</p>
        <div className="architecture-trace">
          CAMERA <ArrowRight size={16} /> EDGE <ArrowRight size={16} /> AI{" "}
          <ArrowRight size={16} /> EVENT
        </div>
      </div>
    </div>
  );
}
