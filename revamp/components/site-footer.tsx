import Link from "next/link";
import { asset, contact, site } from "@/config/variables";
import { categories } from "@/data/categories";

/* ============================================================================
   SiteFooter
   ----------------------------------------------------------------------------
   Company facts only: the legal name, the three contact channels and the
   category links that will become real routes in phase 2. No newsletter box, no
   social row full of icons that go nowhere.
   ========================================================================== */

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* ---------------------------------------------------------- brand */}
          <div>
            <img
              src={asset("logo/logo.png")}
              alt={site.name}
              width={274}
              height={72}
              className="h-7 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Ready-made software from a team that has shipped 1,549 projects.
              Part of {site.legalName}.
            </p>
          </div>

          {/* ----------------------------------------------------- categories */}
          <nav aria-label="Industries">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Industries
            </h2>
            <ul className="mt-4 space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  {/* Phase 2 turns these into /fintech, /logistics and so on.
                      Until those routes exist they point at the homepage filter. */}
                  <Link
                    href="/#industry-question"
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* -------------------------------------------------------- contact */}
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${contact.emails.sales}`}
                  className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {contact.emails.sales}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.emails.general}`}
                  className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {contact.emails.general}
                </a>
              </li>
              {contact.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            &copy; {site.founded} to {new Date().getFullYear()} {site.legalName}.
            All rights reserved.
          </p>
          <Link
            href="/solutions"
            className="text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            All solutions
          </Link>
        </div>
      </div>
    </footer>
  );
}
