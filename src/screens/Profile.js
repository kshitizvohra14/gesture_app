import React, { useState } from 'react';
import { Modal, ScrollView, Switch, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, Btn, TopBar } from '../components/ui';
import { C, T } from '../theme';

const PREFS = ['Possible limping', 'Prolonged stillness', 'Low tail carriage', 'Behavior changes', 'Session completed', 'Daily summary', 'Quiet hours (10 PM – 7 AM)'];
const ROWS = [['paw', 'My Pets'], ['lock-closed', 'Privacy'], ['settings', 'App Settings'], ['help-circle', 'Help & Support'], ['document-text', 'Terms & Privacy']];

export default function Profile({ navigation }) {
  const [on, setOn] = useState({ 0: true, 1: true, 2: false, 3: true, 4: true, 5: false, 6: false });
  const [modal, setModal] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <TopBar title="Profile" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 4 }}>
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: C.priSoft, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="person" size={30} color={C.pri} />
          </View>
          <View>
            <Text style={T.h2}>Kshitiz</Text>
            <Text style={{ color: C.mut }}>user@email.com</Text>
          </View>
        </Card>
        <Text style={[T.h2, { fontSize: 17, marginVertical: 8 }]}>Notifications</Text>
        <Card>
          {PREFS.map((p, i) => (
            <View key={p} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>
              <Text style={{ flex: 1, color: C.ink, fontWeight: '600' }}>{p}</Text>
              <Switch value={!!on[i]} onValueChange={(v) => setOn({ ...on, [i]: v })} trackColor={{ true: C.pri }} />
            </View>
          ))}
        </Card>
        <Card>
          {ROWS.map(([ic, t]) => (
            <Pressable key={t} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 }}>
              <Ionicons name={ic} size={20} color={C.pri} />
              <Text style={{ flex: 1, color: C.ink, fontWeight: '600' }}>{t}</Text>
              <Ionicons name="chevron-forward" size={18} color={C.mut} />
            </Pressable>
          ))}
        </Card>
        <Btn kind="sec" icon="log-out" title="Log Out" onPress={() => setModal(true)} />
      </ScrollView>
      <Modal transparent animationType="fade" visible={modal} onRequestClose={() => setModal(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(20,16,40,.5)', justifyContent: 'center', padding: 28 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 22 }}>
            <Text style={T.h2}>Log out of Paw Fusion?</Text>
            <Text style={[T.body, { marginVertical: 8 }]}>You can sign back in anytime.</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Btn kind="sec" title="Cancel" onPress={() => setModal(false)} style={{ flex: 1 }} />
              <Btn title="Log Out" onPress={() => { setModal(false); navigation.reset({ index: 0, routes: [{ name: 'Login' }] }); }} style={{ flex: 1 }} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
