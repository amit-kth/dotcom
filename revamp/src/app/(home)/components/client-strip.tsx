import { clientLogos } from "@/data/site-content";
import { cn } from "@/lib/utils";

export function ClientStrip() {
  return (
    <section aria-label="Our clients" data-client-strip className="group/marquee overflow-hidden border-b border-slate-200 bg-white py-6 sm:py-8">
      <MarqueeRow logos={clientLogos} />
    </section>
  );
}

function MarqueeRow({
  logos,
}: {
  logos: typeof clientLogos;
}) {
  /* The row is rendered twice and translated by 100% of its own width, which is
     exactly one copy, so the loop has no visible seam. The duplicate is
     aria-hidden so a screen reader hears each client once. */
  const content = (
    <div
      className={cn(
        "flex min-w-full shrink-0 items-center gap-12 pr-12",
        "animate-[marquee-forward_100s_linear_infinite] motion-reduce:animate-none",
        "group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]",
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
