import { NextResponse, type NextRequest } from 'next/server';
import { isValidIsoDate } from '@/lib/dates';
import { getMeetings } from '@/lib/meetings-db';
import type { ApiError, SacramentMeeting } from '@/lib/types';

// GET /api/meetings
// GET /api/meetings?date=2026-05-03
export async function GET(
  request: NextRequest,
): Promise<NextResponse<SacramentMeeting[] | ApiError>> {
  const date = request.nextUrl.searchParams.get('date');

  if (date !== null && !isValidIsoDate(date)) {
    return NextResponse.json(
      { error: 'The date parameter must be a valid date in YYYY-MM-DD format.' },
      { status: 400 },
    );
  }

  return NextResponse.json(await getMeetings(date ?? undefined));
}
