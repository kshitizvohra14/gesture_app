export const C = {
  bg: '#F7F5F1', card: '#FFFFFF', ink: '#1E1B2E', mut: '#6F6B7D', line: '#ECE8E0',
  pri: '#5B50E0', priSoft: '#ECEAFC', dark: '#241F3A',
  ok: '#1F8A55', okBg: '#E2F5EA', wa: '#A86A00', waBg: '#FFF1D1',
  cr: '#C93636', crBg: '#FDE3E3', inf: '#556270', infBg: '#E8ECF0',
};
export const R = { sm: 12, md: 20, lg: 28 };
export const SEV = {
  ok: { c: C.ok, bg: C.okBg, icon: 'checkmark-circle', label: 'Normal' },
  wa: { c: C.wa, bg: C.waBg, icon: 'warning', label: 'Watch' },
  cr: { c: C.cr, bg: C.crBg, icon: 'alert-circle', label: 'Critical' },
  inf: { c: C.inf, bg: C.infBg, icon: 'information-circle', label: 'Info' },
};
export const T = { h1: { fontSize: 30, fontWeight: '800', color: C.ink }, h2: { fontSize: 20, fontWeight: '700', color: C.ink }, body: { fontSize: 15, color: C.mut, lineHeight: 21 } };
