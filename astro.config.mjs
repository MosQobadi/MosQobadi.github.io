// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static output — Cloudflare Pages serves the contents of dist/ directly.
// Set `site` to the real domain before launch so sitemap/canonical URLs are right.
export default defineConfig({
  site: "https://example.pages.dev",
  vite: {
    plugins: [tailwindcss()],
  },
});
