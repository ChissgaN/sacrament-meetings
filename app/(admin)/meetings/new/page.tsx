import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Meeting',
};

export default function NewMeetingPage() {
  return (
    <h1 className="text-3xl font-bold text-primary">Create Meeting — Coming in Week 04</h1>
  );
}
