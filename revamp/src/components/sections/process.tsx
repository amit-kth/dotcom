import { Reveal } from "@/components/ui/reveal";
import { DELIVERY_DAYS } from "@/data/products";

/* ============================================================================
   Process  —  the fifteen days, as one promise and one track
   ----------------------------------------------------------------------------
   What changed, and why:

   - The heading used to be "Fifteen days, on the calendar before we start",
     which is not a sentence anybody says. It is now the promise itself.
   - "If a step slips, you hear it from us the same day" was removed. Nobody at
     Kriscent agreed to that in writing; a support promise invented by a
     designer is the easiest kind of lie to tell on a website.
   - The day split (1-2, 3-7, 8-12, 13-15) was also invented, and worse, it
     cannot be true for every product: not every system imports records. The
     stages stay, the invented dates around them go. The total of fifteen days
     is the only number, and it is the one the brief approved.
   - The number is now the biggest object in the section, drawn hollow like the
     hero's, and the steps sit on a horizontal track underneath it so the left
     half of the band is no longer empty.
   ========================================================================== */

const STEPS = [
  {
    title: "Map what you run",
    body: "We write down your process and the data behind it, and agree what changes.",
  },
  {
    title: "Configure",
    body: "Roles, categories, branding and the settings your team will actually use.",
  },
  {
    title: "Bring your data across",
    body: "Records, catalogue or content — whatever your system runs on.",
  },
  {
    title: "Go live, with us on call",
    body: "We switch over, train the team, and stay reachable afterwards.",
  },
] as const;

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="surface-ink scroll-mt-[4.5rem]"
    >
      <div className="shell band">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
            <div className="max-w-[26ch]">
              <p className="eyebrow">How it works</p>
              <h2 id="process-title" className="title-section mt-3">
                From enquiry to live in {DELIVERY_DAYS} days.
              </h2>
              <p className="mt-5 max-w-[38ch] text-base leading-relaxed text-white/70">
                Four stages, the same for every product we install. We quote the
                date before we start, and you work with the people doing it.
              </p>
            </div>

            {/* The number, at the scale it deserves. Hollow, like the hero's,
                so the two halves of the page speak the same language. */}
            <p className="flex items-baseline gap-3">
              <span
                aria-hidden="true"
                className="hero-num text-[clamp(4.5rem,11vw,8.5rem)] font-semibold leading-[0.8] tracking-[-0.05em]"
              >
                {DELIVERY_DAYS}
              </span>
              <span className="pb-2 text-[0.6875rem] font-semibold uppercase leading-tight tracking-[0.16em] text-white/50">
                days
                <br />
                to go live
              </span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ol className="mt-14 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative pt-6">
                {/* the track: one line across all four, with the stage's own
                    tick sitting on it */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-white/15"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 size-2.5 -translate-y-1/2 rounded-full bg-peri"
                />
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Stage {i + 1}
                </p>
                <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-white">
                  {step.title}
                </p>
                <p className="mt-2 text-base leading-relaxed text-white/65">
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
