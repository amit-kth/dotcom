import { asset } from "@/config/variables";
import { Reveal } from "@/components/ui/reveal";
import { clientLogos, cmmi, counters } from "@/data/site-content";

/* ============================================================================
   Proof  —  numbers, the appraisal, and the logo wall
   ----------------------------------------------------------------------------
   Three of the same facts the hero states, made large enough to be the section's
   content rather than its decoration. The figures are approved and unchanged
   from the old site; nothing here is animated, because a number that counts up
   is a number nobody finishes reading.

   The CMMI artwork is 87% transparent, so it sits on a plate. Without one the
   page background shows through the badge.
   ========================================================================== */

/* The wall shows a sample, not all 46. A 46-cell grid is texture, and its job
   here is recognition, which twelve names do better than forty-six.
   The list is padded to 12 so the last row is always full: an empty cell in a
   hairline grid reads as a bug. */
const SHOWN = 12;

export function Proof() {
  const logos = clientLogos;
  const shown = logos.slice(0, SHOWN);
  const remaining = logos.length - shown.length;

  return (
    <section aria-labelledby="proof-title" className="surface-paper">
      <div className="shell band">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <div>
              <p className="eyebrow">Kriscent in numbers</p>
              <h2 id="proof-title" className="title-section mt-4 max-w-[22ch]">
                The team behind these systems.
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-background p-1.5 ring-1 ring-border">
                <img
                  src={asset(cmmi.src)}
                  alt={cmmi.alt}
                  width={cmmi.width}
                  height={cmmi.height}
                  loading="lazy"
                  decoding="async"
                  className="block size-11"
                />
              </span>
              <p className="text-[0.8125rem] font-medium leading-tight">
                CMMI Level 3
                <span className="block font-normal text-muted-foreground">
                  independently appraised
                </span>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <dl className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-0">
            {counters.map((counter, i) => (
              <div
                key={counter.label}
                className={
                  i === 0
                    ? "sm:pr-8"
                    : "sm:border-l sm:border-border sm:pl-8 sm:pr-8"
                }
              >
                <dd className="flex items-baseline text-[clamp(2.5rem,4.6vw,3.75rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                  {counter.value}
                  {counter.suffix && (
                    <span className="text-[0.45em] leading-none text-primary">
                      {counter.suffix}
                    </span>
                  )}
                </dd>
                <dt className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {counter.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 border-t border-border pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="meta font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                A few of them
              </p>
              {remaining > 0 && (
                <p className="meta dim">and {remaining} more</p>
              )}
            </div>

            <ul className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-6">
              {shown.map((logo) => (
                <li key={logo.src} className="flex h-12 items-center justify-center">
                  <img
                    src={asset(logo.src)}
                    alt={logo.name}
                    width={160}
                    height={80}
                    loading="lazy"
                    decoding="async"
                    className="max-h-7 w-auto max-w-full object-contain opacity-55 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
