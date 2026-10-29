# Homepage — round 10 build notes

What is built, what is still placeholder, and what needs a decision.

## The page, in order, with the job of each block

| # | Block | Surface | One job |
|---|-------|---------|---------|
| 1 | Hero + category chips | dark | the visitor names their business |
| 2 | Solutions (full-width banners, sticky stack) | dark | show what already exists |
| 3 | How we deliver in 15 days | **paper** | make the 15-day promise believable |
| 4 | About (bento + certifications) | dark | reduce risk |
| 5 | Clients and reviews | **paper** | proof that it worked |
| 6 | Footer + closing CTA | dark | the last decision |

The two paper bands are deliberate: the page reads dark / light / dark / light /
dark instead of one long navy scroll, and each light band is a divider between
two dark ones.

## Palette — the client's values, nothing else

```
paper  #F8FAFC   ink    #050125   card   #FFFFFF
blue   #2C53E0   prim   #1E4FD8   accent #CEDEFF
soft   #E5ECF6   line   #D8DEE8   muted  #4D5566
danger #EF4444
```

Everything is a token in `app/globals.css`. The blue appears once per block, on
the action or the one number that matters.

## The six solutions

AI Calling Agents · WhatsApp CRM · K-Exam · K-LMS · K-Edusity · Kastrofy.

Banner spec: **16:7**, 1680 × 735 WebP, artwork right, left third calm.
Files: `public/banners/*.webp`. To replace one, overwrite the file — the data
file and the component do not change.

The art is photographic, not diagrammatic: dark-navy studio renders of the
product as a physical object on the right, empty calm space on the left for the
copy. AI Calling Agents: a phone in a call with a light ribbon and floating call
cards. WhatsApp CRM: a phone running a chat thread. K-Exam: a tablet showing a
live test while paper sheets dissolve into it. K-LMS: a laptop with course cards
and learner cards arcing toward it. K-Edusity: a laptop running a school
operations panel, in a school corridor. Kastrofy: a phone showing a birth chart,
with an astrolabe and star charts.

The brief, the fixed layout rule (16:7, left third empty) and the production
steps live in `BANNER-DIRECTION.md`. Follow it for every future banner.

## Still placeholder or unconfirmed

| Item | State |
|---|---|
| `API_ENDPOINT` (`src/config/variables.ts`) | placeholder; the form simulates success until it is real |
| Product problem / outcome lines | DRAFT — written from the old site, need sign-off |
| Industries per solution | DRAFT — decides which chip finds which solution |
| Delivery day ranges (`src/data/steps.ts`) | DRAFT — the 15-day total is approved, the split is not |
| ISO 9001:2015 / ISO 27001 wording + badges | DRAFT; both use the CMMI plate as a stand-in |
| Privacy policy | no page exists on the old site; the footer links Terms only |
| Postal address | does not exist on the old site; the footer shows the city only |

## Carried over from the old site, verified in `index.php`

- title, description, canonical, OG/Twitter — unchanged
- GTM `GTM-TDFV5SJ4`, Tawk.to widget
- counters 1,549+ / 1,245+ / 13
- four testimonials, verbatim (the fourth, Shrinath Travels, was missing from
  the previous build)
- 46 client logos
- emails, both phone numbers, WhatsApp, Kota
- social profiles: LinkedIn, Instagram, Facebook, X, YouTube
- favicons and the OG image, rebuilt from `img/favicon.png` and
  `img/logo/k-512-512.png`

## System

- Poppins 400/500/600/700, self-hosted in `src/fonts`, loaded with
  `next/font/local`.
- Four type levels: `.t-display`, `.t-heading`, `.t-body`, `.t-label`. Display is
  `clamp(1.5rem, 7.4vw, 5.5rem)` — sized so the hero headline holds in two lines
  from 320px to 1920px.
- One radius scale: 12 / 20 / 32.
- One entrance animation (`components/reveal.tsx`): 20px up, fade, once.
  `prefers-reduced-motion` renders the finished state, drops the sticky stack to
  a plain list, and stops the marquees and the hero rings.
- Header: 60px fixed height, 32px logo, "Since 2014", pill nav with a
  Solutions menu (six products + the seven industries), one "Contact us".
- One button system (`components/ui/button.tsx` + `.btn` in the CSS): primary,
  inverse, secondary, outline, ghost, link — three sizes, lucide icons passed
  by name so they work from server components too.
- Delivery is a rail, not a list: the fill, the puck and the four stops are all
  driven by one scroll value; reduced motion shows the finished rail.

## How this build was verified

There is no browser in the build sandbox, so verification is: `tsc --noEmit`,
`npm run build` with `output: "export"`, a class audit over `out/*.html` (every
class used exists in the emitted CSS), HTML content checks, and a layout proof
rendered from the same tokens, type scale and spacing the build uses.
