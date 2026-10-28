import { asset } from "@/config/variables";
import { clientLogos, testimonials } from "@/data/site-content";
import { Reveal } from "@/components/reveal";

/* ============================================================================
   Clients
   ----------------------------------------------------------------------------
   PURPOSE: prove delivery and support — logos for recognition, quotes for
   substance.

   Second light band on the page. Solutions and About are dark, the footer is
   dark, and this sits between About and the footer as a second sheet of paper,
   so the page alternates instead of running navy top to bottom.

   LOGOS
   Two marquee rows running opposite ways, paused on hover, masked at both
   edges. Every logo is the same height and the same treatment — a wall of
   differently sized, differently weighted logos reads as carelessness.

   REVIEWS
   Not a carousel: one lead quote at display size, the rest in a flowing
   two-column wall. The layout is driven by the array length, so adding a fifth
   or ninth quote needs no code change — `testimonials` in data/site-content.ts
   is the only place to edit.
   ========================================================================== */

const ROW_ONE = clientLogos.slice(0, Math.ceil(clientLogos.length / 2));
const ROW_TWO = clientLogos.slice(Math.ceil(clientLogos.length / 2));

export function Clients() {
  const [lead, ...rest] = testimonials;

  /* Two independent columns, filled shortest-first. A CSS grid would leave a
     hole under whichever column is shorter; this keeps the wall square however
     many quotes are added, and needs no code change when one is. */
  const stacks: (typeof rest)[] = [[], []];
  const heights = [0, 0];
  const weight = (quote: string) => Math.ceil(quote.length / 62);
  rest.forEach((item) => {
    const target = heights[0] <= heights[1] ? 0 : 1;
    stacks[target].push(item);
    heights[target] += weight(item.quote) + 3;
  });

  return (
    <section
      id="clients"
      className="light-band relative overflow-hidden bg-band-clients"
      aria-labelledby="clients-title"
    >
      <div className="shell band pb-0">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <Reveal>
            <p className="t-label">Clients</p>
            <h2 id="clients-title" className="t-heading mt-4 max-w-[20ch]">
              Judged after go-live, not at demo.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body max-w-[40ch] pb-2 text-[1rem]">
              {clientLogos.length} companies so far, and every one of them on
              the record.
            </p>
          </Reveal>
        </div>
      </div>

      {/* full-bleed: the marquee has to run past the container edge or the loop
          reads as a widget rather than a wall */}
      <div className="marquee-wall relative z-[1] mt-12">
        <MarqueeRow logos={ROW_ONE} />
        <div className="mt-6">
          <MarqueeRow logos={ROW_TWO} direction="reverse" />
        </div>
      </div>

      <div className="shell relative z-[1] pb-[clamp(4.5rem,9vw,9rem)] pt-16">
        <figure className="border-t-2 border-brand pt-8">
          <blockquote>
            <p className="text-[clamp(1.375rem,2.6vw,2.125rem)] font-medium leading-[1.45] tracking-[-0.02em] text-on-light">
              {lead.quote}
            </p>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <img
              src={asset(lead.logo)}
              alt=""
              width={96}
              height={48}
              loading="lazy"
              decoding="async"
              className="h-8 w-auto max-w-[6rem] object-contain opacity-80"
            />
            <div className="border-l border-line pl-4">
              <p className="text-[1rem] font-semibold text-on-light">{lead.name}</p>
              <p className="text-[0.9375rem] text-on-light-soft">{lead.role}</p>
            </div>
          </figcaption>
        </figure>

        {/* the wall: two independent stacks, so adding a quote never leaves a
            gap and never needs a layout change */}
        <div className="mt-10 grid gap-x-12 gap-y-0 sm:grid-cols-2">
          {stacks.map((stack, column) => (
            <div key={column} className="flex flex-col">
              {stack.map((item) => (
                <figure
                  key={item.id}
                  className="border-t border-line py-7 transition-colors duration-300 hover:border-brand"
                >
                  <blockquote>
                    <p className="text-[1.0625rem] leading-relaxed text-on-light-soft">
                      {item.quote}
                    </p>
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <img
                      src={asset(item.logo)}
                      alt=""
                      width={96}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      className="h-7 w-auto max-w-[5rem] object-contain opacity-70"
                    />
                    <div className="border-l border-line pl-3">
                      <p className="text-[0.9375rem] font-semibold text-on-light">
                        {item.name}
                      </p>
                      <p className="text-[0.875rem] text-on-light-soft">
                        {item.role}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
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
     exactly one copy, so the loop has no visible seam. The duplicate is
     aria-hidden so a screen reader hears each client once. */
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
          className="h-8 w-auto max-w-[9rem] shrink-0 object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
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
