import Link from "next/link";
import { asset, contact, site } from "@/config/variables";
import { categories } from "@/data/categories";

/* ============================================================================
   SiteFooter
   ----------------------------------------------------------------------------
   Continues the contact band rather than starting a new one, but is separated
   by a hairline and a darker wash, because two identical navy blocks in a row
   read as one block.

   The logo is the real logo, knocked out to white — the file is dark artwork,
   so on this surface it needs inverting rather than replacing.
   ========================================================================== */

export function SiteFooter() {
  return (
    <footer className="scene scene--footer">
      <div className="shell scene-inner">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <img
              src={asset("logo/logo.png")}
              alt={site.name}
              width={274}
              height={72}
              className="h-7 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-relaxed text-white/60">
              Ready-made software, installed and supported by the team that
              built it.
            </p>
            <a
              href="https://kriscent.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-[0.9375rem] font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Custom development at kriscent.in
            </a>
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
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
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
          <p className="meta text-ink-muted">
            Ready-made software · {contact.locality}
          </p>
        </div>
      </div>
    </footer>
  );
}
