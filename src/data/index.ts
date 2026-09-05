/**
 * The single import every component reaches for.
 *
 *   import { content, whatsappHref } from "~/data";
 *   const t = content[locale];
 */

import type { Locale } from "~/i18n/config";
import type { Content } from "./types";
import { en } from "./en";
import { fr } from "./fr";
import { WHATSAPP_NUMBER, whatsappConfigured } from "./shared";

export const content: Record<Locale, Content> = { en, fr };

/**
 * The wa.me link for a given language, with that language's greeting already
 * typed into the box. When the number isn't configured this returns a dead
 * anchor on purpose — `whatsappConfigured` is what callers check, and every
 * button turns itself into a visible warning rather than a broken link.
 */
export function whatsappHref(locale: Locale): string {
  if (!whatsappConfigured) return "#whatsapp-not-configured";
  const text = encodeURIComponent(content[locale].whatsappGreeting);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export * from "./shared";
export type * from "./types";
