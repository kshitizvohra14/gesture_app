export const PETS = [{ name: 'Buddy', breed: 'Golden Retriever' }, { name: 'Luna', breed: 'Border Collie' }];
export const LIVE = [
  { em: '🙂', emo: 'Relaxed', conf: 82, motion: 'Still', posture: 'Lying', sound: 'Quiet', beh: 'Resting calmly', ev: 'Resting detected', sev: 'ok' },
  { em: '😄', emo: 'Happy', conf: 79, motion: 'Walking', posture: 'Standing', sound: 'Quiet', beh: 'Relaxed walking', ev: 'Walking detected', sev: 'ok' },
  { em: '👀', emo: 'Alert', conf: 86, motion: 'Running', posture: 'Standing', sound: 'Barking', beh: 'Excited barking', ev: 'Barking detected', sev: 'wa', notify: true, icon: 'volume-high' },
  { em: '😔', emo: 'Sad', conf: 68, motion: 'Still', posture: 'Lying', sound: 'Whimpering', beh: 'Low mood', ev: 'Whimpering detected', sev: 'inf' },
  { em: '🙂', emo: 'Relaxed', conf: 74, motion: 'Walking', posture: 'Standing', sound: 'Quiet', beh: 'Uneven gait', ev: 'Possible limping detected', sev: 'wa', notify: true, icon: 'warning', alertId: 1 },
];
export const ALERTS = [
  { id: 1, title: 'Possible limping detected', sev: 'wa', time: '10:42 PM', msg: 'An unusual gait pattern was observed.', unread: true, conf: 74, motion: 'Walking', posture: 'Standing', pose: 'Uneven movement pattern' },
  { id: 2, title: 'Prolonged stillness', sev: 'wa', time: '9:12 PM', msg: 'No movement detected for a sustained period.', unread: true, conf: 81, motion: 'Still', posture: 'Lying', pose: 'No change in position' },
  { id: 3, title: 'Low tail carriage', sev: 'inf', time: '8:41 PM', msg: 'A low tail position was observed.', unread: false, conf: 66, motion: 'Walking', posture: 'Standing', pose: 'Tail lowered' },
];
export const NOTIFS = [
  { id: 1, icon: 'warning', title: 'Possible limping detected', sub: 'Buddy · 2 minutes ago', sev: 'wa', alertId: 1, read: false },
  { id: 2, icon: 'walk', title: 'Buddy started running', sub: 'Buddy · 12 minutes ago', sev: 'inf', read: false },
  { id: 3, icon: 'volume-high', title: 'Barking detected', sub: 'Buddy · 21 minutes ago', sev: 'wa', read: false },
  { id: 4, icon: 'checkmark-circle', title: 'Monitoring session completed', sub: 'Buddy · 1 hour ago', sev: 'ok', read: true },
];
export const SESSIONS = [
  { id: 1, when: 'Today', dur: '18 min', emo: 'Relaxed', motion: 'Walking', alerts: 2, range: 'today' },
  { id: 2, when: 'Yesterday', dur: '32 min', emo: 'Happy', motion: 'Running', alerts: 0, range: 'week' },
  { id: 3, when: 'Sep 12', dur: '12 min', emo: 'Relaxed', motion: 'Still', alerts: 1, range: 'month' },
];
export const ACTIVITY = [
  { t: '10:42 PM', e: 'Relaxed → Walking' }, { t: '10:39 PM', e: 'Barking detected' },
  { t: '10:31 PM', e: 'Resting' }, { t: '10:15 PM', e: 'Possible low tail carriage' },
];
export const REPORT = {
  emotion: [['Relaxed', 72, '#1F8A55'], ['Happy', 18, '#5B50E0'], ['Alert', 10, '#A86A00']],
  motion: [['Walking', 45, '#5B50E0'], ['Running', 25, '#A86A00'], ['Still', 30, '#556270']],
  posture: [['Standing', 61, '#5B50E0'], ['Lying', 29, '#556270'], ['Sitting', 10, '#1F8A55']],
  sound: [['Quiet', 76, '#1F8A55'], ['Barking', 18, '#A86A00'], ['Whimpering', 6, '#556270']],
};
