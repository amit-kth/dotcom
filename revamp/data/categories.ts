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
  /** DRAFT: one line, approved before launch. */
  blurb: string;
};

export const categories: Category[] = [
  { id: "fintech", label: "Fintech", blurb: "DRAFT — lending, payments and collections." },
  { id: "logistics", label: "Logistics", blurb: "DRAFT — fleets, parking and field service." },
  { id: "manufacturing", label: "Manufacturing", blurb: "DRAFT — production, stock and billing." },
  { id: "healthcare", label: "Healthcare", blurb: "DRAFT — clinics, appointments and records." },
  { id: "astrology", label: "Astrology", blurb: "DRAFT — consultation and content platforms." },
  { id: "edtech", label: "EdTech", blurb: "DRAFT — schools, colleges and online exams." },
  { id: "real-estate", label: "Real Estate", blurb: "DRAFT — listings, leads and site visits." },
];

/** Lookup helper so components never loop to find a label. */
export const categoryLabel = (id: CategoryId): string =>
  categories.find((c) => c.id === id)?.label ?? id;
