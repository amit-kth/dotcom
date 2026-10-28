"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import {
  FeatureCard,
  NoSolutions,
  SolutionCard,
} from "@/components/solution-card";
import { ProductVisual } from "@/components/product-visual";
import { categories, categoryLabel, type CategoryId } from "@/data/categories";
import {
  availableProducts,
  products,
  productsInCategory,
} from "@/data/products";
import { counters } from "@/data/site-content";
import { cn } from "@/lib/utils";

/* ============================================================================
   HomeSolutions  —  the dark hero and the product list, as one island
   ----------------------------------------------------------------------------
   The chips live in the hero (they must be visible without scrolling) and they
   also drive the list below, so the state has exactly one owner. Everything
   outside this file is a server component.

   The hero is the page's only full-bleed dark block at the top, which is what
   gives the site a first impression instead of a white sheet.
   ========================================================================== */

const FLAGSHIP_ID = "ai-calling-agents";
const VISUAL = { variant: "dashboard" as const, accent: "red" as const };

export function HomeSolutions() {
  const [selected, setSelected] = useState<CategoryId | null>(null);

  const visible = useMemo(
    () => (selected ? productsInCategory(selected) : availableProducts),
    [selected],
  );

  const featured = visible.find((p) => p.id === FLAGSHIP_ID);
  const rest = visible.filter((p) => p.id !== FLAGSHIP_ID);
  const activeLabel = selected ? categoryLabel(selected) : null;

  return (
    <>
      {/* ================================================== 1. the opening ==== */}
      <section className="surface-ink relative overflow-hidden" aria-labelledby="hero-title">
        <div aria-hidden="true" className="grid-veil absolute inset-0" />

        <div className="shell relative">
          <div className="pt-10 pb-5 lg:pt-12">
            <p className="inline-flex items-center gap-2 rounded-full border border-line-on-ink bg-white/5 px-3 py-1.5 text-[0.6875rem] font-medium text-ink-foreground/80">
              <span className="size-1.5 rounded-full bg-amber" aria-hidden="true" />
              Software we have already built
            </p>

            {/* Full width, one column. In a half-width column this headline
                needed 700px at 64px and ran into the mockup beside it. Full
                width it wraps on its own, at every desktop size, and the
                mockup sits below the fold of this block instead of colliding
                with the type. */}
            <h1
              id="hero-title"
              className="display mt-6 text-ink-foreground"
            >
              Software your business can run in{" "}
              <span className="text-amber">15 days</span>.
            </h1>
          </div>

          <div className="grid gap-10 pb-10 lg:grid-cols-[1fr_1.02fr] lg:items-center lg:gap-14">
            <div>
              <p className="lead text-ink-muted">
                Pick a system, and we move your data across, put your branding on
                it and train your team. No rebuild, no six month project.
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                <RequestDemoDialog
                  label="Book a 20-minute walkthrough"
                  size="lg"
                />
                <a
                  href="#solutions"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink-foreground transition-colors hover:text-amber"
                >
                  See the systems
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>

              <dl className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line-on-ink pt-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-amber" aria-hidden="true" />
                  <dt className="sr-only">Appraisal</dt>
                  <dd className="text-[0.8125rem] font-medium text-ink-foreground/80">
                    CMMI Level 3
                  </dd>
                </div>
                <div className="text-[0.8125rem] text-ink-muted">
                  <dt className="sr-only">Projects delivered</dt>
                  <dd>
                    <span className="font-semibold text-ink-foreground">
                      {counters[0].value}+
                    </span>{" "}
                    projects
                  </dd>
                </div>
                <div className="text-[0.8125rem] text-ink-muted">
                  <dt className="sr-only">Clients</dt>
                  <dd>
                    <span className="font-semibold text-ink-foreground">
                      {counters[2].value}+
                    </span>{" "}
                    clients
                  </dd>
                </div>
              </dl>
            </div>

            {/* On phones this is the space that keeps the chips in the first
                screen, which is why it is not rendered there. */}
            <div className="relative hidden lg:block lg:max-w-[30rem] lg:justify-self-end">
              <div className="hero-glow relative">
                <div className="overflow-hidden rounded-xl border border-white/12 bg-ink-raised shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                    <span className="size-2 rounded-full bg-white/20" />
                    <span className="size-2 rounded-full bg-white/20" />
                    <span className="size-2 rounded-full bg-white/20" />
                    <span className="ml-3 text-[0.625rem] text-ink-muted">
                      AI calling agents
                    </span>
                  </div>
                  <ProductVisual
                    variant={VISUAL.variant}
                    accent={VISUAL.accent}
                    className="block w-full"
                    label="AI calling agents dashboard"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------- the one question */}
          <div className="border-t border-line-on-ink py-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="text-sm font-semibold text-ink-foreground">
                What does your business do?
              </p>
              <p className="text-[0.75rem] text-ink-muted">
                Pick one to narrow the list
              </p>
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
                      "inline-flex h-10 items-center rounded-full border px-4 text-[0.8125rem] font-medium transition-all duration-200",
                      active
                        ? "border-amber bg-amber text-ink"
                        : "border-white/15 text-ink-foreground/80 hover:border-white/35 hover:bg-white/5",
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

      {/* ================================================ 2. the systems ==== */}
      <section
        id="solutions"
        aria-labelledby="solutions-title"
        className="surface-cream scroll-mt-[4.5rem]"
      >
        <div className="shell band-sm">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div>
                <p className="eyebrow">The systems</p>
                <h2 id="solutions-title" className="title-section mt-3">
                  {activeLabel
                    ? `What we have for ${activeLabel.toLowerCase()}`
                    : "Already built, already running"}
                </h2>
                <p className="body dim mt-3 measure">
                  {activeLabel
                    ? `Every system below is configured for you and live in 15 days.`
                    : "Each one is installed with your data and your branding. Nothing is built from scratch."}
                </p>
              </div>

              {selected ? (
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="inline-flex h-9 items-center rounded-full border border-foreground/20 px-3.5 text-[0.8125rem] font-medium transition-colors hover:bg-foreground hover:text-cream"
                >
                  Show all
                </button>
              ) : (
                <Link
                  href="/solutions"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                >
                  All {products.length} systems
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </div>
          </Reveal>

          <p role="status" aria-live="polite" className="sr-only">
            {visible.length} systems shown
            {activeLabel ? ` for ${activeLabel}` : ""}
          </p>

          {visible.length > 0 ? (
            <div className="mt-9 space-y-5">
              {featured && (
                <Reveal>
                  <FeatureCard product={featured} />
                </Reveal>
              )}

              {rest.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  {rest.map((product, i) => (
                    <Reveal key={product.id} delay={i * 40}>
                      <SolutionCard product={product} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8">
              <NoSolutions label={activeLabel ?? "that industry"} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
