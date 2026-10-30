import { type CategoryId } from "./categories";

/* ============================================================================
   products.ts ,  the five solutions we show
   ----------------------------------------------------------------------------
   This list is the client's: AI Calling Agents, WhatsApp CRM, K-Exam,
   K-Edusity (the school ERP, what used to be K-LMS and K-Edusity, merged:
   they were the same product) and Kastrofy. Nothing else is added here; the
   rest of the client's catalogue lives in catalogue.ts.

   BANNER SPEC
   -----------
   One aspect ratio for every banner: **16:7** (1680 x 735, WebP).
   Artwork on the right two thirds; the left third is kept calm because the
   copy sits there. Files live in public/banners/.

   IMAGES
   ------
   The six banners in public/banners are generated artwork in the same visual
   language as the AI Calling Agents reference: dark navy, electric-blue line
   art on the right, empty left. They are placeholders for art direction, not
   final brand assets, swap the file, keep the name, no code change.

   LANGUAGE
   --------
   "Solutions", never "products" or "systems" in visible copy. A solution has a
   name, one line of problem, and three outcomes of five words or fewer.
   Prices are never shown and demo credentials never exist.
   ========================================================================== */

/** Every solution is delivered in this many days. */
export const DELIVERY_DAYS = 15;

/** The single banner ratio, so every export matches. */
export const BANNER_RATIO = "16 / 7";

export type AccentHue = "blue" | "violet" | "coral" | "teal";

export type Product = {
  id: string;
  name: string;
  /** Search aliases, business needs and relevant terms. */
  keywords: string[];
  /** Product logo URL or local asset path; null reserves space until supplied. */
  logo: string | null;
  /** one line: the problem it removes, not a feature list */
  problem: string;
  /** the first entry is the label shown on the banner; all of them filter */
  categories: CategoryId[];
  /** exactly three, each five words or fewer */
  outcomes: [string, string, string];
  accentHue: AccentHue;
  /** path under ASSETS_BASE_URL */
  banner: string;
  /** the product's own page, taken from the old site, never invented.
      "Request a demo" always goes to /contact?solution=<id>. */
  href?: string;
  /** shown in the homepage list; false = only on /solutions */
  featured: boolean;
  order: number;
};

export const products: Product[] = [
  {
    id: "ai-calling-agents",
    keywords: [
      "AI calls",
      "voice agent",
      "calling automation",
      "customer support",
      "sales calls",
      "loan recovery",
      "fintech",
    ],
    name: "AI Calling Agents",
    logo: null,
    // The phrasing is the client's own reference banner: calls that did not
    // need a person.
    problem: "Your team loses hours to calls that never needed a person.",
    // TODO(confirm): the industry tags below decide which chip finds this
    // solution. The software itself is not industry-specific.
    categories: ["fintech", "healthcare", "real-estate", "logistics"],
    outcomes: [
      "Routine calls handled end to end",
      "Warm leads passed to your team",
      "Every call recorded and searchable",
    ],
    accentHue: "blue",
    banner: "banners/ai-calling-agents.webp",
    /* the client's own site for this product */
    href: "https://agents-website.kriscenttechnohub.com/",
    featured: true,
    order: 1,
  },
  {
    id: "whatsapp-crm",
    keywords: [
      "K-SMART",
      "ksmart",
      "lead management",
      "sales CRM",
      "customer relationship management",
      "WhatsApp automation",
      "quotations",
      "invoices",
    ],
    // K-SMART on the old site; "one CRM instead of six tools" is its own line.
    name: "WhatsApp CRM",
    logo: "https://www.kriscent.in/product/ksmart/assets/img/software/ksmart_logo.png",
    problem: "Leads live across six tools and three phones.",
    categories: ["manufacturing", "logistics", "real-estate"],
    outcomes: [
      "One workspace for every lead",
      "Quotations and invoices together",
      "WhatsApp automation built in",
    ],
    accentHue: "teal",
    banner: "banners/k-smart.webp",
    href: "https://www.kriscent.in/product/ksmart/",
    featured: true,
    order: 2,
  },
  {
    id: "k-exam",
    keywords: [
      "online exams",
      "exam software",
      "question bank",
      "online tests",
      "assessment",
      "anti cheating",
      "education",
    ],
    name: "K-Exam",
    logo: null,
    // Old site: "Exams that stay secure online".
    problem: "Exams take a week of marking and a folder of paperwork.",
    categories: ["edtech"],
    outcomes: [
      "Build tests from a question bank",
      "Anti-cheating checks in the test",
      "Results published without marking",
    ],
    accentHue: "coral",
    banner: "banners/k-exam.webp",
    href: "https://www.kriscent.in/product/kexam/",
    featured: true,
    order: 3,
  },
  {
    id: "k-edusity",
    keywords: [
      "school ERP",
      "school management",
      "student attendance",
      "attendence",
      "school fees",
      "LMS",
      "K-LMS",
      "learning management",
      "education",
    ],
    name: "K-Edusity",
    logo: null,
    /* School ERP. This is the merge of the old K-Edusity and K-LMS entries:
       admissions, fees, attendance, transport, exams and courses are one
       system, so they are one solution. */
    problem: "A school runs on registers, WhatsApp groups and memory.",
    categories: ["edtech", "manufacturing"],
    outcomes: [
      "Admissions, fees and attendance",
      "Timetables, transport and exams",
      "Courses, learners and certificates",
    ],
    accentHue: "blue",
    banner: "banners/k-edusity.webp",
    href: "https://www.kriscent.com/product/kedusity/",
    featured: true,
    order: 4,
  },
  {
    id: "kastrofy",
    keywords: [
      "astrology",
      "astrologer",
      "horoscope",
      "consultation",
      "kundli",
      "jyotish",
    ],
    name: "Kastrofy",
    logo: "https://kriscent.in/product/kastrofy/assets/images/logo_white.png",
    // Old site: "Connect with expert astrologers, live … shop curated
    // remedies, and take consultations without leaving the portal."
    problem: "Consultations, chats and store orders run in separate tools.",
    categories: ["astrology"],
    outcomes: [
      "Chat, call and live consultations",
      "Curated remedies in one store",
      "Repeat clients handled automatically",
    ],
    accentHue: "violet",
    banner: "banners/kastrofy.webp",
    href: "https://kriscent.in/product/kastrofy/",
    featured: true,
    order: 5,
  },
];

/* ---------------------------------------------------------------- helpers */

export const featuredProducts = products
  .filter((product) => product.featured)
  .sort((a, b) => a.order - b.order);

export const productsInCategory = (id: CategoryId) =>
  products
    .filter((product) => product.categories.includes(id))
    .sort((a, b) => a.order - b.order);

/** Never null: falls back to the whole list, which is the default view. */
export const productById = (id: string) => products.find((p) => p.id === id);
