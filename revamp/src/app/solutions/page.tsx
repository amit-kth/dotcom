import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Seo } from "@/components/seo";
import { SiteHeader } from "@/components/site-header";
import { CategoryProvider } from "@/components/category-context";
import { SiteFooter } from "@/components/site-footer";
import { SolutionBanner } from "@/components/solution-banner";
import { products, DELIVERY_DAYS } from "@/data/products";

/* ============================================================================
   /solutions  —  the whole list
   ----------------------------------------------------------------------------
   PURPOSE: let someone who wants the whole picture see it, without turning into
   a catalogue.

   The same banner as the homepage, in one column, and deliberately not
   sticky: here the visitor came to read, so nothing should move under their
   pointer.
   ========================================================================== */

export default function SolutionsPage() {
  return (
    <>
      <Seo page="solutions" />

      <CategoryProvider>
        <SiteHeader />

        <main className="bg-band-solutions">
          <div className="shell pt-[clamp(4rem,8vw,7rem)] pb-14">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-on-dark-soft transition-colors hover:text-on-dark"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back
            </Link>

            <h1 className="t-display mt-6 max-w-[18ch]">
              Everything we have already built.
            </h1>
            <p className="t-body mt-6">
              Each one can be live in {DELIVERY_DAYS} days. Pick the one that
              fits and ask for a demo.
            </p>
          </div>

          <div className="flex flex-col">
            {products.map((product) => (
              <SolutionBanner key={product.id} product={product} />
            ))}
          </div>

          <div className="shell py-14">
            <p className="text-[1.0625rem] text-on-dark-soft">
              Something else in mind? That is a build rather than a solution —
              tell us what you run and we will say which it is.
            </p>
          </div>
        </main>

        <SiteFooter />
      </CategoryProvider>
    </>
  );
}
