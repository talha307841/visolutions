import { PageHero } from "@/components/marketing";
import { pageMeta } from "@/lib/metadata";
export const metadata = pageMeta(
  "Website Terms of Use",
  "Terms for using the Visolution company website and clearly labeled interactive product simulation.",
  "/terms",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="WEBSITE TERMS / UPDATED 30 OCTOBER 2026"
        title="A shared understanding."
        description="These terms describe the scope of this website and its product demonstration. A production deployment would require a separate written agreement."
      />
      <article className="container page-content editorial">
        <h2>A platform in development</h2>
        <p>
          Visolution is developing a visual intelligence platform. Website
          descriptions explain intended product capabilities and proposed
          architecture. They are not a commitment that any feature, integration
          or service is currently available.
        </p>
        <h2>Simulation, not a monitoring service</h2>
        <p>
          The interactive demo uses prerecorded stock videos and fictional
          sample events and illustrative overlays. The warehouse preview uses
          sampled model predictions; an optional browser model produces general
          person predictions. Safety events are scripted examples.
          No live cameras are connected, and the website must not be used as a
          safety system, emergency service or compliance determination.
        </p>
        <h2>Responsible website use</h2>
        <p>
          Please use the website lawfully. Do not attempt to disrupt the
          service, bypass access controls, submit malicious content or use the
          inquiry form to transmit footage or sensitive personal information.
          Only share contact details you are authorized to provide.
        </p>
        <h2>Pilot inquiries</h2>
        <p>
          Submitting a form expresses interest in a discussion. It does not
          create a service agreement, reserve capacity or establish pricing.
          Pilot scope, compatibility, measurement criteria, responsibilities and
          data handling must be agreed separately. No free pilot is promised.
        </p>
        <h2>Content and availability</h2>
        <p>
          The Visolution brand, website design and original illustrations are
          provided for viewing and evaluating the proposed offering. Do not
          represent the demo as your own monitoring service or actual customer
          evidence. The website may change as development progresses and may be
          temporarily unavailable.
        </p>
        <h2>Operational decisions</h2>
        <p>
          Detection quality depends on installation conditions and must be
          evaluated in context. Human review, qualified safety practices and
          appropriate inspections remain essential. The website provides product
          information, not medical, legal or regulatory advice.
        </p>
        <h2>Questions</h2>
        <p>
          Use the contact page to view configured contact methods or request a
          pilot discussion. Any future product or service terms will be
          presented as part of that engagement.
        </p>
      </article>
    </>
  );
}
