import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store';
import { SEV, C } from '../theme';

export default function Toast() {
  const { toast } = useStore();
  const y = useRef(new Animated.Value(-160)).current;
  const insets = useSafeAreaInsets();
  useEffect(() => {
    Animated.spring(y, { toValue: toast ? 0 : -160, useNativeDriver: true, bounciness: 6 }).start();
  }, [toast]);
  const v = SEV[toast?.sev || 'inf'];
  return (
    <Animated.View pointerEvents="none" style={{ position: 'absolute', left: 16, right: 16, top: insets.top + 8, transform: [{ translateY: y }] }}>
      <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 14, flexDirection: 'row', gap: 12, alignItems: 'center', borderLeftWidth: 5, borderLeftColor: v.c, elevation: 8, shadowOpacity: 0.2, shadowRadius: 12 }}>
        <Ionicons name={toast?.icon || v.icon} size={24} color={v.c} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: '800', color: C.ink }}>{toast?.title}</Text>
          <Text style={{ color: C.mut }}>{toast?.sev === 'wa' ? 'Worth watching · AI observation' : 'Buddy · Just now'}</Text>
        </View>
      </View>
    </Animated.View>
  );
}
