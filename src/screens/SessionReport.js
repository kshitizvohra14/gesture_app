import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Btn, Bar, TopBar, Badge } from '../components/ui';
import { REPORT } from '../data';
import { C, T } from '../theme';

export default function SessionReport({ navigation, route }) {
  const done = route.params?.done;
  const close = () => navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  const groups = [['Emotion', REPORT.emotion], ['Motion', REPORT.motion], ['Posture', REPORT.posture], ['Vocalization', REPORT.sound]];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title={done ? 'Session Complete' : 'Session Report'} back={!done} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 4 }}>
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Text style={{ fontSize: 40 }}>🐕</Text>
          <View style={{ flex: 1 }}>
            <Text style={T.h2}>Buddy</Text>
            <Text style={{ color: C.mut }}>Duration 18m 42s</Text>
          </View>
          <Badge sev="wa" text="2 alerts" />
        </Card>
        {groups.map(([t, rows]) => (
          <Card key={t}>
            <Text style={[T.h2, { fontSize: 17, marginBottom: 10 }]}>{t}</Text>
            {rows.map(([l, p, c]) => <Bar key={l} label={l} pct={p} color={c} />)}
          </Card>
        ))}
        <Card>
          <Text style={[T.h2, { fontSize: 17, marginBottom: 6 }]}>Timeline</Text>
          {[['10:28', 'Relaxed'], ['10:33', 'Walking'], ['10:39', 'Barking'], ['10:42', 'Possible limping']].map(([t, e]) => (
            <View key={t} style={{ flexDirection: 'row', gap: 12, paddingVertical: 5 }}>
              <Text style={{ color: C.mut, width: 50 }}>{t}</Text><Text style={{ color: C.ink, fontWeight: '600' }}>{e}</Text>
            </View>
          ))}
        </Card>
        {done ? (
          <>
            <Btn title="View Detailed Report" onPress={() => navigation.replace('SessionReport', {})} />
            <Btn kind="sec" title="Save Session" onPress={close} style={{ marginTop: 10 }} />
          </>
        ) : <Btn kind="sec" title="Back to History" onPress={() => navigation.goBack()} />}
      </ScrollView>
    </SafeAreaView>
  );
}
