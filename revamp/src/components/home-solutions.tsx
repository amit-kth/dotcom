"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { asset } from "@/config/variables";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import {
  FeatureCard,
  NoSolutions,
  SolutionCard,
} from "@/components/solution-card";
import { categories, categoryLabel, type CategoryId } from "@/data/categories";
import {
  availableProducts,
  products,
  productsInCategory,
} from "@/data/products";
import { counters } from "@/data/site-content";
import { cn } from "@/lib/utils";

/* ============================================================================
   HomeSolutions  —  the hero and the product list, as one island
   ----------------------------------------------------------------------------
   The chips belong to the hero (a visitor has to see them without scrolling)
   and they also drive the list below it. Splitting those two into separate
   components would mean either duplicating the selection state or lifting it
   into a client wrapper that pulls the whole page client-side. So: one island,
   one piece of state, one owner. Everything above and below it stays a server
   component.

   The selection is deliberately not in the URL. This is a static export, so a
   query string could not be read at build time, and inventing shareable links
   that do not work is worse than having none.
   ========================================================================== */

const FLAGSHIP_ID = "ai-calling-agents";

export function HomeSolutions() {
  const [selected, setSelected] = useState<CategoryId | null>(null);

  const visible = useMemo(
    () => (selected ? productsInCategory(selected) : availableProducts),
    [selected],
  );

  const featured = visible.find((p) => p.id === FLAGSHIP_ID);
  const rest = visible.filter((p) => p.id !== FLAGSHIP_ID);

  const activeLabel = selected ? categoryLabel(selected) : null;
  const total = products.length;
  const heroImage =
    products.find((p) => p.id === FLAGSHIP_ID)?.banner ?? "dummy/banner.webp";

  return (
    <>
      {/* ================================================== 1. the opening ==== */}
      <section className="surface-paper" aria-labelledby="hero-title">
        <div className="shell">
          <div className="grid gap-10 pt-8 sm:pt-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start lg:gap-16 lg:pt-14">
            <div>
              {/* No forced line break: at every desktop width the natural wrap
                  is two lines, because the column is wide enough for the
                  longest line and no wider. */}
              <h1 id="hero-title" className="display">
                Software your business can run in 15 days.
              </h1>

              <p className="lead dim measure mt-5">
                Systems we have already built. We move your data across, put your
                branding on it, and train your team.
              </p>

              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
                <RequestDemoDialog
                  label="Book a 20-minute walkthrough"
                  size="lg"
                  className="w-full sm:w-auto"
                />
                <a
                  href="#solutions"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:text-primary"
                >
                  See what you can switch on
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>

              <p className="meta dim mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 sm:mt-7">
                <span>CMMI Level 3</span>
                <span aria-hidden="true" className="text-border">
                  |
                </span>
                <span>{counters[0].value}+ projects delivered</span>
                <span aria-hidden="true" className="text-border">
                  |
                </span>
                <span>{counters[2].value}+ clients</span>
              </p>
            </div>

            {/* Hidden below lg. On a phone this is the vertical space that keeps
                the industry chips inside the first screen. */}
            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-xl border border-border bg-sand shadow-[0_30px_70px_-42px_hsl(var(--ink)/0.5)]">
                <img
                  src={asset(heroImage)}
                  alt="AI calling agents, in production"
                  width={960}
                  height={600}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <p className="meta dim mt-2.5 text-right">
                AI calling agents, in production
              </p>
            </div>
          </div>

          {/* --------------------------------------------- the one question */}
          <div className="mt-8 border-t border-border pt-5 pb-8 sm:mt-10 sm:pt-6 sm:pb-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="text-sm font-semibold text-foreground">
                What does your business do?
              </p>
              <p className="meta dim">Pick one to narrow the list below</p>
            </div>

            <div
              role="group"
              aria-label="Industry"
              className="mt-4 flex flex-wrap gap-2"
            >
              {categories.map((category) => {
                const active = selected === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected(active ? null : category.id)}
                    className={cn(
                      "inline-flex h-9 items-center rounded-full border px-3.5 text-[0.8125rem] font-medium transition-colors duration-200",
                      active
                        ? "border-ink bg-ink text-ink-foreground"
                        : "border-border bg-background text-foreground hover:border-foreground/30 hover:bg-secondary",
                    )}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================ 2. the solutions ==== */}
      <section
        id="solutions"
        aria-labelledby="solutions-title"
        className="surface-paper scroll-mt-16 border-t border-border"
      >
        <div className="shell pb-16 sm:pb-20">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 pt-10 sm:pt-12">
            <div>
              <h2 id="solutions-title" className="title-section">
                {activeLabel
                  ? `Built for ${activeLabel.toLowerCase()}`
                  : "Already built, already running"}
              </h2>
              <p className="body dim measure mt-2">
                {activeLabel
                  ? `Everything we have for ${activeLabel.toLowerCase()}. Each one installs in 15 days.`
                  : "Choose one, and we install it with your data and your branding. No scoping call, no rebuild."}
              </p>
            </div>

            {selected && (
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-[0.8125rem] font-semibold text-primary underline-offset-4 hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Screen readers hear the outcome of the click, not the whole list. */}
          <p role="status" aria-live="polite" className="sr-only">
            {visible.length} solutions shown
            {activeLabel ? ` for ${activeLabel}` : ""}
          </p>

          {visible.length > 0 ? (
            <div className="mt-8 space-y-4">
              {featured && <FeatureCard product={featured} />}

              {rest.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {rest.map((product) => (
                    <SolutionCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8">
              <NoSolutions label={activeLabel ?? "that industry"} />
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <p className="meta dim">{total} systems built so far.</p>
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:text-primary"
            >
              See all {total}
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
