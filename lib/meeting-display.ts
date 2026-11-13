import type { Hymn, MeetingType } from './types';

export const WARD_NAME = 'Maple Grove Ward';

export const MEETING_TYPE_LABELS: Record<MeetingType, string> = {
  testimony: 'Testimony meeting',
  regular: 'Sacrament meeting',
  stake: 'Stake conference',
  general: 'General conference',
  special: 'Special meeting',
};

export function isSacramentMeeting(meetingType: MeetingType): boolean {
  return meetingType !== 'stake' && meetingType !== 'general';
}

export function formatHymn(hymn: Hymn): string {
  return hymn.number > 0 ? `#${hymn.number} ${hymn.title}` : 'Not applicable';
}
