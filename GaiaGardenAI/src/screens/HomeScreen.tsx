import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const Card = ({ t, s, onPress }: any) => <Pressable onPress={onPress} style={{ backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 14 }}><View style={{ height: 120, borderRadius: 14, backgroundColor: '#dcebd8', alignItems: 'center', justifyContent: 'center' }}><Text>Placeholder Garden Visual</Text></View><Text style={{ fontWeight: '800', fontSize: 20, marginTop: 10 }}>{t}</Text><Text style={{ color: '#666' }}>{s}</Text></Pressable>;

export function HomeScreen({ navigation }: any) {
  return <ScrollView style={{ flex: 1, backgroundColor: '#f7f7f3', padding: 16 }}><Text style={{ fontSize: 28, fontWeight: '800' }}>Gaia AI</Text><Text style={{ color: '#666', marginBottom: 10 }}>Garden Design • Add to My Garden • Style Reference</Text>
  <Card t='AI Garden Design' s='Choose a style. AI redesigns your garden' onPress={() => navigation.navigate('GardenDesign', { mode: 'normal' })} />
  <Card t='Add to My Garden' s='Add elements with custom prompts' onPress={() => navigation.navigate('GardenDesign', { mode: 'add' })} />
  <Card t='Style Reference' s='Explore curated garden inspiration' onPress={() => navigation.navigate('Explore')} />
  <Pressable onPress={() => navigation.navigate('Chat')}><Text>💬 Chat</Text></Pressable>
  <Pressable onPress={() => navigation.navigate('Settings')}><Text>⚙️ Settings</Text></Pressable>
  </ScrollView>;
}
