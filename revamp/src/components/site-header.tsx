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
   PURPOSE: logo, four section links, one action, and then out of the way.

   HEIGHT
   60px, fixed, at every scroll position. The bar only fades its glass and its
   hairline in after the first scroll — it never changes height, because a
   header that grows on scroll is the most common cause of layout shift on a
   landing page.

   The logo is 32px tall inside that 60px bar: big enough to be the brand, not
   so big that it pushes the bar open.

   The action is "Contact us", not "Request a demo": at the top of the page the
   visitor has not picked a solution yet, so there is nothing to demo. It opens
   the same enquiry modal.
   ========================================================================== */

const NAV = [
  { label: "Solutions", href: "/#solutions", id: "solutions" },
  { label: "How it works", href: "/#delivery", id: "delivery" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Clients", href: "/#clients", id: "clients" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={cn(
        "site-header sticky top-0 z-50 h-[var(--header-h)]",
        (scrolled || open) && "is-solid",
      )}
    >
      <div className="shell relative flex h-full items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <img
            src={asset("logo/logo.png")}
            alt={site.name}
            width={274}
            height={72}
            className="h-8 w-auto brightness-0 invert"
          />
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "relative rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-200",
                active === item.id
                  ? "text-on-dark"
                  : "text-on-dark-soft hover:text-on-dark",
              )}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 -bottom-px h-[2px] origin-left rounded-full bg-brand transition-transform duration-300",
                  active === item.id ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <RequestDemoDialog
              label="Contact us"
              size="sm"
              className="rounded-full px-5"
            />
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center rounded-full border border-glass-border text-on-dark transition-colors hover:border-glass-border-hover hover:bg-glass lg:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="site-header-sheet lg:hidden">
        <nav aria-label="Sections" className="shell flex flex-col py-2">
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-glass-border py-3.5 text-base font-medium text-on-dark-soft transition-colors last:border-0 hover:text-on-dark"
            >
              {item.label}
            </Link>
          ))}
          <div className="py-3 sm:hidden">
            <RequestDemoDialog
              label="Contact us"
              className="w-full rounded-full"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
