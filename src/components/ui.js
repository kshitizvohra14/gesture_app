import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { C, R, SEV, T } from '../theme';

export function Card({ children, style, onPress }) {
  if (!onPress) return <View style={[s.card, style]}>{children}</View>;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.card, style, pressed && { transform: [{ scale: 0.98 }] }]}>
      {children}
    </Pressable>
  );
}

export function Btn({ title, onPress, kind = 'pri', icon, style }) {
  const pri = kind === 'pri';
  return (
    <Pressable onPress={onPress}
      style={({ pressed }) => [s.btn, pri ? { backgroundColor: C.pri } : { backgroundColor: C.priSoft }, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }, style]}>
      {icon && <Ionicons name={icon} size={20} color={pri ? '#fff' : C.pri} />}
      <Text style={{ color: pri ? '#fff' : C.pri, fontWeight: '700', fontSize: 16 }}>{title}</Text>
    </Pressable>
  );
}

export function Badge({ sev, text }) {
  const v = SEV[sev];
  return (
    <View style={[s.badge, { backgroundColor: v.bg }]}>
      <Ionicons name={v.icon} size={14} color={v.c} />
      <Text style={{ color: v.c, fontWeight: '700', fontSize: 12 }}>{text || v.label}</Text>
    </View>
  );
}

export function Chip({ label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={[s.chip, active && { backgroundColor: C.pri, borderColor: C.pri }]}>
      <Text style={{ color: active ? '#fff' : C.ink, fontWeight: '600' }}>{label}</Text>
    </Pressable>
  );
}

export function Bar({ label, pct, color }) {
  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={{ color: C.ink, fontWeight: '600' }}>{label}</Text>
        <Text style={{ color: C.mut }}>{pct}%</Text>
      </View>
      <View style={{ height: 8, borderRadius: 4, backgroundColor: C.line }}>
        <View style={{ height: 8, borderRadius: 4, width: `${pct}%`, backgroundColor: color }} />
      </View>
    </View>
  );
}

export function Empty({ icon, title, text, action, onAction }) {
  return (
    <View style={{ alignItems: 'center', padding: 32 }}>
      <View style={s.emptyIc}><Ionicons name={icon} size={36} color={C.pri} /></View>
      <Text style={[T.h2, { marginTop: 16 }]}>{title}</Text>
      <Text style={[T.body, { textAlign: 'center', marginVertical: 8 }]}>{text}</Text>
      {action && <Btn title={action} onPress={onAction} style={{ alignSelf: 'stretch' }} />}
    </View>
  );
}

export function TopBar({ title, back, right }) {
  const nav = useNavigation();
  return (
    <View style={s.top}>
      {back && (
        <Pressable onPress={() => nav.goBack()} style={s.iconBtn} accessibilityLabel="Go back">
          <Ionicons name="chevron-back" size={22} color={C.ink} />
        </Pressable>
      )}
      <Text style={[T.h2, { flex: 1, fontSize: 22 }]}>{title}</Text>
      {right}
    </View>
  );
}

export function Bell({ count, onPress }) {
  return (
    <Pressable onPress={onPress} style={s.iconBtn} accessibilityLabel="Notifications">
      <Ionicons name="notifications-outline" size={22} color={C.ink} />
      {count > 0 && <View style={s.dot}><Text style={{ color: '#fff', fontSize: 10, fontWeight: '800' }}>{count}</Text></View>}
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: C.card, borderRadius: R.md, padding: 16, marginBottom: 12, shadowColor: '#3a2f60', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  btn: { flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: R.md },
  badge: { flexDirection: 'row', gap: 4, alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  chip: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20, borderWidth: 1, borderColor: C.line, backgroundColor: '#fff', marginRight: 8 },
  emptyIc: { width: 76, height: 76, borderRadius: 38, backgroundColor: C.priSoft, alignItems: 'center', justifyContent: 'center' },
  top: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, paddingVertical: 12 },
  iconBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  dot: { position: 'absolute', top: -2, right: -2, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: C.cr, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
});
