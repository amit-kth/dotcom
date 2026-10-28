import { asset } from "@/config/variables";
import { Reveal } from "@/components/ui/reveal";
import { clientLogos } from "@/data/site-content";

/* ============================================================================
   ClientLogos  —  real client marks carried over from the old site
   ----------------------------------------------------------------------------
   All 46 logos, on a hairline grid that runs the full width of the page while
   the heading above it stays in the text column. The bleed is deliberate: the
   wall is texture, not reading matter, and letting it touch both edges stops
   the section from looking like another boxed card.

   Logos sit at reduced opacity in greyscale so the wall reads as a group rather
   than competing with the product rows, and come back to full strength on hover.
   ========================================================================== */

/* The cells are separated by the container's own background showing through 1px
   gaps, so the gaps only look right while the last row is full. 46 logos, so the
   list is padded to 48: divisible by 3, 4 and 6, the column counts used below. */
const LAYOUT_MULTIPLE = 12;

export function ClientLogos() {
  const cells = [...clientLogos];
  const padding =
    (LAYOUT_MULTIPLE - (cells.length % LAYOUT_MULTIPLE)) % LAYOUT_MULTIPLE;

  return (
    <section
      id="clients"
      aria-labelledby="clients-title"
      className="scroll-mt-24 border-t border-border py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Clients
              </p>
              <h2
                id="clients-title"
                className="mt-3 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground"
              >
                Teams already running our software
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Schools, hospitals, exporters, manufacturers and marketplaces.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.06}>
        <ul className="mt-10 grid w-full grid-cols-3 gap-px border-y border-border bg-border sm:grid-cols-4 md:grid-cols-6">
          {cells.map((logo) => (
            <li
              key={logo.src + logo.name}
              className="flex h-20 items-center justify-center bg-background p-4 sm:h-24"
            >
              <img
                src={asset(logo.src)}
                alt={logo.name}
                width={160}
                height={80}
                loading="lazy"
                decoding="async"
                className="max-h-10 w-auto max-w-full object-contain opacity-60 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}

          {/* Filler cells, one per empty slot in the final row. Blank on purpose:
              a white cell with hairlines reads as the grid ending, a missing one
              reads as a bug. */}
          {Array.from({ length: padding }).map((_, i) => (
            <li
              key={`filler-${i}`}
              aria-hidden="true"
              className="h-20 bg-background sm:h-24"
            />
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
