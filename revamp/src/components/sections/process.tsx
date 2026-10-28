import { Reveal } from "@/components/ui/reveal";
import { DELIVERY_DAYS } from "@/data/products";

/* ============================================================================
   Process  —  warm sand band, four dated steps
   ----------------------------------------------------------------------------
   The only warm-light section on the page. It sits between the cream product
   list and the dark numbers band, so the page changes tone twice in a row
   instead of drifting through whites.

   TODO(confirm): the day split is a plan, not a signed commitment. The total of
   15 days is approved.
   ========================================================================== */

const STEPS = [
  { days: "Day 1–2", title: "Map your data", body: "What you run today, written down." },
  { days: "Day 3–7", title: "Configure", body: "Roles, categories and your branding." },
  { days: "Day 8–12", title: "Import and train", body: "Your records in, your team trained." },
  { days: "Day 13–15", title: "Go live", body: "We switch over, then stay on call." },
] as const;

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="surface-cream scroll-mt-[4.5rem]"
    >
      <div className="shell band">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 id="process-title" className="title-section mt-3">
              Fifteen days, on the calendar before we start.
            </h2>
            <p className="body dim mt-4 measure-tight">
              The same four steps for every system. If a step slips, you hear it
              from us the same day, not at the end.
            </p>

            <div className="mt-8 inline-flex items-baseline gap-2 rounded-2xl bg-white px-5 py-4 ring-1 ring-border">
              <span className="text-[2.75rem] font-semibold leading-none tracking-[-0.04em]">
                {DELIVERY_DAYS}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                days, kickoff
                <br />
                to go-live
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ol className="relative">
              <span
                aria-hidden="true"
                className="absolute left-[1.4375rem] top-2 bottom-2 w-px bg-border"
              />
              {STEPS.map((step, i) => (
                <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                  <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-[0.8125rem] font-semibold tabular-nums ring-1 ring-border">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-primary">
                      {step.days}
                    </p>
                    <p className="mt-1 text-lg font-semibold tracking-[-0.02em]">
                      {step.title}
                    </p>
                    <p className="body dim mt-1">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
