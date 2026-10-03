import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Btn, Badge } from '../components/ui';
import { useStore } from '../store';
import { LIVE } from '../data';
import { C, SEV } from '../theme';

const stamp = () => new Date().toTimeString().slice(0, 8);
const KEYS = [[48, 30], [40, 42], [58, 42], [50, 58], [34, 72], [66, 72]];

export default function Live({ navigation }) {
  const { push } = useStore();
  const [i, setI] = useState(0);
  const [log, setLog] = useState([]);
  const pulse = useRef(new Animated.Value(1)).current;
  const L = LIVE[i];

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 0.25, duration: 700, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
    ])).start();
    const id = setInterval(() => setI((p) => (p + 1) % LIVE.length), 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setLog((p) => [{ t: stamp(), e: L.ev, sev: L.sev }, ...p].slice(0, 6));
    if (L.notify) push({ icon: L.icon, title: L.ev, sev: L.sev, alertId: L.alertId });
  }, [i]);

  const frame = SEV[L.sev === 'ok' ? 'ok' : 'wa'].c;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.dark }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, gap: 10 }}>
        <Pressable onPress={() => navigation.goBack()} accessibilityLabel="Go back"><Ionicons name="chevron-back" size={26} color="#fff" /></Pressable>
        <Text style={{ color: '#fff', fontWeight: '800', fontSize: 18, flex: 1 }}>Buddy</Text>
        <Ionicons name="wifi" size={18} color="#7BE0A8" />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#E5484D', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
          <Animated.View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff', opacity: pulse }} />
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 12 }}>LIVE</Text>
        </View>
      </View>
      <View style={{ height: 260, marginHorizontal: 16, borderRadius: 24, backgroundColor: '#352E55', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Text style={{ fontSize: 120 }}>🐕</Text>
        <View style={{ position: 'absolute', left: '18%', top: '12%', width: '64%', height: '76%', borderWidth: 2, borderColor: frame, borderRadius: 14 }}>
          <Text style={{ position: 'absolute', top: -1, left: -1, backgroundColor: frame, color: '#fff', fontSize: 11, fontWeight: '800', paddingHorizontal: 6, borderBottomRightRadius: 8 }}>Buddy {L.conf}%</Text>
        </View>
        {KEYS.map(([x, y], k) => <View key={k} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFD166' }} />)}
        <View style={{ position: 'absolute', right: 14, bottom: 12, flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          <Ionicons name="locate" size={16} color="#FFD166" /><Text style={{ color: '#FFD166', fontSize: 11 }}>Tail tracked</Text>
        </View>
      </View>
      <ScrollView style={{ marginTop: 14, backgroundColor: C.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28 }} contentContainerStyle={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Text style={{ fontSize: 44 }}>{L.em}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: '800', color: C.ink }}>{L.emo}</Text>
            <Text style={{ color: C.mut }}>Confidence {L.conf}%</Text>
          </View>
          <Badge sev={L.sev} text={L.beh} />
        </View>
        <View style={{ flexDirection: 'row', gap: 8, marginVertical: 14 }}>
          {[['Motion', L.motion], ['Posture', L.posture], ['Sound', L.sound]].map(([k, v]) => (
            <View key={k} style={{ flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 12 }}>
              <Text style={{ color: C.mut, fontSize: 12 }}>{k}</Text>
              <Text style={{ color: C.ink, fontWeight: '800' }}>{v}</Text>
            </View>
          ))}
        </View>
        <Text style={{ fontWeight: '800', fontSize: 17, color: C.ink, marginBottom: 6 }}>Live Timeline</Text>
        {log.map((x, k) => (
          <View key={x.t + k} style={{ flexDirection: 'row', gap: 10, paddingVertical: 6 }}>
            <Ionicons name={SEV[x.sev].icon} size={18} color={SEV[x.sev].c} />
            <Text style={{ color: C.mut, width: 66 }}>{x.t}</Text>
            <Text style={{ color: C.ink, fontWeight: '600' }}>{x.e}</Text>
          </View>
        ))}
        <Btn title="Stop Monitoring" icon="stop-circle" onPress={() => navigation.replace('SessionReport', { done: true })} style={{ marginTop: 14 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
