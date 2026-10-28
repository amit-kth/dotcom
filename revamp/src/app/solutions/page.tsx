import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Seo } from "@/components/seo";
import { SiteHeader } from "@/components/site-header";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { categories, categoryLabel } from "@/data/categories";
import { products, DELIVERY_DAYS } from "@/data/products";

/* ============================================================================
   /solutions  —  the full list
   ----------------------------------------------------------------------------
   PURPOSE: let someone who wants the whole picture see it, without turning
   into a catalogue page.

   Grouped by the industry a visitor already recognises, not by a sales status.
   Two columns, flat rows on the band, no cards inside cards. This page keeps
   the homepage's language: solutions, one CTA, no prices.

   Step 4 of the rebuild refines this page (grouping, per-item CTA placement);
   it exists now so the "View all solutions" link has somewhere real to go.
   ========================================================================== */

export default function SolutionsPage() {
  return (
    <>
      <Seo page="solutions" />
      <SiteHeader />

      <main className="bg-band-solutions">
        <div className="shell band">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-on-dark-soft transition-colors hover:text-on-dark"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Link>

          <h1 className="t-display mt-8 max-w-[18ch]">
            Everything we have already built.
          </h1>
          <p className="t-body mt-6">
            Each of these can be live in {DELIVERY_DAYS} days. Pick your industry
            and ask for a demo of the one that fits.
          </p>

          <div className="mt-16 space-y-20">
            {categories.map((category) => {
              const matches = products.filter((product) =>
                product.categories.includes(category.id),
              );
              if (!matches.length) return null;

              return (
                <section key={category.id} aria-labelledby={category.id}>
                  <h2
                    id={category.id}
                    className="t-heading text-[clamp(1.75rem,3vw,2.5rem)]"
                  >
                    {categoryLabel(category.id)}
                  </h2>

                  <ul className="mt-8 divide-y divide-border border-y border-border">
                    {matches.map((product) => (
                      <li
                        key={product.id}
                        className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="max-w-[52ch]">
                          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-on-dark">
                            {product.name}
                          </h3>
                          <p className="mt-2 text-on-dark-soft">
                            {product.description}
                          </p>
                        </div>
                        <div className="shrink-0">
                          <RequestDemoDialog
                            product={product.name}
                            label="Request a demo"
                            variant="onInk"
                            size="sm"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
