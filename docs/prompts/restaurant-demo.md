Build a restaurant website demo — a complete, deployable application in this
repository. It is one of four demos that sit behind my freelance portfolio, and
it has to be good enough that a restaurant owner would pay for it and a hiring
manager would read the source.

## The constraint everything else follows from

**No backend. No database. No server anyone pays to keep alive.**

This is deliberate. GoDaddy-style shared hosting has no Node runtime, Netlify's
free tier hosts static files and never sleeps, and every free Postgres tier
(Supabase, Neon, Railway) _pauses after about a week of inactivity_ — a demo
link that returns a connection error the first time someone clicks it is worse
than no link at all.

So: static files only, and every action a visitor takes is handed off to a
channel the owner already pays for — **WhatsApp, SMS, email, or the phone
ringing**. A form composes a complete, prefilled message and opens it.

Do not add a server, a hosted database, or a third-party form service.

## The business

Invent a fictional restaurant — name, city, cuisine, story, staff, menu. Do not
copy a real one. Write the copy yourself and make it specific and a bit opinionated;
generic restaurant filler ("we serve delicious food in a warm atmosphere") is the
main thing that makes a demo look like a template. Mediterranean small plates in
a Canadian city works well, but choose your own.

Everything fictional must be visibly fictional: a demo banner, 555 phone numbers,
`.example` email domains, an invented street address.

## Stack

React 19, TypeScript (strict, with `noUncheckedIndexedAccess`), Vite, React
Router, Tailwind CSS v4, Vitest.

No state library, no form library, no component library, no date library. Each
one is a thing the next developer has to learn before they can change the
booking form, and what they replace here is a dozen lines.

## Pages

Home, menu, drinks (separate from food — it is how a restaurant prints a wine
list and how people go looking for it), our story, gallery with a lightbox,
private events, find us, request a table, and a 404.

Plus a staff admin panel behind a login: today's service, the diary, menu
management, room and opening hours, enquiries. **Label it clearly on every
screen as a preview of what a hosted plan adds** — it needs a server, the public
site does not, and pretending otherwise is a promise the static site cannot keep.

## The booking flow — the core of it

The guest picks party size, then a date, then one of the seating times the
restaurant publishes, then gives a name and phone number. Then a **big primary
button for the owner's preferred channel** with the others beside it.

Three details are load-bearing. Each is a silent failure — the button looks
fine, the message is lost, nobody finds out:

```
// WhatsApp — digits only. A "+" in the path 404s.
https://wa.me/${whatsapp}?text=${encodeURIComponent(body)}

// SMS — "?&body=", NOT "?body=".
// iOS opens an EMPTY message with the latter, so the guest's details vanish.
sms:+${phone}?&body=${encodeURIComponent(body)}

// Email — a subject as well as a body.
mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}
```

Percent-encode everything: one unencoded `&` or `#` in "a table by the window &
near the door" truncates the URL and cuts the message off mid-sentence.

Also required:

- **Copy-to-clipboard.** On a desktop with no mail client configured `mailto:`
  does nothing at all — no error, no window. Copy-and-paste into webmail is the
  difference between a lost booking and a clumsy one.
- **Show the message before it is sent.** People are wary of a button that opens
  their own WhatsApp and types for them; seeing exactly what will be sent is
  what makes them press it.
- When composing the body from a list of lines, `null` must mean "field skipped"
  and `""` must mean "blank line here". Filtering on truthiness removes both and
  the message arrives as one unbroken block.

## Honesty rules — non-negotiable

The worst thing this site can do to its owner is have a guest arrive certain of
a table nobody knew about.

- Say **"request"**, never "booked" or "confirmed".
- A three-step explainer **above** the form, not small print below it:
  _tell us when → send it → we confirm_.
- A note on every send button saying a human will confirm.
- If you offer a calendar file, it says "requested, not yet confirmed".
- **Never claim live availability.** A static site cannot know what is free.
  Show the seatings the restaurant _publishes_, derived from opening hours,
  one-off closures, and how long the kitchen needs after the last seating.

## Reselling it

Put everything about the business in **one config file** — name, address, phone,
WhatsApp number, email, and which contact channels to offer in which order, with
the one the owner actually watches first. Dropping a channel from that list must
remove it from every form on the site.

Validate numbers on the way in: anything that is not 8–15 digits should hide its
own button rather than ship a dead link, because a booking button that silently
goes nowhere costs the client covers.

## Photography

You cannot download stock photography — Unsplash, Picsum and Wikimedia are all
blocked. Do not link a placeholder service from a live demo either; one outage
and the site looks broken.

Write a script that **generates placeholder images and commits them as real
files**. Fake a shallow depth of field, because a photograph of a plate or a
room is mostly out-of-focus warm light with one sharp region:

1. a gradient ground keyed to the subject
2. a dozen bokeh discs with radius `pow(random(), 3)` so most are small and a
   few are large — an even distribution reads as polka dots
3. a heavy blur over both, which is what sells it as a lens rather than CSS
4. a subject highlight, a vignette, then fine grain

Derive it all from a hash of each item's id, so an image never changes between
runs and no two adjacent items look alike. Load them with a glob so real
photographs replace them by overwriting files with the same names.

**One trap:** an image must become visible on `img.complete` at mount as well as
on `onLoad`. A cached image finishes before React attaches the handler, so the
event never fires and every picture is invisible on the visitor's second visit.

## Motion

Scroll reveals with a small stagger, a parallax hero, hover states, page
transitions. Make it feel considered rather than busy.

- **`prefers-reduced-motion` must return the finished state**, not animate to
  it, or people who turn motion off see blank sections.
- Keep the travel in CSS `transition` declarations, not utility classes: the
  reduced-motion block flattens transitions, but a `translate-y-4` utility
  survives it and strands the element permanently out of place.
- **One shared IntersectionObserver** for the page, not one per element. A long
  menu has eighty reveal targets.
- Reveal is one-way — re-hiding on exit makes scrolling back up feel broken.
- Parallax writes a CSS custom property inside `requestAnimationFrame`, never
  React state.
- A transparent-over-hero header needs the hero pulled up underneath it. A
  `sticky` header sits in normal flow and will otherwise put pale text on a pale
  background.

## Tests

Unit-test the business rules with Vitest — opening hours, closures, seating
generation, and the handoff URL builders. Every test should describe a mistake
that costs the restaurant money or a guest. Do not test React rendering.

## Deploying

Static build. `base` is the setting that decides whether deep links resolve:

| Host                        | Build                   | Deep links handled by                        |
| --------------------------- | ----------------------- | -------------------------------------------- |
| GitHub Pages (project site) | `base: '/<repo-name>/'` | copy `index.html` to `404.html` after build  |
| Netlify                     | `BASE_PATH=/`           | `public/_redirects` → `/*  /index.html  200` |
| Apache / cPanel             | `BASE_PATH=/`           | `public/.htaccess` rewrite                   |

Nothing may hard-code a path — every link goes through Vite's `BASE_URL` and the
router's `basename` derives from it. Ship all three host configs, plus
`public/.nojekyll`. Add a GitHub Actions workflow that runs the tests and
publishes to Pages on push to main.

## How to work

Build the domain logic and its tests first, then the data, then the UI. Run the
site in a browser and look at it before telling me it is done — several real
bugs in this build were only visible in a screenshot.

Comments explain **why**, never what. Commit messages are prose, not bullet
lists, and explain the reasoning behind a decision. Do not open a pull request
unless I ask. Ask before anything outward-facing.

Start by telling me the restaurant you have invented and the page plan, then
build it.
