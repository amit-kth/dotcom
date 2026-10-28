import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { Reveal } from "@/components/ui/reveal";
import { DELIVERY_DAYS } from "@/data/products";

/* ============================================================================
   Faq
   ----------------------------------------------------------------------------
   Six questions, answered in the words a buyer would use, and in the order they
   actually ask them. This is the section that has to survive being read by
   someone who is sceptical: nothing here promises a number we have not already
   promised somewhere else on the page, and nothing invents a policy.

   Marked up as FAQPage so the answers can appear directly in search results.
   ========================================================================== */

const faqs = [
  {
    q: "What does “ready-made” actually mean?",
    a: "The product already exists and is already running for other businesses. You are not funding a build from zero. We configure it to your processes, import your records and take it live.",
  },
  {
    q: `Is ${DELIVERY_DAYS} days realistic?`,
    a: `${DELIVERY_DAYS} days is the target for the products marked as available, counted from the day we start rather than the day you enquire. What moves it is the state of your records; we tell you before we begin if we think it will.`,
  },
  {
    q: "Do we have to change the way we work?",
    a: "Mostly no. These are built around how the industries they serve already operate, which is why they can be installed quickly. Where a change is needed, it is one we name up front.",
  },
  {
    q: "Can it be customised?",
    a: "Yes. Small changes are part of configuration. Anything that means building a new feature is quoted separately and honestly, because we would rather tell you it is a project than pretend it is a setting.",
  },
  {
    q: "What if nothing on this page fits?",
    a: "Then say so and we will say so back. We have built custom software since 2014 — if your case is genuinely different, that is a conversation about a build, not a configurable product.",
  },
  {
    q: "What does it cost?",
    a: "No price is published, because the honest answer depends on what you run and what has to be imported. Ask, and you get a number against your scope rather than a range on a website.",
  },
  {
    q: "Who supports it after go-live?",
    a: "The same team that installed it. There is no separate support contract handed to a third party.",
  },
];

export function Faq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section aria-labelledby="faq-title" className="bg-background">
      <div className="shell band">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Before you ask</p>
            <h2 id="faq-title" className="title-section mt-3 max-w-[14ch]">
              The questions that come up.
            </h2>
            <p className="body dim mt-4 max-w-[32ch]">
              Straight answers. If one of them matters to your decision, ask us
              about it directly.
            </p>
            <div className="mt-7">
              <RequestDemoDialog label="Request a demo" variant="outline" />
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="divide-y divide-border border-y border-border">
              {faqs.map((faq) => (
                <div key={faq.q} className="group py-5">
                  <details className="faq-item">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] marker:hidden">
                        {faq.q}
                        <span
                          aria-hidden="true"
                          className="faq-mark mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground"
                        >
                          <svg
                            viewBox="0 0 12 12"
                            className="size-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          >
                            <path d="M6 2v8M2 6h8" strokeLinecap="round" />
                          </svg>
                        </span>
                      </summary>
                    <p className="mt-3 max-w-[62ch] pr-10 text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </details>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <script
        type="application/ld+json"
        // Static content, no user input: safe to inline.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
