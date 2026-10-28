# Homepage — what exists, what is still placeholder

Review notes for the current build. Nothing here is a spec; it is a list of what
is finished and what needs a decision.

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
| 1 | Hero + industry chips | paper | what this is; the one question |
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
