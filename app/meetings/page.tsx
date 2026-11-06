import type { Metadata } from 'next';
import MeetingCard from '@/components/MeetingCard';
import { getMostRecentSunday, getTodayIso } from '@/lib/dates';
import { fetchMeetings } from '@/lib/meetings-api';
import type { SacramentMeeting } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Meetings',
};

interface MeetingGroupProps {
  title: string;
  meetings: SacramentMeeting[];
  currentSunday: string;
}

function MeetingGroup({ title, meetings, currentSunday }: MeetingGroupProps) {
  if (meetings.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">{title}</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {meetings.map((meeting) => (
          <li key={meeting.id}>
            <MeetingCard meeting={meeting} isCurrent={meeting.date === currentSunday} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();
  const currentSunday = getMostRecentSunday(getTodayIso());

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-primary">Meetings</h1>
      <MeetingGroup
        title="Current and past weeks"
        meetings={meetings.filter((meeting) => meeting.date <= currentSunday)}
        currentSunday={currentSunday}
      />
      <MeetingGroup
        title="Upcoming weeks"
        meetings={meetings.filter((meeting) => meeting.date > currentSunday).reverse()}
        currentSunday={currentSunday}
      />
    </div>
  );
}
