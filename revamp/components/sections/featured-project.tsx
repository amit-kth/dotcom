import { ArrowUpRight } from "lucide-react";
import { asset } from "@/config/variables";
import { Reveal } from "@/components/ui/reveal";
import { products } from "@/data/products";
import { RequestDemoDialog } from "@/components/request-demo-dialog";

/* ============================================================================
   FeaturedProject  —  proof of capability, not another catalogue entry
   ----------------------------------------------------------------------------
   The AI calling agents build is shown bigger than the rest of the catalogue:
   the problem it removes, what it does, and where to see it. Every product has
   its own website, so the action here is a link out, not a demo request.

   TODO(content): this block deliberately makes no claim about which client it
   was built for. Add the real case study (client, sector, result) before launch;
   do not invent a bank, a figure or a percentage.

   Set on the dark foreground colour, which turns this into the page's only
   inverted band. That is deliberate: it separates the catalogue from the proof
   without adding another section heading.
   ========================================================================== */

export function FeaturedProject() {
  const project = products.find((p) => p.id === "ai-calling-agents");
  if (!project) return null;

  const link = project.links.find((entry) => entry.url);

  return (
    <section
      aria-labelledby="featured-title"
      className="mt-20 bg-foreground text-background sm:mt-28"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          {/* --------------------------------------------------------- text */}
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-background/60">
              Our flagship build
            </p>

            <h2
              id="featured-title"
              className="mt-4 text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
            >
              AI calling agents that run collections calls end to end
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-background/70 sm:text-[15px]">
              {project.problem}
            </p>

            <ul className="mt-7 space-y-3 border-t border-background/15 pt-6">
              {project.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-3 text-sm leading-snug text-background/85"
                >
                  <span
                    className="mt-[0.45rem] size-1 shrink-0 rounded-[1px] bg-primary"
                    aria-hidden="true"
                  />
                  {outcome}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {link ? (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-background/25 px-5 py-2.5 text-sm font-semibold text-background transition-colors duration-200 hover:border-background/60 hover:bg-background/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
                >
                  {link.title}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              ) : (
                <RequestDemoDialog
                  product={project.name}
                  label="Ask about this build"
                  className="bg-background text-foreground hover:bg-background/90"
                />
              )}
            </div>
          </Reveal>

          {/* -------------------------------------------------------- banner */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-xl border border-background/15">
              <img
                src={asset(project.banner)}
                alt={`${project.name} project`}
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
