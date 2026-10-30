# Kriscent — design and build notes

What is built, why it looks the way it does, what is still placeholder, and
what needs a decision. Banners have their own brief: `BANNER-DIRECTION.md`.

## Styling and ownership

- Use Tailwind's standard slate/blue/red/amber/etc. palette classes directly.
  No paper, line, on-dark, or band colour aliases and no second palette in CSS.
- Shared primitives live in `src/components/ui`: shadcn-style Input, Textarea,
  Label and Button (CVA + Radix Slot), and Select (Radix). `components.json`
  configures shadcn for Tailwind v4 with `cssVariables: false`.
- Route-owned components live beside their pages: `app/(home)/components`,
  `app/solutions/components`, and `app/contact/components`. Contact submission
  and query helpers are in `app/contact/lib`. Global navigation, footer,
  providers, and cross-route primitives stay in `src/components`.
- `app/layout.tsx` renders the header, footer and category provider once. Pages
  contain only their metadata and route content.
- `lib/seo.tsx` owns page metadata. GTM, Organization and WebSite schema load
  once in `app/layout.tsx`; `components/route-tracker.tsx` reports later routes.
- `globals.css` only contains Tailwind imports, font/header setup, base
  accessibility defaults, animation keyframes and native scrollbar compatibility
  rules. Scrollbars retain OS behaviour and reset in forced-colour mode.
- Cards use larger `rounded-2xl` corners; solution banners use `rounded-3xl`.

## The page, in order, with the job of each block

| # | Block | Surface | One job |
|---|-------|---------|---------|
| 1 | Hero + category chips | dark | the visitor names their business |
| 2 | Solutions (full-width banners, sticky stack) | **paper** | show what already exists |
| 3 | How we deliver in 15 days | **paper** | make the 15-day promise believable |
| 4 | About (bento + certifications) | dark | reduce risk |
| 5 | Clients and reviews | **paper** | proof that it worked |
| 6 | Footer + closing CTA | dark | the last decision |

The light bands are deliberate: the page reads dark / light / dark / light /
dark instead of one long navy scroll, and each light band is a divider between
two dark ones. `/solutions` is a light page with the same dark banners laid on
it, and `/contact` is dark because it carries a form.

## Palette

Use Tailwind's built-in palette directly: `slate-950`/`slate-50` surfaces,
`slate-300`/`slate-600` supporting text, `blue-600` actions, and standard
red/amber/violet/cyan/emerald accents where the content calls for them.
No custom semantic colour aliases. The app icon uses the same blue family.

## Type

- Poppins 400/500/600/700, self-hosted in `src/fonts`, loaded with
  `next/font/local`.
- Four utility presets: `T_DISPLAY`, `T_HEADING`, `T_BODY`, `T_LABEL`. `T_HEADING`
  floors at 1.5rem so the longest heading still holds two lines at 390px.
- The hero headline uses `text-[clamp(2.375rem,4.15vw,3.75rem)]`
  and is deliberately smaller than it used to be: the headline sets the tone,
  the chips do the work.

## Header

60px fixed height at every scroll position, 32px logo, pill navigation, one
"Contact us". "Solutions" is a menu, not a link: it lists the five solutions
with the problem each removes, plus the seven industries as chips that set the
hero filter. It opens on hover, on click for keyboard and touch, and closes on
Escape, outside click or focus leaving. No focus trap — it is a menu.

## Buttons

One system: Tailwind utilities with CVA in `components/ui/button.tsx`. Variants
primary / inverse / secondary / outline / ghost / link, sizes sm 36 · md 44 ·
lg 52 · icon. Every action is a `<Link>` or a `<button>` — there is no dialog
component any more, so nothing needs an icon passed across a server/client
boundary.

On product banners the pair is always the same: *Request a demo* (outline, to
`/contact?solution=<id>`) and *Explore …* (primary, to the product page). In the
nav and the footer, *Contact us* is the outlined, quieter action, because the
chips in the hero are the loudest thing on the page.

## Hero

**Purpose: the visitor picks the business they run.** Everything else on the
screen supports that one click.

Priority, highest first:

1. the question and the seven chips — the focal point
2. the headline ("ready-made, 15 days")
3. one line of subtext
4. the nav and the photograph, clearly quieter than all of the above

**The chips** are 60px tall, 17px semibold, 28px of side padding, with a 16px
icon — they read as buttons, not tags. All seven share one glass material
(translucent fill, 1px light border, backdrop blur) because a different colour
per chip made the row read as a spectrum instead of a set of choices; category
identity is the icon's hue, and the hue only becomes a surface on hover and when
selected. Selected flips to a solid light fill with dark text and a glow — the
inverse of the unselected pill, so there is no ambiguity. The row measures
~1177px, which fits the 1184px column from 1280px up; below that it is capped to
a 4 + 3 break, and on a phone it wraps 2 + 2 + 2 + 1 with the last chip taking
the full row.

**The question** is 20-24px semibold, high contrast, directly above the chips.
No mark, no rule: they pulled the eye off the words.

**The headline** is one step quieter than the chips (38-60px desktop,
32-35px phone). The subtext is one line at 18-20px, in a measure wide enough that
it does not wrap on desktop.

**Removed from the hero**: the stats strip (the figures live in About), badges,
mockups, outlined numerals, and any second call to action.

**The background** is the circuit-board photograph, blurred 14px, at 62% and
behind a ~84% wash of the dark token, with one soft brand-blue pool under the
chip row. Nothing sharp sits behind or beside the chips. The wash is on
Tailwind `after:` utilities at `inset: 0` — `.hero-aurora` is oversized for its drift, and a
gradient on an oversized box lands its percentages somewhere else.

**No layout shift, ever.** Clicking a chip changes `aria-pressed` and swaps a
16px icon for a 16px tick. Nothing is added, removed or resized, so the hero
never moves under the pointer. The click then smooth-scrolls to the top of the
solutions list, offset for the sticky bar; clicking the selected chip again
clears the filter.

## Solutions and the catalogue

Five solutions, one full-width banner each, stacked sticky: the covered banner
scales down and is dimmed by a painted shade layer (never `opacity`, which would
let the banner behind it bleed through). The list is filtered by a real
select control, not a line of text, in the top-right of the band.

Everything else the client sells is on `/solutions`, under the five banners, in
`src/data/catalogue.ts`: 35 systems with names, taglines and product URLs copied
from the old site. Each card renders a 16:10 artwork slot (`image` is empty);
drop a path into `image` and the card switches to a real `<img>` with no layout
change. Rows whose old link was `coming-soon.php` are not links.

## Delivery

A rail, not a list: a count-up to 15, the line filling as the section passes, a
lit puck on the leading edge, and four stops that wake as the line reaches them.
Each stage is a date range and two words. Reduced motion renders the finished
rail, and on phones it stands vertically.

## About

"13 years of shipping software, from Kota." with the number in brand blue, the
tenure cell solid red, and the CMMI plate on a gold surface with a drifting
gradient. The bento staggers in once; nothing follows the pointer.

## Clients

46 client logos in two marquee rows, then four reviews in two aligned columns,
each quote pinned to the bottom rule of its card.

## Footer

Five columns on one baseline: brand, solutions, industries, company, contact.
Company points at the client's own pages (`kriscent.in/about`,
`kriscent.in/clients`) and at `/contact`; the WhatsApp number is a chat
initiator only. The five published lines print as one link —
`+91-7240560001/2/3/4/5` — which dials the first.

## Contact

`/contact` is where "Contact us" and "Request a demo" both land. Left: what we are and
every way to reach us. Right: `components/contact-form.tsx`, which keeps the old
site's fields, labels, order and phone-with-country behaviour, and submits
through `lib/submit-contact.ts`.

**API:** `CONTACT_ENDPOINT` in `src/config/variables.ts` is a `TODO_…` string.
While it is, the form simulates success so every state can be reviewed; setting
a real URL switches it on with no component change. The payload keeps the old
form's names (`name`, `email`, `phone`, `country_name`, `subject`, `message`).

## Call-to-action labels

Two, and only two — every other variant is banned:

| Where | Label | Destination | Form title |
|---|---|---|---|
| Nav, footer, section ends | **Contact us** | `/contact` | "Contact us", solution field empty |
| A product banner | **Request a demo** | `/contact?solution=<id>` | "Request a demo of <product>", solution pre-filled |

One form serves both. `?solution=` sets the page title and the Solution field
(`lib/use-requested-solution.ts`); the dialog and its separate enquiry form were
deleted rather than left as a third way in.

## The banners

Five banners: AI Calling Agents, WhatsApp CRM, K-Exam, K-Edusity, Kastrofy.
K-LMS and K-Edusity were merged — they were the same school ERP.

Spec: **16:7**, 1680 × 735 WebP, artwork right, left third calm. Files in
`public/banners/`. To replace one, overwrite the file; the data file and the
component do not change. The brief and the production steps are in
`BANNER-DIRECTION.md`.

## Still placeholder or unconfirmed

| Item | State |
|---|---|
| `CONTACT_ENDPOINT` | `TODO_…`; the form simulates success until it is real |
| Product problem / outcome lines | DRAFT — written from the old site, need sign-off |
| Industries per solution | DRAFT — decides which chip finds which solution |
| Delivery day ranges (`src/data/steps.ts`) | DRAFT — the 15-day total is approved, the split is not |
| ISO 9001:2015 / ISO 27001 wording + badges | DRAFT; both use the CMMI plate as a stand-in |
| Catalogue artwork | empty `image` field on all 35 rows; slots render in place |
| Product page links | taken from the old site; AI Calling Agents uses the client's own site |
| Privacy policy | no page exists on the old site; the footer links Terms only |
| Postal address | does not exist on the old site; the footer shows the city only |

## Carried over from the old site, verified in `index.php`

- title, description, canonical, OG/Twitter for the existing pages — unchanged
- GTM `GTM-TDFV5SJ4`, Tawk.to widget
- counters 1,549+ / 1,245+ / 13
- four testimonials, verbatim
- 46 client logos
- emails, five phone lines, WhatsApp, Kota
- social profiles: LinkedIn, Instagram, Facebook, X, YouTube
- favicons and the OG image

## How this build was verified

There is no browser in the build sandbox, so verification is: `tsc --noEmit`,
`npm run build` with `output: "export"`, a class audit over `out/*.html` (every
class used exists in the emitted CSS), HTML content checks, and layout proofs
rendered from the same tokens, type scale and spacing the build uses.

## Footer office gallery

`components/footer/office-gallery.tsx` adapts the supplied kriscent.in expandable
gallery. Data is in `data/locations.ts`, with the office ImageKit base separately
configured in `config/variables.ts`. Wide screens use expanding columns; phones
use expanding rows to leave room for readable addresses. Selection uses native
buttons, while map links are siblings (never nested inside buttons). Autoplay
pauses during interaction, when offscreen or in a hidden tab, and under reduced
motion. No visible playback controls are rendered. About cards use 32px corners.


## Hero background update

The hardware photograph is replaced by `public/hero-software-bg.webp`: blue-lit
layered software panels on the right, empty navy on the left, no baked-in left-side website copy,
buttons or nav. The right illustration retains its original panel text: “Your
idea. Our ready solution.”, “Faster Time to Market”, “Proven & Reliable”, and
“Built for Your Industry”. The art follows the user's supplied visual reference. Tailwind
directional scrims protect the headline and fade the lower artwork before the
chips; phones use a quieter 30% image layer. Hero copy, category behaviour and
layout remain unchanged. The WebP is 1376 × 768 and about 34 KB.

### UI corrections: light navigation and original contact fields

Use white as the default page surface. The shared 52px header is transparent only while overlapping the homepage hero, which extends beneath it. All navigation panels are white; the header action is compact. Contact is a light page with the exact original five visible fields and no Solution selection. Product context may change the contact heading, not the fields.

Phone product cards use 30% image above 70% content, with an image-to-background blend. The last product is inset from the viewport; sticky shade layers are radius-clipped without changing the sticky ancestor. Remove the hover border. The solution-list closing CTA is a solid primary strip with heading left and action right on wider screens.

About cards arrive once from different directions with a short blurred fade; reduced motion skips it. No em dash in website copy. Keep the approved hero illustration lettering and footer behavior unchanged.

### Responsive multi-industry filtering

Hero industries are independent toggles, not a single-choice redirect. Selected chips swap their industry icon for an X. Keep selections visible in the hero and mirror them as removable tags in Solutions; match any selected industry, never duplicate a product. No selection means all featured products.

Use two-column, compact, left-aligned hero chips on phones. Mobile navigation animates opacity and vertical position, remains keyboard-inert when closed, and respects reduced motion. Contact actions use a Mail icon; demos use Presentation.

Page gutters are fluid instead of a centered 80rem shell. Never derive product-copy padding from viewport width while capping its containing block: that collapses readable width on larger displays. Use bounded local padding with a proportional text column. Cards must expand for their content; no max-height clipping. Keep the sticky stack on roomy desktop screens and use a plain list on mobile and short-height screens.

### Shared search dialog

Use one search dialog in the root shell, opened by a compact header trigger, the prominent All Solutions trigger, or Ctrl/Cmd+K. Keep it light, keyboard-accessible, responsive and separate from the static page content. Product names, descriptions, industries and curated keyword arrays feed a small local index; avoid network search and heavyweight ranking libraries for this catalogue. Match any relevant product, require all query terms, rank names before keywords, and preserve existing destinations. Missing product pages resolve to their catalogue entry, not a made-up URL. Keywords live next to each product so aliases and business needs stay easy to maintain.
