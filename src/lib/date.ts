export function formatDate(date: Date, monthFormat: "long" | "short") {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: monthFormat,
    day: "numeric",
  }).format(new Date(date));
}

export function getDiffDate(date: string) {
  const now = new Date();
  const lastDate = new Date(date);

  const diff = now.getTime() - lastDate.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (diff <= 0) return "agora mesmo";

  if (diffMinutes < 1) {
    return `${diffSeconds} segundos atrás`;
  }

  if (diffHours < 1) {
    return `${diffMinutes} minutos atrás`;
  }

  if (diffDays < 1) {
    return `${diffHours} horas atrás`;
  }

  return `${diffDays} ${diffDays === 1 ? "dia" : "dias"} atrás`;
}
