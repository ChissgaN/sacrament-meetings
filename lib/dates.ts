// The server may run in UTC (as on Vercel), so "today" is always calculated in
// the ward's time zone. Otherwise the current Sunday would change hours early.
export const WARD_TIME_ZONE = 'America/Denver';

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function toUtcDate(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00Z`);
}

export function isValidIsoDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) return false;
  const parsed = toUtcDate(value);
  // Rejects dates that roll over, such as 2026-02-31.
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value);
}

export function getTodayIso(now: Date = new Date()): string {
  // The en-CA locale formats dates as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: WARD_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/** Returns the given date if it is a Sunday, otherwise the Sunday before it. */
export function getMostRecentSunday(isoDate: string): string {
  const date = toUtcDate(isoDate);
  date.setUTCDate(date.getUTCDate() - date.getUTCDay());
  return date.toISOString().slice(0, 10);
}

export function formatLongDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(toUtcDate(isoDate));
}
