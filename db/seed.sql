-- Sample data for development. Run after schema.sql.
-- Rows are inserted in date order so ids follow the calendar.
-- Stake and general conferences are not sacrament meetings, so their hymns and
-- prayers are empty placeholders ({"number":0,"title":""} and '').
INSERT INTO meetings (
  date, meeting_type, presiding, conducting, announcements,
  opening_hymn, opening_prayer, ward_business, stake_business,
  sacrament_hymn, speakers, closing_hymn, closing_prayer
) VALUES
(
  '2026-03-01', 'regular', 'Bishop Daniel Reyes', 'Brother Adam Smith',
  ARRAY['Ward spring cleanup is Saturday at 9:00 a.m.'],
  '{"number":2,"title":"The Spirit of God"}', 'Sister Olivia Grant',
  '[{"description":"Sustain Brother Adam Smith as first counselor in the bishopric"}]', false,
  '{"number":169,"title":"As Now We Take the Sacrament"}',
  '[{"name":"Sister Hannah Smith","topic":"Faith in Jesus Christ","type":"speaker"},{"name":"Youth choir","topic":"I Am a Child of God","type":"musical-number"},{"name":"Brother Peter Lang","topic":"Daily scripture study","type":"speaker"}]',
  '{"number":85,"title":"How Firm a Foundation"}', 'Brother Isaac Nolan'
),
(
  '2026-05-03', 'testimony', 'Bishop Daniel Reyes', 'Brother Thomas Avery',
  ARRAY['Ward temple night is Thursday, May 14, at 6:30 p.m.'],
  '{"number":3,"title":"Now Let Us Rejoice"}', 'Sister Grace Molina',
  '[{"description":"Sustain Sister Hannah Boyd as Primary teacher"}]', false,
  '{"number":172,"title":"In Humility, Our Savior"}',
  '[]',
  '{"number":136,"title":"I Know That My Redeemer Lives"}', 'Brother Henry Dalton'
),
(
  '2026-10-04', 'general', 'General Authorities', 'General Authorities',
  ARRAY['No ward meetings today. Please watch the General Conference broadcast.'],
  '{"number":0,"title":""}', '',
  '[]', false,
  '{"number":0,"title":""}',
  '[]',
  '{"number":0,"title":""}', ''
),
(
  '2026-10-11', 'regular', 'Bishop Daniel Reyes', 'Brother Samuel Ortiz',
  ARRAY['The ward food drive begins next Sunday.', 'Youth activity is Wednesday at 7:00 p.m.'],
  '{"number":6,"title":"Redeemer of Israel"}', 'Sister Naomi Clarke',
  '[{"description":"Release Brother Peter Lang as ward clerk"},{"description":"Sustain Brother Owen Fisher as ward clerk"}]', false,
  '{"number":193,"title":"I Stand All Amazed"}',
  '[{"name":"Sister Lucy Warren","topic":"Lessons from General Conference","type":"speaker"},{"name":"Ward Choir","topic":"Be Still, My Soul","type":"musical-number"},{"name":"Brother Caleb Warren","topic":"Following living prophets","type":"speaker"}]',
  '{"number":19,"title":"We Thank Thee, O God, for a Prophet"}', 'Sister Ruth Palmer'
),
(
  '2026-10-18', 'stake', 'President Andrew Holt', 'President Andrew Holt',
  ARRAY['No ward meetings today. Stake conference begins at 10:00 a.m. at the stake center.'],
  '{"number":0,"title":""}', '',
  '[]', true,
  '{"number":0,"title":""}',
  '[]',
  '{"number":0,"title":""}', ''
),
(
  '2026-10-25', 'regular', 'Bishop Daniel Reyes', 'Brother Thomas Avery',
  ARRAY['Ward trunk-or-treat is Friday at 6:00 p.m. in the parking lot.'],
  '{"number":85,"title":"How Firm a Foundation"}', 'Sister Ruth Palmer',
  '[{"description":"Sustain Sister Emma Hart as Relief Society secretary"}]', true,
  '{"number":187,"title":"God Loved Us, So He Sent His Son"}',
  '[{"name":"Elias Grant","topic":"Serving a full-time mission","type":"speaker"},{"name":"Sister Clara Bennett","topic":"Finding joy in ministering","type":"speaker"},{"name":"Grant family","topic":"I Am a Child of God","type":"musical-number"},{"name":"Brother Noah Bennett","topic":"The Atonement of Jesus Christ","type":"speaker"}]',
  '{"number":223,"title":"Have I Done Any Good?"}', 'Brother Julian Price'
),
(
  '2026-11-01', 'testimony', 'Bishop Daniel Reyes', 'Bishop Daniel Reyes',
  ARRAY['Fast offerings may be given to any member of the bishopric or online.', 'The ward Christmas dinner committee meets Tuesday at 7:00 p.m.'],
  '{"number":67,"title":"Glory to God on High"}', 'Sister Alice Monroe',
  '[{"description":"Sustain Brother Levi Stone as Sunday School teacher"}]', false,
  '{"number":172,"title":"In Humility, Our Savior"}',
  '[]',
  '{"number":124,"title":"Be Still, My Soul"}', 'Brother Martin Keane'
),
(
  '2026-11-08', 'regular', 'Bishop Daniel Reyes', 'Brother Samuel Ortiz',
  ARRAY['Please sign up to help with the Thanksgiving service project.'],
  '{"number":3,"title":"Now Let Us Rejoice"}', 'Sister Paige Lawson',
  '[]', false,
  '{"number":181,"title":"Jesus of Nazareth, Savior and King"}',
  '[{"name":"Sister Vera Lawson","topic":"Keeping our covenants","type":"speaker"},{"name":"Brother Miles Kerr","topic":"Come, Follow Me","type":"musical-number"},{"name":"Brother Reed Lawson","topic":"Temple blessings for our families","type":"speaker"}]',
  '{"number":239,"title":"Choose the Right"}', 'Sister Dana Kerr'
),
(
  '2026-11-15', 'regular', 'Bishop Daniel Reyes', 'Brother Thomas Avery',
  ARRAY['Tithing declaration appointments begin next week.'],
  '{"number":72,"title":"Praise to the Lord, the Almighty"}', 'Brother Eli Marsh',
  '[{"description":"Sustain Sister Joy Marsh as Young Women adviser"}]', false,
  '{"number":194,"title":"There Is a Green Hill Far Away"}',
  '[{"name":"Anna Whitfield","topic":"Courage to stand as a witness","type":"speaker"},{"name":"Sister Rose Whitfield","topic":"The healing power of prayer","type":"speaker"},{"name":"Primary children","topic":"Did You Think to Pray?","type":"musical-number"},{"name":"Brother Evan Whitfield","topic":"Trusting in the Lord","type":"speaker"}]',
  '{"number":140,"title":"Did You Think to Pray?"}', 'Sister Tess Marsh'
),
(
  '2026-11-22', 'regular', 'Bishop Daniel Reyes', 'Brother Samuel Ortiz',
  ARRAY['The ward Thanksgiving breakfast is Thursday at 8:00 a.m.'],
  '{"number":92,"title":"For the Beauty of the Earth"}', 'Sister Faith Rowan',
  '[]', false,
  '{"number":185,"title":"Reverently and Meekly Now"}',
  '[{"name":"Sister Iris Sloan","topic":"Living with a grateful heart","type":"speaker"},{"name":"Brother Wade Sloan","topic":"Remembering the Lord in all things","type":"speaker"}]',
  '{"number":241,"title":"Count Your Blessings"}', 'Brother Cole Rowan'
),
(
  '2026-11-29', 'regular', 'Bishop Daniel Reyes', 'Brother Thomas Avery',
  ARRAY['Ward Christmas dinner tickets are available in the foyer.'],
  '{"number":30,"title":"Come, Come, Ye Saints"}', 'Sister June Abbott',
  '[{"description":"Release Sister Eve Tanner as Primary president"}]', false,
  '{"number":175,"title":"O God, the Eternal Father"}',
  '[{"name":"Sister Beth Tanner","topic":"Preparing our hearts for Christmas","type":"speaker"},{"name":"Ward Choir","topic":"Abide with Me!","type":"musical-number"},{"name":"Brother Hugh Tanner","topic":"The gift of the Savior","type":"speaker"}]',
  '{"number":152,"title":"God Be with You Till We Meet Again"}', 'Brother Neil Abbott'
),
(
  '2026-12-06', 'testimony', 'Bishop Daniel Reyes', 'Brother Samuel Ortiz',
  ARRAY['Fast offerings may be given to any member of the bishopric or online.'],
  '{"number":6,"title":"Redeemer of Israel"}', 'Sister Mara Quinn',
  '[{"description":"Sustain Sister Eve Tanner as Relief Society teacher"}]', false,
  '{"number":169,"title":"As Now We Take the Sacrament"}',
  '[]',
  '{"number":136,"title":"I Know That My Redeemer Lives"}', 'Brother Simon Quinn'
),
(
  '2026-12-13', 'regular', 'Bishop Daniel Reyes', 'Brother Adam Smith',
  ARRAY['The ward Christmas dinner is Friday at 6:00 p.m. in the cultural hall.'],
  '{"number":2,"title":"The Spirit of God"}', 'Sister Lena Ford',
  '[]', false,
  '{"number":193,"title":"I Stand All Amazed"}',
  '[{"name":"Sister Ada Ford","topic":"Ministering like the Savior","type":"speaker"},{"name":"Brother Jonah Ford","topic":"The light of Christ","type":"speaker"}]',
  '{"number":241,"title":"Count Your Blessings"}', 'Brother Tobias Ford'
),
(
  '2026-12-20', 'regular', 'Bishop Daniel Reyes', 'Brother Thomas Avery',
  ARRAY['There will be no youth activity this week.'],
  '{"number":92,"title":"For the Beauty of the Earth"}', 'Sister Nora Hale',
  '[]', false,
  '{"number":187,"title":"God Loved Us, So He Sent His Son"}',
  '[{"name":"Sister Elise Hale","topic":"The birth of Jesus Christ","type":"speaker"},{"name":"Ward Choir","topic":"Be Still, My Soul","type":"musical-number"},{"name":"Brother Gideon Hale","topic":"Gifts we can give the Savior","type":"speaker"}]',
  '{"number":152,"title":"God Be with You Till We Meet Again"}', 'Brother Ezra Hale'
),
(
  '2026-12-27', 'special', 'Bishop Daniel Reyes', 'Brother Samuel Ortiz',
  ARRAY['Happy New Year from the bishopric.'],
  '{"number":3,"title":"Now Let Us Rejoice"}', 'Sister Wendy Price',
  '[]', false,
  '{"number":185,"title":"Reverently and Meekly Now"}',
  '[{"name":"Primary children","topic":"I Am a Child of God","type":"musical-number"},{"name":"Bishop Daniel Reyes","topic":"Looking forward to the new year","type":"speaker"}]',
  '{"number":30,"title":"Come, Come, Ye Saints"}', 'Brother Owen Fisher'
)
ON CONFLICT (date) DO NOTHING;
