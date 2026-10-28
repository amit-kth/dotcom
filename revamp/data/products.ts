import { CATEGORY_IDS, type CategoryId } from "./categories";

/* ============================================================================
   products.ts  —  the product catalogue
   ----------------------------------------------------------------------------
   STATUS: STRUCTURE ONLY.
   Every image is a dummy from /public/dummy. Every link is a placeholder.
   Descriptions, problems and outcomes are DUMMY copy — replace before launch.
   Nothing here should be treated as a factual claim yet.

   HOW TO EDIT
   -----------
   - Add an entry to `products`. `id` must be unique and URL-safe.
   - `categories` takes one or more ids from data/categories.ts. A product can
     sit in several categories and then appears under each of them.
   - `readyToSell: true` marks the small set shown by default on the homepage.
     The programme's ready-now set is: AI Calling Agents, Kastrofy (astrology),
     K-Exam (exam software), WhatsApp CRM, LMS.
   - `banner` / `logo` are either
       (a) a path relative to ASSETS_BASE_URL with no leading slash, or
       (b) a full https:// URL, used as-is.
     `asset()` in config/variables.ts handles both.
   - `links` is where the product actually lives. Each project has its own
     website, so the primary link sends the visitor there.
   - No prices, ever. Delivery is one constant, below.
   ========================================================================== */

/** Every product is delivered in this many days. Never show a price. */
export const DELIVERY_DAYS = 15;

/** Shared dummy image used by every product until real banners arrive. */
const DUMMY_BANNER = "dummy/banner.webp";

export type ProductLink = {
  /** Label shown on the link, e.g. "Visit product site". */
  title: string;
  /** Absolute URL. */
  url: string;
};

export type Product = {
  /** unique, url-safe */
  id: string;
  /** display name */
  name: string;
  /** one line under the name */
  description: string;
  /** at least one, from data/categories.ts */
  categories: CategoryId[];
  /** true = part of the "ready now" set shown by default */
  readyToSell: boolean;
  /** path relative to ASSETS_BASE_URL, or a full URL */
  banner: string;
  /** optional product logo, same rules */
  logo?: string;
  /** the problem this solves, one line */
  problem: string;
  /** exactly three */
  outcomes: [string, string, string];
  /** where the product lives. First entry is the primary destination. */
  links: ProductLink[];
  /** modal trigger label. Demos are not public: never show IDs or passwords. */
  demoCtaLabel: string;
};

export const products: Product[] = [
  /* ==========================================================================
     1. AI CALLING AGENTS  —  flagship, shown as proof of capability
     ======================================================================== */
  {
    id: "ai-calling-agents",
    name: "AI Calling Agents",
    description:
      "DUMMY — Voice agents that place and handle outbound calls for banking and collections teams.",
    categories: ["fintech"],
    readyToSell: true,
    // Real banner supplied by Kapil sir. Full URL, used as-is by asset().
    banner:
      "https://ik.imagekit.io/qk2ww553c/tempAssets/revamp/hero-poster.webp",
    logo: "dummy/logo.webp",
    problem:
      "DUMMY — Collections and sales teams spend the day on repeat outbound calls instead of the conversations that need a human.",
    outcomes: [
      "DUMMY — Routine calls run on their own",
      "DUMMY — Qualified conversations reach the team",
      "DUMMY — Every call logged and reviewable",
    ],
    links: [
      // TODO(link): replace with the AI calling agents project site.
      { title: "Visit project site", url: "https://example.com/ai-calling-agents" },
    ],
    demoCtaLabel: "Request a demo",
  },

  /* ==========================================================================
     2. ASTROLOGY
     ======================================================================== */
  {
    id: "kastrofy",
    name: "Kastrofy",
    description:
      "DUMMY — Astrology platform for consultations, content and subscriptions.",
    categories: ["astrology"],
    readyToSell: true,
    banner: DUMMY_BANNER,
    logo: "dummy/logo.webp",
    problem:
      "DUMMY — Consultations, payments and follow-ups are spread across chats and spreadsheets.",
    outcomes: [
      "DUMMY — Consultations booked and paid in one place",
      "DUMMY — Repeat clients handled without manual follow-up",
      "DUMMY — Content published from the same dashboard",
    ],
    links: [
      // TODO(link): confirm real product URL.
      { title: "Visit product site", url: "https://example.com/kastrofy" },
    ],
    demoCtaLabel: "Request a demo",
  },

  /* ==========================================================================
     3. EXAM SOFTWARE
     ======================================================================== */
  {
    id: "kexam",
    name: "K-Exam",
    description:
      "DUMMY — Online examination, question bank and result publishing.",
    categories: ["edtech"],
    readyToSell: true,
    banner: DUMMY_BANNER,
    logo: "dummy/logo.webp",
    problem:
      "DUMMY — Conducting tests and publishing results takes days of manual work per batch.",
    outcomes: [
      "DUMMY — Tests created from a shared question bank",
      "DUMMY — Results generated without manual marking",
      "DUMMY — Students see their own scorecard",
    ],
    links: [
      // TODO(link): confirm real product URL.
      { title: "Visit product site", url: "https://example.com/kexam" },
    ],
    demoCtaLabel: "Request a demo",
  },

  /* ==========================================================================
     4. WHATSAPP CRM
     ======================================================================== */
  {
    id: "whatsapp-crm",
    name: "WhatsApp CRM",
    description:
      "DUMMY — Enquiries, follow-ups and broadcasts handled inside WhatsApp.",
    categories: ["manufacturing"],
    readyToSell: true,
    banner: DUMMY_BANNER,
    logo: "dummy/logo.webp",
    problem:
      "DUMMY — Sales conversations live on individual phones, so nothing is tracked and leads go cold.",
    outcomes: [
      "DUMMY — Every enquiry lands in one shared inbox",
      "DUMMY — Follow-ups assigned to a named person",
      "DUMMY — Broadcasts sent without leaving the CRM",
    ],
    links: [
      // TODO(link): confirm real product URL.
      { title: "Visit product site", url: "https://example.com/whatsapp-crm" },
    ],
    demoCtaLabel: "Request a demo",
  },

  /* ==========================================================================
     5. LMS
     ======================================================================== */
  {
    id: "lms",
    name: "LMS",
    description:
      "DUMMY — Learning management for courses, batches and progress tracking.",
    categories: ["edtech"],
    readyToSell: true,
    banner: DUMMY_BANNER,
    logo: "dummy/logo.webp",
    problem:
      "DUMMY — Course material, attendance and progress sit in files that nobody can report on.",
    outcomes: [
      "DUMMY — Courses and batches organised in one place",
      "DUMMY — Learner progress visible to the trainer",
      "DUMMY — Certificates issued on completion",
    ],
    links: [
      // TODO(link): confirm real product URL.
      { title: "Visit product site", url: "https://example.com/lms" },
    ],
    demoCtaLabel: "Request a demo",
  },

  /* ==========================================================================
     NOT READY YET  —  kept so no category chip is empty.
     These come from the old site's product links. Category is a guess and the
     copy is a placeholder; both need confirming before launch.
     ======================================================================== */

  /* Healthcare */
  {
    id: "doctorplus",
    name: "Doctorplus",
    description: "TODO(confirm) — clinic and appointment management.",
    categories: ["healthcare"],
    readyToSell: false,
    banner: DUMMY_BANNER,
    problem: "TODO",
    outcomes: ["TODO", "TODO", "TODO"],
    links: [
      { title: "Visit product site", url: "https://www.kriscent.com/product/doctorplus/" },
    ],
    demoCtaLabel: "Request a demo",
  },

  /* Logistics */
  {
    id: "kparking",
    name: "Kparking",
    description: "TODO(confirm) — parking management.",
    categories: ["logistics"],
    readyToSell: false,
    banner: DUMMY_BANNER,
    problem: "TODO",
    outcomes: ["TODO", "TODO", "TODO"],
    links: [
      { title: "Visit product site", url: "https://www.kriscent.com/product/kparking/" },
    ],
    demoCtaLabel: "Request a demo",
  },

  /* Real Estate */
  {
    id: "krealestate",
    name: "Krealestate",
    description: "TODO(confirm) — property listings and enquiry management.",
    categories: ["real-estate"],
    readyToSell: false,
    banner: DUMMY_BANNER,
    problem: "TODO",
    outcomes: ["TODO", "TODO", "TODO"],
    links: [
      { title: "Visit product site", url: "https://kriscent.com/product/krealestate/" },
    ],
    demoCtaLabel: "Request a demo",
  },
];

/* ---------------------------------------------------------------------------
   DERIVED HELPERS  —  components import these, never re-filter by hand
--------------------------------------------------------------------------- */

/** The default homepage set: everything sellable today. */
export const readyToSellProducts = products.filter((p) => p.readyToSell);

/** Products for one category, ready-now first. */
export const productsByCategory = (category: CategoryId): Product[] =>
  products
    .filter((p) => p.categories.includes(category))
    .sort((a, b) => Number(b.readyToSell) - Number(a.readyToSell));

/** How many products each category has. Drives the chip counts. */
export const categoryCounts = (): Record<CategoryId, number> => {
  const out = {} as Record<CategoryId, number>;
  for (const id of CATEGORY_IDS) {
    out[id] = products.filter((p) => p.categories.includes(id)).length;
  }
  return out;
};
