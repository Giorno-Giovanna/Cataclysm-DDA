import React, { useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GARDEN_STYLES } from '../constants/copy';
import { PrimaryButton } from '../components/PrimaryButton';
import { generateGardenDesign } from '../services/api';

export function GardenDesignScreen({ navigation, route }: any) {
  const [uri, setUri] = useState<string>();
  const [style, setStyle] = useState<any>();
  const [prompt, setPrompt] = useState(route.params?.mode === 'add' ? 'add fire pit' : '');
  const [loading, setLoading] = useState(false);

  const pick = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7, base64: true });
    if (!res.canceled) setUri(res.assets[0].uri);
  };

  const generate = async () => {
    if (!uri || !style) return;
    setLoading(true);
    const result = await generateGardenDesign('mock', style.prompt, prompt);
    setLoading(false);
    navigation.replace('Result', { originalImageUri: uri, style, customPrompt: prompt, ...result });
  };

  return <ScrollView style={{ flex: 1, backgroundColor: '#f7f7f3', padding: 16 }}><Text style={{ fontSize: 28, fontWeight: '800' }}>Garden Design</Text>{uri ? <Image source={{ uri }} style={{ height: 200, borderRadius: 16, marginVertical: 10 }} /> : <Pressable onPress={pick} style={{ borderWidth: 2, borderStyle: 'dashed', borderColor: '#88aa88', borderRadius: 14, padding: 24, alignItems: 'center', marginVertical: 12 }}><Text>Upload Your Garden Photo</Text></Pressable>}
  {uri && <PrimaryButton title='Change Photo' onPress={pick} />}
  <Text style={{ marginTop: 12, fontWeight: '700' }}>Choose a Style</Text>
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 8 }}>{GARDEN_STYLES.map((s)=><Text key={s.id} onPress={()=>setStyle(s)} style={{ backgroundColor: style?.id===s.id?'#2e7d32':'#fff', color: style?.id===s.id?'#fff':'#333', padding: 8, borderRadius: 12 }}>{s.emoji} {s.name}</Text>)}</View>
  <TextInput value={prompt} onChangeText={setPrompt} placeholder='e.g. add a fire pit, low-maintenance plants' multiline style={{ backgroundColor: '#fff', borderRadius: 12, minHeight: 84, padding: 10 }} />
  {loading ? <View style={{ alignItems: 'center', marginVertical: 20 }}><ActivityIndicator /><Text>Creating your garden...</Text></View> : <View style={{ marginTop: 12 }}><PrimaryButton title='Generate Design' onPress={generate} disabled={!uri || !style} /></View>}
  </ScrollView>;
}
