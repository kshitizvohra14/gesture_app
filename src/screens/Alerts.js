import React, { useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Chip, Badge, Empty, TopBar } from '../components/ui';
import { ALERTS } from '../data';
import { C } from '../theme';

const F = { All: null, Critical: 'cr', Watch: 'wa', Info: 'inf' };

export default function Alerts({ navigation }) {
  const [f, setF] = useState('All');
  const data = ALERTS.filter((a) => !F[f] || a.sev === F[f]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title="Alerts" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, paddingHorizontal: 20, marginBottom: 12 }}>
        {Object.keys(F).map((x) => <Chip key={x} label={x} active={f === x} onPress={() => setF(x)} />)}
      </ScrollView>
      <FlatList data={data} keyExtractor={(a) => String(a.id)} contentContainerStyle={{ padding: 20, paddingTop: 0 }}
        ListEmptyComponent={<Empty icon="moon" title="Everything looks quiet." text="No alerts have been recorded." />}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('AlertDetail', { id: item.id })}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Badge sev={item.sev} />
              {item.unread && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: C.pri }} />}
            </View>
            <Text style={{ color: C.ink, fontWeight: '800', fontSize: 17, marginTop: 8 }}>{item.title}</Text>
            <Text style={{ color: C.mut, marginVertical: 2 }}>Buddy · {item.time}</Text>
            <Text style={{ color: C.ink }}>{item.msg}</Text>
          </Card>
        )} />
    </SafeAreaView>
  );
}
