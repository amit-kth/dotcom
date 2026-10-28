import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { ProductVisual, VISUAL_BY_PRODUCT } from "@/components/product-visual";
import { Reveal } from "@/components/ui/reveal";
import { products } from "@/data/products";

/* ============================================================================
   AiCalling  —  the one product with a section of its own
   ----------------------------------------------------------------------------
   Every other build gets a card in the list below. This one gets a band, for
   the reason the brief keeps returning to: it is the most finished thing we
   have, so it should be shown working rather than listed.

   Only what the product data already claims is stated here. No customer names,
   no call volumes, no "trusted by a bank" — none of that exists in a form we
   can stand behind, and an invented number on a page is worse than no number.
   ========================================================================== */

export function AiCalling() {
  const product = products.find((entry) => entry.id === "ai-calling-agents");
  if (!product) return null;

  const visual = VISUAL_BY_PRODUCT[product.id];

  return (
    <section
      id="ai-calling"
      aria-labelledby="ai-title"
      className="relative overflow-hidden bg-ink scroll-mt-[4.5rem]"
    >
      <div className="shell relative band">
        <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-peri">Built and running</p>

            <h2
              id="ai-title"
              className="mt-4 text-[clamp(2rem,3.4vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.038em] text-white"
            >
              The product that does the calling.
            </h2>

            <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-white/70">
              {product.description} Every call is recorded, transcribed and
              searchable, and anything worth a person&apos;s time is handed over.
            </p>

            <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
              {product.outcomes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.9375rem] leading-snug text-white/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-peri"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <RequestDemoDialog
                product={product.name}
                label="Request a demo"
                variant="onInk"
              />
              <a
                href="#solutions"
                className="text-[0.9375rem] font-medium text-white/65 transition-colors hover:text-white"
              >
                See everything we install
              </a>
            </div>
          </Reveal>

          {/* The screen is the argument. It is sized to be the largest object
              in the band, because in this section the product is the copy. */}
          <Reveal delay={80}>
            <figure className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_40%,oklch(49.03%_0.2158_264.38/0.5),transparent_70%)] blur-2xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-card shadow-[0_50px_110px_-40px_oklch(0%_0_0/0.95)]">
                <div className="flex items-center gap-1.5 border-b border-border bg-secondary/80 px-4 py-2.5">
                  <span className="size-1.5 rounded-full bg-foreground/15" />
                  <span className="size-1.5 rounded-full bg-foreground/15" />
                  <span className="size-1.5 rounded-full bg-foreground/15" />
                  <span className="ml-3 rounded-full bg-white px-2.5 py-1 text-[0.625rem] font-medium text-muted-foreground">
                    ai calling agents
                  </span>
                </div>
                <ProductVisual
                  variant={visual.variant}
                  accent={visual.accent}
                  label={`${product.name} call screen with live waveform, transcript and queue`}
                  className="aspect-[640/400] w-full"
                />
              </div>
              <figcaption className="mt-4 text-[0.8125rem] text-white/45">
                Call screen, live transcription and the queue behind it — the
                interface the agents work from.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
