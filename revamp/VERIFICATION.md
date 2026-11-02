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
- Merge `deploy/htaccess.example` with hosting rules, preserving legacy PHP and
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
Image prompts are in `docs/offer-image-prompts.md`. CTA links to `/contact`, not
an enquiry modal; no message-prefill integration was needed or added.

## Square popup redesign (supersedes the earlier placeholder design)

Replaced the rejected location-photo Contact popup and split gradient Offer
popup with a consistent 1:1 artwork-first layout. Four newly generated 960×960
WebPs are bundled under public/popups; the location image and remote placeholder
URLs are no longer used by popups. No heavy overlay obscures the artwork.
The original BANNER-DIRECTION.md prompt is unchanged.

The original modal timing, localStorage IDs, /contact exclusion, focus trapping,
Escape behavior, offer strip and tags remain intact. Final offer stays null.
All four variants passed rendered checks at 320×568, 390×844 and 1366×768:
square bounds, locally loaded images, CTA inside the card, modal semantics,
Tab trapping, Escape and dismissal storage. Mobile cards remain <=50dvh.
No browser runtime errors occurred. Source artwork and browser screenshots are
ignored local artifacts, not shipped source. Earlier placeholder/split-layout
notes above describe the superseded implementation.
