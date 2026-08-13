export type TeamMember = {
  id: string;
  firstName: string;
  image: string;
  role: string;
  specialty: string;
  bio: string;
  serviceIds: string[];
};

export const team: TeamMember[] = [
  {
    id: "milo",
    firstName: "Milo",
    image: "/images/milo.jpg",
    role: "Barbier · Fondateur fictif",
    specialty: "Coupes longues & formes naturelles",
    bio: "Milo construit des coupes qui vivent bien entre deux rendez-vous. Son approche part du mouvement, de la matière et du temps réel accordé au coiffage.",
    serviceIds: [
      "coupe-classique",
      "coupe-longue",
      "taille-barbe",
      "coupe-barbe",
      "soin-barbe",
      "rituel-complet",
    ],
  },
  {
    id: "sami",
    firstName: "Sami",
    image: "/images/sami.jpg",
    role: "Barbier",
    specialty: "Dégradés & finitions graphiques",
    bio: "Sami travaille les transitions, les contours et les détails nets. Une précision technique au service d’un résultat sobre, jamais figé.",
    serviceIds: [
      "coupe-classique",
      "degrade",
      "taille-barbe",
      "rasage-traditionnel",
      "coupe-barbe",
      "rituel-complet",
    ],
  },
  {
    id: "alex",
    firstName: "Alex",
    image: "/images/alex.jpg",
    role: "Barbier · Grooming specialist",
    specialty: "Barbes & rituels de soin",
    bio: "Alex associe taille, rasage et protocoles de soin pour rendre chaque barbe plus lisible, plus confortable et simple à entretenir au quotidien.",
    serviceIds: [
      "taille-barbe",
      "rasage-traditionnel",
      "coupe-barbe",
      "soin-barbe",
      "rituel-complet",
    ],
  },
];

export function getTeamMember(memberId: string | null | undefined) {
  return team.find((member) => member.id === memberId);
}

export function getCompatibleTeam(serviceId: string | null | undefined) {
  if (!serviceId) return [];
  return team.filter((member) => member.serviceIds.includes(serviceId));
}
