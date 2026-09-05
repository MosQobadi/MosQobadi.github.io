import type { Content } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * French copy, served from /fr/.
 *
 * Written as Quebec French rather than translated word for word, because the
 * audience is Canadian: prices put the sign after the number ("280 $", not
 * "$280"), "courriel" not "e-mail", and the package names are translated too —
 * a French page with English tier names reads like a machine did it.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const fr: Content = {
  whatsappGreeting:
    "Bonjour ! J'ai vu votre site Web et j'aimerais un site pour mon entreprise.",

  meta: {
    title: "Sites Web et applications Web pour entreprises locales",
    description:
      "Je conçois et développe des sites Web rapides et modernes pour les entreprises locales — ainsi que les applications Web et les systèmes ERP et CRM sur lesquels roulent les plus grandes. Prix fixes, livrés en quelques jours.",
    role: "Conception et développement Web",
  },

  nav: {
    work: "Réalisations",
    capabilities: "Compétences",
    pricing: "Tarifs",
    process: "Comment ça marche",
    cta: "Écrivez-moi",
    skip: "Aller au contenu",
    themeLabel: "Thème de couleur",
    themeToLight: "Passer au thème clair",
    themeToDark: "Passer au thème sombre",
    langLabel: "Langue",
  },

  hero: {
    eyebrow: "Disponible pour de nouveaux projets",
    valueProp: "Un site Web à la hauteur de votre entreprise.",
    highlight: "à la hauteur",
    support:
      "Conçu sur mesure pour votre entreprise — pas un gabarit dans lequel on a glissé votre logo. Rapide, moderne, pensé d'abord pour le téléphone, parce que c'est là que vos clients se trouvent déjà. Prix fixe convenu d'avance, en ligne en quelques jours, aucuns frais mensuels.",
    cta: "Écrivez-moi sur WhatsApp",
    ctaSecondary: "Voir les réalisations",
    points: [
      "Conçu sur mesure, jamais un gabarit",
      "Prix fixe, convenu avant de commencer",
      "Se charge en moins d'une seconde sur un téléphone",
    ],
  },

  work: {
    label: "Réalisations choisies",
    heading: "Des sites que vous pouvez ouvrir tout de suite.",
    standfirst:
      "Un site client en ligne, et trois que j'ai bâtis pour montrer ce que produit chaque forfait. Ils s'ouvrent tous — cliquez partout, essayez-les sur votre téléphone, lisez le code si le cœur vous en dit.",
    badgeDemo: "Démo que j'ai bâtie",
    badgeLive: "Site client en ligne",
    openDemo: "Ouvrir la démo",
    visitLive: "Voir le site en ligne",
    disclosureLead: "Soyons clairs :",
    disclosureBody:
      "les trois démos sont des entreprises que j'ai inventées, bâties pour montrer ce que produit chaque forfait plutôt que pour des clients payants. Top Oil est un vrai site, avec de vrais clients.",
    samples: {
      topoil: {
        name: "Top Oil",
        problem:
          "Un détaillant d'huile à moteur dont les clients n'avaient aucune idée du produit qui convient à leur voiture. Le site demande le véhicule et n'affiche que ce qui lui va — un catalogue en direct, en deux langues, avec un panneau d'administration que le propriétaire gère lui-même.",
        imageAlt: "Top Oil — la boutique en ligne à topoil.ir.",
        features: [
          "Boutique en ligne",
          "Recherche par véhicule",
          "Deux langues",
          "Panneau d'administration sur mesure",
        ],
      },
      restaurant: {
        name: "Olive & Ember",
        problem:
          "Un restaurant de quartier qui perdait des réservations à cause d'un menu PDF illisible sur un téléphone. Le menu, les heures, la carte et un formulaire de réservation tiennent maintenant sur une seule page qui se charge instantanément.",
        imageAlt:
          "La démo du restaurant Olive & Ember, montrant la photo d'en-tête et le début du menu.",
        features: [
          "Menu",
          "Heures d'ouverture",
          "Carte",
          "Formulaire de réservation",
        ],
      },
      plumber: {
        name: "Northgate Plumbing",
        problem:
          "Un plombier qui passait ses journées à se faire magasiner au téléphone. Les tarifs, le territoire desservi et un formulaire de rappel sont sur la page avant que quiconque compose le numéro.",
        imageAlt:
          "La démo de Northgate Plumbing, montrant la bannière d'urgence et la liste des services avec les prix.",
        features: [
          "Services et prix",
          "Formulaire de rappel",
          "Territoire desservi",
          "Avis",
        ],
      },
      gym: {
        name: "Cadence Fitness",
        problem:
          "Un studio dont l'horaire des cours vivait dans une story Instagram que personne ne retrouvait. L'horaire de la semaine est la première chose sur la page, la journée en cours mise en évidence, et la réservation d'un essai gratuit se trouve juste en dessous.",
        imageAlt:
          "La démo de Cadence Fitness, montrant l'horaire hebdomadaire des cours avec la colonne du jour mise en évidence.",
        features: [
          "Horaire des cours",
          "Entraîneurs",
          "Prix des abonnements",
          "Réservation d'un essai",
        ],
      },
    },
  },

  capabilities: {
    label: "Au-delà des sites Web",
    heading: "Je bâtis aussi les logiciels qui font rouler les entreprises.",
    standfirst:
      "La plupart des entreprises locales ont besoin d'un bon site Web et de rien de plus — c'est à ça que servent les forfaits ci-dessous. Mais un site Web, c'est le petit bout de ce travail. Si votre entreprise a déjà dépassé ce stade, c'est de cette section qu'il faut me parler.",
    items: [
      {
        title: "Applications Web",
        body: "Portails clients, tableaux de bord, systèmes de réservation et d'horaires, outils internes. Bâtis avec React et TypeScript — la même pile que les grandes équipes, parce que c'est celle qui survit à l'entretien.",
        tags: ["React", "TypeScript", "API", "Comptes et permissions"],
      },
      {
        title: "Systèmes ERP et CRM",
        body: "Inventaire, facturation, achats, clients, permissions du personnel, rapports — les systèmes sur lesquels une entreprise roule vraiment. J'en ai conçu, bâti et livré du début à la fin, pas seulement un coin.",
        tags: [
          "Inventaire et facturation",
          "Rôles multiutilisateurs",
          "Rapports",
          "Migration de données",
        ],
      },
      {
        title: "Intégrations et automatisation",
        body: "Paiements, réservations, WhatsApp, Google Business, comptabilité et flux d'inventaire — reliés ensemble pour que le même travail cesse d'être fait deux fois à la main.",
        tags: [
          "Paiements",
          "Messagerie",
          "Tâches planifiées",
          "Services tiers",
        ],
      },
    ],
    note: "Un travail de cette taille se chiffre par projet, jamais à partir d'une liste de prix. Décrivez-moi le problème et je vous dirai honnêtement s'il faut développer un logiciel ou simplement un meilleur site Web.",
  },

  pricing: {
    label: "Forfaits et tarifs",
    heading: "Un seul chiffre, convenu avant de commencer.",
    standfirst:
      "Trois forfaits de site Web à prix fixe, et une quatrième voie pour tout ce qui est plus gros. Aucune facturation à l'heure, et aucune facture-surprise à la fin.",
    popular: "Le plus choisi",
    exampleLink: "Voir un exemple",
    examplePending: "Exemple à venir",
    tiers: {
      starter: {
        name: "Essentiel",
        price: "120 $",
        suits:
          "Une page qui dit qui vous êtes, ce que vous faites et comment vous joindre.",
        delivery: "Livré en 3 jours",
        features: [
          "Une page, conçue autour de votre entreprise",
          "Design sur mesure — pas un gabarit",
          "Pensé d'abord pour le téléphone",
          "Hébergement configuré gratuitement",
          "Votre propre nom de domaine (au coût)",
        ],
      },
      business: {
        name: "Affaires",
        price: "280 $",
        suits:
          "Un vrai site Web avec un menu, une liste de prix ou des pages de services.",
        delivery: "Livré en 5 jours",
        features: [
          "Jusqu'à 5 pages",
          "Design sur mesure — pas un gabarit",
          "Formulaire de contact envoyé sur votre téléphone",
          "Google Maps et heures d'ouverture",
          "Optimisation de la vitesse et du référencement",
          "Hébergement configuré gratuitement",
        ],
      },
      pro: {
        name: "Pro",
        price: "550 $ et plus",
        priceNote:
          "Plus de cinq pages, une deuxième langue, ou un système de réservation qui doit vérifier les disponibilités réelles font monter ce chiffre — chiffré avant que je commence.",
        suits:
          "Vos clients doivent pouvoir réserver, et vous préféreriez ne pas écrire les textes vous-même.",
        delivery: "Livré en 7 à 10 jours",
        features: [
          "Tout ce qu'il y a dans Affaires",
          "Formulaire de réservation — date, heure et détails sur votre téléphone",
          "J'écris les textes, à partir d'un seul appel",
          "Fiche d'établissement Google configurée",
          "Des éléments interactifs là où ils sont justifiés",
          "30 jours de modifications après la mise en ligne",
        ],
      },
      custom: {
        name: "Sur mesure",
        price: "Parlons-en",
        priceNote:
          "Chiffré par projet après un appel, avec la portée mise par écrit avant que quoi que ce soit commence.",
        suits:
          "Votre entreprise a dépassé le stade du site Web et a besoin d'un vrai logiciel.",
        delivery: "Échéancier convenu d'avance",
        features: [
          "Applications Web, portails et tableaux de bord",
          "Systèmes ERP, CRM et d'inventaire",
          "Interfaces React et TypeScript",
          "Bases de données, API et intégrations",
          "Soutien continu si vous le souhaitez",
        ],
      },
    },
    note: "Tous les prix sont en dollars canadiens. Pour chaque forfait : 50 % de dépôt pour commencer, 50 % à la livraison.",
    afterLaunch:
      "Aucuns frais mensuels, jamais. Les modifications ultérieures — nouveaux prix, nouveau menu, une page de plus — sont chiffrées à la pièce avant que je touche à quoi que ce soit.",
    help: "Vous ne savez pas lequel vous convient ? Décrivez-moi votre entreprise et je vous le dirai honnêtement. C'est souvent le moins cher.",
    cta: "Demandez quel forfait vous convient",
  },

  process: {
    label: "Comment ça marche",
    heading: "Quatre étapes, et vous ne faites que la première.",
    steps: [
      {
        title: "Écrivez-moi ce dont vous avez besoin",
        body: "Une phrase ou deux suffisent. Des photos de votre menu ou de votre liste de prix aident.",
      },
      {
        title: "Je vous envoie un prix fixe",
        body: "Un seul chiffre et une date de livraison. Ça ne change pas en cours de route.",
      },
      {
        title: "50 % de dépôt pour commencer",
        body: "Ensuite je le construis, et je vous envoie un lien pour le voir prendre forme.",
      },
      {
        title: "En ligne, et le reste à la livraison",
        body: "Votre site est mis en ligne à votre propre adresse. Vous payez le solde une fois qu'il est en ligne.",
      },
    ],
  },

  closing: {
    label: "Commencer",
    heading: "Mettons votre entreprise en ligne.",
    body: "Dites-moi ce que vous faites et je vous dirai ce que ça coûte. Sans engagement, et je vous le dirai franchement si je pense que vous n'avez pas besoin d'un site Web.",
    cta: "Écrivez-moi sur WhatsApp",
    emailPrefix: "Vous préférez le courriel ?",
    form: {
      heading: "Vous ne savez pas quoi écrire ?",
      intro:
        "Remplissez ceci et j'écris le message pour vous — vous n'avez qu'à l'envoyer.",
      name: "Votre nom",
      namePlaceholder: "Sam",
      business: "Quelle est votre entreprise ?",
      businessPlaceholder: "Une petite pizzéria du quartier",
      need: "De quoi avez-vous besoin ?",
      needOptional: "(facultatif)",
      needPlaceholder:
        "Un endroit pour le menu et pour prendre les réservations",
      submit: "Écrire mon message",
      reassurance:
        "Ceci ouvre WhatsApp avec le message déjà écrit. Rien n'est envoyé tant que vous n'appuyez pas sur envoyer.",
      errorRequired: "Veuillez indiquer votre nom et votre entreprise.",
      errorUnconfigured: "WhatsApp n'est pas encore configuré sur ce site.",
      messageIntro: "Bonjour, je suis {name}.",
      messageBusiness: "Je tiens {business}.",
      messageNeed: "Ce dont j'ai besoin : {need}",
      messageAsk: "Pourriez-vous me dire combien coûterait un site Web ?",
    },
  },

  footer: {
    tagline: "Sites Web et applications Web pour les entreprises sérieuses.",
    builtWith:
      "Bâti comme un site statique — c'est pour ça qu'il s'est chargé aussi vite.",
  },

  notFound: {
    eyebrow: "Page introuvable",
    heading: "Cette page n'existe pas.",
    body: "Elle a peut-être été déplacée, ou le lien contient une coquille. Tout — les réalisations, les prix, le fonctionnement — se trouve sur la page d'accueil.",
    home: "Retour à l'accueil",
    work: "Voir les réalisations",
    message: "Ou écrivez-moi simplement",
  },
};
