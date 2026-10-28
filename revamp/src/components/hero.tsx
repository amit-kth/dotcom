"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
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
import { counters } from "@/data/site-content";
import { categories, type CategoryId } from "@/data/categories";
import { DELIVERY_DAYS } from "@/data/products";

/* ============================================================================
   Hero
   ----------------------------------------------------------------------------
   PURPOSE: the visitor picks the business they run.

   The composition, top to bottom:

     1  one headline, two lines, sized to end flush with the right of the
        column at every desktop width — measured, not guessed
     2  one sentence under it
     3  the label, then the chips, which are the only interactive thing here

   The right-hand side is depth: four concentric brand rings with a slow
   rotating dashed ring, sitting behind the headline. Nothing to look at that
   competes with the chips.

   CHIPS AT EVERY WIDTH
   Seven chips, and the layout guarantees none of them is ever stranded:
     >= 1120px   one row (1013px of chips in a 1030px column)
     640-1119    4 + 3 grid
     < 640       2 + 2 + 2 + 1, the last chip spanning both columns

   MOTION
   Lines rise once on load, chips follow 40ms apart. Hover is a Framer spring
   lift plus a brand sheen and icon nudge; press is a 1.5% scale. All of it is
   transform/opacity, and all of it is off under prefers-reduced-motion.
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

export function Hero() {
  const { selected, setSelected } = useCategory();
  const reduceMotion = useReducedMotion();
  const scroller = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  /* The rings drift up slightly slower than the page. One value, one
     transform — nothing here re-renders React on scroll. */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const figureY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const choose = (id: CategoryId) => {
    const next = selected === id ? null : id;
    setSelected(next);

    const target = document.getElementById("solutions");
    if (!target) return;

    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-h",
        ) || "60",
      ) -
      8;

    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const trackPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const group = scroller.current;
    if (!group) return;
    const rect = group.getBoundingClientRect();
    group.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    group.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  const line: Variants = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: "0.4em" },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
        },
      };

  return (
    <section id="top" className="hero" aria-labelledby="hero-title" ref={heroRef}>
      <div aria-hidden="true" className="hero-aurora" />
      <div aria-hidden="true" className="hero-grid" />

      <motion.div
        aria-hidden="true"
        className="hero-figure"
        style={reduceMotion ? undefined : { y: figureY }}
      >
        <span />
        <span />
        <span />
        <span />
        <span />
      </motion.div>

      <div className="shell hero-inner">
        <h1 id="hero-title" className="t-display hero-title">
          {["Ready-made software.", null].map((text, index) =>
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
                  transition={{ delay: 0.12 }}
                >
                  Live in <span className="t-accent">{DELIVERY_DAYS} days</span>.
                </motion.span>
              </span>
            ),
          )}
        </h1>

        <motion.p
          className="hero-sub"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Pick your industry and we will show you what is already built for it.
        </motion.p>

        <div className="hero-picker">
          <motion.p
            id="industry-label"
            className="t-label"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.36 }}
          >
            What does your business do?
          </motion.p>

          <div
            ref={scroller}
            role="group"
            aria-labelledby="industry-label"
            onPointerMove={trackPointer}
            className="chip-group mt-5"
          >
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
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.4 + index * 0.04,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.975 }}
                >
                  <Icon
                    className="size-4 shrink-0 text-brand-soft"
                    aria-hidden="true"
                  />
                  {category.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* who we are, in three figures — the same approved numbers the About
            band uses, quoted once here as a reason to keep reading */}
        <motion.ul
          className="hero-stats"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.62 }}
        >
          {[counters[0], counters[1], counters[2]].map((counter) => (
            <li key={counter.label} className="hero-stat">
              <b>
                {counter.value}
                {counter.suffix ?? ""}
              </b>
              {counter.label}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
