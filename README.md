# Portfolio — websites for local businesses

A sales page, not a CV. It exists to turn a Facebook Marketplace click into a
WhatsApp message: what I build, what it costs, and one button to start a
conversation.

Built with [Astro](https://astro.build) and Tailwind CSS, output as plain static
files. There is **7 KB of JavaScript on the whole site** — the page is meant to
be the proof that I can build a fast one.

---

## Running it

```bash
pnpm install
pnpm dev
```

Then open http://localhost:4321.

| Command        | What it does                             |
| -------------- | ---------------------------------------- |
| `pnpm dev`     | Dev server with hot reload               |
| `pnpm build`   | Static build into `dist/`                |
| `pnpm preview` | Serve `dist/` exactly as it'll be served |
| `pnpm check`   | Type-check every `.astro` and `.ts` file |
| `pnpm format`  | Prettier over the whole repo             |

---

## Editing the content

**Almost all the portfolio's copy lives in one file:
[`src/data/site.ts`](src/data/site.ts).** Components read from it, so you rarely
need to open a `.astro` file to change what the site says.

| What you want to change              | Where in `site.ts`     |
| ------------------------------------ | ---------------------- |
| WhatsApp number and first message    | top of the file        |
| Your name, page title, email         | `site`                 |
| Headline, CTA label, the three ticks | `hero`                 |
| Work samples — the core section      | `workSamples`          |
| Package names, prices, features      | `tiers`, `pricingNote` |
| The four "how it works" steps        | `steps`                |
| Closing CTA wording                  | `closing`              |

### Swapping a work-sample thumbnail

Drop a **1200 × 750** image into `src/assets/work/` with the same filename as
the one it replaces. Astro converts it to WebP, generates the responsive sizes
and stamps in the dimensions — nothing else to change.

Or regenerate them from the live pages:

```bash
pnpm build
pnpm preview --port 4322        # leave running
pnpm thumbnails                 # in another terminal
```

It drives headless Chrome (already on the machine — no Playwright to install)
and downsamples from 2x, so the cards stay sharp on a phone. Add names to do a
subset: `pnpm thumbnails shop plumber`.

> **The Top Oil card is a placeholder.** `topoil.ir` refused a TLS handshake from
> the machine this was built on, so rather than ship a screenshot of a Chrome
> error page there's a plain branded panel instead. From a machine that can reach
> the site, run `pnpm thumbnails topoil` — then update `imageAlt` for that entry
> in `site.ts` to describe what the screenshot actually shows. The script refuses
> to overwrite an image when the URL doesn't answer, so it can't go wrong twice.

### Adding a work sample

Add an entry to `workSamples` in `site.ts`, with an `import` for its image at the
top of the file alongside the others. Set `isDemo: false` only for real client
work — the honesty is the point, and the card labels itself from that flag.

---

## The demos

Three fictional businesses under `/demos/`, each a single self-contained file:

| Page                                                   | Business           | What it shows                                                           |
| ------------------------------------------------------ | ------------------ | ----------------------------------------------------------------------- |
| [`restaurant.astro`](src/pages/demos/restaurant.astro) | Olive & Ember      | Menu, opening hours with a live open/closed badge, map, booking form    |
| [`plumber.astro`](src/pages/demos/plumber.astro)       | Northgate Plumbing | Services, published prices, coverage area, reviews, callback form       |
| [`shop.astro`](src/pages/demos/shop.astro)             | Fernwood Supply    | Product grid with filters, basket that survives a reload, checkout flow |

Each demo owns its content in its own frontmatter, so a page can be copied out
and re-pointed at a real client without untangling it from the rest of the site.
Each one also carries a sticky banner saying it's a demo — they're labelled as
self-initiated work everywhere they appear.

The shop's catalogue is the one exception: it sits in
[`src/data/demo-shop.ts`](src/data/demo-shop.ts) because the cart script needs
the same prices the grid renders.

**None of the demo forms send anything anywhere.** They validate, then show you
what would happen next. The shop's checkout deliberately asks for no card
details at all — a real build hands off to Stripe at that point.

---

## Colours and theming

All colour lives as tokens at the top of
[`src/styles/global.css`](src/styles/global.css) — the portfolio's palette plus
one set per demo (`cafe-*`, `trade-*`, `shop-*`). They're roles, not shades:
`text-muted` means "secondary text". Every accent is contrast-checked at 4.5:1 or
better under white text; if you re-tint anything, keep it there.

---

## Deploying

The site is published to **GitHub Pages** from this repo, at
<https://mosqobadi.github.io>.

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) does the whole
thing: every push to `main` builds with Astro and publishes `dist/`. There is
nothing to run by hand and no `dist/` committed to the repo.

**One-time setup** (already done, but here's what it was):
**Settings → Pages → Build and deployment → Source: GitHub Actions.** Not
"Deploy from a branch" — that option would try to serve the un-built source.

To check on a deploy, or to re-publish without making a commit, use the
**Actions** tab.

### Two things GitHub Pages does not do

- **No custom headers.** `_headers` is a Cloudflare Pages feature and was
  removed, because a file that silently does nothing is worse than not having
  it. The security headers and the immutable caching for `/_astro/*` are lost;
  Pages applies its own short cache to everything instead. Nothing on this site
  depends on them.
- **`public/.nojekyll`** exists so nothing ever tries to run the output through
  Jekyll, which ignores directories beginning with an underscore and would eat
  `/_astro/`.

### Custom domain

**Settings → Pages → Custom domain.** Add the domain, let GitHub write the
`CNAME` file, then change `site` in [`astro.config.mjs`](astro.config.mjs) to
match so canonical URLs follow, and push.

### If the repo is ever renamed

`MosQobadi.github.io` is served at the account root, which is why there is no
`base` in the Astro config. Rename the repo and the site moves to
`https://mosqobadi.github.io/<repo>/`, at which point every internal link —
`/demos/restaurant/`, `/#work`, the favicon — needs to go through
`import.meta.env.BASE_URL`. Renaming is not a free action.
