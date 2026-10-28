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
      className="relative overflow-hidden bg-background"
    >
      <div className="shell relative band">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div>
              <p className="eyebrow">Behind the software</p>
              <h2 id="proof-title" className="title-section mt-3 max-w-[20ch]">
                The team that builds and supports it.
              </h2>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-border bg-card py-2 pl-2 pr-5 shadow-sm">
              <span className="rounded-full bg-white p-1 ring-1 ring-border">
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
                <p className="text-[0.6875rem] text-muted-foreground">
                  independently appraised
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <dl className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-0">
            {counters.map((counter, i) => (
              <div
                key={counter.label}
                className={
                  i === 0
                    ? "sm:pr-8"
                    : "sm:border-l sm:border-border sm:pl-8 sm:pr-8"
                }
              >
                <dd className="flex items-baseline text-[clamp(2.75rem,5vw,4rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums text-primary">
                  {counter.value}
                  {counter.suffix && (
                    <span className="text-[0.42em] leading-none text-foreground/40">
                      {counter.suffix}
                    </span>
                  )}
                </dd>
                <dt className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {counter.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 border-t border-border pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Already running at
              </p>
              {remaining > 0 && (
                <p className="text-[0.75rem] text-muted-foreground">
                  and {remaining} more
                </p>
              )}
            </div>

            <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {shown.map((logo) => (
                <li
                  key={logo.src}
                  className="flex h-16 items-center justify-center rounded-lg border border-border bg-card p-3"
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
