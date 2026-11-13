import type { Metadata } from 'next';
import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import { getMostRecentSunday, getTodayIso } from '@/lib/dates';
import { getFilteredMeetings, MEETINGS_PER_PAGE } from '@/lib/meetings-db';
import { parsePage } from '@/lib/pagination';

export const metadata: Metadata = {
  title: 'Meetings',
};

interface MeetingsPageProps {
  searchParams: Promise<{ query?: string | string[]; page?: string | string[] }>;
}

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const params = await searchParams;
  const query = (Array.isArray(params.query) ? params.query[0] : params.query ?? '').trim();
  const { meetings, page, totalPages, totalCount } = await getFilteredMeetings(
    query,
    parsePage(params.page),
  );
  const currentSunday = getMostRecentSunday(getTodayIso());
  const firstShown = (page - 1) * MEETINGS_PER_PAGE + 1;
  const lastShown = firstShown + meetings.length - 1;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-primary">Meetings</h1>
      <MeetingSearch />

      <p role="status" className="text-muted">
        {totalCount === 0
          ? query
            ? `No meetings match "${query}".`
            : 'No meetings have been added yet.'
          : `Showing ${firstShown}–${lastShown} of ${totalCount} ${
              totalCount === 1 ? 'meeting' : 'meetings'
            }${query ? ` matching "${query}"` : ''}.`}
      </p>

      {meetings.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2">
          {meetings.map((meeting) => (
            <li key={meeting.id}>
              <MeetingCard
                meeting={meeting}
                isCurrent={meeting.date === currentSunday}
                isUpcoming={meeting.date > currentSunday}
              />
            </li>
          ))}
        </ul>
      )}

      <Pagination totalPages={totalPages} />
    </div>
  );
}
