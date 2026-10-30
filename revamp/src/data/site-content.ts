// Company figures, testimonials and client logos carried over from the old site.

export type Counter = {
  value: string;
  suffix?: string;
  label: string;
};

export const counters: Counter[] = [
  { value: "1,549", suffix: "+", label: "Projects Delivered" },
  { value: "13", label: "Years of Experience" },
  { value: "1,245", suffix: "+", label: "Clients Worldwide" },
];

export type Testimonial = {
  id: string;
  quote: string;
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
    logo: "/clients/ishvaa.webp",
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
    id: "sudha-agarwal",
    quote:
      "We sleeked web services for our hospital and they delivered way better than we ever imagined. I am very much glad to met Mr. Kapil Gautam and his team",
    excerpt:
      "They delivered way better than we ever imagined… and I am glad to have met Mr. Kapil Gautam and his team.",
    name: "Sudha Agarwal",
    role: "Sudha Hospital",
    logo: "/clients/sudha-hospital.webp",
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
