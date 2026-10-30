# Visolution

A complete, responsive company website for an early-stage visual intelligence business in Karachi, Pakistan. Built with Next.js App Router, strict TypeScript, Tailwind CSS, shadcn-style UI primitives, Motion, Lucide, React Hook Form, Zod and Resend. The warehouse explorer uses licensed stock footage and sampled model predictions; other scenario previews use hand-authored overlays and fictional timestamped events. An optional generic COCO-SSD person model runs locally in the browser on selected clips; it does not perform task-specific safety detection or run production AI inference.

## Run locally

Use Node.js 22 or newer and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. For a production preview:

```bash
npm run build
npm start
```

## Routes

`/`, `/solutions`, `/solutions/industrial-safety`, `/solutions/healthcare`, `/solutions/warehousing`, `/solutions/retail`, `/platform`, `/how-it-works`, `/demo`, `/about`, `/contact`, `/privacy`, `/terms`.

Generated endpoints: `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon.svg`. The form submits to `POST /api/contact`.

## Environment

Set `NEXT_PUBLIC_SITE_URL` to the actual absolute public URL before building a production deployment. It controls canonical links, sitemap and social metadata. It defaults to localhost for development; no purchased domain is assumed.

Email delivery requires a Resend key and verified sender. The recipient defaults to your inbox:

- `RESEND_API_KEY`: Resend API key.
- `CONTACT_FROM_EMAIL`: an address on a verified Resend sending domain.
- `CONTACT_TO_EMAIL`: optional recipient override; defaults to `muhammadtalhayousaf3@gmail.com`.

Optional public contact fields are listed in `.env.example` and centralized in `src/config/site.ts`. Empty fields are hidden. Configure `NEXT_PUBLIC_CONTACT_EMAIL` as the public inquiry/privacy contact before enabling the form. No invented contact details are published.

If email credentials are missing, the form explains that delivery is unavailable and the API returns 503. It never reports false success. A success response means the email provider accepted the message, not that it arrived in the recipient's inbox.

## Deploy to Vercel

1. Push this repository to your Git provider and import it into Vercel.
2. Select the Next.js preset with the repository root as the root directory. Use Node.js 22+, `npm install` and `npm run build`; retain Vercel's default output setting.
3. Configure the public site URL using the assigned Vercel domain or your owned domain. Add the email variables and public business contact details when ready.
4. Deploy. If the assigned URL was not known before the first build, update `NEXT_PUBLIC_SITE_URL` and redeploy.
5. Verify routes and submit a real inquiry after configuring Resend. Check the inbox/provider status. Preview deployments should use a test inbox or leave email unconfigured.

There is no static export: the contact endpoint requires the Next.js server runtime. No Vercel deployment has been performed by this implementation.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm test
```

If Chrome is already installed, point Playwright to it instead of installing a browser:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/opt/google/chrome/chrome npm test
```

Playwright starts a production server automatically (build first). Tests cover routes, metadata, navigation, responsive overflow at the six requested widths, mobile menu, demo actions, filters, acknowledgements, architecture controls, form validation, unavailable delivery, reduced motion and keyboard focus. API tests replace the provider fetch with local test doubles to verify accepted, rejected and failed delivery without sending email. Screenshots are written to ignored `test-results/`.

## Important limits

- This is the company website, not an operational monitoring platform. No live camera ingestion, gateway agent, production inference service, authentication or tenant storage is implemented.
- Rate limiting is best-effort per server instance. Vercel instances do not share the in-memory map. Add a durable distributed limiter or Vercel firewall rules before public-volume campaigns.
- Inquiry data is sent to the provider and configured inbox; there is no website lead database or durable queue. Provider/inbox retention and a privacy contact must be finalized by the owner.
- Privacy and terms describe current website behavior. The owner must confirm business details and obtain appropriate legal review before production data collection or CCTV pilots.
- No real email delivery or Vercel deployment is claimed. No Lighthouse score or full WCAG certification is claimed.
- The warehouse scenario displays sampled model predictions with approximate IoU-associated IDs. Other scenario overlays, IDs and event timestamps are scripted illustrations. The optional person model produces real, unvalidated generic-person predictions, separately labeled from the example events. Retail, blocked-exit and healthcare waste workflows are conceptual until suitable footage and validated models are available.
- The scenario explorer shows no fabricated confidence scores. It does not detect safety violations. Product features are planned and need validation.

## Project map

- `src/app`: server-rendered pages, metadata and contact endpoint.
- `src/components/demo`: isolated sample event state, stock-video playback, illustrative timing, overlays and event review.
- `src/components`: shared shell, marketing, interactive diagrams and form.
- `src/data`: solution copy, FAQs and deterministic event dataset.
- `src/config/site.ts`: public contact and site settings.
- `src/lib`: metadata helper, validation schema and UI utility.
- `docs`: persistent business context, architecture, design decisions, deployment and roadmap.

Fonts: bundled Manrope from Fontsource (OFL). Icons: Lucide (ISC). Demo evidence illustrations are original SVG. Demo videos and industry photographs are licensed through Pexels; see `docs/IMAGE_CREDITS.md`. Third-party packages retain their respective licenses.

Media sources, licenses and model limitations are documented in `docs/MEDIA_PROVENANCE.md`. Run `python scripts/prepare-demo-assets.py --ffmpeg /path/to/ffmpeg` to re-download and prepare the clips.

### Reproducing the warehouse predictions

The main warehouse preview uses a 5.04-second Pexels clip and ten sampled frames. `scripts/generate-warehouse-detections.mjs` uses the Apache-2.0 Grounding DINO Tiny ONNX model and Transformers.js 3.8.1 on CPU, and writes the checked-in JSON dataset. Install the inference package separately (`npm install --no-save @huggingface/transformers@3.8.1`); provide `VISOLUTION_FFMPEG` if ffmpeg is not on PATH, then run `node scripts/generate-warehouse-detections.mjs`. Model weights are downloaded to the system temporary cache and are not required by the deployed website. Review the thresholds, source license and caveats in `docs/MEDIA_PROVENANCE.md` before changing the dataset.
