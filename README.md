# Portfolio — websites and web apps for local businesses

A sales page, not a CV. It exists to turn a Facebook Marketplace click into a
WhatsApp message: what I build, what it costs, and one button to start a
conversation.

It has a second job, and the design is most of how it does it. A prospective
customer reads the site itself as a sample of what they will get — so a plain
page quietly promises a plain website. The page is the portfolio.

Two things follow from that, and both are load-bearing rather than decoration:

- **The work is not capped at the price list.** A page that only shows $120
  landing pages tells the reader that is the ceiling. The
  [capabilities section](src/components/Capabilities.astro) sits _above_ pricing
  and says plainly that web applications, ERP and CRM systems are the larger
  half of the work — because once the numbers are read first, they frame
  everything that comes after them.
- **English and French, light and dark**, both first-class. The audience is
  Canadian; prices are in CAD and set the way each language sets them
  (`$280` in English, `280 $` in French).

Built with [Astro](https://astro.build) and Tailwind CSS, output as plain static
files. The homepage ships **~3 KB of inline JavaScript and no external script
files at all** — the page is meant to be the proof that I can build a fast one.

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

**All of the portfolio's copy lives in two files, one per language:**
[`src/data/en.ts`](src/data/en.ts) and [`src/data/fr.ts`](src/data/fr.ts).
Components read from them, so you rarely need to open a `.astro` file to change
what the site says.

Both are typed as `Content` from [`src/data/types.ts`](src/data/types.ts), so
**adding a string to one language and forgetting the other fails `pnpm check`**
rather than shipping a half-translated page.

| What you want to change              | Where in `en.ts` / `fr.ts` |
| ------------------------------------ | -------------------------- |
| Headline, CTA label, the three ticks | `hero`                     |
| Work sample names and descriptions   | `work.samples`             |
| The "beyond websites" section        | `capabilities`             |
| Package names, prices, features      | `pricing.tiers`            |
| The four "how it works" steps        | `process.steps`            |
| Closing CTA and the message builder  | `closing`                  |

Everything that is **not words** lives once in
[`src/data/shared.ts`](src/data/shared.ts) — the WhatsApp number, your name and
email, and each work sample's image, link and demo/client flag. Keeping it out
of the language files means a translation cannot accidentally point a card at a
different site.

### A note on wording

The copy avoids the word _simple_ on purpose. It reads as a promise about the
result rather than about the process, and it sets the reader's price expectation
for you. `en.ts` carries the full note at the top of the file.

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
subset: `pnpm thumbnails gym plumber`.

> **The Top Oil card is a placeholder.** `topoil.ir` refused a TLS handshake from
> the machine this was built on, so rather than ship a screenshot of a Chrome
> error page there's a plain branded panel instead. From a machine that can reach
> the site, run `pnpm thumbnails topoil` — then update `imageAlt` for that entry
> in **both** `en.ts` and `fr.ts` to describe what the screenshot actually
> shows. The script refuses to overwrite an image when the URL doesn't answer,
> so it can't go wrong twice.

### Adding a work sample

Three edits, and the type checker walks you through them:

1. Add its id to `WorkId` in [`src/data/types.ts`](src/data/types.ts).
2. Add an entry to `workMedia` and `workOrder` in `shared.ts`, with an `import`
   for its image at the top of the file alongside the others. Set
   `isDemo: false` only for real client work — the honesty is the point, and the
   card labels itself from that flag.
3. Add its copy to `work.samples` in `en.ts` and `fr.ts`.

### Wiring an example to a price package

Each package card links to the sample that shows what it produces. That pairing
is `tierMeta` in `shared.ts`. Set a tier's `example` to `null` and the card says
"Example coming soon" instead of linking nowhere — which is what you want while
the real one is still being built.

---

## The demos

Three fictional businesses under `/demos/`, each a single self-contained file:

| Page                                                   | Business           | What it shows                                                         |
| ------------------------------------------------------ | ------------------ | --------------------------------------------------------------------- |
| [`restaurant.astro`](src/pages/demos/restaurant.astro) | Olive & Ember      | Menu, opening hours with a live open/closed badge, map, booking form  |
| [`plumber.astro`](src/pages/demos/plumber.astro)       | Northgate Plumbing | Services, published prices, coverage area, reviews, callback form     |
| [`gym.astro`](src/pages/demos/gym.astro)               | Cadence Fitness    | Weekly class timetable, today picked out, coaches, free-trial booking |

There is a fourth demo, and it does not live here:

| Sample                                                            | What it shows                                                                  |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Halcyon Social Kitchen](https://mosqobadi.github.io/restaurant/) | A working booking system — live availability, table assignment, an admin panel |

Halcyon is a full application in [its own repository](https://github.com/MosQobadi/restaurant),
published to its own Pages site, and its card is the only one in `workMedia`
with an external `href`. That is deliberate: the capabilities section above the
pricing claims web applications, and a claim the reader can click and use is
worth more than three paragraphs about it. Its staff panel is at
[`/admin`](https://mosqobadi.github.io/restaurant/admin) with the credentials
printed on the sign-in screen.

Each demo owns its content in its own frontmatter, so a page can be copied out
and re-pointed at a real client without untangling it from the rest of the site.
Each one also carries a sticky banner saying it's a demo — they're labelled as
self-initiated work everywhere they appear.

The gym's timetable is the one exception: it sits in
[`src/data/demo-gym.ts`](src/data/demo-gym.ts) because the script that picks out
today's column reads the same schedule the grid renders.

**None of the demo forms send anything anywhere.** They validate, then show you
what would happen next — which matches what is actually on offer: booking
_request_ forms that reach the owner's phone, with the owner confirming. No
payment processing, no checkout, on any of them.

---

## Colours and theming

All colour lives as tokens at the top of
[`src/styles/global.css`](src/styles/global.css) — the portfolio's palette plus
one set per demo (`cafe-*`, `trade-*`, `gym-*`). They're roles, not shades:
`text-muted` means "secondary text", so the whole site re-tints from one block.

**Light and dark are two sets of the same token names.** The light values sit in
`@theme`; `:root[data-theme="dark"]` overrides the same names underneath.
Nothing outside that block knows which theme is on — if you find yourself
writing a `dark:` variant inside a component, the token is probably missing a
role.

The dark palette is not an inversion. The greys are lifted off pure black so
surfaces can sit above the canvas, and the accent moves to a light blue because
a mid-blue on near-black cannot clear contrast at any size. Every text and
background pair in both themes was measured rather than guessed: all of them
clear WCAG AA and most clear AAA. If you re-tint anything, keep it there.

### How the theme is chosen

1. The reader's saved choice in `localStorage`, if they have pressed the toggle.
2. Otherwise their OS setting, via `prefers-color-scheme`.

A small inline script in [`Base.astro`](src/layouts/Base.astro) resolves those to
a literal `light` or `dark` on `<html>` **before the first paint**, which is what
stops the white flash. It is injected with `set:html` for a reason worth
knowing: a script written as a template-literal child of a `<script>` tag is
emitted verbatim, braces and backticks included, and parses as a block that does
nothing at all — silently. The page still renders; it just ignores the reader's
saved choice forever.

The three demo pages opt out entirely (`forceLight`). They are pretending to be
real client sites with their own fixed palettes, and half-inverting one because
the _portfolio's_ visitor prefers dark would just look broken.

---

## Languages

English is the default and is served from the root (`/`); French lives under
`/fr/`, so the URL that goes on a business card stays clean.

[`src/i18n/config.ts`](src/i18n/config.ts) holds the locale list and the
`localize()` helper that builds a path for a given language. Both homepages are
three lines each and render the same
[`Landing.astro`](src/layouts/Landing.astro), so a section added there appears in
both languages and the two cannot drift apart.

`Base.astro` emits `hreflang` alternates plus `x-default` for every page that
opts in. The demos opt out (`alternates={false}`) because they have no French
counterpart yet, and pointing a search engine at a 404 is worse than saying
nothing.

**Not yet translated:** the three demo pages and `404.astro` are English-only. A
static host serves one 404 document for the whole origin, so it cannot know
which language the reader was expecting.

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
