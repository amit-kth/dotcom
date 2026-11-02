import { type CategoryId } from "./categories";

/** Every solution is delivered in this many days. */
export const DELIVERY_DAYS = 15;

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
  /** All categories appear on the banner and participate in filtering. */
  categories: CategoryId[];
  /** exactly three, each five words or fewer */
  outcomes: [string, string, string];
  accentHue: AccentHue;
  /** Local path from public/. */
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
    id: "ai-employees",
    keywords: [
      "AI calls",
      "voice agent",
      "calling automation",
      "customer support",
      "sales calls",
      "loan recovery",
      "fintech",
      "calling agents"
    ],
    name: "AI Employees",
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
    banner: "/banners/ai-calling-agents.webp",
    /* the client's own site for this product */
    href: "https://agents-website.kriscenttechnohub.com/",
    featured: true,
    order: 1,
  },
  {
    id: "sales-automation-crm",
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
    name: "Sales Automation CRM",
    logo: "https://www.kriscent.in/product/ksmart/assets/img/software/ksmart_logo.png",
    problem: "Leads live across six tools and three phones.",
    categories: ["manufacturing", "logistics", "real-estate"],
    outcomes: [
      "One workspace for every lead",
      "Quotations and invoices together",
      "WhatsApp automation built in",
    ],
    accentHue: "teal",
    banner: "/banners/k-smart.webp",
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
    logo: "https://www.kriscent.in/product/kexam/img/logo-2.png",
    // Old site: "Exams that stay secure online".
    problem: "Exams take a week of marking and a folder of paperwork.",
    categories: ["edtech"],
    outcomes: [
      "Build tests from a question bank",
      "Anti-cheating checks in the test",
      "Results published without marking",
    ],
    accentHue: "coral",
    banner: "/banners/k-exam.webp",
    href: "https://www.kriscent.in/product/kexam/",
    featured: true,
    order: 3,
  },
  {
    id: "k-edusity",
    keywords: [
      "school ERP",
      "school management",
      "student management",
      "student attendance",
      "attendance",
      "school fees",
      "admission management",
      "LMS",
      "K-LMS",
      "online learning",
      "learning management",
      "education",
      "e-learning",
    ],
    name: "K-Edusity",
    logo: "https://www.kriscent.com/product/kedusity/public/uploads/dark_logo/darklogo-1781938584.png",
    /* Unified school management and learning platform. */
    problem: "Managing school operations and digital learning across disconnected systems.",
    categories: ["edtech"],
    outcomes: [
      "Admissions, student records and fees",
      "Attendance, timetables, transport and exams",
      "Online courses, learning and assessments",
    ],
    accentHue: "blue",
    banner: "/banners/k-edusity.webp",
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
    banner: "/banners/kastrofy.webp",
    href: "https://kriscent.in/product/kastrofy/",
    featured: true,
    order: 5,
  },
];

/* ---------------------------------------------------------------- helpers */

export const featuredProducts = products
  .filter((product) => product.featured)
  .sort((a, b) => a.order - b.order);
