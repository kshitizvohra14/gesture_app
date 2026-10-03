import React, { useState } from 'react';
import { FlatList, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Chip, Badge, Empty, TopBar } from '../components/ui';
import { SESSIONS } from '../data';
import { C, R } from '../theme';

const F = ['All', 'Today', 'This Week', 'This Month'];
const ORDER = ['today', 'week', 'month'];

export default function History({ navigation }) {
  const [f, setF] = useState('All');
  const [q, setQ] = useState('');
  const idx = F.indexOf(f) - 1;
  const data = SESSIONS.filter((s) => (f === 'All' || (f === 'Today' ? s.range === 'today' : ORDER.indexOf(s.range) <= idx)) &&
    (s.when + s.emo + s.motion).toLowerCase().includes(q.toLowerCase()));
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title="History" />
      <View style={{ paddingHorizontal: 20 }}>
        <TextInput placeholder="Search sessions" value={q} onChangeText={setQ} style={{ backgroundColor: '#fff', borderRadius: R.sm, padding: 14, fontSize: 16, marginBottom: 12 }} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
          {F.map((x) => <Chip key={x} label={x} active={f === x} onPress={() => setF(x)} />)}
        </ScrollView>
      </View>
      <FlatList data={data} keyExtractor={(s) => String(s.id)} contentContainerStyle={{ padding: 20, paddingTop: 0 }}
        ListEmptyComponent={<Empty icon="time" title="No monitoring sessions yet." text="Sessions you record will show up here." action="Start Monitoring" onAction={() => navigation.navigate('LiveSession')} />}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('SessionReport', {})}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: C.ink, fontWeight: '800', fontSize: 17 }}>Buddy</Text>
              <Text style={{ color: C.mut }}>{item.when} · {item.dur}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 10, alignItems: 'center' }}>
              <Badge sev="inf" text={item.emo} /><Badge sev="inf" text={item.motion} />
              <Badge sev={item.alerts ? 'wa' : 'ok'} text={`${item.alerts} alerts`} />
            </View>
          </Card>
        )} />
    </SafeAreaView>
  );
}
