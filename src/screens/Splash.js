import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, T } from '../theme';

export default function Splash({ navigation }) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 900, useNativeDriver: true }).start();
    const t = setTimeout(() => navigation.replace('Onboarding'), 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: C.pri, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{ alignItems: 'center', opacity: a, transform: [{ scale: a.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }] }}>
        <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 56 }}>🐕</Text>
          <Ionicons name="paw" size={26} color={C.pri} style={{ position: 'absolute', bottom: 8, right: 8 }} />
        </View>
        <Text style={[T.h1, { color: '#fff', marginTop: 20 }]}>Paw Fusion</Text>
        <Text style={{ color: '#D9D5FA', fontSize: 16, marginTop: 6 }}>Understand every moment.</Text>
      </Animated.View>
    </View>
  );
}
