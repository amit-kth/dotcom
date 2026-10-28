import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

/* ============================================================================
   Comparison  —  custom build vs ready-made
   ----------------------------------------------------------------------------
   Most visitors arrive having already been quoted months for a custom build. The
   question they are actually holding is "why is this faster, and where is the
   catch", so the two columns answer that without inventing prices.

   Left column is intentionally quieter: muted text, a minus marker. The right
   column carries the emphasis. Nothing here is a number we cannot stand behind
   except the 15 days, which is approved.
   ========================================================================== */

const CUSTOM = [
  "Nothing runs until the build is finished",
  "Every change reopens the plan",
  "You carry the delivery risk",
  "The first version is the first time you see it",
];

const READY = [
  "The product already runs before you commit",
  "Live in 15 days, agreed up front",
  "One shared product, so it keeps improving",
  "You see the real system, not a mockup",
];

export function Comparison() {
  return (
    <section aria-labelledby="comparison-title" className="border-t border-border bg-secondary/30">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            The difference
          </p>
          <h2
            id="comparison-title"
            className="mt-3 max-w-2xl text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground"
          >
            Same features. Very different timeline.
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
            {/* ------------------------------------------------------ custom */}
            <div className="bg-background p-6 sm:p-8">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Custom development
              </h3>
              <ul className="mt-5 space-y-3">
                {CUSTOM.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <Minus
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground/50"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* ------------------------------------------------------- ready */}
            <div className="bg-background p-6 sm:p-8">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                Ready-made from us
              </h3>
              <ul className="mt-5 space-y-3">
                {READY.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
