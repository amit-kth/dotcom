# Verification — route structure, Tailwind palette, SEO and GTM

## Automated export checks

Run from `revamp/`:

```sh
npm run build
npx tsc --noEmit
python3 scripts/verify-export.py
```

All passed. Each exported page (home, contact, solutions) contains exactly one
real title tag, canonical link, GTM loader bootstrap, Organization JSON-LD block,
and WebSite JSON-LD block. Embedded React payloads are not counted as HTML tags.
Metadata values in `config/variables.ts` are unchanged.

## Chromium checks

Tested the production static export at 1440 × 900 and 390 × 844, including:

- Direct loads of `/`, `/contact/`, `/solutions/`: one title and canonical,
  two site-wide schema blocks, `window.dataLayer` is an array. No initial
  `page_view` pushed by RouteTracker.
- Next Link navigation home → contact → solutions → home: one GTM request for
  the complete session; one `page_view` per changed pathname. No repeated loader.
- No React script-rendering warning or page exception, on direct or Link visits.
- Both normal and reduced-motion navigation tested. Fixed a hydration mismatch
  by using a server-consistent reduced-motion snapshot before browser hydration.
- Contact demo URL pre-fills K-Exam and the title. Radix Solution menu opens and
  offers all five products plus the empty option; Escape dismisses it.
- No horizontal overflow at either viewport. On mobile the last category chip
  ends at about 687px in the 844px viewport.
- New AI banner and blue icon visually inspected in actual browser screenshots.

### Network limitation

Google Tag Manager is outside the sandbox's outbound allowlist. Browser tests
recorded its actual requested URL and served a stub response. This verifies
our loader executes once, initializes dataLayer, and does not re-request on
navigation. It does **not** verify the live GTM container or downstream Google
Analytics delivery. Those require a deployment with access to Google's host.
The phone library's remote flag CDN is also blocked here.

Scrollbar rules use standard scrollbar-color/width and an older WebKit fallback,
with forced-colour resets. Chromium was tested; Safari and Firefox were not
available for runtime checks. Native OS overlay-scrollbar preferences still apply.
