"use client";

import { asset } from "@/config/variables";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { categoryLabel } from "@/data/categories";
import { BANNER_RATIO, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

/* ============================================================================
   SolutionBanner
   ----------------------------------------------------------------------------
   PURPOSE: show one solution as a full-width banner you cannot miss.

   The banner image is ours: empty on the left, artwork on the right. So the
   text always sits left, and never over the artwork. A token gradient scrim is
   added on top of the left edge so the text holds contrast no matter what the
   supplied artwork looks like — it is a token, not a hard-coded black.

   This is a box because a box is doing a job here (6.3: a banner per solution).
   Nothing is nested inside another box.
   ========================================================================== */

export function SolutionBanner({
  product,
  preview = false,
}: {
  product: Product;
  /** preview = shown in the "nothing pre-built" empty state, not the list */
  preview?: boolean;
}) {
  return (
    <article
      className={cn(
        "banner",
        preview && "opacity-45 saturate-50",
      )}
      data-hue={product.accentHue}
    >
      <div className="banner-art">
        <img
          src={asset(product.banner)}
          alt=""
          width={1680}
          height={735}
          loading="lazy"
          decoding="async"
          style={{ aspectRatio: BANNER_RATIO }}
        />
      </div>

      {/* Desktop only: a token scrim over the left half, stopping before the
          artwork so the right side stays clean. */}
      <div aria-hidden="true" className="banner-scrim" />

      <div className="banner-copy">
        {/* only the primary industry is shown; the rest are filter tags */}
        <p className="t-label">{categoryLabel(product.categories[0])}</p>

        <h3 className="mt-3 text-[clamp(1.75rem,4.2vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.035em] text-on-dark">
          {product.name}
        </h3>

        <p className="mt-3 max-w-[34ch] text-[1.0625rem] leading-relaxed text-on-dark-soft">
          {product.problem}
        </p>

        <ul className="mt-6 flex flex-col gap-2">
          {product.outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex items-start gap-2.5 text-[1rem] leading-snug text-on-dark-soft"
            >
              <span
                aria-hidden="true"
                className="banner-dot mt-2 size-1.5 shrink-0 rounded-full"
              />
              {outcome}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <RequestDemoDialog product={product.name} label="Request a demo" />
        </div>
      </div>
    </article>
  );
}
