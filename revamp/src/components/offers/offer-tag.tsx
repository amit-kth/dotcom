import { offer } from "@/data/offer";

export function OfferTag({ productId }: { productId: string }) {
  if (!offer || (offer.products !== "all" && !offer.products.includes(productId))) return null;
  return (
    <span data-tone={offer.tone} className="offer-tag offer-colors absolute top-3 right-3 z-3 max-w-[calc(100%-1.5rem)] rounded-full px-3 py-1 text-xs font-bold shadow-sm sm:top-5 sm:right-5">
      {offer.discount}
    </span>
  );
}
