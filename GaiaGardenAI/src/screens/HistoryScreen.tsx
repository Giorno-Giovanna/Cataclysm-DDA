import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { storage } from '../services/storage';
import { DesignHistoryItem } from '../types';

export function HistoryScreen() {
  const [items, setItems] = useState<DesignHistoryItem[]>([]);
  useEffect(() => { const unsub = setInterval(() => storage.getJSON<DesignHistoryItem[]>(storage.keys.history, []).then(setItems), 500); return () => clearInterval(unsub); }, []);
  if (!items.length) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 22, fontWeight: '700' }}>No designs yet</Text><Text>Your saved garden designs will appear here</Text></View>;
  return <ScrollView style={{ padding: 16 }}>{items.map((h) => <View key={h.id} style={{ padding: 12, borderRadius: 12, backgroundColor: '#fff', marginBottom: 10 }}><Text>{h.styleName}</Text><Text>{new Date(h.createdAt).toLocaleString()}</Text><Text>{h.customPrompt}</Text></View>)}</ScrollView>;
}
