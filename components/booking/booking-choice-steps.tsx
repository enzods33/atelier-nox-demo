import { Check, Clock3, UserRound, Users } from "lucide-react";
import Image from "next/image";

import type { ChoiceStepsProps } from "@/components/booking/booking-types";
import { getService, services } from "@/data/services";
import { getCompatibleTeam } from "@/data/team";
import { formatDay, formatPrice } from "@/lib/format";

function SelectionMark() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-copper text-bone">
      <Check size={14} strokeWidth={3} aria-hidden="true" />
    </span>
  );
}

export function BookingChoiceSteps({
  step,
  selection,
  bookingDays,
  onServiceSelect,
  onMemberSelect,
  onDateSelect,
  onSlotSelect,
}: ChoiceStepsProps) {
  if (step === 1) {
    return (
      <div>
        <p className="eyebrow">Étape 01</p>
        <h2 className="display-title mt-5 text-4xl leading-[0.9] sm:text-6xl">Choisissez le geste.</h2>
        <div className="mt-9 grid gap-3 sm:grid-cols-2">
          {services.map((service) => {
            const isSelected = selection.serviceId === service.id;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onServiceSelect(service.id)}
                aria-pressed={isSelected}
                className={`min-h-36 border p-5 text-left transition ${isSelected ? "border-copper bg-copper/10" : "border-bone/15 bg-carbon hover:border-bone/45"}`}
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="text-lg font-bold uppercase tracking-[-0.03em]">{service.name}</span>
                  {isSelected && <SelectionMark />}
                </span>
                <span className="mt-5 flex items-center justify-between gap-4 font-mono text-xs text-steel">
                  <span className="inline-flex items-center gap-1.5"><Clock3 size={13} aria-hidden="true" />{service.duration} min</span>
                  <strong className="font-semibold text-bone">{formatPrice(service.price)}</strong>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (step === 2) {
    const compatibleTeam = getCompatibleTeam(selection.serviceId);
    return (
      <div>
        <p className="eyebrow">Étape 02</p>
        <h2 className="display-title mt-5 text-4xl leading-[0.9] sm:text-6xl">Choisissez votre professionnel.</h2>
        <p className="mt-5 max-w-xl text-sm leading-7 text-smoke/65">
          Seuls les profils compatibles avec {getService(selection.serviceId)?.name.toLowerCase()} sont proposés.
        </p>
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button
            type="button"
            onClick={() => onMemberSelect("any")}
            aria-pressed={selection.preferredMemberId === "any"}
            className={`flex min-h-52 flex-col border p-5 text-left transition ${selection.preferredMemberId === "any" ? "border-copper bg-copper/10" : "border-bone/15 bg-carbon hover:border-bone/45"}`}
          >
            <span className="flex items-start justify-between gap-4">
              <Users className="text-copper" aria-hidden="true" />
              {selection.preferredMemberId === "any" && <SelectionMark />}
            </span>
            <strong className="mt-auto text-lg uppercase">Sans préférence</strong>
            <span className="mt-2 text-xs leading-5 text-steel">Le premier créneau compatible sera attribué.</span>
          </button>

          {compatibleTeam.map((member) => {
            const isSelected = selection.preferredMemberId === member.id;
            return (
              <button
                key={member.id}
                type="button"
                onClick={() => onMemberSelect(member.id)}
                aria-pressed={isSelected}
                className={`group border text-left transition ${isSelected ? "border-copper bg-copper/10" : "border-bone/15 bg-carbon hover:border-bone/45"}`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-concrete">
                  <Image src={member.image} alt="" fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover grayscale" />
                  {isSelected && <span className="absolute top-3 right-3"><SelectionMark /></span>}
                </span>
                <span className="block p-5">
                  <strong className="text-lg uppercase">{member.firstName}</strong>
                  <span className="mt-2 block text-xs leading-5 text-steel">{member.specialty}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div>
        <p className="eyebrow">Étape 03</p>
        <h2 className="display-title mt-5 text-4xl leading-[0.9] sm:text-6xl">Choisissez une date.</h2>
        <p className="mt-5 max-w-xl text-sm leading-7 text-smoke/65">
          Les 14 prochains jours sont calculés à partir de disponibilités locales fictives. Les jours sans créneau sont désactivés.
        </p>
        <div className="mt-9 grid grid-cols-2 gap-2 min-[430px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-7">
          {bookingDays.map((day) => {
            const label = formatDay(day.date);
            const isSelected = selection.dateKey === day.dateKey;
            const isDisabled = day.slots.length === 0;
            return (
              <button
                key={day.dateKey}
                type="button"
                onClick={() => onDateSelect(day.dateKey)}
                disabled={isDisabled}
                aria-pressed={isSelected}
                aria-label={`${label.weekday} ${label.day} ${label.month}${isDisabled ? ", aucun créneau" : ""}`}
                className={`min-h-28 border px-3 py-4 text-center transition ${isSelected ? "border-copper bg-copper text-bone" : isDisabled ? "cursor-not-allowed border-bone/8 text-steel/35" : "border-bone/15 bg-carbon hover:border-bone/50"}`}
              >
                <span className="block font-mono text-[0.65rem] uppercase tracking-[0.08em]">{label.weekday}</span>
                <strong className="mt-2 block text-3xl leading-none">{label.day}</strong>
                <span className="mt-2 block font-mono text-[0.65rem] uppercase text-current">{label.month}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow">Étape 04</p>
      <h2 className="display-title mt-5 text-4xl leading-[0.9] sm:text-6xl">Choisissez l’heure.</h2>
      <p className="mt-5 max-w-xl text-sm leading-7 text-smoke/65">
        Ces créneaux varient selon la date et le professionnel. Ils ne correspondent à aucun agenda réel.
      </p>
      <div className="mt-9 grid grid-cols-2 gap-2 min-[430px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5">
        {(bookingDays.find((day) => day.dateKey === selection.dateKey)?.slots ?? []).map((slot) => {
          const isSelected = selection.slot === slot;
          return (
            <button
              key={slot}
              type="button"
              onClick={() => onSlotSelect(slot)}
              aria-pressed={isSelected}
              className={`flex min-h-14 items-center justify-center border font-mono text-sm font-semibold transition ${isSelected ? "border-copper bg-copper text-bone" : "border-bone/15 bg-carbon hover:border-bone/50"}`}
            >
              {slot}{isSelected && <Check className="ml-2" size={14} aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex items-start gap-3 border-l-2 border-copper bg-carbon p-4 text-xs leading-6 text-smoke/65">
        <UserRound className="mt-0.5 shrink-0 text-copper" size={17} aria-hidden="true" />
        <p>En choisissant « Sans préférence », un professionnel compatible est attribué automatiquement à ce créneau de démonstration.</p>
      </div>
    </div>
  );
}
