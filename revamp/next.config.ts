import type { NextConfig } from "next";

/**
 * Static export for cPanel (no Node.js on the server).
 * `npm run build` writes a complete site to `out/` which is zipped and uploaded.
 *
 * Constraints that follow from `output: "export"`:
 *   - no dynamic routes, no searchParams, no API routes, no server actions
 *   - no `next/image` optimisation (we use plain <img> anyway)
 *   - no middleware
 *
 * trailingSlash: true makes every route emit `route/index.html` instead of
 * `route.html`. Apache then serves /solutions/ from the folder with no
 * rewrite rules, which is what we want because we cannot touch .htaccess.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // Belt and braces: nothing should reach the image optimiser.
    unoptimized: true,
  },
};

export default nextConfig;
