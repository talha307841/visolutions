import { PageHero, Eyebrow, CTA } from "@/components/marketing";
import { pageMeta } from "@/lib/metadata";
export const metadata = pageMeta(
  "About Visolution",
  "An engineering-led visual intelligence startup being developed in Karachi, Pakistan, to turn existing CCTV into actionable operational insights.",
  "/about",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="ABOUT VISOLUTION / A PRACTICAL VISION"
        title="There’s more in the picture."
        description="Organizations have invested in cameras. We believe the next step is making the operational intelligence within those streams useful."
      />
      <section className="container page-content">
        <div className="value-grid">
          <div>
            <Eyebrow>BUILT IN KARACHI. THINKING BEYOND.</Eyebrow>
            <h2>
              Real problems.
              <br />
              <span>Thoughtful engineering.</span>
            </h2>
          </div>
          <div className="editorial">
            <p style={{ marginTop: 0 }}>
              Visolution is an early-stage startup developing AI-powered safety
              and compliance monitoring for manufacturing, healthcare operations
              and warehousing. Our initial focus is Pakistan, with an
              architecture designed for future international expansion.
            </p>
            <p>
              We don’t sell cameras. Our goal is to make supported camera
              infrastructure more useful: selected visual conditions, relevant
              event evidence and timely human review.
            </p>
            <p>
              We are currently developing the platform. This website and its
              simulation explain the intended experience; they do not represent
              a deployed production system.
            </p>
          </div>
        </div>
        <div className="principles">
          {[
            [
              "Practical AI",
              "Start with a defined operational challenge, not a technology looking for a purpose.",
            ],
            [
              "Responsible monitoring",
              "Respect the people in the picture. Minimize data, choose camera locations carefully and keep people in the review process.",
            ],
            [
              "Measurable value",
              "Evaluate quality and operational usefulness in a focused pilot before extending the scope.",
            ],
          ].map(([h, p], i) => (
            <div key={h}>
              <span className="mono mint">0{i + 1}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
