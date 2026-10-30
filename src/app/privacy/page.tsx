import { PageHero } from "@/components/marketing";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/config/site";
export const metadata = pageMeta(
  "Website Privacy Notice",
  "How this Visolution website handles pilot inquiries and local demonstration data.",
  "/privacy",
);
export default function Page() {
  return (
    <>
      <PageHero
        label="WEBSITE PRIVACY / UPDATED 30 OCTOBER 2026"
        title="Clarity about your information."
        description="This notice covers the Visolution company website and its interactive simulation. Future CCTV deployments will require separate data-handling agreements."
      />
      <article className="container page-content editorial">
        <h2>Information you choose to share</h2>
        <p>
          The pilot inquiry form requests your name, work email, organization,
          industry, role, location and operational challenge. Phone number,
          camera count and an additional message are optional. Please do not
          submit video footage, patient information or other sensitive personal
          data.
        </p>
        <h2>How an inquiry is handled</h2>
        <p>
          When email delivery is configured, form details are sent through
          Resend to the configured business inbox to help Visolution respond to
          your inquiry and discuss a potential pilot. If delivery is
          unavailable, the website states that the inquiry has not been sent.
          The website does not maintain a lead database.
        </p>
        <h2>Demo data and tracking</h2>
        <p>
          The interactive console uses local React state. It does not access
          cameras or upload video. Optional object detection runs locally in
          your browser on prerecorded sample footage; it does not identify
          individuals. Demo changes disappear on reload. No analytics scripts,
          advertising cookies or third-party tracking have been added to this
          website.
        </p>
        <h2>Hosting and security</h2>
        <p>
          The deployment host may process ordinary request information, such as
          IP addresses and browser details, to serve and protect the website.
          The contact endpoint uses a short-lived hashed IP key for basic
          request limiting; these records expire after 15 minutes within the
          running server instance. Email handling and hosting may involve
          service providers outside your country.
        </p>
        <h2>Retention and choices</h2>
        <p>
          Inquiry correspondence remains in the configured business inbox and
          email provider systems according to their settings. A fixed business
          retention schedule has not yet been published. You can request access,
          correction or deletion of inquiry correspondence through the
          configured contact method. Necessary operational or legal records may
          be retained where applicable.
        </p>
        <h2>Future camera monitoring</h2>
        <p>
          No CCTV processing occurs on this website. Any future pilot must
          define the purpose, approved camera locations, access permissions,
          storage scope, retention period and deletion process before data
          capture. Sensitive treatment areas are outside the proposed healthcare
          monitoring scope.
        </p>
        <h2>Contact</h2>
        <p>
          {site.email ? (
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          ) : (
            "A business privacy contact has not yet been configured. The owner must provide a contact method before enabling collection of pilot inquiries."
          )}
        </p>
      </article>
    </>
  );
}
