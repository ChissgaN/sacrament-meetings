import Link from 'next/link';
import { formatLongDate } from '@/lib/dates';
import { MEETING_TYPE_LABELS, isSacramentMeeting } from '@/lib/meeting-display';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
  isCurrent?: boolean;
  isUpcoming?: boolean;
}

export default function MeetingCard({
  meeting,
  isCurrent = false,
  isUpcoming = false,
}: MeetingCardProps) {
  const speakerCount = meeting.speakers.filter(
    (item) => item.type === 'speaker',
  ).length;

  return (
    <article className="relative flex h-full flex-col gap-2 rounded-lg border border-border bg-surface p-4 shadow-sm transition-shadow focus-within:shadow-md hover:shadow-md">
      <div className="flex flex-wrap gap-2 text-sm font-semibold">
        <span className="rounded bg-primary-soft px-2 py-1 text-primary">
          {MEETING_TYPE_LABELS[meeting.meetingType]}
        </span>
        {isCurrent && (
          <span className="rounded bg-accent-soft px-2 py-1 text-accent">
            This Sunday
          </span>
        )}
        {isUpcoming && (
          <span className="rounded bg-surface px-2 py-1 text-muted ring-1 ring-border">
            Upcoming
          </span>
        )}
      </div>
      <h2 className="text-xl font-bold">
        {/* The ::after overlay makes the whole card clickable with a single tab stop. */}
        <Link
          href={`/meetings/${meeting.id}`}
          className="text-primary underline-offset-2 after:absolute after:inset-0 hover:underline"
        >
          {formatLongDate(meeting.date)}
        </Link>
      </h2>
      {isSacramentMeeting(meeting.meetingType) ? (
        <p className="text-muted">
          Conducting: {meeting.conducting}
          <br />
          {meeting.meetingType === 'testimony'
            ? 'Testimonies from members'
            : `${speakerCount} ${speakerCount === 1 ? 'speaker' : 'speakers'}`}
        </p>
      ) : (
        <p className="text-muted">No sacrament meeting this week</p>
      )}
    </article>
  );
}
