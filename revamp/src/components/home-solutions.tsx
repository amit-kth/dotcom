"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  LayoutGrid,
  type LucideIcon,
  Sparkles,
  Truck,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { NoSolutions, SolutionCard } from "@/components/solution-card";
import { ProductVisual, VISUAL_BY_PRODUCT } from "@/components/product-visual";
import { categories, categoryLabel, type CategoryId } from "@/data/categories";
import { availableProducts, products, productsInCategory } from "@/data/products";
import { counters } from "@/data/site-content";
import { cn } from "@/lib/utils";

/* ============================================================================
   THE HERO HAS ONE JOB: GET THE VISITOR TO PICK THEIR INDUSTRY.
   ----------------------------------------------------------------------------
   Everything in this file is arranged around that sentence.

   What that means concretely, and why the previous version failed:
   - The selector is the largest, brightest, highest-contrast object on the
     first screen. Before, it was a row of 32px pills under a badge, a headline,
     two buttons, three statistics and a dashboard mockup, so the eye had
     already left before reaching it.
   - Everything that competed has been removed from the hero. No badge, no
     secondary button, no mockup, no stat row. The trust line below the selector
     is 12px muted text on purpose.
   - The headline is one line at 50px, not a 56px block: it has to introduce the
     page without out-shouting the thing we want clicked.
   - The tiles are 88px tall cards with an icon, a label and a live count, so
     they read as a control rather than as filter tags. Eight tiles fill two
     rows of four exactly, which is why "All systems" is the eighth.

   After a choice the page scrolls to the list it just filtered. That is the
   whole interaction: pick, see, talk to us.
   ========================================================================== */

const ICONS: Record<CategoryId, LucideIcon> = {
  fintech: Landmark,
  logistics: Truck,
  manufacturing: Factory,
  healthcare: HeartPulse,
  astrology: Sparkles,
  edtech: GraduationCap,
  "real-estate": Building2,
};

export function HomeSolutions() {
  const [selected, setSelected] = useState<CategoryId | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  /* The preview only exists once there is something to preview. On first load
     the hero holds nothing but the question and the chips. */
  const stageProduct = useMemo(
    () => (selected ? productsInCategory(selected)[0] : undefined),
    [selected],
  );

  const stage = stageProduct ? VISUAL_BY_PRODUCT[stageProduct.id] : null;

  const visible = useMemo(
    () => (selected ? productsInCategory(selected) : availableProducts),
    [selected],
  );

  const featured = visible.find((p) => p.id === "ai-calling-agents");
  const rest = visible.filter((p) => p.id !== "ai-calling-agents");
  const activeLabel = selected ? categoryLabel(selected) : null;

  const choose = (id: CategoryId | null) => {
    setSelected(id);
    if (!id) return;

    /* The pick answers in two places: the hero shows a small preview, then the
       page moves to the solutions it just filtered. The delay is long enough
       for the preview to register and short enough not to feel laggy. */
    window.setTimeout(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 260);
  };

  return (
    <>
      {/* ==================================================== 1. the hero ====
          PURPOSE: get the visitor to name the business they run.

          Everything here serves that and nothing else. There is deliberately no
          mockup on first load: a product screen beside the headline competes
          with the chips, and the chips are the only thing we need clicked. The
          preview appears after a choice, as a receipt for the decision that was
          just made.
          ==================================================================== */}
      <section
        className="hero-field relative isolate flex min-h-[min(100svh,52rem)] flex-col justify-center overflow-hidden"
        aria-labelledby="hero-title"
      >
        {/* Light, not decoration: it marks the zone the visitor should act in. */}
        <div aria-hidden="true" className="hero-halo" />

        <div className="shell hero-body relative z-10">
          <h1 id="hero-title" className="hero-h1 hero-in text-white">
            Ready-made software.
            <span className="mt-1 block">
              Live in <span className="hero-num">15 days</span>.
            </span>
          </h1>

          <p className="hero-sub hero-in max-w-[44ch] text-[1.0625rem] leading-relaxed text-white/80">
            Pick your industry and we will show you what is already built for it.
          </p>

          <div className="hero-chips hero-in">
            <p
              id="industry-label"
              className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-white/60"
            >
              What does your business do?
            </p>

            {/* The control. 56px tall, high contrast, and the widest thing in
                the section after the headline — because it is the only thing
                that has to be used. */}
            <div
              role="group"
              aria-labelledby="industry-label"
              className="mt-4 grid max-w-[54rem] grid-cols-2 gap-2.5 sm:grid-cols-4"
            >
              {categories.map((category, index) => {
                const Icon = ICONS[category.id];
                const active = selected === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => choose(active ? null : category.id)}
                    style={{ animationDelay: `${120 + index * 40}ms` }}
                    className={cn(
                      "hero-in flex min-h-[3.75rem] items-center gap-2 rounded-2xl border-[1.5px] px-3.5 text-sm font-semibold transition-all duration-200 sm:gap-2.5 sm:px-5 sm:text-base",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                      active
                        ? "border-white bg-white text-ink shadow-[0_20px_50px_-20px_oklch(0%_0_0/0.9)]"
                        : "border-white/25 bg-white/[0.08] text-white hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/[0.14]",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4 shrink-0 transition-colors sm:size-[1.125rem]",
                        active ? "text-primary" : "text-white/70",
                      )}
                      aria-hidden="true"
                    />
                    {category.label}
                  </button>
                );
              })}

              {/* The eighth cell. Seven loud options leave a hole in a 4-column
                  pad, and the hole is worse than the tile: it reads as something
                  missing. This one is deliberately quiet — dashed, muted — because
                  it is the option for visitors whose industry is not listed. */}
              <button
                type="button"
                onClick={() => choose(null)}
                className="hero-in flex min-h-[3.75rem] items-center gap-2 rounded-2xl border-[1.5px] border-dashed border-white/20 px-3.5 text-sm font-medium text-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.06] hover:text-white sm:gap-2.5 sm:px-5 sm:text-base"
              >
                <LayoutGrid
                  className="size-4 shrink-0 opacity-70 sm:size-[1.125rem]"
                  aria-hidden="true"
                />
                All industries
              </button>
            </div>
          </div>

          {/* The receipt. Small on purpose: it confirms the choice without
              becoming a second thing to look at. */}
          {stage && (
            <div className="hero-preview mt-7 flex w-full max-w-[34rem] items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.05] p-3 backdrop-blur-sm">
              <div className="w-[9.5rem] shrink-0 overflow-hidden rounded-lg ring-1 ring-white/15">
                <ProductVisual
                  variant={stage.variant}
                  accent={stage.accent}
                  className="aspect-[640/400] w-full"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white/50">
                  {activeLabel}
                </p>
                <p className="mt-1 truncate text-[1.0625rem] font-semibold text-white">
                  {stageProduct?.name}
                </p>
              </div>
              <div className="ml-auto shrink-0 pr-1">
                <RequestDemoDialog
                  product={stageProduct?.name}
                  label="Request a demo"
                  variant="onInk"
                  size="sm"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================================================ 2. the systems ==== */}
      <section
        id="solutions"
        aria-labelledby="solutions-title"
        className="scroll-mt-[4.5rem] bg-background"
      >
        <div ref={listRef} className="shell band-sm scroll-mt-[4.5rem]">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
              <div>
                <h2 id="solutions-title" className="title-section">
                  {activeLabel ? `${activeLabel} solutions` : "What we can install now"}
                </h2>
                <p className="body dim mt-2">
                  {activeLabel
                    ? `What we have already built for ${activeLabel.toLowerCase()}.`
                    : "Built, installed and running elsewhere. Pick an industry above to narrow it."}
                </p>
              </div>

              <Link
                href="/solutions"
                className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-primary"
              >
                View all solutions
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>

          <p role="status" aria-live="polite" className="sr-only">
            {visible.length} solutions shown
            {activeLabel ? ` for ${activeLabel}` : ""}
          </p>

          {/* Every industry's builds are in the HTML, always. Only one group is
              displayed at a time. Filtering by unmounting would have hidden six
              of the seven groups from a crawler, on a page whose whole point is
              those groups. */}
          {categories.map((category) => {
            const items = productsInCategory(category.id);
            const open = selected === category.id;

            return (
              <div key={category.id} hidden={selected !== null && !open}>
                <h3 className="sr-only">{category.label}</h3>
                {items.length > 0 ? (
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {items.map((product, i) => (
                      <Reveal key={product.id} delay={i * 40}>
                        <SolutionCard product={product} />
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <div className="mt-7">
                    <NoSolutions label={category.label} />
                  </div>
                )}
              </div>
            );
          })}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4">
            <p className="text-[0.9375rem] text-muted-foreground">
              Not sure which fits? Talk to us.
            </p>
            <RequestDemoDialog label="Request a demo" size="sm" />
          </div>
        </div>
      </section>
    </>
  );
}
