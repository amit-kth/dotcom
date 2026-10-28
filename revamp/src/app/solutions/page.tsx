import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Seo } from "@/components/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SolutionCard } from "@/components/solution-card";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { products } from "@/data/products";

/* ============================================================================
   /solutions  —  the full list
   ----------------------------------------------------------------------------
   The homepage shows the five we install without a scoping call. This page is
   where the rest lives, split by why it exists rather than by a sales status:

     "Available to install"  — built, configured, in production
     "Built for one client"  — shipped for a specific customer, adaptable

   Both groups use the same card, so nothing here looks like a special offer.
   ========================================================================== */

export default function SolutionsPage() {
  const available = products.filter((p) => p.availableNow);
  const bespoke = products.filter((p) => !p.availableNow);

  return (
    <>
      <Seo page="solutions" />
      <SiteHeader />

      <main>
        <header className="surface-paper">
          <div className="shell pt-10 pb-10 sm:pt-14">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Back
            </Link>

            <h1 className="display mt-6 max-w-[20ch] text-[clamp(2.25rem,4.4vw,3.5rem)]">
              Everything we have already built.
            </h1>
            <p className="lead dim measure mt-4">
              {products.length} systems. Five install straight away; the rest
              were built for one client and can be adapted for you.
            </p>
          </div>
        </header>

        <section
          aria-labelledby="available-title"
          className="surface-paper border-t border-border"
        >
          <div className="shell pb-14 pt-10 sm:pt-12">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
              <h2 id="available-title" className="title-section">
                Available to install
              </h2>
              <p className="meta dim">Live in 15 days, with your data</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {available.map((product) => (
                <SolutionCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="bespoke-title"
          className="surface-sand"
        >
          <div className="shell band-sm">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
              <h2 id="bespoke-title" className="title-section">
                Built for one client
              </h2>
              <p className="meta dim">
                In production elsewhere; adaptable for you
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {bespoke.map((product) => (
                <SolutionCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="surface-ink">
          <div className="shell band-sm">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <h2 className="title-section max-w-[24ch]">
                  Nothing here quite fits?
                </h2>
                <p className="body dim measure-tight mt-3">
                  We have shipped 1,549 projects. Tell us the problem and we will
                  say whether we have solved it before.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <RequestDemoDialog label="Talk to us" variant="onInk" />
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-foreground hover:text-white"
                >
                  Send an enquiry
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
