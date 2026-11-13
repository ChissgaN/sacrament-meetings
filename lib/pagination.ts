/** Reads a page number from a URL value; anything invalid becomes page 1. */
export function parsePage(value: string | string[] | null | undefined): number {
  const text = Array.isArray(value) ? value[0] : value;
  const page = Number(text);
  return Number.isInteger(page) && page > 0 ? page : 1;
}
