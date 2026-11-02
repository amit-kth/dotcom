"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { contact } from "@/config/variables";
import { offer, offerProductNames } from "@/data/offer";

export function OfferStrip() {
  const [dismissed, setDismissed] = useState(false);
  if (!offer || dismissed) return null;
  const { cta } = offer;
  const text = `${offer.heading}: ${offer.discount} on ${offerProductNames}`;
  return (
    <aside aria-label="Current offer" className="offer-strip offer-colors" data-tone={offer.tone}>
      <div className="offer-strip-track">
        {[0, 1].map((group) => (
          <div key={group} className="offer-strip-copy" aria-hidden={group === 1 || undefined}>
            {[0, 1, 2].map((repeat) => (
              <span key={repeat} className="offer-strip-message" aria-hidden={repeat > 0 || undefined}>
                <span title={text}>{text}</span>
                <Link href={contact.contactPath} tabIndex={group || repeat ? -1 : undefined} className="shrink-0 font-bold underline underline-offset-4">{cta}</Link>
              </span>
            ))}
          </div>
        ))}
      </div>
      <button type="button" className="offer-strip-close offer-colors" aria-label="Dismiss offer strip" onClick={() => setDismissed(true)}>
        <X className="size-4" aria-hidden="true" />
      </button>
    </aside>
  );
}
