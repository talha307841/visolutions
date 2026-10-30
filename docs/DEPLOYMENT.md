# Vercel deployment

The project is a standard Next.js application. Do not export as static HTML: `/api/contact` requires the Node.js runtime. Node.js 22+ is required by the package configuration. `npm install`, `npm run dev`, `npm run build` and `npm start` are the supported commands.

Import the repository with the Next.js preset, root directory at the repository root and default output configuration. No special `vercel.json` is required. Configure `NEXT_PUBLIC_SITE_URL` to the actual deployed origin and rebuild whenever changing public settings. Configure `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` from `.env.example` to enable inquiry delivery. The recipient defaults to `muhammadtalhayousaf3@gmail.com`; set `CONTACT_TO_EMAIL` to change it. Verify the sender domain in Resend and use a real recipient inbox. Never commit `.env.local` or expose `RESEND_API_KEY` through a public variable.

Public optional settings: contact email, phone, WhatsApp URL, company address, booking URL and LinkedIn URL. They are hidden unless configured. Before enabling collection, provide a privacy contact and confirm privacy/retention details. Environment settings are deployment-specific: use test recipients or disabled email in previews.

## Delivery and spam behavior

Zod validates on client/server. Honeypot rejects bot submissions. Same-origin checking rejects browser submissions from other origins. A per-instance hashed-IP map limits five requests per 15 minutes; this is best-effort, not distributed enforcement. Add shared rate limiting or deployment firewall controls when traffic warrants it. Only acceptance by the actual provider creates a success response. Missing settings return 503; provider failure returns 502. There is no durable lead queue or retry mechanism.

## Validation

Build before running Playwright because the test runner starts `next start`. Use `npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to an existing Chrome executable. Run typecheck, lint, production build and tests. Check the deployed canonical URL, social preview, all routes and a real email inquiry after deployment. Test provider errors using the included mocked API test; no paid email or live lead is sent by the suite.

No deployment was performed during implementation. Successful local build does not verify Vercel account/domain configuration or inbox delivery. Lighthouse has not been measured; obtain deployment measurements before making performance claims.
