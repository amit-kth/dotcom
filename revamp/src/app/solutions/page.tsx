import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Seo } from "@/lib/seo";
import { metadata, contact } from "@/config/variables";
import { SearchTrigger } from "@/components/search/solution-search";
import { SolutionBanner } from "@/app/solutions/components/solution-banner";
import { CatalogueGrid } from "@/app/solutions/components/catalogue-grid";
import { buttonVariants } from "@/components/ui/button";
import { LIGHT_BAND, SHELL, T_BODY, T_HEADING, T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { products, DELIVERY_DAYS } from "@/data/products";
import { catalogue } from "@/data/catalogue";

export default function SolutionsPage() {
  return (
    <>
      <Seo {...metadata.solutions} />

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
              <Mail
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
          <SearchTrigger />
        </div>

        <div className={cn(SHELL, "flex flex-col gap-6 sm:gap-8 lg:gap-10")}>
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
            Something else in mind? That is a build rather than a solution, tell
            us what you run and we will say which it is.
          </p>
          <Link
            href={contact.contactPath}
            className={cn(
              buttonVariants({ variant: "primary", size: "md" }),
              "group",
            )}
          >
            Contact us
            <Mail
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </main>
    </>
  );
}
