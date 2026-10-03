import React, { useRef, useState } from 'react';
import { FlatList, Text, View, useWindowDimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Btn, Badge } from '../components/ui';
import { C, T } from '../theme';

const SLIDES = [
  { em: '🐕', h: 'See what your dog is feeling', d: 'Monitor movement, posture, expressions, and vocalizations in real time.' },
  { em: '📊', h: 'Turn behavior into insights', d: 'Emotion, motion, posture, vocalization and behavior, summarized for you.' },
  { em: '🔔', h: 'Know when something changes', d: 'Possible limping detected: an unusual movement pattern was observed.', alert: true },
  { em: '🏡', h: 'Stay connected to your pet', d: 'Review activity and behavior history whenever you need it.' },
];

export default function Onboarding({ navigation }) {
  const { width } = useWindowDimensions();
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const last = i === SLIDES.length - 1;
  const next = () => (last ? navigation.replace('Login') : ref.current.scrollToIndex({ index: i + 1 }));
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <Pressable onPress={() => navigation.replace('Login')} style={{ alignSelf: 'flex-end', padding: 20 }}>
        <Text style={{ color: C.mut, fontWeight: '700' }}>Skip</Text>
      </Pressable>
      <FlatList ref={ref} data={SLIDES} horizontal pagingEnabled showsHorizontalScrollIndicator={false} keyExtractor={(x) => x.h}
        onMomentumScrollEnd={(e) => setI(Math.round(e.nativeEvent.contentOffset.x / width))}
        renderItem={({ item }) => (
          <View style={{ width, padding: 28, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 230, height: 280, borderRadius: 36, backgroundColor: C.dark, alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
              <Text style={{ fontSize: 96 }}>{item.em}</Text>
              {item.alert && <View style={{ position: 'absolute', bottom: 18 }}><Badge sev="wa" text="Possible limping" /></View>}
            </View>
            <Text style={[T.h1, { textAlign: 'center', fontSize: 26 }]}>{item.h}</Text>
            <Text style={[T.body, { textAlign: 'center', marginTop: 10 }]}>{item.d}</Text>
          </View>
        )} />
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
        {SLIDES.map((_, k) => <View key={k} style={{ width: k === i ? 24 : 8, height: 8, borderRadius: 4, backgroundColor: k === i ? C.pri : C.line }} />)}
      </View>
      <View style={{ padding: 20 }}><Btn title={last ? 'Get Started' : 'Next'} onPress={next} /></View>
    </SafeAreaView>
  );
}
