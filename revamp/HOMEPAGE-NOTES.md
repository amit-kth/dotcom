# Homepage — what exists, what is still placeholder

Review notes for the homepage build. Nothing here is a spec; it is a list of
what is finished and what needs a decision from you.

## Section order

| # | Section | Purpose | Real or placeholder |
|---|---------|---------|---------------------|
| 1 | Hero | what this is, why it is fast | copy drafted, needs sign-off |
| 2 | Industry chips + product rows | the question the page exists to answer | 5 products, placeholder copy |
| 3 | Flagship band (dark) | capability proof | copy placeholder, no client named |
| 4 | 15-day timeline | turns the promise into a plan | day split needs confirming |
| 5 | Comparison | ready-made vs custom build | copy drafted |
| 6 | Counters + CMMI | company scale | **real, from the old site** |
| 7 | Client wall | recognition | **real, all 46 logos** |
| 8 | Testimonials | someone like them | **real, verbatim from index.php** |
| 9 | Enquiry form | the conversion | real fields, endpoint not wired |
| 10 | Closing CTA | two exits | copy drafted |

## Real data carried over (do not change without checking the old site)

- Counters: 1,549+ projects, 13 years, 1,245+ clients.
- CMMI Level 3 badge (`public/icons/cmmi.webp`).
- All 46 client logos (`public/clients/`).
- Three testimonials, word for word, including the client's own phrasing.
- Contact: `sales@kriscent.in`, `info@kriscent.in`, `+91-7240560001`,
  `+91-8947027625`.
- Product page links for Kastrofy, K-Exam, DoctorPlus, K-Parking, K-RealEstate
  are the real URLs taken from `index.php`.

## Placeholder, to be replaced before launch

1. **Product copy** — descriptions, problems and outcomes in
   `data/products.ts`. Written to read naturally, none of it approved.
2. **Product banners** — every product uses `public/dummy/banner.webp` except
   AI Calling Agents, which uses the real ImageKit poster.
3. **Timeline day split** — Day 1-2 / 3-7 / 8-12 / 13-15 is a plan, not a
   commitment. Total of 15 days is approved.
4. **Links not yet published** — AI Calling Agents, WhatsApp CRM and LMS have
   `url: ""`, which the components read as "no link". Nothing dead is rendered.
5. **Enquiry endpoint** — `API_ENDPOINT` in `config/variables.ts` is still a
   TODO, so `lib/submit-enquiry.ts` simulates a successful send. Set the real URL
   and the simulation can never run again.
6. **Company address** — `contact.addressLines` in `config/variables.ts`.
7. **Category landing pages** — footer links point at the homepage chip panel
   until `/fintech`, `/logistics` … exist.
8. **Case study for the flagship band** — no client, sector or result is named
   yet, deliberately. Add the real one; do not invent numbers.

## Deliberate omissions

- No prices anywhere.
- No demo credentials, demo IDs or demo passwords. "Request a demo" opens a form.
- No invented client names, awards, percentages or response-time guarantees.
- No external trackers beyond the GTM and Tawk.to tags inherited from the old
  site (in `components/seo.tsx` and `app/layout.tsx`).

## How to run

```bash
cd revamp
npm install
npm run dev     # http://localhost:3000
npm run build   # writes the static site to out/
```

`out/` is what gets zipped for cPanel. The site is a static export, so there is
no Node process on the server.
