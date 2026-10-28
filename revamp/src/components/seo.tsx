import { pages, type PageKey, site, contact } from "@/config/variables";

/* ============================================================================
   Seo  —  the wrapper every page must use
   ----------------------------------------------------------------------------
   WHY THIS FILE HAS NO <html> OR <body>
   -------------------------------------
   The brief asked for seo.tsx to contain <head> and <body>. Next.js App Router
   does not allow that: <html> and <body> must exist exactly once, in the root
   app/layout.tsx, or the build fails. So the split is:

       app/layout.tsx  ->  <html>, <body>, font imports, GTM noscript iframe
       components/seo.tsx  ->  <title>, <meta>, <link rel="canonical">,
                               Open Graph, Twitter card, JSON-LD, GTM script

   React 19 hoists <title>, <meta> and <link> rendered anywhere in the tree into
   <head> automatically, so putting them here gives the same result as writing
   them by hand, while keeping the "every page is wrapped in Seo" rule intact.

   HOW TO USE
   ----------
       import { Seo } from "@/components/seo";

       export default function Page() {
         return (
           <>
             <Seo page="home" />
             ...page content...
           </>
         );
       }

   WHAT IS CONFIGURED PER PAGE, AND WHERE
   --------------------------------------
   - title / description / canonical path  -> config/variables.ts -> pages[key]
   - ogImage                               -> pages[key].ogImage (optional)
   - noindex                               -> pages[key].noindex, defaults false
   - everything shared (site url, brand, contact, GTM) -> config/variables.ts

   Overrides exist for the rare page that needs a different title than its
   entry in variables.ts, but the default path is to edit variables.ts instead,
   so that all metadata stays in one file.
   ========================================================================== */

type SeoProps = {
  /** Key into `pages` in config/variables.ts. Required - no page ships without metadata. */
  page: PageKey;
  /** Optional override. Prefer editing variables.ts so metadata stays in one place. */
  titleOverride?: string;
  descriptionOverride?: string;
};

export function Seo({ page, titleOverride, descriptionOverride }: SeoProps) {
  const meta = pages[page];

  const title = titleOverride ?? meta.title;
  const description = descriptionOverride ?? meta.description;
  const canonical = `${site.url}${meta.path === "/" ? "/" : meta.path + "/"}`;
  const ogImage = meta.ogImage
    ? `${site.url}/${meta.ogImage}`
    : `${site.url}/logo/logo.png`;

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
    sameAs: [site.url],
  };

  /* WebSite schema: helps search engines attach the brand to the domain. */
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };

  return (
    <>
      {/* --- primary metadata ------------------------------------------- */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {meta.noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonical} />

      {/* --- Open Graph -------------------------------------------------- */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={site.locale} />

      {/* --- Twitter / X ------------------------------------------------- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* --- structured data --------------------------------------------- */}
      <script
        type="application/ld+json"
        // Static objects defined above. No user input is ever interpolated.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema]),
        }}
      />

      {/* --- analytics: Google Tag Manager, carried over from the old site.
             The <noscript> half of GTM lives in app/layout.tsx because it
             belongs inside <body>. -------------------------------------- */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');`,
        }}
      />
    </>
  );
}
