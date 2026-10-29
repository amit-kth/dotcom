import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Seo } from "@/components/seo";
import { SiteHeader } from "@/components/site-header";
import { CategoryProvider } from "@/components/category-context";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { contact, site } from "@/config/variables";
import { DELIVERY_DAYS } from "@/data/products";

/* ============================================================================
   /contact  —  the page every "Book a demo" points at
   ----------------------------------------------------------------------------
   Left: what we are, and every way to reach us. Right: the old site's contact
   form, field for field, so the enquiry arrives in the shape the backend
   already knows.

   The form is its own component (`components/contact-form.tsx`) and submits
   through `lib/submit-contact.ts`; the endpoint is a TODO in
   config/variables.ts, and nothing else has to change when it goes live.

   Dark band, because every page that carries a form here is dark: the fields
   already have a visible fill, border and focus ring on this surface.
   ========================================================================== */

export default function ContactPage() {
  return (
    <>
      <Seo page="contact" />

      {/* the header reads the category context, so every page provides it */}
      <CategoryProvider>
        <SiteHeader />

        <main className="bg-band-base">
        <div className="shell pb-[clamp(4.5rem,9vw,10rem)] pt-[clamp(3rem,7vw,6rem)]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            {/* ---- the pitch and the details ---- */}
            <div>
              <p className="t-label">Contact</p>
              <h1 className="t-heading mt-4 max-w-[16ch]">
                Tell us what you run.
              </h1>
              <p className="t-body mt-6 max-w-[44ch]">
                One call is usually enough to say which solution fits, and when
                it can be live. Every one of them ships in {DELIVERY_DAYS} days.
              </p>

              <ul className="mt-10 flex flex-col gap-1">
                <li>
                  <a
                    href={`mailto:${contact.emails.sales}`}
                    className="footer-link flex min-h-11 items-center gap-3 text-[1rem] text-on-dark"
                  >
                    <Mail className="size-4 shrink-0 text-accent-bright" aria-hidden="true" />
                    {contact.emails.sales}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.emails.general}`}
                    className="footer-link flex min-h-11 items-center gap-3 text-[1rem] text-on-dark"
                  >
                    <Mail className="size-4 shrink-0 text-accent-bright" aria-hidden="true" />
                    {contact.emails.general}
                  </a>
                </li>
                <li>
                  <a
                    href={contact.phoneHref}
                    className="footer-link flex min-h-11 items-center gap-3 text-[1rem] tabular-nums text-on-dark"
                  >
                    <Phone className="size-4 shrink-0 text-accent-bright" aria-hidden="true" />
                    {contact.phoneLine}
                  </a>
                </li>
                <li>
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link flex min-h-11 items-center gap-3 text-[1rem] font-medium text-accent-bright"
                  >
                    <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
                    WhatsApp us
                  </a>
                </li>
                <li className="flex min-h-11 items-center gap-3 text-[1rem] text-on-dark-soft">
                  <MapPin className="size-4 shrink-0 text-accent-bright" aria-hidden="true" />
                  {contact.locality}
                </li>
              </ul>

              <p className="mt-8 max-w-[40ch] border-t border-glass-border pt-6 text-[0.9375rem] leading-relaxed text-on-dark-faint">
                {site.legalName}. We build the software, install it and support it
                — the enquiry goes to that same team.
              </p>
            </div>

            {/* ---- the form ---- */}
            <div className="rounded-md border border-glass-border bg-glass p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
        </main>

        <SiteFooter />
      </CategoryProvider>
    </>
  );
}
