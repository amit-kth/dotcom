"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "lucide-react";
import { asset } from "@/config/variables";
import { certifications, company, counters } from "@/data/site-content";
import { cn } from "@/lib/utils";

/* ============================================================================
   About
   ----------------------------------------------------------------------------
   PURPOSE: reduce risk with proof — who these people are, and before this page
   there was nothing to check.

   This is the one bento on the page, because the content genuinely is unequal:
   two numbers deserve a wall each, one is smaller, and the certifications and
   location only need a corner. Every cell is flat on the band — no cards inside
   cards — except the certification plate, which needs a light surface for
   artwork that was drawn for white.

   The numbers count up once, when the section is a third on screen. Stats and
   badges appear here and nowhere else on the site.
   ========================================================================== */

export function About() {
  return (
    <section id="about" className="band bg-band-about" aria-labelledby="about-title">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <Reveal>
            <p className="t-label">About Kriscent</p>
            <h2 id="about-title" className="t-heading mt-4 max-w-[20ch]">
              {company.headline}
            </h2>
          </Reveal>

          <a
            href="https://kriscent.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 pb-2 text-[1.0625rem] font-semibold text-accent-bright"
          >
            Need custom development?
            <ArrowUpRight
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* ---- the bento ----
            Column spans differ per cell on purpose: a page of equal cells is
            the thing this section exists to avoid. */}
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* two numbers get the width, because two numbers are what the
              visitor is looking for; the third is smaller on purpose */}
          <Cell className="sm:col-span-2 lg:min-h-[19rem]">
            <Counter value={counters[0]} size="huge" />
            <p className="mt-6 max-w-[30ch] text-[1.0625rem] leading-relaxed text-on-dark-soft">
              {company.line}
            </p>
          </Cell>

          <Cell className="sm:col-span-2 lg:min-h-[19rem]">
            <Counter value={counters[2]} size="large" />
          </Cell>

          <Cell>
            <Counter value={counters[1]} size="large" />
          </Cell>

          <Cell className="justify-between">
            <p className="t-label">Based in</p>
            <p className="mt-3 text-[1.0625rem] font-semibold leading-snug text-on-dark">
              {company.location}
              <br />
              <span className="font-normal text-on-dark-soft">
                since {company.founded}
              </span>
            </p>
          </Cell>

          <Cell className="sm:col-span-2">
            <p className="t-label">Certified</p>
            <div className="mt-4 flex w-full flex-wrap items-center gap-x-6 gap-y-4">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-on-dark p-1.5">
                    <img
                      src={asset(cert.src)}
                      alt={cert.alt}
                      width={cert.width}
                      height={cert.height}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-contain"
                    />
                  </span>
                  <p className="text-[0.9375rem] font-semibold leading-tight text-on-dark">
                    {cert.name}
                  </p>
                </div>
              ))}
            </div>
          </Cell>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Cell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "spotlight relative flex flex-col justify-center overflow-hidden rounded-md border border-glass-border bg-glass p-6 sm:p-8",
        className,
      )}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }}
    >
      {children}
    </div>
  );
}

function Counter({
  value,
  size = "large",
}: {
  value: { value: string; suffix?: string; label: string };
  size?: "large" | "huge";
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const target = Number(value.value.replace(/,/g, ""));
  /* The server prints the real number, so a crawler or a visitor without
     JavaScript never sees a zero. The count-up starts from zero only once the
     cell is actually on screen, which is below the fold at that point. */
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
          "tabular-nums font-bold leading-[0.85] tracking-[-0.04em] text-on-dark",
          size === "huge"
            ? "text-[clamp(3.5rem,9vw,7rem)]"
            : "text-[clamp(2.5rem,5vw,3.75rem)]",
        )}
      >
        <span ref={ref}>{shown.toLocaleString("en-IN")}</span>
        {value.suffix && <span className="text-accent-bright">{value.suffix}</span>}
      </p>
      <p className="t-label mt-4">{value.label}</p>
    </div>
  );
}
