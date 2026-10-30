import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  ScanLine,
  CircleDot,
  Check,
} from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { StoryPreview } from "@/components/demo/story-video";
import { WarehousePreview } from "@/components/demo/warehouse-vision";
import { scenarioById } from "@/data/demo-scenarios";
import { Eyebrow, Industries, Pilot, CTA } from "@/components/marketing";
import { Pipeline, Reveal } from "@/components/interactions";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Visolution",
            url: site.url,
            description: site.description,
            slogan: "See Risks. Prevent Violations.",
            areaServed: "Pakistan",
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero-v2 container">
        <div className="hero-v2-copy">
          <Eyebrow>VISUAL INTELLIGENCE FOR REAL OPERATIONS</Eyebrow>
          <h1>
            See the risk.
            <br />
            <span>Make the next move.</span>
          </h1>
          <p>
            Turn existing CCTV into a clearer view of your operation. Visolution
            is being designed to surface defined risks, organize evidence, and
            help your team act.
          </p>
          <div className="actions">
            <Button asChild>
              <Link href="/demo">
                Explore interactive demo <ArrowUpRight size={17} />
              </Link>
            </Button>
            <Link href="/contact" className="hero-v2-link">
              Request a pilot <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-v2-note">
            <span className="status-dot" /> PLANNED PLATFORM · BUILT FOR
            EXISTING CAMERAS
          </div>
        </div>
        <div className="hero-v2-visual">
          <div className="hero-v2-frame">
            <div className="hero-v2-bar">
              <span>
                ◈ &nbsp;VISOLUTION <i>/</i> SCENARIO PREVIEW
              </span>
              <span>RECORDED SAMPLE</span>
            </div>
            <WarehousePreview hero />
            <div className="hero-v2-event">
              <div className="hero-v2-event-icon">↗</div>
              <div>
                <small>RECORDED SAMPLE / OBJECT DETECTION</small>
                <strong>Explore objects in a sorting area</strong>
                <span>Sampled model output · select an object in the demo</span>
              </div>
              <Link href="/demo" aria-label="Explore the package flow demo">
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
          <div className="hero-v2-visual-foot">
            <span>01 / WAREHOUSE OPERATIONS</span>
            <span>STOCK FOOTAGE · MODEL PREDICTIONS</span>
          </div>
        </div>
      </section>
      <div className="industry-strip">
        <div className="container">
          <span className="mono">
            PURPOSE-BUILT FOR
            <br />
            THE PLACES THAT MATTER.
          </span>
          <span>
            <ScanLine /> Manufacturing
          </span>
          <span>
            <ShieldCheck /> Healthcare
          </span>
          <span>
            <CircleDot /> Warehousing & logistics
          </span>
          <span>
            <CircleDot /> Retail & malls
          </span>
        </div>
      </div>
      <section className="section container narrative-intro">
        <div>
          <Eyebrow>01 / FROM FOOTAGE TO ACTION</Eyebrow>
          <h2>
            Your cameras record.
            <br />
            <span>Your team needs to know.</span>
          </h2>
        </div>
        <p>
          When an important condition is easy to miss, a camera alone is not
          enough. We’re building a way to bring the right moment to the people
          who can act on it.
        </p>
      </section>
      <section className="case-stories container">
        <div className="case-story">
          <div className="case-story-visual">
            <WarehousePreview />
          </div>
          <div className="case-story-copy">
            <Eyebrow>02 / WAREHOUSE OPERATIONS</Eyebrow>
            <h2>
              See the movement.
              <br />
              <span>Understand the flow.</span>
            </h2>
            <p>
              Explore sampled model predictions for parcels, people and carts,
              then select a track to inspect its label and score.
            </p>
            <div className="story-steps">
              <span>01 &nbsp; SEE THE ITEM</span>
              <span>02 &nbsp; FOLLOW THE TRACK</span>
              <span>03 &nbsp; INSPECT THE RESULT</span>
            </div>
            <Link className="text-link" href="/demo">
              Explore package flow <ArrowUpRight size={17} />
            </Link>
            <small>
              Real model predictions on recorded footage. Counts are unverified
              candidate regions, not inventory totals.
            </small>
          </div>
        </div>
        <div className="case-story reverse">
          <div className="case-story-visual">
            <StoryPreview scenario={scenarioById("forklift-safety")} />
          </div>
          <div className="case-story-copy">
            <Eyebrow>03 / WORKPLACE SAFETY</Eyebrow>
            <h2>
              See the activity.
              <br />
              <span>Bring context to the team.</span>
            </h2>
            <p>
              People and vehicles share operational spaces. A planned review
              workflow can help teams focus on a configured area without
              watching every screen.
            </p>
            <div className="story-steps">
              <span>01 &nbsp; SEE THE SCENE</span>
              <span>02 &nbsp; REVIEW THE ZONE</span>
              <span>03 &nbsp; DECIDE THE ACTION</span>
            </div>
            <Link className="text-link" href="/demo">
              Explore safety scenarios <ArrowUpRight size={17} />
            </Link>
            <small>
              Illustrative workflow. No distance, dangerous proximity or actual
              violation is inferred from this footage.
            </small>
          </div>
        </div>
      </section>
      <section className="section section-tinted">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>02 / BUILT FOR YOUR WORLD</Eyebrow>
              <h2>
                Real environments.
                <br />
                <span>Real operational challenges.</span>
              </h2>
            </div>
            <Link className="text-link" href="/solutions">
              Find your solution <ArrowUpRight size={17} />
            </Link>
          </div>
          <Reveal>
            <Industries />
          </Reveal>
        </div>
      </section>
      <section className="section container product-invitation">
        <div>
          <Eyebrow>04 / EXPLORE THE WORKFLOW</Eyebrow>
          <h2>
            One view. A clearer
            <br />
            <span>next step.</span>
          </h2>
          <p className="lead">
            Explore three recorded scenarios and the planned workflows for
            emergency exits, retail and healthcare. Every example is labeled, so
            you can see exactly what is being demonstrated.
          </p>
          <Button asChild variant="outline">
            <Link href="/demo">
              Open the scenario explorer <ArrowUpRight size={17} />
            </Link>
          </Button>
        </div>
        <div className="invitation-list">
          {[
            ["01", "Package flow", "RECORDED SAMPLE"],
            ["02", "Forklift & people", "RECORDED SAMPLE"],
            ["03", "Protective equipment", "RECORDED SAMPLE"],
            ["04", "Retail & healthcare", "CONCEPTUAL"],
          ].map(([n, name, label]) => (
            <Link key={n} href="/demo">
              <span>{n}</span>
              <strong>{name}</strong>
              <small>{label}</small>
              <ArrowUpRight size={15} />
            </Link>
          ))}
        </div>
      </section>
      <section className="section section-tinted">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>04 / YOUR CAMERAS. OUR INTELLIGENCE.</Eyebrow>
              <h2>
                No need to replace
                <br />
                <span>your cameras.</span>
              </h2>
            </div>
            <p>
              A compact onsite gateway connects supported CCTV systems to
              Visolution Managed AI Infrastructure.
            </p>
          </div>
          <Pipeline />
          <p className="fine-print pipeline-note">
            Compatibility is assessed before deployment. Near-real-time
            monitoring is subject to deployment configuration.
          </p>
          <Link className="text-link" href="/how-it-works">
            Follow the architecture <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="section container capabilities">
        <div>
          <Eyebrow>05 / FOCUS ON WHAT MATTERS</Eyebrow>
          <h2>
            Defined risks.
            <br />
            <span>Actionable context.</span>
          </h2>
          <p className="lead">
            Start with a condition your team can observe, review and act on.
          </p>
          <span className="outline-tag">
            PLANNED CAPABILITIES · PILOT VALIDATION REQUIRED
          </span>
          <p className="fine-print" style={{ marginTop: 16 }}>
            Drawer and door monitoring needs a suitable camera view; sensors may
            be needed. Matching items at an exit to a sale requires POS and
            reliable product identification. All events require human review.
          </p>
        </div>
        <div className="capability-list">
          {[
            "Obstructed emergency exits",
            "PPE compliance",
            "Restricted-zone entry",
            "Forklift / pedestrian safety",
            "Medical-waste handling risks",
            "Unsafe storage conditions",
            "Cash drawers left open or opened after hours",
            "Doors left open after closing",
            "After-hours activity in selected areas",
            "Checkout and exit discrepancies (integration required)",
          ].map((x, i) => (
            <div key={x}>
              <span className="mono">0{i + 1}</span>
              <h3>{x}</h3>
              <span className="mint">↗</span>
            </div>
          ))}
        </div>
      </section>
      <section className="section section-tinted">
        <div className="container value-grid">
          <div>
            <Eyebrow>06 / BUILT WITH INTENT</Eyebrow>
            <h2>
              Operational intelligence.
              <br />
              <span>Responsible by design.</span>
            </h2>
            <p className="lead">
              Earlier risk awareness. Less manual video review. Structured
              evidence that supports your existing compliance processes.
            </p>
            <Link href="/platform" className="text-link">
              Inside the platform <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="roadmap-list">
            {[
              ["Secure gateway architecture", "Planned"],
              ["Managed inference & configurable rules", "Planned"],
              ["Event review & historical reports", "Planned"],
              ["Role-based access", "Roadmap"],
              ["Retention controls", "Roadmap"],
              ["Deployment flexibility", "Roadmap"],
            ].map(([name, status]) => (
              <div key={name}>
                <Check size={16} />
                <span>{name}</span>
                <small>{status}</small>
              </div>
            ))}
            <p className="fine-print">
              Explore the demonstration today. Production capabilities are in
              development.
            </p>
          </div>
        </div>
      </section>
      <Pilot />
      <CTA />
    </>
  );
}
