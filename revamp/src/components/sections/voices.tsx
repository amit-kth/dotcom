import { asset } from "@/config/variables";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/data/site-content";

/* ============================================================================
   Voices
   ----------------------------------------------------------------------------
   The quotes are reproduced in full. They used to be trimmed with an ellipsis,
   and one of them was cut mid-sentence, so it opened with "…but in Prabal" — a
   fragment that starts nowhere and names a product the reader has never met.

   Nothing is rewritten: these are the clients' own words, including the odd
   grammar. Editing a testimonial is the same sin as inventing one.

   Layout: one lead quote at readable size, two supporting, all three with the
   same card furniture so the section reads as a set rather than as a hierarchy
   nobody explained.
   ========================================================================== */

function Quote({
  quote,
  name,
  role,
  logo,
  lead = false,
}: {
  quote: string;
  name: string;
  role: string;
  logo: string;
  lead?: boolean;
}) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
      <blockquote className="flex-1">
        <p
          className={
            lead
              ? "text-[clamp(1.1875rem,1.7vw,1.4375rem)] font-medium leading-[1.45] tracking-[-0.015em]"
              : "text-base leading-relaxed text-foreground/85"
          }
        >
          {quote}
        </p>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <img
          src={asset(logo)}
          alt=""
          width={96}
          height={48}
          loading="lazy"
          decoding="async"
          className="h-8 w-auto max-w-[5rem] object-contain opacity-80 grayscale"
        />
        <div className="border-l border-border pl-3">
          <p className="text-[0.9375rem] font-semibold leading-tight">{name}</p>
          <p className="mt-0.5 text-[0.8125rem] text-muted-foreground">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Voices() {
  const [lead, ...rest] = testimonials;

  return (
    <section aria-labelledby="voices-title" className="scene scene--voices">
      <div className="shell scene-inner">
        <Reveal>
          <p className="eyebrow">In their words</p>
          <h2 id="voices-title" className="title-section mt-3 max-w-[18ch]">
            Software is judged after it goes live.
          </h2>
          <p className="body dim mt-4 max-w-[52ch]">
            Three clients, in their own words, unedited.
          </p>
        </Reveal>

        <div className="mt-9 grid gap-4 lg:grid-cols-2">
          <Reveal className="lg:row-span-2">
            <Quote
              quote={lead.quote}
              name={lead.name}
              role={lead.role}
              logo={lead.logo}
              lead
            />
          </Reveal>

          {rest.map((item, i) => (
            <Reveal key={item.id} delay={60 + i * 50}>
              <Quote
                quote={item.quote}
                name={item.name}
                role={item.role}
                logo={item.logo}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
