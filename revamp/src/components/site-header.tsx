"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { asset, site } from "@/config/variables";
import { useCategory } from "@/components/category-context";
import { categories, categoryHue } from "@/data/categories";
import { featuredProducts } from "@/data/products";
import { buttonVariants } from "@/components/ui/button";
import { contact } from "@/config/variables";
import { SHELL } from "@/lib/ui";
import { cn } from "@/lib/utils";

/* ============================================================================
   SiteHeader
   ----------------------------------------------------------------------------
   PURPOSE: the brand, the way into the five solutions, and one action.

   HEIGHT
   60px, fixed, at every scroll position. The bar fades its glass in after the
   first scroll; it never changes height, so nothing on the page shifts.

   THE MENU
   "Solutions" is a menu, not a link, because the site only has five solutions and
   a visitor should be able to see all of them without leaving the page they are
   on. The panel holds both ways in: by product (name and the problem it
   removes) and by industry (the same seven categories as the hero chips, which
   set the filter and scroll to the stack).
   It opens on hover for a mouse, on click for a keyboard or a touch, closes on
   Escape, on an outside click, and when focus leaves it. No focus trap: this is
   a menu, not a modal, so the page behind stays reachable.

   THE ACTION
   "Contact us", not "Request a demo": at the top of the page nobody has picked
   a solution yet, so there is nothing to demo. It links to the contact page.

   ON A LIGHT PAGE
   The bar is dark glass at rest, so `solid` is passed on /solutions: white type
   over a paper band would be invisible until the first scroll.
   ========================================================================== */

const NAV = [
  { label: "How it works", href: "/#delivery", id: "delivery" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Clients", href: "/#clients", id: "clients" },
] as const;

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { setSelected } = useCategory();
  const router = useRouter();

  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = [...NAV.map((item) => item.id), "solutions"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
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

  /* one place closes the panel, so every path behaves the same */
  const closePanel = useCallback((returnFocus = false) => {
    setPanel(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!panel) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel(true);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setPanel(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [panel, closePanel]);

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

  /* the hover grace period: a mouse travelling from the trigger into the panel
     must not lose it in the one pixel between them */
  const openOnHover = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setPanel(true);
  };
  const closeOnHover = () => {
    closeTimer.current = window.setTimeout(() => setPanel(false), 140);
  };

  /* The chips filter the homepage stack. On /solutions there is no stack, so
     the choice is carried home instead of being silently applied off-screen. */
  const chooseIndustry = (id: (typeof categories)[number]["id"]) => {
    setSelected(id);
    closePanel();
    const target = document.getElementById("solutions");
    if (target) target.scrollIntoView({ block: "start" });
    else router.push("/#solutions");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[var(--header-h)]",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:transition-opacity before:duration-[260ms]",
        "before:bg-[linear-gradient(180deg,rgb(5_3_20/0.66)_0%,rgb(5_3_20/0)_100%)]",
        "after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:border-b after:border-transparent",
        "after:bg-[rgb(10_8_32/0.72)] after:backdrop-blur-md after:backdrop-saturate-150 after:opacity-0",
        "after:transition-opacity after:duration-[260ms] after:content-['']",
        (scrolled || open || panel || solid) &&
          "before:opacity-0 after:border-glass-border after:opacity-100",
      )}
    >
      <div
        className={cn(
          SHELL,
          "relative flex h-full items-center justify-between gap-6",
        )}
      >
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <img
            src={asset("logo/logo.png")}
            alt={site.name}
            width={274}
            height={72}
            className="h-8 w-auto brightness-0 invert"
          />
        </Link>

        <nav
          aria-label="Sections"
          className="hidden items-center gap-0.5 lg:flex"
        >
          <div
            ref={panelRef}
            className="relative"
            onMouseEnter={openOnHover}
            onMouseLeave={closeOnHover}
            onBlur={(event) => {
              /* focus leaving the menu closes it, so a keyboard user is never
                 left with a panel they cannot see the trigger for */
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setPanel(false);
              }
            }}
          >
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={panel}
              aria-controls="solutions-panel"
              aria-haspopup="true"
              onClick={() => setPanel((value) => !value)}
              className={cn(
                "inline-flex h-9 items-center gap-1.5 rounded-[0.625rem] px-3 text-[0.9375rem] font-medium text-on-dark-soft transition-colors duration-200 hover:bg-white/[0.06] hover:text-on-dark",
                (panel || active === "solutions") &&
                  "bg-white/[0.09] text-on-dark shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]",
              )}
            >
              Solutions
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "size-4 transition-transform duration-200",
                  panel && "rotate-180",
                )}
              />
            </button>

            <div
              id="solutions-panel"
              hidden={!panel}
              className={cn(
                "absolute top-[calc(100%+0.75rem)] left-0 z-60 w-[min(40rem,calc(100vw-3rem))] p-5 rounded-[1.25rem] border border-glass-border bg-[rgb(9_7_28/0.985)] backdrop-blur-xl backdrop-saturate-150 shadow-[0_30px_70px_-32px_rgb(0_0_0/0.85),inset_0_1px_0_rgb(255_255_255/0.06)] animate-[nav-panel-in_170ms_cubic-bezier(0.22,0.61,0.36,1)_both]",
                "lg:left-1/2 lg:-translate-x-1/2",
              )}
            >
              <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-on-dark-faint uppercase">
                    Products
                  </p>
                  <ul className="mt-2 flex flex-col">
                    {featuredProducts.map((product) => (
                      <li key={product.id}>
                        <Link
                          href="/#solutions"
                          onClick={() => closePanel()}
                          className="flex flex-col gap-0.5 rounded-[0.625rem] px-2.5 py-2 transition-colors duration-150 hover:bg-white/[0.06]"
                        >
                          <span className="text-[0.9375rem] font-semibold text-on-dark">
                            {product.name}
                          </span>
                          <span className="line-clamp-1 text-[0.8125rem] leading-[1.45] text-on-dark-faint">
                            {product.problem}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-glass-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                  <p className="text-xs font-semibold tracking-[0.14em] text-on-dark-faint uppercase">
                    By industry
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        data-cat={category.id}
                        onClick={() => chooseIndustry(category.id)}
                        className={cn(
                          "inline-flex h-8 items-center gap-1.5 rounded-full border border-glass-border px-[0.6875rem] text-[0.8125rem] font-medium text-on-dark-soft",
                          "transition-colors duration-150 hover:border-glass-border-hover hover:bg-white/5 hover:text-on-dark",
                          "before:size-1.5 before:rounded-full before:bg-[hsl(var(--chip,224)_72%_62%)] before:content-['']",
                          categoryHue[category.id],
                        )}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>

                  <Link
                    href="/solutions"
                    onClick={() => closePanel()}
                    className="mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-accent-bright hover:underline hover:underline-offset-4"
                  >
                    All solutions
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "inline-flex h-9 items-center gap-1.5 rounded-[0.625rem] px-3 text-[0.9375rem] font-medium text-on-dark-soft transition-colors duration-200 hover:bg-white/[0.06] hover:text-on-dark",
                active === item.id &&
                  "bg-white/[0.09] text-on-dark shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* "Contact us" is a general contact action, with no product
              attached: it opens the form with the solution field empty. It is
              outlined on purpose — the chips, not this button, are the main
              action in the hero. */}
          <Link
            href={contact.contactPath}
            className={cn(
              buttonVariants({ variant: "outline", size: "md" }),
              "hidden sm:inline-flex",
            )}
          >
            Contact us
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>

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

      <div
        id="mobile-nav"
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-glass-border bg-[rgb(10_8_32/0.97)] backdrop-blur-lg lg:hidden"
      >
        <nav
          aria-label="Sections"
          className={cn(
            SHELL,
            "max-h-[calc(100svh-var(--header-h))] overflow-y-auto py-3",
          )}
        >
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-b border-glass-border text-base font-medium text-on-dark-soft transition-colors hover:text-on-dark"
            >
              {item.label}
            </Link>
          ))}

          <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-on-dark-faint uppercase">
            Products
          </p>
          <ul className="mt-1 grid grid-cols-2 gap-x-4">
            {featuredProducts.map((product) => (
              <li key={product.id}>
                <Link
                  href="/#solutions"
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center text-[0.9375rem] font-medium text-on-dark-soft hover:text-on-dark"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-on-dark-faint uppercase">
            By industry
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                data-cat={category.id}
                onClick={() => {
                  chooseIndustry(category.id);
                  setOpen(false);
                }}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-full border border-glass-border px-[0.6875rem] text-[0.8125rem] font-medium text-on-dark-soft",
                  "transition-colors duration-150 hover:border-glass-border-hover hover:bg-white/5 hover:text-on-dark",
                  "before:size-1.5 before:rounded-full before:bg-[hsl(var(--chip,224)_72%_62%)] before:content-['']",
                  categoryHue[category.id],
                )}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="py-4 sm:hidden">
            <Link
              href={contact.contactPath}
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ variant: "outline", size: "md" }),
                "w-full",
              )}
            >
              Contact us
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
