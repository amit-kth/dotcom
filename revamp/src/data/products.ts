import { type CategoryId } from "./categories";

/* ============================================================================
   products.ts  —  the solutions
   ----------------------------------------------------------------------------
   HOW TO ADD A SOLUTION
   1. Add an entry to `products`.
   2. Drop its banner into public/banners/ (or ImageKit at the same path) and
      put that filename in `banner`.

   BANNER SPEC
   -----------
   One aspect ratio for every banner: **16:7** (e.g. 1680 x 735 px, WebP).
   The left ~55% must be visually calm — text sits there. The artwork belongs on
   the right. A neutral dark left half is ideal; the component adds a token
   gradient scrim on top anyway.

   While real banners are missing, every product points at
   `banners/placeholder.webp`. Replacing it is a file swap: no code change.
   Search for TODO(banner) to find the ones still waiting.

   LANGUAGE
   --------
   "solutions", never "systems" or "products" in visible copy. A solution has:
   a name, one line of problem, three outcomes of five words or fewer.
   Prices are never shown, and demo credentials never exist.
   ========================================================================== */

/** Every solution is delivered in this many days. */
export const DELIVERY_DAYS = 15;

/** The single banner ratio, so every export matches. */
export const BANNER_RATIO = "16 / 7";

export type AccentHue = "blue" | "violet" | "coral" | "teal";

export type Product = {
  id: string;
  name: string;
  /** one line: the problem it removes, not a feature list */
  problem: string;
  categories: CategoryId[];
  /** exactly three, each five words or fewer */
  outcomes: [string, string, string];
  /** drives the hairline and hover spotlight on the banner */
  accentHue: AccentHue;
  /** path under ASSETS_BASE_URL */
  banner: string;
  /** shown in the default list; `featured` is neutral naming */
  featured: boolean;
  /** display order */
  order: number;
};

/* TODO(banner): one placeholder for all of them until the real files arrive.
   The AI Calling Agents banner supplied by the client is used for that one. */
const PLACEHOLDER_BANNER = "banners/placeholder.webp";

export const products: Product[] = [
  {
    id: "ai-calling-agents",
    name: "AI Calling Agents",
    problem: "Your team loses hours to calls that never needed a person.",
    categories: ["fintech"],
    outcomes: [
      "Routine calls handled end to end",
      "Warm leads passed to your team",
      "Every call recorded and searchable",
    ],
    accentHue: "blue",
    // The one real banner we have. TODO(banner): confirm 16:7 export exists.
    banner: "https://ik.imagekit.io/qk2ww553c/tempAssets/revamp/hero-poster.webp",
    featured: true,
    order: 1,
  },
  {
    id: "kastrofy",
    name: "Kastrofy",
    problem: "Consultations and content live in five different tools.",
    categories: ["astrology"],
    outcomes: [
      "Bookings and payments in one place",
      "Repeat clients handled automatically",
      "Content published from one dashboard",
    ],
    accentHue: "violet",
    banner: PLACEHOLDER_BANNER,
    featured: true,
    order: 2,
  },
  {
    id: "kexam",
    name: "K-Exam",
    problem: "Exams take a week of marking after the paper ends.",
    categories: ["edtech"],
    outcomes: [
      "Build tests from a question bank",
      "Results without manual marking",
      "Students see their own scorecard",
    ],
    accentHue: "coral",
    banner: PLACEHOLDER_BANNER,
    featured: true,
    order: 3,
  },
  {
    id: "whatsapp-crm",
    name: "WhatsApp CRM",
    problem: "Enquiries scattered across personal phones get forgotten.",
    categories: ["manufacturing"],
    outcomes: [
      "One shared inbox for enquiries",
      "Follow-ups assigned to a person",
      "Broadcasts sent from the CRM",
    ],
    accentHue: "teal",
    banner: PLACEHOLDER_BANNER,
    featured: true,
    order: 4,
  },
  {
    id: "lms",
    name: "LMS",
    problem: "Training progress lives in spreadsheets nobody updates.",
    categories: ["edtech"],
    outcomes: [
      "Courses and batches in one place",
      "Trainers see learner progress",
      "Certificates issued on completion",
    ],
    accentHue: "violet",
    banner: PLACEHOLDER_BANNER,
    /* the homepage shows one solution per industry; the second EdTech
       solution lives on /solutions so the stack does not repeat itself */
    featured: false,
    order: 5,
  },
  {
    id: "doctorplus",
    name: "DoctorPlus",
    problem: "Clinic appointments and records sit in separate registers.",
    categories: ["healthcare"],
    outcomes: [
      "Appointments booked online",
      "Patient history in one record",
      "Billing at the front desk",
    ],
    accentHue: "coral",
    banner: PLACEHOLDER_BANNER,
    featured: true,
    order: 6,
  },
  {
    id: "kparking",
    name: "K-Parking",
    problem: "Parking collections are counted by hand at the gate.",
    categories: ["logistics"],
    outcomes: [
      "Slots and passes managed live",
      "Daily collection visible",
      "Monthly passes renewed online",
    ],
    accentHue: "teal",
    banner: PLACEHOLDER_BANNER,
    featured: true,
    order: 7,
  },
  {
    id: "krealestate",
    name: "KRealEstate",
    problem: "Listings, site visits and follow-ups all run on a phone.",
    categories: ["real-estate"],
    outcomes: [
      "Listings published from one dashboard",
      "Site visits scheduled by your team",
      "Every enquiry assigned to an agent",
    ],
    accentHue: "violet",
    banner: PLACEHOLDER_BANNER,
    featured: true,
    order: 8,
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
