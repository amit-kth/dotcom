import localFont from "next/font/local";

/* ============================================================================
   fonts.ts  —  the one place the typeface is declared
   ----------------------------------------------------------------------------
   Bricolage Grotesque, committed as a single variable .woff2 (wght 200-800,
   opsz axis included) so the static export makes no external font request and
   the build cannot fail because Google Fonts is unreachable.

   Swapping the typeface is a one-line change: drop a new .woff2 into src/fonts,
   change `src` here, and nothing else in the project refers to a font file.

   Why this face: Inter is what every generated site reaches for. Bricolage has
   a display weight with actual character — narrower bowls, a squarer shoulder —
   which is what carries a 96px headline, and it still reads cleanly at 17px.
   ========================================================================== */

export const display = localFont({
  src: "../fonts/bricolage-grotesque.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "200 800",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
