import { asset } from "@/config/variables";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/data/site-content";

/* ============================================================================
   Voices
   ----------------------------------------------------------------------------
   One quote carries the section, two support it. Three equal columns of
   testimonials is the layout that makes people skip them: nothing is emphasised,
   so nothing is read.

   The words are the clients' own. They are excerpted, not rewritten, and every
   cut is marked with an ellipsis; the full quotes stay on the old site.
   ========================================================================== */

export function Voices() {
  const [lead, ...rest] = testimonials;

  return (
    <section aria-labelledby="voices-title" className="surface-sand">
      <div className="shell band">
        <Reveal>
          <p className="eyebrow">In their words</p>
          <h2 id="voices-title" className="sr-only">
            What our clients say
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* --------------------------------------------------- the lead */}
          <Reveal>
            <figure>
              <blockquote>
                <p className="text-[clamp(1.125rem,1.8vw,1.5rem)] font-medium leading-[1.5] tracking-[-0.015em]">
                  &ldquo;{lead.excerpt}&rdquo;
                </p>
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-3">
                <img
                  src={asset(lead.logo)}
                  alt=""
                  width={96}
                  height={48}
                  loading="lazy"
                  className="h-9 w-auto max-w-24 object-contain"
                />
                <div className="border-l border-foreground/15 pl-3">
                  <p className="text-sm font-semibold">{lead.name}</p>
                  <p className="meta dim">{lead.role}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          {/* ------------------------------------------------ the support */}
          <Reveal delay={80}>
            <div className="divide-y divide-foreground/10 lg:border-l lg:border-foreground/10 lg:pl-10">
              {rest.map((item) => (
                <figure key={item.id} className="py-6 first:pt-0 last:pb-0">
                  <blockquote>
                    <p className="body text-foreground/85">
                      &ldquo;{item.excerpt}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-2.5">
                    <p className="text-[0.8125rem] font-semibold">{item.name}</p>
                    <span aria-hidden="true" className="text-foreground/20">
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
