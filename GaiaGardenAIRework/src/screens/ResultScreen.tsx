import React from 'react';
import { Image, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { storage } from '../services/storage';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';

export function ResultScreen({ navigation, route }: any) {
  const p = route.params;

  const save = async () => {
    await storage.addHistory({
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      originalImageUri: p.originalImageUri,
      resultImageUri: p.resultImageUri,
      styleId: p.style.id,
      styleName: p.style.name,
      customPrompt: p.customPrompt,
      resultText: p.resultText,
    });
    navigation.navigate('MainTabs');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.kicker}>Concept Reveal</Text>
      <Text style={styles.header}>Your new garden</Text>

      <View style={styles.imageStack}>
        <View style={styles.imageCard}>
          <Text style={styles.imageLabel}>Before</Text>
          <Image source={{ uri: p.originalImageUri }} style={styles.image} />
        </View>
        <View style={styles.imageCard}>
          <Text style={styles.imageLabel}>After</Text>
          <Image source={{ uri: p.resultImageUri }} style={styles.image} />
        </View>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.styleName}>{p.style.name}</Text>
        <Text style={styles.body}>{p.resultText}</Text>
        {p.analysis ? <Text style={styles.meta}>Scene read: {p.analysis}</Text> : null}
      </View>

      <PrimaryButton title="Save Concept" onPress={save} />
      <PrimaryButton title="Share Preview" onPress={() => Share.share({ message: p.resultText })} />
      <PrimaryButton title="Start Another" onPress={() => navigation.replace('GardenDesign')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 18, paddingBottom: 48, gap: 16 },
  kicker: { ...TYPE.eyebrow, color: COLORS.primary },
  header: { fontFamily: FONTS.display, fontSize: 34, color: COLORS.text },
  imageStack: { gap: 12 },
  imageCard: { borderRadius: RADII.lg, overflow: 'hidden', backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, ...SHADOW.card },
  imageLabel: { paddingHorizontal: 14, paddingVertical: 10, backgroundColor: COLORS.surfaceDark, color: COLORS.white, ...TYPE.meta, textTransform: 'uppercase' },
  image: { width: '100%', height: 220 },
  summaryCard: { borderRadius: RADII.lg, padding: 18, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  styleName: { fontFamily: FONTS.display, fontSize: 28, color: COLORS.secondary },
  body: { marginTop: 8, ...TYPE.body, color: COLORS.textSecondary },
  meta: { marginTop: 10, ...TYPE.meta, color: COLORS.textLight },
});
