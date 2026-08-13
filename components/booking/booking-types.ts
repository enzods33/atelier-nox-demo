import type { BookingDay } from "@/data/availability";

export type PreferredMemberId = string | "any" | null;

export type BookingSelection = {
  serviceId: string | null;
  preferredMemberId: PreferredMemberId;
  assignedMemberId: string | null;
  dateKey: string | null;
  slot: string | null;
};

export type ContactDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
};

export type ContactErrors = Partial<Record<keyof ContactDetails, string>>;

export type ChoiceStepsProps = {
  step: number;
  selection: BookingSelection;
  bookingDays: BookingDay[];
  onServiceSelect: (serviceId: string) => void;
  onMemberSelect: (memberId: PreferredMemberId) => void;
  onDateSelect: (dateKey: string) => void;
  onSlotSelect: (slot: string) => void;
};

export const emptyContact: ContactDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  note: "",
};

export const emptySelection: BookingSelection = {
  serviceId: null,
  preferredMemberId: null,
  assignedMemberId: null,
  dateKey: null,
  slot: null,
};
