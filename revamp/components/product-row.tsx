import { ArrowUpRight } from "lucide-react";
import { asset } from "@/config/variables";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { DELIVERY_DAYS, type Product } from "@/data/products";
import { categoryLabel } from "@/data/categories";

/* ============================================================================
   ProductRow  —  the single product component in the project
   ----------------------------------------------------------------------------
   One shape, regardless of how many products a category has. There is no
   "featured" variant and no alternating layout, because either would mean a
   second component to build and maintain for 1, 2 or 3 items.

   Reading order matches the decision a visitor makes: what it is, what it
   solves, whether it is ready, then the action.

   The banner is a plain <img> with width/height and lazy loading. No <Image />,
   because the site is a static export.
   ========================================================================== */

type ProductRowProps = {
  product: Product;
  /** 1-based position, shown in the left gutter */
  index: number;
};

export function ProductRow({ product, index }: ProductRowProps) {
  /* links[0].url is empty when the product site is not live yet */
  const primaryLink = product.links.find((link) => link.url);

  return (
    <article className="group relative grid gap-6 border-t border-border py-8 sm:py-10 lg:grid-cols-[3rem_minmax(0,1fr)_minmax(0,0.92fr)] lg:items-start lg:gap-10">
      {/* ------------------------------------------------------- index gutter */}
      <div className="hidden lg:block">
        <span className="text-xs font-semibold tabular-nums tracking-[0.14em] text-muted-foreground/70">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* ------------------------------------------------------------- banner */}
      <div className="relative">
        <div className="overflow-hidden rounded-xl border border-border bg-secondary">
          <img
            src={asset(product.banner)}
            alt={`${product.name} product screen`}
            width={1200}
            height={750}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* --------------------------------------------------------------- copy */}
      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="text-lg font-semibold tracking-[-0.01em] text-foreground">
            {product.name}
          </h3>
          {product.readyToSell && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
              <span
                className="size-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              Ready now
            </span>
          )}
        </div>

        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {/* Outcomes. Three, never a feature dump. */}
        <ul className="mt-4 space-y-1.5">
          {product.outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex items-start gap-2.5 text-sm leading-snug text-foreground/85"
            >
              <span
                className="mt-[0.45rem] size-1 shrink-0 rounded-[1px] bg-primary"
                aria-hidden="true"
              />
              {outcome}
            </li>
          ))}
        </ul>

        {/* Facts: delivery and categories, no price anywhere. */}
        <dl className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-[11px]">
          <div className="flex items-baseline gap-1.5">
            <dt className="font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Delivery
            </dt>
            <dd className="font-semibold text-foreground">{DELIVERY_DAYS} days</dd>
          </div>
          <div className="flex items-baseline gap-1.5">
            <dt className="font-medium uppercase tracking-[0.1em] text-muted-foreground">
              For
            </dt>
            <dd className="font-medium text-foreground">
              {product.categories.map(categoryLabel).join(", ")}
            </dd>
          </div>
        </dl>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <RequestDemoDialog
            product={product.name}
            label={product.demoCtaLabel}
            size="sm"
          />
          {primaryLink && (
            <a
              href={primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {primaryLink.title}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
