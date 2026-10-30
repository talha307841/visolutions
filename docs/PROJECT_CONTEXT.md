# Project context

Company: **Visolution**. Tagline: **See Risks. Prevent Violations.**
Mission: turn existing CCTV infrastructure into actionable visual intelligence. Initial market: Pakistan, starting in Karachi; architecture and positioning should permit international expansion. Initial sectors: manufacturing/industrial operations, healthcare operational areas, warehousing/logistics and retail/shopping malls.

## Scope and positioning

Phase one is only the company website. The platform is in development. We do not sell cameras; the planned system adds an intelligence layer to supported existing camera infrastructure. The business value is earlier risk awareness, less manual video review, structured evidence and more useful operational visibility.

Never fabricate customers, accuracy, savings, testimonials, certifications, partners, team biographies, funding or availability. Use “planned”, “designed to” and “subject to pilot validation”. Stock video and fictional event scenarios are clearly labeled. The warehouse viewer uses actual offline Grounding DINO predictions and approximate IoU-associated IDs; the optional person detector runs in the browser. Both are distinct from fictional safety events. No production monitoring, authentication or model service belongs in this phase.

## Implementation decisions

Next.js App Router runs on Vercel with server-only email delivery through Resend. Public pages are predominantly static/server rendered; interactive islands hold local state. Warehouse predictions live in `src/data/warehouse-detections.json`, scenario definitions live in `src/data/demo-scenarios.ts`, and the UI lives in `src/components/demo/`. See MEDIA_PROVENANCE.md for source licenses and limitations. Industry photographs are licensed stock images and are documented in IMAGE_CREDITS.md. Font assets are bundled, not fetched at runtime.

The homepage headline uses the brief's creative freedom: “See the risk. Make the next move.” Its supporting text explicitly communicates proactive intelligence and human action. No account/signup/login UI is implied. No contact detail is published until configured.

## Boundaries that must survive later changes

A gateway cannot support unlimited streams. Performance depends on hardware, codecs, frame rate, bandwidth and resolution. Compatibility is assessed. Near-real-time behavior is deployment-dependent; uninterrupted operation is not promised. GPU infrastructure is always described as “Visolution Managed AI Infrastructure”; physical location must not be exposed.

Healthcare monitoring is limited to approved, non-sensitive operational areas. It cannot determine hospital-wide regulatory compliance, invisible contamination, infections or clinical errors. Warehouse order verification may require barcode/ERP/dedicated cameras. Human review remains required.

## Documentation map

`FUTURE_ARCHITECTURE.md` preserves the proposed production architecture. `DESIGN_SYSTEM.md` documents tokens and interaction patterns. `DEPLOYMENT.md` covers Vercel and configuration. `PRODUCT_ROADMAP.md` separates current website features from future production work.

Retail scope includes planned drawer-open duration and after-hours rules, doors left open, restricted-area activity and checkout/exit review. Camera visibility and validation are required; drawer or door sensors may be necessary. Suspected unpaid product exit requires synchronized POS data and reliable product identity (such as barcode, RFID or dedicated cameras) and trained human review. Ordinary CCTV cannot establish nonpayment or theft. No named retailer is represented as a customer.
