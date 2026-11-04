# Revamp verification

## Scope and commands

All tracked changes are inside `revamp/`. The legacy PHP site is read-only.

`npm run check` passes: static production build, strict TypeScript with unused
locals/parameters enabled, six tests, and the exported-HTML audit. `npm audit
--omit=dev` reports no known vulnerabilities in the installed dependency tree.

## SEO and headings

- Homepage title, description, author, keywords, canonical and Open Graph/Twitter text
  values are checked against the unchanged root `index.php`. The new branded
  sharing image and large-image card are intentional exceptions.
- Legacy WebPage name, URL and description are retained. Organization and
  WebSite schemas remain; fabricated placeholder reviews/ratings and obsolete
  fragment references are excluded.
- Solutions and Contact keep their own relevant metadata because no equivalent
  legacy route files were supplied.
- Each route exports one title, canonical and H1, nonempty headings, unique IDs,
  valid local image paths and one GTM loader. A screen-reader-only H2 groups the
  featured Solutions cards before their H3 headings, without changing layout.
- `robots.txt`, the three-route sitemap, branded social image and static
  `404.html` are exported. Zoom remains accessible. The non-AMP page does not
  inherit the legacy AMP script or obsolete browser-compatibility scripts.
- Legacy social tags intentionally retain their existing mixed-host URLs and
  URL-valued `twitter:site`; no unverified replacement account was invented.
- Tawk configuration is retained but the widget is not enabled: adding a visible
  chat widget requires approval, not a silent SEO change.

## Cleanup and artwork

Removed the unreachable Select component and dependency, its keyframe, two
unused utility exports, the unused hero background and superseded social image.
Local-import reachability found no remaining orphaned source modules. Every
remaining public image has a source reference, and all remaining keyframes
have callers. Logos and artwork that appear via filters or marquees are kept.

K-Exam premium is a 1680×735 WebP, 47,932 bytes, preserving the left text zone
with exam-specific artwork on the right. All 35 general banners remain.

## Browser checks

Chromium checked `/`, `/solutions/` and `/contact/` at 320×568, 375×667,
390×844, 768×1024, 1024×768, 1366×768, 1440×900 and 2560×1440.
The 24 route/viewport checks passed horizontal-overflow, local-image loading,
search and runtime-error checks. Representative screenshots were inspected.

A reduced-motion hydration bug could leave the homepage headline invisible.
Its visible animation target is now preserved, without changing the design.
The post-fix run passed 12 more route/viewport checks at 390×844, 768×1024,
1366×768 and 2560×1440, explicitly asserting visible H1 descendants. Mobile
menu/Escape, Ctrl+K, multiple search matches, form validation and the real
unconfigured-error state passed. Normal-motion and JavaScript-disabled checks
also passed for the headline, centered desktop navigation, static Solutions
content and refreshed K-Exam rendering. No browser runtime errors were found.

Concurrent remote product updates were merged without overwriting them. Search
tests now cover AI Employees, its calling-agents alias and the Sales Automation
CRM ID. The rebuilt merged content passed six more mobile/laptop route checks
and the functional menu/search/form checks.

Browser tooling, screenshots and deployment archives are local artifacts, not
runtime dependencies or committed source. External CDN images, country flags,
analytics requests and external product pages cannot be verified from this
network-restricted environment; they were excluded from local-image checks.

## Deployment requirements

- Upload the contents of `out/`; no Next.js/Node server is required on cPanel.
- Configure hosting rules as described in README.md, preserving legacy PHP and
  product directories. Prefer `index.html` over `index.php` and return actual
  HTTP 404 responses. Verify redirects/HTTPS on the real host.
- Configure and test `CONTACT_ENDPOINT`. Without it, submissions fail safely;
  there is no fake success, request or personal-data logging. The form is not
  email-ready until the backend exists. Existing HTTP-2xx acknowledgement
  contract requires the backend to reject unsuccessful submissions correctly.
- Supplied CMMI/ISO artwork replaces the old local stand-in. This change does
  not independently verify the existing certification claims.
- No cPanel upload or live-domain verification was performed.

## Certification, branding and onboarding update

- All shared ImageKit URLs use `Assetsbaseurl`; supplied CMMI and ISO images are
  remote. The local CMMI stand-in and superseded legacy social logo were deleted.
- K-Edusity, Kastrofy and K-Exam use the supplied product-server logo URLs directly
  in the shared large-card component. K-SMART's existing server URL is preserved.
- Large cards display every category, retaining full multi-category filtering.
- New 1200×630 OG artwork is shared across all routes and Twitter large cards.
  Export verification checks the deliberate social-metadata exceptions.
- ICO contains 16/32/48px images; PNG favicons, Apple touch artwork and 192/512px
  manifest icons are exported. The audit verifies dimensions, links and files.
- README now explains architecture, static rendering, content/data edits, all
  three image sources, SEO ownership, integrations, deployment and rollback.
- Current Chromium checks passed at 390, 768, 1366 and 2560px for supplied image
  URLs, server-logo paths, all-category labels and horizontal overflow, without
  runtime errors. External requests were blocked for this check; live CDN/logo
  availability was not verified. No visible certification or logo load is claimed.

## Offer strip and popup verification

Final `src/data/offer.ts` exports `offer = null`. No date/API/backend/provider
or production dependency was added. The three components are `OfferStrip`,
`SitePopup` and `OfferTag`; content, image paths and the active offer live in the
single offer data file. Existing product data stays canonical.

Temporary production builds tested null, all-products and two-products offers;
each was restored and the final null version rebuilt. Chromium checks passed:

- Null: no strip/tags, Contact popup on hero scroll or eight-second timer,
  `/contact` exclusion, correct Contact destination, dismissal after refresh.
- Existing search dialog defers the popup; after search closes it can appear.
  Ctrl+K inside the popup does not open another dialog.
- Dialog semantics/name/description, aria-modal, repeated Tab focus trapping,
  Escape, obvious close button and CTA dismissal/storage were checked.
- All: "All solutions", 40 tags on Solutions, correct strip/popup CTA and text.
- Two: "K-Exam, K-Edusity", only those two tags. Changing the offer ID shows the
  popup despite previously dismissed IDs in the same browser storage.
- New/hot/festive styles were exercised; unit tests check contrast across every
  gradient and development warnings for incorrect product IDs.
- Strip height is 40px, is not sticky, pauses on hover and is static with reduced
  motion. Header height/sticky top are unchanged after the strip scrolls away.
- Hero width and horizontal position, and cumulative layout-shift readings,
  stayed unchanged when the modal opened. An active strip naturally reserves
  40px above the header from the initial HTML, not a later layout insertion.
- Real-time checks at 320×568, 390×844 and 1366×768 confirmed compact bottom cards
  (at most 50dvh on mobile), desktop split layout, readable content and close
  persistence. Browser runtime errors: none in the successful final runs.

`npm run check` includes nine tests plus production export/type/SEO/icon checks.
The offer images are intentionally TODOs: fallback gradients remain until the
three ImageKit files are uploaded. Contact reuses the existing office photo;
external image availability is not asserted from this restricted network.
Image prompts are in `prompts/offer-image-prompts.md`. CTA links to `/contact`, not
an enquiry modal; no message-prefill integration was needed or added.

## Square popup redesign (supersedes the earlier placeholder design)

Replaced the rejected location-photo Contact popup and split gradient Offer
popup with a consistent 1:1 artwork-first layout. Four newly generated 960×960
WebPs are bundled under public/popups; the location image and remote placeholder
URLs are no longer used by popups. No heavy overlay obscures the artwork.
The original prompts/BANNER-DIRECTION.md prompt is unchanged.

The original modal timing, localStorage IDs, /contact exclusion, focus trapping,
Escape behavior, offer strip and tags remain intact. Final offer stays null.
All four variants passed rendered checks at 320×568, 390×844 and 1366×768:
square bounds, locally loaded images, CTA inside the card, modal semantics,
Tab trapping, Escape and dismissal storage. Mobile cards remain <=50dvh.
No browser runtime errors occurred. Source artwork and browser screenshots are
ignored local artifacts, not shipped source. Earlier placeholder/split-layout
notes above describe the superseded implementation.

## Repeat-on-reload and people-photo update

Popup localStorage reads/writes were removed. Dismissal applies to the current
page visit only; reloading resets eligibility, including when old popup-seen
keys exist. The eight-second / past-hero trigger and /contact exclusion remain.
New, Hot and Festive now use generated Indian people photography: new-business
owners, a happy business win and a family Diwali celebration respectively.
Contact retains its dedicated communication illustration.

The square popup base has no border. Product names are larger, semibold and
highlighted on a light panel. Offer buttons, strip and tags use white text on
richer dark gradients, with automated >=4.5:1 contrast checks. The strip is now
32px, repeats its message to avoid empty gaps, and has a labelled dismiss button.
Removing it collapses its 32px space intentionally after the user's click;
reload restores it. The original banner prompt is unchanged.
Earlier persistence/color/40px-strip descriptions above are historical.

Current browser checks passed for all four variants at 320×568 and 1366×768:
square bounds, image decoding, borderless base, highlighted product names,
no product/CTA overlap, repeated opening after reload despite old storage keys,
and strip dismissal/reset. Final build/type checks, all nine tests and export
SEO/icon audits pass. Final offer remains null.

## Campaign artwork, solid colors and enabled demo

Contact copy now says "Can’t find the right product?" and asks visitors to
contact the team for help choosing a solution. All offer gradients were removed:
New uses solid blue, Hot solid red, and Festive solid crimson. Contrast checks
verify white text against each solid campaign color. Strip CTA underline removed.

Three replacement images use promotional gift/coupon/confetti campaign designs,
not ordinary business scenes. Festive is year-round without Diwali/religious
symbols. The original banner prompt is unchanged. Generated images stay bundled
locally and the popup remains square and borderless.

A clearly labelled "Demo offer" is enabled intentionally for review, 20% off
K-Exam and K-Edusity. Unlike earlier final-null states, this build has the dummy
active at the user's explicit request; remove/replace it before production.
Chromium checks at 320×568 and 1366×768 passed for demo and temporary-null
Contact variants: correct copy, names, square layout, CTA within the card,
solid backgrounds, no strip underline and working strip dismissal. Demo was
restored and rebuilt after tests. Build, types, nine tests and export audits pass.

## Offer content spacing refinement

Kept the approved square artwork and solid colors. Increased offer heading and
discount sizes, expanded the product panel and CTA to fill the available width,
and reduced excess body padding. Contact popup styling is unchanged. Rendered
checks at 320×568, 390×844 and 1366×768 confirm square bounds with no content
overlap or overflow. Build, nine tests and export audits pass; demo stays active.

## Shared shadcn Dialog migration

Contact/Offer and Search now import Dialog components from
`src/components/ui/dialog.tsx`, not Radix directly. The shared shadcn-style
wrapper owns Portal, Overlay, Content, Title, Description and optional Close.
It reuses the existing Radix dependency for modal accessibility and scroll lock.
No dependencies, offer configuration or visible-design changes were added.

Chromium checks at 320×568, 390×844, 768×1024 and 1366×768 passed: both search
and offer use the shared dialog slot, remain within viewport bounds, search
results work, popup shape stays square, Tab remains trapped, Escape dismisses,
and Ctrl+K does not open a second dialog over the popup. No runtime errors.

## Route-specific position triggers

Removed the eight-second timer. Home opens when the hero bottom passes the
sticky header; Solutions opens only when the bottom of the complete catalogue
list (#solutions-product-list) reaches the viewport. Contact/other routes skip
automatic popups. A fresh route visit gets its own once-only flag.

Checks run after mount, restored scroll/pageshow, scroll, resize, visibility
changes and DOM changes (including another dialog closing). No timers, storage
or scroll percentages are used. Reloading below the Home hero no longer needs
another scroll from the top.

Browser checks at 390×844 and 1366×768 passed: no popup after waiting nine
seconds at the Home hero or Solutions top; Home past-hero trigger and reload
restoration; Home-to-Solutions client navigation resets eligibility; no popup
250px before the catalogue end; popup at list end; defer for Search and open
after Search closes; Solutions reload restoration; Contact excluded. No runtime
errors. Earlier timed-trigger descriptions above are historical.

## Client strip, About ratings and focused client stories (current layout)

Supersedes the previous all-in-one ratings/review/video section.

- `ClientStrip` is directly after `Hero` and before `Solutions`. All original
  logos run in one horizontal row; the second rendered copy is only the
  aria-hidden seamless-loop duplicate, not a second visual row. Slower 100s
  traversal maintains a calm pace with all logos combined. Hover/focus pause
  and reduced-motion handling are preserved.
- About's former “Based in / Kota, Rajasthan, India / building since 2014” cell
  is replaced with all three supplied platform ratings and links. Footer
  locations and the remainder of About are unchanged. Rating cards retain
  their logos, scores, fractional stars and platform colors, adapted to fit
  this smaller cell, including 320px screens.
- The #clients section now contains a single featured quote with author/logo,
  supplied source link where available, previous/next buttons and a counter.
  All six reviews are retained. No automatic rotation or review-card rail.
  Inactive figures are visibility-hidden, aria-hidden and inert; their shared
  grid sizing keeps the section height stable when selecting another quote.
- Three compact video rows sit alongside the quote at 768px and above, then
  below it on phones. No second heading band, rating bar or logo wall inside
  testimonials. Existing shared Dialog, iframe-on-click, close cleanup and
  focus restoration are retained. Search shortcut cannot stack another modal.

`npm run check` passed: build, TypeScript, 12 tests, exported SEO/image-path/
schema/discovery audits. Browser checks passed at 320×568, 390×844, 768×1024,
1366×900 and 2560×1440: hero/strip ordering; one logo row; three rating links
inside About and none in #clients; removed About location copy; exactly one
visible written review; all six reachable forward/backward with wraparound;
all three video Dialogs and correct URLs; viewport fit; no initial iframe;
iframe unmount and trigger focus return; no stacked Search; no document
horizontal overflow or runtime errors. Client-story section heights were
approximately 784px on phones, 505px on tablet and 602–608px on desktops,
including heading and outer padding. Local browser script/screenshots are
in ignored `artifacts/browser-check/client-refresh.mjs` and related PNGs.

External ImageKit and YouTube requests were blocked for sandbox browser checks.
Actual CDN/logo/thumbnail availability, third-party scores and YouTube playback
were not independently verified. Scores and review text use the user's inputs;
verify live embeds and source pages with external access before deployment.

### Follow-up: square thumbnails, dark ratings and automatic reviews

Supersedes the review count, manual-only rotation, thumbnail shape and light
rating-card styling above. Removed Sudha Agarwal, retaining five reviews.
Restored About's default dark-glass cell for ratings with light text/dividers
and small white logo backings for contrast. Experience counter and heading
now show 13+. Video thumbnails use 1:1 wrappers and object-contain, without
zoom-on-hover cropping; the actual YouTube player remains 16:9.

Reviews advance every six seconds while visible. Pause/resume is available;
hover, focus within the section, hidden tabs and active video dialogs pause
rotation. Reduced motion disables automatic rotation. Effect cleanup removes
the timer; manual navigation remains available. Auto rotation does not send
continuous live-region announcements.

Build, TypeScript, all 12 tests and static export audits pass. Browser checks
at 320, 390, 768, 1366 and 2560 widths passed five-review navigation, square
thumbnail bounds/object-contain, no overflow, all three Dialogs, correct URLs,
iframe cleanup, focus return and modal stacking prevention. A separate normal-
motion real-time browser check passed automatic advance, explicit pause/resume,
hover pause and reduced-motion suppression. External-media availability and
actual YouTube playback remain subject to the network limitation noted above.

### Remove content-locking testimonial tests

Removed `scripts/testimonials.test.ts`: it asserted exact reviewer names,
wording, review counts, platform scores, source/video URLs and the experience
suffix. Those are editable content, not functional invariants. Developers
can now edit `src/data/site-content.ts` without updating a second copy of the
content in tests. Historical 12-test results above describe earlier runs; the
current suite has 9 tests. Functional contact, offer and search tests and
static export audits remain. Testimonial layout, link destinations and video
playback still need browser review when changing content.

## Tailwind-only global stylesheet cleanup

Removed all handwritten base rules, offer/popup selectors, theme-variable
selectors, scrollbar rules and keyframes from globals.css. It now contains
only two imports and the Tailwind font mapping. Sizing, spacing, colors,
container queries, focus/selection defaults, anchor offsets, typography and
reduced-motion behavior are Tailwind utilities on their owning components or
root layout. Low-specificity :where variants preserve component overrides.
No replacement custom stylesheet or dependencies added. Native thin/light
scrollbar utilities replace the vendor-specific scrollbar CSS, with native
forced-colors defaults.

Continuous marquees use one shared native-animation hook, preserving seamless
loops and hover/focus pause; reduced motion cancels the loops. Hero/gold drift
uses existing Framer Motion. Menu and popup entry use Tailwind starting-style
transition variants. Popup route triggers and production offer=null unchanged.
Campaign palette is a shared Tailwind class map, and the existing contrast
test now reads that map instead of parsing CSS variables.

Full build, TypeScript, four remaining tests and static export audits pass.
Browser checks passed at 320×568, 390×844, 768×1024 and 1366×900 in both
production Contact mode and a temporary festive-offer build (restored to null):
root typography, 68px anchor offset, square popup bounds, container type and
small-container eyebrow hiding, heading cqi sizes, CTA fit, 32px offer strip,
reduced-motion duplicate hiding, video modal cleanup and no page overflow or
runtime errors. Separate normal-motion checks verified running marquees,
actual hover pause/resume and reduced-motion cancellation. Browser third-party
requests were blocked; external media availability/playback was not tested.

## Correction: preserve global shadcn/Tailwind theme tokens

Supersedes the earlier six-line-only stylesheet restriction. Globals.css now
contains root design tokens, dark token overrides and Tailwind semantic color/
radius mappings alongside imports and font configuration. Global tokens are
configuration, not component CSS, and must remain centralized here. Shared
background/foreground/border/focus defaults consume semantic utilities. Header
height is again a root variable. Offer values are root tokens consumed through
named Tailwind utilities; the existing contrast test validates these values.
No component selectors, layout rules, keyframes or @apply were reintroduced.
No automatic dark theme or broad component redesign was added.

After this correction, full build, types, four tests and export audits passed.
Four-viewport popup/layout browser checks passed again. Browser probes verified
all semantic light/dark tokens resolve, body utilities consume the current
background token and existing rounded-xl corners remain 12px. The dark class
was applied only in the browser test, not enabled in the application.

## Correction: preserve global animation theme definitions

Restored shared aurora, gold, nav entry, marquee forward/reverse, popup entry
and fade keyframes in Tailwind's global @theme block, with named --animate-*
tokens. Components consume animate-* utilities; marquee hover/focus pause and
reduced-motion suppression remain Tailwind variants. Removed the temporary
native-animation hook and duplicate Framer drift implementation. Global theme
tokens and animation definitions are legitimate configuration; only component
layout/style selectors were intended to be removed.

## Mobile-only layout fixes, laptop/desktop preserved

- Scope: max-md utilities, below 768px. No CSS rules, theme edits or keyframe
  changes. Existing >=768px sizes, spacing, stacks and navigation preserved.
- SitePopup is centered horizontally/vertically on phones, both Contact and
  active-offer modes, with existing viewport-bounded square sizing.
- Every homepage product, including the last card, has 20px outer gutters in
  normal-motion and reduced-motion paths. Product copy and CTAs are compact.
- Reduced mobile hero/copy/section/product/counter/footer/catalogue type sizes;
  mobile hero has two-column 44px chips, simpler spacing and quieter artwork.
  Inputs remain >=16px for iOS and no global rem scaling was used.
- Mobile timeline marker centers now match the line center (removed the old
  negative marker margin). Tablet/desktop rail is untouched.
- Footer office cards expand horizontally in a scrollable row on phones.
  Selected cards follow into the row viewport, never scrolling the page.
- Phone nav has only six main links, including All solutions; no product or
  industry submenu items. Tablet/laptop navigation is preserved.

Checks: npm run check passes build, TypeScript, four functional tests and export
audits. Browser checks passed at 320×568, 360×640, 390×844, 430×932, 640×960 and
767×1024 in Contact and temporary festive-offer builds; offer restored to null.
Verified viewport-centered square popup, all-card gutters, mobile font sizes,
main-only nav, two-column chips, timeline geometry, horizontal location layout
and no horizontal document overflow on Home, Solutions and Contact. Normal-
motion and reduced-motion checks additionally confirmed popup centering, card
gutters, expanded last-office visibility and form input font size.

Recorded pre-change element rectangles, typography, spacing and display styles
on all three routes at 768, 1024, 1366 and 1920px. Post-change comparison passed
for all 12 cases, with 0.25px tolerance for Framer subpixel animation timing.
No meaningful laptop/desktop geometry or typography changes. Browser fixtures
and screenshots live in ignored artifacts/browser-check. External ImageKit and
YouTube requests were blocked; this does not validate external-media loading.
