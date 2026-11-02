import { metadata, legacySeo, site } from "@/config/variables";

/** Legacy homepage SEO; new routes keep their own title and description. */
export function Seo({ path, title, description }: typeof metadata.home) {
  const home = path === "/";
  const canonical = `${site.url}${home ? "/" : path + "/"}`;
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: home ? site.name : title,
    url: home ? "https://kriscent.com/" : canonical,
    description: home ? legacySeo.ogDescription : description,
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={legacySeo.author} />
      <meta name="keywords" content={legacySeo.keywords} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={home ? "business.business" : "website"} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={home ? legacySeo.ogTitle : title} />
      <meta property="og:description" content={home ? legacySeo.ogDescription : description} />
      <meta property="og:url" content={home ? legacySeo.ogUrl : canonical} />
      <meta property="og:image" content={`${site.url}${site.ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={site.ogImageAlt} />
      <meta property="og:locale" content={site.locale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={legacySeo.twitterSite} />
      <meta name="twitter:title" content={home ? legacySeo.twitterTitle : title} />
      <meta name="twitter:description" content={home ? legacySeo.twitterDescription : description} />
      <meta name="twitter:image" content={`${site.url}${site.ogImage}`} />
      <meta name="twitter:image:alt" content={site.ogImageAlt} />
      <script id="page-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
