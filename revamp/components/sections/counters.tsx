import { asset } from "@/config/variables";
import { Reveal } from "@/components/ui/reveal";
import { cmmi, counters } from "@/data/site-content";

/* ============================================================================
   Counters  —  the three approved figures, plus the CMMI badge
   ----------------------------------------------------------------------------
   Figures and labels are unchanged from the old site (label wording was cleaned
   up with Kapil sir's approval). Nothing here is computed or animated; these are
   stated facts, and a counting animation would only delay them.

   The CMMI artwork is 87% transparent, so it sits on an opaque plate. Without
   one, the section background shows straight through the badge.
   ========================================================================== */

export function Counters() {
  return (
    <section aria-labelledby="counters-title" className="border-t border-border">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
        <h2 id="counters-title" className="sr-only">
          Kriscent in numbers
        </h2>

        <Reveal>
          <dl className="grid gap-10 sm:grid-cols-3 sm:gap-0">
            {counters.map((counter, i) => (
              <div
                key={counter.label}
                className={
                  i === 0
                    ? "sm:pr-10"
                    : "sm:border-l sm:border-border sm:pl-10 sm:pr-10"
                }
              >
                <dd className="flex items-baseline text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums text-foreground">
                  {counter.value}
                  {counter.suffix && (
                    <span className="text-[0.5em] font-semibold text-primary">
                      {counter.suffix}
                    </span>
                  )}
                </dd>
                <dt className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {counter.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-border pt-8">
            <span className="rounded-full bg-background p-2 ring-1 ring-border">
              <img
                src={asset(cmmi.src)}
                alt={cmmi.alt}
                width={cmmi.width}
                height={cmmi.height}
                loading="lazy"
                decoding="async"
                className="block size-12 sm:size-14"
              />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {cmmi.label}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                An independent appraisal of how we run our projects.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
