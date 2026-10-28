# Homepage — what exists, what is still placeholder

Review notes for the current build. Nothing here is a spec; it is a list of what
is finished and what needs a decision.

## The rule this page is built on

**Every block has one job, and the block's visual weight goes to that job.**

The hero's job is: make the visitor pick their industry. So the industry
selector is the largest, brightest, most contrasted object on the first screen.
Nothing else in the hero competes with it:

- no badge, no secondary button, no product mockup, no statistic row
- the headline is one line at 50px, sized to introduce the page and not to
  out-shout the control
- the trust line under the panel is 12px muted text, the quietest thing there
- 8 interactive elements on the whole first screen, and all 8 are tiles
- picking a tile scrolls to the list it just filtered, so the click visibly
  does something

The header is quiet for the same reason: on the homepage it is transparent over
the hero photograph (white wordmark, white nav) and turns into a solid light bar
once the page scrolls past the hero. It is `position: fixed` on that page, not
sticky — a sticky header keeps 64px of real estate that a hero section can only
reach into by being clipped, which is exactly what happened. Fixed takes it out
of flow, so the photograph starts at y=0 and genuinely sits underneath it.

**The hero fits the first screen.** Every vertical measurement in `.hero-body`,
`.hero-title`, `.hero-lead` and `.hero-panel` is tied to vh, so a 630px laptop
window and a 1100px desktop both show the badge, headline, lead, the whole panel
and space beneath it. Measured: 1350×629 leaves 61px below the panel, 1440×900
leaves 169px, 390×844 leaves 94px. A bar with a filled button across the top
of the image would pull the eye away from the panel.

## What changed in this pass

The first version failed on hierarchy: too much copy, two surfaces (white and
white), product rows that read like a catalogue, and an orphan badge that said
"ready now". It was rebuilt around five rules:

1. **One idea per section.** A section that needs a second idea gets a second
   section, not a second paragraph.
2. **Copy budgets.** Headline 9 words. Lead 24. Card description 8. Card
   outcomes 2, under 40 characters each. Step body under 7 words.
3. **Three surfaces only.** Paper, sand, ink. Sections alternate, so the page
   has rhythm; an all-white page reads as unfinished.
4. **One dominant action.** One filled button per screen. Everything else is a
   text link, so nothing competes with the action that matters.
5. **Measured type.** The headline is 60px on desktop because 68px overflowed
   its column; 36px on a phone because 40px pushed the industry chips below the
   fold. Both numbers were measured against the real Poppins metrics, not
   guessed.

## Section order and surface

| # | Section | Surface | Job |
|---|---------|---------|-----|
| 1 | Hero: the industry selector | background + primary wash | the one job: get a pick |
| 2 | Product list | paper | what you can have, one card each |
| 3 | How it works | **ink** | the 15 days, as four dated steps |
| 4 | Proof | paper | the numbers, CMMI, client names |
| 5 | Voices | **sand** | one client in full, two in support |
| 6 | Contact | **ink** | the form, and the only contact details |

The header and footer sit on the same surfaces as the sections they touch, so
the page has two dark blocks, not four.

## Language rules applied

- No "ready to sell", "ready now", "in stock", "offer". A product is either
  something we can install as it is, or something we built for one client.
- No prices, no demo credentials, no invented client names or percentages.
- No "in writing", "audited independently", "updates included" — claims run past
  legal, not design.
- Counters, CMMI, client logos and testimonials are the old site's real values,
  unchanged. Testimonials are excerpted, never rewritten, and each cut is marked
  with an ellipsis.

## Real data (do not change without checking the old site)

Counters: 1,549+ projects, 13 years, 1,245+ clients. CMMI Level 3 artwork.
46 client logos in `public/clients/`. Three testimonials, verbatim.
`sales@kriscent.in`, `info@kriscent.in`, `+91-7240560001`, `+91-8947027625`.
Real product pages for Kastrofy, K-Exam, DoctorPlus, K-Parking, K-RealEstate.

## Placeholder, before launch

1. **Product copy** — `src/data/products.ts`. Reads naturally, none approved.
2. **Product banners** — all but AI Calling Agents use `public/dummy/banner.webp`.
3. **Process day split** — Day 1–2 / 3–7 / 8–12 / 13–15 is a plan. 15 days total
   is approved.
4. **Unpublished product links** — AI Calling Agents, WhatsApp CRM and LMS have
   `url: ""`, and components then render no link at all.
5. **Enquiry endpoint** — `API_ENDPOINT` is still a TODO, so
   `src/lib/submit-enquiry.ts` simulates a successful send.
6. **Company address** — `contact.addressLines` in `src/config/variables.ts`.
7. **Industry routes** — footer industry links land on the hero chips until
   `/fintech`, `/logistics` … exist.

## Layout

```
revamp/
├── public/           static images, served at the site root
├── src/
│   ├── app/          routes; layout.tsx, page.tsx, solutions/page.tsx
│   ├── components/   sections/ (one file per page section), ui/ (primitives)
│   ├── config/       variables.ts - the one file for global values
│   ├── data/         products, categories, site content
│   └── lib/          utils, enquiry submission
└── next.config.ts
```

Everything imports through the `@/` alias, which points at `src/`.

## How to run

```bash
cd revamp
npm install
npm run dev     # http://localhost:3000
npm run build   # writes the static site to out/
```

`out/` is what gets zipped for cPanel. The site is a static export, so there is
no Node process on the server.


## Copy decisions, second pass

- **No eyebrow.** The headline says "ready-made", so a badge repeating it was noise.
- **One-line headline promise.** "Live in 15 days." sits on its own line in `--peri`,
  so it lands as a statement instead of being balanced into an awkward break.
- **Counts only when they are news.** Every category has one system except EdTech
  (two), so "1 system" was printed seven times to say nothing. Only `count > 1`
  renders a sub-label now.
- **Eighth tile is an action, not a count.** "All systems / 5 to install" mixed a
  per-category count with a catalogue total and explained neither. It reads
  "View all solutions", is styled quietly (never primary-filled) so it cannot
  compete with the seven real choices, and clears the filter.
- **No "Choose one".** The panel's question already asks.
- **Trust row** is one line at every width: `CMMI Level 3 · 1,549+ projects ·
  1,245+ clients`, separated by middots rather than pipes.

### On the CMMI claim
The old `index.php` never writes "Level 3" as text — it only embeds
`img/icons/cmmi.webp` with `alt="logo"`. That artwork itself reads
**CMMI LEVEL 3**, so the claim comes from the client's own badge and is safe to
state. The alt text was adjusted from "CMMI Level 3 appraised" to "CMMI Level 3":
"appraised" was an inference the old site never made.


## The hero, third pass: no photograph

The photograph was the tell. A stock studio can sit behind any company's
headline, which is why the page read as a good SaaS template rather than as
this company. It is gone, and the file with it.

What replaced it:

- **A field, not a photo.** Two soft light pools over ink, plus a 68px grid
  masked to fade before the edges. Nothing in it could belong to another brand.
- **Mockups, tilted.** A browser card with real product UI from
  `product-visual.tsx`, rotated back on the Y axis, with a phone over its lower
  corner. It shows that the software exists instead of saying it.
- **The hero answers the choice.** Picking an industry swaps the mockup, its
  accent colour and the glow behind it. The page then looks like it was made for
  that visitor. This is the idea the whole hero is built around.
- **Chips, not a panel.** The white card was a form. Chips belong to the
  sentence the visitor is reading, and they are one line of controls.
- **Type carries it.** Headline at 40-64px (`clamp(2.5rem, min(4.9vw, 9.8vh),
  4rem)`), line-height 0.98, letter-spacing -0.042em. The cap is set by the
  column, not by taste: "Ready-made software." measures 655px at 64px and the
  column is ~690px.
- **"15" is drawn, not printed.** A hollow numeral via `-webkit-text-stroke`,
  with a solid `--peri` fallback where the stroke is unsupported.
- **Motion, four lines of it.** Headline, subtext, then chips staggered 45ms
  apart, then the stage. `prefers-reduced-motion` turns all of it off.

Choosing no longer scrolls the page. The answer arrives in the hero itself;
scrolling away from it at that moment would hide the whole point.

Height: `min-h-[min(100svh,50rem)]`. On a tall monitor the hero caps at 800px so
the next section shows under the fold instead of leaving a void.

## Claims audit — 28 Oct

Every sentence that makes a factual claim was checked against `index.php`.
Three kinds of thing came out of it.

**Removed: written by us, not by the client.**

| Claim | Where it was | Verdict |
|---|---|---|
| "Most asked for" | product spotlight tag | invented, no data behind it |
| "independently appraised" | under the CMMI badge | the badge says "CMMI LEVEL 3"; nothing about an appraisal |
| "If a step slips, you hear it from us the same day" | process | a support promise nobody at Kriscent made |
| "Usually a reply within one working day" | contact form | same |
| "Twenty minutes on a call is usually enough" | strip under the list | same |
| Day 1–2 / 3–7 / 8–12 / 13–15 | process steps | invented, and false for products that import no records |
| "Already running at" | logo wall | these clients ran other projects, not the ready-made products |
| "and 34 more" | logo wall | replaced by a link to the real client page |

**Verified against `index.php`, safe to keep.**
`1,549+` projects and `1,245+` clients (counters, approved). Both inboxes,
both numbers, the WhatsApp number, CMMI Level 3 via the badge artwork, the three
testimonials verbatim, the client logos, "since 2014", Kota, Rajasthan.

**Needs a decision from Kriscent, not from us.**
- `13` years of experience is on the old site as a hard-coded figure, but
  founded-2014 makes it 12 in 2026. The counters were approved as they stand, so
  the number was left alone. Someone should confirm it.
- No street address exists anywhere in the old markup. The rebuild shows
  "Kota, Rajasthan, India" rather than inventing one.
- No Privacy or Terms page exists to link to, so no links were added.

## Structure changes, same pass

- The flagship product is its own band (`sections/ai-calling.tsx`), not a wider
  card in the grid. It had been both, which is how a page ends up saying the
  same thing twice.
- Every industry's builds are in the static HTML. Filtering now hides groups
  with the `hidden` attribute instead of unmounting them, so six of seven
  groups are no longer invisible to a crawler.
- One call to action, everywhere: "Request a demo". One noun: "solutions".
- FAQ added, marked up as FAQPage.
- Counters and the CMMI badge each appear once now, in the proof band.
