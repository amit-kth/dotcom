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
   A permanent dark bar. It matches the ink hero, so the page opens as one
   designed block rather than a white strip on top of a dark one, and it keeps
   the brand consistent on the lighter /solutions page.

   The logo file is dark artwork, so it is inverted to a white wordmark here.
   That is the one place a filter is used, and it is cheaper than maintaining a
   second logo file.
   ========================================================================== */

const NAV = [
  { label: "Systems", href: "/solutions" },
  { label: "How it works", href: "/#process" },
  { label: "Contact", href: "/#contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
        "surface-ink sticky top-0 z-40 transition-shadow duration-200",
        scrolled && "border-b border-line-on-ink",
        open && "border-b border-line-on-ink",
      )}
    >
      <div className="shell">
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <img
              src={asset("logo/logo.png")}
              alt={site.name}
              width={274}
              height={72}
              className="h-7 w-auto brightness-0 invert"
            />
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[0.8125rem] font-medium text-ink-foreground/65 transition-colors duration-200 hover:text-ink-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <RequestDemoDialog
                size="sm"
                label="Book a walkthrough"
                variant="onInk"
              />
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 items-center justify-center rounded-lg border border-line-on-ink text-ink-foreground md:hidden"
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

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line-on-ink md:hidden"
      >
        <nav aria-label="Mobile" className="shell py-3">
          <ul>
            {NAV.map((item) => (
              <li
                key={item.label}
                className="border-b border-line-on-ink last:border-0"
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 text-sm font-medium text-ink-foreground"
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
