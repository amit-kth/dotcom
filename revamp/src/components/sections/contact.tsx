import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/ui/reveal";
import { contact, site } from "@/config/variables";

/* ============================================================================
   Contact
   ----------------------------------------------------------------------------
   The dark band, and the only place on the site with contact details, so they
   are never repeated in the footer. The form sits on a paper card inside the
   dark section: that single inversion is what makes the form the most
   conspicuous object on the page, which is the job of a final CTA.
   ========================================================================== */

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="surface-ink scroll-mt-16"
    >
      <div className="shell band">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Talk to us</p>

            <h2 id="contact-title" className="title-section mt-4 max-w-[16ch]">
              Tell us what you run.
            </h2>

            <p className="body dim measure-tight mt-4">
              One reply, from a person who knows these products rather than a
              form robot.
            </p>

            <dl className="mt-9 space-y-3 border-t border-line-on-ink pt-7 text-sm">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="w-14 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  Sales
                </dt>
                <dd>
                  <a
                    href={`mailto:${contact.emails.sales}`}
                    className="text-ink-foreground underline-offset-4 hover:underline"
                  >
                    {contact.emails.sales}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="w-14 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  General
                </dt>
                <dd>
                  <a
                    href={`mailto:${contact.emails.general}`}
                    className="text-ink-foreground underline-offset-4 hover:underline"
                  >
                    {contact.emails.general}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="w-14 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  Phone
                </dt>
                <dd className="flex flex-wrap gap-x-4">
                  {contact.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="text-ink-foreground underline-offset-4 hover:underline"
                    >
                      {phone}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>

            <p className="meta mt-6 text-ink-muted">{site.legalName}</p>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-xl bg-background p-6 text-foreground sm:p-8">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
