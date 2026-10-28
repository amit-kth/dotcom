# Homepage — round 9 build notes

What is built, what is still placeholder, and what needs a decision. Not a spec.

## The page, in order, with the job of each block

| # | Block | One job |
|---|-------|---------|
| 1 | Hero + category chips | the visitor names their business |
| 2 | Solutions (full-width banners, sticky stack) | show what already exists for that business |
| 3 | How we deliver in 15 days | make the 15-day promise believable |
| 4 | About (bento) | reduce risk: who these people are |
| 5 | Clients and reviews | proof that it worked |
| 6 | Footer + closing CTA | the last decision |

Enquiries are a modal, not a section. There is no FAQ, no pricing, no comparison,
no blog, and no second form.

## Banner spec — the one thing to get right when artwork arrives

- **Ratio: 16:7** (for example 1680 × 735), WebP.
- **Left ~55% calm.** Text sits there: category label, name, one-line problem,
  three outcomes, one "Request a demo".
- **Artwork on the right.** The component adds a token scrim over the left edge,
  but artwork should not need it to be legible.
- Replace `public/banners/placeholder.webp` per product by changing `banner` in
  `src/data/products.ts`. No component change. Search `TODO(banner)`.

On phones the banner becomes a column: copy on a solid token surface first, then
the artwork at 16:7 underneath. That is deliberate — it is the only way the copy
stays legible at 390px.

## Still placeholder or unconfirmed

| Item | State |
|---|---|
| `API_ENDPOINT` (`src/config/variables.ts`) | placeholder; the form simulates success until it is real |
| Product banners (7) | one shared placeholder image |
| Delivery step day ranges (`src/data/steps.ts`) | DRAFT — the 15-day total is approved, the split is not |
| ISO 9001:2015 / ISO 27001 wording + badges | DRAFT; both use the CMMI plate as a stand-in |
| Product problem/outcome lines | DRAFT — written from the old site, need sign-off |
| Privacy policy | no page exists on the old site; footer links Terms only |
| Postal address | does not exist on the old site; footer shows the city only |
| Client logo count (46) | counted from `public/clients/` |

## System

- Dark bands only: `--band-*` tokens in `globals.css`, ~278 hue, 8–16% lightness.
- One accent (`--accent-bright`) and it appears once per block as the action.
- Four type levels: `.t-display`, `.t-heading`, `.t-body`, `.t-label`.
- One radius scale: 12 / 20 / 32.
- Reveals are one component (`components/reveal.tsx`): 20px up, fade, once.
  `prefers-reduced-motion` renders the finished state and turns the sticky stack
  into a plain list.

## How this build was verified

There is no browser in the build sandbox, so verification is: `tsc --noEmit`,
`npm run build` with `output: "export"`, a class audit over `out/*.html` (every
class used is present in the emitted CSS), HTML content checks, and a
layout proof rendered from the same token/type/spacing values.
