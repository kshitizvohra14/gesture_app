import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, Btn, Badge, TopBar } from '../components/ui';
import { ALERTS } from '../data';
import { C, SEV, T } from '../theme';

export default function AlertDetail({ navigation, route }) {
  const a = ALERTS.find((x) => x.id === route.params?.id) || ALERTS[0];
  const v = SEV[a.sev];
  const rows = [['Motion', a.motion], ['Posture', a.posture], ['Pose', a.pose], ['Confidence', `${a.conf}%`]];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title="Alert" back />
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 4 }}>
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <View style={{ width: 88, height: 88, borderRadius: 44, backgroundColor: v.bg, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={v.icon} size={44} color={v.c} />
          </View>
          <Text style={[T.h1, { fontSize: 24, textAlign: 'center', marginVertical: 10 }]}>{a.title}</Text>
          <Badge sev={a.sev} text={a.sev === 'wa' ? 'Worth watching' : v.label} />
          <Text style={{ color: C.mut, marginTop: 8 }}>Buddy · Detected {a.time} · Session 18m 42s</Text>
        </View>
        <Card>
          <Text style={[T.h2, { fontSize: 17 }]}>What was observed?</Text>
          <Text style={[T.body, { marginTop: 4 }]}>{a.msg}</Text>
        </Card>
        <Card>
          <Text style={[T.h2, { fontSize: 17, marginBottom: 6 }]}>Supporting signals</Text>
          {rows.map(([k, val]) => (
            <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 }}>
              <Text style={{ color: C.mut }}>{k}</Text><Text style={{ color: C.ink, fontWeight: '700' }}>{val}</Text>
            </View>
          ))}
        </Card>
        <Card style={{ backgroundColor: C.infBg }}>
          <Text style={{ fontWeight: '800', color: C.ink }}>Important</Text>
          <Text style={[T.body, { marginTop: 4 }]}>This is an AI-generated observation and is not a veterinary diagnosis. Persistent or concerning symptoms should be evaluated by a veterinarian.</Text>
        </Card>
        <Btn title="View Session" onPress={() => navigation.navigate('SessionReport', {})} />
      </ScrollView>
    </SafeAreaView>
  );
}
