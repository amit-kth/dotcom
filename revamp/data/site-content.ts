/* ============================================================================
   site-content.ts  —  the facts carried over from the old site, unchanged
   ----------------------------------------------------------------------------
   Everything in this file is taken from the existing kriscent.com. It is NOT
   dummy data. Approved by Kapil sir: counters, testimonials, client logos and
   company details stay exactly as they are in the old site — this rebuild only
   restructures the presentation.

   If a value here ever disagrees with the old site, the old site is right.
   ========================================================================== */

/* ---------------------------------------------------------------------------
   COUNTERS  —  approved, do not change the numbers.
   Labels were the only thing awkward on the old site ("Trusted By 1,245+
   Clients" repeated the figure); the wording below was approved.
--------------------------------------------------------------------------- */
export type Counter = {
  value: string;
  /** shown after the number, e.g. "+" */
  suffix?: string;
  label: string;
};

export const counters: Counter[] = [
  { value: "1,549", suffix: "+", label: "Projects Delivered" },
  { value: "13", label: "Years of Experience" },
  { value: "1,245", suffix: "+", label: "Clients Worldwide" },
];

/* ---------------------------------------------------------------------------
   CMMI BADGE  —  carried over from the old site's counter section.
--------------------------------------------------------------------------- */
export const cmmi = {
  image: "dummy/logo.webp",
  alt: "CMMI Level 3",
  label: "CMMI Level 3",
} as const;

/* ---------------------------------------------------------------------------
   TESTIMONIALS  —  the three real ones from the old site, verbatim.
   Images are dummy placeholders until logos are copied over.
--------------------------------------------------------------------------- */
export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  logo: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "radhika-aggarwal",
    quote:
      "Kriscent Techno Hub Pvt. Ltd. has completed the project goals, leaving the client pleased with the collaboration. The team manifests their professionalism through timely deliverables and excellent problem-solving. They're also proactive in coming up with unique ideas to improve the client's vision.",
    name: "Radhika Aggarwal",
    role: "Founder, Ishvaa Life Spirituality",
    logo: "dummy/client-logo.webp",
  },
  {
    id: "vikash-kunta",
    quote:
      "TODO(quote): the old site's markup for this testimonial needs to be copied verbatim before launch.",
    name: "Vikash Kunta",
    role: "Aiims subsidiary",
    logo: "dummy/client-logo.webp",
  },
  {
    id: "sudha-agarwal",
    quote:
      "TODO(quote): the old site's markup for this testimonial needs to be copied verbatim before launch.",
    name: "Sudha Agarwal",
    role: "Sudha Hospital",
    logo: "dummy/client-logo.webp",
  },
];

/* ---------------------------------------------------------------------------
   CLIENT LOGOS  —  the old site ships 40+. Listed here so the section can be
   built; all point at one dummy image until the real files are copied across.
   TODO(logos): replace `src` with real paths, then delete the dummy entries.
--------------------------------------------------------------------------- */
export type ClientLogo = { name: string; src: string };

export const clientLogos: ClientLogo[] = [
  "Aiims", "Amicis", "Apth", "AQ", "Astronri", "Avit", "Bang", "Bhartiya",
  "Black Buddha", "Bottega Mqueen", "Cad Cam Expert", "Chabi", "Dealmart",
  "Elkithron", "Ferranza", "Flixmates", "GMV", "Gudz", "Gurukul Eng", "HR",
  "IIS", "Inbrix", "Ishvaa", "Kamal", "Kashyap Export", "Kobai", "Kota Fresh",
  "Luriox", "Mapl", "MSF", "Mudra", "Mudra Care", "Orafresh", "Paras", "PMFME",
  "RGCSM", "Shivshakti", "Shree Falodi", "Shreeshreemsf", "Shrinath Travels",
  "Sqube", "SSI", "Sudha Hospital", "The Fitness Mart", "Vjoy",
].map((name) => ({ name, src: "dummy/client-logo.webp" }));
