"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { asset } from "@/config/variables";
import { certifications, company, counters } from "@/data/site-content";
import { cn } from "@/lib/utils";

/* ============================================================================
   About
   ----------------------------------------------------------------------------
   PURPOSE: reduce risk — who these people are, and what can be checked.

   PRIMARILY A CERTIFICATION SECTION
   The badges are the reason this band exists, so they are not a footnote: the
   CMMI plate is 128px on a raised surface with a brand halo behind it, and the
   two ISO badges sit under it at 56px. They read at a glance from across the
   room, which is the only thing that makes a certification worth showing.

   The numbers are the supporting cast: one big, two smaller, counting up once
   as the band arrives. Stats and badges appear here and nowhere else.

   Every cell is flat on the band — no cards inside cards — and each one lifts a
   few pixels under the pointer so the band does not read as a dead sheet.
   ========================================================================== */

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-band-about"
      aria-labelledby="about-title"
    >
      <div aria-hidden="true" className="about-glow" />

      <div className="shell band relative z-[1]">
        <div>
          <p className="t-label">About Kriscent</p>
          <h2 id="about-title" className="t-heading mt-4 max-w-[22ch]">
            <span className="text-brand">13</span> years of shipping
            software, from Kota.
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
          <Cell className="lg:col-span-7">
            <Counter value={counters[0]} size="huge" />
            <p className="mt-6 max-w-[34ch] text-[1.0625rem] leading-relaxed text-on-dark-soft">
              {company.line}
            </p>
          </Cell>

          {/* the certifications, at a size you can actually read */}
          <Cell className="cell-gold lg:col-span-5">
            <p className="t-label !text-[#6b4e00]">Certified</p>
            <div className="mt-5 flex items-center gap-5">
              <span className="cert-plate relative flex size-[7.5rem] shrink-0 items-center justify-center rounded-md p-3">
                <img
                  src={asset(certifications[0].src)}
                  alt={certifications[0].alt}
                  width={certifications[0].width}
                  height={certifications[0].height}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-contain"
                />
              </span>
              <div>
                <p className="text-[1.375rem] font-semibold leading-tight tracking-[-0.02em] text-[#2a1d00]">
                  {certifications[0].name}
                </p>
                <p className="mt-1 text-[0.9375rem] text-[#6b4e00]">
                  Appraised process maturity
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[rgb(120_86_0_/_0.28)] pt-5">
              {certifications.slice(1).map((cert) => (
                <div key={cert.name} className="flex items-center gap-2.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[0.625rem] bg-on-dark p-1.5">
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
                  <p className="text-[0.9375rem] font-semibold text-[#2a1d00]">
                    {cert.name}
                  </p>
                </div>
              ))}
            </div>
          </Cell>

          {/* 13 years: the one solid-red surface on the page, so the eye
              lands on tenure before it lands on volume. */}
          <Cell className="cell-red lg:col-span-3">
            <Counter value={counters[1]} size="large" tone="light" />
          </Cell>

          <Cell className="lg:col-span-3">
            <Counter value={counters[2]} size="large" />
          </Cell>

          <Cell className="lg:col-span-6">
            <p className="t-label">Based in</p>
            <p className="mt-3 text-[1.0625rem] font-semibold leading-snug text-on-dark">
              {company.location}
              <br />
              <span className="font-normal text-on-dark-soft">
                building since {company.founded}
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
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } },
      }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={cn(
        "relative flex flex-col justify-center overflow-hidden rounded-md border border-glass-border bg-glass p-6 sm:p-8",
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
          tone === "default" && "text-on-dark",
          tone === "light" && "text-white",
          tone === "ink" && "text-[#3b2a00]",
          size === "huge"
            ? "text-[clamp(3.25rem,7.4vw,5.75rem)]"
            : "text-[clamp(2.25rem,4vw,3.25rem)]",
        )}
      >
        <span ref={ref}>{shown.toLocaleString("en-IN")}</span>
        {value.suffix && (
          <span
            className={cn(
              tone === "default" && "text-accent-bright",
              tone === "light" && "text-white/70",
              tone === "ink" && "text-[#7a5a00]",
            )}
          >
            {value.suffix}
          </span>
        )}
      </p>
      <p
        className={cn(
          "t-label mt-4",
          tone === "light" && "text-white/75",
          tone === "ink" && "!text-[#6b4e00]",
        )}
      >
        {value.label}
      </p>
    </div>
  );
}
