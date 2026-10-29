"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarCheck } from "lucide-react";
import { asset, contact } from "@/config/variables";
import { buttonVariants } from "@/components/ui/button";
import { categoryLabel } from "@/data/categories";
import { BANNER_RATIO, type Product } from "@/data/products";
import { T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** The per-product accent, written once as a variable the banner reads. */
const HUE_CLASS: Record<Product["accentHue"], string> = {
  blue: "[--hue:var(--hue-blue)]",
  violet: "[--hue:var(--hue-violet)]",
  coral: "[--hue:var(--hue-coral)]",
  teal: "[--hue:var(--hue-teal)]",
};

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
        "relative mx-auto flex w-full max-w-[112rem] flex-col items-stretch overflow-hidden",
        "border border-white/[0.06] bg-[#0a0822] text-on-dark shadow-[var(--shadow-lift)]",
        "max-lg:bg-[linear-gradient(165deg,color-mix(in_oklch,var(--hue,var(--accent-bright))_22%,#0a0822)_0%,#0a0822_62%)]",
        "lg:aspect-[16/7] lg:max-h-[84svh] lg:flex-row lg:items-center",
        "lg:hover:border-[color-mix(in_oklch,var(--hue,var(--accent-bright))_45%,transparent)]",
        HUE_CLASS[product.accentHue],
        preview && "opacity-45 saturate-50",
      )}
    >
      <div className="relative order-2 aspect-[4/3] border-t border-glass-border lg:absolute lg:inset-0 lg:order-none lg:aspect-auto lg:border-0">
        <img
          src={asset(product.banner)}
          alt=""
          width={1680}
          height={735}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-[78%_50%] lg:object-center"
          style={{ aspectRatio: BANNER_RATIO }}
        />
      </div>

      {/* Desktop only: a token scrim over the left half, stopping before the
          artwork so the right side stays clean. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-1 hidden bg-[linear-gradient(to_right,oklch(11.5%_0.035_278/0.9)_0%,oklch(11.5%_0.035_278/0.82)_34%,oklch(11.5%_0.035_278/0.45)_54%,oklch(11.5%_0.035_278/0)_70%)] lg:block"
      />

      <div className="relative z-2 w-full py-[clamp(1.75rem,4vw,3.5rem)] px-[max(clamp(1.5rem,4vw,3rem),calc((100%_-_80rem)/2_+_clamp(1.5rem,4vw,3rem)))] lg:w-[min(60%,44rem)]">
        {/* only the primary industry is shown; the rest are filter tags */}
        <p className={cn(T_LABEL, "text-on-dark-soft")}>
          {categoryLabel(product.categories[0])}
        </p>

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
                className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--hue,var(--accent-bright))]"
              />
              {outcome}
            </li>
          ))}
        </ul>

        {/* Two jobs, two buttons. "Request a demo" opens the contact form with
            THIS solution already filled in and the form titled after it; the
            second button goes to the product's own page. These are the only two
            call-to-action labels the site uses. */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={`${contact.contactPath}?solution=${product.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "md" }),
              "group",
            )}
          >
            <CalendarCheck className="size-4" aria-hidden="true" />
            Request a demo
          </Link>

          {product.href && (
            <a
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "primary", size: "md" }),
                "group",
              )}
            >
              Explore {product.name}
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
