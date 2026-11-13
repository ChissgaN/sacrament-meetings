import { neon } from '@neondatabase/serverless';
import type {
  Hymn,
  MeetingType,
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem,
} from './types';

export const MEETINGS_PER_PAGE = 5;

// Created on first use so a missing DATABASE_URL fails with a clear message at
// request time instead of breaking module imports.
let client: ReturnType<typeof neon> | undefined;

function getSql() {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL is not set. Add it to .env.local (see the Vercel Storage tab).');
    }
    client = neon(url);
  }
  return client;
}

interface MeetingRow {
  id: number;
  iso_date: string;
  meeting_type: MeetingType;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: Hymn;
  opening_prayer: string;
  ward_business: WardBusinessItem[] | null;
  stake_business: boolean | null;
  sacrament_hymn: Hymn;
  speakers: SpeakerItem[] | null;
  closing_hymn: Hymn;
  closing_prayer: string;
}

// Every query selects iso_date with to_char() so the date stays a plain
// 'YYYY-MM-DD' string instead of becoming a time-zone-shifted Date object.
function toMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.iso_date,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business ?? false,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

/** Returns meetings newest first, optionally only those on one ISO date. */
export async function getMeetings(date?: string): Promise<SacramentMeeting[]> {
  const sql = getSql();
  const rows = (date === undefined
    ? await sql`
        SELECT *, to_char(date, 'YYYY-MM-DD') AS iso_date
        FROM meetings
        ORDER BY date DESC`
    : await sql`
        SELECT *, to_char(date, 'YYYY-MM-DD') AS iso_date
        FROM meetings
        WHERE date = ${date}
        ORDER BY date DESC`) as MeetingRow[];

  return rows.map(toMeeting);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | undefined> {
  const sql = getSql();
  const rows = (await sql`
    SELECT *, to_char(date, 'YYYY-MM-DD') AS iso_date
    FROM meetings
    WHERE id = ${id}`) as MeetingRow[];

  return rows[0] ? toMeeting(rows[0]) : undefined;
}

/** Returns the meeting on exactly the given ISO date, if one has been entered. */
export async function getMeetingByDate(date: string): Promise<SacramentMeeting | undefined> {
  return (await getMeetings(date))[0];
}

export interface MeetingsPage {
  meetings: SacramentMeeting[];
  page: number;
  totalPages: number;
  totalCount: number;
}

// Escapes LIKE wildcards so a search for "100%" matches that literal text.
function toContainsPattern(text: string): string {
  return `%${text.replace(/[\\%_]/g, (character) => `\\${character}`)}%`;
}

/**
 * Searches presiding, conducting, meeting type, and speaker names, then returns
 * one page of results, newest first. Out-of-range pages are clamped.
 */
export async function getFilteredMeetings(query: string, page: number): Promise<MeetingsPage> {
  const sql = getSql();
  const term = query.trim();
  const pattern = toContainsPattern(term);

  // Values are interpolated through the tagged template, so neon sends them as
  // query parameters, never as part of the SQL text.
  const [{ count: totalCount }] = (await sql`
    SELECT COUNT(*)::int AS count
    FROM meetings
    WHERE ${term} = ''
      OR presiding ILIKE ${pattern}
      OR conducting ILIKE ${pattern}
      OR meeting_type ILIKE ${pattern}
      OR EXISTS (
        SELECT 1 FROM jsonb_array_elements(speakers) AS speaker
        WHERE speaker->>'name' ILIKE ${pattern}
      )`) as { count: number }[];

  const totalPages = Math.max(1, Math.ceil(totalCount / MEETINGS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const offset = (currentPage - 1) * MEETINGS_PER_PAGE;

  const rows = (await sql`
    SELECT *, to_char(date, 'YYYY-MM-DD') AS iso_date
    FROM meetings
    WHERE ${term} = ''
      OR presiding ILIKE ${pattern}
      OR conducting ILIKE ${pattern}
      OR meeting_type ILIKE ${pattern}
      OR EXISTS (
        SELECT 1 FROM jsonb_array_elements(speakers) AS speaker
        WHERE speaker->>'name' ILIKE ${pattern}
      )
    ORDER BY date DESC
    LIMIT ${MEETINGS_PER_PAGE} OFFSET ${offset}`) as MeetingRow[];

  return { meetings: rows.map(toMeeting), page: currentPage, totalPages, totalCount };
}

// Mutations are wired to the database in Week 04, when the forms are built.
export type NewMeeting = Omit<SacramentMeeting, 'id'>;

export async function addMeeting(meeting: NewMeeting): Promise<SacramentMeeting> {
  throw new Error(`addMeeting (${meeting.date}) is not implemented until Week 04.`);
}

export async function updateMeeting(
  id: number,
  changes: Partial<NewMeeting>,
): Promise<SacramentMeeting | undefined> {
  throw new Error(
    `updateMeeting (${id}: ${Object.keys(changes).join(', ')}) is not implemented until Week 04.`,
  );
}

export async function deleteMeeting(id: number): Promise<boolean> {
  throw new Error(`deleteMeeting (${id}) is not implemented until Week 04.`);
}
