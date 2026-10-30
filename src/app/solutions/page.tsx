import { PageHero, Industries, CTA } from "@/components/marketing";
import { pageMeta } from "@/lib/metadata";
export const metadata = pageMeta(
  "Solutions for Real-World Operations",
  "Explore planned industrial safety, healthcare compliance, warehouse and retail monitoring solutions using supported CCTV systems.",
  "/solutions",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="SOLUTIONS / BUILT AROUND YOUR OPERATION"
        title="Different environments. A clearer view of risk."
        description="Every operation has its own blind spots. Start with a specific, visible condition that matters to your team—and a practical path to reviewing it."
      />
      <section className="container page-content">
        <Industries />
        <p className="fine-print" style={{ marginTop: 35 }}>
          All monitoring scenarios are planned capabilities, subject to camera
          assessment and controlled pilot validation. No production detection
          capabilities are claimed.
        </p>
      </section>
      <CTA />
    </>
  );
}
