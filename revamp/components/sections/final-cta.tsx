import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { RequestDemoDialog } from "@/components/request-demo-dialog";

/* ============================================================================
   FinalCta
   ----------------------------------------------------------------------------
   Two exits only: talk to a person, or go and look at the rest of the catalogue.
   Anything else here would compete with the single action the page is for.
   ========================================================================== */

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="border-t border-border">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="rounded-2xl bg-foreground px-6 py-10 text-background sm:px-10 sm:py-12">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
              <div className="max-w-xl">
                <h2
                  id="cta-title"
                  className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.12] tracking-[-0.03em]"
                >
                  Not sure which one fits your business?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-background/70">
                  Twenty minutes, screen shared. Tell us what you run today and we
                  will show you the closest thing we have already built.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <RequestDemoDialog
                  label="Book a walkthrough"
                  className="bg-background text-foreground hover:bg-background/90"
                />
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-2 rounded-md border border-background/25 px-5 py-2.5 text-sm font-medium text-background transition-colors duration-200 hover:border-background/60 hover:bg-background/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
                >
                  See all solutions
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
