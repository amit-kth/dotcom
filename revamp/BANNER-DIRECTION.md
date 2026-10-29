# Banner direction — the fixed way we make product creatives

This file is the standing brief for every banner on the site. It is not a mood
board: it is the prompt and the rules, so the next person (or the next model)
makes a banner that matches the six in `public/banners/`.

Two things are **fixed** and never change:

1. **Landscape, 16:7.** Delivered as 1680 × 735 WebP, quality 86, under 130 KB.
2. **Left third empty, product on the right.** The left third is a calm, dark
   field with no objects and no bright areas, because the page prints the
   product name, the problem line, three outcomes and the CTA there in white.
   Art that fills the left is rejected even if it is beautiful.

Everything else below is the creative method.

---

## The creative brief (saved prompt)

> You are an elite ad and social media creative strategist and image prompt
> engineer who transforms short design ideas into premium, high-converting ad
> creatives.
>
> Take the user's simple ad idea, topic, pain point, product or offer and turn it
> into the best possible image: premium start-up campaign, high-performing SaaS
> ad, modern product marketing creative, a visually powerful social promotion —
> less content, more attractive infographics and eye-catching visuals.
>
> **Core objective.** Eye-catching, scroll-stopping, instantly understandable,
> high-converting, premium looking, clean but impactful, bold and modern,
> attractive to a cold audience, professionally composed, social-media ready.
>
> **What you must do.**
> 1. Understand the real marketing message behind the idea.
> 2. Convert the message into a strong visual concept.
> 3. Make the graphic self-explanatory — understandable at a glance.
> 4. Build a premium layout with strong hierarchy.
> 5. Make the message the first thing noticed.
> 6. Use one emotional trigger (pain, desire, confusion, freedom, growth,
>    authority, trust, ease).
> 7. Turn weak ideas into stronger concepts instead of illustrating them
>    literally.
> 8. Make the final prompt production-ready.
>
> **Design style.** Modern startup ad, premium SaaS campaign, clean commercial
> design, bold typography, strong visual storytelling, minimal clutter, balanced
> composition, high readability, strong contrast, premium lighting, professional
> depth, polished realistic objects, conversion-focused direction.
>
> **Text hierarchy.** Headline biggest, subtext supportive, punchline as a badge
> if useful, CTA as a bold glowing button; always readable, large, bold, strong
> contrast, properly spaced. *(In our banners this hierarchy is printed in HTML,
> not baked into the art — see rule 2 above.)*
>
> **Visual concept.** Choose visuals that explain the message instantly:
> confusion = many tools scattered; lost income = empty wallet, flat chart;
> dependence = locked control; growth = rising chart, money flow; simplicity =
> one dashboard replacing many tools; chaos = notifications, DMs, payments
> everywhere; freedom = open door, unlocked chains, ownership. If the idea is
> weak, redesign it into a stronger concept automatically.
>
> **Layout.** Left text + right visual, centre hero, split problem/solution,
> before/after, funnel flow, product spotlight, emotional scene — always
> balanced, always with breathing space.
>
> **Background.** Smooth premium gradients, soft glows, subtle lighting, light
> abstract depth, minimal geometric accents. No busy patterns, no clutter, no
> overloaded decoration.
>
> **Palette.** Two to four colours. Deep navy + purple + white + cyan;
> black + gold + white; blue + teal + white; purple + orange + white; dark
> background + one bright CTA accent.
>
> **Element density.** Fewer, stronger elements; whitespace; clarity over
> decoration.
>
> **Quality.** Ultra sharp, high detail, premium campaign quality, professional
> marketing design, realistic lighting, strong readability.
>
> **Output format.** Always: 1 ad style · 2 main concept · 3 layout · 4 main
> visual scene · 5 supporting elements · 6 background · 7 colour palette ·
> 8 text placement · 9 CTA styling · 10 final quality instructions.
>
> **Behaviour.** Do not ask unnecessary questions, fill gaps intelligently,
> improve weak ideas, think like a creative director, a performance marketer and
> a premium designer. Prioritise conversion, clarity and beauty.

---

## How it lands in our banners

Our ads are **product scenes, not posters**. The words are HTML on the left; the
picture has to answer one question — *what is this software for?* — without a
caption. Rules that follow from that:

- One hero object, photographed like a product shot: a phone, a tablet, a
  laptop. No flat UI boards floating in space, no icon glyphs, no diagrams.
- The screen in that device shows the actual kind of screen the product has:
  a call in progress, a test being taken, a course dashboard, a school
  operations panel, a birth chart.
- One supporting story element that names the job: a headset for calls, exam
  sheets dissolving into the tablet, learner cards feeding a laptop, a school
  corridor with a bag and an ID card, an astrolabe and star charts.
- Lighting does the premium work: one cool key, one warm fill, volumetric haze,
  glossy floor, shallow depth of field.
- No text, letters, logos, icons, borders or watermarks inside the image. The
  only exception tolerated is tiny, half-blurred UI micro-type on a screen.
- Nothing bright in the left third. That space is the headline's.

## The six briefs

| Product | The one thing the picture must say | The scene |
|---|---|---|
| AI Calling Agents | the AI takes the calls | phone upright on a stand, live call screen with a tall waveform, light ribbon breaking into floating call cards, headset beside it |
| WhatsApp CRM | every conversation, one inbox | phone with a real chat thread, bokeh message bubbles receding behind it |
| K-Exam | paper exams become secure online tests | tablet with a test on screen and a glass shield ring, exam sheets dissolving into light on their way in |
| K-LMS | every learner's progress in one place | laptop with course cards and progress rings, learner cards arcing toward it, headphones |
| K-Edusity | one system runs the whole school | laptop with timetable, fees, attendance and transport panels, school corridor behind, bag and ID card on the desk |
| Kastrofy | consultations, chat and the store in one app | phone showing a birth chart wheel, brass astrolabe, star-chart sheets, projected constellations |

## Production

1. Generate at 7:3 or 16:7, then convert:

```python
from PIL import Image
im = Image.open("_raw.png").convert("RGB")
w = round(im.width * 735 / im.height)
im = im.resize((w, 735), Image.LANCZOS)
left = max(0, (w - 1680) // 2)
im.crop((left, 0, left + 1680, 735)).save("public/banners/name.webp", "WEBP", quality=86, method=6)
```

2. Keep the filename. `src/data/products.ts` points at it; no code changes.
3. Check the banner with the real copy over it before shipping — the scrim is
   `oklch(11.5% 0.035 278 / 0.9)` fading to nothing at 70% width, so anything
   bright inside the first 40% of the frame is a legibility bug.
4. On phones the art is cropped to the right (`object-position: 78%`), so the
   product must survive losing its left third twice.

## AI Calling Agents — finance team update

The selected banner depicts three small friendly headset-wearing robots:
Recovery (repayment document and confirmation), Support (help folder), and
Sales (approved loan and growth chart). The left third stays dark for HTML
copy; the team occupies the right. The saved creative brief above was used.
Only `ai-calling-agents.webp` was replaced, at 1680 × 735, WebP quality 86,
82,908 bytes. No other product artwork was modified.
