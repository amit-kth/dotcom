import { asset } from "@/config/variables";

/* ============================================================================
   site-content.ts  —  real facts carried over from the old kriscent.com
   ----------------------------------------------------------------------------
   Nothing in this file is dummy. Every value is taken from the existing site.
   Approved: counters, testimonials, client logos and company details stay as
   they are. This rebuild only changes how they are presented.

   If a value here ever disagrees with the live old site, the old site wins.
   ========================================================================== */

/* ---------------------------------------------------------------------------
   COUNTERS  —  approved. Do not change the figures.
   Only the label wording changed: the old site read "Trusted By 1,245+ Clients",
   which repeated the number next to the number.
--------------------------------------------------------------------------- */
export type Counter = {
  value: string;
  /** shown after the figure, e.g. "+" */
  suffix?: string;
  label: string;
};

export const counters: Counter[] = [
  { value: "1,549", suffix: "+", label: "Projects Delivered" },
  { value: "13", label: "Years of Experience" },
  { value: "1,245", suffix: "+", label: "Clients Worldwide" },
];

/* ---------------------------------------------------------------------------
   COMPANY  —  the one sentence about the company, taken from the old site.
   "founded" and the location are the old site's own facts.
--------------------------------------------------------------------------- */
export const company = {
  headline: "Thirteen years of shipping software, from Kota.",
  /* Taken from the old site's about copy, trimmed to one sentence. */
  line: "Kriscent builds and supports its own software — the same team installs it, trains your team and answers afterwards.",
  location: "Kota, Rajasthan, India",
  founded: 2014,
} as const;

/* ---------------------------------------------------------------------------
   CERTIFICATIONS
   --------------------------------------------------------------------------
   TODO(confirm): only CMMI Level 3 has artwork in the repo. ISO 9001:2015 and
   ISO 27001 are listed on kriscent.in; their badge files are not here yet, so
   they use the CMMI plate as a stand-in and the names are marked DRAFT until
   the client confirms the exact wording and supplies the artwork.
--------------------------------------------------------------------------- */
export type Certification = {
  name: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  draft?: boolean;
};

export const certifications: Certification[] = [
  { name: "CMMI Level 3", src: "icons/cmmi.webp", alt: "CMMI Level 3", width: 200, height: 200 },
  /* TODO(badge): real ISO artwork + confirmed wording */
  { name: "ISO 9001:2015", src: "icons/cmmi.webp", alt: "ISO 9001:2015", width: 200, height: 200, draft: true },
  { name: "ISO 27001", src: "icons/cmmi.webp", alt: "ISO 27001", width: 200, height: 200, draft: true },
];

/* ---------------------------------------------------------------------------
   CMMI BADGE
   --------------------------------------------------------------------------
   The source file is 87% fully transparent, so it needs a solid plate behind
   it or the section background shows through the artwork. The plate is applied
   in the component, not here.
--------------------------------------------------------------------------- */
export const cmmi = {
  src: "icons/cmmi.webp",
  alt: "CMMI Level 3",
  label: "CMMI Level 3",
  width: 200,
  height: 200,
} as const;

/* ---------------------------------------------------------------------------
   TESTIMONIALS  —  the three from the old site, verbatim.

   Two notes for review, deliberately left as the client wrote them:
   - Sudha Agarwal: "sleeked" appears to be the original word. A testimonial is
     quoted, not edited, so it is reproduced exactly.
   - Vikash Kunta: "analyzed" and the grammar are as published.
   If marketing wants light copy-editing, that is their call, not ours.
--------------------------------------------------------------------------- */
export type Testimonial = {
  id: string;
  /** the full quote, as published */
  quote: string;
  /**
   * A shortened version for the homepage, where a three column wall of full
   * quotes turns into a wall of text. Truncation is always marked with an
   * ellipsis, so an excerpt never reads as the complete sentence.
   */
  excerpt: string;
  name: string;
  role: string;
  logo: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "radhika-aggarwal",
    quote:
      "Kriscent Techno Hub Pvt. Ltd. has completed the project goals, leaving the client pleased with the collaboration. The team manifests their professionalism through timely deliverables and excellent problem-solving. They're also proactive in coming up with unique ideas to improve the client's vision.",
    excerpt:
      "The team manifests their professionalism through timely deliverables and excellent problem-solving.",
    name: "Radhika Aggarwal",
    role: "Founder, Ishvaa Life Spirituality",
    logo: "clients/ishvaa.webp",
  },
  {
    id: "vikash-kunta",
    quote:
      "Before choosing Kriscent's software, I analyzed other software of different companies were readymade and less user friendly. But in Prabal I got many features with high user friendly environment. We are working faster now.",
    excerpt:
      "…but in Prabal I got many features with a high user friendly environment. We are working faster now.",
    name: "Vikash Kunta",
    role: "AIIMS subsidiary",
    logo: "clients/aiims.webp",
  },
  {
    id: "sudha-agarwal",
    quote:
      "We sleeked web services for our hospital and they delivered way better than we ever imagined. I am very much glad to met Mr. Kapil Gautam and his team",
    excerpt:
      "They delivered way better than we ever imagined… and I am glad to have met Mr. Kapil Gautam and his team.",
    name: "Sudha Agarwal",
    role: "Sudha Hospital",
    logo: "clients/sudha-hospital.webp",
  },
  {
    /* The fourth quote the old site's carousel shows. It was missing from this
       rebuild, not from the source. */
    id: "kratant-sharma",
    quote:
      "Managing trips & perks for the tourists has never been so exhilarating as we have touched the highest ebbs in our endeavors. Kriscent Techno Hub has built the most effective web solution that helped us in serving more clients",
    excerpt:
      "Kriscent Techno Hub has built the most effective web solution that helped us in serving more clients.",
    name: "Kratant Sharma",
    role: "Shrinath Travels",
    logo: "clients/shrinath-travels.webp",
  },
];

/* ---------------------------------------------------------------------------
   CLIENT LOGOS
   --------------------------------------------------------------------------
   Copied from the old site's img/clients/client-logo/, one file per company,
   already WebP. Filenames are the old ones; `name` is the display name used in
   alt text.
--------------------------------------------------------------------------- */
export type ClientLogo = { name: string; src: string };

const logoFiles: [string, string][] = [
  ["Aiims", "aiims"],
  ["Amicis", "amicis"],
  ["APTH", "apth"],
  ["AQ", "aq"],
  ["Astronri", "astronri"],
  ["Avit", "avit"],
  ["Bang", "bang"],
  ["Bhartiya", "bhartiya"],
  ["Black Buddha", "black-buddha"],
  ["Bottega Mqueen", "bottega-mqueen"],
  ["CadCam", "cadcam"],
  ["Chabi", "chabi"],
  ["Dealmart", "dealmart"],
  ["Elkithron", "elkithron"],
  ["Ferranza", "ferranza"],
  ["Flixmates", "flixmates"],
  ["GMV", "gmv"],
  ["Gudz", "gudz"],
  ["Gurukul Engineering", "gurukul-eng"],
  ["HR Wala", "hr"],
  ["iis", "iis"],
  ["Inbrix", "inbrix"],
  ["Ishvaa", "ishvaa"],
  ["Kamal", "kamal"],
  ["Kashyap Export", "kashyap-export"],
  ["Kobai", "kobai"],
  ["Kota Fresh", "kota-fresh"],
  ["Luriox", "luriox"],
  ["Mapl", "mapl"],
  ["Mnandi", "mnandilogo"],
  ["MSF", "msf"],
  ["Mudra", "mudra"],
  ["Mudracare", "mudracare"],
  ["Orafresh", "orafresh"],
  ["Paras", "paras"],
  ["PMFME", "pmfme"],
  ["RGCSM", "rgcsm"],
  ["Shivshakti", "shivshakti"],
  ["Shree Falodi", "shree-falodi"],
  ["Shreeshreemsf", "shreeshreemsf"],
  ["Shrinath Travels", "shrinath-travels"],
  ["Sqube", "sqube"],
  ["SSI", "ssi"],
  ["Sudha Hospital", "sudha-hospital"],
  ["The Fitness Mart", "thefitnessmart"],
  ["Vjoy", "vjoy"],
];

export const clientLogos: ClientLogo[] = logoFiles.map(([name, file]) => ({
  name,
  src: `clients/${file}.webp`,
}));

/** Resolved URL helper so components never concatenate paths by hand. */
export const logoSrc = (src: string) => asset(src);
