import type { Hymn, SacramentMeeting } from './types';

// Temporary in-memory data. A database replaces this module in later weeks, so
// the query functions are already async.

// Stake and general conferences are not sacrament meetings. The SacramentMeeting
// interface still requires these fields, so those records use empty values.
const NO_HYMN: Hymn = { number: 0, title: '' };

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'testimony',
    presiding: 'Bishop Daniel Reyes',
    conducting: 'Brother Thomas Avery',
    announcements: ['Ward temple night is Thursday, May 14, at 6:30 p.m.'],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Grace Molina',
    wardBusiness: [
      { description: 'Sustain Sister Hannah Boyd as Primary teacher' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    speakers: [],
    closingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
    closingPrayer: 'Brother Isaac Nolan',
  },
  {
    id: 2,
    date: '2026-10-04',
    meetingType: 'general',
    presiding: 'General Authorities',
    conducting: 'General Authorities',
    announcements: [
      'No ward meetings today. Please watch the General Conference broadcast.',
    ],
    openingHymn: NO_HYMN,
    openingPrayer: '',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: NO_HYMN,
    speakers: [],
    closingHymn: NO_HYMN,
    closingPrayer: '',
  },
  {
    id: 3,
    date: '2026-10-11',
    meetingType: 'regular',
    presiding: 'Bishop Daniel Reyes',
    conducting: 'Brother Samuel Ortiz',
    announcements: [
      'The ward food drive begins next Sunday.',
      'Youth activity is Wednesday at 7:00 p.m.',
    ],
    openingHymn: { number: 6, title: 'Redeemer of Israel' },
    openingPrayer: 'Sister Naomi Clarke',
    wardBusiness: [
      { description: 'Release Brother Peter Lang as ward clerk' },
      { description: 'Sustain Brother Owen Fisher as ward clerk' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      { name: 'Sister Lucy Warren', topic: 'Lessons from General Conference', type: 'speaker' },
      { name: 'Ward Choir', topic: 'Be Still, My Soul', type: 'musical-number' },
      { name: 'Brother Caleb Warren', topic: 'Following living prophets', type: 'speaker' },
    ],
    closingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    closingPrayer: 'Brother Henry Dalton',
  },
  {
    id: 4,
    date: '2026-10-18',
    meetingType: 'stake',
    presiding: 'President Andrew Holt',
    conducting: 'President Andrew Holt',
    announcements: [
      'No ward meetings today. Stake conference begins at 10:00 a.m. at the stake center.',
    ],
    openingHymn: NO_HYMN,
    openingPrayer: '',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: NO_HYMN,
    speakers: [],
    closingHymn: NO_HYMN,
    closingPrayer: '',
  },
  {
    id: 5,
    date: '2026-10-25',
    meetingType: 'regular',
    presiding: 'Bishop Daniel Reyes',
    conducting: 'Brother Thomas Avery',
    announcements: ['Ward trunk-or-treat is Friday at 6:00 p.m. in the parking lot.'],
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Sister Ruth Palmer',
    wardBusiness: [
      { description: 'Sustain Sister Emma Hart as Relief Society secretary' },
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 187, title: 'God Loved Us, So He Sent His Son' },
    speakers: [
      { name: 'Elias Grant', topic: 'Serving a full-time mission', type: 'speaker' },
      { name: 'Sister Clara Bennett', topic: 'Finding joy in ministering', type: 'speaker' },
      { name: 'Grant family', topic: 'I Am a Child of God', type: 'musical-number' },
      { name: 'Brother Noah Bennett', topic: 'The Atonement of Jesus Christ', type: 'speaker' },
    ],
    closingHymn: { number: 223, title: 'Have I Done Any Good?' },
    closingPrayer: 'Brother Julian Price',
  },
  {
    id: 6,
    date: '2026-11-01',
    meetingType: 'testimony',
    presiding: 'Bishop Daniel Reyes',
    conducting: 'Bishop Daniel Reyes',
    announcements: [
      'Fast offerings may be given to any member of the bishopric or online.',
      'The ward Christmas dinner committee meets Tuesday at 7:00 p.m.',
    ],
    openingHymn: { number: 67, title: 'Glory to God on High' },
    openingPrayer: 'Sister Alice Monroe',
    wardBusiness: [
      { description: 'Sustain Brother Levi Stone as Sunday School teacher' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
    speakers: [],
    closingHymn: { number: 124, title: 'Be Still, My Soul' },
    closingPrayer: 'Brother Martin Keane',
  },
  {
    id: 7,
    date: '2026-11-08',
    meetingType: 'regular',
    presiding: 'Bishop Daniel Reyes',
    conducting: 'Brother Samuel Ortiz',
    announcements: ['Please sign up to help with the Thanksgiving service project.'],
    openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    openingPrayer: 'Sister Paige Lawson',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [
      { name: 'Sister Vera Lawson', topic: 'Keeping our covenants', type: 'speaker' },
      { name: 'Brother Miles Kerr', topic: 'Come, Follow Me', type: 'musical-number' },
      { name: 'Brother Reed Lawson', topic: 'Temple blessings for our families', type: 'speaker' },
    ],
    closingHymn: { number: 239, title: 'Choose the Right' },
    closingPrayer: 'Sister Dana Kerr',
  },
  {
    id: 8,
    date: '2026-11-15',
    meetingType: 'regular',
    presiding: 'Bishop Daniel Reyes',
    conducting: 'Brother Thomas Avery',
    announcements: ['Tithing declaration appointments begin next week.'],
    openingHymn: { number: 72, title: 'Praise to the Lord, the Almighty' },
    openingPrayer: 'Brother Eli Marsh',
    wardBusiness: [
      { description: 'Sustain Sister Joy Marsh as Young Women adviser' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 194, title: 'There Is a Green Hill Far Away' },
    speakers: [
      { name: 'Anna Whitfield', topic: 'Courage to stand as a witness', type: 'speaker' },
      { name: 'Sister Rose Whitfield', topic: 'The healing power of prayer', type: 'speaker' },
      { name: 'Primary children', topic: 'Did You Think to Pray?', type: 'musical-number' },
      { name: 'Brother Evan Whitfield', topic: 'Trusting in the Lord', type: 'speaker' },
    ],
    closingHymn: { number: 140, title: 'Did You Think to Pray?' },
    closingPrayer: 'Sister Tess Marsh',
  },
  {
    id: 9,
    date: '2026-11-22',
    meetingType: 'regular',
    presiding: 'Bishop Daniel Reyes',
    conducting: 'Brother Samuel Ortiz',
    announcements: ['The ward Thanksgiving breakfast is Thursday at 8:00 a.m.'],
    openingHymn: { number: 92, title: 'For the Beauty of the Earth' },
    openingPrayer: 'Sister Faith Rowan',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
    speakers: [
      { name: 'Sister Iris Sloan', topic: 'Living with a grateful heart', type: 'speaker' },
      { name: 'Brother Wade Sloan', topic: 'Remembering the Lord in all things', type: 'speaker' },
    ],
    closingHymn: { number: 241, title: 'Count Your Blessings' },
    closingPrayer: 'Brother Cole Rowan',
  },
  {
    id: 10,
    date: '2026-11-29',
    meetingType: 'regular',
    presiding: 'Bishop Daniel Reyes',
    conducting: 'Brother Thomas Avery',
    announcements: ['Ward Christmas dinner tickets are available in the foyer.'],
    openingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    openingPrayer: 'Sister June Abbott',
    wardBusiness: [
      { description: 'Release Sister Eve Tanner as Primary president' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 175, title: 'O God, the Eternal Father' },
    speakers: [
      { name: 'Sister Beth Tanner', topic: 'Preparing our hearts for Christmas', type: 'speaker' },
      { name: 'Ward Choir', topic: 'Abide with Me!', type: 'musical-number' },
      { name: 'Brother Hugh Tanner', topic: 'The gift of the Savior', type: 'speaker' },
    ],
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Brother Neil Abbott',
  },
];

/** Returns meetings newest first, optionally only those on one ISO date. */
export async function getMeetings(date?: string): Promise<SacramentMeeting[]> {
  return meetings
    .filter((meeting) => date === undefined || meeting.date === date)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | undefined> {
  return meetings.find((meeting) => meeting.id === id);
}

/**
 * Returns the meeting on the given Sunday. If none has been entered yet, returns
 * the latest meeting before it so /meetings/current always has a destination.
 */
export async function getMeetingForSunday(sunday: string): Promise<SacramentMeeting | undefined> {
  const allMeetings = await getMeetings();
  return allMeetings.find((meeting) => meeting.date <= sunday);
}
