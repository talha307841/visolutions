import { notFound } from "next/navigation";
import { solutions } from "@/data/solutions";
import { PageHero, Actions, CTA, Eyebrow } from "@/components/marketing";
import Image from "next/image";
import { ScenarioConsole } from "@/components/demo/scenario-console";
import { pageMeta } from "@/lib/metadata";
export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = solutions.find((s) => s.slug === slug);
  return s ? pageMeta(s.name, s.description, `/solutions/${slug}`) : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = solutions.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <>
      <PageHero
        label={s.label}
        title={s.headline}
        description={s.description}
      />
      <section className="container page-content">
        <div className="solution-feature">
          <div>
            <div className="solution-photo">
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                sizes="(max-width: 760px) 100vw, 55vw"
              />
            </div>
            <p className="fine-print" style={{ marginTop: 12 }}>
              Illustrative industry photography · Not customer footage
            </p>
          </div>
          <div>
            <Eyebrow>PLANNED MONITORING SCENARIOS</Eyebrow>
            <h2>
              Focus on the risks
              <br />
              your team can act on.
            </h2>
            <ul className="clean-list">
              {s.scenarios.map((x) => (
                <li key={x}>
                  <span className="mint">↗</span>
                  {x}
                </li>
              ))}
            </ul>
            <p className="fine-print">{s.audience}</p>
          </div>
        </div>
        {s.slug === "retail" && (
          <div className="section retail-workflow">
            <div>
              <Eyebrow>RETAIL OPERATIONS / PLANNED WORKFLOWS</Eyebrow>
              <h2>
                From a visible condition
                <br />
                <span>to a useful review.</span>
              </h2>
              <p className="lead">
                For supermarkets, shopping malls and multi-branch retailers,
                start with a specific, observable situation and agree what
                should happen when it is flagged.
              </p>
            </div>
            <div className="retail-workflow-list">
              <div>
                <span>01</span>
                <p>
                  <strong>Cash drawer & checkout</strong>Review a drawer left
                  open beyond an agreed time, or a visible opening outside
                  configured business hours. Clear camera placement or a drawer
                  sensor is essential.
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  <strong>Doors & restricted areas</strong>Flag a door visibly
                  left open after closing, after-hours movement or access to
                  selected staff-only areas. Door sensors can provide more
                  reliable state information.
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  <strong>Exit & payment review</strong>A future integration
                  could compare identifiable items and synchronized POS
                  transactions, then present possible mismatches to trained
                  staff. Barcode, RFID or dedicated cameras may be needed; CCTV
                  alone cannot confirm whether an item was paid for.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="section editorial">
          <Eyebrow>THE RIGHT CONTEXT MATTERS</Eyebrow>
          <h2>Useful visibility begins with a careful deployment.</h2>
          <p>{s.note}</p>
          <p>
            We begin with an operational discovery session, assess supported
            camera streams, and agree on a measurable use case. A controlled
            pilot should evaluate missed events, false alerts and the usefulness
            of the review workflow before expanding.
          </p>
          <Actions />
        </div>
        <div className="section-heading">
          <div>
            <Eyebrow>EXPLORE THE EXPERIENCE</Eyebrow>
            <h2>Your operation, in focus.</h2>
          </div>
          <p>
            Explore a planned workflow. Footage and events are illustrative; no
            live cameras are connected.
          </p>
        </div>
        <ScenarioConsole
          initialId={
            s.slug === "industrial-safety"
              ? "ppe-review"
              : s.slug === "healthcare"
                ? "medical-waste"
                : s.slug === "retail"
                  ? "cash-drawer"
                  : "forklift-safety"
          }
        />
      </section>
      <CTA />
    </>
  );
}
