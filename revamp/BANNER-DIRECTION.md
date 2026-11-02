# Product banner brief

## Always establish the product type first

There are two product types: **premium** and **general**.

Before generating any product banner, ask which type it is unless the user has already explicitly specified it. A product name alone is not enough: ask “Is this a premium or general product banner?” Do not guess from its name or from an earlier image. If a batch is explicitly described as general or premium, the type is already clear for that batch.

These are creative/layout categories, not pricing claims or new website labels.

## Premium products: large cards

- Used by the large featured cards on the homepage and All Solutions page.
- Landscape 16:7, delivered as 1680 × 735 WebP, ideally below 130 KB.
- Keep the left third calm and dark, without bright objects. HTML copy and buttons occupy that space.
- Place the product scene and supporting visual story on the right.
- Preserve enough of the main subject for the existing mobile crop.
- Use believable devices, photographic lighting and a cohesive palette of two to four main colours. No generic floating UI boards, decorative clutter or invented brands.
- Do not bake headings, logos, prices or CTAs into the artwork. Tiny interface microtype is acceptable.
- Existing approved artwork remains unchanged unless that specific product is requested.

### Premium prompt template

> Create one standalone premium product scene for [PRODUCT], which helps users [PURPOSE]. Landscape 16:7. Keep the left third dark and visually quiet for HTML copy; position the main subject and supporting story on the right. Show [DEVICE / REAL-WORLD SCENE] with a believable interface appropriate to the software, supported by [ONE CONTEXTUAL ELEMENT]. Use polished photographic lighting, realistic materials and a restrained [PALETTE] palette. The product's purpose should be recognizable at a glance. No large text, logos, watermarks, prices or CTA graphics. Keep the main subject safe for a right-biased mobile crop.

### Existing premium directions

| Product | Main message | Visual direction |
| --- | --- | --- |
| AI Calling Agents | AI handles calls | Approved friendly finance robots: Recovery, Support and Sales, with headsets and relevant documents. Keep the left third dark. |
| WhatsApp CRM / K-SMART | Conversations and leads in one place | Phone with a chat interface and restrained message context. |
| K-Exam | Secure online tests replace paper work | Test-taking tablet, exam sheets and security context. |
| K-Edusity | One system runs a school | School-management laptop, corridor, bag and ID card. K-LMS is part of this solution, not another banner. |
| Kastrofy | Consultations, chat and store in one app | Astrology phone interface, astrolabe and star charts. |

## General products: catalogue cards

- Used by the smaller product cards below the large cards on All Solutions.
- Landscape **16:10**, matching the current catalogue image slots.
- Deliver as **1280 × 800 WebP**, ideally below 130 KB.
- **Use the full image. Do not reserve an empty left third or any blank area for text.**
- Compose a balanced scene across the left, centre and right. Natural breathing room is fine; deliberately empty text zones are not.
- Product names and descriptions stay in HTML below the image, not inside the artwork.
- Explain the business purpose through varied real-world actions, people, places, tactile metaphors and relevant objects. A device is optional, not the default hero. Do not repeat laptop-on-desk compositions across a batch. Each image must work at thumbnail size.
- Prefer clear, naturally lit scenes with a restrained two-to-four-colour palette. General does not mean lower visual quality.
- No large marketing text, logos, watermarks, pricing or CTA graphics. Tiny interface microtype is acceptable.
- Keep important subjects inside a safe crop. Do not stretch an image to change its aspect ratio.

### General prompt template

> Create one standalone photorealistic catalogue image for [PRODUCT], which helps users [PURPOSE]. Landscape 16:10. This is a GENERAL product image: fill the whole frame with one balanced, purposeful scene across left, centre and right. Do not reserve an empty left third, dark text zone or typography area. Show [REAL-WORLD ACTION, PEOPLE OR TACTILE VISUAL METAPHOR] with [SUPPORTING CONTEXT]. Choose a distinct composition for this product rather than defaulting to a laptop on a desk. Include a screen only when it helps explain the purpose. Make the software's purpose instantly clear at small thumbnail size. Use believable interface structure, realistic device geometry, authentic materials, polished natural lighting and a cohesive [PALETTE] palette. No floating abstract panels, headlines, logos, watermarks, prices or CTA graphics. Only small unobtrusive interface microtype is allowed. Keep key subjects comfortably inside the 16:10 crop.

## First general-product trial prompts

Type explicitly requested: **general**. No further type clarification needed for this trial.

### K-Foodies

Online food delivery portal. A warm restaurant pickup counter with an upright smartphone near centre-left showing a food ordering interface, appetizing Indian takeaway in kraft packaging at centre-right, an unbranded delivery bag behind, and a worker's hand sliding the order across the counter. Full-frame composition with no empty text zone. Rust orange, cream, charcoal and fresh green accents; warm daylight and realistic food photography. No faces needed. No brand names, marketing copy, logos or watermarks.

### K-Bazaar POS

Retail billing and inventory software. A modern grocery-shop checkout with a touchscreen POS centrally placed, credible checkout rows and stock information, receipt printer on the left, and a cashier scanning a plain packaged item beside groceries on the right. Stocked shelves give context across the background. Full-frame 16:10, no reserved text area. Cream, deep teal, charcoal and a restrained red accent; bright daylight and authentic retail materials. No branded packaging, headlines, logos or watermarks.

### K-Appointment

Appointment management software. A welcoming clinic reception with a laptop near centre-left showing a weekly scheduling calendar, a receptionist's hand at the trackpad, and a smartphone at the right foreground showing date/time selection. A clipboard and pen on the left, waiting seats and a plant behind. Balanced full-frame 16:10 with no empty text area. Pale blue, warm white, charcoal and sage; clean natural lighting. No patients or faces needed. No floating holograms, headlines, logos or watermarks.

## Production and verification

1. Establish the product type and use the matching template.
2. Generate a separate image for each requested product, not a collage.
3. Review the image before wiring it into the website.
4. Convert to WebP at the type's aspect ratio; use a crop rather than distortion.
5. Save premium artwork under `public/banners/` and reference it from `src/data/products.ts`.
6. Save general artwork under `public/banners/general/` and set the corresponding `image` path in `src/data/catalogue.ts`.
7. Check the actual card on mobile and desktop. Premium artwork must preserve HTML readability; general artwork must fill the image slot without an empty text zone.
8. Build the static export and check local image paths after integration.

### Trial status

Successfully generated the first three general-product images: K-Foodies, K-Bazaar POS and K-Appointment. Delivered as 1280 × 800 WebP in `public/banners/general/` and connected to their catalogue entries. Full-frame scenes, no reserved left text zone.

## General catalogue expansion: first batch

Ten additional general-product images were generated individually and added to the catalogue. All use the general prompt template above: full-frame 16:10 photographic scenes, no reserved text area, and no marketing headline. These scene instructions distinguish the products:

| Product | Scene instruction |
| --- | --- |
| K-Services | Service counter with laptop directory/request rows, confirmation phone and document folders. |
| Kart-Grocery | Grocery-ordering phone with fresh produce, shopping bags and delivery tote in a neighborhood grocer. |
| K-Restro | Restaurant station with table-plan POS, receipt printer, menus and plated food. |
| Kart Supermarket | Online grocery storefront laptop with groceries, shopping bags and supermarket aisle. |
| Kart Multivendor | Marketplace laptop with several seller storefronts, varied merchandise and shipping parcels. |
| Kart Multistore | Retail desk with multistore management laptop, storefront tablet, apparel and stock shelves. |
| K-Shop | Ecommerce storefront laptop, green customer-chat phone, merchandise and parcels. |
| K-Store | Shopping storefront laptop, product-detail phone, fabrics, home goods and dispatch box. |
| K-Job | Recruitment desk with job-search laptop, application-confirmation phone and resumes. |
| K-Klassified | Classified-listing laptop and phone, resale merchandise and a bicycle in context. |

Delivery: 1280 × 800 WebP, each below 130 KB. The original three general images and all premium banners remain unchanged.

Batch-one milestone: 13 of 35 complete. The next batch below supersedes this count.


## General catalogue expansion: second batch

User correction: imagery must be more creative and purpose-specific, not the same laptop scene repeated. Generated the following ten individually with varied camera angles, actions and settings. All use the full-frame general template, realistic commercial photography and restrained palettes, with no reserved copy area.

| Product | Saved scene direction |
| --- | --- |
| K-Community | Residents collaborate over a physical neighborhood map, local profile cards and business markers; a member-directory phone is secondary. |
| K-Samachar | Field reporter with a plain microphone, news-article phone and street reporting context. |
| Kupon | Shopper presents a coupon/QR phone to a scanner at checkout, with bags, fabric and tactile vouchers. |
| K-Affiliation | Physical people-shaped tokens joined by golden threads, referral reward coin stacks and a hand adding a connection. No screen. |
| K-Academics | Teacher checks tablet attendance in a busy school corridor, with registers and arriving students. |
| K-Hostel | Hostel arrival through a room doorway, key handover, luggage and a subtle booking-confirmation phone. |
| Doctor Plus | Doctor-discovery phone in a person's hand, with an actual welcoming clinic entrance behind. |
| Prabal Hospital ERP | Nurse and administrator coordinate hospital operations beside a mobile touchscreen cart in a ward corridor. |
| HRM | Employee taps an ID at the office entrance while coworkers arrive and an HR coordinator carries a roster tablet. |
| K-Billing | Overhead tactile arrangement of invoices, organized paid documents and a handheld invoice-list phone. |

All ten are 1280 × 800 WebP, individually optimized below 130 KB. Completed artwork from earlier batches and premium banners is unchanged.

Current progress: **23 of 35 complete; 12 remaining.** Continue next with **K-Saksham** and subsequent catalogue entries without an image. Maintain varied, business-specific compositions.

## General catalogue expansion: third batch

Ten more images generated individually using distinct, purpose-led full-frame scenes:

| Product | Saved scene direction |
| --- | --- |
| K-Saksham | Overhead ledger reconciliation with invoices, calculator and a secondary finance-summary phone. |
| K-Franchisee | Tactile miniature storefronts placed on a city map to visualize coordinated branch expansion. |
| K-Matrimonial | Respectful adult family introduction over tea in an Indian courtyard, with a subtle matching-profile phone. |
| K-Matchmaker | Adult first-date conversation at an urban cafe, with a secondary profile-matching phone. |
| K-Loan | Shop owner and finance officer review repayment planning together in a real business setting. |
| K-Laundry | Freshly folded clothes packed for pickup, with service progress and scheduling on a customer's phone. |
| K-Cab | Curbside car pickup with traveler, suitcase and a subtle booking-map phone. |
| Car Wash | Active wash-bay scene with water, foam and a secondary booking-selection phone. |
| Car Wash Multivendor | Car owner compares providers on a phone, with several distinct local car-care bays behind. |
| K-Parking | Geometric parking entrance, available bays, barrier and a secondary space-confirmation phone. |

All ten delivered as 1280 × 800 WebP, below 130 KB each. Existing artwork is unchanged.

Current progress: **33 of 35 general-product images complete; two remaining: K-Realestate and K-Cinema.** This supersedes earlier batch counts.
