import Link from "next/link";
import { contact } from "@/config/variables";
import { offer, offerProductNames } from "@/data/offer";

export function OfferStrip() {
  if (!offer) return null;
  const { cta } = offer;
  const text = `${offer.heading}: ${offer.discount} on ${offerProductNames}`;
  return (
    <aside aria-label="Current offer" className="offer-strip offer-colors" data-tone={offer.tone}>
      <div className="offer-strip-track">
        {[false, true].map((duplicate) => (
          <div key={String(duplicate)} className="offer-strip-copy" aria-hidden={duplicate || undefined}>
            <span title={text}>{text}</span>
            <Link href={contact.contactPath} tabIndex={duplicate ? -1 : undefined} className="shrink-0 font-bold underline underline-offset-4">
              {cta}
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
}
