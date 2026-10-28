import { Mail, MessageCircle, Phone } from "lucide-react";
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
      className="scene scene--contact scroll-mt-[4.5rem]"
    >
      <div className="shell scene-inner">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Talk to us</p>

            <h2 id="contact-title" className="title-section mt-3 max-w-[15ch]">
              Tell us what you run.
            </h2>

            <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-white/70">
              Tell us what you run. We&apos;ll tell you what fits.
            </p>

            <div className="mt-9 space-y-3">
              <a
                href={`mailto:${contact.emails.sales}`}
                className="group flex items-center gap-3 text-[0.9375rem] text-ink-foreground transition-colors hover:text-chart-5"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-line-on-ink">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                {contact.emails.sales}
              </a>
              <a
                href={`mailto:${contact.emails.general}`}
                className="group flex items-center gap-3 text-[0.9375rem] text-ink-foreground transition-colors hover:text-chart-5"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-line-on-ink">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                {contact.emails.general}
              </a>

              {contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  className="group flex items-center gap-3 text-[0.9375rem] text-ink-foreground transition-colors hover:text-chart-5"
                >
                  <span className="flex size-9 items-center justify-center rounded-full border border-line-on-ink">
                    <Phone className="size-4" aria-hidden="true" />
                  </span>
                  {phone}
                </a>
              ))}

              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[0.9375rem] text-ink-foreground transition-colors hover:text-chart-5"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-line-on-ink">
                  <MessageCircle className="size-4" aria-hidden="true" />
                </span>
                WhatsApp us
              </a>
            </div>

            <p className="mt-8 border-t border-line-on-ink pt-6 text-[0.8125rem] leading-relaxed text-ink-muted">
              {site.legalName}
              <br />
              {contact.locality}
              <br />
              Building software since {site.founded}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-2xl bg-card p-6 text-foreground shadow-[0_30px_70px_-45px_rgba(0,0,0,0.8)] sm:p-8">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
