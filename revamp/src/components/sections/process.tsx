import { Reveal } from "@/components/ui/reveal";
import { DELIVERY_DAYS } from "@/data/products";

/* ============================================================================
   Process  —  the promise, made concrete
   ----------------------------------------------------------------------------
   The page's only dark section, placed directly under the product list so it
   reads as the answer to "and then what?". Four steps, one line each. Anything
   longer and this becomes the content wall the first draft was.

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
      className="surface-ink scroll-mt-16"
    >
      <div className="shell band">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <div>
              <p className="eyebrow">How it works</p>
              <h2
                id="process-title"
                className="title-section mt-4 max-w-[22ch]"
              >
                {DELIVERY_DAYS} days, start to finish.
              </h2>
            </div>
            <p className="body dim measure-tight">
              Agreed before we begin, and the same four steps for every product.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ol className="mt-14 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="relative border-t border-line-on-ink pt-6 lg:pr-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-px w-10 bg-primary"
                />
                <p className="font-semibold tabular-nums text-[0.6875rem] tracking-[0.16em] text-ink-muted">
                  0{i + 1}
                </p>
                <p className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  {step.days}
                </p>
                <p className="mt-1 text-lg font-semibold tracking-[-0.015em]">
                  {step.title}
                </p>
                <p className="body dim mt-1">{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
