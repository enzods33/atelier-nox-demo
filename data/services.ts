export const serviceCategories = ["Cheveux", "Barbe", "Rituels"] as const;

export type ServiceCategory = (typeof serviceCategories)[number];

export type StudioService = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  duration: number;
  price: number;
  deposit: number;
  category: ServiceCategory;
  signature?: boolean;
};

export const services: StudioService[] = [
  {
    id: "coupe-classique",
    name: "Coupe classique",
    shortName: "Coupe",
    description: "Diagnostic, coupe aux ciseaux ou à la tondeuse et finition coiffage.",
    duration: 40,
    price: 30,
    deposit: 10,
    category: "Cheveux",
    signature: true,
  },
  {
    id: "degrade",
    name: "Dégradé précis",
    shortName: "Dégradé",
    description: "Dégradé progressif, contours travaillés et finition texturée.",
    duration: 45,
    price: 34,
    deposit: 10,
    category: "Cheveux",
  },
  {
    id: "coupe-longue",
    name: "Coupe longue",
    shortName: "Coupe longue",
    description: "Construction de forme, travail aux ciseaux et conseils d’entretien.",
    duration: 55,
    price: 38,
    deposit: 12,
    category: "Cheveux",
  },
  {
    id: "taille-barbe",
    name: "Taille de barbe",
    shortName: "Barbe",
    description: "Structure, contours, serviette chaude et soin hydratant.",
    duration: 30,
    price: 20,
    deposit: 8,
    category: "Barbe",
    signature: true,
  },
  {
    id: "rasage-traditionnel",
    name: "Rasage traditionnel",
    shortName: "Rasage",
    description: "Préparation chaude, rasage au coupe-chou et soin apaisant.",
    duration: 40,
    price: 28,
    deposit: 10,
    category: "Barbe",
  },
  {
    id: "coupe-barbe",
    name: "Coupe + barbe",
    shortName: "Coupe + barbe",
    description: "Le rendez-vous complet : coupe, barbe, contours et finition.",
    duration: 60,
    price: 45,
    deposit: 15,
    category: "Rituels",
    signature: true,
  },
  {
    id: "soin-barbe",
    name: "Soin barbe",
    shortName: "Soin barbe",
    description: "Nettoyage, vapeur, masque et protocole nourrissant ciblé.",
    duration: 35,
    price: 26,
    deposit: 10,
    category: "Barbe",
  },
  {
    id: "rituel-complet",
    name: "Rituel Nox",
    shortName: "Rituel complet",
    description: "Coupe, barbe, soin du visage express et finition sur mesure.",
    duration: 90,
    price: 68,
    deposit: 20,
    category: "Rituels",
  },
];

export const signatureServices = services.filter((service) => service.signature);

export function getService(serviceId: string | null | undefined) {
  return services.find((service) => service.id === serviceId);
}
