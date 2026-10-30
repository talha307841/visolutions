import { ArrowRight } from "lucide-react";
import { PageHero, Eyebrow, Pilot, CTA } from "@/components/marketing";
import { Pipeline } from "@/components/interactions";
import { faq } from "@/data/faq";
import { pageMeta } from "@/lib/metadata";
export const metadata = pageMeta(
  "How Visolution Works",
  "Understand the proposed CCTV gateway, secure data transmission, managed GPU analysis and human event review workflow.",
  "/how-it-works",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="HOW IT WORKS / THE PATH TO A PILOT"
        title="Your infrastructure. A new layer of understanding."
        description="First, understand the risk. Then assess the cameras, connect a gateway and validate a focused monitoring workflow. Expand only when the evidence supports it."
      />
      <section className="container">
        <Pipeline />
        <div className="flow-strip">
          {[
            "Camera",
            "NVR / DVR / RTSP",
            "Gateway",
            "Secure connection",
            "GPU inference",
            "Rules & events",
            "Dashboard",
          ].map((s, i) => (
            <span
              key={s}
              style={{ display: "inline-flex", gap: 16, alignItems: "center" }}
            >
              {s}
              {i < 6 && <ArrowRight size={13} />}
            </span>
          ))}
        </div>
        <p className="fine-print">
          Proposed architecture · All inference infrastructure is described as
          Visolution Managed AI Infrastructure.
        </p>
        <div className="principles">
          <div>
            <Eyebrow>01 / UNDERSTAND</Eyebrow>
            <h3>Start with your operation.</h3>
            <p>
              Identify a visible risk, agree on who reviews alerts and define
              what a useful response looks like.
            </p>
          </div>
          <div>
            <Eyebrow>02 / CONFIGURE</Eyebrow>
            <h3>Assess before connecting.</h3>
            <p>
              Check stream access, camera angles, lighting and bandwidth.
              Install and configure the gateway only within an approved pilot.
            </p>
          </div>
          <div>
            <Eyebrow>03 / REVIEW</Eyebrow>
            <h3>Make evidence actionable.</h3>
            <p>
              Potential events pass through rules and validation. Authorized
              teams review the evidence and decide on the next action.
            </p>
          </div>
        </div>
      </section>
      <Pilot />
      <section className="container page-content faq">
        <Eyebrow>THE PRACTICAL QUESTIONS</Eyebrow>
        <h2>Clarity before connection.</h2>
        <div style={{ marginTop: 30 }}>
          {faq.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
