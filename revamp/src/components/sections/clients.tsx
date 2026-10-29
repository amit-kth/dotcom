import { asset } from "@/config/variables";
import { clientLogos, testimonials } from "@/data/site-content";
import { Reveal } from "@/components/reveal";
import { BAND, LIGHT_BAND, SHELL, T_BODY, T_HEADING, T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";

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
  /* Every quote gets the same card, in a two-column grid, in reading order.
     Rows are equal height and the attribution is pinned to the bottom of each
     card, so no quote sits higher or lower than its neighbours. An odd number
     of quotes ends with one card spanning both columns instead of leaving a
     hole. Adding a quote needs no layout change. */
  const odd = testimonials.length % 2 === 1;

  return (
    <section
      id="clients"
      className={cn(LIGHT_BAND, "[--band:var(--band-clients)] overflow-hidden")}
      aria-labelledby="clients-title"
    >
      <div className={cn(SHELL, BAND, "pb-0")}>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <Reveal>
            <p className={cn(T_LABEL, "text-on-light-faint")}>Clients</p>
            <h2
              id="clients-title"
              className={cn(T_HEADING, "mt-4 max-w-[20ch]")}
            >
              Judged after go-live, not at demo.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className={cn(
                T_BODY,
                "max-w-[40ch] pb-2 text-[1rem] text-on-light-soft",
              )}
            >
              {clientLogos.length} companies so far, and every one of them on
              the record.
            </p>
          </Reveal>
        </div>
      </div>

      {/* full-bleed: the marquee has to run past the container edge or the loop
          reads as a widget rather than a wall */}
      <div className="group/marquee relative z-1 mt-12">
        <MarqueeRow logos={ROW_ONE} />
        <div className="mt-6">
          <MarqueeRow logos={ROW_TWO} direction="reverse" />
        </div>
      </div>

      <div
        className={cn(SHELL, "relative z-1 pb-[clamp(4.5rem,9vw,9rem)] pt-14")}
      >
        <div className="grid items-stretch gap-4 sm:grid-cols-2">
          {testimonials.map((item, index) => (
            <figure
              key={item.id}
              className={cn(
                "flex h-full flex-col justify-between rounded-md border border-line bg-card p-7 shadow-[var(--shadow-on-light)]",
                "transition-transform duration-300 hover:-translate-y-1",
                odd && index === testimonials.length - 1 && "sm:col-span-2",
              )}
            >
              <blockquote>
                <p className="text-[1.0625rem] leading-[1.7] text-on-light-soft">
                  {item.quote}
                </p>
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <img
                  src={asset(item.logo)}
                  alt=""
                  width={96}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="h-7 w-auto max-w-[5rem] object-contain"
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
    <div
      className={cn(
        "flex min-w-full shrink-0 items-center gap-12 pr-12",
        "animate-[marquee-forward_46s_linear_infinite] motion-reduce:animate-none",
        "group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]",
        direction === "reverse" &&
          "animate-[marquee-reverse_54s_linear_infinite] motion-reduce:animate-none",
      )}
    >
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
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      {content}
      <div aria-hidden="true" className="contents">
        {content}
      </div>
    </div>
  );
}
