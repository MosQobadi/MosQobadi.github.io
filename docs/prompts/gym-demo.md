Build a gym / fitness studio website in this repo — a demo for my freelance
portfolio, good enough that a studio owner would pay for it.

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

Invent a fictional studio — name, city, what kind of training, who it is for,
who coaches there. A small coached studio is more interesting than a big-box
gym: it has an opinion, and the copy can have one too. Generic filler ("achieve
your fitness goals") is what makes a demo look like a template. Keep it visibly
fictional: demo banner, 555 numbers, `.example` email.

Write for someone who is nervous about walking in. That is the real audience,
and almost no gym site is written for them.

## The timetable is the product

A studio needs a website because its class times otherwise live in an Instagram
story that vanishes in 24 hours. So the weekly timetable is the first real thing
on the page, not a section near the bottom.

- The week as a grid, **today picked out**, generated from a schedule defined
  once in data — not hand-written markup per class.
- **On a phone, a seven-column grid is unusable.** Switch to one day at a time
  with day tabs, defaulting to today.
- Each class shows time, length, name, coach, and a level. Tapping one opens
  the request flow with that class prefilled.
- **Never show "3 spots left".** A static site cannot know that. Show the class
  cap as a fact ("capped at 12") and let the studio confirm.

## Pages

Home, timetable, classes (what each type actually involves), coaches, the gym
itself (equipment), membership and prices, book a free trial, find us, 404.

Plus a member area and admin panel behind a login — timetable management, member
list, attendance — **labelled on every screen as a preview of what a hosted plan
adds**, since accounts and bookings need a server and the public site does not.

## The trial flow — the main conversion

A gym's conversion is the first visit, not a purchase. Make that the primary
call to action everywhere.

Pick a class (or "not sure yet") → pick a day → name, phone, and one line about
where they are starting from. Then a big button for the owner's main channel,
the others beside it.

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

- Say **"request"**, never "booked" or "you're in".
- **Never claim live availability or spaces left.** Show the published schedule
  and the class cap; the studio confirms.
- Prices are stated plainly, including what happens if you cancel. No payment,
  no checkout — an "ask about membership" handoff instead.

## Coaches and equipment carry the trust

These are the two sections people actually read before choosing a gym, and the
two most sites throw away.

- **Coaches:** name, what they coach, a real-sounding bio, and
  **certifications with the issuing body and the year**. That specificity is
  the whole point — "certified trainer" says nothing.
- **Equipment:** counts, not adjectives. How many racks, how many bars, what
  the plates go up to, what cardio there is. A lifter is choosing on this.

## Config

One file holds name, address, phone, WhatsApp, email, opening hours, and which
channels to offer in which order. Dropping a channel removes it from every form.
Numbers that aren't 8–15 digits hide their own button rather than ship a dead
link.

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

Scroll reveals with a small stagger, parallax hero, page transitions. Energetic
suits a gym, but keep it controlled.

- `prefers-reduced-motion` returns the **finished** state, it doesn't animate to
  it, or those users see blank sections. This matters more here than anywhere:
  some of the audience has vestibular problems.
- Keep travel in CSS `transition` rules, not utility classes — reduced-motion
  flattens transitions, but a `translate-y-4` utility survives and strands the
  element.
- One shared IntersectionObserver for the page. Reveal is one-way.
- A transparent-over-hero header needs the hero pulled up underneath it, or a
  sticky header puts pale text on a pale background.

## Working style

Run the site in a browser and look at it before saying it's done — check the
timetable on a phone width especially. Comments explain **why**. Commit messages
are prose. No PR unless I ask.

Start by telling me the studio you've invented and the page plan, then build.
