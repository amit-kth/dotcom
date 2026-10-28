import { asset, site } from "@/config/variables";
import { Reveal } from "@/components/ui/reveal";

/* ============================================================================
   Hero
   ----------------------------------------------------------------------------
   One claim, three proofs, then the question the rest of the page answers.
   The chips themselves live in SolutionsExplorer, directly below, because they
   own the state that changes the list. Visually they belong to this block: the
   hero has no bottom padding and the chip panel starts immediately after.

   Copy rules honoured here: the target phrases appear once each, naturally, in
   the H1 and the intro. No keyword stuffing, no invented figures.
   ========================================================================== */

const PROOF = [
  {
    title: "15 days, mapped out",
    body: "Kickoff to go-live, with every step agreed before we start.",
  },
  {
    title: "Data migration included",
    body: "Your records move across as part of the same timeline.",
  },
  {
    title: "13 years, 1,549+ projects",
    body: "The same team that ships our custom builds, not a reseller.",
  },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* Faint brand wash, top right only. Keeps the white page from reading flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(60%_50%_at_85%_-10%,hsl(var(--primary)/0.10),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-[1200px] px-5 pt-12 sm:px-8 sm:pt-16 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-16">
          {/* ------------------------------------------------------- headline */}
          <Reveal>
            <span
              aria-hidden="true"
              className="mb-5 block h-px w-14 bg-primary"
            />

            <h1
              id="hero-title"
              className="text-[clamp(2.1rem,4.3vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground"
            >
              Ready-made software,
              <br className="hidden sm:inline" /> live in 15 days.
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              We have already built it. You pick the product, we migrate your
              data, apply your branding and train your team, and you go live
              inside the same 15 days. No six month custom build, and no quote
              that changes halfway through.
            </p>
          </Reveal>

          {/* --------------------------------------------------------- proofs */}
          <Reveal delay={0.08}>
            <ul className="h-full border-t border-border lg:border-l lg:border-t-0 lg:pl-8">
              {PROOF.map((item) => (
                <li
                  key={item.title}
                  className="border-b border-border py-4 first:pt-4 lg:first:pt-0"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Brand strip: real logos only, no invented clients. */}
        <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <img
            src={asset("icons/cmmi.webp")}
            alt=""
            width={28}
            height={28}
            className="h-6 w-6 rounded-full bg-background p-0.5 ring-1 ring-border"
          />
          CMMI Level 3 appraised
          <span aria-hidden="true" className="text-border">
            /
          </span>
          {site.legalName}
        </p>
      </div>
    </section>
  );
}
