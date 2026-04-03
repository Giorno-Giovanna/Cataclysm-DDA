import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { PrimaryButton } from '../components/PrimaryButton';
import { MasonryHeroColumns } from '../components/MasonryHeroColumns';
import { DelayedFadeIn } from '../components/DelayedFadeIn';

export function OnboardingScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.heroVisualContainer}>
        <MasonryHeroColumns />
        <View style={[styles.heroOverlayWrap, { paddingBottom: insets.bottom + 18 }]}>
          <LinearGradient
            colors={['rgba(247, 244, 239, 0)', 'rgba(247, 244, 239, 0.25)', 'rgba(247, 244, 239, 0.92)']}
            locations={[0, 0.2, 0.43]}
            style={styles.heroFade}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Transform Your Garden</Text>
            <Text style={styles.heroSubtitle}>Instantly redesign your garden with AI</Text>
            <View style={styles.heroProofRow}>
              <View style={styles.heroProofBlock}>
                <Text style={styles.heroProofLabel}>Trusted by over</Text>
                <Text style={styles.heroProofValue}>200,000+</Text>
                <Text style={styles.heroProofStars}>5-star rated</Text>
              </View>
              <View style={styles.heroProofDivider} />
              <View style={styles.heroProofBlock}>
                <Text style={styles.heroProofNumber}>#1</Text>
                <Text style={styles.heroProofValue}>Garden Design</Text>
                <Text style={styles.heroProofValue}>App</Text>
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
    backgroundColor: '#f7f7f3',
    paddingHorizontal: 8,
  },
  heroVisualContainer: {
    flex: 1,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#dce6d6',
  },
  heroOverlayWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  heroFade: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    marginHorizontal: 10,
    marginBottom: 12,
    minHeight: '31%',
    borderRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 26,
    backgroundColor: 'rgba(246, 242, 237, 0.82)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.42)',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  heroTitle: {
    color: '#111111',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  heroSubtitle: {
    marginTop: 10,
    color: '#444444',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  heroProofRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 20,
    gap: 12,
  },
  heroProofBlock: {
    flex: 1,
    alignItems: 'center',
  },
  heroProofDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(20, 20, 20, 0.08)',
  },
  heroProofLabel: {
    fontSize: 12,
    color: '#5b5b5b',
    fontWeight: '500',
  },
  heroProofValue: {
    fontSize: 18,
    lineHeight: 22,
    color: '#171717',
    fontWeight: '800',
    textAlign: 'center',
  },
  heroProofStars: {
    marginTop: 4,
    color: '#d18b1f',
    fontSize: 12,
    letterSpacing: 0.3,
  },
  heroProofNumber: {
    color: '#2e7d32',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '900',
  },
});
