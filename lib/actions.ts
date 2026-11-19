'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { isSacramentMeeting } from './meeting-display';
import {
  MEETING_TYPES,
  formDataToValues,
  toLines,
  type MeetingFormState,
} from './meeting-form';
import * as db from './meetings-db';
import type { Hymn, SpeakerItem } from './types';

const HYMNS = ['opening', 'sacrament', 'closing'] as const;
const MAX_TEXT = 'Use 255 characters or fewer.';

function isSunday(isoDate: string): boolean {
  const date = new Date(`${isoDate}T00:00:00Z`);
  // Invalid dates already fail z.iso.date(); don't add a second message.
  return Number.isNaN(date.getTime()) || date.getUTCDay() === 0;
}

/** Parses "Name | Topic" or "Name | Piece | music" into a speaker item. */
function parseSpeakerLine(line: string): SpeakerItem | null {
  const parts = line.split('|').map((part) => part.trim());
  const [name, topic, kind] = parts;
  if (parts.length < 2 || parts.length > 3 || !name || !topic) return null;
  if (kind !== undefined && kind.toLowerCase() !== 'music') return null;
  return { name, topic, type: kind === undefined ? 'speaker' : 'musical-number' };
}

const MeetingFormSchema = z
  .object({
    date: z.iso
      .date('Enter a valid date.')
      .refine(isSunday, 'Sacrament meetings are held on Sundays. Choose a Sunday.'),
    meetingType: z.enum(MEETING_TYPES, 'Choose a meeting type.'),
    presiding: z.string().trim().min(1, 'Enter who is presiding.').max(255, MAX_TEXT),
    conducting: z.string().trim().min(1, 'Enter who is conducting.').max(255, MAX_TEXT),
    announcements: z.string().max(5000, 'Keep announcements under 5,000 characters.'),
    wardBusiness: z.string().max(5000, 'Keep ward business under 5,000 characters.'),
    stakeBusiness: z.string(),
    speakers: z.string().max(5000, 'Keep the speaker list under 5,000 characters.'),
    openingHymnNumber: z.string().trim(),
    openingHymnTitle: z.string().trim().max(255, MAX_TEXT),
    openingPrayer: z.string().trim().max(255, MAX_TEXT),
    sacramentHymnNumber: z.string().trim(),
    sacramentHymnTitle: z.string().trim().max(255, MAX_TEXT),
    closingHymnNumber: z.string().trim(),
    closingHymnTitle: z.string().trim().max(255, MAX_TEXT),
    closingPrayer: z.string().trim().max(255, MAX_TEXT),
  })
  .superRefine((data, ctx) => {
    // Stake and general conferences have no ward program, so hymns and
    // prayers are optional for them and required for every other type.
    const isProgram = isSacramentMeeting(data.meetingType);

    for (const hymn of HYMNS) {
      const number = data[`${hymn}HymnNumber`];
      const title = data[`${hymn}HymnTitle`];
      if (!isProgram && !number && !title) continue;

      if (!/^\d{1,4}$/.test(number) || Number(number) < 1) {
        ctx.addIssue({
          code: 'custom',
          path: [`${hymn}HymnNumber`],
          message: 'Enter a hymn number from 1 to 9999.',
        });
      }
      if (!title) {
        ctx.addIssue({ code: 'custom', path: [`${hymn}HymnTitle`], message: 'Enter the hymn title.' });
      }
    }

    if (isProgram && !data.openingPrayer) {
      ctx.addIssue({ code: 'custom', path: ['openingPrayer'], message: 'Enter who will give the opening prayer.' });
    }
    if (isProgram && !data.closingPrayer) {
      ctx.addIssue({ code: 'custom', path: ['closingPrayer'], message: 'Enter who will give the closing prayer.' });
    }

    toLines(data.speakers).forEach((line, index) => {
      if (!parseSpeakerLine(line)) {
        ctx.addIssue({
          code: 'custom',
          path: ['speakers'],
          message: `Line ${index + 1}: use "Name | Topic", or "Name | Piece | music" for a musical number.`,
        });
      }
    });
  });

type ValidMeetingForm = z.infer<typeof MeetingFormSchema>;

function toHymn(number: string, title: string): Hymn {
  // Optional hymns of stake and general conferences are stored as a placeholder.
  return number ? { number: Number(number), title } : { number: 0, title: '' };
}

function toNewMeeting(data: ValidMeetingForm): db.NewMeeting {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: toLines(data.announcements),
    openingHymn: toHymn(data.openingHymnNumber, data.openingHymnTitle),
    openingPrayer: data.openingPrayer,
    wardBusiness: toLines(data.wardBusiness).map((description) => ({ description })),
    stakeBusiness: data.stakeBusiness === 'on',
    sacramentHymn: toHymn(data.sacramentHymnNumber, data.sacramentHymnTitle),
    speakers: toLines(data.speakers).flatMap((line) => parseSpeakerLine(line) ?? []),
    closingHymn: toHymn(data.closingHymnNumber, data.closingHymnTitle),
    closingPrayer: data.closingPrayer,
  };
}

/** Postgres raises 23505 when the UNIQUE constraint on meetings.date is violated. */
function isDuplicateDate(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === '23505';
}

const DUPLICATE_DATE_STATE = {
  message: 'Please fix the errors below.',
  errors: { date: ['A meeting already exists on this date. Choose another Sunday or edit that meeting.'] },
};

function validationFailed(
  formData: FormData,
): (errors: MeetingFormState['errors']) => MeetingFormState {
  return (errors) => ({
    message: 'Please fix the errors below.',
    errors,
    values: formDataToValues(formData),
  });
}

export async function createMeeting(
  prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const fail = validationFailed(formData);
  const parsed = MeetingFormSchema.safeParse(formDataToValues(formData));
  if (!parsed.success) {
    return fail(z.flattenError(parsed.error).fieldErrors);
  }

  try {
    await db.addMeeting(toNewMeeting(parsed.data));
  } catch (error) {
    if (isDuplicateDate(error)) {
      return { ...DUPLICATE_DATE_STATE, values: formDataToValues(formData) };
    }
    console.error('createMeeting failed:', error);
    throw new Error('Database error: the meeting could not be created. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const fail = validationFailed(formData);
  const parsed = MeetingFormSchema.safeParse(formDataToValues(formData));
  if (!parsed.success) {
    return fail(z.flattenError(parsed.error).fieldErrors);
  }

  let updated: Awaited<ReturnType<typeof db.updateMeeting>>;
  try {
    updated = await db.updateMeeting(id, toNewMeeting(parsed.data));
  } catch (error) {
    if (isDuplicateDate(error)) {
      return { ...DUPLICATE_DATE_STATE, values: formDataToValues(formData) };
    }
    console.error(`updateMeeting(${id}) failed:`, error);
    throw new Error('Database error: the meeting could not be updated. Please try again.');
  }

  if (!updated) {
    return {
      message: 'This meeting no longer exists. It may have been deleted.',
      errors: {},
      values: formDataToValues(formData),
    };
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect(`/meetings/${id}`);
}

export async function deleteMeeting(id: number): Promise<void> {
  // Server Actions are public endpoints, so check the id even though it is bound.
  if (!Number.isInteger(id) || id < 1) {
    throw new Error('Invalid meeting id.');
  }

  try {
    await db.deleteMeeting(id);
  } catch (error) {
    console.error(`deleteMeeting(${id}) failed:`, error);
    throw new Error('Database error: the meeting could not be deleted. Please try again.');
  }

  revalidatePath('/meetings');
}
