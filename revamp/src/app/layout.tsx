import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
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
   Inter, self-hosted through @fontsource: the same files Google serves, bundled
   at build time so the static export makes no external font request. Only the
   four weights in use, and only the `latin` subset. Poppins was replaced here
   because a soft geometric face is what made the page read as generic; Inter's
   tighter forms hold up at headline size.

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
      <body className="min-h-screen bg-cream text-foreground antialiased">
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
