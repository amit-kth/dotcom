import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Seo } from "@/lib/seo";
import { SolutionBanner } from "@/app/solutions/components/solution-banner";
import { CatalogueGrid } from "@/app/solutions/components/catalogue-grid";
import { buttonVariants } from "@/components/ui/button";
import { LIGHT_BAND, SHELL, T_BODY, T_HEADING, T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { products, DELIVERY_DAYS } from "@/data/products";
import { contact } from "@/config/variables";
import { catalogue } from "@/data/catalogue";

/* ============================================================================
   /solutions ,  the whole list
   ----------------------------------------------------------------------------
   PURPOSE: let someone who wants the whole picture see it, without turning the
   homepage into a catalogue.

   Two halves. The five solutions we lead with get the same banner as the
   homepage, in one column and deliberately not sticky: here the visitor came to
   read, so nothing should move under their pointer. Under them, every other
   product the client lists on the old site, as a catalogue with artwork slots
   waiting for renders.

   This page sits on a LIGHT band (the `LIGHT_BAND` utility string), so every
   text colour here is an `on-light` token; each banner brings its own dark
   surface with it.
   ========================================================================== */

export default function SolutionsPage() {
  return (
    <>
      <Seo page="solutions" />

      <main className={LIGHT_BAND}>
        <div className={cn(SHELL, "pt-[clamp(4rem,8vw,7rem)] pb-14")}>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-slate-600 transition-colors hover:text-slate-950"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Link>

          <h1 className={cn(T_HEADING, "mt-6 max-w-[20ch]")}>
            Everything we have already built.
          </h1>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <p className={cn(T_BODY, "max-w-[46ch] text-slate-600")}>
              Each one can be live in {DELIVERY_DAYS} days. Pick the one that
              fits and ask for a demo.
            </p>
            <Link
              href={contact.contactPath}
              className={cn(
                buttonVariants({ variant: "secondary", size: "md" }),
                "group",
              )}
            >
              Contact us
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

        <section
          className={cn(SHELL, "mt-20 sm:mt-28")}
          aria-labelledby="catalogue-title"
        >
          <p className={cn(T_LABEL, "text-slate-500")}>Also available</p>
          <h2
            id="catalogue-title"
            className={cn(T_HEADING, "mt-4 max-w-[24ch]")}
          >
            The rest of the catalogue.
          </h2>
          <p className={cn(T_BODY, "mt-4 max-w-[54ch] text-slate-600")}>
            {catalogue.length} more we have already shipped, portals, POS,
            billing, hospital and campus software. Ask about any of them and we
            will show it running.
          </p>

          <div className="mt-12">
            <CatalogueGrid />
          </div>
        </section>

        <div
          className={cn(
            SHELL,
            "mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 py-14 sm:mt-20",
          )}
        >
          <p className="text-[1.0625rem] text-slate-600">
            Something else in mind? That is a build rather than a solution,
            tell us what you run and we will say which it is.
          </p>
          <Link
            href={contact.contactPath}
            className={cn(
              buttonVariants({ variant: "primary", size: "md" }),
              "group",
            )}
          >
            Contact us
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </main>
    </>
  );
}
