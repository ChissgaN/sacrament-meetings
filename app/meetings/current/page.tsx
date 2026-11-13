import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { getMostRecentSunday, getTodayIso } from '@/lib/dates';
import { getMeetingByDate } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
  await connection();

  const meeting = await getMeetingByDate(getMostRecentSunday(getTodayIso()));

  // Only an exact match counts. If this Sunday has no meeting yet, send the user
  // to the list instead of showing an older meeting by mistake.
  redirect(meeting ? `/meetings/${meeting.id}` : '/meetings');
}
