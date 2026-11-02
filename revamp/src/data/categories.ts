// One entry per industry: label and shared chip colour stay together.
export const categories = [
  { id: "fintech", label: "Fintech", color: "[--chip:var(--color-blue-300)]" },
  {
    id: "logistics",
    label: "Logistics",
    color: "[--chip:var(--color-cyan-300)]",
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    color: "[--chip:var(--color-violet-300)]",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    color: "[--chip:var(--color-red-300)]",
  },
  {
    id: "astrology",
    label: "Astrology",
    color: "[--chip:var(--color-fuchsia-300)]",
  },
  { id: "edtech", label: "EdTech", color: "[--chip:var(--color-amber-300)]" },
  {
    id: "real-estate",
    label: "Real Estate",
    color: "[--chip:var(--color-emerald-300)]",
  },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

// Product data stores IDs, so these consumers still need a label lookup.
export const categoryLabel = (id: CategoryId): string =>
  categories.find((category) => category.id === id)?.label ?? id;
