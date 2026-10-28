"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { asset, site } from "@/config/variables";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { cn } from "@/lib/utils";

/* ============================================================================
   SiteHeader
   ----------------------------------------------------------------------------
   Three links and one action. A header with seven links is a header nobody
   reads; these three are the only destinations that exist.

   It sits on the paper surface and only changes twice: a hairline appears once
   the page has scrolled, and the row gets slightly shorter. No colour inversion,
   no logo swap, no animation.
   ========================================================================== */

const NAV = [
  { label: "Solutions", href: "/solutions" },
  { label: "How it works", href: "/#process" },
  { label: "Contact", href: "/#contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-background/95 backdrop-blur-sm transition-colors duration-200",
        scrolled || open ? "border-b border-border" : "border-b border-transparent",
      )}
    >
      <div className="shell">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="shrink-0 rounded-sm"
          >
            <img
              src={asset("logo/logo.png")}
              alt={site.name}
              width={274}
              height={72}
              className="h-7 w-auto"
            />
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="rounded-sm text-[0.8125rem] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <RequestDemoDialog size="sm" label="Book a walkthrough" />
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-border md:hidden">
        <nav aria-label="Mobile" className="shell py-3">
          <ul>
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-border last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 text-sm font-medium text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-3 sm:hidden">
            <RequestDemoDialog label="Book a walkthrough" className="w-full" />
          </div>
        </nav>
      </div>
    </header>
  );
}
