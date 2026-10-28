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
   Two states, because the homepage opens on a photograph:

   overHero  transparent, white wordmark, white nav. It sits on the hero image
             without putting a bar across the top of it.
   solid     once scrolled past the hero (or on pages without one): the normal
             light bar with the real logo.

   Both states keep the same quiet weight: no accent colour, no underline
   animation, nothing that competes with the selector panel below.
   ========================================================================== */

type SiteHeaderProps = {
  /** true on pages that open with a dark hero image */
  overHero?: boolean;
};

const NAV = [
  { label: "Systems", href: "/solutions" },
  { label: "How it works", href: "/#process" },
  { label: "Contact", href: "/#contact" },
] as const;

export function SiteHeader({ overHero = false }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
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

  const inverted = overHero && !scrolled && !open;

  return (
    <header
      className={cn(
        "z-40 transition-colors duration-300",
        /* On a page that opens with a photograph the header is taken out of
           flow entirely. That is the only way the image can sit behind it:
           a sticky header keeps its 64px of real estate, and the hero below it
           can never reach up into that space without being clipped. */
        overHero ? "fixed inset-x-0 top-0" : "sticky top-0",
        inverted
          ? "border-b border-white/10 bg-transparent"
          : "border-b border-border bg-background/85 backdrop-blur-md",
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
              className={cn(
                "h-6 w-auto transition-[filter] duration-300",
                inverted && "brightness-0 invert",
              )}
            />
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-[0.8125rem] font-medium transition-colors duration-200",
                      inverted
                        ? "text-white/70 hover:text-white"
                        : "text-muted-foreground hover:text-foreground",
                    )}
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
                variant={inverted ? "onInk" : "default"}
              />
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "flex size-10 items-center justify-center rounded-lg border md:hidden",
                inverted
                  ? "border-white/25 text-white"
                  : "border-border text-foreground",
              )}
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
