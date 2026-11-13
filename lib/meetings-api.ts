import { connection } from 'next/server';
import { headers } from 'next/headers';
import type { SacramentMeeting } from './types';

// Server Components need an absolute URL to call this app's own API routes.
async function getBaseUrl(): Promise<string> {
  await connection();

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  const requestHeaders = await headers();
  return `http://${requestHeaders.get('host') ?? 'localhost:3000'}`;
}

export async function fetchMeetings(): Promise<SacramentMeeting[]> {
  const response = await fetch(`${await getBaseUrl()}/api/meetings`);

  if (!response.ok) {
    throw new Error(`Failed to load meetings (status ${response.status})`);
  }

  return (await response.json()) as SacramentMeeting[];
}

/** Returns null when the id is invalid (400) or no meeting has it (404). */
export async function fetchMeetingById(id: string): Promise<SacramentMeeting | null> {
  const response = await fetch(
    `${await getBaseUrl()}/api/meetings/${encodeURIComponent(id)}`,
  );

  if (response.status === 400 || response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load meeting ${id} (status ${response.status})`);
  }

  return (await response.json()) as SacramentMeeting;
}
