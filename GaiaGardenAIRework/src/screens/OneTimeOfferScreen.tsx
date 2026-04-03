import React, { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/PrimaryButton';
import { PRICING } from '../constants/pricing';
import { ONBOARDING_IMAGES } from '../constants/onboardingImages';
import { purchasePlan } from '../services/subscriptions';
import { storage } from '../services/storage';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';

export function OneTimeOfferScreen({ navigation, route }: any) {
  const [sec, setSec] = useState(58);
  const insets = useSafeAreaInsets();
  const collageImages = useMemo(() => [ONBOARDING_IMAGES[1], ONBOARDING_IMAGES[3], ONBOARDING_IMAGES[5]], []);

  useEffect(() => {
    const timer = setInterval(() => setSec((current) => (current > 0 ? current - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const continueWithOffer = async () => {
    await purchasePlan(PRICING.yearlyOffer.id);
    await storage.setBool(storage.keys.hasCompletedIntro, true);
    navigation.replace('MainTabs');
  };

  return (
    <View style={styles.screen}>
      <Pressable style={[styles.closeButton, { top: insets.top + 8 }]} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="close" size={20} color={COLORS.textSecondary} />
      </Pressable>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingTop: insets.top + 52, paddingBottom: insets.bottom + 28 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.kicker}>Special Offer</Text>
        <Text style={styles.header}>{route?.params?.title ?? 'One Time Offer'}</Text>
        <Text style={styles.subheader}>Get PRO at a lower price for a limited time.</Text>

        <View style={styles.collageRow}>
          {collageImages.map((image, index) => (
            <Image key={index} source={image} style={[styles.collageImage, index === 1 && styles.collageImageRaised]} resizeMode="cover" />
          ))}
        </View>

        <View style={styles.timerCard}>
          <Text style={styles.timerLabel}>Offer expires in</Text>
          <Text style={styles.timer}>00:{String(sec).padStart(2, '0')}</Text>
        </View>

        <View style={styles.priceCard}>
          <Text style={styles.planName}>Yearly Access</Text>
          <Text style={styles.offerPrice}>{PRICING.yearlyOffer.perWeek}</Text>
          <Text style={styles.billingText}>Billed {PRICING.yearlyOffer.price}/year, cancel anytime</Text>
        </View>

        <PrimaryButton title="Continue" onPress={continueWithOffer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  closeButton: { position: 'absolute', right: 18, zIndex: 10, width: 38, height: 38, borderRadius: RADII.sm, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1, paddingHorizontal: 20 },
  kicker: { ...TYPE.eyebrow, color: COLORS.primary },
  header: { marginTop: 8, fontFamily: FONTS.display, fontSize: 36, color: COLORS.text },
  subheader: { marginTop: 10, ...TYPE.body, color: COLORS.textSecondary },
  collageRow: { flexDirection: 'row', gap: 12, marginTop: 24 },
  collageImage: { flex: 1, height: 220, borderRadius: RADII.lg, ...SHADOW.card },
  collageImageRaised: { marginTop: 24 },
  timerCard: { marginTop: 24, padding: 18, borderRadius: RADII.lg, backgroundColor: COLORS.surfaceDark, alignItems: 'center' },
  timerLabel: { ...TYPE.meta, color: '#D8E9DD', textTransform: 'uppercase' },
  timer: { marginTop: 6, fontFamily: FONTS.display, fontSize: 44, color: COLORS.white },
  priceCard: { marginTop: 16, marginBottom: 24, padding: 18, borderRadius: RADII.lg, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, ...SHADOW.card },
  planName: { ...TYPE.eyebrow, color: COLORS.primary },
  offerPrice: { marginTop: 8, fontFamily: FONTS.display, fontSize: 34, color: COLORS.secondary },
  billingText: { marginTop: 6, ...TYPE.body, color: COLORS.textSecondary },
});
