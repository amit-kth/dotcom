"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductRow } from "@/components/product-row";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { Reveal } from "@/components/ui/reveal";
import { categories, type CategoryId } from "@/data/categories";
import {
  categoryCounts,
  products,
  readyToSellProducts,
} from "@/data/products";
import { cn } from "@/lib/utils";

/* ============================================================================
   SolutionsExplorer  —  the one interactive idea on the page
   ----------------------------------------------------------------------------
   The visitor picks an industry and the list below changes. Nothing else on the
   page filters, so there is exactly one state object: `selected`.

   THE INVARIANT
   -------------
   The selected chip, the results heading and the rows are all derived from
   `selected` in this one component. They are rendered together, so they cannot
   disagree, which is the bug that made the earlier wireframe wrong.

   NO EMPTY SURPRISES
   ------------------
   Every chip shows its count, computed from the data, so a visitor can see
   before clicking whether a category has anything in it. A category with no
   products still shows a designed state rather than a blank area.

   NO DEAD URLS
   ------------
   The selection is deliberately not in the URL. A static export cannot read
   searchParams, and inventing a query string that the server cannot interpret
   would give us shareable links that do not work. Phase 2 gives each category
   its own real route (/fintech), which is the correct fix.
   ========================================================================== */

type Props = {
  /** Extra classes on the outer wrapper */
  className?: string;
};

export function SolutionsExplorer({ className }: Props) {
  const [selected, setSelected] = useState<CategoryId | null>(null);

  const counts = useMemo(() => categoryCounts(), []);
  const total = products.length;

  const visible = useMemo(() => {
    if (selected) {
      return products
        .filter((p) => p.categories.includes(selected))
        .sort((a, b) => Number(b.readyToSell) - Number(a.readyToSell));
    }
    /* Nothing selected: the ready-to-sell set, which is the whole point of the
       page. Order is the order they are written in the data file. */
    return readyToSellProducts;
  }, [selected]);

  const selectedLabel = selected
    ? categories.find((c) => c.id === selected)?.label
    : null;

  const heading = selectedLabel
    ? `${visible.length} ${visible.length === 1 ? "solution" : "solutions"} for ${selectedLabel}`
    : "Ready to sell now";

  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>
      {/* ==================================================== the question ==== */}
      <section aria-labelledby="industry-question" className="mt-10 sm:mt-12">
        <div className="rounded-2xl border border-border bg-secondary/40 p-5 sm:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2
              id="industry-question"
              className="scroll-mt-24 text-base font-semibold tracking-[-0.01em] text-foreground"
            >
              Which industry are you in?
            </h2>
            <p className="text-xs text-muted-foreground">
              Pick one, the list below updates.
            </p>
          </div>

          <div
            role="group"
            aria-labelledby="industry-question"
            className="mt-5 flex flex-wrap gap-2"
          >
            <Chip
              active={selected === null}
              onClick={() => setSelected(null)}
              label="All ready to sell"
              count={readyToSellProducts.length}
            />
            {categories.map((category) => (
              <Chip
                key={category.id}
                active={selected === category.id}
                onClick={() => setSelected(category.id)}
                label={category.label}
                count={counts[category.id]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================== the results ==== */}
      <section className="mt-14 sm:mt-16">
        {/* Screen readers hear the result of the click, not the whole list. */}
        <p role="status" aria-live="polite" className="sr-only">
          {heading}
        </p>
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-foreground/80 pb-4">
          <div>
            <h2 className="text-[clamp(1.35rem,2.2vw,1.9rem)] font-semibold leading-tight tracking-[-0.025em] text-foreground">
              {heading}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {selected
                ? "Every one of these can be live in 15 days."
                : "The systems we can deliver on our shortest timeline. Pick your industry to see the rest."}
            </p>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {selected ? `${visible.length} shown` : `${readyToSellProducts.length} ready now`}
          </p>
        </div>

        {visible.length > 0 ? (
          <Reveal>
            <div>
              {visible.map((product, i) => (
                <ProductRow key={product.id} product={product} index={i + 1} />
              ))}
            </div>
          </Reveal>
        ) : (
          <EmptyCategory label={selectedLabel ?? "that category"} />
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            Looking for something that is not here? We have built more than the
            catalogue shows.
          </p>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            View all solutions
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ chips */

function Chip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-foreground hover:border-foreground/40 hover:bg-secondary",
      )}
    >
      {label}
      <span
        className={cn(
          "border-l pl-2 text-[11px] font-semibold tabular-nums",
          active
            ? "border-background/30 text-background/80"
            : "border-border text-muted-foreground",
        )}
      >
        {count}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------ empty state */

function EmptyCategory({ label }: { label: string }) {
  return (
    <div className="border-t border-border py-14 text-center">
      <p className="text-base font-semibold text-foreground">
        No ready build for {label} yet
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        That does not mean we have not built one. Tell us what you run and we will
        check our private builds and come back to you.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <RequestDemoDialog label="Talk to us" size="sm" />
        <Link
          href="/solutions"
          className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
        >
          See the whole catalogue
        </Link>
      </div>
    </div>
  );
}
