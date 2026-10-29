"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCategory } from "@/components/category-context";
import { SolutionBanner } from "@/components/solution-banner";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { categoryLabel } from "@/data/categories";
import { featuredProducts, productsInCategory } from "@/data/products";
import { buttonVariants } from "@/components/ui/button";
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
  const { selected, setSelected } = useCategory();
  const reduceMotion = useReducedMotion();

  const items = selected ? productsInCategory(selected) : featuredProducts;
  const stackRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  /* Clearing the filter from down here would drop the visitor into the middle
     of a shorter list, so the section is brought back to the top first. */
  const clearFilter = () => {
    setSelected(null);
    const section = document.getElementById("solutions");
    if (!section) return;
    window.scrollTo({
      top:
        section.getBoundingClientRect().top +
        window.scrollY -
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--header-h") ||
            "72",
        ) -
        8,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="solutions"
      className="light-band relative bg-band-solutions pb-16 sm:pb-24"
      aria-labelledby="solutions-title"
    >
      <div className="shell pt-[clamp(4.5rem,9vw,10rem)]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            <p className="t-label">Solutions</p>
            <h2 id="solutions-title" className="t-heading mt-4 max-w-[24ch]">
              {selected
                ? `${categoryLabel(selected)} solutions.`
                : "Customised solutions for all of your needs."}
            </h2>
          </div>

          {/* Fixed height in every state: the label never reflows the row, and
              the action only appears when there is something to clear. */}
          <div className="flex h-11 items-center gap-4">
            <p className="text-[1rem] text-on-light-soft">
              Showing:{" "}
              <span className="font-semibold text-on-light">
                {selected ? categoryLabel(selected) : "all solutions"}
              </span>
            </p>
            {selected && (
              <button
                type="button"
                onClick={clearFilter}
                className="inline-flex min-h-11 items-center text-[1rem] font-semibold text-brand underline-offset-4 hover:underline"
              >
                Show all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- the stack ---------------- */}
      {items.length > 0 ? (
        reduceMotion ? (
          <div className="mt-12 flex flex-col gap-6 sm:mt-16">
            {items.map((product) => (
              <SolutionBanner key={product.id} product={product} />
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
          <div className="banner" data-hue="violet">
            <div aria-hidden="true" className="absolute inset-0 bg-[#0a0822]" />
            <div className="banner-copy">
              <p className="t-label">{selected ? categoryLabel(selected) : "Solutions"}</p>
              <h3 className="mt-3 max-w-[20ch] text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.04] tracking-[-0.035em]">
                Nothing pre-built for this yet. Talk to us.
              </h3>
              <div className="mt-8">
                <RequestDemoDialog label="Request a demo" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="shell relative z-[1] mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 sm:mt-16">
        <p className="text-[1.0625rem] text-on-light-soft">
          Not sure which fits? Talk to us.
        </p>
        <Link
          href="/solutions"
          className={cn(buttonVariants({ variant: "secondary", size: "md" }), "group")}
        >
          View all solutions
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
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
     dimmed once the next one is actually over it — not while it is still the
     banner you are reading. */
  const shade = useTransform(
    progress,
    [start + (end - start) * 0.5, end],
    [0, isLast ? 0 : 0.42],
  );

  return (
    <div
      className="stack-item sticky"
      style={{
        top: `calc(${STICKY_TOP} + ${index * 0.625}rem)`,
        zIndex: index + 1,
      }}
    >
      <motion.div style={{ scale, y }} className="origin-top">
        <div className="relative">
          {children}
          <motion.div
            aria-hidden="true"
            className="stack-shade"
            style={{ opacity: shade }}
          />
        </div>
      </motion.div>
    </div>
  );
}
