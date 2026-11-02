/*
HOW TO ADD AN OFFER (this is the only file you need to edit)
Replace the null on the export line below with one of these filled examples.

ALL PRODUCTS:
export const offer: Offer | null = {
  id: "fresh-offer-1",
  tone: "new",
  heading: "Special offer",
  discount: "20% off",
  products: "all",
  cta: "Claim offer",
};

TWO PRODUCTS:
export const offer: Offer | null = {
  id: "school-offer-2",
  tone: "hot",
  heading: "Education offer",
  discount: "20% off",
  products: ["k-exam", "k-edusity"],
  cta: "Claim offer",
};

id: Use a new, descriptive identifier for each offer. Popups can show again on every reload.
tone: Choose "new", "hot" or "festive"; tone chooses the colors and image.
heading: The short name of your offer.
discount: A discount such as "20% off". Never write rupee prices.
products: Use "all", or copy exact product ids into an array.
cta: The button/link label; it always leads to Contact us.

WHERE ARE THE PRODUCT IDS?
Our productData is src/data/products.ts (large cards) and src/data/catalogue.ts
(smaller cards). Copy the id, not the name. A wrong id shows a warning in dev.

HOW TO REMOVE AN OFFER
Set export const offer = null; (keeping the : Offer | null type is fine).

AFTER EDITING
Run npm run build, test on staging, then zip the contents of out/ and send
it to Kapil sir. Do not send source files or node_modules as the hosting build.
*/
import { products } from "./products";
import { catalogue } from "./catalogue";

export type Offer = {
  id: string;
  tone: "new" | "hot" | "festive";
  heading: string;
  discount: string;
  products: "all" | string[];
  cta: string;
};

export const offer: Offer | null = null;

// Generated square artwork ships locally so every popup works immediately.
// If moved to ImageKit later, replace these four URLs here after uploading.
export const popupImages = {
  contact: "/popups/popup-contact.webp",
  new: "/popups/popup-new.webp",
  hot: "/popups/popup-hot.webp",
  festive: "/popups/popup-festive.webp",
};

export function getOfferProductNames(current: Offer | null) {
  if (!current || current.products === "all") return "All solutions";
  return current.products.map((id) => {
    const product = [...products, ...catalogue].find((item) => item.id === id);
    if (!product && process.env.NODE_ENV === "development") {
      console.warn(`[offer] Unknown product id: "${id}". Check src/data/products.ts or catalogue.ts.`);
    }
    return product?.name;
  }).filter(Boolean).join(", ");
}

export const offerProductNames = getOfferProductNames(offer);
