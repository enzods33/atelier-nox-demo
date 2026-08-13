const wordmark = {
  primary: "ATELIER",
  accent: "NOX",
} as const;

const studioName = `${wordmark.primary} ${wordmark.accent}`;

export const studio = {
  name: studioName,
  wordmark,
  activity: "Barbier contemporain · Studio de grooming",
  tagline: "La coupe juste. Le geste précis.",
  description:
    "Un atelier urbain dédié aux coupes nettes, aux barbes maîtrisées et aux gestes qui font la différence.",
  demoNotice:
    "Concept fictif présenté dans un portfolio — aucun établissement réel n’est associé à cette démonstration.",
  siteUrl: "https://atelier-nox.invalid",
  bookingStorageKey: "atelier-nox-booking-draft",
  seo: {
    defaultTitle: `${studioName} — Démonstration de réservation en ligne`,
    description: `Démonstration fictive d’un site de barbier avec parcours de prise de rendez-vous. ${studioName} n’est pas un établissement réel.`,
    socialTitle: `${studioName} — La coupe juste. Le geste précis.`,
    socialDescription:
      "Une démonstration de portfolio autour d’un studio de grooming contemporain et de son parcours de réservation.",
  },
  address: {
    street: "[ADRESSE FICTIVE — À REMPLACER]",
    city: "[VILLE — À REMPLACER]",
    access:
      "Accès fictif · atelier au rez-de-chaussée · aucune localisation réelle",
  },
  contact: {
    phone: "[TÉLÉPHONE FICTIF — À REMPLACER]",
    email: "[E-MAIL FICTIF — À REMPLACER]",
    note: "Ces coordonnées ne correspondent à aucun établissement réel.",
  },
  hours: [
    { days: "Lundi", hours: "Fermé" },
    { days: "Mardi — jeudi", hours: "09:30 — 19:00" },
    { days: "Vendredi", hours: "09:30 — 20:00" },
    { days: "Samedi", hours: "09:00 — 18:00" },
    { days: "Dimanche", hours: "Fermé" },
  ],
  legal: {
    companyName: "[RAISON SOCIALE À COMPLÉTER]",
    legalForm: "[FORME JURIDIQUE À COMPLÉTER]",
    capital: "[CAPITAL SOCIAL À COMPLÉTER]",
    siret: "[SIRET À COMPLÉTER]",
    vat: "[TVA À COMPLÉTER]",
    registeredOffice: "[SIÈGE SOCIAL À COMPLÉTER]",
    publicationDirector: "[RESPONSABLE DE PUBLICATION À COMPLÉTER]",
    host: "[HÉBERGEUR À COMPLÉTER]",
    hostDetails: "[COORDONNÉES DE L’HÉBERGEUR À COMPLÉTER]",
  },
} as const;

export const imageCredits = [
  {
    file: "hero-cut.jpg",
    author: "Mitchell Orr",
    source: "https://unsplash.com/photos/pL6-dYFSGWI",
  },
  {
    file: "detail-cut.jpg",
    author: "Taylor Smith",
    source: "https://unsplash.com/photos/XeRfuWMvfyY",
  },
  {
    file: "studio-interior.jpg",
    author: "Barney Goodman",
    source: "https://unsplash.com/photos/AXurvQTtO3Y",
  },
  {
    file: "milo.jpg",
    author: "JC Gellidon",
    source: "https://unsplash.com/photos/Q9OUH8WDHBg",
  },
  {
    file: "sami.jpg",
    author: "Ahmed Warraich",
    source: "https://unsplash.com/photos/1L-rg-6Ux5I",
  },
  {
    file: "alex.jpg",
    author: "Wylkon Cardoso",
    source: "https://unsplash.com/photos/lCtgUXYrqCo",
  },
] as const;
