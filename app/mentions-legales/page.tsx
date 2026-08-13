import type { Metadata } from "next";

import { studio } from "@/data/studio";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales fictives de la démonstration ${studio.name}, à remplacer avant toute utilisation réelle.`,
};

const legalSections = [
  {
    title: "Éditeur du site",
    content: [
      `Dénomination : ${studio.legal.companyName}`,
      `Forme juridique : ${studio.legal.legalForm}`,
      `Capital social : ${studio.legal.capital}`,
      `SIRET : ${studio.legal.siret}`,
      `TVA : ${studio.legal.vat}`,
      `Siège social : ${studio.legal.registeredOffice}`,
    ],
  },
  { title: "Responsable de publication", content: [studio.legal.publicationDirector] },
  { title: "Hébergement", content: [studio.legal.host, studio.legal.hostDetails] },
  {
    title: "Données personnelles",
    content: [
      "Cette démonstration n’enregistre et ne transmet aucune réservation ni coordonnée saisie.",
      "[AVANT MISE EN PRODUCTION : DÉFINIR FINALITÉS, BASE LÉGALE, DURÉES DE CONSERVATION, DESTINATAIRES ET DROITS RGPD]",
    ],
  },
  {
    title: "Réservation et paiement",
    content: [
      "Les créneaux, professionnels et paiements présentés sont fictifs. Aucun rendez-vous ni contrat ne peut être conclu sur ce site.",
      "[AVANT ACTIVATION : AJOUTER DES CONDITIONS DE RÉSERVATION, D’ANNULATION, DE RETARD ET DE PAIEMENT VALIDÉES]",
    ],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "[TEXTE À ADAPTER AU TITULAIRE RÉEL DE LA MARQUE, DU DESIGN ET DES CONTENUS]",
      "Les photographies de démonstration proviennent d’Unsplash ; les crédits figurent dans le README.",
    ],
  },
];

export default function LegalPage() {
  return (
    <section className="site-container py-14 sm:py-20 lg:py-28">
      <p className="eyebrow">Informations réglementaires</p>
      <h1 className="display-title mt-6 max-w-[9ch] text-[clamp(2.75rem,11vw,8rem)] leading-[0.8]">Mentions légales.</h1>
      <div className="mt-10 border border-copper/50 bg-copper/10 p-5 text-sm leading-7 text-smoke sm:p-6">
        <strong className="text-copper">Document de démonstration.</strong> {" "}
        {studio.demoNotice} Tous les champs entre crochets doivent être remplacés et validés avant une mise en ligne commerciale.
      </div>
      <div className="mt-14 grid gap-x-16 lg:grid-cols-2">
        {legalSections.map((section) => (
          <article key={section.title} className="border-t border-bone/15 py-8">
            <h2 className="text-2xl font-bold uppercase tracking-[-0.03em]">{section.title}</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-smoke/65">
              {section.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
