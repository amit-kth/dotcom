"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";

import { motion, type Variants } from "framer-motion";
import {
  Building2,
  X,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { asset } from "@/config/variables";
import { useCategory } from "@/components/category-context";
import { categories, categoryHue, type CategoryId } from "@/data/categories";
import { DELIVERY_DAYS } from "@/data/products";
import { SHELL } from "@/lib/ui";
import { cn } from "@/lib/utils";

/* ============================================================================
   Hero
   ----------------------------------------------------------------------------
   PURPOSE: the visitor picks the business they run. That is the only job of
   this screen, and nothing here may compete with that one click.

   PRIORITY: chips → headline → one line of subtext → nav and background.

   ALL STYLING IS TAILWIND. The photograph, the wash over it and the chips are
   utility strings below; there is no `.hero` or `.chip` rule in the stylesheet.
   The two things that cannot be a utility, the token-driven background image
   and the per-category hue, are set as CSS custom properties (`--hero-photo`,
   `--chip`) and consumed through arbitrary values, which is how Tailwind wants
   a value that comes from data.

   MOTION: headline lands, chips follow 40ms apart, entrance under 700ms. Hover
   lifts 2px, press is a 1.5% scale. Everything is transform/opacity and all of
   it is off under reduced motion.
   ========================================================================== */

const ICONS: Record<CategoryId, LucideIcon> = {
  fintech: Landmark,
  logistics: Truck,
  manufacturing: Factory,
  healthcare: HeartPulse,
  astrology: Sparkles,
  edtech: GraduationCap,
  "real-estate": Building2,
};

/** One glass material for all seven chips; the hue only reaches the icon. */
const CHIP = [
  "relative inline-flex flex-none items-center justify-center gap-2.5 rounded-full",
  "min-h-[3.75rem] px-[1.4375rem] text-[1.0625rem] font-semibold tracking-[-0.01em] whitespace-nowrap",
  "border border-white/[0.22] bg-white/[0.07] text-white backdrop-blur-md backdrop-saturate-150",
  "shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_10px_26px_-18px_rgb(0_0_0/0.9)]",
  "transition-[background-color,border-color,color,box-shadow] duration-200 ease-out",
  /* hover: the hue finally shows up, as light under the pill */
  "hover:border-white/[0.42] hover:bg-white/[0.13]",
  "hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_16px_34px_-16px_rgb(0_0_0/0.95),0_0_24px_-6px_color-mix(in_srgb,var(--chip,var(--color-blue-300))_55%,transparent)]",
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-blue-100",
  "active:bg-white/20",
  /* the selected state is the inverse pill: solid light, dark type, glow */
  "aria-pressed:border-white aria-pressed:bg-slate-50 aria-pressed:text-slate-950",
  "aria-pressed:shadow-[inset_0_1px_0_#fff,0_0_0_1px_rgb(255_255_255/0.55),0_14px_34px_-14px_rgb(0_0_0/0.9),0_0_34px_-6px_color-mix(in_srgb,var(--chip,var(--color-blue-300))_55%,transparent)]",
  "aria-pressed:hover:bg-white",
  /* tablet: one step down; phone: one more, and the row wraps instead */
  "max-lg:min-h-14 max-lg:text-base sm:max-lg:px-5",
  "max-sm:min-h-14 max-sm:gap-2 max-sm:px-3 max-sm:text-sm",
].join(" ");

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function Hero() {
  const { selected, toggleCategory } = useCategory();
  const reduceMotion = useReducedMotion();

  const chooseCategory = (id: CategoryId) => {
    const adding = !selected.includes(id);
    toggleCategory(id);
    if (adding) {
      // Wait for the matching solutions to render before scrolling to them.
      requestAnimationFrame(() => {
        document.getElementById("solutions")?.scrollIntoView({
          block: "start",
          behavior: reduceMotion ? "instant" : "smooth",
        });
      });
    }
  };

  const line: Variants = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: "0.35em" },
        show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE } },
      };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      /* Directional scrims keep the artwork off the copy and chip row. */
      className={cn(
        "relative flex bg-slate-950 text-slate-50 -mt-[var(--header-h)] min-h-svh pt-[var(--header-h)] items-center overflow-hidden",
        "after:pointer-events-none after:absolute after:inset-0 after:z-0 after:content-['']",
        "after:bg-[linear-gradient(90deg,var(--color-slate-950)_0%,color-mix(in_srgb,var(--color-slate-950)_92%,transparent)_36%,transparent_72%),linear-gradient(180deg,transparent_30%,color-mix(in_srgb,var(--color-slate-950)_30%,transparent)_55%,var(--color-slate-950)_85%)]",
      )}
    >
      {/* Artwork retains its own panel lettering, but no left-side website copy.
          The right-side panels stay visible on desktop, softer on phones. */}
      <div
        aria-hidden="true"
        style={
          {
            "--hero-photo": `url(${asset("hero-software-bg.webp")})`,
          } as React.CSSProperties
        }
        className="pointer-events-none absolute inset-0 z-0 bg-[image:var(--hero-photo)] bg-cover bg-center bg-no-repeat opacity-90 lg:bg-[position:center_calc(50%_-_3rem)] max-lg:opacity-50 max-sm:bg-[position:65%_top] max-sm:opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[20%] z-0 animate-[aurora-drift_26s_ease-in-out_infinite_alternate] bg-[radial-gradient(42%_52%_at_14%_30%,rgb(30_79_216/0.18)_0%,transparent_68%)] blur-[18px]"
      />

      <div
        className={cn(
          SHELL,
          "relative z-1 py-[clamp(2.5rem,6vh,5rem)] max-sm:pt-8 max-sm:pb-11",
        )}
      >
        <h1
          id="hero-title"
          className="max-w-[22ch] min-[120rem]:text-7xl min-[160rem]:text-[5rem] text-[clamp(2.375rem,4.15vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.035em] max-sm:text-[clamp(2rem,8.6vw,2.1875rem)]"
        >
          {["Ready-made software.", null].map((text) =>
            text ? (
              <span key={text} className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={line}
                  initial={reduceMotion ? false : "hidden"}
                  animate="show"
                >
                  {text}
                </motion.span>
              </span>
            ) : (
              <span key="promise" className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={line}
                  initial={reduceMotion ? false : "hidden"}
                  animate="show"
                  transition={{ delay: 0.06 }}
                >
                  Live in{" "}
                  <span className="text-blue-600">{DELIVERY_DAYS} days</span>.
                </motion.span>
              </span>
            ),
          )}
        </h1>

        <motion.p
          className="mt-6 max-w-[46rem] text-[clamp(1.125rem,1.3vw,1.25rem)] leading-[1.5] text-slate-300 max-sm:mt-4 max-sm:text-[1.0625rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: 0.1, ease: EASE }}
        >
          Pick your industry and we will show you what is already built for it.
        </motion.p>

        <div className="mt-[clamp(2.25rem,5vh,3.25rem)] max-sm:mt-7">
          <motion.p
            id="industry-label"
            className="mb-[1.125rem] text-[clamp(1.25rem,1.5vw,1.5rem)] leading-tight font-semibold tracking-[-0.015em] text-slate-50 max-sm:mb-4 max-sm:text-[1.1875rem]"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.26, delay: 0.12 }}
          >
            What does your business do?
          </motion.p>

          <p className="mb-4 text-sm text-slate-400">
            Select one or more industries.
          </p>
          <div
            role="group"
            aria-labelledby="industry-label"
            className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5"
          >
            {categories.map((category, index) => {
              const active = selected.includes(category.id);
              const Icon = active ? X : ICONS[category.id];

              return (
                <motion.button
                  key={category.id}
                  type="button"
                  onClick={() => chooseCategory(category.id)}
                  aria-pressed={active}
                  className={cn(
                    CHIP,
                    categoryHue[category.id],
                    "max-sm:justify-start max-sm:rounded-2xl max-sm:px-3 max-sm:text-sm max-sm:min-h-12 max-[22.5rem]:text-xs max-[22.5rem]:px-2 max-[22.5rem]:gap-1.5",
                  )}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.14 + index * 0.04,
                    ease: EASE,
                  }}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                >
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "size-4 shrink-0 max-sm:size-[0.9375rem] ",
                      /* on the light selected pill the hue has to go darker to
                         stay readable; the class cannot read the button's state,
                         so the state chooses the class */
                      active
                        ? "text-blue-700"
                        : "text-[var(--chip,var(--color-blue-300))]",
                    )}
                  />
                  {category.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
