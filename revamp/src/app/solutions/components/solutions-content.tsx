"use client";

import { useState } from "react";
import { IndustryFilters } from "@/components/industry-filters";
import type { CategoryId } from "@/data/categories";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { contact } from "@/config/variables";
import { SearchTrigger } from "@/components/search/solution-search";
import { SolutionBanner } from "@/app/solutions/components/solution-banner";
import { CatalogueGrid } from "@/app/solutions/components/catalogue-grid";
import { buttonVariants } from "@/components/ui/button";
import { LIGHT_BAND, SHELL, T_BODY, T_HEADING, T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { products, DELIVERY_DAYS } from "@/data/products";
import { catalogue, catalogueIndustries } from "@/data/catalogue";

export function SolutionsContent() {
  const [selected, setSelected] = useState<CategoryId[]>([]);
  const toggle = (id: CategoryId) => setSelected((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  const clear = () => setSelected([]);
  const filteredProducts = selected.length ? products.filter((product) => product.categories.some((id) => selected.includes(id))) : products;
  const filteredCatalogue = selected.length ? catalogue.filter((item) => catalogueIndustries(item).some((id) => selected.includes(id))) : catalogue;
  return (
      <main className={LIGHT_BAND}>
        <div className={cn(SHELL, "pt-6 pb-14 sm:pt-8")}>
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
          <div className="mt-7">
            <p className="mb-3 text-sm font-medium text-slate-600">Browse by industry</p>
            <IndustryFilters selected={selected} onToggle={toggle} onClear={clear} />
            <p role="status" aria-live="polite" className="mt-4 text-sm text-slate-500">{filteredProducts.length + filteredCatalogue.length} solutions{selected.length ? " match your selected industries. Select All industries to browse the full catalogue." : " available. Select one or more industries to narrow the list."}</p>
          </div>
        </div>

        <section aria-labelledby="featured-solutions-title" className={cn(SHELL, "flex flex-col gap-6 sm:gap-8 lg:gap-10")}>
          <h2 id="featured-solutions-title" className="sr-only">Featured solutions</h2>
          {!filteredProducts.length && <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">No featured solutions match these industries. Check the catalogue below or choose All industries.</p>}
          {filteredProducts.map((product) => (
            <SolutionBanner key={product.id} product={product} />
          ))}
        </section>

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
            {selected.length ? `${filteredCatalogue.length} additional solutions tagged for the selected industries.` : `${catalogue.length} more solutions, including portals, POS, billing, hospital and campus software.`} Ask us about the product that fits your needs.
          </p>

          <div className="mt-12">
            <CatalogueGrid items={filteredCatalogue} />
            {!filteredCatalogue.length && <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600"><p>No additional catalogue products are tagged for these industries.</p><button type="button" onClick={clear} className="mt-3 min-h-11 font-semibold text-blue-700 hover:underline">Browse all industries</button></div>}
          </div>
        </section>

        <div
          className={cn(
            SHELL,
            "mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 py-14 sm:mt-20",
          )}
        >
          <p className="text-[1.0625rem] max-md:text-sm text-slate-600">
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
  );
}
