import { PageHero, CTA, Eyebrow } from "@/components/marketing";
import { Architecture } from "@/components/interactions";
import { pageMeta } from "@/lib/metadata";
export const metadata = pageMeta(
  "Visual Intelligence Platform",
  "Explore Visolution’s proposed edge gateway, managed AI inference, configurable detection and event review architecture.",
  "/platform",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="THE PLATFORM / ONE CONNECTED SYSTEM"
        title="From visual signals to operational decisions."
        description="A practical intelligence layer for supported CCTV systems. Designed to connect what your cameras see with the context your team needs."
      />
      <section className="container page-content">
        <Architecture />
        <p className="fine-print" style={{ marginTop: 18 }}>
          These are proposed component names within a platform in development,
          not separately launched products.
        </p>
        <div className="section value-grid">
          <div>
            <Eyebrow>ARCHITECTURE WITH A PURPOSE</Eyebrow>
            <h2>
              Local connection.
              <br />
              <span>Managed intelligence.</span>
            </h2>
            <p className="lead">
              The onsite gateway handles camera connectivity and selected video
              capture. GPU inference runs on Visolution Managed AI
              Infrastructure, with structured events flowing into a review
              workflow.
            </p>
          </div>
          <div className="roadmap-list">
            {[
              "Authenticated gateways & encrypted communications",
              "Customer data isolation & access control",
              "Defined retention & secure deletion",
              "Audit logs & review history",
              "Configurable rules & duplicate reduction",
              "Deployment flexibility",
            ].map((x) => (
              <div key={x}>
                <span>{x}</span>
                <small>Planned</small>
              </div>
            ))}
          </div>
        </div>
        <div className="editorial">
          <h2>Built for human judgment.</h2>
          <p>
            Potential detections should support the people responsible for
            safety. They do not establish regulatory compliance or replace
            qualified inspections. Future production deployments will require
            customer-approved camera placement, measured detection quality and
            explicit data-handling policies.
          </p>
          <p>
            The current website demonstrates the interface using local sample
            data and stock videos. A general-purpose detector can run locally in
            your browser on those samples. It does not connect to live cameras
            or offer customer accounts.
          </p>
        </div>
      </section>
      <CTA />
    </>
  );
}
