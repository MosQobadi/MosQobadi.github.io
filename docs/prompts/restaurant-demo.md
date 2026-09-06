Build a restaurant website in this repo — a demo for my freelance portfolio,
good enough that a restaurant owner would pay for it.

## The constraint everything follows from

**No backend, no database, no third-party form service.** Static files only.
Every action a visitor takes is handed off to a channel the owner already pays
for: **WhatsApp, SMS, email, or the phone**. A form composes a complete,
prefilled message and opens it.

## Stack

React 19, TypeScript (strict), Vite, React Router, Tailwind v4. No state
library, no form library, no component library, no date library.

I deploy to Netlify/Vercel from this repo myself, so build to the domain root.
Add the SPA rewrite for both (`public/_redirects` and `vercel.json`). No CI, no
tests.

## The business

Invent a fictional restaurant — name, city, cuisine, story, staff, menu. Write
the copy yourself and make it specific and opinionated; generic filler
("delicious food in a warm atmosphere") is what makes a demo look like a
template. Keep it visibly fictional: demo banner, 555 numbers, `.example` email.

## Pages

Home, menu, drinks (separate — it's how a restaurant prints a wine list), our
story, gallery with a lightbox, private events, find us, request a table, 404.

Plus a staff admin panel behind a login — **labelled on every screen as a
preview of what a hosted plan adds**, since it needs a server and the public
site does not.

## The booking flow

Party size → date → one of the seating times the restaurant publishes → name and
phone. Then a big button for the owner's main channel, the others beside it.

Three details fail silently — the button looks fine, the message is lost:

```
https://wa.me/${whatsapp}?text=${encodeURIComponent(body)}  // digits only; a "+" 404s
sms:+${phone}?&body=${encodeURIComponent(body)}             // "?&body=" — "?body=" opens EMPTY on iOS
mailto:${email}?subject=${enc(subject)}&body=${enc(body)}   // subject as well as body
```

Encode everything: one unencoded `&` truncates the URL mid-sentence.

Also: **copy-to-clipboard** (on a desktop with no mail client, `mailto:` does
nothing at all), and **show the message before sending** — people are wary of a
button that opens their own WhatsApp and types for them.

When building the body from a list of lines, `null` means "field skipped" and
`""` means "blank line". Filtering on truthiness drops both and the message
arrives as one dense block.

## Honesty rules

The worst outcome is a guest arriving certain of a table nobody knew about.

- Say **"request"**, never "booked".
- Three-step explainer _above_ the form: tell us when → send it → we confirm.
- **Never claim live availability.** A static site can't know what's free. Show
  the seatings the restaurant _publishes_ — from opening hours, closures, and
  how long the kitchen needs after the last seating.

## Config

One file holds name, address, phone, WhatsApp, email, and which channels to
offer in which order. Dropping a channel removes it from every form. Numbers
that aren't 8–15 digits hide their own button rather than ship a dead link.

## Photography

Stock photos can't be downloaded here, and don't link a placeholder service —
one outage and the site looks broken. Write a script that generates images and
commits them as files: gradient ground, bokeh discs with radius
`pow(random(), 3)` so most are small and a few large, heavy blur, subject
highlight, vignette, grain — all from a hash of the item's id, so nothing
changes between runs. Load them with a glob so real photos replace them by
overwriting the same filenames.

**Trap:** an image must become visible on `img.complete` at mount as well as
`onLoad`. A cached image finishes before React attaches the handler, so every
picture is invisible on the second visit.

## Motion

Scroll reveals with a small stagger, parallax hero, page transitions. Considered,
not busy.

- `prefers-reduced-motion` returns the **finished** state, it doesn't animate to
  it, or those users see blank sections.
- Keep travel in CSS `transition` rules, not utility classes — reduced-motion
  flattens transitions, but a `translate-y-4` utility survives and strands the
  element.
- One shared IntersectionObserver for the page. Reveal is one-way.
- A transparent-over-hero header needs the hero pulled up underneath it, or a
  sticky header puts pale text on a pale background.

## Working style

Run the site in a browser and look at it before saying it's done. Comments
explain **why**. Commit messages are prose. No PR unless I ask.

Start by telling me the restaurant you've invented and the page plan, then build.
