"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, X } from "lucide-react";
import { useCategory } from "@/components/category-context";
import { SolutionBanner } from "@/app/solutions/components/solution-banner";
import { categoryLabel } from "@/data/categories";
import { featuredProducts } from "@/data/products";
import { buttonVariants } from "@/components/ui/button";

import { contact } from "@/config/variables";
import { LIGHT_BAND, SHELL, T_HEADING, T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";

/* ============================================================================
   Solutions
   ----------------------------------------------------------------------------
   PURPOSE: show what exists, as full-width banners you cannot scroll past.

   THE STACK
   Each banner is sticky with the same `top`, so as you scroll the next one
   slides over the previous. The covered banner scales down and dims by a few
   percent, which leaves its top edge visible above the one now on top. That
   edge is the whole trick: it says "there are more of these" without a
   carousel or a grid of cards.

   Two things this needs to survive:
   - No ancestor may have overflow hidden or a transform, or `sticky` silently
     stops working. The section and every wrapper above it are plain blocks.
   - Every banner needs scroll distance after it, or they all land at once. The
     margin under each one is that distance.

   The banners run edge to edge and the copy inside them stays on the shell's
   left edge, so the section reads as full width without breaking the page's
   single vertical line.

   FILTERING
   All solutions are in the HTML. A chip choice filters the rendered list at
   render time, not by fetching. Clearing the chip, or "Show all", restores
   everything. With motion off the stack becomes a plain list: no sticky, no
   scale, no dimming.
   ========================================================================== */

const STICKY_TOP = "calc(var(--header-h) + 0.5rem)";

export function Solutions() {
  const { selected, toggleCategory, clearCategories } = useCategory();
  const reduceMotion = useReducedMotion();

  const items = selected.length
    ? featuredProducts.filter((product) =>
        product.categories.some((id) => selected.includes(id)),
      )
    : featuredProducts;
  const stackRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  /* Clearing the filter from down here would drop the visitor into the middle
     of a shorter list, so the section is brought back to the top first. */
  const clearFilter = () => {
    clearCategories();
    document.getElementById("solutions")?.scrollIntoView({
      block: "start",
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="solutions"
      className={LIGHT_BAND}
      aria-labelledby="solutions-title"
    >
      <div className={cn(SHELL, "pt-[clamp(4.5rem,9vw,10rem)]")}>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            <p className={cn(T_LABEL, "text-slate-500")}>Solutions</p>
            <h2
              id="solutions-title"
              className={cn(T_HEADING, "mt-4 max-w-[24ch]")}
            >
              {selected.length
                ? "Solutions for your industries."
                : "Customised solutions for all of your needs."}
            </h2>
          </div>

          <div
            className="flex max-w-full flex-wrap items-center gap-2"
            aria-label="Industry filters"
          >
            {selected.length ? (
              <>
                {selected.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleCategory(id)}
                    aria-label={`Remove ${categoryLabel(id)} filter`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 text-sm font-medium text-blue-700 hover:bg-blue-100"
                  >
                    {categoryLabel(id)}{" "}
                    <X className="size-4" aria-hidden="true" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearFilter}
                  className="min-h-11 px-3 text-sm font-semibold text-blue-700 hover:underline"
                >
                  Clear all
                </button>
              </>
            ) : (
              <span className="text-sm text-slate-500">
                Showing all solutions
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- the stack ---------------- */}
      {items.length > 0 ? (
        reduceMotion ? (
          <div className="mt-12 flex flex-col gap-6 sm:mt-16">
            {items.map((product) => (
              <div
                key={product.id}
                className="last:mx-4 sm:last:mx-6 lg:last:mx-8"
              >
                <SolutionBanner product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div ref={stackRef} className="mt-12 sm:mt-16">
            {items.map((product, index) => (
              <StackItem
                key={product.id}
                index={index}
                total={items.length}
                progress={scrollYProgress}
              >
                <SolutionBanner product={product} />
              </StackItem>
            ))}
          </div>
        )
      ) : (
        /* A category with nothing pre-built still gets a banner-sized answer,
           never an empty area. */
        <div className="mt-12 sm:mt-16">
          <article className="relative mx-auto flex w-full max-w-none flex-col overflow-hidden border border-white/[0.06] bg-slate-950 text-slate-50 shadow-[0_24px_60px_-32px_rgb(15_23_42/0.45)] [--hue:var(--color-violet-500)] lg:min-h-[clamp(34rem,38vw,48rem)] lg:flex-row lg:items-center">
            <div className="relative z-2 w-full py-[clamp(1.75rem,4vw,3.5rem)] px-[clamp(1.5rem,4vw,6rem)] lg:w-[55%]">
              <p className={cn(T_LABEL, "text-slate-300")}>
                {selected.length
                  ? selected.map(categoryLabel).join(", ")
                  : "Solutions"}
              </p>
              <h3 className="mt-3 max-w-[20ch] text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.04] tracking-[-0.035em]">
                Nothing pre-built for this yet. Talk to us.
              </h3>
              <div className="mt-8">
                <Link
                  href={contact.contactPath}
                  className={buttonVariants({ variant: "inverse", size: "md" })}
                >
                  Contact us
                  <Mail className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      )}

      <div className="relative z-1 mt-12 bg-blue-600 py-8 text-white sm:mt-16 sm:py-10">
        <div
          className={cn(
            SHELL,
            "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between",
          )}
        >
          <h2 className="max-w-[24ch] text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            Not sure which fits? Talk to us.
          </h2>
          <Link
            href={contact.contactPath}
            className={cn(
              buttonVariants({ variant: "inverse", size: "md" }),
              "shrink-0 self-start sm:self-auto",
            )}
          >
            Contact us <Mail className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function StackItem({
  children,
  index,
  total,
  progress,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  /* Each banner owns a slice of the section's scroll and shrinks as the next
     one comes over the top of it. The last one does nothing at all: there is
     nothing left to cover it, so it stays full size and full brightness. */
  const isLast = index === total - 1;
  const start = index / total;
  const end = (index + 1) / total;

  const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.94]);
  const y = useTransform(progress, [start, end], [0, isLast ? 0 : -12]);

  /* The dim is a layer of paint on top of the card, not `opacity` on the card.
     Animating opacity here would make a covered banner see-through, and the
     banners stacked behind it would bleed their text through the one on top.

     It also holds back for the first half of the window, so a banner is only
     dimmed once the next one is actually over it, not while it is still the
     banner you are reading. */
  const shade = useTransform(
    progress,
    [start + (end - start) * 0.5, end],
    [0, isLast ? 0 : 0.42],
  );

  return (
    <div
      className={cn(
        "relative mb-6 max-lg:top-auto! lg:sticky lg:mb-[clamp(14rem,38svh,26rem)] last:mb-0 [@media(max-height:740px)]:static [@media(max-height:740px)]:mb-6",
        isLast && "mx-4 sm:mx-6 lg:mx-8",
      )}
      style={{
        top: `calc(${STICKY_TOP} + ${index * 0.625}rem)`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{ scale, y }}
        className="origin-top max-lg:transform-none! [@media(max-height:740px)]:transform-none!"
      >
        <div className="relative isolate overflow-hidden rounded-3xl">
          {children}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-3 hidden lg:block [@media(max-height:740px)]:hidden rounded-3xl bg-slate-950"
            style={{ opacity: shade }}
          />
        </div>
      </motion.div>
    </div>
  );
}
