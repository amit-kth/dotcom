import { CATEGORY_IDS, type CategoryId } from "./categories";

/* ============================================================================
   products.ts  —  the product catalogue
   ----------------------------------------------------------------------------
   STATUS: STRUCTURE ONLY.
   Every image is a dummy from /public/dummy. Every link is a placeholder.
   Descriptions, problems and outcomes are PLACEHOLDER copy. They read as real
   copy on purpose (no "DUMMY" prefix in the UI) but none of them is approved
   text: replace before launch.
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
  /**
   * Absolute URL. Empty string means the site is not live yet: components skip
   * the link entirely rather than rendering a dead one. Never invent a URL.
   */
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
      "Voice agents that place and handle outbound calls for banking and collections teams.",
    categories: ["fintech"],
    readyToSell: true,
    // Real banner supplied by Kapil sir. Full URL, used as-is by asset().
    banner:
      "https://ik.imagekit.io/qk2ww553c/tempAssets/revamp/hero-poster.webp",
    logo: "dummy/logo.webp",
    problem:
      "Collections and sales teams spend the day on repeat outbound calls instead of the conversations that need a human.",
    outcomes: [
      "Routine calls run on their own",
      "Qualified conversations reach the team",
      "Every call logged and reviewable",
    ],
    links: [
      // TODO(link): the AI calling agent project site is not published yet.
      { title: "Visit project site", url: "" },
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
      "Astrology platform for consultations, content and subscriptions.",
    categories: ["astrology"],
    readyToSell: true,
    banner: DUMMY_BANNER,
    logo: "dummy/logo.webp",
    problem:
      "Consultations, payments and follow-ups are spread across chats and spreadsheets.",
    outcomes: [
      "Consultations booked and paid in one place",
      "Repeat clients handled without manual follow-up",
      "Content published from the same dashboard",
    ],
    links: [
      // TODO(link): confirm real product URL.
      // Real page on the existing site (index.php -> product/kastrofy).
      { title: "Product page", url: "https://kriscent.in/product/kastrofy/" },
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
      "Online examination, question bank and result publishing.",
    categories: ["edtech"],
    readyToSell: true,
    banner: DUMMY_BANNER,
    logo: "dummy/logo.webp",
    problem:
      "Conducting tests and publishing results takes days of manual work per batch.",
    outcomes: [
      "Tests created from a shared question bank",
      "Results generated without manual marking",
      "Students see their own scorecard",
    ],
    links: [
      // TODO(link): confirm real product URL.
      { title: "Product page", url: "https://www.kriscent.in/product/kexam/" },
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
      "Enquiries, follow-ups and broadcasts handled inside WhatsApp.",
    categories: ["manufacturing"],
    readyToSell: true,
    banner: DUMMY_BANNER,
    logo: "dummy/logo.webp",
    problem:
      "Sales conversations live on individual phones, so nothing is tracked and leads go cold.",
    outcomes: [
      "Every enquiry lands in one shared inbox",
      "Follow-ups assigned to a named person",
      "Broadcasts sent without leaving the CRM",
    ],
    links: [
      // TODO(link): confirm real product URL.
      { title: "Visit product site", url: "" },
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
      "Learning management for courses, batches and progress tracking.",
    categories: ["edtech"],
    readyToSell: true,
    banner: DUMMY_BANNER,
    logo: "dummy/logo.webp",
    problem:
      "Course material, attendance and progress sit in files that nobody can report on.",
    outcomes: [
      "Courses and batches organised in one place",
      "Learner progress visible to the trainer",
      "Certificates issued on completion",
    ],
    links: [
      // TODO(link): confirm real product URL.
      { title: "Visit product site", url: "" },
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
    description: "clinic and appointment management.",
    categories: ["healthcare"],
    readyToSell: false,
    banner: DUMMY_BANNER,
    problem: "TODO",
    outcomes: ["TODO", "TODO", "TODO"],
    links: [
      { title: "Product page", url: "https://www.kriscent.com/product/doctorplus/" },
    ],
    demoCtaLabel: "Request a demo",
  },

  /* Logistics */
  {
    id: "kparking",
    name: "Kparking",
    description: "parking management.",
    categories: ["logistics"],
    readyToSell: false,
    banner: DUMMY_BANNER,
    problem: "TODO",
    outcomes: ["TODO", "TODO", "TODO"],
    links: [
      { title: "Product page", url: "https://www.kriscent.com/product/kparking/" },
    ],
    demoCtaLabel: "Request a demo",
  },

  /* Real Estate */
  {
    id: "krealestate",
    name: "Krealestate",
    description: "property listings and enquiry management.",
    categories: ["real-estate"],
    readyToSell: false,
    banner: DUMMY_BANNER,
    problem: "TODO",
    outcomes: ["TODO", "TODO", "TODO"],
    links: [
      { title: "Product page", url: "https://kriscent.com/product/krealestate/" },
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
