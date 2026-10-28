"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { deliverySteps } from "@/data/steps";
import { DELIVERY_DAYS } from "@/data/products";

/* ============================================================================
   Delivery  —  how we deliver in 15 days
   ----------------------------------------------------------------------------
   PURPOSE: make the 15-day promise believable.

   Show, don't tell. Three things happen as this section scrolls into view:

   1. the 15 counts up from 0 to 15 (once),
   2. a line draws itself left to right across the four stages,
   3. each node lights as the line reaches it.

   All three are driven by one scroll progress value, so they cannot drift out
   of sync. `prefers-reduced-motion` renders the finished state immediately:
   counter at 15, line drawn, nodes lit, no animation.

   The day ranges are DRAFT (see data/steps.ts).
   ========================================================================== */

export function Delivery() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.45"],
  });

  /* Same rule as the About counters: the number is in the HTML from the first
     byte, and counts from zero only when the section is on screen. */
  const [count, setCount] = useState(DELIVERY_DAYS);

  /* The counter runs off the same idea as the line: when the section is in
     view, count to 15 over 1.1s. It never loops and never re-runs. */
  useEffect(() => {
    if (!inView || reduceMotion) return;
    setCount(0);
    let frame = 0;
    const total = 42;
    const tick = () => {
      frame += 1;
      const eased = 1 - Math.pow(1 - frame / total, 3);
      setCount(Math.round(eased * DELIVERY_DAYS));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, reduceMotion]);

  return (
    <section id="delivery" className="band bg-band-delivery" aria-labelledby="delivery-title">
      <div ref={sectionRef} className="shell">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-end">
          <Reveal>
            <p className="t-label">How it works</p>
            <h2 id="delivery-title" className="t-heading mt-4 max-w-[16ch]">
              From enquiry to live in {DELIVERY_DAYS} days.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="t-body lg:pb-2">
              One track, four stages. You work with the people doing the work,
              and we quote the date before we start.
            </p>
          </Reveal>
        </div>

        {/* ---- the number ---- */}
        <div className="mt-16 flex items-end gap-5 sm:mt-20">
          <p
            className="t-display tabular-nums leading-[0.8] text-accent-bright"
            aria-hidden="true"
          >
            {String(count).padStart(2, "0")}
          </p>
          <p className="pb-2 text-[1.0625rem] font-semibold leading-tight text-on-dark-soft">
            days
            <br />
            to go live
          </p>
          <span className="sr-only">
            {DELIVERY_DAYS} days from enquiry to go live.
          </span>
        </div>

        {/* ---- the timeline ----
            Each stage owns a segment of the line above it, and the four
            segments join at lg so the row reads as one drawn line. On a phone
            the same segments sit at the top of each stacked stage, which is
            the only arrangement that still makes sense in one column. */}
        <ol className="mt-14 grid gap-y-12 sm:grid-cols-2 sm:gap-x-8 lg:mt-20 lg:grid-cols-4">
          {deliverySteps.map((step, index) => (
            <Stage
              key={step.id}
              index={index}
              progress={scrollYProgress}
              reduceMotion={Boolean(reduceMotion)}
            >
              <p className="t-label">{step.days}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-on-dark">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[26ch] text-[1rem] leading-relaxed text-on-dark-soft">
                {step.line}
              </p>
            </Stage>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stage({
  children,
  index,
  progress,
  reduceMotion,
}: {
  children: React.ReactNode;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduceMotion: boolean;
}) {
  /* This stage's segment draws during its own slice of the section's scroll,
     then its node lights. Same value for both, so they cannot drift. */
  const from = index / deliverySteps.length;
  const to = (index + 1) / deliverySteps.length;

  const draw = useTransform(progress, [from, to], [0, 1]);
  const lit = useTransform(progress, [to - 0.04, to], [0.3, 1]);

  return (
    <li className="relative pt-8">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-glass-border lg:-right-8"
      />
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-accent-bright lg:-right-8"
        style={reduceMotion ? { scaleX: 1 } : { scaleX: draw }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-accent-bright"
        style={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: lit, boxShadow: "0 0 18px var(--accent-glow)" }
        }
      />
      {children}
    </li>
  );
}
