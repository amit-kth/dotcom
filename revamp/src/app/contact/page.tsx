import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Seo } from "@/lib/seo";
import { ContactForm } from "@/app/contact/components/contact-form";
import { ContactHeading } from "@/app/contact/components/contact-heading";
import { contact, site } from "@/config/variables";
import { SHELL } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** The contact rows: 44px tall, and the only motion is a 2px nudge. */
const LINK =
  "flex min-h-11 items-center text-slate-600 transition-[color,transform] duration-200 hover:translate-x-0.5 hover:text-slate-950";

/* ============================================================================
   /contact ,  where both call-to-action labels land
   ----------------------------------------------------------------------------
   Left: the title and every way to reach us. Right: the old site's contact form,
   field for field, so the enquiry arrives in the shape the backend already
   knows, without additional fields.

   The two entry points:
     nav and footer  ->  "Contact us"                  /contact
     product banner  ->  "Request a demo"               /contact?solution=<id>
   Same page, same form, a context-specific title with the same original form fields.

   The form is its own component (`components/contact-form.tsx`) and submits
   through `lib/submit-contact.ts`; the endpoint is a TODO in
   config/variables.ts, and nothing else has to change when it goes live.

   ========================================================================== */

export default function ContactPage() {
  return (
    <>
      <Seo page="contact" />

      <main className="bg-slate-50">
        <div
          className={cn(
            SHELL,
            "pb-[clamp(4.5rem,9vw,10rem)] pt-[clamp(3rem,7vw,6rem)]",
          )}
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            {/* ---- the pitch and the details ---- */}
            <div>
              {/* the title is the only thing on this page that changes with the
                  query string: "Contact us", or "Request a demo of <product>" */}
              <ContactHeading />

              <ul className="mt-10 flex flex-col gap-1">
                <li>
                  <a
                    href={`mailto:${contact.emails.sales}`}
                    className={cn(LINK, "gap-3 text-[1rem] text-slate-950")}
                  >
                    <Mail
                      className="size-4 shrink-0 text-blue-700"
                      aria-hidden="true"
                    />
                    {contact.emails.sales}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.emails.general}`}
                    className={cn(LINK, "gap-3 text-[1rem] text-slate-950")}
                  >
                    <Mail
                      className="size-4 shrink-0 text-blue-700"
                      aria-hidden="true"
                    />
                    {contact.emails.general}
                  </a>
                </li>
                <li>
                  <a
                    href={contact.phoneHref}
                    className={cn(
                      LINK,
                      "gap-3 text-[1rem] tabular-nums text-slate-950",
                    )}
                  >
                    <Phone
                      className="size-4 shrink-0 text-blue-700"
                      aria-hidden="true"
                    />
                    {contact.phoneLine}
                  </a>
                </li>
                <li>
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      LINK,
                      "gap-3 text-[1rem] font-medium text-blue-700 hover:text-blue-700",
                    )}
                  >
                    <MessageCircle
                      className="size-4 shrink-0"
                      aria-hidden="true"
                    />
                    WhatsApp us
                  </a>
                </li>
                <li className="flex min-h-11 items-center gap-3 text-[1rem] text-slate-600">
                  <MapPin
                    className="size-4 shrink-0 text-blue-700"
                    aria-hidden="true"
                  />
                  {contact.locality}
                </li>
              </ul>

              <p className="mt-8 max-w-[40ch] border-t border-slate-200 pt-6 text-[0.9375rem] leading-relaxed text-slate-500">
                {site.legalName}. We build the software, install it and support
                it, the enquiry goes to that same team.
              </p>
            </div>

            {/* ---- the form ---- */}
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
