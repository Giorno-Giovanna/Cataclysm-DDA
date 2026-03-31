import React from 'react';
import { Alert, Text, View } from 'react-native';
import { restorePurchases } from '../services/subscriptions';

export function SettingsScreen() {
  const item = (t: string, onPress?: () => void) => <Text onPress={onPress} style={{ backgroundColor: '#fff', padding: 14, borderRadius: 12, marginVertical: 6 }}>{t}</Text>;
  return <View style={{ flex: 1, backgroundColor: '#f7f7f3', padding: 16 }}><Text style={{ fontSize: 28, fontWeight: '800', marginBottom: 10 }}>Settings</Text>{item('Restore Purchases', async ()=>{const r=await restorePurchases();Alert.alert('Restore', r.isSubscribed?'Active subscription found':'No purchases found');})}{item('Privacy Policy')}{item('Terms of Use')}{item('Contact Support')}{item('Rate App')}{item('App Version 1.0.0')}</View>;
}
