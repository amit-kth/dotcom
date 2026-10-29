import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Seo } from "@/components/seo";
import { SiteHeader } from "@/components/site-header";
import { CategoryProvider } from "@/components/category-context";
import { SiteFooter } from "@/components/site-footer";
import { SolutionBanner } from "@/components/solution-banner";
import { CatalogueGrid } from "@/components/catalogue-grid";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { products, DELIVERY_DAYS } from "@/data/products";
import { contact } from "@/config/variables";
import { catalogue } from "@/data/catalogue";

/* ============================================================================
   /solutions  —  the whole list
   ----------------------------------------------------------------------------
   PURPOSE: let someone who wants the whole picture see it, without turning the
   homepage into a catalogue.

   Two halves. The five solutions we lead with get the same banner as the
   homepage, in one column and deliberately not sticky: here the visitor came to
   read, so nothing should move under their pointer. Under them, every other
   product the client lists on the old site, as a catalogue with artwork slots
   waiting for renders.

   This page sits on a LIGHT band (`light-band` + `bg-band-solutions`), so every
   text colour here is an `on-light` token; the banners keep their own dark
   surface inside `.banner`.
   ========================================================================== */

export default function SolutionsPage() {
  return (
    <>
      <Seo page="solutions" />

      <CategoryProvider>
        <SiteHeader solid />

        <main className="light-band bg-band-solutions">
          <div className="shell pt-[clamp(4rem,8vw,7rem)] pb-14">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-on-light-soft transition-colors hover:text-on-light"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back
            </Link>

            <h1 className="t-heading mt-6 max-w-[20ch]">
              Everything we have already built.
            </h1>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <p className="t-body max-w-[46ch]">
                Each one can be live in {DELIVERY_DAYS} days. Pick the one that
                fits and ask for a demo.
              </p>
              <Link
                href={contact.contactPath}
                className={cn(buttonVariants({ variant: "secondary", size: "md" }), "group")}
              >
                Book a demo
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            {products.map((product) => (
              <SolutionBanner key={product.id} product={product} />
            ))}
          </div>

          <section className="shell mt-20 sm:mt-28" aria-labelledby="catalogue-title">
            <p className="t-label">Also available</p>
            <h2 id="catalogue-title" className="t-heading mt-4 max-w-[24ch]">
              The rest of the catalogue.
            </h2>
            <p className="t-body mt-4 max-w-[54ch]">
              {catalogue.length} more we have already shipped — portals, POS,
              billing, hospital and campus software. Ask about any of them and we
              will show it running.
            </p>

            <div className="mt-12">
              <CatalogueGrid />
            </div>
          </section>

          <div className="shell mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line py-14 sm:mt-20">
            <p className="text-[1.0625rem] text-on-light-soft">
              Something else in mind? That is a build rather than a solution —
              tell us what you run and we will say which it is.
            </p>
            <Link
              href={contact.contactPath}
              className={cn(buttonVariants({ variant: "primary", size: "md" }), "group")}
            >
              Talk to us
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </main>

        <SiteFooter />
      </CategoryProvider>
    </>
  );
}
