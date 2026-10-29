/* ============================================================================
   categories.ts  —  the seven fixed industries
   ----------------------------------------------------------------------------
   These are the options in the homepage hero. The list is fixed by the brief;
   adding a category means adding an entry here and nothing else, because every
   product references a category by `id`, not by name.

   `id` is used in code and (later, phase 2) as a route segment: /fintech etc.
   `label` is what the visitor sees.
   `blurb` is one line shown under the label. DRAFT - written from the label,
   awaiting approval.
   ========================================================================== */

export const CATEGORY_IDS = [
  "fintech",
  "logistics",
  "manufacturing",
  "healthcare",
  "astrology",
  "edtech",
  "real-estate",
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export type Category = {
  id: CategoryId;
  label: string;
  /** PLACEHOLDER: one line, to be approved before launch. */
  blurb: string;
};

export const categories: Category[] = [
  {
    id: "fintech",
    label: "Fintech",
    blurb: "Lending, payments and collections.",
  },
  {
    id: "logistics",
    label: "Logistics",
    blurb: "Fleets, parking and field service.",
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    blurb: "Production, stock and billing.",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    blurb: "Clinics, appointments and records.",
  },
  {
    id: "astrology",
    label: "Astrology",
    blurb: "Consultation and content platforms.",
  },
  {
    id: "edtech",
    label: "EdTech",
    blurb: "Schools, colleges and online exams.",
  },
  {
    id: "real-estate",
    label: "Real Estate",
    blurb: "Listings, leads and site visits.",
  },
];

/** Lookup helper so components never loop to find a label. */
export const categoryLabel = (id: CategoryId): string =>
  categories.find((c) => c.id === id)?.label ?? id;

/* The hue each category owns, as a Tailwind arbitrary property (`[--chip:224]`)
   rather than a colour: the hue is written once and read by the icon, the dot
   and the glow through `var(--chip)`. Written as literal strings, not
   generated, because Tailwind reads class names from source text. */
export const categoryHue: Record<CategoryId, string> = {
  fintech: "[--chip:224]",
  logistics: "[--chip:190]",
  manufacturing: "[--chip:264]",
  healthcare: "[--chip:4]",
  astrology: "[--chip:282]",
  edtech: "[--chip:34]",
  "real-estate": "[--chip:150]",
};
