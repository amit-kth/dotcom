import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { contact, site } from "@/config/variables";
import { asset } from "@/config/variables";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { SOCIAL_ICONS } from "@/components/social-icons";
import { products, DELIVERY_DAYS } from "@/data/products";
import { categories } from "@/data/categories";

/* ============================================================================
   Footer
   ----------------------------------------------------------------------------
   PURPOSE: the decisive final step, then every way to reach us.

   THE CLOSING BAND
   Heading on the left, the action on the right, on one baseline. The helper
   line sits above the button so the button is the last thing in the row — the
   eye finishes on the thing you want clicked. Height is unchanged: the heading
   still governs the band.

   FIVE COLUMNS, ONE BASELINE
   Brand · Solutions · Industries · Company · Contact. Every column starts on the
   same rule and every list item is a 44px row, so the five columns line up with
   each other and with the container edges. There is no oversized wordmark: the
   wordmark is the logo at the top of column one, once.

   WHAT LINKS WHERE
   About and Clients are the client's own pages (kriscent.in/about,
   kriscent.in/clients); Contact is kriscent.in/contact. All three open in a new
   tab because they leave this site. "How we deliver" and "All solutions" stay
   here.

   PHONE NUMBERS
   The five published lines, and only those. The WhatsApp number is a chat
   initiator, not a call line, so it appears as "WhatsApp us" and never as a
   number.

   No stats and no CMMI badge down here — those live once, in About.
   ========================================================================== */

type FooterLink = { label: string; href: string; external?: boolean };

const COMPANY_LINKS: FooterLink[] = [
  { label: "About Kriscent", href: contact.aboutPage, external: true },
  { label: "Clients", href: contact.clientsPage, external: true },
  { label: "How we deliver", href: "/#delivery" },
  { label: "All solutions", href: "/solutions" },
  { label: "Contact", href: contact.contactPage, external: true },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-band-footer">
      <div className="shell">
        {/* ---- the closing call ---- */}
        <div className="flex flex-col gap-8 border-b border-glass-border py-[clamp(3.5rem,7vw,6rem)] lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div>
            <p className="t-label">Contact</p>
            <h2 className="t-display mt-4 max-w-[16ch]">Tell us what you run.</h2>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-4 sm:items-end">
            <p className="text-[1rem] leading-relaxed text-on-dark-soft">
              One call. We tell you what fits.
            </p>
            <RequestDemoDialog label="Contact us" size="lg" icon="arrow-up-right" />
          </div>
        </div>

        {/* ---- five columns, one baseline ---- */}
        <div className="grid gap-x-8 gap-y-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_0.9fr_0.9fr_1.1fr]">
          <div>
            <img
              src={asset("logo/logo.png")}
              alt={site.name}
              width={274}
              height={72}
              loading="lazy"
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-[30ch] text-[1rem] leading-relaxed text-on-dark-soft">
              Ready-made software, installed and supported by the team that
              built it. Live in {DELIVERY_DAYS} days.
            </p>

            <ul className="mt-6 flex flex-wrap items-center gap-2">
              {contact.socials.map((social) => {
                const Icon =
                  SOCIAL_ICONS[social.label as keyof typeof SOCIAL_ICONS];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${social.label}`}
                      className="social-btn flex size-11 items-center justify-center rounded-full border border-glass-border text-on-dark-soft"
                    >
                      {Icon ? (
                        <Icon className="size-[1.05rem]" />
                      ) : (
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Solutions">
            <h2 className="t-label">Solutions</h2>
            <ul className="mt-2 flex flex-col">
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    href="/#solutions"
                    className="footer-link flex min-h-11 items-center text-[0.9375rem] text-on-dark-soft"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries">
            <h2 className="t-label">Industries</h2>
            <ul className="mt-2 flex flex-col">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href="/#solutions"
                    className="footer-link flex min-h-11 items-center text-[0.9375rem] text-on-dark-soft"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="t-label">Company</h2>
            <ul className="mt-2 flex flex-col">
              {COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link flex min-h-11 items-center gap-1.5 text-[0.9375rem] text-on-dark-soft"
                    >
                      {item.label}
                      <ArrowUpRight
                        className="size-3.5 opacity-60"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="footer-link flex min-h-11 items-center text-[0.9375rem] text-on-dark-soft"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="t-label">Get in touch</h2>
            <ul className="mt-2 flex flex-col">
              {contact.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="footer-link flex min-h-11 items-center gap-2.5 text-[0.9375rem] tabular-nums text-on-dark-soft"
                  >
                    <Phone className="size-4 shrink-0" aria-hidden="true" />
                    {phone}
                  </a>
                </li>
              ))}

              {[contact.emails.sales, contact.emails.general].map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="footer-link flex min-h-11 items-center gap-2.5 text-[0.9375rem] text-on-dark-soft"
                  >
                    <Mail className="size-4 shrink-0" aria-hidden="true" />
                    {email}
                  </a>
                </li>
              ))}

              <li>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link flex min-h-11 items-center gap-2.5 text-[0.9375rem] font-medium text-accent-bright"
                >
                  <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
                  WhatsApp us
                </a>
              </li>
              <li className="flex min-h-11 items-center gap-2.5 text-[0.9375rem] text-on-dark-soft">
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                {contact.locality}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ---- legal bar ---- */}
      <div className="border-t border-glass-border">
        <div className="shell flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.875rem] text-on-dark-faint">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {/* TODO(legal): the only legal page on the old site is Terms, and
                this is its verified URL. No Privacy page exists yet. */}
            <a
              href="https://kriscent.in/terms-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-[0.875rem] text-on-dark-faint transition-colors hover:text-on-dark-soft"
            >
              Terms &amp; conditions
            </a>
            <a
              href="https://kriscent.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-[0.875rem] text-on-dark-faint transition-colors hover:text-on-dark-soft"
            >
              kriscent.in
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
