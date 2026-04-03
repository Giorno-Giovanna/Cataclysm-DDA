import React, { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CATEGORIES } from '../constants/categories';
import { GARDEN_STYLES, TRENDS } from '../constants/copy';
import { ONBOARDING_IMAGES } from '../constants/onboardingImages';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';
import { storage } from '../services/storage';

export function ExploreScreen({ navigation }: any) {
  const [selected, setSelected] = useState('All');
  const [favoriteStyles, setFavoriteStyles] = useState<string[]>([]);
  const insets = useSafeAreaInsets();
  const filteredStyles = useMemo(
    () => (selected === 'All' ? GARDEN_STYLES : GARDEN_STYLES.filter((_, index) => CATEGORIES[(index % (CATEGORIES.length - 1)) + 1] === selected)),
    [selected],
  );

  useEffect(() => {
    storage.getFavoriteStyles().then(setFavoriteStyles);
  }, []);

  const toggleFavorite = async (styleId: string) => {
    const next = await storage.toggleFavoriteStyle(styleId);
    setFavoriteStyles(next);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: insets.bottom + 120, paddingHorizontal: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>Explore</Text>
      <Text style={styles.header}>Explore garden directions</Text>
      <Text style={styles.subheader}>Save styles you like and send them straight into a design.</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stylesRow}>
        {GARDEN_STYLES.map((style, index) => (
          <View key={style.id} style={styles.styleItem}>
            <Image source={ONBOARDING_IMAGES[index % ONBOARDING_IMAGES.length]} style={styles.styleImage} resizeMode="cover" />
            <View style={styles.styleRow}>
              <Text style={styles.styleLabel}>{style.name}</Text>
              <Pressable onPress={() => toggleFavorite(style.id)} hitSlop={8}>
                <MaterialCommunityIcons
                  name={favoriteStyles.includes(style.id) ? 'heart' : 'heart-outline'}
                  size={18}
                  color={favoriteStyles.includes(style.id) ? COLORS.danger : COLORS.textLight}
                />
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Current Directions</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendsRow}>
        {TRENDS.map((trend, index) => (
          <View key={trend} style={styles.trendCard}>
            <Image source={ONBOARDING_IMAGES[(index + 4) % ONBOARDING_IMAGES.length]} style={styles.trendImage} resizeMode="cover" />
            <View style={styles.trendOverlay}>
              <Text style={styles.trendText}>{trend}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
        {CATEGORIES.map((category) => (
          <Pressable key={category} onPress={() => setSelected(category)} style={[styles.categoryChip, selected === category && styles.categoryChipActive]}>
            <Text style={[styles.categoryText, selected === category && styles.categoryTextActive]}>{category}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.grid}>
        {filteredStyles.slice(0, 6).map((style, index) => (
          <View key={index} style={styles.gridCard}>
            <Image source={ONBOARDING_IMAGES[(index + 2) % ONBOARDING_IMAGES.length]} style={styles.gridImage} resizeMode="cover" />
            <View style={styles.gridCaption}>
              <View style={styles.gridTopRow}>
                <Text style={styles.gridTitle}>{style.name}</Text>
                <Pressable onPress={() => toggleFavorite(style.id)} hitSlop={8}>
                  <MaterialCommunityIcons
                    name={favoriteStyles.includes(style.id) ? 'heart' : 'heart-outline'}
                    size={18}
                    color={favoriteStyles.includes(style.id) ? COLORS.danger : COLORS.textLight}
                  />
                </Pressable>
              </View>
              <Text style={styles.gridMeta}>{style.tagline}</Text>
              <Pressable
                style={styles.applyButton}
                onPress={() =>
                  navigation.navigate('GardenDesign', {
                    mode: 'style',
                    selectedStyleId: style.id,
                    referenceTitle: style.name,
                  })
                }
              >
                <Text style={styles.applyButtonText}>Use This Style</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  kicker: { ...TYPE.eyebrow, color: COLORS.primary },
  header: { marginTop: 8, fontFamily: FONTS.display, fontSize: 34, color: COLORS.text },
  subheader: { marginTop: 8, ...TYPE.body, color: COLORS.textSecondary },
  stylesRow: { paddingVertical: 18, gap: 14 },
  styleItem: { width: 108 },
  styleImage: { width: 108, height: 132, borderRadius: RADII.md },
  styleRow: { marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  styleLabel: { ...TYPE.meta, color: COLORS.text, flex: 1 },
  sectionTitle: { fontFamily: FONTS.display, fontSize: 28, color: COLORS.text },
  trendsRow: { paddingVertical: 14, gap: 12 },
  trendCard: { width: 260, height: 180, borderRadius: RADII.lg, overflow: 'hidden', ...SHADOW.card },
  trendImage: { width: '100%', height: '100%' },
  trendOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', padding: 16, backgroundColor: 'rgba(18,15,13,0.16)' },
  trendText: { fontFamily: FONTS.display, fontSize: 24, color: COLORS.white },
  categoriesRow: { paddingVertical: 10, gap: 10 },
  categoryChip: { paddingHorizontal: 14, paddingVertical: 10, backgroundColor: COLORS.surfaceMuted, borderRadius: RADII.sm, borderWidth: 1, borderColor: COLORS.border },
  categoryChipActive: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
  categoryText: { ...TYPE.meta, color: COLORS.textSecondary },
  categoryTextActive: { color: COLORS.white },
  grid: { marginTop: 10, gap: 14 },
  gridCard: { borderRadius: RADII.lg, overflow: 'hidden', backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, ...SHADOW.card },
  gridImage: { width: '100%', height: 180 },
  gridCaption: { padding: 16 },
  gridTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  gridTitle: { fontFamily: FONTS.display, fontSize: 24, color: COLORS.text },
  gridMeta: { marginTop: 6, ...TYPE.body, color: COLORS.textSecondary },
  applyButton: { alignSelf: 'flex-start', marginTop: 12, paddingHorizontal: 14, paddingVertical: 10, borderRadius: RADII.sm, backgroundColor: COLORS.primary },
  applyButtonText: { ...TYPE.meta, color: COLORS.white, textTransform: 'uppercase' },
});
