# Kriscent — design and build notes

What is built, why it looks the way it does, what is still placeholder, and
what needs a decision. Banners have their own brief: `BANNER-DIRECTION.md`.

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

## Palette — the client's values, nothing else

```
paper  #F8FAFC   ink    #050125   card   #FFFFFF
blue   #2C53E0   prim   #1E4FD8   accent #CEDEFF
soft   #E5ECF6   line   #D8DEE8   muted  #4D5566
danger #EF4444
```

Everything is a token in `app/globals.css`. The blue appears once per block, on
the action or the one number that matters.

## Type

- Poppins 400/500/600/700, self-hosted in `src/fonts`, loaded with
  `next/font/local`.
- Four levels: `.t-display`, `.t-heading`, `.t-body`, `.t-label`. `.t-heading`
  floors at 1.5rem so the longest heading still holds two lines at 390px.
- The hero headline is sized by `.hero-title` (`clamp(1.5rem, 4.6vw, 3.25rem)`)
  and is deliberately smaller than it used to be: the headline sets the tone,
  the chips do the work.

## Header

60px fixed height at every scroll position, 32px logo, pill navigation, one
"Contact us". "Solutions" is a menu, not a link: it lists the five solutions
with the problem each removes, plus the seven industries as chips that set the
hero filter. It opens on hover, on click for keyboard and touch, and closes on
Escape, outside click or focus leaving. No focus trap — it is a menu.

## Buttons

One system: `components/ui/button.tsx` plus `.btn` in the CSS. Variants
primary / inverse / secondary / outline / ghost / link, sizes sm 36 · md 44 ·
lg 52 · icon. Lucide icons are passed **by name** (`icon="arrow-up-right"` in
`RequestDemoDialog`) because server components cannot pass a component across
the boundary. On product banners the pair is always the same: *Book a demo*
(outline, to `/contact`) and *Explore …* (primary, to the product page).

## Hero

Two things and one decision: a headline, one sentence, then "What does your
business do?" and seven category chips. The chips are the point, so the prompt
carries a brand mark and a rule that runs to the edge of the column, and each
chip is a solid pill in its own hue — deep enough for white type, with a
hairline and an icon in the same colour. They are deliberately compact — 36px on
desktop (2.25rem, 14px label, 14px icon), 40px on a phone: a translucent pill
over the photograph turns all seven the same muddy grey, so they are opaque and
small rather than big and lost. Chip size lives in the base `.chip` rule and in the
`min-width: 1024px` block, which repeats the same compact values. Never add a
larger size further down the sheet: that is what silently overrode the smaller
ones.

The background is one macro photograph of real hardware: a dark circuit board
with copper traces converging on a processor, raked by blue light, held at 78%
brightness so it reads as depth rather than noise. The photograph is left bright
on purpose (98% opacity, brightness 1.06) because the overlay does the work
instead: `.hero::after` is its own layer at `inset: 0` — 0.97 opaque at the left
edge, 0.95 at 32%, 0.72 at 48%, 0.40 at 60%, clear by 78% — plus a top vignette
for the bar and a floor where the banner stack begins. It is a separate layer
because `.hero-aurora` is oversized (`inset: -20%`) for its drift, and a
gradient painted on an oversized box lands its percentages somewhere else. No floating panels, no windows, no wireframe
grid, no 3D ribbon, no neon rainbow — and nothing that could be mistaken for a
small-business photo: this is a software company.

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

`/contact` is the page every *Book a demo* points at. Left: what we are and
every way to reach us. Right: `components/contact-form.tsx`, which keeps the old
site's fields, labels, order and phone-with-country behaviour, and submits
through `lib/submit-contact.ts`.

**API:** `CONTACT_ENDPOINT` in `src/config/variables.ts` is a `TODO_…` string.
While it is, the form simulates success so every state can be reviewed; setting
a real URL switches it on with no component change. The payload keeps the old
form's names (`name`, `email`, `phone`, `country_name`, `subject`, `message`).

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
| `API_ENDPOINT`, `CONTACT_ENDPOINT` | `TODO_…`; both forms simulate success until they are real |
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
