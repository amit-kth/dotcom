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

  /* Which screen stands in the hero. No choice yet: the first thing we can
     install today. After a choice: that industry's own build, so the hero
     answers in the visitor's context instead of a generic one. */
  const stage = useMemo(() => {
    const product = selected ? productsInCategory(selected)[0] : availableProducts[0];
    return product
      ? VISUAL_BY_PRODUCT[product.id]
      : { variant: "dashboard" as const, accent: "blue" as const };
  }, [selected]);

  const visible = useMemo(
    () => (selected ? productsInCategory(selected) : availableProducts),
    [selected],
  );

  const featured = visible.find((p) => p.id === "ai-calling-agents");
  const rest = visible.filter((p) => p.id !== "ai-calling-agents");
  const activeLabel = selected ? categoryLabel(selected) : null;

  const choose = (id: CategoryId | null) => {
    /* No scrolling on purpose. The pick changes the hero — the mockup, its
       accent and the glow behind it — and scrolling away from that would hide
       the answer at the exact moment it arrives. The list below updates in
       place, and the announcement below covers it for screen readers. */
    setSelected(id);
  };

  return (
    <>
      {/* ================================================== 1. the opening ==== */}
      <section
        className="hero-field relative isolate flex min-h-[min(100svh,50rem)] flex-col justify-center overflow-hidden"
        aria-labelledby="hero-title"
      >
        <div className="shell hero-body relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:gap-14">
            {/* ------------------------------------------- the words, and the control */}
            <div>
              <h1 id="hero-title" className="hero-h1 hero-in text-white">
                Ready-made software.
                {/* The promise, on its own line, with the number drawn hollow:
                    it is the one figure a buyer should leave with. */}
                <span className="mt-1 block">
                  Live in <span className="hero-num">15</span> days.
                </span>
              </h1>

              <p
                className="hero-sub hero-in max-w-[34rem] text-[0.9375rem] leading-relaxed text-ink-foreground/75 sm:text-base"
                style={{ animationDelay: "70ms" }}
              >
                Pick your industry to see what is already built and running.
              </p>

              {/* The control. Chips, not a white panel: the choice is part of
                  the sentence the visitor is reading, not a form they fill in. */}
              <div
                role="group"
                aria-label="Industry"
                className="hero-chips flex flex-wrap gap-2"
              >
                {categories.map((category, index) => {
                  const Icon = ICONS[category.id];
                  const active = selected === category.id;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      style={{
                        animationDelay: `${140 + index * 45}ms`,
                      }}
                      aria-pressed={active}
                      onClick={() => choose(active ? null : category.id)}
                      className={cn(
                        "hero-in inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[0.8125rem] font-medium transition-all duration-200",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peri",
                        active
                          ? "border-peri bg-peri text-[oklch(21%_0.06_277.93)] shadow-[0_12px_34px_-12px_oklch(78%_0.1_264.38/0.7)]"
                          : "border-white/15 bg-white/[0.06] text-ink-foreground/80 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.11] hover:text-white",
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {category.label}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* --------------------------------------- proof that it already exists
                A product screen, tilted back, with a phone over its corner and
                a glow behind. Picking an industry swaps all of it, so the page
                answers the visitor in their own context. */}
            <div
              className="hero-stage hero-in"
              style={{ animationDelay: "260ms" }}
              data-accent={stage.accent}
              aria-hidden="true"
            >
              <div className="hero-glow" />

              <div className="hero-browser">
                <div className="hero-browser-bar">
                  <span className="hero-dot" />
                  <span className="hero-dot" />
                  <span className="hero-dot" />
                  <span className="ml-2 h-3 w-24 rounded-full bg-[oklch(92%_0.01_260)]" />
                </div>
                <ProductVisual
                  variant={stage.variant}
                  accent={stage.accent}
                  className="aspect-[640/400] w-full"
                />
              </div>

              <div className="hero-phone">
                <ProductVisual
                  variant={stage.variant}
                  accent={stage.accent}
                  className="size-full"
                />
              </div>
            </div>
          </div>
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
