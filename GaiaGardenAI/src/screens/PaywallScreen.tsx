import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/PrimaryButton';
import { purchasePlan } from '../services/subscriptions';
import { storage } from '../services/storage';
import { PRICING } from '../constants/pricing';
import { ONBOARDING_IMAGES } from '../constants/onboardingImages';

const FEATURES = ['Unlimited renders', 'Premium styles', 'Detailed customization', 'No watermarks'];

export function PaywallScreen({ navigation, route }: any) {
  const [plan, setPlan] = useState(PRICING.yearly.id);
  const insets = useSafeAreaInsets();
  const source = route?.params?.source ?? 'onboarding';

  const collageImages = useMemo(
    () => [ONBOARDING_IMAGES[0], ONBOARDING_IMAGES[2], ONBOARDING_IMAGES[4], ONBOARDING_IMAGES[6], ONBOARDING_IMAGES[8]],
    []
  );

  const finishPurchased = async (id = plan) => {
    await purchasePlan(id);
    await storage.setBool(storage.keys.hasCompletedIntro, true);
    navigation.replace('MainTabs');
  };

  const handleClose = async () => {
    await storage.setBool(storage.keys.hasCompletedIntro, true);
    if (source === 'app') {
      navigation.goBack();
      return;
    }
    navigation.replace('MainTabs', { showOfferAfterPaywall: true });
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
        onPress={handleClose}
        activeOpacity={0.75}
        hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
      >
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingTop: insets.top + 58, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.kicker}>GAIA GARDEN AI PRO</Text>
        <Text style={styles.header}>Unlock everything for better garden redesigns</Text>
        <Text style={styles.subheader}>Faster generations, premium looks, and cleaner exports in one subscription.</Text>

        <View style={styles.featureList}>
          {FEATURES.map((feature) => (
            <View key={feature} style={styles.featureRow}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.plansWrap}>
          <Pressable style={[styles.planCard, plan === PRICING.yearly.id && styles.planCardSelected]} onPress={() => setPlan(PRICING.yearly.id)}>
            <View style={styles.planTopRow}>
              <Text style={styles.planTitle}>Yearly Access</Text>
              <View style={styles.saveBadge}>
                <Text style={styles.saveText}>BEST VALUE</Text>
              </View>
            </View>
            <Text style={styles.planPrice}>{PRICING.yearly.price}</Text>
            <Text style={styles.planMeta}>{PRICING.yearly.perWeek} / week</Text>
          </Pressable>

          <Pressable style={[styles.planCard, plan === PRICING.weekly.id && styles.planCardSelected]} onPress={() => setPlan(PRICING.weekly.id)}>
            <Text style={styles.planTitle}>Weekly Access</Text>
            <Text style={styles.planPrice}>{PRICING.weekly.price}</Text>
            <Text style={styles.planMeta}>{PRICING.weekly.perWeek} / week</Text>
          </Pressable>
        </View>

        <View style={styles.reviewsRow}>
          <View style={styles.reviewCard}>
            <Text style={styles.reviewStars}>★★★★★</Text>
            <Text style={styles.reviewBody}>The redesign previews are dramatically better than generic garden apps.</Text>
          </View>
          <View style={styles.reviewCard}>
            <Text style={styles.reviewStars}>★★★★★</Text>
            <Text style={styles.reviewBody}>The premium styles made it much easier to visualize a finished yard.</Text>
          </View>
        </View>

        <PrimaryButton title="Continue" onPress={() => finishPurchased()} />
        <Text style={styles.commitment}>No commitment, cancel anytime</Text>
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
    top: 70,
    left: -30,
    transform: [{ rotate: '-12deg' }],
  },
  bgCardB: {
    width: 180,
    height: 220,
    top: 28,
    right: -24,
    transform: [{ rotate: '9deg' }],
  },
  bgCardC: {
    width: 220,
    height: 260,
    top: 140,
    left: 86,
    transform: [{ rotate: '11deg' }],
  },
  bgCardD: {
    width: 170,
    height: 210,
    bottom: 200,
    left: -20,
    transform: [{ rotate: '8deg' }],
  },
  bgCardE: {
    width: 180,
    height: 220,
    bottom: 150,
    right: -18,
    transform: [{ rotate: '-10deg' }],
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.66)',
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
  kicker: {
    color: '#9bc79a',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  header: {
    marginTop: 12,
    color: '#ffffff',
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '900',
  },
  subheader: {
    marginTop: 12,
    color: 'rgba(255,255,255,0.82)',
    fontSize: 17,
    lineHeight: 25,
  },
  featureList: {
    marginTop: 24,
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7ccc71',
    marginRight: 12,
  },
  featureText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  plansWrap: {
    marginTop: 28,
    gap: 12,
  },
  planCard: {
    borderRadius: 22,
    padding: 18,
    backgroundColor: 'rgba(255,255,255,0.11)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  planCardSelected: {
    backgroundColor: 'rgba(122, 189, 113, 0.18)',
    borderColor: 'rgba(145, 212, 136, 0.75)',
  },
  planTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planTitle: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '800',
  },
  saveBadge: {
    backgroundColor: '#e7f6dd',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  saveText: {
    color: '#325a2f',
    fontSize: 11,
    fontWeight: '800',
  },
  planPrice: {
    marginTop: 12,
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '900',
  },
  planMeta: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.74)',
    fontSize: 15,
  },
  reviewsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 24,
  },
  reviewCard: {
    flex: 1,
    minHeight: 116,
    borderRadius: 20,
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
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
