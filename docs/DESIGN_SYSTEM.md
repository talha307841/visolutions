# Design system

## Direction

Industrial control room meets editorial product storytelling. Dark graphite backgrounds, warm mint signals, precise thin borders and large typography. Original SVG scenes make the proposed product tangible without presenting fake customer surveillance. Avoid decorative neon, repetitive feature cards and invented credibility.

## Tokens and typography

Tokens live in `src/app/globals.css`: background `#080e13`, alternate `#0d151b`, surface `#111c23`, border `#243039`, text `#eff4f2`, muted `#9caaae`, accent `#5ee0bc`, warning `#e9bb63`. Manrope Variable is locally bundled; technical labels use system monospace. Fluid headings, readable line lengths and a centered 1320px content area create hierarchy. Console microcopy is deliberately compact; meaningful actions retain accessible labels.

## Composition

Asymmetric split hero, custom console, industry strip, interactive comparison, photographic industry panels, full console showcase, four-step system diagram, numbered capabilities, roadmap rows, pilot sequence, final CTA and full navigation footer. Supporting pages share typography and shell, but use content-specific compositions.

## Components and behavior

`Button` follows the shadcn composition model with Radix Slot, CVA variants and merge utilities. `components.json` supports further shadcn additions. Motion is isolated to reveal wrappers. Reduced motion disables transitions/reveals. Interactive controls use semantic buttons, pressed/expanded state and accessible labels. Native dialog handles focus trapping and Escape. FAQs use native details/summary. Form errors are associated with fields; status updates use live regions.

The console supports selection, expanded view, overlays, deterministic sample generation, evidence review, acknowledgment, category/severity filters, analytics, preferences and reset. No external data service or persistence is implied.

## Responsive and asset strategy

Layouts adapt at 1200/1000/760/400px; navigation collapses below 1000px. The console sidebar becomes an accessible horizontal icon toolbar on mobile. Decorative sidebar text is removed, while filters and evidence controls remain. The product demo uses original SVG scenes. Industry panels use locally stored licensed Pexels photographs; see `IMAGE_CREDITS.md`. Manrope is OFL; Lucide is ISC. No third-party tracking is included.

Accessibility and Lighthouse scores are targets, not certifications. Test with real assistive technologies before asserting full compliance.
