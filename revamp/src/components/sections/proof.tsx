import { asset } from "@/config/variables";
import { Reveal } from "@/components/ui/reveal";
import { clientLogos, cmmi, counters } from "@/data/site-content";

/* ============================================================================
   Proof  —  the dark numbers band
   ----------------------------------------------------------------------------
   Figures this size need contrast to land, and cream digits on ink do that in a
   way a grey-on-white stat row never will. This is the section that answers
   "who are these people" without a paragraph of biography.

   Client logos sit on white tiles: most of the files are dark artwork, so on
   ink they would disappear. The tiles also keep the wall readable as a grid.

   The CMMI artwork is 87% transparent, so it needs an opaque plate.
   ========================================================================== */

const SHOWN = 12;

export function Proof() {
  const shown = clientLogos.slice(0, SHOWN);
  const remaining = clientLogos.length - shown.length;

  return (
    <section
      aria-labelledby="proof-title"
      className="surface-ink relative overflow-hidden"
    >
      <div aria-hidden="true" className="grid-veil absolute inset-0 opacity-60" />

      <div className="shell relative band">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div>
              <p className="eyebrow">Behind the software</p>
              <h2 id="proof-title" className="title-section mt-3 max-w-[20ch]">
                The team that builds and supports it.
              </h2>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-line-on-ink bg-white/5 py-2 pl-2 pr-5">
              <span className="rounded-full bg-white p-1">
                <img
                  src={asset(cmmi.src)}
                  alt={cmmi.alt}
                  width={cmmi.width}
                  height={cmmi.height}
                  loading="lazy"
                  decoding="async"
                  className="block size-9"
                />
              </span>
              <div>
                <p className="text-[0.8125rem] font-semibold leading-tight">
                  CMMI Level 3
                </p>
                <p className="text-[0.6875rem] text-ink-muted">
                  independently appraised
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <dl className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-0">
            {counters.map((counter, i) => (
              <div
                key={counter.label}
                className={
                  i === 0
                    ? "sm:pr-8"
                    : "sm:border-l sm:border-line-on-ink sm:pl-8 sm:pr-8"
                }
              >
                <dd className="flex items-baseline text-[clamp(3rem,5.4vw,4.5rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums text-ink-foreground">
                  {counter.value}
                  {counter.suffix && (
                    <span className="text-[0.42em] leading-none text-amber">
                      {counter.suffix}
                    </span>
                  )}
                </dd>
                <dt className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  {counter.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Already running at
              </p>
              {remaining > 0 && (
                <p className="text-[0.75rem] text-ink-muted">
                  and {remaining} more
                </p>
              )}
            </div>

            <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {shown.map((logo) => (
                <li
                  key={logo.src}
                  className="flex h-16 items-center justify-center rounded-lg bg-white/95 p-3"
                >
                  <img
                    src={asset(logo.src)}
                    alt={logo.name}
                    width={160}
                    height={80}
                    loading="lazy"
                    decoding="async"
                    className="max-h-8 w-auto max-w-full object-contain"
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
