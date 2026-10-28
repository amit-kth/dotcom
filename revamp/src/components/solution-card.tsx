import { ArrowUpRight } from "lucide-react";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import {
  ProductVisual,
  VISUAL_BY_PRODUCT,
} from "@/components/product-visual";
import { categoryLabel } from "@/data/categories";
import { DELIVERY_DAYS, type Product } from "@/data/products";

/* ============================================================================
   SolutionCard
   ----------------------------------------------------------------------------
   A card is a picture of the product, a name, one sentence, two outcomes and a
   way in. The picture is a real interface mockup, not a grey box: that single
   change is what stops the section reading as a list of links.

   The flagship gets a wider card so the grid never ends on an orphan.
   ========================================================================== */

function Visual({ product }: { product: Product }) {
  const visual = VISUAL_BY_PRODUCT[product.id] ?? {
    variant: "dashboard" as const,
    accent: "red" as const,
  };
  return (
    <ProductVisual
      variant={visual.variant}
      accent={visual.accent}
      className="h-full w-full"
    />
  );
}

function Body({ product }: { product: Product }) {
  const link = product.links.find((entry) => entry.url);

  return (
    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-primary">
        {product.categories.map(categoryLabel).join(" · ")}
      </p>

      <h3 className="mt-2.5 text-[1.25rem] font-semibold leading-tight tracking-[-0.02em]">
        {product.name}
      </h3>

      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      <ul className="mt-4 space-y-1.5">
        {product.outcomes.slice(0, 2).map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-[0.8125rem] leading-snug text-foreground/75"
          >
            <span
              aria-hidden="true"
              className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-amber"
            />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5">
        <RequestDemoDialog
          product={product.name}
          label={product.demoCtaLabel}
          variant="link"
          className="h-auto p-0 text-[0.8125rem] font-semibold"
        />
        {link && (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[0.8125rem] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            {link.title}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}

export function SolutionCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-[0_28px_60px_-38px_hsl(220_48%_7%/0.45)]">
      <div className="border-b border-border bg-secondary/50 p-2.5">
        <div className="aspect-[16/8] overflow-hidden rounded-lg ring-1 ring-black/5">
          <Visual product={product} />
        </div>
      </div>
      <Body product={product} />
    </article>
  );
}

export function FeatureCard({ product }: { product: Product }) {
  return (
    <article className="group grid overflow-hidden rounded-2xl border border-border bg-white transition-shadow duration-300 hover:shadow-[0_34px_70px_-40px_hsl(220_48%_7%/0.45)] lg:grid-cols-[1.02fr_0.98fr]">
      <div className="flex flex-col justify-center p-7 sm:p-9">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary">
            Flagship
          </span>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {product.categories.map(categoryLabel).join(" · ")} · Live in{" "}
            {DELIVERY_DAYS} days
          </p>
        </div>

        <h3 className="mt-4 text-[clamp(1.5rem,2.3vw,2rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
          {product.name}
        </h3>

        <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <ul className="mt-5 space-y-2">
          {product.outcomes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm leading-snug text-foreground/80"
            >
              <span
                aria-hidden="true"
                className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-amber"
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-5">
          <RequestDemoDialog product={product.name} label="See it working" />
          {product.links.find((l) => l.url) && (
            <a
              href={product.links.find((l) => l.url)!.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Product page
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <div className="order-first bg-ink p-3 sm:p-5 lg:order-last">
        <div className="h-full overflow-hidden rounded-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
          <Visual product={product} />
        </div>
      </div>
    </article>
  );
}

export function NoSolutions({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-white/60 px-6 py-16 text-center">
      <p className="text-lg font-semibold">Nothing listed for {label} yet</p>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        We have built more than we list here. Tell us what you run and we will
        tell you honestly whether we have done it before.
      </p>
      <div className="mt-6 flex justify-center">
        <RequestDemoDialog label="Talk to us" variant="outline" size="sm" />
      </div>
    </div>
  );
}
