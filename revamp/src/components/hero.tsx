"use client";

import { useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Building2,
  Check,
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
import { categories, type CategoryId } from "@/data/categories";
import { DELIVERY_DAYS } from "@/data/products";

/* ============================================================================
   Hero
   ----------------------------------------------------------------------------
   PURPOSE: the visitor picks the business they run. That is the only job of
   this screen, and nothing here may compete with that one click.

   PRIORITY, top to bottom:
     1  the question and the seven category chips — the focal point
     2  the headline (ready-made, 15 days)
     3  one line of subtext
     4  the nav and the photograph, deliberately quiet

   So the chips are 60px tall, 17px semibold, 28px of horizontal padding and a
   16px icon: they read as buttons, not tags. The photograph behind them is
   blurred and covered by a ~84% dark wash, because nothing sharp may sit beside
   or behind the thing the visitor is meant to click.

   What is deliberately NOT here: the stats strip (the figures live in About),
   badges, mockups, outlined numerals, a second call to action.

   MOTION
   The headline lands, then the chips stagger in 40ms apart — the whole entrance
   is under 700ms. Hover is a 2px lift plus a glow, press is a 1.5% scale. All
   of it is transform/opacity, and all of it is off under reduced motion.
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

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function Hero() {
  const { selected, setSelected } = useCategory();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  /* The click changes the chip's state and nothing else. No element in the hero
     is added, removed or resized, so the page never shifts under the pointer. */
  const choose = (id: CategoryId) => {
    const next = selected === id ? null : id;
    setSelected(next);

    const target = document.getElementById("solutions");
    if (!target) return;

    /* land on the top of the solutions list, below the sticky bar */
    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
      ) -
      8;

    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const line: Variants = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: "0.35em" },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.38, ease: EASE },
        },
      };

  return (
    <section id="top" className="hero" aria-labelledby="hero-title" ref={heroRef}>
      <div
        aria-hidden="true"
        className="hero-photo"
        style={{ "--hero-photo": `url(${asset("hero-bg.webp")})` } as React.CSSProperties}
      />
      <div aria-hidden="true" className="hero-aurora" />

      <div className="shell hero-inner">
        <h1 id="hero-title" className="t-display hero-title">
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
                  Live in <span className="t-accent">{DELIVERY_DAYS} days</span>.
                </motion.span>
              </span>
            ),
          )}
        </h1>

        <motion.p
          className="hero-sub"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: 0.1, ease: EASE }}
        >
          Pick your industry and we will show you what is already built for it.
        </motion.p>

        <div className="hero-picker">
          <motion.p
            id="industry-label"
            className="hero-prompt"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.26, delay: 0.12 }}
          >
            What does your business do?
          </motion.p>

          <div
            role="group"
            aria-labelledby="industry-label"
            className="chip-group"
          >
            {categories.map((category, index) => {
              const active = selected === category.id;
              const Icon = active ? Check : ICONS[category.id];

              return (
                <motion.button
                  key={category.id}
                  type="button"
                  onClick={() => choose(category.id)}
                  aria-pressed={active}
                  data-cat={category.id}
                  className="chip"
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
                  <Icon className="chip__icon" aria-hidden="true" />
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
