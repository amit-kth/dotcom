import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Seo } from "@/lib/seo";
import { metadata, contact } from "@/config/variables";
import { buttonVariants } from "@/components/ui/button";
import { SHELL } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** The landing page for products still in development. One line, centred,
 *  nothing else: the catalogue keeps the cards, this page just says when. */
export default function ComingSoonPage() {
  return (
    <>
      <Seo {...metadata.comingSoon} />
      <main className="flex min-h-[calc(100svh-var(--header-h))] flex-col bg-slate-50">
        <div className={cn(SHELL, "pt-6 sm:pt-8")}>
          <Link
            href="/solutions/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to All solutions
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 pb-[clamp(4rem,10vw,8rem)]">
          <div className="flex max-w-[46rem] flex-col items-center text-center">
            <p className="text-[0.8125rem] max-md:text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Coming soon
            </p>
            <h1 className="mt-5 text-[clamp(2.75rem,9vw,6.5rem)] max-md:text-[clamp(2.5rem,13vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-slate-950">
              Coming Soon
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.0625rem] max-md:text-[0.9375rem] leading-relaxed text-slate-600">
              This product is still in development. Tell us what you need and we
              will let you know as soon as it is ready.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={contact.contactPath} className={buttonVariants()}>
                Contact us
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/solutions/"
                className={buttonVariants({ variant: "secondary" })}
              >
                See all solutions
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
