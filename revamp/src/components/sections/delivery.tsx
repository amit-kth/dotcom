"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Reveal } from "@/components/reveal";
import { deliverySteps } from "@/data/steps";
import { DELIVERY_DAYS } from "@/data/products";

/* ============================================================================
   Delivery  —  how we deliver in 15 days
   ----------------------------------------------------------------------------
   PURPOSE: make the 15-day promise believable.

   This is the first light band on the page. It sits between Solutions and
   About, so it works as a divider: dark banners above, dark bento below, and a
   sheet of paper in the middle holding one number and four stages.

   Three things happen once as it scrolls in, all driven off one scroll value:
   the 15 counts up, each stage's segment of the rail draws, and its node fills
   in. `prefers-reduced-motion` renders the finished state immediately.

   The day ranges are DRAFT — see data/steps.ts.
   ========================================================================== */

export function Delivery() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.5"],
  });

  /* Server prints 15, so a crawler or a no-JS visit never sees a zero. */
  const [count, setCount] = useState(DELIVERY_DAYS);

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
    <section
      id="delivery"
      className="light-band relative overflow-hidden bg-band-delivery"
      aria-labelledby="delivery-title"
    >
      <div ref={sectionRef} className="shell band">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
          <Reveal>
            <p className="t-label">How it works</p>
            <h2 id="delivery-title" className="t-heading mt-4 max-w-[18ch]">
              From enquiry to live in {DELIVERY_DAYS} days.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="t-body max-w-[46ch] lg:pb-2">
              One track, four stages. You work with the people doing the work,
              and we quote the date before we start.
            </p>
          </Reveal>
        </div>

        {/* ---- the number ---- */}
        <div className="mt-14 flex flex-wrap items-end gap-x-6 gap-y-3 sm:mt-20">
          <p
            className="figure-number tabular-nums"
            aria-hidden="true"
          >
            {String(count).padStart(2, "0")}
          </p>
          <p className="pb-3 text-[1.0625rem] font-semibold leading-snug text-on-light-soft">
            days
            <br />
            to go live
          </p>
          <span className="sr-only">
            {DELIVERY_DAYS} days from enquiry to go live.
          </span>
        </div>

        {/* ---- the rail ---- */}
        <ol className="mt-10 grid gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:mt-12 lg:grid-cols-4">
          {deliverySteps.map((step, index) => (
            <Stage
              key={step.id}
              index={index}
              progress={scrollYProgress}
              reduceMotion={Boolean(reduceMotion)}
            >
              <p className="t-label">{step.days}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-on-light">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[28ch] text-[1rem] leading-relaxed text-on-light-soft">
                {step.line}
              </p>
            </Stage>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

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
  const from = index / deliverySteps.length;
  const to = (index + 1) / deliverySteps.length;

  const draw = useTransform(progress, [from, to], [0, 1]);
  const lit = useTransform(progress, [to - 0.05, to], [0, 1]);

  return (
    <li className="relative pt-7">
      {/* the unfilled rail */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] rounded-full bg-line lg:-right-8"
      />
      {/* the brand part, drawn as the section scrolls */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left rounded-full bg-brand lg:-right-8"
        style={reduceMotion ? { scaleX: 1 } : { scaleX: draw }}
      />
      <span
        aria-hidden="true"
        className="absolute -top-[5px] left-0 size-3 rounded-full border-2 border-line bg-white"
      />
      <motion.span
        aria-hidden="true"
        className="absolute -top-[5px] left-0 size-3 rounded-full bg-brand"
        style={reduceMotion ? { opacity: 1 } : { opacity: lit, scale: lit }}
      />
      {children}
    </li>
  );
}
