"use client";

import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { BookingChoiceSteps } from "@/components/booking/booking-choice-steps";
import { BookingContact, validateContact } from "@/components/booking/booking-contact";
import { BookingSummary } from "@/components/booking/booking-summary";
import {
  emptyContact,
  emptySelection,
  type BookingSelection,
  type ContactDetails,
  type ContactErrors,
  type PreferredMemberId,
} from "@/components/booking/booking-types";
import { getBookingDays, resolveMemberForSlot } from "@/data/availability";
import { getService } from "@/data/services";
import { studio } from "@/data/studio";
import { getCompatibleTeam, getTeamMember } from "@/data/team";
import { formatPrice } from "@/lib/format";

const stepLabels = ["Prestation", "Professionnel", "Date", "Horaire", "Coordonnées", "Récapitulatif"];

type StoredDraft = BookingSelection & { step: number };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseStoredDraft(value: unknown): StoredDraft | null {
  if (!isRecord(value)) return null;

  const serviceId = typeof value.serviceId === "string" && getService(value.serviceId) ? value.serviceId : null;
  const preferredMemberId: PreferredMemberId =
    value.preferredMemberId === "any"
      ? "any"
      : typeof value.preferredMemberId === "string" && getTeamMember(value.preferredMemberId)
        ? value.preferredMemberId
        : null;
  const assignedMemberId =
    typeof value.assignedMemberId === "string" && getTeamMember(value.assignedMemberId)
      ? value.assignedMemberId
      : null;
  const dateKey = typeof value.dateKey === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.dateKey) ? value.dateKey : null;
  const slot = typeof value.slot === "string" && /^\d{2}:\d{2}$/.test(value.slot) ? value.slot : null;
  const requestedStep = typeof value.step === "number" && Number.isInteger(value.step) ? value.step : 1;

  const selection = { serviceId, preferredMemberId, assignedMemberId, dateKey, slot };
  return { ...selection, step: Math.min(Math.max(requestedStep, 1), highestReachableStep(selection)) };
}

function highestReachableStep(selection: BookingSelection) {
  if (!selection.serviceId) return 1;
  if (!selection.preferredMemberId) return 2;
  if (!selection.dateKey) return 3;
  if (!selection.slot || !selection.assignedMemberId) return 4;
  return 5;
}

function createInitialSelection(initialServiceId?: string, initialMemberId?: string): BookingSelection {
  const service = getService(initialServiceId);
  const member = getTeamMember(initialMemberId);
  return {
    ...emptySelection,
    serviceId: service?.id ?? null,
    preferredMemberId: member?.id ?? null,
  };
}

export function BookingFlow({
  initialServiceId,
  initialMemberId,
}: {
  initialServiceId?: string;
  initialMemberId?: string;
}) {
  const initialSelection = useMemo(
    () => createInitialSelection(initialServiceId, initialMemberId),
    [initialMemberId, initialServiceId],
  );
  const [selection, setSelection] = useState<BookingSelection>(initialSelection);
  const [contact, setContact] = useState<ContactDetails>(emptyContact);
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [step, setStep] = useState(1);
  const [referenceDate, setReferenceDate] = useState<Date | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showDemoNotice, setShowDemoNotice] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      let restoredSelection = initialSelection;
      let restoredStep = highestReachableStep(initialSelection);

      try {
        const saved = window.localStorage.getItem(studio.bookingStorageKey);
        const parsed: unknown = saved ? JSON.parse(saved) : null;
        const storedDraft = parseStoredDraft(parsed);

        if (storedDraft) {
          restoredSelection = storedDraft;
          restoredStep = storedDraft.step;
        }

        if (initialServiceId && getService(initialServiceId)) {
          restoredSelection = {
            ...restoredSelection,
            serviceId: initialServiceId,
            dateKey: null,
            slot: null,
            assignedMemberId: null,
          };
          restoredStep = 1;
        }

        if (initialMemberId && getTeamMember(initialMemberId)) {
          restoredSelection = {
            ...restoredSelection,
            preferredMemberId: initialMemberId,
            dateKey: null,
            slot: null,
            assignedMemberId: null,
          };
          restoredStep = restoredSelection.serviceId ? 2 : 1;
        }

        setSelection(restoredSelection);
        setStep(Math.min(restoredStep, highestReachableStep(restoredSelection)));
      } catch {
        window.localStorage.removeItem(studio.bookingStorageKey);
      } finally {
        setReferenceDate(new Date());
        setIsHydrated(true);
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [initialMemberId, initialSelection, initialServiceId]);

  const preferredMemberId =
    selection.preferredMemberId === "any" ? null : selection.preferredMemberId;
  const bookingDays = useMemo(
    () =>
      selection.serviceId && selection.preferredMemberId && referenceDate
        ? getBookingDays(selection.serviceId, preferredMemberId, referenceDate)
        : [],
    [preferredMemberId, referenceDate, selection.preferredMemberId, selection.serviceId],
  );

  useEffect(() => {
    if (!isHydrated || !selection.dateKey || bookingDays.length === 0) return;
    if (bookingDays.some((day) => day.dateKey === selection.dateKey && day.slots.length > 0)) return;

    const timeout = window.setTimeout(() => {
      setSelection((current) => ({ ...current, dateKey: null, slot: null, assignedMemberId: null }));
      setStep((current) => Math.min(current, 3));
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [bookingDays, isHydrated, selection.dateKey]);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(
      studio.bookingStorageKey,
      JSON.stringify({ ...selection, step: Math.min(step, 5) }),
    );
  }, [isHydrated, selection, step]);

  const selectedService = getService(selection.serviceId);
  const selectedMember = getTeamMember(selection.assignedMemberId);

  function selectService(serviceId: string) {
    const preferredStillCompatible =
      selection.preferredMemberId === "any" ||
      (selection.preferredMemberId &&
        getCompatibleTeam(serviceId).some((member) => member.id === selection.preferredMemberId));

    setSelection({
      serviceId,
      preferredMemberId: preferredStillCompatible ? selection.preferredMemberId : null,
      assignedMemberId: null,
      dateKey: null,
      slot: null,
    });
  }

  function selectMember(memberId: PreferredMemberId) {
    setSelection((current) => ({
      ...current,
      preferredMemberId: memberId,
      assignedMemberId: null,
      dateKey: null,
      slot: null,
    }));
  }

  function selectDate(dateKey: string) {
    setSelection((current) => ({ ...current, dateKey, slot: null, assignedMemberId: null }));
  }

  function selectSlot(slot: string) {
    const day = bookingDays.find((candidate) => candidate.dateKey === selection.dateKey);
    if (!selection.serviceId || !day) return;

    const member = resolveMemberForSlot(
      selection.serviceId,
      preferredMemberId,
      day.date,
      slot,
    );
    if (!member) return;

    setSelection((current) => ({ ...current, slot, assignedMemberId: member.id }));
  }

  function canContinue() {
    if (step === 1) return Boolean(selection.serviceId);
    if (step === 2) return Boolean(selection.preferredMemberId);
    if (step === 3) return Boolean(selection.dateKey);
    if (step === 4) return Boolean(selection.slot && selection.assignedMemberId);
    return true;
  }

  function continueBooking() {
    if (step === 5) {
      const errors = validateContact(contact);
      setContactErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }
    setShowDemoNotice(false);
    setStep((current) => Math.min(current + 1, 6));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setShowDemoNotice(false);
    setStep((current) => Math.max(current - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="site-container grid gap-10 py-10 sm:py-14 lg:grid-cols-[0.34fr_1fr] lg:gap-16 lg:py-20">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.13em] text-steel">Progression</p>
        <ol className="mt-5 grid grid-cols-3 gap-px bg-bone/10 lg:block lg:bg-transparent">
          {stepLabels.map((label, index) => {
            const stepNumber = index + 1;
            const isCurrent = step === stepNumber;
            const isComplete = step > stepNumber;
            return (
              <li key={label} className="lg:border-b lg:border-bone/10">
                <button
                  type="button"
                  onClick={() => isComplete && setStep(stepNumber)}
                  disabled={!isComplete}
                  aria-label={`Étape ${stepNumber} sur 6 : ${label}${isComplete ? " (terminée)" : isCurrent ? " (en cours)" : ""}`}
                  aria-current={isCurrent ? "step" : undefined}
                  className={`flex min-h-16 w-full items-center gap-3 bg-void px-2 text-left font-mono text-[0.62rem] uppercase leading-4 tracking-[0.05em] lg:min-h-14 lg:px-0 ${isCurrent ? "text-copper" : isComplete ? "text-bone" : "text-steel/45"}`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center border ${isCurrent || isComplete ? "border-copper" : "border-bone/15"}`}>
                    {isComplete ? <Check size={13} aria-hidden="true" /> : `0${stepNumber}`}
                  </span>
                  <span className="hidden min-[430px]:inline">{label}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 hidden border border-bone/12 bg-carbon p-5 lg:block">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-steel">Votre sélection</p>
          <p className="mt-4 text-sm font-semibold">{selectedService?.name ?? "Aucune prestation"}</p>
          {selectedService && <p className="mt-1 font-mono text-xs text-copper">{selectedService.duration} min · {formatPrice(selectedService.price)}</p>}
          {selectedMember && <p className="mt-4 border-t border-bone/10 pt-4 text-sm text-smoke/70">Avec {selectedMember.firstName}</p>}
          {selection.dateKey && selection.slot && <p className="mt-2 font-mono text-xs text-steel">{selection.dateKey} · {selection.slot}</p>}
        </div>
      </aside>

      <section aria-live="polite" className="min-w-0">
        {step <= 4 && (
          <BookingChoiceSteps
            step={step}
            selection={selection}
            bookingDays={bookingDays}
            onServiceSelect={selectService}
            onMemberSelect={selectMember}
            onDateSelect={selectDate}
            onSlotSelect={selectSlot}
          />
        )}
        {step === 5 && (
          <BookingContact
            contact={contact}
            errors={contactErrors}
            onChange={(field, value) => {
              setContact((current) => ({ ...current, [field]: value }));
              setContactErrors((current) => ({ ...current, [field]: undefined }));
            }}
          />
        )}
        {step === 6 && (
          <BookingSummary
            selection={selection}
            contact={contact}
            showDemoNotice={showDemoNotice}
            onPaymentAttempt={() => setShowDemoNotice(true)}
          />
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-bone/12 pt-6 min-[430px]:flex-row min-[430px]:items-center min-[430px]:justify-between">
          <button type="button" onClick={goBack} disabled={step === 1} className="button-secondary disabled:cursor-not-allowed disabled:opacity-30">
            <ArrowLeft size={16} aria-hidden="true" /> Retour
          </button>
          {step < 6 && (
            <button type="button" onClick={continueBooking} disabled={!canContinue()} className="button-primary disabled:cursor-not-allowed disabled:border-steel disabled:bg-steel disabled:opacity-40">
              Continuer <ArrowRight size={16} aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="mt-6 flex items-start gap-3 text-xs leading-6 text-steel">
          <ShieldCheck className="mt-0.5 shrink-0 text-copper" size={17} aria-hidden="true" />
          <p>Aucune réservation réelle, aucune double réservation évitée et aucune donnée bancaire collectée dans cette démonstration.</p>
        </div>
      </section>
    </div>
  );
}
