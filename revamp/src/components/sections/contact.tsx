import { Mail, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/ui/reveal";
import { contact, site } from "@/config/variables";

/* ============================================================================
   Contact
   ----------------------------------------------------------------------------
   The dark band, and the only place on the site with contact details, so they
   are never repeated in the footer. The form sits on a white card inside the
   dark section: that inversion is what makes it the most conspicuous object on
   the page, which is the job of a final call to action.
   ========================================================================== */

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="surface-ink relative overflow-hidden scroll-mt-[4.5rem]"
    >
      <div aria-hidden="true" className="grid-veil absolute inset-0 opacity-60" />

      <div className="shell relative band">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Talk to us</p>

            <h2 id="contact-title" className="title-section mt-3 max-w-[15ch]">
              Tell us what you run.
            </h2>

            <p className="body dim mt-4 measure-tight">
              One reply, from a person who knows these systems rather than a form
              robot. If nothing fits, we will say so.
            </p>

            <div className="mt-9 space-y-3">
              <a
                href={`mailto:${contact.emails.sales}`}
                className="group flex items-center gap-3 text-[0.9375rem] text-ink-foreground transition-colors hover:text-amber"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-line-on-ink">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                {contact.emails.sales}
              </a>
              <a
                href={`tel:${contact.phones[0].replace(/[^\d+]/g, "")}`}
                className="group flex items-center gap-3 text-[0.9375rem] text-ink-foreground transition-colors hover:text-amber"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-line-on-ink">
                  <Phone className="size-4" aria-hidden="true" />
                </span>
                {contact.phones[0]}
              </a>
            </div>

            <p className="mt-8 border-t border-line-on-ink pt-6 text-[0.75rem] text-ink-muted">
              {site.legalName}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-2xl bg-white p-6 text-foreground sm:p-8">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
