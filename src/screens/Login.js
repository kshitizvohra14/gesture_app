import React, { useState } from 'react';
import { Text, TextInput, View, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Btn } from '../components/ui';
import { C, R, T } from '../theme';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState({});
  const enter = () => navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  const submit = () => {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Please enter a valid email address.';
    if (!pw) e.pw = 'Password is required.';
    setErr(e);
    if (!Object.keys(e).length) enter();
  };
  const field = { backgroundColor: '#fff', borderRadius: R.sm, padding: 14, fontSize: 16, color: C.ink, borderWidth: 1 };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={{ padding: 24 }} keyboardShouldPersistTaps="handled">
        <View style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: C.pri, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Ionicons name="paw" size={32} color="#fff" />
        </View>
        <Text style={T.h1}>Welcome back</Text>
        <Text style={[T.body, { marginBottom: 24 }]}>Sign in to continue monitoring your pets.</Text>
        <TextInput placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail}
          style={[field, { borderColor: err.email ? C.cr : C.line }]} />
        {err.email && <Text style={{ color: C.cr, marginTop: 4 }}>{err.email}</Text>}
        <View style={[field, { marginTop: 12, flexDirection: 'row', alignItems: 'center', padding: 0, borderColor: err.pw ? C.cr : C.line }]}>
          <TextInput placeholder="Password" secureTextEntry={!show} value={pw} onChangeText={setPw} style={{ flex: 1, padding: 14, fontSize: 16, color: C.ink }} />
          <Pressable onPress={() => setShow(!show)} style={{ padding: 14 }} accessibilityLabel="Toggle password visibility">
            <Ionicons name={show ? 'eye-off' : 'eye'} size={20} color={C.mut} />
          </Pressable>
        </View>
        {err.pw && <Text style={{ color: C.cr, marginTop: 4 }}>{err.pw}</Text>}
        <Text style={{ color: C.pri, fontWeight: '700', alignSelf: 'flex-end', marginVertical: 14 }}>Forgot Password?</Text>
        <Btn title="Sign In" onPress={submit} />
        <Btn kind="sec" title="Use demo account" onPress={enter} style={{ marginTop: 10 }} />
        <Text style={{ textAlign: 'center', color: C.mut, marginVertical: 18 }}>OR</Text>
        <Btn kind="sec" icon="logo-google" title="Continue with Google" onPress={enter} />
        <Btn kind="sec" icon="logo-apple" title="Continue with Apple" onPress={enter} style={{ marginTop: 10 }} />
        <Text style={{ textAlign: 'center', color: C.mut, marginTop: 24 }}>Don't have an account? <Text style={{ color: C.pri, fontWeight: '700' }}>Create account</Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
}
