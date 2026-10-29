"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "@/components/reveal";
import { deliverySteps } from "@/data/steps";
import { DELIVERY_DAYS } from "@/data/products";
import { BAND, LIGHT_BAND, SHELL, T_BODY, T_HEADING, T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";

/* ============================================================================
   Delivery  —  how we deliver in 15 days
   ----------------------------------------------------------------------------
   PURPOSE: make the 15-day promise believable.

   One idea per row: the number, then the rail. Each stage is two words and a
   date range — the sentences that used to sit under them were explaining the
   rail rather than adding to it.

   MOTION (one scroll value, all of it transform/opacity)
     - the 15 counts up once, when the number enters the viewport
     - the rail fills left to right as the section passes
     - a single lit puck rides the leading edge of the fill
     - each stop wakes as the fill reaches it: label up, dot filled

   `prefers-reduced-motion` renders the finished state: 15, full rail, all stops
   lit. Nothing depends on the animation to be readable.
   ========================================================================== */

export function Delivery() {
  const reduceMotion = useReducedMotion();
  const numberRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(numberRef, { once: true, margin: "-20% 0px" });

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.9", "end 0.6"],
  });

  /* hoisted: hooks may not run inside the JSX conditionals below */
  const railFillX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const railFillY = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
      className={cn(LIGHT_BAND, "bg-slate-50 overflow-hidden")}
      aria-labelledby="delivery-title"
    >
      <div className={cn(SHELL, BAND)}>
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end">
          <Reveal>
            <p className={cn(T_LABEL, "text-slate-500")}>How it works</p>
            <h2
              id="delivery-title"
              className={cn(T_HEADING, "mt-4 max-w-[18ch]")}
            >
              From enquiry to live in {DELIVERY_DAYS} days.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={cn(T_BODY, "max-w-[40ch] text-slate-600 lg:pb-2")}>
              Four stages, one team, and the date quoted before we start.
            </p>
          </Reveal>
        </div>

        <div ref={numberRef} className="mt-12 flex items-end gap-5 sm:mt-16">
          <p
            className="text-[clamp(4.5rem,14vw,9rem)] font-bold leading-[0.82] tracking-[-0.05em] text-blue-600 tabular-nums"
            aria-hidden="true"
          >
            {String(count).padStart(2, "0")}
          </p>
          <p className="pb-3 text-[1.0625rem] font-semibold leading-snug text-slate-600">
            days
            <br />
            to go live
          </p>
          <span className="sr-only">
            {DELIVERY_DAYS} days from enquiry to go live.
          </span>
        </div>

        <div ref={railRef} className="mt-10 sm:mt-12">
          {/* desktop / tablet: one rail, four stops */}
          <div className="hidden sm:block">
            <div className="relative h-[3px] w-full rounded-full bg-slate-200">
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-[linear-gradient(90deg,var(--color-blue-600)_0%,var(--color-blue-500)_55%,var(--color-blue-300)_100%)]"
                style={reduceMotion ? undefined : { scaleX: railFillX }}
              />

              {deliverySteps.map((step, index) => (
                <RailStop
                  key={step.id}
                  index={index}
                  progress={scrollYProgress}
                  reduceMotion={Boolean(reduceMotion)}
                />
              ))}
              <RailStop
                index={deliverySteps.length}
                progress={scrollYProgress}
                reduceMotion={Boolean(reduceMotion)}
              />

              {!reduceMotion && <RailPuck progress={scrollYProgress} />}
            </div>

            <ol className="mt-8 grid grid-cols-4 gap-x-6">
              {deliverySteps.map((step, index) => (
                <Stage
                  key={step.id}
                  index={index}
                  progress={scrollYProgress}
                  reduceMotion={Boolean(reduceMotion)}
                >
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {step.days}
                  </p>
                  <h3 className="mt-2 text-[1.125rem] font-semibold leading-snug tracking-[-0.02em] text-slate-950">
                    {step.title}
                  </h3>
                </Stage>
              ))}
            </ol>
          </div>

          {/* phones: the same rail, stood on its end */}
          <ol className="relative flex flex-col gap-6 pl-8 sm:hidden">
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-[5px] top-2 w-[2px] rounded-full bg-slate-200"
            />
            <motion.span
              aria-hidden="true"
              className="absolute bottom-2 left-[5px] top-2 w-[2px] origin-top rounded-full bg-blue-600"
              style={reduceMotion ? undefined : { scaleY: railFillY }}
            />
            {deliverySteps.map((step, index) => (
              <Stage
                key={step.id}
                index={index}
                progress={scrollYProgress}
                reduceMotion={Boolean(reduceMotion)}
                marker
              >
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {step.days}
                </p>
                <h3 className="mt-1.5 text-[1.0625rem] font-semibold tracking-[-0.02em] text-slate-950">
                  {step.title}
                </h3>
              </Stage>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** A stop on the rail. Fills in once the drawn line reaches it. */
function RailStop({
  index,
  progress,
  reduceMotion,
}: {
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const at = index / deliverySteps.length;
  const lit = useTransform(progress, [at - 0.06, at + 0.02], [0, 1]);

  return (
    <motion.span
      aria-hidden="true"
      className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600"
      style={{
        left: `${at * 100}%`,
        opacity: reduceMotion ? 1 : lit,
        scale: reduceMotion ? 1 : lit,
      }}
    />
  );
}

/** The lit puck that rides the leading edge of the fill. */
function RailPuck({ progress }: { progress: MotionValue<number> }) {
  const left = useTransform(progress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(progress, [0, 0.02, 0.97, 1], [0.9, 1, 1, 0]);

  return (
    <motion.span
      aria-hidden="true"
      className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-blue-600 shadow-[0_0_0_5px_rgb(44_83_224_/_0.14),0_0_18px_2px_rgb(44_83_224_/_0.45)]"
      style={{ left, opacity }}
    />
  );
}

/** The label under a stop: lifts and brightens as the fill arrives. */
function Stage({
  children,
  index,
  progress,
  reduceMotion,
  marker = false,
}: {
  children: React.ReactNode;
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
  /** the phone rail draws a ring beside each step, on the line itself */
  marker?: boolean;
}) {
  const at = index / deliverySteps.length;
  const opacity = useTransform(progress, [at - 0.12, at], [0.45, 1]);
  const y = useTransform(progress, [at - 0.12, at], [10, 0]);

  return (
    <motion.li
      className={cn(
        "relative",
        marker &&
          "before:absolute before:-left-8 before:top-[0.4375rem] before:-ml-[0.3125rem] before:size-3 before:rounded-full before:border-2 before:border-blue-600 before:bg-slate-50 before:content-['']",
      )}
      style={reduceMotion ? undefined : { opacity, y }}
    >
      {children}
    </motion.li>
  );
}
