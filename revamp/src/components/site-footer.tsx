import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { asset, contact, site } from "@/config/variables";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { Reveal } from "@/components/reveal";
import { categories } from "@/data/categories";

/* ============================================================================
   Footer
   ----------------------------------------------------------------------------
   PURPOSE: the decisive final step.

   The closing call to action is the largest thing in the band — bigger than any
   heading above it, because at this point the visitor has decided or they have
   not, and the button is the only thing that matters.

   No stats, no CMMI, no repeated promises: those live once, in the About band.
   The band itself is the darkest value on the page, so it reads as an ending
   rather than as one more section.
   ========================================================================== */

const SITE_LINKS = [
  { label: "Solutions", href: "/#solutions" },
  { label: "How it works", href: "/#delivery" },
  { label: "About", href: "/#about" },
  { label: "Clients", href: "/#clients" },
] as const;

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-band-footer">
      <div className="shell band">
        {/* ---- the closing call ---- */}
        <Reveal className="flex flex-col items-start gap-8 border-b border-glass-border pb-16 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="t-display max-w-[13ch]">Tell us what you run.</h2>
          <div className="flex flex-col items-start gap-3 pb-2">
            <RequestDemoDialog label="Request a demo" size="lg" />
            <p className="text-[1rem] text-on-dark-soft">
              We&apos;ll tell you what fits.
            </p>
          </div>
        </Reveal>

        {/* ---- the practical half ---- */}
        <div className="grid gap-x-10 gap-y-12 pt-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div>
            <img
              src={asset("logo/logo.png")}
              alt={site.name}
              width={274}
              height={72}
              loading="lazy"
              className="h-6 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-[30ch] text-[1rem] leading-relaxed text-on-dark-soft">
              Ready-made software, installed and supported by the team that
              built it.
            </p>

            <div className="mt-4 flex flex-col gap-1">
              {[contact.emails.sales, contact.emails.general].map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="inline-flex min-h-11 items-center gap-2.5 text-[1rem] text-on-dark-soft transition-colors hover:text-on-dark"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {email}
                </a>
              ))}
              {contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  className="inline-flex min-h-11 items-center gap-2.5 text-[1rem] text-on-dark-soft transition-colors hover:text-on-dark"
                >
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  {phone}
                </a>
              ))}
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2.5 text-[1rem] font-medium text-accent-bright transition-opacity hover:opacity-80"
              >
                <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
                WhatsApp us
              </a>
              <p className="inline-flex min-h-11 items-center gap-2.5 text-[1rem] text-on-dark-soft">
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                {contact.locality}
              </p>
            </div>
          </div>

          <nav aria-label="Solutions">
            <h2 className="t-label">Site</h2>
            <ul className="mt-4 flex flex-col">
              {SITE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-center text-[1rem] text-on-dark-soft transition-colors hover:text-on-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries">
            <h2 className="t-label">Industries</h2>
            <ul className="mt-4 flex flex-col">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href="/#solutions"
                    className="flex min-h-11 items-center text-[1rem] text-on-dark-soft transition-colors hover:text-on-dark"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="t-label">Custom work</h2>
            <p className="mt-5 max-w-[26ch] text-[1rem] leading-relaxed text-on-dark-soft">
              Need something that is not on this page? That is a build, and we
              have been building since {site.founded}.
            </p>
            <a
              href="https://kriscent.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[1rem] font-semibold text-accent-bright"
            >
              kriscent.in
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* the faint wordmark: a full stop at the end of the page */}
      <div aria-hidden="true" className="overflow-hidden px-6">
        <p className="wordmark-faint text-center">{site.name.toLowerCase()}</p>
      </div>

      <div className="shell">
        <div className="flex flex-col gap-3 border-t border-glass-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.875rem] text-on-dark-faint">
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <div className="flex items-center gap-6">
            {/* TODO(legal): the only legal page that exists on the old site is
                Terms, and it is linked as verified. There is no Privacy page
                anywhere in the source, so nothing is invented here: add the
                link when the policy is written. */}
            <a
              href="https://kriscent.in/terms-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.875rem] text-on-dark-faint transition-colors hover:text-on-dark-soft"
            >
              Terms &amp; conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
