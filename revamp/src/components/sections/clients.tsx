import { asset } from "@/config/variables";
import { Reveal } from "@/components/reveal";
import { clientLogos, testimonials } from "@/data/site-content";

/* ============================================================================
   Clients
   ----------------------------------------------------------------------------
   PURPOSE: prove delivery and support, with logos for recognition and three
   quotes for substance.

   Two marquee rows running opposite ways. Every logo is the same height and the
   same treatment: muted, full colour on hover. A wall of differently sized,
   differently weighted logos reads as carelessness, which is the opposite of
   what this band is for.

   The quotes are complete. They used to be trimmed, and one of them opened on
   "…but in Prabal" — a fragment naming a product the reader has never met.
   Quoting a client is reproducing them, not editing them.
   ========================================================================== */

const ROW_ONE = clientLogos.slice(0, Math.ceil(clientLogos.length / 2));
const ROW_TWO = clientLogos.slice(Math.ceil(clientLogos.length / 2));

export function Clients() {
  const [lead, ...rest] = testimonials;

  return (
    <section id="clients" className="band bg-band-clients" aria-labelledby="clients-title">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <Reveal>
            <p className="t-label">Clients</p>
            <h2 id="clients-title" className="t-heading mt-4 max-w-[18ch]">
              Judged after go-live, not at demo.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body max-w-[38ch] pb-2 text-[1rem]">
              {clientLogos.length} companies so far, and every one of them on
              the record.
            </p>
          </Reveal>
        </div>
      </div>

      {/* full-bleed: the marquee has to run past the container edge or the
          loop reads as a widget rather than a wall */}
      <div className="marquee-wall mt-12">
        <MarqueeRow logos={ROW_ONE} />
        <div className="mt-6">
          <MarqueeRow logos={ROW_TWO} direction="reverse" />
        </div>
      </div>

      <div className="shell mt-16">
        <div className="grid gap-3 lg:grid-cols-3">
          {/* the featured quote takes two columns and the bigger type */}
          <figure className="flex flex-col justify-between rounded-md border border-glass-border bg-glass p-8 lg:col-span-2 lg:p-12">
            <blockquote>
              <p className="text-[clamp(1.25rem,2.1vw,1.75rem)] font-medium leading-[1.4] tracking-[-0.02em] text-on-dark">
                {lead.quote}
              </p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 border-t border-glass-border pt-6">
              <img
                src={asset(lead.logo)}
                alt=""
                width={96}
                height={48}
                loading="lazy"
                decoding="async"
                className="h-8 w-auto max-w-[5rem] object-contain opacity-80"
              />
              <div className="border-l border-glass-border pl-4">
                <p className="text-[0.9375rem] font-semibold text-on-dark">{lead.name}</p>
                <p className="mt-0.5 text-[0.9375rem] text-on-dark-soft">{lead.role}</p>
              </div>
            </figcaption>
          </figure>

          <div className="flex flex-col gap-3">
            {rest.map((item) => (
              <figure
                key={item.id}
                className="flex flex-col justify-between rounded-md border border-glass-border p-7"
              >
                <blockquote>
                  <p className="text-[1rem] leading-relaxed text-on-dark-soft">
                    {item.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img
                    src={asset(item.logo)}
                    alt=""
                    width={96}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    className="h-7 w-auto max-w-[4.5rem] object-contain opacity-70"
                  />
                  <div className="border-l border-glass-border pl-3">
                    <p className="text-[0.875rem] font-semibold text-on-dark">{item.name}</p>
                    <p className="text-[0.8125rem] text-on-dark-soft">{item.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function MarqueeRow({
  logos,
  direction = "forward",
}: {
  logos: typeof clientLogos;
  direction?: "forward" | "reverse";
}) {
  /* The row is rendered twice and translated by 100% of its own width, which is
     exactly one copy — so the loop has no visible seam. aria-hidden on the
     duplicate keeps the DOM honest for screen readers. */
  const content = (
    <div className="marquee-track" data-direction={direction}>
      {logos.map((logo) => (
        <img
          key={logo.src}
          src={asset(logo.src)}
          alt={logo.name}
          width={160}
          height={48}
          loading="lazy"
          decoding="async"
          className="h-8 w-auto max-w-[9rem] shrink-0 object-contain opacity-55 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ))}
    </div>
  );

  return (
    <div className="marquee">
      {content}
      <div aria-hidden="true" className="contents">
        {content}
      </div>
    </div>
  );
}
