import type { MeetingType, SacramentMeeting } from './types';

// Shared by the client form and the server actions. lib/actions.ts uses
// 'use server', so it can only export async functions; constants live here.

export const MEETING_TYPES = [
  'regular',
  'testimony',
  'special',
  'stake',
  'general',
] as const satisfies readonly MeetingType[];

export const MEETING_FORM_FIELDS = [
  'date',
  'meetingType',
  'presiding',
  'conducting',
  'announcements',
  'openingHymnNumber',
  'openingHymnTitle',
  'openingPrayer',
  'wardBusiness',
  'stakeBusiness',
  'sacramentHymnNumber',
  'sacramentHymnTitle',
  'speakers',
  'closingHymnNumber',
  'closingHymnTitle',
  'closingPrayer',
] as const;

export type MeetingFormField = (typeof MEETING_FORM_FIELDS)[number];

/** Raw text of every form field, used to refill the form after a failed submit. */
export type MeetingFormValues = Record<MeetingFormField, string>;

export interface MeetingFormState {
  message: string | null;
  errors: Partial<Record<MeetingFormField, string[]>>;
  values: MeetingFormValues | null;
}

/** Splits a textarea into trimmed, non-empty lines. */
export function toLines(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function formDataToValues(formData: FormData): MeetingFormValues {
  const values = {} as MeetingFormValues;
  for (const field of MEETING_FORM_FIELDS) {
    const value = formData.get(field);
    values[field] = typeof value === 'string' ? value : '';
  }
  return values;
}

export function meetingToFormValues(meeting: SacramentMeeting): MeetingFormValues {
  const hymnNumber = (number: number) => (number > 0 ? String(number) : '');

  return {
    date: meeting.date,
    meetingType: meeting.meetingType,
    presiding: meeting.presiding,
    conducting: meeting.conducting,
    announcements: (meeting.announcements ?? []).join('\n'),
    openingHymnNumber: hymnNumber(meeting.openingHymn.number),
    openingHymnTitle: meeting.openingHymn.title,
    openingPrayer: meeting.openingPrayer,
    wardBusiness: meeting.wardBusiness.map((item) => item.description).join('\n'),
    stakeBusiness: meeting.stakeBusiness ? 'on' : '',
    sacramentHymnNumber: hymnNumber(meeting.sacramentHymn.number),
    sacramentHymnTitle: meeting.sacramentHymn.title,
    speakers: meeting.speakers
      .map((item) =>
        item.type === 'musical-number'
          ? `${item.name} | ${item.topic} | music`
          : `${item.name} | ${item.topic}`,
      )
      .join('\n'),
    closingHymnNumber: hymnNumber(meeting.closingHymn.number),
    closingHymnTitle: meeting.closingHymn.title,
    closingPrayer: meeting.closingPrayer,
  };
}
