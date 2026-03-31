import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PlaceholderReviewCard } from '../components/PlaceholderReviewCard';
import { PrimaryButton } from '../components/PrimaryButton';

export function ReviewPromptScreen({ navigation }: any) {
  return <View style={s.c}><Text style={s.heart}>❤️</Text><Text style={s.h}>Help Us Grow</Text><Text style={s.sub}>Show your love by giving us a review on the App Store.</Text><PlaceholderReviewCard /><View style={{ marginTop: 'auto' }}><PrimaryButton title="Continue" onPress={() => navigation.replace('Paywall')} /></View></View>;
}
const s = StyleSheet.create({ c: { flex: 1, padding: 20, backgroundColor: '#f7f7f3', gap: 12 }, heart: { fontSize: 56 }, h: { fontSize: 36, fontWeight: '800' }, sub: { color: '#666', fontSize: 16 } });
