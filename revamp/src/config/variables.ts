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
   The enquiry form calls exactly one function, which reads this. The Laravel
   endpoint is not built yet; the placeholder is deliberately invalid so a
   misconfigured deploy fails loudly rather than silently posting nowhere.
--------------------------------------------------------------------------- */
export const API_ENDPOINT = "TODO_LARAVEL_ENDPOINT"; // e.g. "https://api.kriscent.com/enquiry"

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
export const contact = {
  emails: {
    general: "info@kriscent.in",
    sales: "sales@kriscent.in",
  },
  phones: ["+91-7240560001", "+91-8947027625"],
  addressLines: ["TODO(address): street", "TODO(address): city, state, PIN"],
} as const;

/* ---------------------------------------------------------------------------
   5. PAGE METADATA
   ---------------------------------------------------------------------------
   Every page's <title>, description, canonical path and social card live here.
   Adding a page means adding an entry to this object, then wrapping the page
   component in <Seo page="...">. See components/seo.tsx for how it is applied.

   `path` is the route with a leading slash and no trailing slash; the Seo
   component combines it with site.url to build the canonical and og:url.
   `noindex` should stay false unless a page genuinely must not be indexed.
--------------------------------------------------------------------------- */
export type PageKey = "home" | "solutions";

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
    ogImage: "dummy/og.webp",
  },
  solutions: {
    path: "/solutions",
    title: "All Ready-Made Solutions | Kriscent",
    description:
      "The full catalogue of Kriscent ready-made solutions, themes and additional products. Every system can be live in 15 days.",
    ogImage: "dummy/og.webp",
  },
};
