# The programme

Two things, and this repo is only the first of them.

**1. The portfolio** — this repo. A sales page that turns a Facebook Marketplace
click into a WhatsApp message. Live at <https://mosqobadi.github.io>. **Done.**
See [README.md](README.md) for how it is built and edited.

**2. Four demo applications**, each proving a different kind of client. Every one
of them is a **separate repository, a separate directory, and a separate
deployment**. They are not folders in this repo and must never become folders in
this repo — the whole point is that each one is the codebase a real client would
be handed. The portfolio links out to them.

| #   | Demo                                          | Client it proves                           | Status                                |
| --- | --------------------------------------------- | ------------------------------------------ | ------------------------------------- |
| 1   | **Portfolio / creative** site                 | photographer, designer, artist, consultant | **Not started** — do this next        |
| 2   | **Restaurant** — "Halcyon Social Kitchen"     | restaurants, cafés, bars                   | **Built**, not yet pushed. See below. |
| 3   | **Gym / fitness studio**                      | gyms, studios, coaches                     | Not started                           |
| 4   | **Appliance & electronics repair technician** | trades, callout businesses                 | Not started                           |

---

## The rule that shapes every one of them

**No backend. No database. No server the client pays for.**

This was decided deliberately, not by accident, and everything else follows
from it:

- GoDaddy has no free plan and no Node runtime — it serves static files only.
- Netlify's free tier hosts static files and never sleeps.
- Free Postgres (Supabase, Neon, Railway) **pauses after about a week of
  inactivity**. A portfolio link that returns a connection error the first time
  somebody clicks it is worse than no link. This is the thing to avoid.

So every demo is **static files** and every action a visitor takes ends up in a
channel the owner already pays for: **WhatsApp, SMS, email, or the phone
ringing.** A form composes a complete, prefilled message and hands it off.

That is not a compromise. For a business with one owner and a phone in her
apron, a WhatsApp message already carrying the date, the party size and the nut
allergy beats a row in an admin panel nobody has logged into since Tuesday.

**Never let a demo imply something was submitted, held or booked when it was
not.** Say "request", show the message before sending it, and repeat that a
human will confirm.

---

## Starting the next demo

Read **[docs/demo-app-playbook.md](docs/demo-app-playbook.md)** first. It has the
stack, the file layout, the handoff mechanics with the three URL gotchas that
lose bookings silently, and the deploy config for each host.

### Do this before writing code

1. **Create the empty GitHub repo yourself** (public — Pages on a private repo
   needs GitHub Pro), then **start the Claude Code session from that repo.**
   A session scoped to a different repo cannot push to it: the git proxy will
   not issue a credential and the GitHub MCP server is hard-scoped. This cost
   real time on the restaurant build — the work had to be handed over as a
   `git bundle` instead.
2. Name the repo whatever you want the URL to be:
   `github.com/MosQobadi/<name>` → `mosqobadi.github.io/<name>/`.
3. A project Pages site is served from a **subpath**, so the build needs
   `base: '/<repo-name>/'` or every internal link 404s. The playbook covers it.

### When the demo is finished

Add it to the portfolio: `src/data/types.ts` (`WorkId`), `src/data/shared.ts`
(`workMedia`, `workOrder`), then copy in **both** `src/data/en.ts` and
`src/data/fr.ts` — the type checker fails if you forget the French. Drop a
1200×750 thumbnail in `src/assets/work/`. README.md has the full walkthrough.

---

## Demo 2 — Halcyon Social Kitchen (restaurant), current state

Built in an earlier session and **delivered as a `git bundle`, because that
session could not push to a repo it was not started from.** It is not on GitHub
yet.

To land it: create `github.com/MosQobadi/restaurant` (public), then

```bash
git clone ~/Downloads/restaurant.bundle restaurant
cd restaurant
git remote set-url origin https://github.com/MosQobadi/restaurant.git
git push -u origin main
```

Then **Settings → Pages → Source: GitHub Actions** (not "Deploy from a branch").

What it contains: nine public pages, a booking request builder that hands off to
WhatsApp/SMS/email/phone, generated placeholder photography, an admin panel
labelled "Hosted-plan preview", 57 tests. The portfolio card for it is already
committed on this branch and points at
`https://mosqobadi.github.io/restaurant/` — **that link 404s until the repo is
pushed and Pages is enabled**, which is why the branch is not merged.

---

## Things already learned the hard way

- **Stock photography cannot be downloaded** in these sessions — Unsplash,
  Picsum and Wikimedia are all blocked by the egress proxy. Generate placeholder
  imagery instead; the restaurant repo has a working generator.
- **Do not link a placeholder service** (picsum, unsplash source) from a live
  demo. One outage and the site looks broken. Commit real files.
- **`prefers-reduced-motion` must return the finished state**, not animate to
  it, or people who turn motion off see blank sections.
- Full-page screenshots of a page with parallax or scroll reveals are
  unreliable — emulate reduced motion before capturing.
