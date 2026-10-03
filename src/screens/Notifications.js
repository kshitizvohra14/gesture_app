import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, Empty, TopBar } from '../components/ui';
import { useStore } from '../store';
import { C, SEV } from '../theme';

export default function Notifications({ navigation }) {
  const { notifs, markRead, markAll } = useStore();
  const open = (n) => {
    markRead(n.id);
    navigation.navigate('AlertDetail', { id: n.alertId || 1 });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title="Notifications" back right={<Pressable onPress={markAll}><Text style={{ color: C.pri, fontWeight: '700' }}>Mark all as read</Text></Pressable>} />
      <FlatList data={notifs} keyExtractor={(n) => String(n.id)} contentContainerStyle={{ padding: 20, paddingTop: 4 }}
        ListEmptyComponent={<Empty icon="checkmark-done" title="You're all caught up." text="New alerts will appear here." />}
        renderItem={({ item }) => (
          <Card onPress={() => open(item)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: item.read ? '#fff' : '#F3F1FF' }}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: SEV[item.sev].bg, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={item.icon} size={22} color={SEV[item.sev].c} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: C.ink, fontWeight: item.read ? '600' : '800' }}>{item.title}</Text>
              <Text style={{ color: C.mut }}>{item.sub}</Text>
            </View>
            {!item.read && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: C.pri }} />}
          </Card>
        )} />
    </SafeAreaView>
  );
}
