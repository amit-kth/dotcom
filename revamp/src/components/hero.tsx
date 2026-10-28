"use client";

import { useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { useCategory } from "@/components/category-context";
import { categories, type CategoryId } from "@/data/categories";
import { DELIVERY_DAYS } from "@/data/products";

/* ============================================================================
   Hero
   ----------------------------------------------------------------------------
   PURPOSE: the visitor picks the business they run.

   That sentence is the whole design. The chips are the largest, highest
   contrast, most interactive object on the first screen, and everything else
   has been kept off it — no mockup, no stats, no badge, no preview panel. The
   only thing that may sit in the hero besides the chips is the sentence that
   explains what happens when you press one.

   Two hard rules:

   1. ZERO layout shift on click. The hero's height, its type and the position
      of every chip are identical in every state. The only things that change
      are the chip's own fill and a smooth scroll. Any "selected: Fintech" panel
      appearing under the chips would push the page down and break this.
   2. The aurora drifts slowly and never brightens behind the text. It is there
      to keep the right-hand side from reading as empty, not to be looked at.
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

const HEADLINE = ["Ready-made", "software."];

export function Hero() {
  const { selected, setSelected } = useCategory();
  const reduceMotion = useReducedMotion();
  const scroller = useRef<HTMLDivElement | null>(null);

  /* Selecting scrolls to the solutions and filters them there. Selecting the
     chip that is already on clears the filter. */
  const choose = (id: CategoryId) => {
    const next = selected === id ? null : id;
    setSelected(next);

    const target = document.getElementById("solutions");
    if (!target) return;

    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      // header height, read from the token so the offset cannot drift
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-h",
        ) || "72",
      ) -
      // a hair of breathing room above the section
      8;

    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  };

  /* A soft light that follows the pointer across the chip group. Set as CSS
     variables so the paint happens in the compositor, not in React. */
  const trackPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const group = scroller.current;
    if (!group) return;
    const rect = group.getBoundingClientRect();
    group.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    group.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  const words: Variants = reduceMotion
    ? {}
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
      };

  const word: Variants = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: "0.35em" },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as const },
        },
      };

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div aria-hidden="true" className="hero-aurora" />
      <div aria-hidden="true" className="hero-grid" />

      <div className="shell hero-inner">
        <motion.h1
          id="hero-title"
          className="t-display max-w-[16ch]"
          variants={words}
          initial="hidden"
          animate="show"
        >
          {HEADLINE.map((line) => (
            <span key={line} className="block overflow-hidden">
              <motion.span className="block" variants={word}>
                {line}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <motion.span className="block" variants={word}>
              Live in <span className="t-accent">{DELIVERY_DAYS} days</span>.
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          className="t-body mt-6 max-w-[46ch]"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Pick your industry and we will show you what is already built for it.
        </motion.p>

        <div className="mt-10 sm:mt-12">
          <motion.p
            id="industry-label"
            className="t-label"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            What does your business do?
          </motion.p>

          <div
            ref={scroller}
            role="group"
            aria-labelledby="industry-label"
            onPointerMove={trackPointer}
            className="group relative mt-5 flex flex-wrap gap-3"
          >
            {/* pointer light */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 [background:radial-gradient(180px_120px_at_var(--mx,50%)_var(--my,50%),oklch(100%_0_0/0.09),transparent_70%)] group-hover:opacity-100"
            />

            {categories.map((category, index) => {
              const Icon = ICONS[category.id];
              const active = selected === category.id;

              return (
                <motion.button
                  key={category.id}
                  type="button"
                  onClick={() => choose(category.id)}
                  aria-pressed={active}
                  className="chip"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.42 + index * 0.05,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                >
                  <Icon
                    className={
                      active
                        ? "size-[1.125rem] shrink-0 text-primary"
                        : "size-[1.125rem] shrink-0 text-accent-bright"
                    }
                    aria-hidden="true"
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
