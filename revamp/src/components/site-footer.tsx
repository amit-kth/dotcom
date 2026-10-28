import Link from "next/link";
import { site } from "@/config/variables";
import { categories } from "@/data/categories";

/* ============================================================================
   SiteFooter
   ----------------------------------------------------------------------------
   Continues the contact band rather than starting a new one, so the page ends
   on one dark block instead of two. No contact details here: they live one
   section above, and repeating them is how footers become noise.

   The logo is a wordmark, not the image: the brand file is dark artwork, and on
   this surface it would disappear.
   ========================================================================== */

export function SiteFooter() {
  return (
    <footer className="surface-ink border-t border-line-on-ink">
      <div className="shell">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold tracking-[-0.02em]">
              {site.name}
            </p>
            <p className="body dim measure-tight mt-3">
              Ready-made software, installed and supported by the team that
              built it.
            </p>
          </div>

          <nav aria-label="Site">
            <h2 className="meta font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Site
            </h2>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "All solutions", href: "/solutions" },
                { label: "How it works", href: "/#process" },
                { label: "Contact", href: "/#contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-foreground/80 transition-colors duration-200 hover:text-ink-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries">
            <h2 className="meta font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Industries
            </h2>
            <ul className="mt-4 space-y-2.5">
              {categories.map((category) => (
                <li key={category.id}>
                  {/* Phase 2 gives each industry its own route. Until then this
                      lands on the hero chips, which is the real filter. */}
                  <Link
                    href="/#solutions"
                    className="text-sm text-ink-foreground/80 transition-colors duration-200 hover:text-ink-foreground"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-on-ink py-6">
          <p className="meta text-ink-muted">
            &copy; {site.founded} to {new Date().getFullYear()} {site.legalName}
          </p>
          <p className="meta text-ink-muted">CMMI Level 3</p>
        </div>
      </div>
    </footer>
  );
}
