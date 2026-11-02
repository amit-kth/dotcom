// Shared site settings, contact details and metadata.

/** Shared ImageKit origin for office and certification images. Local images use /paths. */
export const Assetsbaseurl = "https://ik.imagekit.io/qk2ww553c";

/* ---------------------------------------------------------------------------
   2. API
   ---------------------------------------------------------------------------
   The contact form calls exactly one function, which reads this. The Laravel
   endpoint is not built yet; the placeholder is deliberately invalid so a
   misconfigured deploy fails loudly rather than silently posting nowhere.
--------------------------------------------------------------------------- */

/** Configure and test a real backend before accepting enquiries. */
export const CONTACT_ENDPOINT = "TODO_LARAVEL_CONTACT_ENDPOINT"; // e.g. "https://api.kriscent.com/contact"

/* ---------------------------------------------------------------------------
   3. SITE
--------------------------------------------------------------------------- */
export const site = {
  name: "Kriscent",
  legalName: "Kriscent Techno Hub Pvt Ltd",
  url: "https://www.kriscent.com",
  locale: "en_IN",
  ogImage: "/images/og-kriscent.jpg",
  ogImageAlt: "Kriscent ready-made software solutions for business, education and automation",
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
   link, "+91-7240560001/2/3/4/5", and dials the first one, so the list stays
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
  /** "+91-7240560001/2/3/4/5", one line, one link. */
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
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/kriscenttechnohub/",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/kriscenttechnohub/",
    },
    { label: "Facebook", href: "https://www.facebook.com/KriscentServices" },
    { label: "X", href: "https://twitter.com/Kriscent_KTH" },
    { label: "YouTube", href: "https://www.youtube.com/@kriscenttech" },
  ],
  /** The old site never publishes a street address, only the city the company
      was founded in. A fabricated address is worse than none. */
  locality: "Kota, Rajasthan, India",
} as const;

// Page SEO values. Pass the relevant object directly to <Seo />.
export const metadata = {
  home: {
    path: "/",
    title: "Kriscent: Top IT Solutions & Software Development Company",
    description:
      "Kriscent offers innovative IT solutions and software development services since 2014. Specializing in CRM, ERP, and custom software. Trusted by global clients.",
  },
  solutions: {
    path: "/solutions",
    title: "All Ready-Made Solutions | Kriscent",
    description:
      "The full catalogue of Kriscent ready-made solutions, themes and additional products. Every system can be live in 15 days.",
  },
  contact: {
    path: "/contact",
    title: "Contact Kriscent | Ready-Made Software, Live in 15 Days",
    description:
      "Tell us what you run and we will show you the closest thing we have already built. Enquiries are answered by the team that builds and installs the software.",
  },
};

// Verified against the legacy index.php. These tags do not change visible copy.
export const legacySeo = {
  author: "Er.Kapil Gautam",
  keywords: "IT solutions, software development, Ready to use products, CRM software, ERP systems, mobile app development, custom software development, tech consulting, digital transformation",
  ogTitle: "Kriscent - Leading Provider of IT Solutions & Custom Software Development",
  ogDescription: "Kriscent offers innovative IT solutions and custom software development services worldwide. Our ready-to-use products like CRM, ERP systems, and mobile apps help businesses grow faster and smarter.",
  ogUrl: "https://kriscent.com",
  twitterTitle: "Kriscent | Best in Software Development, Design & IT services",
  twitterDescription: "Kriscent Techno Hub Pvt. Ltd is the leading IT company. That provide software and web development services to Start-ups and small business owners.",
  twitterSite: "https://www.kriscent.com/",
};
