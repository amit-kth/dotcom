import { ArrowUpRight } from "lucide-react";
import { asset } from "@/config/variables";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { categoryLabel } from "@/data/categories";
import { DELIVERY_DAYS, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

/* ============================================================================
   SolutionCard + FeatureCard
   ----------------------------------------------------------------------------
   A card carries four things and nothing else: what it is, what it does, two
   outcomes, and how to act. No price, no badge of availability, no index
   number in a gutter, no full-bleed product photo. Those four things are what
   made the first version read like a shop listing.

   The two variants exist so the grid never has an orphan row: the flagship is
   a wide card at the top of the section, the rest are a 2 x 2 grid.
   ========================================================================== */

function Outcomes({ items, onInk }: { items: string[]; onInk?: boolean }) {
  return (
    <ul className="mt-5 space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "flex items-start gap-2.5 text-[0.8125rem] leading-snug",
            onInk ? "text-ink-foreground/85" : "text-foreground/80",
          )}
        >
          <span
            aria-hidden="true"
            className="mt-[0.5rem] h-px w-3 shrink-0 bg-primary"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Actions({ product }: { product: Product }) {
  const link = product.links.find((entry) => entry.url);

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
      <RequestDemoDialog
        product={product.name}
        label={product.demoCtaLabel}
        variant="link"
        className="h-auto p-0 text-[0.8125rem] font-semibold text-primary hover:no-underline"
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
  );
}

/* ------------------------------------------------------------------ card */

export function SolutionCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-border bg-background p-6 transition-all duration-200 hover:border-foreground/20 hover:shadow-[0_18px_40px_-28px_hsl(var(--ink)/0.35)] sm:p-7">
      <p className="meta font-semibold uppercase tracking-[0.14em] text-primary">
        {product.categories.map(categoryLabel).join(" · ")}
      </p>

      <h3 className="title-card mt-3">{product.name}</h3>

      <p className="body dim mt-2">{product.description}</p>

      <Outcomes items={product.outcomes.slice(0, 2)} />

      <div className="mt-auto">
        <Actions product={product} />
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- feature */

export function FeatureCard({ product }: { product: Product }) {
  return (
    <article className="grid overflow-hidden rounded-xl border border-border bg-background lg:grid-cols-[1.05fr_0.95fr]">
      <div className="order-2 flex flex-col justify-center p-6 sm:p-9 lg:order-1 lg:py-10">
        <div className="flex items-center gap-3">
          <p className="meta font-semibold uppercase tracking-[0.14em] text-primary">
            {product.categories.map(categoryLabel).join(" · ")}
          </p>
          <span aria-hidden="true" className="h-px w-6 bg-border" />
          <p className="meta dim">Live in {DELIVERY_DAYS} days</p>
        </div>

        <h3 className="title-section mt-4 text-[clamp(1.5rem,2.2vw,2rem)]">
          {product.name}
        </h3>

        <p className="body dim measure mt-3">{product.description}</p>

        <Outcomes items={product.outcomes} />

        <div className="mt-7">
          <Actions product={product} />
        </div>
      </div>

      <div className="order-1 border-b border-border bg-sand lg:order-2 lg:border-b-0 lg:border-l">
        <img
          src={asset(product.banner)}
          alt={`${product.name} product screen`}
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          className="h-full max-h-[22rem] w-full object-cover"
        />
      </div>
    </article>
  );
}

/* -------------------------------------------------------------- empty state */

export function NoSolutions({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border px-6 py-14 text-center">
      <p className="title-card">Nothing listed for {label} yet</p>
      <p className="body dim mx-auto mt-2 measure-tight">
        We have built more than we list here. Tell us what you run and we will
        tell you honestly whether we have done it before.
      </p>
      <div className="mt-6 flex justify-center">
        <RequestDemoDialog
          label="Talk to us"
          variant="outline"
          size="sm"
        />
      </div>
    </div>
  );
}
