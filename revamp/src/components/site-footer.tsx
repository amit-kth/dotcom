import Link from "next/link";
import { OfficeLocations } from "@/components/footer/office-locations";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { contact, site } from "@/config/variables";
import { SOCIAL_ICONS, WhatsAppIcon } from "@/components/social-icons";
import { buttonVariants } from "@/components/ui/button";
import { products, DELIVERY_DAYS } from "@/data/products";
import { categories } from "@/data/categories";
import { SHELL, T_LABEL } from "@/lib/ui";
import { cn } from "@/lib/utils";

type FooterLink = { label: string; href: string; external?: boolean };

const COMPANY_LINKS: FooterLink[] = [
  { label: "About Kriscent", href: contact.aboutPage, external: true },
  { label: "Clients", href: contact.clientsPage, external: true },
  { label: "How we deliver", href: "/#delivery" },
  { label: "All solutions", href: "/solutions" },
  { label: "Contact us", href: contact.contactPath },
];

/** One row of the footer: 44px tall, and the only motion is a 2px nudge. */
const LINK =
  "flex min-h-11 items-center text-[0.9375rem] text-slate-300 transition-[color,transform] duration-200 hover:translate-x-0.5 hover:text-slate-50";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-50">
      <div className={SHELL}>
        {/* ---- the closing call ---- */}
        <div className="flex flex-row items-center gap-5 border-b border-white/15 py-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div>
            <p className={cn(T_LABEL, "text-slate-300")}>Contact</p>
            <h2 className="mt-3 max-w-[20ch] text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
              Tell us what you run.
            </h2>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-4 sm:items-end">
            <p className="hidden text-[1rem] leading-relaxed text-slate-300 sm:block">
              One call. We tell you what fits.
            </p>
            <Link
              href={contact.contactPath}
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Contact us
              <Mail className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <OfficeLocations />

        {/* ---- five columns, one baseline ---- */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 py-8 lg:grid-cols-[minmax(15rem,1.2fr)_repeat(3,minmax(0,0.8fr))_minmax(14rem,1.3fr)]">
          <div className="col-span-2 lg:col-span-1">
            <img
              src="/logo/logo.png"
              alt={site.name}
              width={274}
              height={72}
              loading="lazy"
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="mt-3 max-w-[34ch] text-[1rem] leading-relaxed text-slate-300">
              Ready-made software, installed and supported by the team that
              built it. Live in {DELIVERY_DAYS} days.
            </p>

            <ul className="mt-4 flex flex-nowrap items-center gap-1">
              {contact.socials.map((social) => {
                const Icon =
                  SOCIAL_ICONS[social.label as keyof typeof SOCIAL_ICONS];
                return (
                  <li key={social.label} className="shrink-0">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${social.label}`}
                      className="flex size-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.07] hover:text-slate-50"
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
            <h2 className={cn(T_LABEL, "text-slate-300")}>Solutions</h2>
            <ul className="mt-2 flex flex-col">
              {products.map((product) => (
                <li key={product.id}>
                  <Link href="/#solutions" className={LINK}>
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries">
            <h2 className={cn(T_LABEL, "text-slate-300")}>Industries</h2>
            <ul className="mt-2 flex flex-col">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href="/#solutions" className={LINK}>
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="col-span-2 sm:col-span-1">
            <h2 className={cn(T_LABEL, "text-slate-300")}>Company</h2>
            <ul className="mt-2 grid grid-cols-2 sm:flex sm:flex-col">
              {COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(LINK, "gap-1.5")}
                    >
                      {item.label}
                      <ArrowUpRight
                        className="size-3.5 opacity-60"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <Link href={item.href} className={LINK}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h2 className={cn(T_LABEL, "text-slate-300")}>Get in touch</h2>
            <ul className="mt-2 flex flex-col">
              {/* Five lines, one link: "+91-7240560001/2/3/4/5" dials the
                  first. Splitting them into five 44px rows made the column
                  twice as tall as its neighbours for no extra information. */}
              <li>
                <a
                  href={contact.phoneHref}
                  /* read as five lines, printed as one */
                  aria-label={`Call us on ${contact.phones[0]}, lines one to five`}
                  className={cn(LINK, "gap-2.5 whitespace-nowrap tabular-nums")}
                >
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  {contact.phoneLine}
                </a>
              </li>

              {[contact.emails.sales, contact.emails.general].map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`} className={cn(LINK, "gap-2.5")}>
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
                  className={cn(
                    LINK,
                    "gap-2.5 font-medium text-green-400 hover:text-green-300",
                  )}
                >
                  <WhatsAppIcon className="size-4 shrink-0" />
                  WhatsApp us
                </a>
              </li>
              <li className="flex min-h-11 items-center gap-2.5 text-[0.9375rem] text-slate-300">
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                {contact.locality}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ---- legal bar ---- */}
      <div className="border-t border-white/15">
        <div
          className={cn(
            SHELL,
            "flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between",
          )}
        >
          <p className="text-[0.875rem] text-slate-400">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {/* TODO(legal): the only legal page on the old site is Terms, and
                this is its verified URL. No Privacy page exists yet. */}
            <a
              href="https://kriscent.in/terms-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-[0.875rem] text-slate-400 transition-colors hover:text-slate-300"
            >
              Terms &amp; conditions
            </a>
            <a
              href="https://kriscent.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-[0.875rem] text-slate-400 transition-colors hover:text-slate-300"
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
