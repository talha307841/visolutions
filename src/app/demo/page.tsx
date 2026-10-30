import { PageHero } from "@/components/marketing";
import { ScenarioConsole } from "@/components/demo/scenario-console";
import { pageMeta } from "@/lib/metadata";
export const metadata = pageMeta(
  "Interactive Product Demo",
  "Explore recorded warehouse model predictions, filter and inspect tracks, or review illustrative safety workflows. No live cameras connected.",
  "/demo",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="PRODUCT PREVIEW / YOUR INTERACTIVE WORKSPACE"
        title="See the signal. Explore the possibilities."
        description="Explore real model predictions on recorded warehouse footage, then compare illustrative safety workflows."
      />
      <section className="container page-content">
        <ScenarioConsole />
        <p className="fine-print" style={{ marginTop: 20 }}>
          Warehouse boxes are sampled predictions from a general-purpose model,
          not verified inventory counts. Forklift and PPE overlays and events
          are scripted examples; an optional person model runs locally on those
          two clips. No live cameras or production detection models are
          connected. The remaining workflows are conceptual.
        </p>
      </section>
    </>
  );
}
