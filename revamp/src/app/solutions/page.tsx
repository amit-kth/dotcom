import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Seo } from "@/components/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductRow } from "@/components/product-row";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { products } from "@/data/products";

/* ============================================================================
   /solutions  —  the full catalogue
   ----------------------------------------------------------------------------
   Same row component as the homepage, so a product looks identical wherever it
   appears. Two groups only: the ready-to-sell set, and everything else we have
   built for specific clients.

   This page exists so the three "view all solutions" links on the homepage go
   somewhere real. Phase 2 gives each category its own route; this page is the
   honest interim, listing what we actually have.
   ========================================================================== */

export default function SolutionsPage() {
  const ready = products.filter((p) => p.readyToSell);
  const rest = products.filter((p) => !p.readyToSell);

  return (
    <>
      <Seo page="solutions" />
      <SiteHeader />

      <main>
        {/* ------------------------------------------------------- page head */}
        <header className="border-b border-border">
          <div className="mx-auto w-full max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-sm text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Back to home
            </Link>

            <h1 className="mt-6 max-w-3xl text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-foreground">
              Every solution we have already built
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              The ready-to-sell set goes live in 15 days. The rest are systems we
              built for specific clients and can adapt for you.
            </p>
          </div>
        </header>

        {/* ------------------------------------------------------ ready set */}
        <section
          aria-labelledby="ready-title"
          className="mx-auto w-full max-w-[1200px] px-5 sm:px-8"
        >
          <div className="pt-12 sm:pt-16">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              <div>
                <h2
                  id="ready-title"
                  className="text-[clamp(1.35rem,2.2vw,1.9rem)] font-semibold tracking-[-0.025em] text-foreground"
                >
                  Ready to sell now
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Configured for you, live in 15 days.
                </p>
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {ready.length} products
              </p>
            </div>
          </div>

          <div className="mt-8">
            {ready.map((product, i) => (
              <ProductRow key={product.id} product={product} index={i + 1} />
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- the rest */}
        {rest.length > 0 && (
          <section
            aria-labelledby="rest-title"
            className="mx-auto w-full max-w-[1200px] px-5 sm:px-8"
          >
            <div className="pt-14 sm:pt-20">
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <div>
                  <h2
                    id="rest-title"
                    className="text-[clamp(1.35rem,2.2vw,1.9rem)] font-semibold tracking-[-0.025em] text-foreground"
                  >
                    Built for a client, adaptable for you
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Already in production somewhere. We rebrand and reconfigure
                    these rather than start again.
                  </p>
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {rest.length} products
                </p>
              </div>
            </div>

            <div className="mt-8">
              {rest.map((product, i) => (
                <ProductRow key={product.id} product={product} index={i + 1} />
              ))}
            </div>
          </section>
        )}

        {/* --------------------------------------------------------- outro */}
        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.01em] text-foreground">
                  Nothing here fits?
                </h2>
                <p className="mt-1.5 max-w-lg text-sm text-muted-foreground">
                  We have shipped 1,549 custom builds. Tell us the problem and we
                  will tell you whether we have already solved it.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <RequestDemoDialog label="Talk to us" />
                <Link
                  href="/#contact"
                  className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
                >
                  Send an enquiry
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
