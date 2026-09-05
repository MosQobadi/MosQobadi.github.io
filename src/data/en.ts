import type { Content } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * English copy. The default language, served from the site root.
 *
 * Two rules this file is written to, both learned the hard way:
 *
 *  1. Never call the work "simple". The reader is deciding what they will get,
 *     and they will take the word literally and price you by it.
 *  2. The packages sell websites, but the page has to make clear that websites
 *     are the *small* end of the work — that is what the capabilities section
 *     is for. A price list with nothing above it sets the ceiling.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const en: Content = {
  whatsappGreeting:
    "Hi! I saw your website and I'd like a website for my business.",

  meta: {
    title: "Websites & web apps for local businesses",
    description:
      "I design and build fast, modern websites for local businesses — and the web applications, ERP and CRM systems that bigger ones run on. Fixed prices, delivered in days.",
    role: "Web design & development",
  },

  nav: {
    work: "Work",
    capabilities: "Capabilities",
    pricing: "Pricing",
    process: "How it works",
    cta: "Message me",
    skip: "Skip to content",
    themeLabel: "Colour theme",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    langLabel: "Language",
  },

  hero: {
    eyebrow: "Available for new projects",
    valueProp: "A website that makes your business look as good as it is.",
    highlight: "as good as it is",
    support:
      "Designed from scratch for your business — not a template with your logo dropped into it. Fast, modern, and built for a phone first, because that is where your customers already are. Fixed price agreed up front, live in days, no monthly fees.",
    cta: "Message me on WhatsApp",
    ctaSecondary: "See the work",
    points: [
      "Designed from scratch, never a template",
      "Fixed price, agreed before I start",
      "Loads in under a second on a phone",
    ],
  },

  work: {
    label: "Selected work",
    heading: "Sites you can open right now.",
    standfirst:
      "One live client site, and three I built to show what each package produces. Every one of them opens — click around, try it on your phone, read the source if you like.",
    badgeDemo: "Demo I built",
    badgeLive: "Live client site",
    openDemo: "Open the demo",
    visitLive: "Visit the live site",
    disclosureLead: "Straight with you:",
    disclosureBody:
      "the three demos are businesses I invented, built to show what each package produces rather than for paying clients. Top Oil is a real site with real customers.",
    samples: {
      topoil: {
        name: "Top Oil",
        problem:
          "A motor-oil retailer whose customers had no idea which product fits their car. The site asks for the vehicle and shows only what fits — a live catalogue in two languages, with an admin panel the owner runs himself.",
        imageAlt: "Top Oil — the live shop at topoil.ir.",
        features: [
          "Online shop",
          "Vehicle-fitment search",
          "Two languages",
          "Custom admin panel",
        ],
      },
      restaurant: {
        name: "Olive & Ember",
        problem:
          "A neighbourhood restaurant losing bookings to a PDF menu nobody could read on a phone. The menu, hours, map and a booking form now sit on one page that loads instantly.",
        imageAlt:
          "The Olive & Ember restaurant demo, showing the header photo and the start of the menu.",
        features: ["Menu", "Opening hours", "Map", "Booking form"],
      },
      plumber: {
        name: "Northgate Plumbing",
        problem:
          "A plumber getting price-shopped on the phone all day. The rates, the service area and a callback form are on the page before anyone dials.",
        imageAlt:
          "The Northgate Plumbing demo, showing the call-out banner and the list of services with prices.",
        features: [
          "Services & prices",
          "Callback form",
          "Service area",
          "Reviews",
        ],
      },
      gym: {
        name: "Cadence Fitness",
        problem:
          "A studio whose class times lived in an Instagram story nobody could find. The week's timetable is the first thing on the page, with today picked out, and a free trial booking sits right under it.",
        imageAlt:
          "The Cadence Fitness demo, showing the weekly class timetable with today's column picked out.",
        features: [
          "Class timetable",
          "Trainers",
          "Membership prices",
          "Trial booking",
        ],
      },
    },
  },

  capabilities: {
    label: "Beyond websites",
    heading: "I also build the software businesses run on.",
    standfirst:
      "Most local businesses need a good website and nothing more — that is what the packages below are for. But a website is the small end of this work, and if your business has already outgrown one, this is the part to ask me about.",
    items: [
      {
        title: "Web applications",
        body: "Customer portals, dashboards, booking and scheduling systems, internal tools. Built with React and TypeScript — the same stack the large teams use, because it is the one that survives being maintained.",
        tags: ["React", "TypeScript", "APIs", "Accounts & permissions"],
      },
      {
        title: "ERP & CRM systems",
        body: "Stock, invoicing, purchasing, customers, staff permissions, reporting — the systems a company actually runs on. I have designed, built and shipped these end to end, not just worked on a corner of one.",
        tags: [
          "Inventory & invoicing",
          "Multi-user roles",
          "Reporting",
          "Data migration",
        ],
      },
      {
        title: "Integrations & automation",
        body: "Payments, bookings, WhatsApp, Google Business, accounting and stock feeds — wired together so the same work stops being done twice by hand.",
        tags: [
          "Payments",
          "Messaging",
          "Scheduled jobs",
          "Third-party services",
        ],
      },
    ],
    note: "Work at this size is quoted per project, never from a price list. Describe the problem and I will tell you honestly whether it needs software built or just a better website.",
  },

  pricing: {
    label: "Packages & pricing",
    heading: "One number, agreed before I start.",
    standfirst:
      "Three fixed-price website packages, and a fourth track for anything bigger. No hourly billing, and no surprise invoice at the end.",
    popular: "Most popular",
    exampleLink: "See an example",
    examplePending: "Example coming soon",
    tiers: {
      starter: {
        name: "Starter",
        price: "$120",
        suits:
          "One page that says who you are, what you do and how to reach you.",
        delivery: "3-day delivery",
        features: [
          "One page, designed around your business",
          "Custom design — not a template",
          "Built for a phone first",
          "Free hosting setup",
          "Your own domain name (at cost)",
        ],
      },
      business: {
        name: "Business",
        price: "$280",
        suits:
          "A proper website with a menu, a price list, or a set of service pages.",
        delivery: "5-day delivery",
        features: [
          "Up to 5 pages",
          "Custom design — not a template",
          "Contact form straight to your phone",
          "Google Maps and opening hours",
          "Speed and search-engine setup",
          "Free hosting setup",
        ],
      },
      pro: {
        name: "Pro",
        price: "$550+",
        priceNote:
          "More than five pages, a second language, or a booking system that has to check real availability adds to this — quoted before I start.",
        suits:
          "People need to book you, and you would rather not write the words yourself.",
        delivery: "7–10 day delivery",
        features: [
          "Everything in Business",
          "Booking form — date, time and details to your phone",
          "I write the words, from one phone call",
          "Google Business Profile set up",
          "Interactive pieces where they earn their place",
          "30 days of changes after launch",
        ],
      },
      custom: {
        name: "Custom",
        price: "Let's talk",
        priceNote:
          "Quoted per project after a call, with the scope written down before anything begins.",
        suits:
          "Your business has outgrown a website and needs actual software.",
        delivery: "Timeline agreed up front",
        features: [
          "Web applications, portals and dashboards",
          "ERP, CRM and inventory systems",
          "React and TypeScript front ends",
          "Databases, APIs and integrations",
          "Ongoing support if you want it",
        ],
      },
    },
    note: "All prices in Canadian dollars. Every package: 50% deposit to start, 50% on delivery.",
    afterLaunch:
      "No monthly fees, ever. Changes later — new prices, a new menu, an extra page — are quoted per job before I touch anything.",
    help: "Not sure which one fits? Describe your business and I will tell you honestly. It is often the cheapest one.",
    cta: "Ask which package fits",
  },

  process: {
    label: "How it works",
    heading: "Four steps, and you only do the first.",
    steps: [
      {
        title: "Message me with what you need",
        body: "A sentence or two is enough. Photos of your menu or price list help.",
      },
      {
        title: "I send a fixed price quote",
        body: "One number and a delivery date. It does not change later.",
      },
      {
        title: "50% deposit to start",
        body: "Then I build it, and send you a link to watch it come together.",
      },
      {
        title: "Live, and the rest on delivery",
        body: "Your site goes live on your own address. You pay the remainder once it is up.",
      },
    ],
  },

  closing: {
    label: "Get started",
    heading: "Let's get your business online.",
    body: "Tell me what you do and I will tell you what it costs. No obligation, and I will say so if I think you do not need a website at all.",
    cta: "Message me on WhatsApp",
    emailPrefix: "Prefer email?",
    form: {
      heading: "Not sure what to say?",
      intro:
        "Fill these in and I will write the message for you — you just hit send.",
      name: "Your name",
      namePlaceholder: "Sam",
      business: "What's your business?",
      businessPlaceholder: "A small pizzeria in town",
      need: "What do you need?",
      needOptional: "(optional)",
      needPlaceholder: "Somewhere to put the menu and take table bookings",
      submit: "Write my message",
      reassurance:
        "This opens WhatsApp with the message already typed. Nothing is sent until you press send there.",
      errorRequired: "Please fill in your name and what your business is.",
      errorUnconfigured: "WhatsApp isn't set up on this site yet.",
      messageIntro: "Hi, I'm {name}.",
      messageBusiness: "I run {business}.",
      messageNeed: "What I need: {need}",
      messageAsk: "Could you tell me what a website would cost?",
    },
  },

  footer: {
    tagline: "Websites and web applications for businesses that mean it.",
    builtWith: "Built as a static site — which is why it loaded this fast.",
  },

  notFound: {
    eyebrow: "Page not found",
    heading: "That page isn't here.",
    body: "It may have moved, or the link may have a typo in it. Everything — the work, the prices, how it all works — is on the homepage.",
    home: "Back to the homepage",
    work: "See the work",
    message: "Or just message me",
  },
};
