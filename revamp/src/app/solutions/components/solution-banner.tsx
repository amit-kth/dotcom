"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarCheck } from "lucide-react";
import { asset, contact } from "@/config/variables";
import { buttonVariants } from "@/components/ui/button";
import { categoryLabel } from "@/data/categories";
import { type Product } from "@/data/products";
import { T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** The per-product accent, written once as a variable the banner reads. */
const HUE_CLASS: Record<Product["accentHue"], string> = {
  blue: "[--hue:var(--color-blue-600)]",
  violet: "[--hue:var(--color-violet-500)]",
  coral: "[--hue:var(--color-red-500)]",
  teal: "[--hue:var(--color-cyan-600)]",
};

/* ============================================================================
   SolutionBanner
   ----------------------------------------------------------------------------
   PURPOSE: show one solution as a full-width banner you cannot miss.

   The banner image is ours: empty on the left, artwork on the right. So the
   text always sits left, and never over the artwork. A token gradient scrim is
   added on top of the left edge so the text holds contrast no matter what the
   supplied artwork looks like, it is a token, not a hard-coded black.

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
        "relative mx-auto grid w-full max-w-[112rem] grid-rows-[minmax(11rem,3fr)_7fr] overflow-hidden rounded-3xl lg:flex lg:flex-row lg:items-center",
        "bg-slate-950 text-slate-50 shadow-[0_24px_60px_-32px_rgb(15_23_42/0.45)]",
        "max-lg:bg-[linear-gradient(165deg,color-mix(in_oklch,var(--hue,var(--color-blue-100))_22%,var(--color-slate-950))_0%,var(--color-slate-950)_62%)]",
        "lg:aspect-[16/7] lg:max-h-[84svh]",
        HUE_CLASS[product.accentHue],
        preview && "opacity-45 saturate-50",
      )}
    >
      <div className="relative min-h-0 overflow-hidden lg:absolute lg:inset-0">
        <img
          src={asset(product.banner)}
          alt=""
          width={1680}
          height={735}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-[78%_50%] lg:object-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-slate-950/10 to-slate-950 lg:hidden"
        />
      </div>

      {/* Desktop only: a token scrim over the left half, stopping before the
          artwork so the right side stays clean. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-1 hidden bg-[linear-gradient(to_right,oklch(11.5%_0.035_278/0.9)_0%,oklch(11.5%_0.035_278/0.82)_34%,oklch(11.5%_0.035_278/0.45)_54%,oklch(11.5%_0.035_278/0)_70%)] lg:block"
      />

      <div className="relative z-2 w-full bg-slate-950 p-6 sm:p-8 lg:bg-transparent lg:py-[clamp(1.75rem,4vw,3.5rem)] lg:px-[max(clamp(1.5rem,4vw,3rem),calc((100%_-_80rem)/2_+_clamp(1.5rem,4vw,3rem)))] lg:w-[min(60%,44rem)]">
        {/* only the primary industry is shown; the rest are filter tags */}
        <p className={cn(T_LABEL, "text-slate-300")}>
          {categoryLabel(product.categories[0])}
        </p>

        <h3 className="mt-3 text-[clamp(1.75rem,4.2vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.035em] text-slate-50">
          {product.name}
        </h3>

        <p className="mt-3 max-w-[34ch] text-[1.0625rem] leading-relaxed text-slate-300">
          {product.problem}
        </p>

        <ul className="mt-6 flex flex-col gap-2">
          {product.outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex items-start gap-2.5 text-[1rem] leading-snug text-slate-300"
            >
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--hue,var(--color-blue-100))]"
              />
              {outcome}
            </li>
          ))}
        </ul>

        {/* Two jobs, two buttons. "Request a demo" opens the contact form with
            the form titled after THIS solution, without adding form fields; the
            second button goes to the product's own page. These are the only two
            call-to-action labels the site uses. */}
        <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:items-center lg:mt-8">
          <Link
            href={`${contact.contactPath}?solution=${product.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "md" }),
              "group max-sm:w-full max-sm:min-h-11 max-sm:h-auto max-sm:whitespace-normal max-sm:px-3 max-sm:py-3 max-sm:text-sm",
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
                "group max-sm:w-full max-sm:min-h-11 max-sm:h-auto max-sm:whitespace-normal max-sm:px-3 max-sm:py-3 max-sm:text-sm",
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
