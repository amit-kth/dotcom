import localFont from "next/font/local";

/* ============================================================================
   fonts.ts ,  the one place the typeface is declared
   ----------------------------------------------------------------------------
   Poppins, self-hosted. Four static weights (400 / 500 / 600 / 700) are
   committed in src/fonts, so the static export makes no external font request
   and the build cannot fail because a font CDN is unreachable.

   Why four files and not one variable font: Poppins ships as static weights.
   Declaring them as one family with explicit `weight` values means the browser
   downloads only the weights the page actually uses (400 for body, 500/600 for
   labels and buttons, 700 for headings), and `next/font` generates the
   preloads and the metric-matched fallback automatically.

   Swapping the typeface is still a one-line change: drop new .woff2 files into
   src/fonts and edit `src` here. Nothing else in the project names a font file.
   ========================================================================== */

export const display = localFont({
  src: [
    { path: "../fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});
