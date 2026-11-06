import { connection } from 'next/server';
import { notFound, redirect } from 'next/navigation';
import { getMostRecentSunday, getTodayIso } from '@/lib/dates';
import { getMeetingForSunday } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
  await connection();

  const meeting = await getMeetingForSunday(getMostRecentSunday(getTodayIso()));

  if (!meeting) {
    notFound();
  }

  redirect(`/meetings/${meeting.id}`);
}
