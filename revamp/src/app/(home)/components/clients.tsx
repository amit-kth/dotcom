import { Testimonials } from "./testimonials";
import { clientLogos } from "@/data/site-content";
import { Reveal } from "@/components/reveal";
import { BAND, LIGHT_BAND, SHELL, T_BODY, T_HEADING, T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";

const ROW_ONE = clientLogos.slice(0, Math.ceil(clientLogos.length / 2));
const ROW_TWO = clientLogos.slice(Math.ceil(clientLogos.length / 2));

export function Clients() {
  return (
    <section
      id="clients"
      className={cn(LIGHT_BAND, "bg-slate-100 overflow-hidden")}
      aria-labelledby="clients-title"
    >
      <div className={cn(SHELL, BAND, "pb-0")}>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <Reveal>
            <p className={cn(T_LABEL, "text-slate-500")}>Clients</p>
            <h2
              id="clients-title"
              className={cn(T_HEADING, "mt-4 max-w-[26ch]")}
            >
              <span className="block whitespace-nowrap">
                Judged after go-live,
              </span>
              <span className="block">not at demo.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className={cn(
                T_BODY,
                "max-w-[40ch] pb-2 text-[1rem] text-slate-600",
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

      <div className={cn(SHELL, "relative z-1 pt-10 pb-16 sm:pb-20")}>
        <Testimonials />
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
          src={logo.src}
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
