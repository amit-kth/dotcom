import { metadata, site } from "@/config/variables";

/** Shared tags; each page passes its metadata directly. */
export function Seo({
  path,
  title,
  description,
  ogImage,
}: typeof metadata.home) {
  const canonical = `${site.url}${path === "/" ? "/" : path + "/"}`;
  const image = `${site.url}/${ogImage}`;

  return (
    <>
      {/* --- primary metadata ------------------------------------------- */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* --- Open Graph -------------------------------------------------- */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={site.locale} />

      {/* --- Twitter / X ------------------------------------------------- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
