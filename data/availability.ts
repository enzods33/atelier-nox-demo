import { getCompatibleTeam } from "@/data/team";

type WeeklySlots = Record<number, string[]>;

const availabilityByMember: Record<string, WeeklySlots> = {
  milo: {
    2: ["09:30", "11:00", "14:00", "15:30", "17:30"],
    3: ["10:00", "11:30", "14:30", "16:00", "18:00"],
    4: ["09:30", "11:00", "14:00", "16:30"],
    5: ["10:00", "12:00", "15:00", "17:00", "18:30"],
    6: ["09:00", "10:30", "13:30", "15:30", "17:00"],
  },
  sami: {
    2: ["10:00", "11:30", "14:30", "16:00", "18:00"],
    3: ["09:30", "11:00", "13:30", "15:30", "17:30"],
    4: ["10:30", "12:00", "14:00", "16:00", "18:00"],
    5: ["09:30", "11:30", "14:30", "16:30", "19:00"],
    6: ["09:00", "11:00", "13:00", "15:00", "17:00"],
  },
  alex: {
    2: ["09:30", "11:30", "14:00", "16:30"],
    3: ["10:00", "12:00", "15:00", "17:00"],
    4: ["09:30", "11:00", "14:30", "16:00", "18:00"],
    5: ["10:30", "12:00", "15:30", "17:30", "19:00"],
    6: ["09:00", "10:30", "13:30", "15:30"],
  },
};

export type BookingDay = {
  dateKey: string;
  date: Date;
  slots: string[];
};

export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMemberSlots(memberId: string, date: Date) {
  const baseSlots = availabilityByMember[memberId]?.[date.getDay()] ?? [];
  const offset = (date.getDate() + memberId.length) % 3;

  return baseSlots.filter((_, index) => (index + offset) % 4 !== 0);
}

export function getBookingDays(
  serviceId: string,
  preferredMemberId: string | null,
  start = new Date(),
) {
  const compatibleTeam = getCompatibleTeam(serviceId).filter(
    (member) => !preferredMemberId || member.id === preferredMemberId,
  );

  return Array.from({ length: 14 }, (_, index): BookingDay => {
    const date = new Date(start);
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + index + 1);

    const slots = Array.from(
      new Set(compatibleTeam.flatMap((member) => getMemberSlots(member.id, date))),
    ).sort();

    return { dateKey: toDateKey(date), date, slots };
  });
}

export function resolveMemberForSlot(
  serviceId: string,
  preferredMemberId: string | null,
  date: Date,
  slot: string,
) {
  const compatibleTeam = getCompatibleTeam(serviceId).filter(
    (member) => !preferredMemberId || member.id === preferredMemberId,
  );

  return compatibleTeam.find((member) => getMemberSlots(member.id, date).includes(slot));
}
