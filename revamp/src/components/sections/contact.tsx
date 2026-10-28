import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/ui/reveal";
import { contact, site } from "@/config/variables";

/* ============================================================================
   Contact  —  the same form the demo dialog uses, in its full-page context
   ----------------------------------------------------------------------------
   Keeping one form component means validation, states and the submit function
   can only ever be fixed in one place.
   ========================================================================== */

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* ----------------------------------------------------------- intro */}
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Talk to us
            </p>
            <h2
              id="contact-title"
              className="mt-3 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground"
            >
              Tell us what you run, we will tell you what we already have
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              A reply from a person who knows the products, usually inside a
              working day. If we do not have a fit, we will say so.
            </p>

            <dl className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="w-16 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Sales
                </dt>
                <dd>
                  <a
                    href={`mailto:${contact.emails.sales}`}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    {contact.emails.sales}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="w-16 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  General
                </dt>
                <dd>
                  <a
                    href={`mailto:${contact.emails.general}`}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    {contact.emails.general}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="w-16 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Phone
                </dt>
                <dd className="space-x-3">
                  {contact.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="text-foreground underline-offset-4 hover:underline"
                    >
                      {phone}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-xs text-muted-foreground">{site.legalName}</p>
          </Reveal>

          {/* ------------------------------------------------------------ form */}
          <Reveal delay={0.06}>
            <div className="rounded-xl border border-border bg-background p-6 sm:p-8">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
