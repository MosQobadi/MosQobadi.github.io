/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Everything that is NOT words.
 *
 * Images, links and configuration live here once, so the English and French
 * pages can never drift apart on which site a card points at.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import topoilShot from "~/assets/work/topoil.png";
import restaurantShot from "~/assets/work/restaurant.png";
import plumberShot from "~/assets/work/plumber.png";
import gymShot from "~/assets/work/gym.png";
import halcyonShot from "~/assets/work/halcyon.png";
import type { TierId, WorkId } from "./types";

/**
 * WhatsApp number in full international format: country code first, digits
 * only — no "+", no spaces, no dashes, no leading zero.
 *   +98 912 936 8785  ->  "989129368785"
 *
 * Set it to anything that isn't 8-15 digits and every WhatsApp button turns
 * itself into a visible warning rather than a dead link, so the site can't go
 * live half-configured.
 */
export const WHATSAPP_NUMBER = "989129368785";

export const whatsappConfigured = /^\d{8,15}$/.test(WHATSAPP_NUMBER);

export const site = {
  name: "Mostafa Qobadi",
  /** Shown in the footer. Leave as "" to hide the line entirely. */
  email: "mos.qobadi@gmail.com",
} as const;

export type WorkMedia = {
  href: string;
  /**
   * Imported from src/assets/work/. Astro converts it to WebP, generates the
   * responsive sizes and stamps the dimensions in, so swapping a file here is
   * all you need to do. 1200×750 is the shape the cards are cut for.
   */
  image: ImageMetadata;
  /** false = built for a paying client, true = built by me to show the work. */
  isDemo: boolean;
  /**
   * Takes the wide feature slot at the top of the section. Exactly one entry
   * should have it. Put it on whichever sample has the strongest *screenshot* —
   * that slot is the biggest image on the page, so a placeholder in it does
   * more damage than the sample's importance does good.
   */
  featured?: boolean;
};

/**
 * Order here is the order on the page. The `featured` one is lifted out of the
 * row into the wide slot above it.
 */
export const workMedia: Record<WorkId, WorkMedia> = {
  restaurant: {
    href: "/demos/restaurant/",
    image: restaurantShot,
    isDemo: true,
    featured: true,
  },
  topoil: {
    // TODO: topoil.ir wouldn't load from the build machine, so this card still
    // shows a placeholder. Run `pnpm thumbnails topoil` from a machine that can
    // reach the site, then rewrite `imageAlt` in en.ts / fr.ts to describe the
    // real screenshot.
    href: "https://topoil.ir",
    image: topoilShot,
    isDemo: false,
  },
  /*
   * The only entry that is not a page on this site. Halcyon is a full
   * application in its own repository, published to its own Pages site — which
   * is the point of it being here: the card above this section claims web
   * applications, and this is the one the reader can click and use.
   */
  halcyon: {
    href: "https://mosqobadi.github.io/restaurant/",
    image: halcyonShot,
    isDemo: true,
  },
  plumber: { href: "/demos/plumber/", image: plumberShot, isDemo: true },
  gym: { href: "/demos/gym/", image: gymShot, isDemo: true },
};

export const workOrder: readonly WorkId[] = [
  "restaurant",
  "halcyon",
  "topoil",
  "plumber",
  "gym",
];

export type TierMeta = {
  /**
   * The work sample that shows what this package produces. `null` means "no
   * example built yet" and the card says so rather than linking nowhere —
   * which is what you want while you're still building the real ones.
   */
  example: WorkId | null;
  /** Draws the accent border and the "Most popular" label. */
  featured?: boolean;
  /** Sets the card apart as the open-ended, quote-only track. */
  isCustom?: boolean;
};

export const tierMeta: Record<TierId, TierMeta> = {
  starter: { example: "plumber" },
  business: { example: "restaurant", featured: true },
  pro: { example: "gym" },
  custom: { example: "topoil", isCustom: true },
};

export const tierOrder: readonly TierId[] = [
  "starter",
  "business",
  "pro",
  "custom",
];
