import React from 'react';
import { Image, Share, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { storage } from '../services/storage';

export function ResultScreen({ navigation, route }: any) {
  const p = route.params;
  const save = async () => {
    await storage.addHistory({ id: Date.now().toString(), createdAt: new Date().toISOString(), originalImageUri: p.originalImageUri, resultImageUri: p.resultImageUri, styleId: p.style.id, styleName: p.style.name, customPrompt: p.customPrompt, resultText: p.resultText });
    navigation.navigate('MainTabs');
  };
  return <View style={{ flex: 1, padding: 16, backgroundColor: '#f7f7f3', gap: 10 }}><Text style={{ fontSize: 28, fontWeight: '800' }}>Your New Garden</Text><Image source={{ uri: p.originalImageUri }} style={{ height: 160, borderRadius: 12 }} /><Image source={{ uri: p.resultImageUri }} style={{ height: 160, borderRadius: 12 }} /><Text>{p.style.name}</Text><Text>{p.resultText}</Text><PrimaryButton title='Save' onPress={save} /><PrimaryButton title='Share' onPress={() => Share.share({ message: p.resultText })} /><PrimaryButton title='New Design' onPress={() => navigation.replace('GardenDesign')} /></View>;
}
