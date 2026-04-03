import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { PrimaryButton } from '../components/PrimaryButton';
import { MasonryHeroColumns } from '../components/MasonryHeroColumns';
import { DelayedFadeIn } from '../components/DelayedFadeIn';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';

export function OnboardingScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.heroVisualContainer}>
        <MasonryHeroColumns />
        <View style={[styles.heroOverlayWrap, { paddingBottom: insets.bottom + 24 }]}>
          <LinearGradient colors={['rgba(244,238,231,0)', 'rgba(244,238,231,0.2)', 'rgba(244,238,231,0.96)']} style={styles.heroFade} />
          <View style={styles.heroOverlay}>
            <Text style={styles.kicker}>Garden Design</Text>
            <Text style={styles.heroTitle}>Transform Your Garden</Text>
            <Text style={styles.heroSubtitle}>See new ideas for paths, plants, seating, and outdoor spaces in seconds.</Text>
            <View style={styles.heroProofRow}>
              <View style={styles.heroProofBlock}>
                <Text style={styles.heroProofLabel}>Trusted by over</Text>
                <Text style={styles.heroProofValue}>200,000+</Text>
                <Text style={styles.heroProofMeta}>active designers and homeowners</Text>
              </View>
              <View style={styles.heroProofDivider} />
              <View style={styles.heroProofBlock}>
                <Text style={styles.heroProofLabel}>Ranked</Text>
                <Text style={styles.heroProofValue}>#1</Text>
                <Text style={styles.heroProofMeta}>garden design app</Text>
              </View>
            </View>
            <DelayedFadeIn>
              <PrimaryButton title="Get Started" onPress={() => navigation.replace('OnboardingRecreate')} />
            </DelayedFadeIn>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  heroVisualContainer: {
    flex: 1,
    borderRadius: RADII.panel,
    overflow: 'hidden',
    backgroundColor: COLORS.backgroundStrong,
  },
  heroOverlayWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  heroFade: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    marginHorizontal: 16,
    borderRadius: RADII.xl,
    padding: 24,
    backgroundColor: 'rgba(255,248,241,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(216,200,182,0.8)',
    ...SHADOW.soft,
  },
  kicker: {
    ...TYPE.eyebrow,
    color: COLORS.primary,
  },
  heroTitle: {
    marginTop: 10,
    fontFamily: FONTS.display,
    fontSize: 36,
    color: COLORS.text,
  },
  heroSubtitle: {
    marginTop: 10,
    ...TYPE.body,
    color: COLORS.textSecondary,
  },
  heroProofRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 14,
    marginTop: 22,
    marginBottom: 22,
  },
  heroProofBlock: {
    flex: 1,
  },
  heroProofDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  heroProofLabel: {
    ...TYPE.meta,
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  heroProofValue: {
    marginTop: 6,
    fontFamily: FONTS.display,
    fontSize: 30,
    color: COLORS.secondary,
  },
  heroProofMeta: {
    marginTop: 4,
    ...TYPE.meta,
    color: COLORS.textSecondary,
  },
});
