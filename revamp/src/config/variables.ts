/* ============================================================================
   variables.ts  —  the one file to edit when something global changes
   ----------------------------------------------------------------------------
   Everything here is a single source of truth. Nothing in components/, app/ or
   data/ may hard-code a URL, an image path, a phone number or a page title.
   ========================================================================== */

/* ---------------------------------------------------------------------------
   1. ASSETS
   ---------------------------------------------------------------------------
   Every image in the project is referenced as:

       `${ASSETS_BASE_URL}/${imagePath}`

   where `imagePath` is the value stored in the data files, e.g.
   "products/kastrofy.webp"  (no leading slash, no domain).

   DEV      : ""            -> resolves to /products/kastrofy.webp from public/
   PROD     : the ImageKit (or CDN) base URL, set once, nothing else changes.

   TODO(ImageKit): replace the production value with our real base URL before
   the first deploy. Keep the trailing slash OFF.
--------------------------------------------------------------------------- */
const isProd = process.env.NODE_ENV === "production";

export const ASSETS_BASE_URL = isProd
  ? "" // TODO(ImageKit): e.g. "https://ik.imagekit.io/kriscent/tr:w-auto"
  : "";

/** Office photography shared with kriscent.in; other site assets stay local. */
export const OFFICE_ASSETS_BASE_URL = "https://ik.imagekit.io/qk2ww553c";

/**
 * Build a full image URL.
 * - A full http(s) URL is returned untouched, so an ImageKit or CDN banner can
 *   be pasted straight into a data file.
 * - Anything else is resolved against ASSETS_BASE_URL.
 */
export const asset = (path: string): string => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${ASSETS_BASE_URL}/${path.replace(/^\/+/, "")}`;
};

/* ---------------------------------------------------------------------------
   2. API
   ---------------------------------------------------------------------------
   The contact form calls exactly one function, which reads this. The Laravel
   endpoint is not built yet; the placeholder is deliberately invalid so a
   misconfigured deploy fails loudly rather than silently posting nowhere.
--------------------------------------------------------------------------- */

/** The contact page form posts here. Same TODO rule: while this starts with
    "TODO" the form simulates success so the states can be reviewed, and a real
    URL switches it on with no component change. */
export const CONTACT_ENDPOINT = "TODO_LARAVEL_CONTACT_ENDPOINT"; // e.g. "https://api.kriscent.com/contact"

/* ---------------------------------------------------------------------------
   3. SITE
--------------------------------------------------------------------------- */
export const site = {
  name: "Kriscent",
  legalName: "Kriscent Techno Hub Pvt Ltd",
  url: "https://www.kriscent.com",
  locale: "en_IN",
  founded: 2014,
  /** Google Tag Manager - carried over from the old site. */
  gtmId: "GTM-TDFV5SJ4",
  /** Tawk.to property - carried over from the old site. */
  tawkProperty: "5b6d9233afc2c34e96e77468",
  tawkWidget: "default",
} as const;

/* ---------------------------------------------------------------------------
   4. CONTACT
   ---------------------------------------------------------------------------
   Carried over from the current site. TODO(confirm): display address is not
   present in the old markup, only the phone numbers and inboxes are.
--------------------------------------------------------------------------- */
/* The five published lines on one exchange. The footer prints them as a single
   link — "+91-7240560001/2/3/4/5" — and dials the first one, so the list stays
   the only place a number is written down. */
const PHONES: string[] = [
  "+91-7240560001",
  "+91-7240560002",
  "+91-7240560003",
  "+91-7240560004",
  "+91-7240560005",
];

export const PHONE_LINE = PHONES.map((phone, index) =>
  index === 0 ? phone : phone.slice(-1),
).join("/");

export const PHONE_HREF = `tel:${PHONES[0].replace(/[^\d+]/g, "")}`;

export const contact = {
  emails: {
    general: "info@kriscent.in",
    sales: "sales@kriscent.in",
  },
  phones: PHONES,
  /** "+91-7240560001/2/3/4/5" — one line, one link. */
  phoneLine: PHONE_LINE,
  /** The first line is the one that rings, so it is the one that is dialled. */
  phoneHref: PHONE_HREF,
  /** The WhatsApp line is a separate number on purpose: it is the chat
      initiator only, never printed as a call number. */
  whatsappNumber: "+918947027625",
  /** wa.me link, carried over from the old site's floating button. */
  whatsapp: "https://wa.me/918947027625",
  /** Our own contact page. */
  contactPath: "/contact",
  aboutPage: "https://kriscent.in/about",
  clientsPage: "https://kriscent.in/clients",
  /* The profiles the old site links to in its own footer. Nothing invented:
     these five are the ones that appear in index.php. */
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/kriscenttechnohub/" },
    { label: "Instagram", href: "https://www.instagram.com/kriscenttechnohub/" },
    { label: "Facebook", href: "https://www.facebook.com/KriscentServices" },
    { label: "X", href: "https://twitter.com/Kriscent_KTH" },
    { label: "YouTube", href: "https://www.youtube.com/@kriscenttech" },
  ],
  /** The old site never publishes a street address, only the city the company
      was founded in. A fabricated address is worse than none. */
  locality: "Kota, Rajasthan, India",
} as const;

/* ---------------------------------------------------------------------------
   5. PAGE METADATA
   ---------------------------------------------------------------------------
   Every page's <title>, description, canonical path and social card live here.
   Adding a page means adding an entry to this object, then wrapping the page
   component in <Seo page="...">. See lib/seo.tsx for how it is applied.

   `path` is the route with a leading slash and no trailing slash; the Seo
   component combines it with site.url to build the canonical and og:url.
   `noindex` should stay false unless a page genuinely must not be indexed.
--------------------------------------------------------------------------- */
export type PageKey = "home" | "solutions" | "contact";

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
};

export const pages: Record<PageKey, PageMeta> = {
  home: {
    path: "/",
    title:
      "Ready-Made Software Solutions, Live in 15 Days | Kriscent",
    description:
      "Ready-made solutions for schools, clinics, finance, logistics and more. Pick your industry, see what is already built, and go live in 15 days instead of six months.",
    ogImage: "logo/og.png",
  },
  solutions: {
    path: "/solutions",
    title: "All Ready-Made Solutions | Kriscent",
    description:
      "The full catalogue of Kriscent ready-made solutions, themes and additional products. Every system can be live in 15 days.",
    ogImage: "logo/og.png",
  },
  contact: {
    path: "/contact",
    title: "Contact Kriscent | Ready-Made Software, Live in 15 Days",
    description:
      "Tell us what you run and we will show you the closest thing we have already built. Enquiries are answered by the team that builds and installs the software.",
    ogImage: "logo/og.png",
  },
};
