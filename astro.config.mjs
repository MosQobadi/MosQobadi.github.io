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
  vite: {
    plugins: [tailwindcss()],
  },
});
