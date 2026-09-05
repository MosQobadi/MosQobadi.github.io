/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Two languages, one page.
 *
 * English is the default and lives at the site root (`/`). French is prefixed
 * (`/fr/`). That asymmetry is deliberate: the English URL is the one that goes
 * on business cards and Marketplace posts, so it stays clean.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** The label each language uses for *itself* — never translated. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

/** Two-letter switcher labels. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
};

/** What goes in `<html lang>` and `hreflang`. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: "en-CA",
  fr: "fr-CA",
};

/**
 * Turn a root-relative path into its localised form.
 *   localize("/", "fr")        -> "/fr/"
 *   localize("/#work", "fr")   -> "/fr/#work"
 *   localize("/#work", "en")   -> "/#work"
 *
 * The default locale is never prefixed, so `en` is a pass-through.
 */
export function localize(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path;
  const [pathname, hash = ""] = path.split("#");
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const prefixed = `/${locale}${clean === "/" ? "/" : clean}`;
  return hash ? `${prefixed}#${hash}` : prefixed;
}

/**
 * Read the current locale back out of a URL. Used by the layout to mark the
 * right `hreflang` and to point the language switcher at its counterpart.
 */
export function localeFromUrl(url: URL): Locale {
  const first = url.pathname.split("/").filter(Boolean)[0];
  return LOCALES.includes(first as Locale) ? (first as Locale) : DEFAULT_LOCALE;
}
