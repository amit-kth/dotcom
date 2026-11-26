# Kriscent website

Next.js (App Router) + TypeScript + Tailwind. Built locally, deployed as plain
HTML to cPanel. No server, no database.

The repo root also holds the old PHP site (`index.php`, `css/`, `js/`, `img/`)
and its dated app folder. These are legacy: the updated code is on `main` and
the old code on the `old-code-backup` branch of the company GitHub. Work in the
dated app folder only as described below, and never edit the root PHP files.

## Local development

```sh
npm i
npm run dev
```

That is all you need. The dev server runs at http://localhost:3000.

### Checks

Run before you hand anything over:

```sh
npm run check
```

It builds the site, type-checks, runs the tests and checks the exported HTML for
SEO, headings and assets. Nothing here touches the live enquiry API.

## SSG (why the site is static)

`next.config.ts` sets `output: "export"`, so `next build` writes the whole site
to a folder of plain HTML. That is what lets it run on cPanel with no Node.

What that means for you:

- Allowed: pages, components, client-side state (filters, search, forms).
- Not allowed: API routes, server actions, middleware, `searchParams`, dynamic
  routes without `generateStaticParams`, anything that needs a server at request
  time. It will fail the build.
- Images are not optimised by Next; use plain `<img>`.
- `trailingSlash: true` means `/solutions/` builds to `solutions/index.html`.

## Data

Everything editable lives in `src/data/`. Nothing is fetched at runtime.

| File | What it holds |
| --- | --- |
| `products.ts` | The large featured product cards |
| `catalogue.ts` | The smaller catalogue cards, plus `comingSoon` |
| `categories.ts` | Industry filters and their labels |
| `offer.ts` | The offer tag/popup |
| `faqs.ts` | FAQ questions and answers |

Edit the existing object; keep its `id` stable (ids are used by links, filters
and the contact form). Product links must be real URLs — never invent one.

## Images

Two sources, on purpose:

- **ImageKit** (`https://ik.imagekit.io/qk2ww553c/...`) for large hero and
  section photography.
- **Local `public/`** for banners, logos and artwork that must always load:
  `public/banners/`, `public/logo/`, etc.

**Adding a new image? Save it in `public/` and reference it as `/name.webp`.**
Do not add hotlinks to random external hosts — they break silently.

## SEO

Each page renders one `<Seo {...metadata.x} />` from `src/lib/seo.tsx`, which
outputs the title, description, canonical, Open Graph/Twitter tags and page
schema. Page copy lives in `metadata` in `src/config/variables.ts`. Site-wide
schema, GTM and icons are set once in `src/app/layout.tsx`. Do not add a second
SEO implementation.

## Contact form API

The form posts JSON to:

```
https://kriscent.in/K-GOD/api/v1/dotcom-enquiry
```

Body:

```json
{
  "name": "…",
  "email": "…",
  "phone": "+917240560001",
  "subject": "…",
  "message": "…",
  "country_name": "India"
}
```

A 2xx means accepted; anything else is shown to the visitor as an error. The
endpoint must allow our domain via CORS. Code: `src/app/contact/lib/submit-contact.ts`.

## Coming soon products

Some products are not for sale yet. They live in `comingSoon` in
`src/data/catalogue.ts` and appear only on `/coming-soon`. They are deliberately
absent from `catalogue`, so they never show in the solutions list, the industry
filters or search.

- **Move one to the catalogue:** delete its `comingSoon: true` line and move the
  entry into the `catalogue` array above it.
- **Remove a product for good:** delete the entry, its image in `public/banners/`
  and any mention in `products.ts` or the FAQ.

## Offers

Offers are changed in `src/data/offer.ts` and nowhere else.

```ts
export const offer: Offer | null = {
  id: "school-offer-1",          // new id per offer, so it shows again
  tone: "new",                   // "new" | "hot" | "festive" (sets colours)
  heading: "Education offer",
  discount: "20% off",           // never write rupee prices
  products: ["k-exam", "k-edusity"], // or "all"
  cta: "Claim offer",
};
```

To remove one, set `export const offer: Offer | null = null`. Product ids come
from `products.ts` and `catalogue.ts`; a wrong id logs a warning in dev.

## Deployment

1. `npm run build`
2. An `out/` folder is generated.
3. Zip the **contents** of `out/` (not the folder itself).
4. Give the zip to sir; he extracts it into the root of `public_html` on cPanel.

Rules:

- **Never add or edit `.htaccess` in this project.** Hosting rules are handled
  on cPanel; a stray file here will overwrite them.
- **Never create a product folder** (e.g. `public/product/...`) in this project.
  Product pages are hosted elsewhere and linked to, not copied in.
- Do not upload source, `node_modules` or `.next` to cPanel. Only `out/`.
- Node.js is needed to build, not to host.
