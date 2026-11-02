import { Assetsbaseurl as ASSETS_BASE_URL } from "@/config/variables";

// Company figures, testimonials and client logos carried over from the old site.

export type Counter = {
  value: string;
  suffix?: string;
  label: string;
};

export const counters: Counter[] = [
  { value: "1,549", suffix: "+", label: "Projects Delivered" },
  { value: "13", suffix: "+", label: "Years of Experience" },
  { value: "1,245", suffix: "+", label: "Clients Worldwide" },
];

export type Testimonial = {
  id: string;
  quote: string;
  excerpt: string;
  name: string;
  role: string;
  logo: string;
  source?: string;
  sourceLink?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "radhika-aggarwal",
    quote: "I'm impressed by their support and hard work.",
    excerpt: "I'm impressed by their support and hard work.",
    name: "Radhika Aggarwal",
    role: "Founder, Ishvaa Life Spirituality",
    logo: `${ASSETS_BASE_URL}/tempAssets/clientsImages/ishvaa.png`,
    source: "Clutch",
    sourceLink: "https://clutch.co/go-to-review/34244e69-969c-4a5a-867f-0b1ee010e638/346445",
  },
  {
    id: "noora-fateh",
    quote: "I was impressed by their conduct and collaborations during the entire project.",
    excerpt: "I was impressed by their conduct and collaborations during the entire project.",
    name: "Noora Fateh",
    role: "Founder, Flixmates.com",
    logo: `${ASSETS_BASE_URL}/tempAssets/clientsImages/flixmates.png`,
    source: "Clutch",
    sourceLink: "https://clutch.co/go-to-review/34244e69-969c-4a5a-867f-0b1ee010e638/400553",
  },
  {
    id: "khetpal-singh",
    quote: "What truly stands out is the way their team works.",
    excerpt: "What truly stands out is the way their team works.",
    name: "Mr. Khetpal Singh",
    role: "Founder, HR Walla & SMIB",
    logo: `${ASSETS_BASE_URL}/tempAssets/clientsImages/hr.png`,
    source: "Clutch",
    sourceLink: "https://clutch.co/go-to-review/34244e69-969c-4a5a-867f-0b1ee010e638/404675",
  },
  {
    id: "vikash-kunta",
    quote:
      "Before choosing Kriscent's software, I analyzed other software of different companies were readymade and less user friendly. But in Prabal I got many features with high user friendly environment. We are working faster now.",
    excerpt:
      "…but in Prabal I got many features with a high user friendly environment. We are working faster now.",
    name: "Vikash Kunta",
    role: "AIIMS subsidiary",
    logo: "/clients/aiims.webp",
  },
  {
    id: "kratant-sharma",
    quote:
      "Managing trips & perks for the tourists has never been so exhilarating as we have touched the highest ebbs in our endeavors. Kriscent Techno Hub has built the most effective web solution that helped us in serving more clients",
    excerpt:
      "Kriscent Techno Hub has built the most effective web solution that helped us in serving more clients.",
    name: "Kratant Sharma",
    role: "Shrinath Travels",
    logo: "/clients/shrinath-travels.webp",
  },
];

// Supplied platform scores, maintained manually rather than fetched live.
export const platformRatings = [
  {
    title: "Google",
    href: "https://g.co/kgs/rFi9C6c",
    platformLogo: `${ASSETS_BASE_URL}/tempAssets/Google_Icons-09-512%202.png?updatedAt=1724757228086`,
    starColor: "#F6AD01",
    starCount: 4.2,
  },
  {
    title: "Ambition Box",
    href: "https://www.ambitionbox.com/overview/kriscent-techno-hub-overview",
    platformLogo: `${ASSETS_BASE_URL}/tempAssets/ab-brand%202.png?updatedAt=1724757228073`,
    starColor: "#5670FB",
    starCount: 4.6,
  },
  {
    title: "Clutch",
    href: "https://clutch.co/profile/kriscent-techno-hub#highlights",
    platformLogo: `${ASSETS_BASE_URL}/tempAssets/clutch.png?updatedAt=1724492726508`,
    starColor: "#fff",
    starCount: 5,
  },
];

export const videoTestimonials = [
  {
    name: "Mnandi Retail Solutions",
    role: "Marketing Manager",
    videoLink: "https://www.youtube.com/embed/mS6w6YDqrrM",
    thumbnail: `${ASSETS_BASE_URL}/tempAssets/clientsImages/t1.webp`,
  },
  {
    name: "Andreas Kounnaris",
    role: "CEO (Elkithron)",
    videoLink: "https://www.youtube.com/embed/LA6eE_KCKO0",
    thumbnail: `${ASSETS_BASE_URL}/tempAssets/clientsImages/t2.webp`,
  },
  {
    name: "Mr. Mudit Agarwal",
    role: "CEO (Agarwal Stones)",
    videoLink: "https://www.youtube.com/embed/1kITFCOS8LU",
    thumbnail: `${ASSETS_BASE_URL}/tempAssets/clientsImages/t3.webp`,
  },
];

export type ClientLogo = { name: string; src: string };

export const clientLogos: ClientLogo[] = [
  { name: "Aiims", src: "/clients/aiims.webp" },
  { name: "Amicis", src: "/clients/amicis.webp" },
  { name: "APTH", src: "/clients/apth.webp" },
  { name: "AQ", src: "/clients/aq.webp" },
  { name: "Astronri", src: "/clients/astronri.webp" },
  { name: "Avit", src: "/clients/avit.webp" },
  { name: "Bang", src: "/clients/bang.webp" },
  { name: "Bhartiya", src: "/clients/bhartiya.webp" },
  { name: "Black Buddha", src: "/clients/black-buddha.webp" },
  { name: "Bottega Mqueen", src: "/clients/bottega-mqueen.webp" },
  { name: "CadCam", src: "/clients/cadcam.webp" },
  { name: "Chabi", src: "/clients/chabi.webp" },
  { name: "Dealmart", src: "/clients/dealmart.webp" },
  { name: "Elkithron", src: "/clients/elkithron.webp" },
  { name: "Ferranza", src: "/clients/ferranza.webp" },
  { name: "Flixmates", src: "/clients/flixmates.webp" },
  { name: "GMV", src: "/clients/gmv.webp" },
  { name: "Gudz", src: "/clients/gudz.webp" },
  { name: "Gurukul Engineering", src: "/clients/gurukul-eng.webp" },
  { name: "HR Wala", src: "/clients/hr.webp" },
  { name: "iis", src: "/clients/iis.webp" },
  { name: "Inbrix", src: "/clients/inbrix.webp" },
  { name: "Ishvaa", src: "/clients/ishvaa.webp" },
  { name: "Kamal", src: "/clients/kamal.webp" },
  { name: "Kashyap Export", src: "/clients/kashyap-export.webp" },
  { name: "Kobai", src: "/clients/kobai.webp" },
  { name: "Kota Fresh", src: "/clients/kota-fresh.webp" },
  { name: "Luriox", src: "/clients/luriox.webp" },
  { name: "Mapl", src: "/clients/mapl.webp" },
  { name: "Mnandi", src: "/clients/mnandilogo.webp" },
  { name: "MSF", src: "/clients/msf.webp" },
  { name: "Mudra", src: "/clients/mudra.webp" },
  { name: "Mudracare", src: "/clients/mudracare.webp" },
  { name: "Orafresh", src: "/clients/orafresh.webp" },
  { name: "Paras", src: "/clients/paras.webp" },
  { name: "PMFME", src: "/clients/pmfme.webp" },
  { name: "RGCSM", src: "/clients/rgcsm.webp" },
  { name: "Shivshakti", src: "/clients/shivshakti.webp" },
  { name: "Shree Falodi", src: "/clients/shree-falodi.webp" },
  { name: "Shreeshreemsf", src: "/clients/shreeshreemsf.webp" },
  { name: "Shrinath Travels", src: "/clients/shrinath-travels.webp" },
  { name: "Sqube", src: "/clients/sqube.webp" },
  { name: "SSI", src: "/clients/ssi.webp" },
  { name: "Sudha Hospital", src: "/clients/sudha-hospital.webp" },
  { name: "The Fitness Mart", src: "/clients/thefitnessmart.webp" },
  { name: "Vjoy", src: "/clients/vjoy.webp" },
];
