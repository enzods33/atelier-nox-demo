import type { Metadata } from "next";

import { BookingFlow } from "@/components/booking/booking-flow";
import { studio } from "@/data/studio";

export const metadata: Metadata = {
  title: "Réserver",
  description: `Testez le parcours fictif de prise de rendez-vous de ${studio.name} : prestation, professionnel, date, horaire et acompte simulé.`,
};

type ReservationPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ReservationPage({ searchParams }: ReservationPageProps) {
  const params = await searchParams;

  return (
    <>
      <section className="grid-surface border-b border-bone/10 py-12 sm:py-16">
        <div className="site-container">
          <p className="eyebrow">Réservation en ligne</p>
          <h1 className="display-title mt-5 max-w-[13ch] text-[clamp(3.3rem,9vw,6.5rem)] leading-[0.82]">
            Votre prochain passage, étape par étape.
          </h1>
          <div className="mt-7 max-w-3xl border-l-2 border-copper pl-4 text-sm leading-7 text-smoke/65">
            Parcours de démonstration : les créneaux sont fictifs, aucune réservation n’est enregistrée et aucun paiement n’est effectué.
          </div>
        </div>
      </section>
      <BookingFlow
        initialServiceId={firstString(params.service)}
        initialMemberId={firstString(params.member)}
      />
    </>
  );
}
