/**
 * ─────────────────────────────────────────────────────────────────────────────
 * EVERY piece of copy, price and link on the site lives in this one file.
 * Edit here, not in the components.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import topoilShot from "~/assets/work/topoil.png";
import restaurantShot from "~/assets/work/restaurant.png";
import plumberShot from "~/assets/work/plumber.png";
import gymShot from "~/assets/work/gym.png";

/**
 * WhatsApp number in full international format: country code first, digits
 * only — no "+", no spaces, no dashes, no leading zero.
 *   +98 912 936 8785  ->  "989129368785"
 *
 * Set it back to "PLACEHOLDER" (or anything that isn't 8-15 digits) and every
 * WhatsApp button turns itself into a visible warning rather than a dead link,
 * so the site can't go live half-configured.
 */
export const WHATSAPP_NUMBER = "989129368785";

/** Pre-filled first message, so a stranger never faces an empty text box. */
export const WHATSAPP_MESSAGE =
  "Hi! I saw your website and I'd like a website for my business.";

export const whatsappConfigured = /^\d{8,15}$/.test(WHATSAPP_NUMBER);

export const whatsappHref = whatsappConfigured
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : "#whatsapp-not-configured";

export const site = {
  name: "Mostafa Qobadi",
  /** Shown in the browser tab and as the search-result title. */
  title: "Websites for local businesses",
  description:
    "I build simple, fast websites for local businesses — landing pages, menus and booking forms. Fixed prices, delivered in days.",
  /** Used for the footer line only. Leave as "" to hide it. */
  email: "mos.qobadi@gmail.com",
} as const;

/* ── 1. Hero ────────────────────────────────────────────────────────────── */

export const hero = {
  valueProp:
    "I build simple, fast websites for local businesses — landing pages, menus and booking forms that work properly on a phone.",
  /** One short line of reassurance under the headline. Keep it concrete. */
  support:
    "Fixed price agreed up front. Live in a few days. No monthly fees, no jargon.",
  cta: "Message me on WhatsApp",
  /** Three plain-language reassurances shown as a strip under the CTA. */
  points: [
    "Fixed price, agreed before I start",
    "Works properly on phones",
    "Hosting set up free",
  ],
} as const;

/* ── 2. Work samples ────────────────────────────────────────────────────── */

export type WorkSample = {
  name: string;
  /** What the business needed and what the site does about it. One sentence. */
  problem: string;
  href: string;
  /**
   * Imported from src/assets/work/. Astro converts it to WebP, generates the
   * responsive sizes and stamps the dimensions in, so swapping a file here is
   * all you need to do. 1200×750 is the shape the cards are cut for.
   */
  image: ImageMetadata;
  /** Alt text for the thumbnail. */
  imageAlt: string;
  /** false = built for a paying client, true = built by me to show the work. */
  isDemo: boolean;
  /** Short list of what's in it, shown as small pills on the card. */
  features: readonly string[];
};

export const workSamples: readonly WorkSample[] = [
  {
    name: "Top Oil",
    problem:
      "A motor-oil retailer whose customers didn't know which oil fits their car — so the site asks for the car and shows only what fits.",
    href: "https://topoil.ir",
    // TODO: topoil.ir wouldn't load from the build machine, so this card shows a
    // placeholder. Run `pnpm thumbnails topoil` from a machine that can reach the
    // site, then rewrite imageAlt below to describe the real screenshot.
    image: topoilShot,
    imageAlt: "Top Oil — the live shop at topoil.ir.",
    isDemo: false,
    features: ["Online shop", "Car lookup", "Two languages", "Admin panel"],
  },
  {
    name: "Olive & Ember",
    problem:
      "A neighbourhood restaurant losing bookings to a hard-to-read PDF menu — so the menu, hours, map and a booking form all sit on one page.",
    href: "/demos/restaurant/",
    image: restaurantShot,
    imageAlt:
      "The Olive & Ember restaurant demo, showing the header photo and the start of the menu.",
    isDemo: true,
    features: ["Menu", "Opening hours", "Map", "Booking form"],
  },
  {
    name: "Northgate Plumbing",
    problem:
      "A plumber getting price-shopped on the phone all day — so the rates, the service area and a callback form are on the page before anyone dials.",
    href: "/demos/plumber/",
    image: plumberShot,
    imageAlt:
      "The Northgate Plumbing demo, showing the call-out banner and the list of services with prices.",
    isDemo: true,
    features: ["Services & prices", "Callback form", "Service area", "Reviews"],
  },
  {
    name: "Cadence Fitness",
    problem:
      "A studio whose class times lived in an Instagram story nobody could find — so the week's timetable is the first thing on the page, and booking a free trial is right under it.",
    href: "/demos/gym/",
    image: gymShot,
    imageAlt:
      "The Cadence Fitness demo, showing the weekly class timetable with today's column picked out.",
    isDemo: true,
    features: [
      "Class timetable",
      "Trainers",
      "Membership prices",
      "Trial booking",
    ],
  },
] as const;

/* ── 3. Services & pricing ──────────────────────────────────────────────── */

export type Tier = {
  name: string;
  price: string;
  /** Only where the price is open-ended — says plainly what pushes it up. */
  priceNote?: string;
  /** One line under the price saying who it suits. */
  suits: string;
  delivery: string;
  features: readonly string[];
  /** Draws the highlighted border and the "Most popular" label. */
  featured?: boolean;
};

export const tiers: readonly Tier[] = [
  {
    name: "Starter",
    price: "$120",
    suits: "One page that says who you are and how to reach you.",
    delivery: "3-day delivery",
    features: [
      "1-page site (home, about, services, contact)",
      "Mobile-friendly design",
      "Free hosting setup",
      "Custom domain setup (at cost)",
    ],
  },
  {
    name: "Business",
    price: "$280",
    suits:
      "A proper little website with a menu, a price list or a service page.",
    delivery: "5-day delivery",
    featured: true,
    features: [
      "Up to 5 pages (home, about, services, menu/prices, contact)",
      "Contact form",
      "Google Maps integration",
      "Free hosting setup",
      "Custom domain setup (at cost)",
    ],
  },
  {
    name: "Pro",
    price: "$550+",
    priceNote:
      "More than five pages, or a second language, adds to this — quoted before I start.",
    suits:
      "People need to book you, and you would rather not write the words yourself.",
    delivery: "7–10 day delivery",
    features: [
      "Everything in Business",
      "Booking form — date, time and details straight to your phone",
      "I write the words, from one phone call",
      "Google Business Profile set up (Maps, hours, photos)",
      "30-day priority support after launch",
    ],
  },
] as const;

export const pricingNote =
  "All prices in Canadian dollars. Every package: 50% deposit to start, 50% on delivery.";

/**
 * Answers the question that arrives three months after launch: "the menu
 * changed, what do I do?" Keeping it wordless about the amount is deliberate —
 * put your own number in once you know what the work actually takes.
 */
export const afterLaunchNote =
  "No monthly fees, ever. Changes later — new prices, a new menu, an extra page — are quoted per job before I touch anything.";

/* ── 4. How it works ────────────────────────────────────────────────────── */

export const steps = [
  {
    title: "Message me with what you need",
    body: "A sentence or two is enough. Photos of your menu or price list help.",
  },
  {
    title: "I send a fixed price quote",
    body: "One number and a delivery date. It doesn't change later.",
  },
  {
    title: "50% deposit to start",
    body: "Then I build it and send you a link to look at as it comes together.",
  },
  {
    title: "Delivered live, final payment on delivery",
    body: "Your site goes live on your own address. You pay the rest once it's up.",
  },
] as const;

/* ── 5. Closing CTA ─────────────────────────────────────────────────────── */

export const closing = {
  heading: "Let's get your business online",
  body: "Tell me what you do and I'll tell you what it costs. No obligation, and I'll say so if I think you don't need a website.",
  cta: "Message me on WhatsApp",
} as const;
