import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import "./globals.css";
import { site } from "@/config/variables";

/* ============================================================================
   app/layout.tsx  —  the only place <html> and <body> exist
   ----------------------------------------------------------------------------
   Everything page-specific (title, description, canonical, OG, JSON-LD, GTM)
   lives in components/seo.tsx, which every page renders. This file must stay
   free of page metadata so that rule holds.

   FONTS
   -----
   Poppins is Google's typeface, self-hosted through @fontsource. It is the
   same font file Google serves, but bundled at build time instead of fetched
   at runtime, which keeps the static export free of external font requests.
   Only the four weights the design uses are imported, and only the `latin`
   subset: the site is English, so the devanagari and latin-ext files Google
   also ships would be dead weight.

   Deliberately NO `export const metadata` here. Next would then emit its own
   <title> and <meta name="description"> in addition to the ones seo.tsx renders,
   giving two of each in <head>. Per-page metadata belongs in seo.tsx only.

   The <noscript> half of Google Tag Manager has to live inside <body>, so it
   is here rather than in seo.tsx.
   ========================================================================== */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Google Tag Manager (noscript) — pairs with the script in seo.tsx */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
