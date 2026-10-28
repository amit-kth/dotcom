import { type CategoryId } from "./categories";

/* ============================================================================
   products.ts  —  the catalogue
   ----------------------------------------------------------------------------
   Copy rule for this file: nothing here is longer than one line on a card.
   A card carries a name, one sentence and two outcomes. Detail belongs on the
   product page, not on the homepage. If a description needs a comma to survive,
   it is too long.

   STATUS: copy is placeholder where marked, real where the product page exists.
   Add a product by adding an entry. `categories` takes ids from categories.ts.
   `availableNow` decides which group a product sits in on /solutions; it is
   never shown as a badge, because software is not stock in a shop.
   `links[].url` may be empty: components then render no link at all rather than
   pointing somewhere that does not exist.
   ========================================================================== */

/** Every product is delivered in this many days. A price is never shown. */
export const DELIVERY_DAYS = 15;

export type ProductLink = { title: string; url: string };

export type Product = {
  id: string;
  name: string;
  /** one sentence, ideally under 60 characters */
  description: string;
  categories: CategoryId[];
  /** true = in the "available to install" group on /solutions */
  availableNow: boolean;
  /** path relative to the assets base, or a full URL */
  banner: string;
  /** exactly three, each under 40 characters */
  outcomes: [string, string, string];
  links: ProductLink[];
  demoCtaLabel: string;
};

const BANNER = "dummy/banner.webp";

export const products: Product[] = [
  /* ---------------------------------------------------------------- fintech */
  {
    id: "ai-calling-agents",
    name: "AI Calling Agents",
    description: "Voice agents that make the calls your team should not.",
    categories: ["fintech"],
    availableNow: true,
    // Real banner, supplied by Kapil sir.
    banner: "https://ik.imagekit.io/qk2ww553c/tempAssets/revamp/hero-poster.webp",
    outcomes: [
      "Routine calls handled end to end",
      "Warm leads passed to your team",
      "Every call recorded and searchable",
    ],
    // TODO(link): this product site is not published yet.
    links: [{ title: "Ask about this build", url: "" }],
    demoCtaLabel: "Ask about this build",
  },

  /* -------------------------------------------------------------- astrology */
  {
    id: "kastrofy",
    name: "Kastrofy",
    description: "Consultations, subscriptions and content in one platform.",
    categories: ["astrology"],
    availableNow: true,
    banner: BANNER,
    outcomes: [
      "Bookings and payments in one place",
      "Repeat clients handled automatically",
      "Content published from one dashboard",
    ],
    links: [{ title: "Product page", url: "https://kriscent.in/product/kastrofy/" }],
    demoCtaLabel: "Request a demo",
  },

  /* ----------------------------------------------------------------- edtech */
  {
    id: "kexam",
    name: "K-Exam",
    description: "Online exams, question banks and instant results.",
    categories: ["edtech"],
    availableNow: true,
    banner: BANNER,
    outcomes: [
      "Build tests from a question bank",
      "Results without manual marking",
      "Students see their own scorecard",
    ],
    links: [
      { title: "Product page", url: "https://www.kriscent.in/product/kexam/" },
    ],
    demoCtaLabel: "Request a demo",
  },

  /* -------------------------------------------------------------- whatsapp */
  {
    id: "whatsapp-crm",
    name: "WhatsApp CRM",
    description: "Every enquiry, follow-up and broadcast inside WhatsApp.",
    categories: ["manufacturing"],
    availableNow: true,
    banner: BANNER,
    outcomes: [
      "One shared inbox for enquiries",
      "Follow-ups assigned to a person",
      "Broadcasts sent from the CRM",
    ],
    links: [{ title: "Ask about this build", url: "" }],
    demoCtaLabel: "Request a demo",
  },

  /* ------------------------------------------------------------------- lms */
  {
    id: "lms",
    name: "LMS",
    description: "Courses, batches and progress for training teams.",
    categories: ["edtech"],
    availableNow: true,
    banner: BANNER,
    outcomes: [
      "Courses and batches in one place",
      "Trainers see learner progress",
      "Certificates issued on completion",
    ],
    links: [{ title: "Ask about this build", url: "" }],
    demoCtaLabel: "Request a demo",
  },

  /* ------------------------------------------------- built for a single client */
  {
    id: "doctorplus",
    name: "DoctorPlus",
    description: "Clinic appointments, patient records and billing.",
    categories: ["healthcare"],
    availableNow: false,
    banner: BANNER,
    outcomes: [
      "Appointments booked online",
      "Patient history in one record",
      "Billing at the front desk",
    ],
    links: [
      {
        title: "Product page",
        url: "https://www.kriscent.com/product/doctorplus/",
      },
    ],
    demoCtaLabel: "Request a demo",
  },
  {
    id: "kparking",
    name: "K-Parking",
    description: "Slots, passes and collections for parking operators.",
    categories: ["logistics"],
    availableNow: false,
    banner: BANNER,
    outcomes: [
      "Slots and passes managed live",
      "Daily collection visible",
      "Monthly passes renewed online",
    ],
    links: [
      {
        title: "Product page",
        url: "https://www.kriscent.com/product/kparking/",
      },
    ],
    demoCtaLabel: "Request a demo",
  },
  {
    id: "krealestate",
    name: "K-RealEstate",
    description: "Listings, enquiries and site visits for property teams.",
    categories: ["real-estate"],
    availableNow: false,
    banner: BANNER,
    outcomes: [
      "Listings published from one place",
      "Enquiries tracked to a visit",
      "Follow-ups never left open",
    ],
    links: [
      {
        title: "Product page",
        url: "https://kriscent.com/product/krealestate/",
      },
    ],
    demoCtaLabel: "Request a demo",
  },
];

/* ---------------------------------------------------------------- helpers */

/** The five we can install without a scoping call, in the order shown. */
export const availableProducts = products.filter((p) => p.availableNow);

export const productsInCategory = (id: CategoryId) =>
  products.filter((p) => p.categories.includes(id));
