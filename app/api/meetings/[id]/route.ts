import { NextResponse, type NextRequest } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';
import type { ApiError, SacramentMeeting } from '@/lib/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/meetings/[id]
export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse<SacramentMeeting | ApiError>> {
  const { id } = await params;

  // Number() alone would accept values such as '', '1e3' and '0x10'.
  if (!/^\d+$/.test(id)) {
    return NextResponse.json(
      { error: 'The meeting id must be a valid number.' },
      { status: 400 },
    );
  }

  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    return NextResponse.json(
      { error: `No meeting found with id ${id}.` },
      { status: 404 },
    );
  }

  return NextResponse.json(meeting);
}
