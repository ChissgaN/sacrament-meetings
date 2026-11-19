import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { formatLongDate } from '@/lib/dates';
import { getMeetingById } from '@/lib/meetings-db';

export const metadata: Metadata = {
  title: 'Edit Meeting',
};

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id } = await params;

  // A non-numeric id can never match, so skip the query.
  const meeting = /^\d+$/.test(id) ? await getMeetingById(Number(id)) : undefined;
  if (!meeting) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Edit Meeting</h1>
        <p className="text-lg">{formatLongDate(meeting.date)}</p>
      </div>
      <MeetingForm
        action={updateMeeting.bind(null, meeting.id)}
        meeting={meeting}
        submitLabel="Save changes"
        cancelHref={`/meetings/${meeting.id}`}
      />
    </div>
  );
}
