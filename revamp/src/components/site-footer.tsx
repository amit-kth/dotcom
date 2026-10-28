import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { asset, contact, site } from "@/config/variables";
import { RequestDemoDialog } from "@/components/request-demo-dialog";
import { products, DELIVERY_DAYS } from "@/data/products";
import { categories } from "@/data/categories";

/* ============================================================================
   Footer
   ----------------------------------------------------------------------------
   PURPOSE: the decisive final step, then everything a person needs to reach us.

   STRUCTURE
     1  the closing call — the largest type on the page, one button
     2  four columns: the brand, the six solutions, the company, the contact
        details and the social profiles
     3  a legal bar: copyright, terms, the sister site

   No stats and no CMMI badge here: those live once, in About. Repeating them
   at the end would undo the work the About band does.

   SOCIAL
   The five profiles the old site links to, carried over. They come from
   config/variables.ts `contact.socials`, which is also what the Organization
   schema reads, so there is one list and no drift.
   ========================================================================== */

const COMPANY_LINKS = [
  { label: "About Kriscent", href: "/#about" },
  { label: "How we deliver", href: "/#delivery" },
  { label: "Clients", href: "/#clients" },
  { label: "All solutions", href: "/solutions" },
] as const;

export function SiteFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-band-footer">
      <div className="shell">
        {/* ---- the closing call ---- */}
        <div className="flex flex-col items-start gap-10 border-b border-glass-border py-[clamp(3.5rem,7vw,6rem)] lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="t-label">Contact</p>
            <h2 className="t-display mt-4 max-w-[16ch]">Tell us what you run.</h2>
          </div>
          <div className="flex flex-col items-start gap-3 lg:pb-2">
            <RequestDemoDialog label="Contact us" size="lg" />
            <p className="text-[1rem] text-on-dark-soft">
              We will tell you what fits, in one call.
            </p>
          </div>
        </div>

        {/* ---- the practical half ---- */}
        <div className="grid gap-x-10 gap-y-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.9fr_1.2fr]">
          <div>
            <img
              src={asset("logo/logo.png")}
              alt={site.name}
              width={274}
              height={72}
              loading="lazy"
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-[32ch] text-[1rem] leading-relaxed text-on-dark-soft">
              Ready-made software, installed and supported by the team that
              built it. Live in {DELIVERY_DAYS} days.
            </p>

            {/* Social profiles as named links rather than brand glyphs: the
                names are readable, they are the same five the old site links
                to, and there is no half-drawn logo to get wrong. */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {contact.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center rounded-full border border-glass-border px-4 text-[0.9375rem] font-medium text-on-dark-soft transition-colors duration-200 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Solutions">
            <h2 className="t-label">Solutions</h2>
            <ul className="mt-4 flex flex-col">
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    href="/#solutions"
                    className="flex min-h-11 items-center text-[1rem] text-on-dark-soft transition-colors hover:text-on-dark"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
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

            <h2 className="t-label mt-8">Company</h2>
            <ul className="mt-4 flex flex-col">
              {COMPANY_LINKS.map((item) => (
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

          <div>
            <h2 className="t-label">Get in touch</h2>
            <ul className="mt-4 flex flex-col gap-1">
              {[contact.emails.sales, contact.emails.general].map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="flex min-h-11 items-center gap-2.5 text-[1rem] text-on-dark-soft transition-colors hover:text-on-dark"
                  >
                    <Mail className="size-4 shrink-0" aria-hidden="true" />
                    {email}
                  </a>
                </li>
              ))}
              {contact.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="flex min-h-11 items-center gap-2.5 text-[1rem] text-on-dark-soft transition-colors hover:text-on-dark"
                  >
                    <Phone className="size-4 shrink-0" aria-hidden="true" />
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2.5 text-[1rem] font-medium text-accent-bright transition-opacity hover:opacity-80"
                >
                  <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
                  WhatsApp us
                </a>
              </li>
              <li className="flex min-h-11 items-center gap-2.5 text-[1rem] text-on-dark-soft">
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                {contact.locality}
              </li>
            </ul>

            <a
              href="https://kriscent.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-[1rem] font-semibold text-on-dark transition-colors hover:text-accent-bright"
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
            <span className="text-[0.875rem] text-on-dark-faint">
              Kota, Rajasthan, India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
