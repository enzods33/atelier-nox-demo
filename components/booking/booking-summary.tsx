import { CalendarDays, Clock3, CreditCard, Scissors, UserRound } from "lucide-react";

import type { BookingSelection, ContactDetails } from "@/components/booking/booking-types";
import { getService } from "@/data/services";
import { getTeamMember } from "@/data/team";
import { formatLongDate, formatPrice } from "@/lib/format";

export function BookingSummary({
  selection,
  contact,
  showDemoNotice,
  onPaymentAttempt,
}: {
  selection: BookingSelection;
  contact: ContactDetails;
  showDemoNotice: boolean;
  onPaymentAttempt: () => void;
}) {
  const service = getService(selection.serviceId);
  const member = getTeamMember(selection.assignedMemberId);
  const selectedDate = selection.dateKey ? new Date(`${selection.dateKey}T12:00:00`) : null;

  if (!service || !member || !selectedDate || !selection.slot) return null;

  const balance = service.price - service.deposit;

  return (
    <div>
      <p className="eyebrow">Étape 06</p>
      <h2 className="display-title mt-5 text-4xl leading-[0.9] sm:text-6xl">Vérifiez le rendez-vous.</h2>
      <p className="mt-5 max-w-xl text-sm leading-7 text-smoke/65">
        Rien ne sera enregistré. Ce récapitulatif montre l’étape qui précéderait une intégration Stripe Checkout réelle.
      </p>

      <div className="mt-9 grid gap-px bg-bone/12 sm:grid-cols-2">
        <SummaryCell icon={Scissors} label="Prestation" value={service.name} detail={`${service.duration} min`} />
        <SummaryCell icon={UserRound} label="Professionnel" value={member.firstName} detail={member.specialty} />
        <SummaryCell icon={CalendarDays} label="Date" value={formatLongDate(selectedDate)} detail="Disponibilité fictive" />
        <SummaryCell icon={Clock3} label="Horaire" value={selection.slot} detail="Heure locale" />
      </div>

      <div className="mt-px bg-carbon p-5 sm:p-7">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-steel">Coordonnées</p>
        <p className="mt-3 text-lg font-semibold">{contact.firstName} {contact.lastName}</p>
        <p className="mt-1 text-sm leading-6 text-smoke/60">{contact.email}<br />{contact.phone}</p>
        {contact.note && <p className="mt-4 border-l border-copper pl-4 text-sm italic leading-6 text-smoke/70">{contact.note}</p>}
      </div>

      <div className="mt-6 border border-bone/15 bg-carbon p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <CreditCard className="text-copper" aria-hidden="true" />
          <h3 className="text-lg font-bold uppercase">Acompte</h3>
        </div>
        <dl className="mt-6 divide-y divide-bone/12">
          <PriceRow label="Prix total" value={service.price} />
          <PriceRow label="Acompte à la réservation" value={service.deposit} emphasized />
          <PriceRow label="Solde sur place" value={balance} />
        </dl>
        <button type="button" onClick={onPaymentAttempt} className="button-primary mt-7 w-full sm:w-auto">
          Payer l’acompte et confirmer
        </button>
      </div>

      {showDemoNotice && (
        <div role="alert" tabIndex={-1} className="mt-5 border border-copper bg-copper/10 p-5 text-sm leading-7 text-smoke">
          <strong className="block text-base uppercase text-copper">Paiement désactivé</strong>
          Le paiement et la confirmation sont désactivés sur cette démonstration. Aucune donnée bancaire n’est demandée et aucun rendez-vous n’est enregistré.
        </div>
      )}
    </div>
  );
}

function SummaryCell({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Scissors;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="bg-carbon p-5 sm:p-7">
      <Icon className="text-copper" size={20} aria-hidden="true" />
      <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-steel">{label}</p>
      <p className="mt-2 text-xl font-bold capitalize">{value}</p>
      <p className="mt-2 text-xs leading-5 text-smoke/50">{detail}</p>
    </div>
  );
}

function PriceRow({ label, value, emphasized = false }: { label: string; value: number; emphasized?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-5 py-4">
      <dt className={emphasized ? "font-semibold text-bone" : "text-sm text-smoke/65"}>{label}</dt>
      <dd className={`font-mono ${emphasized ? "text-lg font-semibold text-copper" : "text-sm"}`}>{formatPrice(value)}</dd>
    </div>
  );
}
