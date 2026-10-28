import { Reveal } from "@/components/ui/reveal";
import { DELIVERY_DAYS } from "@/data/products";

/* ============================================================================
   Delivery  —  turns the promise into a plan
   ----------------------------------------------------------------------------
   "15 days" on its own reads as a marketing claim, which invites suspicion. The
   four steps below turn it into something with dates, so the visitor can see
   there are no gaps where a surprise usually lives.

   TODO(confirm): the day split (1-2 / 3-7 / 8-12 / 13-15) is a plan, not yet a
   signed-off commitment. Confirm the boundaries before launch; the total of
   DELIVERY_DAYS is already approved.
   ========================================================================== */

const STEPS = [
  {
    days: "Day 1 to 2",
    title: "Map your data",
    body: "We look at what you run today: spreadsheets, an old system, or a mix of both.",
  },
  {
    days: "Day 3 to 7",
    title: "Configure",
    body: "Your categories, roles, branches, logo and colours are set on your own copy.",
  },
  {
    days: "Day 8 to 12",
    title: "Import and train",
    body: "Your records move across, and your team is trained on the live system, not a demo.",
  },
  {
    days: "Day 13 to 15",
    title: "Go live",
    body: "We switch over with you and stay on call while your team settles in.",
  },
] as const;

export function Delivery() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="delivery-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                How it works
              </p>
              <h2
                id="delivery-title"
                className="mt-3 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground"
              >
                What {DELIVERY_DAYS} days actually looks like
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              The same four steps for every product. Nothing starts until the days
              are agreed.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative border-t border-border pt-5">
                {/* the rule that ties the row together on desktop */}
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-px w-8 bg-primary"
                />
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {step.days}
                </p>
                <p className="mt-2 flex items-baseline gap-2">
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-semibold tracking-[-0.01em] text-foreground">
                    {step.title}
                  </span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
