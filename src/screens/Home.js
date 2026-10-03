import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Btn, Bell, Badge } from '../components/ui';
import { useStore } from '../store';
import { PETS, LIVE, ACTIVITY, ALERTS } from '../data';
import { C, T } from '../theme';

export default function Home({ navigation }) {
  const { unread } = useStore();
  const [p, setP] = useState(0);
  const pet = PETS[p];
  const cur = LIVE[1];
  const stats = [['Emotion', `${cur.em} ${cur.emo}`, `${cur.conf}%`], ['Motion', '🚶 ' + cur.motion, ''], ['Posture', cur.posture, ''], ['Sound', cur.sound, '']];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: C.mut }}>Good evening 👋</Text>
            <Text style={T.h1}>Paw Fusion</Text>
          </View>
          <Bell count={unread} onPress={() => navigation.navigate('Notifications')} />
        </View>
        <Card onPress={() => setP((p + 1) % PETS.length)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: C.priSoft, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 28 }}>🐕</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={T.h2}>{pet.name}</Text>
            <Text style={{ color: C.mut }}>{pet.breed}</Text>
          </View>
          <Badge sev="ok" text="Active" />
        </Card>
        <View style={{ backgroundColor: C.dark, borderRadius: 28, padding: 20, marginBottom: 12 }}>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800' }}>Ready to monitor {pet.name}?</Text>
          <View style={{ height: 110, borderRadius: 18, backgroundColor: '#352E55', alignItems: 'center', justifyContent: 'center', marginVertical: 14 }}>
            <Text style={{ fontSize: 64 }}>🐕</Text>
          </View>
          <Btn title="Start Live Monitoring" icon="videocam" onPress={() => navigation.navigate('LiveSession')} />
        </View>
        <Text style={[T.h2, { marginVertical: 8 }]}>Current Status</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {stats.map(([k, v, c]) => (
            <Card key={k} style={{ width: '48%', marginBottom: 0 }}>
              <Text style={{ color: C.mut, fontSize: 13 }}>{k}</Text>
              <Text style={{ color: C.ink, fontWeight: '800', fontSize: 17, marginTop: 4 }}>{v}</Text>
              {c ? <Text style={{ color: C.ok, fontWeight: '700' }}>{c}</Text> : null}
            </Card>
          ))}
        </View>
        <Card onPress={() => navigation.navigate('AlertDetail', { id: 1 })} style={{ marginTop: 16, borderWidth: 1, borderColor: C.waBg }}>
          <Badge sev="wa" text="Attention Needed" />
          <Text style={[T.h2, { marginTop: 8 }]}>{ALERTS[0].title}</Text>
          <Text style={T.body}>{ALERTS[0].msg}</Text>
          <Text style={{ color: C.mut, fontSize: 12, marginVertical: 8 }}>AI observation — not a veterinary diagnosis.</Text>
          <Btn kind="sec" title="Review Alert" onPress={() => navigation.navigate('AlertDetail', { id: 1 })} />
        </Card>
        <Text style={[T.h2, { marginVertical: 8 }]}>Recent Activity</Text>
        <Card>
          {ACTIVITY.map((a, i) => (
            <View key={a.t} style={{ flexDirection: 'row', gap: 12, paddingVertical: 8, borderTopWidth: i ? 1 : 0, borderTopColor: C.line }}>
              <Text style={{ color: C.mut, width: 70 }}>{a.t}</Text>
              <Text style={{ color: C.ink, fontWeight: '600', flex: 1 }}>{a.e}</Text>
            </View>
          ))}
        </Card>
        <Pressable onPress={() => navigation.navigate('History')}><Text style={{ color: C.pri, fontWeight: '700', textAlign: 'center', padding: 8 }}>View All Activity</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
