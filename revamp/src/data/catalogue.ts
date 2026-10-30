export type CatalogueItem = {
  id: string;
  name: string;
  /** Search aliases and business needs, edited alongside the product. */
  keywords: string[];
  /** the old site's own one-line tagline */
  line: string;
  /** the old site's product URL; absent when the old site had no page */
  href?: string;
  /** Local path from public/ once artwork exists, or a complete image URL. */
  image?: string;
  /** which of our industries this belongs to, for grouping */
  group:
    | "Commerce"
    | "Education"
    | "Health"
    | "Operations"
    | "Portals"
    | "Lifestyle";
};

export const catalogue: CatalogueItem[] = [
  {
    id: "k-services",
    keywords: ["multi services", "service portal", "business services"],
    name: "K-Services",
    line: "Multi-services portal",
    group: "Portals",
    href: "https://kriscent.com/product/k-service/admin",
  },

  {
    id: "kart-grocery",
    keywords: ["grocery delivery", "vegetables", "food shopping"],
    name: "Kart-Grocery",
    line: "Fast delivery, fresh products",
    group: "Commerce",
  },
  {
    id: "k-foodies",
    keywords: ["food delivery", "restaurant orders", "online ordering"],
    name: "K-Foodies",
    line: "Online food delivery portal",
    group: "Commerce",
    href: "https://www.kriscent.com/product/kfoodies/",
  },
  {
    id: "k-restro",
    keywords: [
      "restaurant POS",
      "restaurant management",
      "table orders",
      "billing",
    ],
    name: "K-Restro",
    line: "Restaurant management with POS",
    group: "Commerce",
    href: "https://www.kriscent.com/product/krestro/",
  },
  {
    id: "k-bazaar-pos",
    keywords: ["point of sale", "POS", "inventory", "stock", "retail billing"],
    name: "K-Bazaar POS",
    line: "Billing and inventory management",
    group: "Commerce",
    href: "https://www.kriscent.in/product/kbazaar/",
  },
  {
    id: "kart-supermarket",
    keywords: ["supermarket", "grocery store", "online shopping"],
    name: "Kart Supermarket",
    line: "Online grocery store",
    group: "Commerce",
    href: "https://www.kriscent.com/product/kart-supermarket/",
  },
  {
    id: "kart-multivendor",
    keywords: ["marketplace", "multiple sellers", "ecommerce", "e commerce"],
    name: "Kart Multivendor",
    line: "Multivendor ecommerce portal",
    group: "Commerce",
    href: "https://www.kriscent.com/product/kart-multivendormarket/",
  },
  {
    id: "kart-multistore",
    keywords: ["multiple stores", "ecommerce", "retail"],
    name: "Kart Multistore",
    line: "Multistore ecommerce portal",
    group: "Commerce",
    href: "https://kriscent.com/product/kart-multistore",
  },
  {
    id: "k-shop",
    keywords: ["online shop", "ecommerce", "WhatsApp store", "CRM"],
    name: "K-Shop",
    line: "Ecommerce with WhatsApp CRM",
    group: "Commerce",
    href: "https://kshop.kriscent.com/",
  },
  {
    id: "k-store",
    keywords: ["online store", "ecommerce", "shopping cart"],
    name: "K-Store",
    line: "Online shopping portal",
    group: "Commerce",
    href: "https://www.kriscent.in/product/kstore/",
  },

  {
    id: "k-job",
    keywords: ["jobs", "recruitment", "hiring", "careers"],
    name: "K-Job",
    line: "Online job portal",
    group: "Portals",
    href: "https://www.kriscent.in/product/kjob/",
  },
  {
    id: "k-klassified",
    keywords: ["classifieds", "listings", "buy and sell"],
    name: "K-Klassified",
    line: "Online listing portal",
    group: "Portals",
    href: "https://www.kriscent.com/product/klassified/",
  },
  {
    id: "k-community",
    keywords: ["community directory", "members", "business directory"],
    name: "K-Community",
    line: "Community directory portal",
    group: "Portals",
    href: "https://kriscent.com/product/kcommunity",
  },
  {
    id: "k-samachar",
    keywords: ["news", "publishing", "articles"],
    name: "K-Samachar",
    line: "News portal",
    group: "Portals",
    href: "https://www.kriscent.com/product/ksamachar/",
  },
  {
    id: "kupon",
    keywords: ["coupons", "discounts", "offers", "deals"],
    name: "Kupon",
    line: "Coupon and deals management",
    group: "Portals",
    href: "https://kriscent.com/product/kupon/",
  },
  {
    id: "k-affiliation",
    keywords: ["affiliate", "referrals", "commissions"],
    name: "K-Affiliation",
    line: "Affiliation and referrals",
    group: "Portals",
    href: "https://kriscent.com/product/kaffiliate",
  },

  {
    id: "k-academics",
    keywords: [
      "school management",
      "college management",
      "education",
      "students",
    ],
    name: "K-Academics",
    line: "School and college management",
    group: "Education",
    href: "https://www.kriscent.in/product/kacademics/",
  },
  {
    id: "k-hostel",
    keywords: ["hostel", "accommodation", "room booking", "education"],
    name: "K-Hostel",
    line: "Hostel booking system",
    group: "Education",
    href: "https://kriscent.com/product/khostel/",
  },

  {
    id: "k-appointment",
    keywords: ["appointments", "scheduling", "booking", "healthcare"],
    name: "K-Appointment",
    line: "Appointment management",
    group: "Health",
    href: "https://www.kriscent.in/product/kappointment/",
  },
  {
    id: "doctor-plus",
    keywords: ["doctor", "clinic", "healthcare", "medical directory"],
    name: "Doctor Plus",
    line: "Doctor and clinic listing portal",
    group: "Health",
    href: "https://www.kriscent.com/product/doctorplus/",
  },
  {
    id: "prabal",
    keywords: ["hospital ERP", "hospital management", "healthcare", "patients"],
    name: "Prabal Hospital ERP",
    line: "Hospital management system",
    group: "Health",
  },

  {
    id: "hrm",
    keywords: ["human resources", "employee management", "staff", "HR"],
    name: "HRM",
    line: "HR management software",
    group: "Operations",
    href: "https://www.kriscent.in/product/hrm/",
  },
  {
    id: "k-billing",
    keywords: ["billing", "invoices", "payments"],
    name: "K-Billing",
    line: "Billing automation",
    group: "Operations",
    href: "https://billing.enterprisesshree.com/",
  },
  {
    id: "k-saksham",
    keywords: ["accounting", "billing", "accounts", "invoices"],
    name: "K-Saksham",
    line: "Accounting and billing",
    group: "Operations",
    href: "https://www.saksham.kriscent.com/",
  },
  {
    id: "k-franchisee",
    keywords: ["franchise", "franchise management", "branches"],
    name: "K-Franchisee",
    line: "Franchisee management system",
    group: "Operations",
    href: "https://www.kriscent.in/product/kfranchisee/",
  },

  {
    id: "k-matrimonial",
    keywords: ["matrimony", "marriage", "wedding", "matchmaking"],
    name: "K-Matrimonial",
    line: "Matrimonial portal",
    group: "Lifestyle",
    href: "https://www.kriscent.com/product/kmatrimonial/",
  },
  {
    id: "k-matchmaker",
    keywords: ["dating", "matchmaking", "relationships"],
    name: "K-Matchmaker",
    line: "Dating portal",
    group: "Lifestyle",
    href: "https://kriscent.com/product/kmatchmaker/",
  },
  {
    id: "k-loan",
    keywords: ["loans", "lending", "finance", "fintech"],
    name: "K-Loan",
    line: "Loan management system",
    group: "Lifestyle",
    href: "https://www.kriscent.com/product/kloan/",
  },
  {
    id: "k-laundry",
    keywords: ["laundry", "dry cleaning", "washing"],
    name: "K-Laundry",
    line: "Multi-store laundry portal",
    group: "Lifestyle",
    href: "https://www.kriscent.com/product/klaundry/",
  },
  {
    id: "k-cab",
    keywords: ["cab", "taxi", "ride booking", "transport", "logistics"],
    name: "K-Cab",
    line: "Cab booking portal",
    group: "Lifestyle",
  },
  {
    id: "car-wash",
    keywords: ["car cleaning", "car wash", "vehicle booking"],
    name: "Car Wash",
    line: "Car wash booking system",
    group: "Lifestyle",
    href: "https://www.kriscent.com/product/carwash/",
  },
  {
    id: "car-wash-multivendor",
    keywords: ["car wash", "multiple vendors", "car cleaning"],
    name: "Car Wash Multivendor",
    line: "Car wash multivendor software",
    group: "Lifestyle",
    href: "https://kriscent.com/product/carwash-multivendor/",
  },
  {
    id: "k-parking",
    keywords: ["parking", "vehicles", "parking booking"],
    name: "K-Parking",
    line: "Vehicle parking portal",
    group: "Lifestyle",
    href: "https://www.kriscent.com/product/kparking/",
  },
  {
    id: "k-realestate",
    keywords: ["property", "real estate", "housing", "property management"],
    name: "K-Realestate",
    line: "Real estate management system",
    group: "Lifestyle",
    href: "https://kriscent.com/product/krealestate/",
  },
  {
    id: "k-cinema",
    keywords: ["cinema", "movies", "ticket booking"],
    name: "K-Cinema",
    line: "Cinema ticket booking portal",
    group: "Lifestyle",
    href: "https://kriscent.com/product/kcinema/",
  },
];
