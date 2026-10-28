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
   Sticky, translucent, and quiet. Two states: resting (taller, no shadow) and
   scrolled (slightly tighter, hairline underneath). The change is 18px of
   height and one border, not a redesign on scroll.

   Mobile: a disclosure panel under the bar. Not a full-screen takeover, because
   there is nothing in it worth a whole screen.
   ========================================================================== */

const NAV = [
  { label: "Solutions", href: "/solutions" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Clients", href: "/#clients" },
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

  /* Escape closes the mobile panel, matching the dialog behaviour. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors duration-200",
        scrolled || open
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
        <div
          className={cn(
            "flex w-full items-center justify-between gap-6 transition-[height] duration-200",
            scrolled ? "h-14" : "h-16 sm:h-[4.5rem]",
          )}
        >
          {/* ---------------------------------------------------------- brand */}
          <Link
            href="/"
            className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            aria-label={`${site.name} home`}
          >
            {/* Real brand asset carried over from the old site. */}
            <img
              src={asset("logo/logo.png")}
              alt={site.name}
              width={274}
              height={72}
              className="h-7 w-auto sm:h-8"
            />
          </Link>

          {/* ------------------------------------------------------ desktop nav */}
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="rounded-sm text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* --------------------------------------------------------- actions */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <RequestDemoDialog size="sm" />
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

      {/* ------------------------------------------------------- mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-border bg-background md:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto w-full max-w-[1200px] px-5 py-4">
          <ul className="divide-y divide-border">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 text-sm font-medium text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-4 sm:hidden">
            <RequestDemoDialog size="default" className="w-full" />
          </div>
        </nav>
      </div>
    </header>
  );
}
