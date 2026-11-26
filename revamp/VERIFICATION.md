# Verification log

Build/test/browser checks for each change, newest last. Setup and daily
commands are in README.md.

## Scope and commands

All tracked changes are inside the dated app folder. The legacy PHP site
(index.php and friends) is read-only.

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

## Approved discovery, WhatsApp and FAQ scope

Home selected-industry chips sit beneath the agreed heading, with matching
industry colors and remove/clear controls. Existing Hero/nav context retained.
All Solutions has independent client-side multi-select filters for featured
and additional products; no query strings, dynamic routes or shared selection.
Static HTML initially contains all five large products and 35 catalogue items.
Only existing Education/Health catalogue assignments are mapped; other groups
remain under All industries and are listed for review in README.

Five large cards use short descriptive headings with brand identities beneath.
Small catalogue names, product IDs, existing external URLs and new-tab behavior
are unchanged. Hero headline unchanged; its description and the existing four
implementation steps explain the process more clearly. Existing timeline layout
and mobile alignment retained.

New compact homepage FAQ and static /faq/ route share nine editorial questions
and conservative initial answers from data/faqs.ts. Homepage uses six. Native
keyboard-accessible details/summary, footer/home links, route SEO and sitemap
entry added. No FAQ schema or commercial guarantees invented. FAQ answers are
editable pending final wording from the user.

Header has a green WhatsApp enquiry icon; the Contact option is a green button.
All enquiry links use the existing +91 8947027625 WhatsApp configuration; calling
links remain +91 7240560001. No backend changes or live contact submissions.

Full check passes build, TypeScript, four existing functional tests and static
export audits, including FAQ metadata and sitemap. Browser checks at 320×568,
390×844, 768×1024, 1024×768, 1366×900 and 1920×1080 covered Home hero selection,
chip placement/removal state, Home-to-Solutions independence, all/OR multi-filter
matches and reset/empty states, unchanged URLs, FAQ keyboard expansion,
WhatsApp/calling destinations, no horizontal overflow and non-overlapping header
actions. Static catalogue and all FAQ content also checked with JS disabled.
Sandbox third-party requests were blocked; external media playback not tested.
Global stylesheet, tokens/keyframes, popup logic, form backend and unrelated
sections are unchanged.

## Next.js security patch: 16.4.3 → 16.4.6

Ran `next upgrade --agent=security` and followed its same-major patch guidance.
Checked available local/remote history and open GitHub PRs; no equivalent upgrade
was in progress. Upgraded only Next.js and its lockfile-resolved packages, and
set supported `experimental.agentUpgrade: "security"`. Existing static-export,
image and allowed-origin settings retained. No codemods or UI changes needed.

Clean npm ci, exact installed-version check, full npm run check (build, types,
four tests, export audits) and six-viewport discovery/FAQ/WhatsApp browser checks
passed. JavaScript-disabled checks still find the full catalogue and FAQ HTML.
Work stays on the active Arena branch and updates existing PR #7 rather than
creating a separate worktree/branch or duplicate PR.

## Footer refinements and sticky selected industries

Added a WhatsApp icon alongside the footer closing Contact button; kept the
chat number and call links unchanged. Removed How we deliver from Company,
leaving five links. Footer social marks use default brand hues on white badges
so black X remains visible. Mobile CTA wrapping avoids overflow.

All Solutions moves the existing industry controls outside the intro wrapper
so sticky can span the product list. It sticks below the navbar only while
filters are active and returns to normal flow on reset. Mobile chips scroll
horizontally without a scrollbar to avoid a tall sticky panel. Selection count
remains visible; each selected chip has a solid industry fill, contrasting text
and its existing pressed/removal state. No URL, filter logic or Home styling
changes; Tailwind utilities only, no global CSS/theme/keyframe changes.

Build, TypeScript, four tests and export audits pass. Browser checks at 320,
390, 768, 1024, 1366 and 1920 widths verified conditional sticky positioning
against header height, compact bar bounds, selected-state fill, reset, catalogue
restoration, hidden mobile scrollbar, correct WhatsApp/new-tab link, five Company
links, five distinct social brand colors and no document overflow/runtime errors.
External image/video requests were blocked as in earlier sandbox checks.

## Catalogue categories and Other catch-all

Every catalogue item now has required explicit `categories` in
`src/data/catalogue.ts`; the old group-based `catalogueIndustries` helper is
gone. Assignments use only explicit signals (Education/Health groups, or the
item's own keywords naming fintech, logistics or real estate); all remaining
items are tagged `other`. Other joins the category list as a neutral slate chip
with a solid selected fill; the existing Home empty-state banner covers
selections with no featured products. The footer
Industries column excludes Other to keep the three five-link groups.

Build, TypeScript, four tests and export audits pass. Browser checks at 390 and
1024 verified eight filter chips and exact OR-filtered counts: Other 27
catalogue-only, EdTech 4, Healthcare 4, Fintech 2, Logistics 3, Real Estate 3,
Manufacturing 1 featured-only, Astrology 1 featured-only, Other+Fintech 29,
plus both empty-state messages and the Home Other selection/reset flow. The
deferred offer dialog was closed before accessibility assertions because it
correctly hides page content while open.

## Responsive audit of the newest items (phone through 2xl)

No design, content or behavior changes were requested or made; this pass only
verified responsiveness. `artifacts/browser-check/responsive-audit.mjs` scanned
four pages (/, /solutions/, /faq/, /contact/) at 16 viewport sizes — 320, 360,
375, 390, 414, 480, 640, 768, 834, 1024, 1280, 1366, 1440, 1536, 1728 and 1920
pixels wide — measuring the footer closing CTA, WhatsApp icon, brand-color
social badges, Company links, the sticky industry bar with its solid chips, and
the eight hero chips.

All 64 page scans pass: no horizontal page overflow, no out-of-bounds or
overlapping header/footer controls, hero chip grid fits with 44px+ touch
targets and no internal scrolling, footer badges and buttons stay in bounds
without overlapping the heading, and the sticky bar sits exactly under the
navbar at under 45% of every viewport with the chip row scrolling on phones
(no visible scrollbar, single row) and wrapping on tablets and above. Visual
spot-checks at 320, 768 and 1536 (screenshots in the same folder) confirm the
solid selected chips, compact phone bar, balanced footer columns and one-row
2xl hero chips render as intended.

## Other removed from the hero picker

Per instruction, the hero "What does your business do?" chip row now shows the
seven real industries only; the `other` catch-all is filtered out there while
staying available in the All Solutions filter bar and the header industry
picker. No styles, spacing or selection behaviour changed. TypeScript, build,
tests and export audits pass; the browser suites confirm seven hero chips with
no Other chip, unchanged eight-chip All Solutions filtering (including Other),
and unchanged header-picker Other selection with the Home empty banner.

## Contact form wired to the live enquiry API

`CONTACT_ENDPOINT` points at `https://kriscent.in/K-GOD/api/v1/dotcom-enquiry`, and
`submitContact()` posts exactly the legacy field set (`name`, `email`, `phone`,
`subject`, `message`, `country_name`) — the earlier extra `source` and `form`
identifiers were dropped so the payload matches the agreed body.

Error handling covers every branch the browser can reach: per-field validation
before a request, a 20-second abort for a hanging service, non-2xx responses
(the service's own `message` when present, otherwise a readable fallback),
network/CORS failures, and an unconfigured endpoint. Every message tells the
visitor how to reach `info@kriscent.in`, and typed values are preserved. Success
now shows "Thanks, your message has been sent." with the reply address, the
phone line and a **Send another message** reset action.

Verification:

- `npm run check` — build, typecheck, 8 tests (5 new mocked-`fetch` contact
  tests: payload shape/endpoint, 2xx, 422 message, 5xx fallback, network
  failure, timeout) and the static-export checks all PASS.
- `artifacts/browser-check/contact-api.mjs` against the static export with
  `https://kriscent.in/**` fulfilled locally — validation (no request sent),
  success + payload assertions (`phone`, `country_name`), reset, 422 message,
  500 fallback, network failure all PASS with no console errors.
- Success and error panels inspected at 1280px and 320px: no overflow
  (`scrollWidth` equal to viewport), copy wraps cleanly, buttons reachable.
- The real endpoint is never contacted from this sandbox; a live submission and
  the service's CORS headers for the production origin still need one check
  after deploy.

## Navbar product links open the product sites; WhatsApp opens with a message

The Solutions panel and the menu drawer used to send every product to
`/#solutions`, a scroll into the homepage list that did nothing visible when
that product was filtered out. Both menus now render `ProductNavLink`, which
uses the product's real `href` (AI Employees, KSMART, K-Exam, K-Edusity,
Kastrofy — the URLs already used by each "Explore <name>" button) with
`target="_blank"` and `rel="noopener noreferrer"`, plus a small external-link
mark and an "(opens in a new tab)" label. The panel's two-column drawer layout
places the mark next to the name so it cannot read as the neighbouring entry's.

Every WhatsApp button opens with a prefilled enquiry, defined once as
`contact.whatsappMessage` and encoded into `contact.whatsapp`.

Verification:

- `npm run check` — build, typecheck, 10 tests (a new `scripts/links.test.ts`
  asserts all five featured products have an https URL, that both menus use
  the external component and neither contains `#solutions`, and that the
  WhatsApp link's `text` equals the configured message) and the static-export
  checks PASS.
- `artifacts/browser-check/nav-links.mjs` against the static export: all five
  panel entries link to the expected product URL with `_blank`/`noopener`;
  clicking one opens that URL in a new tab and leaves the page's `scrollY`
  untouched (popups are stubbed locally, never contacted); all seven WhatsApp
  links on Home and Contact carry the message; the drawer at 768px has the same
  five external links. PASS.
- Panel and drawer screenshots inspected: icons sit with their own product.
- Links resolved, not invented: the KSMART and K-Edusity URLs were fetched and
  return their product pages.

## README rewritten; K-Klassified withdrawn; K-Cab on /coming-soon

README.md was replaced with a short, task-oriented version: two local commands,
a checks section, a concise SSG section (what is allowed and what breaks the
build), a data table, the two image sources with the "new images go in
public/" rule, one short SEO paragraph, the endpoint and body only, offer and
coming-soon instructions, and deployment as four numbered steps plus the
`.htaccess` and no-product-folder rules. The project map, navigation, popup and
`/revamp` references were removed, and a note explains that the repo root holds
the legacy PHP site while the company GitHub keeps updated on `main` and the old
code on `old-code-backup`.

Product changes:

- **K-Klassified removed** from `catalogue.ts` entirely (it is in no list, no
  filter and no search result).
- **K-Cab moved to `comingSoon`**, so it no longer appears in the catalogue,
  industry filters or search, and its description now reads "Bike and taxi
  booking portal" instead of "Cab booking portal". It has no outbound product
  URL; its action opens the contact form for that product.
- **New `/coming-soon/` page**: lists `comingSoon` with an "In development"
  badge, an "Ask about <name>" action and a route to the live catalogue. Added
  to the sitemap, the export audit and one quiet link at the end of All
  solutions; no footer or navbar slot, so the 5-5-5 footer and the hero stay
  untouched.

Verification:

- `npm run check` — build, typecheck, 13 tests and the export audit PASS,
  including the new `scripts/products.test.ts` (K-Klassified gone from data and
  search; K-Cab absent from catalogue and search, present in `comingSoon` with
  the new description and no href; nothing coming-soon leaks into the catalogue).
- `artifacts/browser-check/coming-soon.mjs` on the static export: the All
  solutions link opens `/coming-soon/`, title and canonical are correct, K-Cab
  and "Bike and taxi booking portal" are shown while "Cab booking portal" is not,
  "Ask about K-Cab" points at the contact form, neither K-Cab nor K-Klassified
  appears in All solutions, the catalogue anchors, search or the homepage, with
  no console errors. PASS.
- Page inspected at 1280px and 320px: no overflow (`scrollWidth` equals the
  viewport), the single card sits with its badge and action, and the band was
  tightened so the page does not carry a half-empty grid.

## Contact endpoint moved to the versioned path

`CONTACT_ENDPOINT` is now `https://kriscent.in/K-GOD/api/v1/dotcom-enquiry`
(was `/K-GOD/contact-com`). The request itself is unchanged: one JSON `POST` of
`name`, `email`, `phone`, `subject`, `message` and `country_name`, with the same
2xx/success and error handling. README updated to match. `npm run check` PASS;
the browser check mocks the endpoint host, so it still passes against the new
URL.

## Contact success follows the service's response envelope

The endpoint answers `{ success, message, data }`, so a 2xx is no longer treated
as proof on its own. `submitContact()` reads the body and:

- `success: true` on any 2xx → success panel.
- `success: false` on a 200 → rejection, with the service's `message` shown
  (this is the case that would otherwise have wrongly confirmed an enquiry, for
  example a duplicate email).
- non-2xx → same `message`, or the fallback naming `info@kriscent.in`.
- non-JSON body → judged by the HTTP status alone, so a proxy page or an empty
  200 does not break the form.

Tests updated in `scripts/contact.test.ts` to use the real body, adding explicit
cases for `success: true`, `200 + success:false` (with and without a message)
and a 5xx carrying the envelope. `npm test` 16/16 PASS, `npm run check` PASS.

## Correction: K-Cab stays in the catalogue; /coming-soon is a title only

The earlier version removed K-Cab from the catalogue and listed it on
`/coming-soon/`. That was wrong: the product keeps its original card and only
its destination changes.

- **K-Cab is back in `catalogue`** at its exact old position (after K-Laundry,
  before Car Wash), same `logistics` category and `Lifestyle` group, so the
  filters behave as before. Its description stays "Bike and taxi booking portal".
- It carries `comingSoon: true`, and `CatalogueGrid` sends that card's action to
  `/coming-soon/` instead of an external site. Every other card is unchanged.
- **`/coming-soon/` is now just the page**: a large centred "Coming Soon", one
  line of explanation, Contact us and See all solutions. It renders no product
  data, and the temporary "Coming soon" link added to the end of All solutions
  was removed.
- K-Klassified stays removed.

Verification:

- `npm run check` PASS — 17 tests, including the reworked
  `scripts/products.test.ts`: K-Cab present and at `indexOf("k-laundry") + 1`,
  followed by `car-wash`, logistics/Lifestyle unchanged, new description, and
  exactly one `comingSoon` entry that has no `href`; the page file is asserted
  to contain no catalogue import and no `.map(`.
- `artifacts/browser-check` run: the card sits between K-Laundry and Car Wash in
  All solutions, its action is `/coming-soon/`, clicking it lands there, the page
  shows "Coming Soon" at 104px, horizontally centred within 12px, contains no
  product name or "In development", and has no overflow; the card is still
  visible under the Logistics filter. No console errors. PASS.

## Search results open the product page

Search used to send every product to an in-page anchor (`/#solution-…`,
`/#catalogue-…`) on our own pages, so clicking a result never reached the
product. Results now use the same destination as the card's own action:
`product.href` for real products, `/coming-soon/` for the one not-yet-launched
product, and the anchor only as a fallback for entries with no URL at all.
External results open in a new tab with `rel="noopener noreferrer"`.

Verified: `npm run check` PASS (18 tests; the new test asserts every
featured and catalogue product's search href equals its card href, and that the
dialog carries the new-tab attributes), plus a browser run on the static export
where clicking "ksmart" opened `https://www.kriscent.in/product/ksmart/` in a
new tab, Enter on the highlighted "k-exam" result opened its page, and "cab"
opened `/coming-soon/` in the same tab.

## Search results always leave the page

The first fix sent products to their own site, but any product with no URL
still fell back to an anchor (`/solutions/#catalogue-…`), which only scrolled
the list the visitor was already looking at — that is what "it just scrolls to
that product" was. The anchor fallback is gone:

- product with a URL → its site, new tab;
- `comingSoon` product → `/coming-soon/`;
- product with no URL → the contact form for it, `/contact?solution=<id>`.

Two products were the reason this showed up, and both are now handled:

- **Prabal Hospital ERP** has a real product site on the old site,
  `https://www.kriscent.com/theme/k-hospital/` (taken from `index.php`, fetched
  and confirmed live), so it now links there.
- **Kart-Grocery** has no product page — `/product/kart-grocery/` is only a
  GoGrocer installer screen — so it asks about the product on Contact.

Verified: `npm run check` PASS (18 tests; the search test now asserts no result
href contains `#solution-` or `#catalogue-`, and that every href is a site, the
coming-soon page or the contact form). Browser run: ksmart, k-edusity and
Prabal land on their own sites in a new tab with the page itself unchanged;
clicking ksmart opens `https://www.kriscent.in/product/ksmart/` in a new tab
while the page stays put; Enter on k-exam opens its site; "grocery" leads to the
contact form.

