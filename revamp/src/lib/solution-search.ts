import { products } from "@/data/products";
import { catalogue } from "@/data/catalogue";
import { categoryLabel } from "@/data/categories";

export const suggestedSearches = [
  "School management",
  "WhatsApp CRM",
  "Online exams",
  "Billing",
];
export const normalizeSearch = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");

// A tiny, pre-normalized index. No network, server state or fuzzy-search library.
export const searchIndex = [
  ...products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.problem,
    keywords: product.keywords,
    group: product.categories.map(categoryLabel).join(", "),
    href: `/solutions/#solution-${product.id}`,
  })),
  ...catalogue.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.line,
    keywords: product.keywords,
    group: product.group,
    href: product.href ?? `/solutions/#catalogue-${product.id}`,
  })),
].map((item) => ({
  ...item,
  normalizedName: normalizeSearch(item.name),
  normalizedKeywords: item.keywords.map(normalizeSearch),
  text: normalizeSearch(
    [item.name, item.description, item.group, ...item.keywords].join(" "),
  ),
}));

export function searchSolutions(query: string) {
  const phrase = normalizeSearch(query).slice(0, 160);
  if (!phrase) return searchIndex.slice(0, 5);
  const terms = phrase.split(" ");
  return searchIndex
    .filter((item) => terms.every((term) => item.text.includes(term)))
    .map((item) => ({
      item,
      score:
        (item.normalizedName === phrase
          ? 100
          : item.normalizedName.startsWith(phrase)
            ? 80
            : item.normalizedName.includes(phrase)
              ? 60
              : 0) +
        (item.normalizedKeywords.includes(phrase)
          ? 40
          : item.normalizedKeywords.some((keyword) => keyword.includes(phrase))
            ? 20
            : 0) +
        terms.filter((term) => item.normalizedName.includes(term)).length * 5,
    }))
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);
}
