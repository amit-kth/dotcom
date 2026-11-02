# Revamp verification

## Scope and commands

All tracked changes are inside `revamp/`. The legacy PHP site is read-only.

`npm run check` passes: static production build, strict TypeScript with unused
locals/parameters enabled, six tests, and the exported-HTML audit. `npm audit
--omit=dev` reports no known vulnerabilities in the installed dependency tree.

## SEO and headings

- Homepage title, description, author, keywords, canonical and Open Graph/Twitter
  values are checked against the unchanged root `index.php`.
- Legacy WebPage name, URL and description are retained. Organization and
  WebSite schemas remain; fabricated placeholder reviews/ratings and obsolete
  fragment references are excluded.
- Solutions and Contact keep their own relevant metadata because no equivalent
  legacy route files were supplied.
- Each route exports one title, canonical and H1, nonempty headings, unique IDs,
  valid local image paths and one GTM loader. A screen-reader-only H2 groups the
  featured Solutions cards before their H3 headings, without changing layout.
- `robots.txt`, the three-route sitemap, legacy social-logo asset and static
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
- Certification wording/artwork already marked unconfirmed in `design.md`
  still needs owner sign-off; this cleanup does not establish certification.
- No cPanel upload or live-domain verification was performed.
