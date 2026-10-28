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
   Light, translucent, and deliberately quiet. On the homepage the hero below it
   carries the one control that matters, so the header must not compete: no dark
   bar, no accent colour, no underline animation. It gains a hairline and a
   slight blur once the page moves.
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
    const onScroll = () => setScrolled(window.scrollY > 6);
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
        "sticky top-0 z-40 transition-colors duration-200",
        scrolled || open
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <img
              src={asset("logo/logo.png")}
              alt={site.name}
              width={274}
              height={72}
              className="h-6 w-auto"
            />
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[0.8125rem] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
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
              className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
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
        className="border-t border-border bg-background md:hidden"
      >
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
