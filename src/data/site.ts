/**
 * ─────────────────────────────────────────────────────────────────────────────
 * EVERY piece of copy, price and link on the site lives in this one file.
 * Edit here, not in the components.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import topoilShot from "~/assets/work/topoil.png";
import restaurantShot from "~/assets/work/restaurant.png";
import plumberShot from "~/assets/work/plumber.png";
import shopShot from "~/assets/work/shop.png";

/**
 * ⚠️ FILL THIS IN BEFORE YOU DEPLOY. ⚠️
 *
 * Your WhatsApp number in full international format: country code first,
 * digits only — no "+", no spaces, no dashes, no leading zero.
 *   e.g. UK  07700 900123  ->  "447700900123"
 *        US  (415) 555-0132 -> "14155550132"
 *        IR  0912 345 6789  -> "989123456789"
 *
 * While this is left as PLACEHOLDER every WhatsApp button on the site turns
 * itself into a visible warning instead of a dead link, so you cannot ship it
 * broken by accident.
 */
export const WHATSAPP_NUMBER = "PLACEHOLDER";

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
    "I build simple, fast websites for local businesses — landing pages, booking sites and small online shops. Fixed prices, delivered in days.",
  /** Used for the footer line only. Leave as "" to hide it. */
  email: "mos.qobadi@gmail.com",
} as const;

/* ── 1. Hero ────────────────────────────────────────────────────────────── */

export const hero = {
  valueProp:
    "I build simple, fast websites for local businesses — landing pages, booking sites, small online shops.",
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
    image: topoilShot,
    imageAlt:
      "The Top Oil shop homepage, showing a car-lookup panel above a grid of engine oil products.",
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
    name: "Fernwood Supply",
    problem:
      "A small shop taking orders through DMs and losing track — so there's a proper product grid, a cart and a checkout that collects the order in one go.",
    href: "/demos/shop/",
    image: shopShot,
    imageAlt:
      "The Fernwood Supply shop demo, showing a grid of plant products with add-to-cart buttons.",
    isDemo: true,
    features: [
      "Product grid",
      "Working cart",
      "Checkout flow",
      "Order summary",
    ],
  },
] as const;

/* ── 3. Services & pricing ──────────────────────────────────────────────── */

export type Tier = {
  name: string;
  price: string;
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
    ],
  },
  {
    name: "Business",
    price: "$280",
    suits: "A proper little website with a menu or a service list.",
    delivery: "5-day delivery",
    featured: true,
    features: [
      "Up to 5 pages (home, about, services, menu/products, contact)",
      "Contact form",
      "Google Maps integration",
      "Free hosting setup",
    ],
  },
  {
    name: "Pro",
    price: "$550+",
    suits: "You need people to book you or buy from you on the site.",
    delivery: "7–10 day delivery",
    features: [
      "Everything in Business",
      "Booking system or product/shop page",
      "Custom domain setup (at cost)",
      "30-day priority support after launch",
    ],
  },
] as const;

export const pricingNote =
  "All packages: 50% deposit to start, 50% on delivery.";

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
