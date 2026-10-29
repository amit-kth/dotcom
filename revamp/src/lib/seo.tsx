import { pages, type PageKey, site } from "@/config/variables";

/** Page-specific metadata, sourced from config/variables.ts.
 * React hoists these tags into head. GTM and site-wide JSON-LD live in
 * app/layout.tsx: Seo can re-render on navigation; analytics must load once.
 */

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
    : `${site.url}/logo/og.png`;

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
    </>
  );
}
