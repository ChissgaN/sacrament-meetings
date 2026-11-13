import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <div className="flex flex-col items-start gap-3">
      <h1 className="text-3xl font-bold text-primary">Meeting not found</h1>
      <p>We couldn&apos;t find a meeting at this address.</p>
      <Link href="/meetings" className="font-semibold text-primary underline underline-offset-2">
        Back to all meetings
      </Link>
    </div>
  );
}
