# Demo app playbook

How to build one of the four demo applications. Read
[CLAUDE.md](../CLAUDE.md) first for what they are and why none of them has a
backend.

The restaurant demo ("Halcyon Social Kitchen") is the reference implementation.
Where this document says "copy it", that is what to copy from.

---

## Stack

React 19 · TypeScript (strict, `noUncheckedIndexedAccess`) · Vite · React Router ·
Tailwind CSS v4 · Vitest.

No state library, no form library, no component library, no date library. Each
was considered and left out because the thing it replaces is a dozen lines, and
every dependency is something the next person has to learn before they can
change the booking form.

```
src/
  config/business.ts      ← THE ONLY FILE A NEW CLIENT EDITS
  lib/
    handoff.ts            ← composes the message, builds the wa.me / sms: / mailto: URLs
    datetime.ts           ← "YYYY-MM-DD" and "HH:MM" strings, never Date objects
    motion.ts             ← reduced-motion-aware reveal, parallax, count-up
    format.ts             ← prices, phone numbers, class names
  domain/                 ← the business rules, unit-tested, no React
  components/
    site/                 ← header, footer, hero, Photo, SendVia
    ui/                   ← Field, Dialog, Toast, Badge, Spinner, Reveal
  pages/
  assets/photos/          ← generated placeholders, committed
scripts/
  placeholders.mjs        ← regenerates the imagery
  spa-fallback.mjs        ← copies index.html to 404.html after build
```

---

## 1. The config file

One file holds everything about the business, so reselling the same site to the
next client is one edit. Copy `src/config/business.ts` from the restaurant.

```ts
export const business = {
  name: "…",
  shortName: "…",
  tagline: "…",
  address: { line1, city, province, postalCode },

  // Digits only, full international: +1 613 555 0142 -> "16135550142"
  phone: "16135550142",
  whatsapp: "16135550142", // often a second handset — keep it separate
  email: "…",

  // Order matters: the first is the big button. Put the channel the owner
  // actually watches first. Drop one and it vanishes from every form.
  channels: ["whatsapp", "sms", "email", "phone"],
  callHours: "12pm – 5pm",
};
```

Validate numbers on the way in — anything that is not 8–15 digits hides its own
button rather than shipping a dead link. **A button that silently goes nowhere
costs the client work.**

---

## 2. The handoff — and three ways it fails silently

This is the core of every demo. Copy `src/lib/handoff.ts` and its tests.

```ts
// WhatsApp — digits only. A "+" in the path 404s.
`https://wa.me/${whatsapp}?text=${encodeURIComponent(body)}`
// SMS — "?&body=", NOT "?body=".
// iOS opens an EMPTY message with the latter: the guest's details vanish and
// nobody finds out. This form works on iOS and Android alike.
`sms:+${phone}?&body=${encodeURIComponent(body)}`
// Email — subject as well as body.
`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
// Phone — no message attached.
`tel:+${phone}`;
```

Everything must be percent-encoded. One unencoded `&` or `#` in "table by the
window & near the door" truncates the URL and cuts the message off mid-sentence.

**Always offer copy-to-clipboard.** On a desktop with no mail client configured,
`mailto:` does nothing at all — no error, no window. Copy-and-paste into webmail
is the difference between a lost enquiry and a clumsy one.

**Always show the message before it is sent.** People are wary of a button that
opens their own WhatsApp and types for them; showing them exactly what will be
sent is what makes them press it. A `<details>` block does the job.

### Composing

Build the body from a list of lines where `null` means "field was skipped" and
`""` means "blank line here". Filtering on truthiness removes both and the
message arrives as one unbroken block — this shipped once before it was caught.

---

## 3. Honesty rules

Non-negotiable, and the reason a client will not come back angry:

- Say **"request"**, never "booked" or "confirmed".
- A three-step explainer **above** the form, not small print below it:
  _tell us when → send it → we confirm_.
- A note on every send button: _"This sends a request — we'll confirm it with
  you."_
- If a calendar file is offered, it says **"requested, not yet confirmed"**.
- Never claim live availability. A static site cannot know what is free. Show
  the times the business _publishes_, which is a fact the owner told you.
- Every demo carries a banner saying the business is fictional.

---

## 4. Imagery

Stock photography **cannot be downloaded** in these sessions — the egress proxy
blocks Unsplash, Picsum and Wikimedia. Do not link a placeholder service from a
live demo either; one outage and the site looks broken.

Generate and commit real files. Copy `scripts/placeholders.mjs`. The technique
is a fake shallow depth of field, because a photograph of a room or a plate is
mostly out-of-focus warm light with one sharp region:

1. a gradient ground keyed to the subject
2. a dozen bokeh discs, radius `pow(random(), 3)` so most are small and a few
   are huge — an even distribution reads as polka dots
3. a heavy blur over both — this is what sells it as a lens
4. a subject highlight, a vignette, then fine grain

Everything derived from a hash of the item's id, so it never changes between
runs and no two adjacent items collide.

The `Photo` component globs `src/assets/photos/*.webp` at build time, so real
photographs replace the placeholders by overwriting files with the same names —
no import to write, no registry to update.

**One trap:** an image must become visible on `img.complete` at mount as well as
on `onLoad`. A cached image finishes before React attaches the handler, the
event never fires, and every picture is invisible on the visitor's _second_
visit.

---

## 5. Motion

Copy `src/lib/motion.ts`.

- **`prefers-reduced-motion` returns the finished state**, it does not animate
  to it. Otherwise people who turn motion off get blank sections.
- Keep the travel in CSS `transition` declarations, not utility classes. The
  reduced-motion block flattens transitions to nothing, but a `translate-y-4`
  utility survives it and strands the element permanently out of place.
- **One shared IntersectionObserver** for the whole page. A long menu has eighty
  reveal targets; eighty observers is eighty callbacks fighting over one scroll.
- Reveal is one-way. Re-hiding on exit makes scrolling back up feel broken.
- Parallax writes a CSS custom property inside `requestAnimationFrame`, never
  React state.

A transparent-over-hero header needs the hero pulled up underneath it
(`margin-top: calc(-1 * var(--header-h))`) — a `sticky` header sits in normal
flow and otherwise puts cream text on a cream background.

---

## 6. Deploying

The build is plain static files, so it runs anywhere. The one setting that
matters is `base`, because a deep link has to resolve.

| Host                            | Build command                           | Deep links handled by |
| ------------------------------- | --------------------------------------- | --------------------- |
| **GitHub Pages** (project site) | `npm run build` with `base: '/<repo>/'` | `dist/404.html`       |
| **Netlify**                     | `BASE_PATH=/ npm run build`             | `public/_redirects`   |
| **GoDaddy / cPanel / Apache**   | `BASE_PATH=/ npm run build`             | `public/.htaccess`    |

Nothing hard-codes a path: every link goes through Vite's `BASE_URL`, and the
router's `basename` is derived from it.

```ts
// vite.config.ts
const base = process.env.BASE_PATH ?? "/<repo-name>/";
```

```
# public/_redirects (Netlify)
/*  /index.html  200
```

```apache
# public/.htaccess (Apache)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

GitHub Pages has no rewrite rules at all, hence `scripts/spa-fallback.mjs`
copying `index.html` to `404.html` after the build. Also commit
`public/.nojekyll`, or Pages eats `/_astro/`-style underscore directories.

**One-time repo setup:** Settings → Pages → Source: **GitHub Actions**. Not
"Deploy from a branch", which serves the un-built source.

**Spread the deploys across hosts** — one on Netlify, one on Pages, maybe one on
a cPanel host. It is a more honest demonstration and it proves the build is
portable.

---

## 7. Notes per demo

**Portfolio / creative** (do next). The hardest one to make _look_ different,
because the portfolio site itself is a portfolio. Lean editorial: a project
index, a case-study page per project, a stripped-back about, and a contact that
hands off. The gallery/lightbox from the restaurant transfers directly. This is
the demo where typography does the work.

**Gym / fitness studio.** A weekly timetable is the reason a studio needs a
website at all — put it first, pick out today, and make each class a request.
Coaches with certifications, membership prices, the equipment list. The
`publishedSeatings` idea maps straight onto a class schedule. There is a static
version of this already in this repo at
[`src/pages/demos/gym.astro`](../src/pages/demos/gym.astro) — the standalone app
should be a clear step up from it, not a copy.

**Appliance & electronics repair.** Different shape entirely: trust and speed,
not atmosphere. Published call-out rates, coverage area by postcode, a symptom
picker that composes a useful WhatsApp message ("Bosch dishwasher, error E15,
Nepean"), before/after work, reviews, and an emergency call button pinned on
mobile. Least photogenic and most conversion-driven of the four.
