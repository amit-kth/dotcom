/**
 * Tailwind CSS v4 runs entirely through this PostCSS plugin.
 * There is no tailwind.config.js in v4 - the theme lives in app/globals.css
 * inside an @theme block. See the comment at the top of that file.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
