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

## Office gallery update

About cells now use 32px corners. The shared footer's new office gallery uses
only the supplied locations and map URLs, with a separate ImageKit base so
existing local banners/logos are unaffected. Existing phone/contact links remain
unchanged.

Chromium: click selection, arrow-key selection, UAE map URL, pause/resume control
and reduced-motion playback suppression pass with no page exceptions. Layouts
at 1440/768/390/320px have no horizontal overflow; the active address stays
inside its panel. Phone panels stack vertically with 44px collapsed targets.
Build, TypeScript and exported SEO checks pass. Remote ImageKit image responses
cannot be verified here because that host is outside the outbound allowlist.


## Footer compactness follow-up

Removed the unrequested Play/Pause control and the address hover underline.
Reduced CTA, gallery and column spacing; mobile uses a two-column link layout.
WhatsApp now uses a green brand logo/link. Social icons use a non-wrapping row
with enough width reserved in the desktop grid. The Clients title keeps go-live
together and renders on two deliberate lines.

Chromium checks at 1440/1024/768/691/390/320px confirmed one social row, no
horizontal overflow, no playback button, and the Clients heading fitting its
container. Build, TypeScript and exported SEO checks pass.

## UI/contact corrections (2026-10-30)

- Header is 52px; Contact us is 36px high. Transparent over the homepage hero only, white after the hero and on other routes. Hero extends underneath the transparent header.
- White desktop Solutions panel and mobile navigation. Checked direct routes and client-side navigation to Contact.
- Removed product hover border. Phone banners use image-first 3:7 grid rows, with a gradient into the content background. Measured image ratios: 29.98% at 390px and 29.96% at 320px.
- Sticky shading is clipped inside the card radius; the final product has 16px side margins on phones, including reduced-motion mode.
- About cards use one-time, staggered directional transforms with a short blur/fade. All five settle at opacity 1, blur 0, no transform. Reduced motion bypasses the entrance. Removed the location suffix from the heading.
- Bottom solution CTA is a solid blue strip with a heading and Contact us action, side-by-side above the small breakpoint.
- Contact uses light surfaces and dark text. Compared against the legacy form in root index.php: Your Name, Your Email, Contact Number, Your Subject, Message, hidden country_name, Send Message. Removed the invented Solution control and payload property. Product links retain context in the heading only.
- No em dash characters remain in revamp/src.
- Build, TypeScript, static SEO export checks and git diff whitespace checks pass. Browser checks at 1440x900, 390x900 and 320x900: no horizontal overflow on home/contact, no uncaught page errors. Additional navigation/reduced-motion checks at 1366x768 and 390x650 pass.
- Contact delivery remains the existing TODO endpoint/local simulation; this change does not configure a backend. External CDN image delivery was not verified from the network-restricted sandbox.

### Single header logo (2026-10-30)

Recoloured the supplied transparent 330x86 red logo to Tailwind blue-600, preserving every alpha value and the original artwork. Header uses only logo/kriscent-blue.png. The transparent state uses CSS grayscale and increased brightness to render it white; light headers show its native blue. Browser checks at 1440px and 390px confirm the same loaded source and identical 107.4375x28 rendered dimensions in both states. Build, TypeScript and static SEO export checks pass.
