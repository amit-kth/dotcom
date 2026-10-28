import { asset } from "@/config/variables";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/data/site-content";

/* ============================================================================
   Testimonials  —  the three from the old site, quoted exactly
   ----------------------------------------------------------------------------
   Not edited. One of them reads "sleeked", and another carries the client's own
   grammar. A testimonial is a quote, so it is reproduced as published; if
   marketing wants it cleaned up, that is a decision for them, not a silent fix
   here.

   Layout is a three column stack of quotes with the attribution underneath,
   separated by hairlines rather than boxed into cards.
   ========================================================================== */

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="border-t border-border bg-secondary/30"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                In their words
              </p>
              <h2
                id="testimonials-title"
                className="mt-3 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground"
              >
                What our clients say
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {testimonials.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <figure className="flex h-full flex-col border-t border-foreground/70 pt-6">
                <blockquote className="text-sm leading-relaxed text-foreground/85">
                  <p>&ldquo;{item.quote}&rdquo;</p>
                </blockquote>

                <figcaption className="mt-auto flex items-center gap-3 pt-6">
                  <img
                    src={asset(item.logo)}
                    alt=""
                    width={80}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="h-8 w-auto max-w-[5rem] object-contain opacity-70"
                  />
                  <div className="border-l border-border pl-3">
                    <p className="text-xs font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {item.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
