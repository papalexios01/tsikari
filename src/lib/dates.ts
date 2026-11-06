const MS_PER_DAY = 86_400_000;
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export function dateToEpochDay(value: string): number | null {
  const match = DATE_PATTERN.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const timestamp = Date.UTC(year, month - 1, day);
  const parsed = new Date(timestamp);
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() + 1 !== month ||
    parsed.getUTCDate() !== day
  )
    return null;
  return timestamp / MS_PER_DAY;
}

export function todayLocal(now: Date = new Date()): string {
  const year = String(now.getFullYear()).padStart(4, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function nextDay(value: string): string {
  const day = dateToEpochDay(value);
  return day === null ? "" : new Date((day + 1) * MS_PER_DAY).toISOString().slice(0, 10);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const start = dateToEpochDay(checkIn);
  const end = dateToEpochDay(checkOut);
  return start !== null && end !== null && end > start ? end - start : 0;
}
