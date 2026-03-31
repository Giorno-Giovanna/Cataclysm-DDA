import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CATEGORIES } from '../constants/categories';
import { GARDEN_STYLES, TRENDS } from '../constants/copy';

export function ExploreScreen() {
  const [c, setC] = useState('All');
  return <ScrollView style={{ flex: 1, backgroundColor: '#f7f7f3', padding: 16 }}><Text style={{ fontSize: 28, fontWeight: '800' }}>Gaia AI</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 12 }}>{GARDEN_STYLES.map((s) => <View key={s.id} style={{ alignItems: 'center', marginRight: 14 }}><View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#dcebd8', alignItems: 'center', justifyContent: 'center' }}><Text>{s.emoji}</Text></View><Text>{s.name}</Text></View>)}</ScrollView>
    <Text style={{ fontSize: 20, fontWeight: '700' }}>Discover Trends</Text>
    <ScrollView horizontal>{TRENDS.map((t)=> <View key={t} style={{ width: 220, height: 120, borderRadius: 16, marginRight: 10, marginVertical: 8, backgroundColor: '#cfe2ca', padding: 10, justifyContent: 'flex-end' }}><Text>{t}</Text></View>)}</ScrollView>
    <ScrollView horizontal>{CATEGORIES.map((k)=><Text key={k} onPress={()=>setC(k)} style={{ backgroundColor: c===k?'#2e7d32':'#fff', color: c===k?'#fff':'#333', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, marginRight: 8 }}>{k}</Text>)}</ScrollView>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, gap: 8 }}>{[...Array(10)].map((_,i)=><View key={i} style={{ width: '48%', height: 120, backgroundColor: '#dcebd8', borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}><Text>Placeholder Trend Card</Text></View>)}</View>
  </ScrollView>;
}
