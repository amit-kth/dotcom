import "./globals.css";
import { display } from "./fonts";
import { site } from "@/config/variables";

/* ============================================================================
   app/layout.tsx  —  the only place <html> and <body> exist
   ----------------------------------------------------------------------------
   Everything page-specific (title, description, canonical, OG, JSON-LD, GTM)
   lives in components/seo.tsx, which every page renders. This file must stay
   free of page metadata so that rule holds.

   FONTS
   -----
   One typeface, self-hosted: Bricolage Grotesque, committed as a .woff2 and
   loaded through next/font/local. It is declared in ./fonts.ts so swapping it
   is a one-line change, and so the build never depends on a font CDN.

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
      <body
        className={`${display.variable} min-h-screen bg-band-base text-foreground antialiased`}
      >
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
