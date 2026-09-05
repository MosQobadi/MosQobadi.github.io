// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static output — GitHub Pages serves the contents of dist/ directly.
//
// `site` is the live origin. It's what canonical URLs and og:url are built
// from, so it has to match reality. This repo is named MosQobadi.github.io,
// which GitHub serves at the account root — that's why there's no `base` here.
// If the repo were ever renamed to something else, the site would move to
// https://mosqobadi.github.io/<repo>/ and every internal link would need to go
// through `import.meta.env.BASE_URL`.
export default defineConfig({
  site: "https://mosqobadi.github.io",

  // English is the default and is served from the root with no prefix, so the
  // URL that goes on a business card stays "/" rather than "/en/". French
  // lives under /fr/. `redirectToDefaultLocale: false` keeps our own 404.astro
  // in charge of unknown paths instead of bouncing them to the homepage.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
