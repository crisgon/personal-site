export function formatDate(date: Date, monthFormat: "long" | "short") {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: monthFormat,
    day: "numeric",
  }).format(new Date(date));
}
