# Kriscent website revamp

A Next.js App Router website using TypeScript, React, Tailwind CSS, Framer Motion and self-hosted Poppins. **Production is a static site, not a Next.js server.** All new work belongs in `/revamp`; the legacy PHP website outside this directory is separate and must not be changed accidentally.

## 1. Local development

Requirements: Node.js 22+, npm, and Python 3 for the exported-HTML audit.

```sh
cd revamp
npm ci
npm run dev       # development server
npm run check     # build + TypeScript + tests + exported SEO audit
npm start         # preview the built out/ directory; downloads serve if needed
```

Individual commands: `npm run build`, `npm run typecheck`, `npm test`, and `python3 scripts/verify-export.py` after a build. TypeScript checks unused locals and parameters. There is no configured ESLint command.

## 2. Project map and rendering

| Location | Responsibility |
| --- | --- |
| `src/app/layout.tsx` | Shared header/footer, fonts, providers, icons, GTM and Organization/WebSite schemas |
| `src/app/(home)/page.tsx` | Homepage; its section components live alongside it |
| `src/app/solutions/` | Featured product cards and general catalogue |
| `src/app/contact/` | Contact page, form and submission/query helpers |
| `src/components/` | Shared navigation, search, footer and UI primitives |
| `src/config/variables.ts` | Site/contact settings, ImageKit origin, metadata and backend URL |
| `src/data/` | Products, catalogue, categories, clients, locations and shared content |
| `src/lib/` | SEO wrapper, search logic, styling helpers and reduced-motion hook |
| `public/` | Local banners, logos, social image, icons and crawl files |
| `prompts/` | Banner and offer image-generation briefs and prompts |

### What SSG means here

`next.config.ts` sets `output: "export"`, `trailingSlash: true` and unoptimized images. `next build` prerenders each route into `out/`: `/solutions/` becomes `out/solutions/index.html`, for example. HTML, CSS, JavaScript and images are served directly by Apache on cPanel. **Node.js is needed to build, not to host.**

Search, filters, animation and form validation run in the browser after hydration; the page content is already in the exported HTML. Do not add API routes, server actions, request-time rendering or other server-only features without revisiting this deployment model. A manifest and app icons are provided, but there is no offline service worker or offline-app guarantee.

## 3. Managing content and product data

Content is maintained in version-controlled TypeScript files, not a CMS or database. Changes require a rebuild and upload.

- `src/data/products.ts`: the five large products, including IDs, names, search keywords, all categories, outcomes, banner paths, logos and external product links. Both the homepage and Solutions page use `SolutionBanner`.
- `src/data/catalogue.ts`: the 35 smaller general-product cards and their artwork.
- `src/data/categories.ts`: industry IDs and labels. A product can belong to several categories; **all its categories are displayed**, and the homepage filters use the full array.
- `src/data/site-content.ts`: client logos, written testimonials, manually maintained platform ratings and video testimonial URLs/thumbnails.
- Other files in `src/data/`: office locations and shared content. The fixed delivery steps remain in the homepage delivery component.
- `src/lib/solution-search.ts`: builds the shared search index from products/catalogue. Update keywords in the data, not separate hand-written search results.

For a product change, edit its existing object. Keep IDs stable where possible because they form card anchors, contact query values and search links. Use only category IDs declared in `categories.ts`. If a name/ID changes intentionally, update search tests and check incoming links. Do not invent external product URLs, certification claims or reviews.

To add another product, supply its real content, image and keywords, then update relevant count-based tests. A large card takes its logo from `product.logo`; `null` means no logo. Keep product website links separate from logo-image URLs.

## 4. Images and why ImageKit matters

There are **three distinct asset sources**:

1. **ImageKit:** shared office photography and the supplied CMMI/ISO artwork. `Assetsbaseurl` in `src/config/variables.ts` is the only ImageKit origin. Components/data append the relative asset path:

   ```tsx
   src={`${Assetsbaseurl}/tempAssets/awards/2015.webp`}
   ```

   The CMMI path retains its supplied `updatedAt` query. Keep spaces encoded and preserve meaningful query parameters. Centralizing the origin lets us change the CDN account in one place and avoids storing duplicate certification/office images in this repository. ImageKit is external: availability, caching and any CDN configuration remain its responsibility; these files are not bundled in `out/`.

2. **Product servers:** K-Edusity, Kastrofy, K-Exam and K-SMART logos use their complete supplied website URLs in `products.ts`. **Do not prefix or replace those URLs with `Assetsbaseurl`.** They are hosted by the respective product sites, not ImageKit.
3. **Local assets:** banners, brand icons and the OG image live under `public/` and use `/...` paths. Next copies these files into `out/`. Delete a local asset only after checking every reference, including filters, marquees, CSS and metadata.

Images currently use plain `<img>` elements, so production does not depend on a Next.js image-optimization server. Set dimensions to reserve layout space and meaningful alt text where the image conveys information; decorative images can use empty alt text. External images still require reachable hosts and public, hotlink-compatible URLs. `next.config.ts` image host rules do not fetch or validate plain images.

Banner rules and reusable prompts are in `prompts/BANNER-DIRECTION.md`: premium cards use 1680×735 artwork with a calm left text zone; general cards use full-frame 1280×800 scenes. Keep source/output sizes and WebP optimization in mind when replacing artwork.

## 5. SEO wrapper, sharing image and icons

Each page renders `<Seo {...metadata.home} />` (or `.solutions` / `.contact`). `src/lib/seo.tsx` emits its title, description, canonical, Open Graph/Twitter tags and WebPage schema. **Do not add a second page-metadata implementation** that duplicates these tags. Root Organization/WebSite schemas and GTM belong in `layout.tsx` once.

- Edit page titles/descriptions in `metadata` and shared company/domain details in `site`, both in `src/config/variables.ts`.
- Legitimate legacy homepage text metadata is preserved through `legacySeo`. Placeholder ratings and obsolete scripts were intentionally excluded.
- `site.ogImage` points to `/images/og-kriscent.jpg`, a 1200×630 branded social banner. OG and Twitter share this image; Twitter uses `summary_large_image`. Update `site.ogImageAlt` when the artwork changes. Use a new filename when replacing an already-cached social image.
- `public/robots.txt` and `public/sitemap.xml` are static. Update their production URLs and route list whenever the domain or public routes change. Keep canonical URLs, sitemap URLs and real hosting redirects consistent.
- Use one H1 per page and an appropriate H2/H3 hierarchy. The featured Solutions section has a screen-reader-only H2 so product H3s have a parent section without changing the visible layout.
- `scripts/verify-export.py` checks the actual exported pages against the legacy source and the intentional social-image changes. It requires the legacy `index.php` to remain available in the repository.

Icons use the existing blue Kriscent mark: the App Router supplies `favicon.ico` (16/32/48 sizes), `icon.png` and `apple-icon.png`; `layout.tsx` links explicit 16/32/48 PNG favicons, additional Apple touch sizes and `public/site.webmanifest`. Apple artwork is available at 76/120/152/167/180px; manifest app icons are 192/512px. `public/apple-touch-icon.png` also supports the conventional Apple URL. When rebranding, replace the related files together and check the manifest/head links.

## 6. Contact form and integrations

Set `CONTACT_ENDPOINT` in `src/config/variables.ts` to a tested backend. The submission code is `src/app/contact/lib/submit-contact.ts`: JSON POST fields are `name`, `email`, `phone`, `country`, `country_name`, `subject`, `message`, plus `source` and `form` identifiers. The backend must return HTTP 2xx only for accepted submissions and provide suitable validation, CORS, spam protection and email/storage handling.

The TODO/empty endpoint fails safely: no request, fake success or personal-data logging. **Static hosting alone cannot send email.** The old PHP form contract is different; do not point the JSON form at it without implementing a compatible adapter. Never put API secrets in frontend configuration.

GTM settings are in `site`; the root layout installs it and `RouteTracker` reports client-side navigation. Tawk settings are retained but the widget is not enabled. Other external dependencies include office images, product logos and the phone-input library's flag images. Verify these on the real domain, not just a network-restricted build environment.

## 7. Deploy to cPanel

1. Back up the live document root and hosting rules. Confirm the intended domain and HTTPS/canonical-host redirects.
2. From `revamp/`, run `npm ci && npm run check`. Deploy only if all checks pass.
3. Upload the **contents of `out/`**, including `_next/`, route directories, images, icons, `robots.txt`, sitemap and manifest, to the domain's document root. Do not upload `node_modules`, `.next`, source code or development artifacts. No Node process is required on cPanel.
4. Preserve existing product directories, PHP endpoints and unrelated files. Do not delete/replace the entire legacy hosting directory. Review file collisions before extracting an archive.
5. Update the existing hosting `.htaccess` as needed; do not overwrite unrelated rules. `DirectoryIndex` must prefer `index.html` to the old `index.php`. Map real HTTP 404 responses to `/404.html`; do not use a blanket SPA fallback to the homepage.
6. Test direct loads and refreshes of `/`, `/solutions/` and `/contact/`; test an unknown URL, local/external images, favicon/manifest, social metadata, search, mobile navigation, GTM and a real contact submission. Check browser console/network errors and HTTPS redirects. Purge relevant hosting/CDN caches if needed.

This configuration assumes deployment at the domain root. Hosting under a subfolder needs a separate review of `basePath`, asset URLs, canonicals, sitemap and manifest scope; do not simply upload the current export into a random subfolder.

To roll back, restore the backed-up files and hosting rules. Keep older `_next` files during a safe transition so cached pages do not request deleted chunks; remove stale build assets only after the cache window is understood.

## 8. Offer strip and popup

**A dummy festive offer is currently enabled for review**, labelled "Demo offer"
with 20% off K-Exam and K-Edusity. This is test content, not an approved live
promotion. Set `offer` to `null` or replace it with an approved offer before launch.

**Only edit `src/data/offer.ts` to add/remove an offer.** Its opening comment
has filled all-product and two-product examples, field explanations and the
handoff steps. Keep `offer = null` for the ordinary Contact popup. An offer
object switches to the offer popup, the 32px strip and matching banner tags.
Use a descriptive `id` for each offer; use discounts, never rupee prices.

Product IDs come from `products.ts` and `catalogue.ts`. Incorrect IDs warn in
development. Popup triggers are positional, not timed:

- Home (`/`): the bottom of `#top` has passed the sticky header.
- Solutions (`/solutions`): the bottom of `#solutions-product-list` is visible,
  meaning the visitor reached the end of all catalogue products.
- Contact and other routes: no automatic popup.

`SitePopup` checks those element positions after mount and on scroll, resize,
`pageshow` (including restored scroll), visibility changes and relevant DOM
changes. It defers while another dialog is open. There is no random delay or
eight-second fallback. Closing hides it for that route visit; navigation resets
the route's in-memory flag. No popup localStorage/sessionStorage is used, so
reloads recheck the restored page position without requiring a return to the hero.

Both variants link to the same `/contact` page as navigation; the enquiry form
is not a modal, so there is no second modal or prefilled-message integration.
The existing backend requirement still applies.

The strip renders above the header, scrolls away normally and has a dismiss
button. Dismissal lasts until reload. An enabled strip occupies 32px from the first paint;
it does not insert space later or change the header/stacking offsets. The popup
is portalled and does not participate in hero layout. Reduced motion stops the
marquee and uses a fade-only popup entrance.

All four popups are square. Dedicated generated artwork is bundled in
`public/popups/` for Contact, New, Hot and Festive, with communication artwork for Contact and promotional campaign artwork for
New, Hot and Festive. Gifts, coupons and celebration props signal an offer;
Festive has no Diwali-specific or other occasion-specific symbols. `popupImages` in the offer data file selects them.
The images ship locally so they work immediately; move them to ImageKit only
after uploading, then update those four URLs in the same file. The original
product-banner prompt has not been changed. Mobile square cards remain compact
(at most half the viewport height); desktop cards are centered. The offer
palette uses solid blue, red and crimson with white text, defined once in the
labelled offer-colors block in `globals.css`. Strip CTAs are not underlined.

After editing, build, test on staging, then zip `out/` contents and send to Kapil
sir. No date scheduler, API, new provider or offer backend is involved.

### Shared popup component

All modal popups (Contact, Offer and Search) use the shadcn-style components
in `src/components/ui/dialog.tsx`. This is the single owner of the Radix portal,
overlay and accessible dialog primitives. Keep route-specific content and
presentation in the caller; do not create another direct Radix dialog wrapper.
Existing focus trapping, Escape handling and scroll lock come from the installed
Radix dependency. No extra dialog package or context provider is needed.

### Client ratings and video testimonials

The one-row client-logo strip is `app/(home)/components/client-strip.tsx`,
rendered directly after the hero. It uses all existing client logos in one
continuous loop, with hover/focus pause and reduced-motion support.

`app/(home)/components/platform-ratings.tsx` renders all three rating links
inside About, replacing the former “Based in” location cell, with the original dark glass
cell styling and light rating text. Locations remain
in the footer. The ratings are no longer part of the review section.

`app/(home)/components/clients.tsx` now contains only the client-stories heading
and `testimonials.tsx`: one featured written review with previous/next controls,
plus three compact video rows with square, uncropped thumbnails. They sit side by side from tablet widths and
stack on phones. Five written reviews remain available (Sudha Agarwal removed). Reviews
advance every six seconds while in view, with explicit pause/resume controls.
Rotation pauses on hover/focus, while a video is open or the tab is hidden;
reduced-motion preferences disable automatic rotation. Inactive reviews are inert and hidden from assistive technology;
shared grid sizing prevents section jumps as reviews change.

All three videos share one shadcn Dialog. YouTube iframes are created only on
click and removed on close; focus returns to the clicked thumbnail. Thumbnails
and supplied platform/reviewer logos use the shared ImageKit base.

Edit `platformRatings`, `testimonials` and `videoTestimonials` in `site-content.ts`.
Testimonial content is editable data, not a test fixture. Update it here only;
there are no tests locking reviewer names, wording, review counts, scores or
video URLs to their current values. Preview changes to verify layout, links
and actual playback.

Scores are manually supplied, not fetched live. Keep exact review/source URLs,
use excerpts for compact cards and do not invent individual star ratings,
review counts or aggregate-rating schema. Test actual external images and video
playback on the final domain as well as the local dialog behavior.

## 9. Before handing off a change

Run `npm run check`, inspect phone/tablet/laptop/large-monitor layouts and verify reduced-motion behavior. Recheck logo and certification URLs in a browser with external access. Confirm the form backend before claiming enquiries work. Keep changes confined to `/revamp`, and discuss SEO-driven visible design changes before making them.

`VERIFICATION.md` records validation and deployment limitations. Generated `out/`, local browser checks and deployment archives are ignored build artifacts, not source files to commit.
