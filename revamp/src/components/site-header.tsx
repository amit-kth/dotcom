"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Mail, ChevronDown, Menu, X } from "lucide-react";
import { site } from "@/config/variables";
import { useCategory } from "@/components/category-context";
import { categories } from "@/data/categories";
import { featuredProducts } from "@/data/products";
import { buttonVariants } from "@/components/ui/button";
import { contact } from "@/config/variables";
import { SearchTrigger } from "@/components/search/solution-search";
import { SHELL } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Shared 52px navigation. Transparent only over the homepage hero; white
 * everywhere else. Menus always use a white surface. */
const NAV = [
  { label: "How it works", href: "/#delivery", id: "delivery" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Clients", href: "/#clients", id: "clients" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [overHero, setOverHero] = useState(true);
  const light = pathname !== "/" || !overHero;
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { selected, toggleCategory } = useCategory();
  const router = useRouter();

  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      const height =
        document.querySelector("header")?.getBoundingClientRect().height ?? 52;
      setOverHero(
        Boolean(hero && hero.getBoundingClientRect().bottom > height),
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // The shared header survives navigation: close menus and observe the new page.
  useEffect(() => {
    setOpen(false);
    setPanel(false);
    setActive(null);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, [pathname]);

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
  }, [pathname]);

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
    toggleCategory(id);
    closePanel();
    const target = document.getElementById("solutions");
    if (target) target.scrollIntoView({ block: "start" });
    else router.push("/#solutions");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[var(--header-h)] border-b transition-colors duration-200",
        light
          ? "border-slate-200 bg-white text-slate-950 shadow-sm"
          : "border-transparent bg-transparent text-white",
      )}
    >
      <div
        className={cn(
          SHELL,
          "relative flex h-full items-center justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]",
        )}
      >
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0 justify-self-start">
          <img
            src="/logo/kriscent-blue.png"
            alt={site.name}
            width={330}
            height={86}
            className={cn("h-7 w-auto", !light && "grayscale brightness-[10]")}
          />
        </Link>

        <nav
          aria-label="Sections"
          className="hidden items-center gap-0.5 lg:flex"
        >
          <div
            ref={panelRef}
            /* Anchor the panel to the shared header container, not its trigger. */
            className="static"
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
                "inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm font-medium transition-colors 2xl:text-base",
                light
                  ? "text-slate-700 hover:bg-slate-100 hover:text-blue-700"
                  : "text-slate-100 hover:bg-white/10 hover:text-white",
                (panel || active === "solutions") &&
                  (light
                    ? "bg-slate-100 text-blue-700"
                    : "bg-white/10 text-white"),
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
                "absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 z-60 w-[min(40rem,calc(100vw-3rem))] p-5 rounded-[1.25rem] border border-slate-200 bg-white text-slate-950 shadow-xl animate-[nav-panel-in_170ms_cubic-bezier(0.22,0.61,0.36,1)_both]",
              )}
            >
              <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">
                    Products
                  </p>
                  <ul className="mt-2 flex flex-col">
                    {featuredProducts.map((product) => (
                      <li key={product.id}>
                        <Link
                          href="/#solutions"
                          onClick={() => closePanel()}
                          className="flex flex-col gap-0.5 rounded-[0.625rem] px-2.5 py-2 transition-colors duration-150 hover:bg-slate-100"
                        >
                          <span className="text-[0.9375rem] font-semibold text-slate-950">
                            {product.name}
                          </span>
                          <span className="line-clamp-1 text-[0.8125rem] leading-[1.45] text-slate-500">
                            {product.problem}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-200 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                  <p className="text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">
                    By industry
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        data-cat={category.id}
                        aria-pressed={selected.includes(category.id)}
                        onClick={() => chooseIndustry(category.id)}
                        className={cn(
                          "inline-flex h-8 items-center gap-1.5 rounded-full border border-slate-200 px-[0.6875rem] text-[0.8125rem] font-medium text-slate-700",
                          "transition-colors duration-150 hover:border-blue-300 hover:bg-slate-100 hover:text-slate-950 aria-pressed:border-blue-400 aria-pressed:bg-blue-50 aria-pressed:text-blue-700",
                          "before:size-1.5 before:rounded-full before:bg-[var(--chip,var(--color-blue-300))] before:content-['']",
                          category.color,
                        )}
                      >
                        {category.label}
                        {selected.includes(category.id) && (
                          <X className="size-3" aria-hidden="true" />
                        )}
                      </button>
                    ))}
                  </div>

                  <Link
                    href="/solutions"
                    onClick={() => closePanel()}
                    className="mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-blue-700 hover:underline hover:underline-offset-4"
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
                "inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm font-medium transition-colors 2xl:text-base",
                light
                  ? "text-slate-700 hover:bg-slate-100 hover:text-blue-700"
                  : "text-slate-100 hover:bg-white/10 hover:text-white",
                active === item.id &&
                  (light
                    ? "bg-slate-100 text-blue-700"
                    : "bg-white/10 text-white"),
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <SearchTrigger compact light={light} />
          {/* "Contact us" is a general contact action, with no product
              attached: it opens the general contact form. It is
              outlined on purpose, the chips, not this button, are the main
              action in the hero. */}
          <Link
            href={contact.contactPath}
            className={cn(
              buttonVariants({
                variant: light ? "secondary" : "outline",
                size: "sm",
              }),
              "hidden sm:inline-flex 2xl:text-base",
            )}
          >
            Contact us
            <Mail className="size-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "flex size-11 items-center justify-center rounded-full border transition-colors lg:hidden",
              light
                ? "border-slate-200 text-slate-800 hover:bg-slate-100"
                : "border-white/20 text-white hover:bg-white/10",
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

      <div
        id="mobile-nav"
        inert={!open}
        aria-hidden={!open}
        className={cn(
          "absolute inset-x-0 top-full origin-top border-t border-slate-200 bg-white text-slate-950 shadow-xl transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none lg:hidden",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 pointer-events-none opacity-0",
        )}
      >
        <nav
          aria-label="Sections"
          className={cn(
            SHELL,
            "max-h-[calc(100svh-var(--header-h))] overflow-y-auto overscroll-contain py-4",
          )}
        >
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-b border-slate-200 text-base font-medium text-slate-700 transition-colors hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}

          <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">
            Products
          </p>
          <ul className="mt-1 grid grid-cols-2 gap-x-4">
            {featuredProducts.map((product) => (
              <li key={product.id}>
                <Link
                  href="/#solutions"
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center text-[0.9375rem] font-medium text-slate-700 hover:text-slate-950"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">
            By industry
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                data-cat={category.id}
                aria-pressed={selected.includes(category.id)}
                onClick={() => {
                  chooseIndustry(category.id);
                  setOpen(false);
                }}
                className={cn(
                  "inline-flex min-h-11 items-center gap-1.5 rounded-full border border-slate-200 px-[0.6875rem] text-[0.8125rem] font-medium text-slate-700",
                  "transition-colors duration-150 hover:border-blue-300 hover:bg-slate-100 hover:text-slate-950 aria-pressed:border-blue-400 aria-pressed:bg-blue-50 aria-pressed:text-blue-700",
                  "before:size-1.5 before:rounded-full before:bg-[var(--chip,var(--color-blue-300))] before:content-['']",
                  category.color,
                )}
              >
                {category.label}
                {selected.includes(category.id) && (
                  <X className="size-3" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>

          <div className="py-4 sm:hidden">
            <Link
              href={contact.contactPath}
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "w-full",
              )}
            >
              Contact us
              <Mail className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
