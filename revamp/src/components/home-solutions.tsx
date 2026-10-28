"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  LayoutGrid,
  type LucideIcon,
  Sparkles,
  Truck,
} from "lucide-react";
import { asset } from "@/config/variables";
import { Reveal } from "@/components/ui/reveal";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import {
  FeatureCard,
  NoSolutions,
  SolutionCard,
} from "@/components/solution-card";
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

  const visible = useMemo(
    () => (selected ? productsInCategory(selected) : availableProducts),
    [selected],
  );

  const featured = visible.find((p) => p.id === "ai-calling-agents");
  const rest = visible.filter((p) => p.id !== "ai-calling-agents");
  const activeLabel = selected ? categoryLabel(selected) : null;

  const choose = (id: CategoryId | null) => {
    setSelected(id);
    /* The pick has to do something visible, or the tiles are just decoration. */
    window.requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      {/* ================================================== 1. the opening ==== */}
      <section
        className="surface-ink hero-photo relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden"
        aria-labelledby="hero-title"
      >
        {/* The photo is atmosphere: it is desaturated and pushed behind the
            duotone in globals.css, so what the visitor sees first is the
            selector panel, not the people in the frame. It is also a
            placeholder: replace with a real photograph of this team. */}
        <img
          src={asset("hero/hero-team.jpg")}
          alt=""
          aria-hidden="true"
          width={1584}
          height={672}
          fetchPriority="high"
          className="hero-photo-img absolute inset-0 -z-10 size-full object-cover object-center"
        />

        <div className="shell hero-body relative z-10">
          <div className="mx-auto max-w-[46rem] text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-foreground/75 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-peri" aria-hidden="true" />
              Ready-made software
            </p>

            <h1 id="hero-title" className="display hero-title text-white">
              Software your business can run in{" "}
              {/* nowrap: the phrase is the promise, it must not break as
                  "…in 15 / days." on a narrow window. */}
              <span className="whitespace-nowrap text-peri">15 days</span>.
            </h1>

            <p className="lead hero-lead mx-auto max-w-[32rem] text-ink-foreground/70">
              Pick your industry and we will show you what we have already
              built, installed and running.
            </p>
          </div>

          {/* ============ the control. the most important object on the page. */}
          <div className="hero-panel mx-auto max-w-[52rem]">
            <div className="rounded-[1.25rem] border border-white/15 bg-card p-4 shadow-[0_2px_4px_oklch(13.23%_0.0756_277.93/0.2),0_40px_90px_-30px_oklch(0%_0_0/0.85)] sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                <p className="text-[0.9375rem] font-semibold text-foreground">
                  What does your business do?
                </p>
                <p className="text-[0.75rem] font-medium text-muted-foreground">
                  Choose one
                </p>
              </div>

              <div
                role="group"
                aria-label="Industry"
                className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4"
              >
                {categories.map((category) => {
                  const Icon = ICONS[category.id];
                  const count = productsInCategory(category.id).length;
                  const active = selected === category.id;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => choose(active ? null : category.id)}
                      className={cn(
                        "hero-tile group relative flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-200",
                        "focus-visible:outline-2 focus-visible:outline-offset-2",
                        active
                          ? "border-primary bg-primary text-primary-foreground shadow-[0_10px_24px_-12px_oklch(49.03%_0.2158_264.38/0.9)]"
                          : "border-border bg-background text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/40 hover:shadow-[0_8px_20px_-14px_oklch(13.23%_0.0756_277.93/0.35)]",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors md:size-9",
                          active
                            ? "bg-primary-foreground/15 text-primary-foreground"
                            : "bg-accent text-primary group-hover:bg-primary group-hover:text-primary-foreground",
                        )}
                      >
                        <Icon className="size-[1.05rem]" aria-hidden="true" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.75rem] font-semibold leading-tight md:text-[0.8125rem]">
                          {category.label}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 block text-[0.6875rem] leading-tight",
                            active
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground",
                          )}
                        >
                          {count} {count === 1 ? "system" : "systems"}
                        </span>
                      </span>

                      <ChevronRight
                        className={cn(
                          "size-4 shrink-0 transition-opacity",
                          active
                            ? "opacity-60"
                            : "opacity-0 group-hover:opacity-50",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}

                {/* The eighth tile is the reset. Four per row, two rows, no
                    orphan and no separate "clear" control to hunt for. */}
                <button
                  type="button"
                  aria-pressed={selected === null}
                  onClick={() => choose(null)}
                  className={cn(
                    "hero-tile group relative flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-200",
                    "focus-visible:outline-2 focus-visible:outline-offset-2",
                    selected === null
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_10px_24px_-12px_oklch(49.03%_0.2158_264.38/0.9)]"
                      : "border-dashed border-border bg-background text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/40",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors md:size-9",
                      selected === null
                        ? "bg-primary-foreground/15 text-primary-foreground"
                        : "bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground",
                    )}
                  >
                    <LayoutGrid className="size-[1.05rem]" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.75rem] font-semibold leading-tight md:text-[0.8125rem]">
                      All systems
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block text-[0.6875rem] leading-tight",
                        selected === null
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground",
                      )}
                    >
                      {availableProducts.length} to install
                    </span>
                  </span>
                  <ChevronRight
                    className={cn(
                      "size-4 shrink-0 transition-opacity",
                      selected === null
                        ? "opacity-60"
                        : "opacity-0 group-hover:opacity-50",
                    )}
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Trust, inside the panel and at the bottom of it: still the
                  quietest thing here, but on a surface where 12px grey text is
                  actually readable instead of lost in a photograph. */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-border pt-3.5 text-[0.75rem] text-muted-foreground">
                <span className="font-medium">CMMI Level 3</span>
                <span aria-hidden="true" className="text-border">
                  |
                </span>
                <span>{counters[0].value}+ projects delivered</span>
                <span aria-hidden="true" className="text-border">
                  |
                </span>
                <span>{counters[2].value}+ clients</span>
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
                  {activeLabel ? `${activeLabel} systems` : "What we can install now"}
                </h2>
                <p className="body dim mt-2">
                  {activeLabel
                    ? `What we have already built for ${activeLabel.toLowerCase()}.`
                    : `The ${availableProducts.length} we can install as they are. Pick an industry above to narrow it.`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-[0.75rem] font-medium text-muted-foreground">
                  {visible.length} shown
                </p>
                <Link
                  href="/solutions"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  All {products.length}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </Reveal>

          <p role="status" aria-live="polite" className="sr-only">
            {visible.length} systems shown
            {activeLabel ? ` for ${activeLabel}` : ""}
          </p>

          {visible.length > 0 ? (
            <div className="mt-7 space-y-4">
              {featured && (
                <Reveal>
                  <FeatureCard product={featured} />
                </Reveal>
              )}

              {rest.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {rest.map((product, i) => (
                    <Reveal key={product.id} delay={i * 40}>
                      <SolutionCard product={product} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-7">
              <NoSolutions label={activeLabel ?? "that industry"} />
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4">
            <p className="text-sm text-muted-foreground">
              Not sure which fits? Twenty minutes on a call is usually enough.
            </p>
            <RequestDemoDialog label="Book a walkthrough" size="sm" />
          </div>
        </div>
      </section>
    </>
  );
}
