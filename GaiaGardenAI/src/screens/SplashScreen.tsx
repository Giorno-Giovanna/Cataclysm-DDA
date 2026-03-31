import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

export function SplashScreen({ navigation }: any) {
  useEffect(() => { const t = setTimeout(() => navigation.replace('Onboarding'), 900); return () => clearTimeout(t); }, [navigation]);
  return <View style={{ flex: 1, backgroundColor: '#eef5ed', alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 42 }}>🌿</Text><Text style={{ fontSize: 28, fontWeight: '700' }}>Gaia AI</Text></View>;
}
