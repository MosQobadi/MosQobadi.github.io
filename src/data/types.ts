/**
 * ─────────────────────────────────────────────────────────────────────────────
 * The shape every language file has to fill in.
 *
 * Both `en.ts` and `fr.ts` are typed as `Content`, so if you add a string to
 * one language and forget the other, `pnpm check` fails before the site does.
 * Anything that ISN'T words — images, links, prices as numbers — lives in
 * `shared.ts` instead, so a translation can never accidentally fork them.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Stable keys that join a translated string to its shared image/href. */
export type WorkId = "topoil" | "restaurant" | "plumber" | "gym";
export type TierId = "starter" | "business" | "pro" | "custom";

export type WorkCopy = {
  name: string;
  /** What the business needed and what the site does about it. One sentence. */
  problem: string;
  imageAlt: string;
  /** Short list of what's in it, shown as small pills on the card. */
  features: readonly string[];
};

export type TierCopy = {
  name: string;
  /**
   * Written out per language because Canadian French puts the sign after the
   * number: "$280" in English is "280 $" in French.
   */
  price: string;
  /** Only where the price is open-ended — says plainly what pushes it up. */
  priceNote?: string;
  /** One line under the price saying who it suits. */
  suits: string;
  delivery: string;
  features: readonly string[];
};

export type Content = {
  /**
   * The message already typed into WhatsApp when someone taps a button. It is
   * per-language so a French visitor does not open a chat in English.
   */
  whatsappGreeting: string;

  meta: {
    /** Browser tab and search-result title. */
    title: string;
    description: string;
    /** Sits under the wordmark in the header. */
    role: string;
  };

  nav: {
    work: string;
    capabilities: string;
    pricing: string;
    process: string;
    cta: string;
    /** The keyboard-only link that jumps past the header. */
    skip: string;
    /** Accessible names for the two icon controls in the header. */
    themeLabel: string;
    themeToLight: string;
    themeToDark: string;
    langLabel: string;
  };

  hero: {
    /** Small line above the headline, next to the availability dot. */
    eyebrow: string;
    /**
     * Set very large and tight. Keep it to two lines on desktop — the detail
     * belongs in `support`, not here.
     */
    valueProp: string;
    /**
     * The phrase inside `valueProp` to pick out in the accent colour. Must
     * appear in `valueProp` verbatim or it is simply ignored.
     */
    highlight: string;
    support: string;
    cta: string;
    ctaSecondary: string;
    /** Three plain-language reassurances shown as a strip under the CTA. */
    points: readonly string[];
  };

  work: {
    label: string;
    heading: string;
    standfirst: string;
    badgeDemo: string;
    badgeLive: string;
    openDemo: string;
    visitLive: string;
    /** The honesty note under the grid. Split so "straight with you" can bold. */
    disclosureLead: string;
    disclosureBody: string;
    samples: Record<WorkId, WorkCopy>;
  };

  capabilities: {
    label: string;
    heading: string;
    standfirst: string;
    items: readonly { title: string; body: string; tags: readonly string[] }[];
    note: string;
  };

  pricing: {
    label: string;
    heading: string;
    standfirst: string;
    popular: string;
    tiers: Record<TierId, TierCopy>;
    /** Link on each card through to the demo that shows that package. */
    exampleLink: string;
    examplePending: string;
    note: string;
    afterLaunch: string;
    help: string;
    cta: string;
  };

  process: {
    label: string;
    heading: string;
    steps: readonly { title: string; body: string }[];
  };

  closing: {
    label: string;
    heading: string;
    body: string;
    cta: string;
    emailPrefix: string;
    form: {
      heading: string;
      intro: string;
      name: string;
      namePlaceholder: string;
      business: string;
      businessPlaceholder: string;
      need: string;
      needOptional: string;
      needPlaceholder: string;
      submit: string;
      reassurance: string;
      errorRequired: string;
      errorUnconfigured: string;
      /**
       * The four lines the form stitches into a WhatsApp message. `{name}`,
       * `{business}` and `{need}` are substituted at click time. They are
       * plain strings rather than functions on purpose: this object crosses
       * into a browser script via `define:vars`, and a function would not
       * survive being serialised into it.
       */
      messageIntro: string;
      messageBusiness: string;
      messageNeed: string;
      messageAsk: string;
    };
  };

  footer: {
    tagline: string;
    builtWith: string;
  };

  notFound: {
    eyebrow: string;
    heading: string;
    body: string;
    home: string;
    work: string;
    message: string;
  };
};
