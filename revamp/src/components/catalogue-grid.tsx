import { ArrowUpRight, ImageIcon } from "lucide-react";
import { asset } from "@/config/variables";
import { catalogue } from "@/data/catalogue";

/* ============================================================================
   CatalogueGrid  —  everything else we have built
   ----------------------------------------------------------------------------
   PURPOSE: answer "do you have something for my business?" after the five
   solutions we lead with, without pretending these are flagship products.

   IMAGE SLOTS
   Every card renders the same 16:10 artwork area. Until a render exists the area
   is `.media-slot`: paper, a hairline, a fine hatch, the product group printed
   in the corner and one small glyph. Drop a path into `image` in catalogue.ts
   and the card switches to a real <img> with no layout change.

   LINKS
   Only rows that had a product page on the old site are links. Rows whose old
   link was `coming-soon.php` are plain text — an arrow that goes nowhere is
   worse than no arrow.
   ========================================================================== */

export function CatalogueGrid() {
  return (
    <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {catalogue.map((item) => (
        <li key={item.id} className="group">
          {item.image ? (
            <img
              src={asset(item.image)}
              alt=""
              width={640}
              height={400}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full rounded-xl border border-line object-cover"
            />
          ) : (
            <div className="media-slot" aria-hidden="true">
              {/* the artwork slot, not an apology: it carries the group the
                  product belongs to, in the same corner every render will sit */}
              <span className="media-slot__group">{item.group}</span>
              <span className="media-slot__rule" />
              <ImageIcon className="media-slot__mark" strokeWidth={1.25} />
            </div>
          )}

          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] text-on-light">
                {item.name}
              </h3>
              <p className="mt-1 text-[0.9375rem] leading-snug text-on-light-soft">
                {item.line}
              </p>
            </div>

            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.name} — open the product page`}
                className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-on-light-soft transition-colors hover:border-brand hover:text-brand"
              >
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
