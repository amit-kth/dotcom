import { asset } from "@/config/variables";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/data/site-content";

/* ============================================================================
   Voices
   ----------------------------------------------------------------------------
   One quote at display size, two in support. Three equal columns of testimonials
   is why people skip testimonials: nothing is emphasised, so nothing is read.

   The words are the clients' own. They are excerpted, never rewritten, and every
   cut is marked with an ellipsis. Full quotes stay on the old site.
   ========================================================================== */

export function Voices() {
  const [lead, ...rest] = testimonials;

  return (
    <section aria-labelledby="voices-title" className="surface-cream">
      <div className="shell band">
        <Reveal>
          <p className="eyebrow">In their words</p>
          <h2 id="voices-title" className="sr-only">
            What our clients say
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <figure className="relative rounded-2xl bg-white p-7 ring-1 ring-border sm:p-10">
              <span
                aria-hidden="true"
                className="absolute -top-3 left-7 font-serif text-[5rem] leading-none text-amber/50 sm:left-10"
              >
                &ldquo;
              </span>
              <blockquote className="relative">
                <p className="text-[clamp(1.25rem,2vw,1.625rem)] font-medium leading-[1.45] tracking-[-0.02em]">
                  {lead.excerpt}
                </p>
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-6">
                <img
                  src={asset(lead.logo)}
                  alt=""
                  width={96}
                  height={48}
                  loading="lazy"
                  className="h-9 w-auto max-w-[6rem] object-contain"
                />
                <div className="border-l border-border pl-3">
                  <p className="text-sm font-semibold">{lead.name}</p>
                  <p className="meta dim">{lead.role}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex h-full flex-col justify-center gap-6">
              {rest.map((item) => (
                <figure
                  key={item.id}
                  className="border-l-2 border-amber/60 pl-5"
                >
                  <blockquote>
                    <p className="text-[0.9375rem] leading-relaxed text-foreground/85">
                      {item.excerpt}
                    </p>
                  </blockquote>
                  <figcaption className="mt-3 flex flex-wrap items-center gap-2">
                    <p className="text-[0.8125rem] font-semibold">{item.name}</p>
                    <span aria-hidden="true" className="text-border">
                      /
                    </span>
                    <p className="meta dim">{item.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
