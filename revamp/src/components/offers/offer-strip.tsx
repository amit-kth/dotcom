"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { contact } from "@/config/variables";
import { offer, offerProductNames, offerColors } from "@/data/offer";

export function OfferStrip() {
  const [dismissed, setDismissed] = useState(false);
  if (!offer || dismissed) return null;
  const { cta } = offer;
  const text = `${offer.heading}: ${offer.discount} on ${offerProductNames}`;
  return (
    <aside aria-label="Current offer" className={`group/offer-strip relative h-8 overflow-hidden pr-8 text-[0.8125rem] ${offerColors[offer.tone]}`} data-tone={offer.tone}>
      <div className="flex w-max min-w-full motion-reduce:w-full">
        {[0, 1].map((group) => (
          <div key={group} data-marquee-copy className="animate-offer-marquee motion-reduce:animate-none group-hover/offer-strip:[animation-play-state:paused] group-focus-within/offer-strip:[animation-play-state:paused] flex h-8 min-w-max shrink-0 items-center justify-center gap-10 px-6 whitespace-nowrap motion-reduce:w-full motion-reduce:min-w-full motion-reduce:px-3 motion-reduce:aria-hidden:hidden" aria-hidden={group === 1 || undefined}>
            {[0, 1, 2].map((repeat) => (
              <span key={repeat} className="inline-flex items-center gap-3 motion-reduce:w-full motion-reduce:min-w-0 motion-reduce:aria-hidden:hidden" aria-hidden={repeat > 0 || undefined}>
                <span title={text} className="motion-reduce:truncate">{text}</span>
                <Link href={contact.contactPath} tabIndex={group || repeat ? -1 : undefined} className="shrink-0 font-bold">{cta}</Link>
              </span>
            ))}
          </div>
        ))}
      </div>
      <button type="button" className={`absolute inset-y-0 right-0 grid w-8 cursor-pointer place-items-center hover:brightness-115 ${offerColors[offer.tone]}`} aria-label="Dismiss offer strip" onClick={() => setDismissed(true)}>
        <X className="size-4" aria-hidden="true" />
      </button>
    </aside>
  );
}
