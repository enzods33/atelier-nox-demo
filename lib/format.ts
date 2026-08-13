export function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

export function formatDay(date: Date) {
  return {
    weekday: new Intl.DateTimeFormat("fr-FR", { weekday: "short" }).format(date),
    day: new Intl.DateTimeFormat("fr-FR", { day: "numeric" }).format(date),
    month: new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(date),
  };
}
