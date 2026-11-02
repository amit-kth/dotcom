# Kriscent revamp

Next.js + TypeScript, exported as static HTML. All new work lives here; the legacy PHP website outside `/revamp` is unchanged.

## Run and check

Use Node.js 22+ and npm. Python 3 is needed only for the export audit.

```sh
cd revamp
npm ci
npm run dev             # development
npm run check           # production build, types, tests and exported SEO audit
npm start               # preview out/ locally (downloads serve if needed)
```

## Configure

- `src/config/variables.ts`: company/contact details, metadata, analytics and enquiry endpoint.
- `src/data/`: solutions, catalogue, clients and search content.
- `public/`: images, icons, `robots.txt` and `sitemap.xml`. Keep discovery URLs in sync with the production domain.
- Set **CONTACT_ENDPOINT** to a tested backend accepting the JSON contract in `src/app/contact/lib/submit-contact.ts`. It must return HTTP 2xx only for accepted submissions and needs appropriate CORS and spam protection. The unconfigured form reports failure; it never pretends to send an enquiry. Static hosting alone cannot send email. Do not put server secrets in this project.

## Build for cPanel

1. Run `npm ci && npm run build`. Upload the **contents of `out/`**, including `_next/`, to the intended document root. No Node.js server is needed on cPanel.
2. Back up the live website first. Preserve existing PHP endpoints, product directories, images and unrelated files; do not replace the entire hosting directory.
3. Merge `deploy/htaccess.example` into the existing hosting rules. `index.html` must take priority over legacy `index.php`. Keep a real HTTP 404; do not rewrite every URL to the homepage.
4. Test `/`, `/solutions/`, `/contact/`, `/404.html`, an unknown URL, images, analytics and a real form submission on the final domain. Check HTTPS and canonical host redirects in hosting settings.

## What changed

Unused select UI/dependency, old background/social images and unused styles were removed. The K-Exam premium artwork was refreshed. Homepage SEO now matches the legacy metadata and legitimate WebPage schema; new routes retain relevant metadata. Placeholder reviews, inaccessible zoom restrictions and obsolete scripts were deliberately not copied. See `VERIFICATION.md` for checks and remaining deployment requirements.
