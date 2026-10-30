import { PageHero } from "@/components/marketing";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/metadata";
export const dynamic = "force-dynamic";
export const metadata = pageMeta(
  "Request a Pilot",
  "Discuss your operational challenge, supported CCTV infrastructure and a focused Visolution visual intelligence pilot.",
  "/contact",
);
export default function Page() {
  const configured = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_FROM_EMAIL,
  );
  return (
    <>
      <PageHero
        label="LET’S TALK / THE FIRST STEP IS A CONVERSATION"
        title="Make your next camera insight count."
        description="Tell us about your operation, the cameras you have and the risks you want to understand. We’ll use that context to discuss a focused pilot."
      />
      <div className="container contact-layout">
        <aside className="contact-aside">
          <h2>A practical place to start.</h2>
          <p>
            No sweeping promises. A defined use case and a clear path to
            evaluating it.
          </p>
          <ol className="pilot-steps">
            {[
              "Understand your operational challenge",
              "Assess your camera setup",
              "Agree on a measurable pilot scope",
            ].map((x, i) => (
              <li key={x}>
                <span className="mono">0{i + 1}</span>
                {x}
              </li>
            ))}
          </ol>
          <div className="contact-links">
            <p>
              Karachi, Pakistan
              <br />
              <span className="fine-print">
                Initial market focus · Platform in development
              </span>
            </p>
            {site.email && <a href={`mailto:${site.email}`}>{site.email} ↗</a>}
            {site.phone && <a href={`tel:${site.phone}`}>{site.phone}</a>}
            {site.whatsapp && <a href={site.whatsapp}>WhatsApp ↗</a>}
            {site.booking && <a href={site.booking}>Book a conversation ↗</a>}
            {site.linkedin && <a href={site.linkedin}>LinkedIn ↗</a>}
            {site.address && <p>{site.address}</p>}
          </div>
        </aside>
        <ContactForm configured={configured} />
      </div>
    </>
  );
}
