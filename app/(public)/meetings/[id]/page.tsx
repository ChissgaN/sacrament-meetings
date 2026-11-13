import { notFound } from 'next/navigation';
import Link from 'next/link';
import MeetingDetail from '@/components/MeetingDetail';
import PrintButton from '@/components/PrintButton';
import { fetchMeetingById } from '@/lib/meetings-api';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meeting = await fetchMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/meetings" className="font-semibold text-primary underline underline-offset-2">
          Back to all meetings
        </Link>
        <PrintButton />
      </div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
