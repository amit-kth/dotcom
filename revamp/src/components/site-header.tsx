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
   PURPOSE: hold the logo, the section links and one button, and get out of the
   way of the hero.

   Height is fixed at 72px in every state — only the background fades in after
   the first scroll, and it fades with opacity rather than swapping a class, so
   nothing about the layout moves. A header that changes height on scroll is the
   most common cause of layout shift on a landing page.

   The active link follows the section you are looking at, using an
   IntersectionObserver rather than scroll maths, so it stays honest when
   sections change height.
   ========================================================================== */

const NAV = [
  { label: "Solutions", href: "/#solutions", id: "solutions" },
  { label: "How it works", href: "/#delivery", id: "delivery" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Clients", href: "/#clients", id: "clients" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll spy. Sections are observed, not calculated, so a section that
     changes height cannot desynchronise the highlight. */
  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 h-[var(--header-h)]">
      {/* The glass layer is its own element so its opacity can fade without the
          header's own background changing height or paint order. */}
      <div
        aria-hidden="true"
        className={cn(
          "glass absolute inset-0 border-x-0 border-t-0 transition-opacity duration-300",
          scrolled || open ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="shell relative flex h-full items-center justify-between gap-8">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <img
            src={asset("logo/logo.png")}
            alt={site.name}
            width={274}
            height={72}
            className="h-6 w-auto brightness-0 invert"
          />
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "relative text-[0.9375rem] font-medium transition-colors duration-200",
                active === item.id
                  ? "text-on-dark"
                  : "text-on-dark-soft hover:text-on-dark",
              )}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent-bright transition-transform duration-300",
                  active === item.id ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <RequestDemoDialog label="Request a demo" size="sm" variant="outline" />
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-11 items-center justify-center rounded-xl border border-border text-on-dark transition-colors hover:bg-glass lg:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu: a sheet under the bar, not a full-screen takeover, so the
          page stays visible behind it. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="glass absolute inset-x-0 top-full border-x-0 lg:hidden"
      >
        <nav aria-label="Sections" className="shell flex flex-col py-3">
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3.5 text-base font-medium text-on-dark-soft transition-colors hover:text-on-dark"
            >
              {item.label}
            </Link>
          ))}
          <div className="py-3 sm:hidden">
            <RequestDemoDialog label="Request a demo" className="w-full" />
          </div>
        </nav>
      </div>
    </header>
  );
}
