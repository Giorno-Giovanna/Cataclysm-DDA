import React, { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/PrimaryButton';
import { PRICING } from '../constants/pricing';
import { ONBOARDING_IMAGES } from '../constants/onboardingImages';
import { purchasePlan } from '../services/subscriptions';
import { storage } from '../services/storage';

export function OneTimeOfferScreen({ navigation }: any) {
  const [sec, setSec] = useState(58);
  const insets = useSafeAreaInsets();

  const collageImages = useMemo(
    () => [ONBOARDING_IMAGES[1], ONBOARDING_IMAGES[3], ONBOARDING_IMAGES[5], ONBOARDING_IMAGES[7], ONBOARDING_IMAGES[9]],
    []
  );

  useEffect(() => {
    const timer = setInterval(() => setSec((current) => (current > 0 ? current - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const closeOffer = () => {
    navigation.goBack();
  };

  const continueWithOffer = async () => {
    await purchasePlan(PRICING.yearlyOffer.id);
    await storage.setBool(storage.keys.hasCompletedIntro, true);
    navigation.replace('MainTabs');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.backgroundLayer}>
        {collageImages.map((image, index) => (
          <Image
            key={index}
            source={image}
            resizeMode="cover"
            style={[
              styles.bgCard,
              index === 0 && styles.bgCardA,
              index === 1 && styles.bgCardB,
              index === 2 && styles.bgCardC,
              index === 3 && styles.bgCardD,
              index === 4 && styles.bgCardE,
            ]}
          />
        ))}
      </View>
      <View style={styles.overlay} />

      <TouchableOpacity
        style={[styles.closeButton, { top: insets.top + 8 }]}
        onPress={closeOffer}
        activeOpacity={0.75}
        hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
      >
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingTop: insets.top + 86, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>ONE TIME OFFER</Text>
        <Text style={styles.subheader}>Design your garden effortlessly with AI power.</Text>

        <View style={styles.reviewsRow}>
          <View style={[styles.reviewCard, styles.reviewCardLeft]}>
            <Text style={styles.reviewStars}>★★★★★</Text>
            <Text style={styles.reviewBody}>This app is a game changer. I redesigned my entire yard.</Text>
            <Text style={styles.reviewMeta}>A. H.</Text>
          </View>
          <View style={styles.reviewCard}>
            <Text style={styles.reviewStars}>★★★★★</Text>
            <Text style={styles.reviewBody}>Visualize my dream garden. Loved the results.</Text>
            <Text style={styles.reviewMeta}>Laura M.</Text>
          </View>
        </View>

        <Text style={styles.timer}>00:{String(sec).padStart(2, '0')}</Text>
        <Text style={styles.offerTitle}>Yearly Access</Text>
        <View style={styles.priceRow}>
          <Text style={styles.offerPrice}>{PRICING.yearlyOffer.perWeek}</Text>
          <Text style={styles.perWeek}>/ week</Text>
        </View>
        <Text style={styles.billingText}>Billed {PRICING.yearlyOffer.price}/year, cancel anytime</Text>

        <PrimaryButton title="Continue" onPress={continueWithOffer} />

        <Text style={styles.commitment}>No commitment, Cancel anytime</Text>
        <View style={styles.linksRow}>
          <Text style={styles.link}>Privacy</Text>
          <Text style={styles.link}>Terms</Text>
          <Text style={styles.link}>Restore</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  bgCard: {
    position: 'absolute',
    borderRadius: 28,
    opacity: 0.95,
  },
  bgCardA: {
    width: 170,
    height: 210,
    top: 54,
    left: -20,
    transform: [{ rotate: '-11deg' }],
  },
  bgCardB: {
    width: 182,
    height: 220,
    top: 18,
    right: -12,
    transform: [{ rotate: '10deg' }],
  },
  bgCardC: {
    width: 204,
    height: 246,
    top: 118,
    left: 88,
    transform: [{ rotate: '10deg' }],
  },
  bgCardD: {
    width: 166,
    height: 206,
    bottom: 182,
    left: -8,
    transform: [{ rotate: '8deg' }],
  },
  bgCardE: {
    width: 176,
    height: 216,
    bottom: 152,
    right: -18,
    transform: [{ rotate: '-8deg' }],
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  closeButton: {
    position: 'absolute',
    left: 18,
    zIndex: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  subheader: {
    marginTop: 10,
    color: 'rgba(255,255,255,0.84)',
    fontSize: 18,
    lineHeight: 25,
    textAlign: 'center',
  },
  reviewsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 26,
    marginBottom: 28,
  },
  reviewCard: {
    flex: 1,
    minHeight: 132,
    borderRadius: 20,
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  reviewCardLeft: {
    opacity: 0.88,
  },
  reviewStars: {
    color: '#f0b82a',
    fontSize: 14,
    fontWeight: '800',
  },
  reviewBody: {
    marginTop: 10,
    color: '#2b2b2b',
    fontSize: 14,
    lineHeight: 20,
  },
  reviewMeta: {
    marginTop: 8,
    color: '#5b5b5b',
    fontSize: 13,
  },
  timer: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 54,
    lineHeight: 58,
    fontWeight: '300',
  },
  offerTitle: {
    marginTop: 14,
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  offerPrice: {
    color: '#ffffff',
    fontSize: 56,
    lineHeight: 60,
    fontWeight: '900',
  },
  perWeek: {
    color: '#ffffff',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    marginBottom: 7,
  },
  billingText: {
    marginTop: 10,
    color: 'rgba(255,255,255,0.74)',
    textAlign: 'center',
    fontSize: 14,
  },
  commitment: {
    marginTop: 14,
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingHorizontal: 20,
  },
  link: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
  },
});
