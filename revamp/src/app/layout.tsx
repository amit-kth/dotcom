import "./globals.css";
import { display } from "./fonts";
import Script from "next/script";
import { CategoryProvider } from "@/components/category-context";
import { SolutionSearchProvider } from "@/components/search/solution-search";
import { OfferStrip } from "@/components/offers/offer-strip";
import { SitePopup } from "@/components/offers/site-popup";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RouteTracker } from "@/components/route-tracker";
import { site, contact } from "@/config/variables";

/** The root owns the shared header, footer, category provider, fonts, GTM (script + noscript), and site-wide schemas once.
 * Page metadata stays in lib/seo.tsx; no layout metadata export duplicates it.
 * Poppins is self-hosted. RouteTracker reports subsequent client navigations.
 */

/* Organization schema: same facts as the footer, nothing invented. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/logo/logo.png`,
  foundingDate: String(site.founded),
  email: contact.emails.general,
  telephone: contact.phones[0],
  sameAs: contact.socials.map((item) => item.href),
};

/* WebSite schema: helps search engines attach the brand to the domain. */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
};

const serializeSchema = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icons/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-touch-icon-76.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-touch-icon-120.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/apple-touch-icon-167.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        {/* Framer Motion leaves its "before" state as an inline style
            (opacity: 0). Without JavaScript that style never gets replaced and
            the page would read as empty, so the no-JS case gets one rule that
            removes every reveal state. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}',
            }}
          />
        </noscript>
      </head>
      <body
        className={`${display.variable} min-h-screen bg-white text-slate-950 antialiased`}
      >
        {/* Google Tag Manager (noscript), loads once with next/script below */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');`}
        </Script>
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeSchema(organizationSchema),
          }}
        />
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeSchema(websiteSchema) }}
        />
        <RouteTracker />
        <CategoryProvider>
          <SolutionSearchProvider>
            <OfferStrip />
            <SiteHeader />
            {children}
            <SiteFooter />
            <SitePopup />
          </SolutionSearchProvider>
        </CategoryProvider>
      </body>
    </html>
  );
}
