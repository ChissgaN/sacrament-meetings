import type { ReactNode } from 'react';
import { formatLongDate } from '@/lib/dates';
import {
  MEETING_TYPE_LABELS,
  WARD_NAME,
  formatHymn,
  isSacramentMeeting,
} from '@/lib/meeting-display';
import type { SacramentMeeting } from '@/lib/types';

const NOT_APPLICABLE = 'Not applicable';

function ProgramSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-4 break-inside-avoid">
      <h2 className="mb-2 text-lg font-bold text-primary print:text-black">{title}</h2>
      {children}
    </section>
  );
}

function ProgramLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-2">
      <dt className="font-semibold sm:w-44 sm:shrink-0">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function getEmptySpeakersMessage(meeting: SacramentMeeting): string {
  if (meeting.meetingType === 'testimony') return 'Testimonies from members';
  if (!isSacramentMeeting(meeting.meetingType)) return NOT_APPLICABLE;
  return 'No speakers assigned';
}

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
  const announcements = meeting.announcements ?? [];

  return (
    <article className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6 print:rounded-none print:border-0 print:p-0">
      <header className="text-center">
        <p className="font-semibold text-muted print:text-black">{WARD_NAME}</p>
        <h1 className="text-3xl font-bold text-primary print:text-black">
          {MEETING_TYPE_LABELS[meeting.meetingType]}
        </h1>
        <p className="text-lg">{formatLongDate(meeting.date)}</p>
      </header>

      {!isSacramentMeeting(meeting.meetingType) && (
        <p className="rounded bg-accent-soft p-3 text-center font-semibold text-accent print:bg-transparent print:text-black">
          This is not a sacrament meeting. The sacrament is not administered today.
        </p>
      )}

      <ProgramSection title="Leadership">
        <dl className="flex flex-col gap-1">
          <ProgramLine label="Presiding" value={meeting.presiding} />
          <ProgramLine label="Conducting" value={meeting.conducting} />
        </dl>
      </ProgramSection>

      <ProgramSection title="Announcements">
        {announcements.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5">
            {announcements.map((announcement) => (
              <li key={announcement}>{announcement}</li>
            ))}
          </ul>
        ) : (
          <p>No announcements</p>
        )}
      </ProgramSection>

      <ProgramSection title="Opening">
        <dl className="flex flex-col gap-1">
          <ProgramLine label="Opening Hymn" value={formatHymn(meeting.openingHymn)} />
          <ProgramLine
            label="Opening Prayer"
            value={meeting.openingPrayer || NOT_APPLICABLE}
          />
        </dl>
      </ProgramSection>

      <ProgramSection title="Business">
        <dl className="flex flex-col gap-1">
          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-semibold sm:w-44 sm:shrink-0">Ward Business</dt>
            <dd>
              {meeting.wardBusiness.length > 0 ? (
                <ul className="list-disc space-y-1 pl-5">
                  {meeting.wardBusiness.map((item) => (
                    <li key={item.description}>{item.description}</li>
                  ))}
                </ul>
              ) : (
                'None'
              )}
            </dd>
          </div>
          <ProgramLine label="Stake Business" value={meeting.stakeBusiness ? 'Yes' : 'No'} />
        </dl>
      </ProgramSection>

      <ProgramSection title="Sacrament">
        <dl>
          <ProgramLine label="Sacrament Hymn" value={formatHymn(meeting.sacramentHymn)} />
        </dl>
      </ProgramSection>

      <ProgramSection title="Speakers and Musical Numbers">
        {meeting.speakers.length > 0 ? (
          <ol className="flex flex-col gap-2">
            {meeting.speakers.map((item) => (
              <li key={`${item.name}-${item.topic}`}>
                <span className="font-semibold">{item.name}</span>
                {' — '}
                {item.type === 'musical-number'
                  ? `Musical number: ${item.topic}`
                  : item.topic}
              </li>
            ))}
          </ol>
        ) : (
          <p>{getEmptySpeakersMessage(meeting)}</p>
        )}
      </ProgramSection>

      <ProgramSection title="Closing">
        <dl className="flex flex-col gap-1">
          <ProgramLine label="Closing Hymn" value={formatHymn(meeting.closingHymn)} />
          <ProgramLine
            label="Closing Prayer"
            value={meeting.closingPrayer || NOT_APPLICABLE}
          />
        </dl>
      </ProgramSection>
    </article>
  );
}
