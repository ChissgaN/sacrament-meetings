import type { Metadata } from 'next';
import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export const metadata: Metadata = {
  title: 'Create Meeting',
};

export default function NewMeetingPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-primary">Create Meeting</h1>
      <MeetingForm action={createMeeting} submitLabel="Create meeting" cancelHref="/meetings" />
    </div>
  );
}
