/* ============================================================================
   catalogue.ts ,  the rest of what we have already built
   ----------------------------------------------------------------------------
   The five solutions on the homepage are the ones we lead with. This is
   everything else the client lists on the old site (the product grid in
   index.php), so /solutions can answer "do you have something for X?" without
   turning the homepage into a catalogue.

   NAMES, LINES AND LINKS ARE COPIED FROM THE OLD SITE. Nothing here is
   invented: `line` is the old tagline, `href` is the old product URL. Where the
   old site had `coming-soon.php` instead of a product page, there is no href
   and the row is not a link.

   IMAGES: intentionally absent. `image` is left undefined so the card renders
   its artwork slot, which is where the new renders will go. Add a path under
   public/ to fill one, no component change needed.
   ========================================================================== */

export type CatalogueItem = {
  id: string;
  name: string;
  /** the old site's own one-line tagline */
  line: string;
  /** the old site's product URL; absent when the old site had no page */
  href?: string;
  /** path under ASSETS_BASE_URL once artwork exists */
  image?: string;
  /** which of our industries this belongs to, for grouping */
  group: "Commerce" | "Education" | "Health" | "Operations" | "Portals" | "Lifestyle";
};

export const catalogue: CatalogueItem[] = [
  { id: "k-services", name: "K-Services", line: "Multi-services portal", group: "Portals", href: "https://kriscent.com/product/k-service/admin" },

  { id: "kart-grocery", name: "Kart-Grocery", line: "Fast delivery, fresh products", group: "Commerce" },
  { id: "k-foodies", name: "K-Foodies", line: "Online food delivery portal", group: "Commerce", href: "https://www.kriscent.com/product/kfoodies/" },
  { id: "k-restro", name: "K-Restro", line: "Restaurant management with POS", group: "Commerce", href: "https://www.kriscent.com/product/krestro/" },
  { id: "k-bazaar-pos", name: "K-Bazaar POS", line: "Billing and inventory management", group: "Commerce", href: "https://www.kriscent.in/product/kbazaar/" },
  { id: "kart-supermarket", name: "Kart Supermarket", line: "Online grocery store", group: "Commerce", href: "https://www.kriscent.com/product/kart-supermarket/" },
  { id: "kart-multivendor", name: "Kart Multivendor", line: "Multivendor ecommerce portal", group: "Commerce", href: "https://www.kriscent.com/product/kart-multivendormarket/" },
  { id: "kart-multistore", name: "Kart Multistore", line: "Multistore ecommerce portal", group: "Commerce", href: "https://kriscent.com/product/kart-multistore" },
  { id: "k-shop", name: "K-Shop", line: "Ecommerce with WhatsApp CRM", group: "Commerce", href: "https://kshop.kriscent.com/" },
  { id: "k-store", name: "K-Store", line: "Online shopping portal", group: "Commerce", href: "https://www.kriscent.in/product/kstore/" },

  { id: "k-job", name: "K-Job", line: "Online job portal", group: "Portals", href: "https://www.kriscent.in/product/kjob/" },
  { id: "k-klassified", name: "K-Klassified", line: "Online listing portal", group: "Portals", href: "https://www.kriscent.com/product/klassified/" },
  { id: "k-community", name: "K-Community", line: "Community directory portal", group: "Portals", href: "https://kriscent.com/product/kcommunity" },
  { id: "k-samachar", name: "K-Samachar", line: "News portal", group: "Portals", href: "https://www.kriscent.com/product/ksamachar/" },
  { id: "kupon", name: "Kupon", line: "Coupon and deals management", group: "Portals", href: "https://kriscent.com/product/kupon/" },
  { id: "k-affiliation", name: "K-Affiliation", line: "Affiliation and referrals", group: "Portals", href: "https://kriscent.com/product/kaffiliate" },

  { id: "k-academics", name: "K-Academics", line: "School and college management", group: "Education", href: "https://www.kriscent.in/product/kacademics/" },
  { id: "k-hostel", name: "K-Hostel", line: "Hostel booking system", group: "Education", href: "https://kriscent.com/product/khostel/" },

  { id: "k-appointment", name: "K-Appointment", line: "Appointment management", group: "Health", href: "https://www.kriscent.in/product/kappointment/" },
  { id: "doctor-plus", name: "Doctor Plus", line: "Doctor and clinic listing portal", group: "Health", href: "https://www.kriscent.com/product/doctorplus/" },
  { id: "prabal", name: "Prabal Hospital ERP", line: "Hospital management system", group: "Health" },

  { id: "hrm", name: "HRM", line: "HR management software", group: "Operations", href: "https://www.kriscent.in/product/hrm/" },
  { id: "k-billing", name: "K-Billing", line: "Billing automation", group: "Operations", href: "https://billing.enterprisesshree.com/" },
  { id: "k-saksham", name: "K-Saksham", line: "Accounting and billing", group: "Operations", href: "https://www.saksham.kriscent.com/" },
  { id: "k-franchisee", name: "K-Franchisee", line: "Franchisee management system", group: "Operations", href: "https://www.kriscent.in/product/kfranchisee/" },

  { id: "k-matrimonial", name: "K-Matrimonial", line: "Matrimonial portal", group: "Lifestyle", href: "https://www.kriscent.com/product/kmatrimonial/" },
  { id: "k-matchmaker", name: "K-Matchmaker", line: "Dating portal", group: "Lifestyle", href: "https://kriscent.com/product/kmatchmaker/" },
  { id: "k-loan", name: "K-Loan", line: "Loan management system", group: "Lifestyle", href: "https://www.kriscent.com/product/kloan/" },
  { id: "k-laundry", name: "K-Laundry", line: "Multi-store laundry portal", group: "Lifestyle", href: "https://www.kriscent.com/product/klaundry/" },
  { id: "k-cab", name: "K-Cab", line: "Cab booking portal", group: "Lifestyle" },
  { id: "car-wash", name: "Car Wash", line: "Car wash booking system", group: "Lifestyle", href: "https://www.kriscent.com/product/carwash/" },
  { id: "car-wash-multivendor", name: "Car Wash Multivendor", line: "Car wash multivendor software", group: "Lifestyle", href: "https://kriscent.com/product/carwash-multivendor/" },
  { id: "k-parking", name: "K-Parking", line: "Vehicle parking portal", group: "Lifestyle", href: "https://www.kriscent.com/product/kparking/" },
  { id: "k-realestate", name: "K-Realestate", line: "Real estate management system", group: "Lifestyle", href: "https://kriscent.com/product/krealestate/" },
  { id: "k-cinema", name: "K-Cinema", line: "Cinema ticket booking portal", group: "Lifestyle", href: "https://kriscent.com/product/kcinema/" },
];
