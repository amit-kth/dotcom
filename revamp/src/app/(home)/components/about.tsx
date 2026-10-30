"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { counters } from "@/data/site-content";
import { BAND, SHELL, T_HEADING, T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";

/* The one solid-red surface on the page, and the one gold one: both are a
   single material, so they live here rather than being spelled out twice. */
const RED = [
  "border-white/[0.22]",
  "bg-[radial-gradient(120%_120%_at_12%_0%,var(--color-red-400)_0%,var(--color-red-600)_46%,var(--color-red-800)_100%)]",
  "shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_30px_70px_-34px_rgb(224_49_39/0.65)]",
].join(" ");

const GOLD = [
  "border-[rgb(255_214_122/0.45)]",
  "bg-[linear-gradient(118deg,var(--color-amber-50)_0%,var(--color-amber-200)_26%,var(--color-amber-300)_48%,var(--color-amber-100)_68%,var(--color-amber-400)_100%)] bg-[length:220%_220%]",
  "animate-[gold-drift_14s_ease-in-out_infinite_alternate]",
  "shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_30px_80px_-34px_rgb(247_207_116/0.85)]",
  /* the bloom + grain: a soft highlight over a faint diagonal tooth */
  "after:pointer-events-none after:absolute after:inset-0 after:mix-blend-soft-light after:content-['']",
  "after:bg-[radial-gradient(60%_60%_at_78%_8%,rgb(255_255_255/0.85),transparent_62%),repeating-linear-gradient(118deg,rgb(120_86_0/0.05)_0_2px,transparent_2px_6px)]",
].join(" ");

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-950 text-slate-50"
      aria-labelledby="about-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[10%] z-0 bg-[radial-gradient(38%_52%_at_78%_22%,rgb(44_83_224/0.28),transparent_68%),radial-gradient(46%_46%_at_12%_88%,rgb(122_77_238/0.16),transparent_72%)] blur-[10px]"
      />

      <div className={cn(SHELL, BAND, "relative z-1")}>
        <div>
          <p className={cn(T_LABEL, "text-slate-300")}>About Kriscent</p>
          <h2 id="about-title" className={cn(T_HEADING, "mt-4 max-w-[22ch]")}>
            <span className="text-blue-600">13</span> years of shipping
            software.
          </h2>
        </div>

        {/* ---- the bento: unequal on purpose ---- */}
        <motion.div
          className="mt-14 grid gap-3 lg:grid-cols-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {/* the headline number */}
          <Cell from={{ x: -36, y: 16 }} className="lg:col-span-7">
            <Counter value={counters[0]} size="huge" />
            <p className="mt-6 max-w-[34ch] text-[1.0625rem] leading-relaxed text-slate-300">
              Kriscent builds and supports its own software, the same team
              installs it, trains your team and answers afterwards.
            </p>
          </Cell>

          {/* the certifications, at a size you can actually read */}
          <Cell
            from={{ x: 36, y: -16 }}
            surface={GOLD}
            className="lg:col-span-5"
          >
            <p className={cn(T_LABEL, "text-amber-800")}>Certified</p>
            <div className="mt-5 flex items-center gap-5">
              <span className="relative flex size-[7.5rem] shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-[0_0_0_1px_rgb(255_255_255/0.3),0_24px_60px_-28px_rgb(44_83_224/0.75),0_0_70px_-10px_rgb(44_83_224/0.55)]">
                <img
                  src="/icons/cmmi.webp"
                  alt="CMMI Level 3"
                  width={200}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-contain"
                />
              </span>
              <div>
                <p className="text-[1.375rem] font-semibold leading-tight tracking-[-0.02em] text-amber-950">
                  CMMI Level 3
                </p>
                <p className="mt-1 text-[0.9375rem] text-amber-800">
                  Appraised process maturity
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[rgb(120_86_0_/_0.28)] pt-5">
              {/* Existing ISO artwork placeholders; replace when the real badges are supplied. */}
              <div className="flex items-center gap-2.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[0.625rem] bg-slate-50 p-1.5">
                  <img
                    src="/icons/cmmi.webp"
                    alt="ISO 9001:2015"
                    width={200}
                    height={200}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-contain"
                  />
                </span>
                <p className="text-[0.9375rem] font-semibold text-amber-950">
                  ISO 9001:2015
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[0.625rem] bg-slate-50 p-1.5">
                  <img
                    src="/icons/cmmi.webp"
                    alt="ISO 27001"
                    width={200}
                    height={200}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-contain"
                  />
                </span>
                <p className="text-[0.9375rem] font-semibold text-amber-950">
                  ISO 27001
                </p>
              </div>
            </div>
          </Cell>

          {/* 13 years: the one solid-red surface on the page, so the eye
              lands on tenure before it lands on volume. */}
          <Cell
            from={{ x: -24, y: 24 }}
            surface={RED}
            className="lg:col-span-3"
          >
            <Counter value={counters[1]} size="large" tone="light" />
          </Cell>

          <Cell from={{ x: 0, y: 32 }} className="lg:col-span-3">
            <Counter value={counters[2]} size="large" />
          </Cell>

          <Cell from={{ x: 24, y: 24 }} className="lg:col-span-6">
            <p className={cn(T_LABEL, "text-slate-300")}>Based in</p>
            <p className="mt-3 text-[1.0625rem] font-semibold leading-snug text-slate-50">
              Kota, Rajasthan, India
              <br />
              <span className="font-normal text-slate-300">
                building since 2014
              </span>
            </p>
          </Cell>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Cell({
  children,
  surface,
  from = { x: 0, y: 24 },
  className,
}: {
  children: React.ReactNode;
  /** the cell's material; the default is the band's own glass */
  surface?: string;
  from?: { x: number; y: number };
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: reduceMotion
          ? {}
          : { opacity: 0, ...from, filter: "blur(6px)" },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: reduceMotion ? 0 : 0.55,
            ease: [0.22, 0.61, 0.36, 1],
          },
        },
      }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={cn(
        "relative flex flex-col justify-center overflow-hidden rounded-[2rem] border p-6 sm:p-8",
        surface ?? "border-white/15 bg-white/5",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

function Counter({
  value,
  size = "large",
  tone = "default",
}: {
  value: { value: string; suffix?: string; label: string };
  size?: "large" | "huge";
  /** default = on the dark band, light = on the red cell, ink = on the gold */
  tone?: "default" | "light" | "ink";
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const target = Number(value.value.replace(/,/g, ""));
  /* The server prints the real number, so a crawler never sees a zero. */
  const [shown, setShown] = useState(target);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    setShown(0);
    let frame = 0;
    const total = 48;
    const tick = () => {
      frame += 1;
      const eased = 1 - Math.pow(1 - frame / total, 3);
      setShown(Math.round(eased * target));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, reduceMotion, target]);

  return (
    <div>
      <p
        className={cn(
          "font-bold leading-[0.9] tracking-[-0.04em] tabular-nums",
          tone === "default" && "text-slate-50",
          tone === "light" && "text-white",
          tone === "ink" && "text-amber-950",
          size === "huge"
            ? "text-[clamp(3.25rem,7.4vw,5.75rem)]"
            : "text-[clamp(2.25rem,4vw,3.25rem)]",
        )}
      >
        <span ref={ref}>{shown.toLocaleString("en-IN")}</span>
        {value.suffix && (
          <span
            className={cn(
              tone === "default" && "text-blue-100",
              tone === "light" && "text-white/70",
              tone === "ink" && "text-amber-700",
            )}
          >
            {value.suffix}
          </span>
        )}
      </p>
      <p
        className={cn(
          T_LABEL,
          "mt-4",
          tone === "default" && "text-slate-300",
          tone === "light" && "text-white/75",
          tone === "ink" && "text-amber-800",
        )}
      >
        {value.label}
      </p>
    </div>
  );
}
