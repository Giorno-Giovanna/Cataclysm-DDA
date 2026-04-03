import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/PrimaryButton';
import { purchasePlan } from '../services/subscriptions';
import { storage } from '../services/storage';
import { PRICING } from '../constants/pricing';
import { ONBOARDING_IMAGES } from '../constants/onboardingImages';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';

const FEATURES = ['Faster Rendering', 'Unlock All Styles', 'Customize Your Garden', 'Remove Watermarks'];

export function PaywallScreen({ navigation, route }: any) {
  const [plan, setPlan] = useState(PRICING.yearly.id);
  const insets = useSafeAreaInsets();
  const source = route?.params?.source ?? 'onboarding';
  const collageImages = useMemo(() => [ONBOARDING_IMAGES[0], ONBOARDING_IMAGES[2], ONBOARDING_IMAGES[4], ONBOARDING_IMAGES[6]], []);

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
      <View style={styles.heroGrid}>
        {collageImages.map((image, index) => (
          <Image key={index} source={image} style={[styles.heroImage, index % 2 === 0 ? styles.heroImageTall : styles.heroImageShort]} resizeMode="cover" />
        ))}
      </View>

      <Pressable style={[styles.closeButton, { top: insets.top + 8 }]} onPress={handleClose}>
        <MaterialCommunityIcons name="close" size={20} color={COLORS.textSecondary} />
      </Pressable>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingTop: insets.top + 38, paddingBottom: insets.bottom + 28 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.kicker}>PRO Membership</Text>
        <Text style={styles.header}>Unlock PRO</Text>
        <Text style={styles.subheader}>Get more tools and more garden styles.</Text>

        <View style={styles.featureList}>
          {FEATURES.map((feature) => (
            <View key={feature} style={styles.featureRow}>
              <MaterialCommunityIcons name="check-decagram" size={18} color={COLORS.accent} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.plansWrap}>
          <Pressable style={[styles.planCard, plan === PRICING.yearly.id && styles.planCardSelected]} onPress={() => setPlan(PRICING.yearly.id)}>
            <View style={styles.planTopRow}>
              <Text style={styles.planTitle}>Yearly Access</Text>
              <View style={styles.saveBadge}>
                <Text style={styles.saveText}>{PRICING.yearly.savings}</Text>
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

        <PrimaryButton title="Continue" onPress={() => finishPurchased()} />
        <Text style={styles.commitment}>No commitment. Cancel anytime.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  heroGrid: { paddingHorizontal: 16, paddingTop: 18, flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  heroImage: { width: '47%', borderRadius: RADII.lg },
  heroImageTall: { height: 180 },
  heroImageShort: { height: 132, marginTop: 38 },
  closeButton: { position: 'absolute', right: 18, zIndex: 10, width: 38, height: 38, borderRadius: RADII.sm, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1, paddingHorizontal: 20 },
  kicker: { ...TYPE.eyebrow, color: COLORS.primary },
  header: { marginTop: 12, fontFamily: FONTS.display, fontSize: 36, color: COLORS.text },
  subheader: { marginTop: 10, ...TYPE.body, color: COLORS.textSecondary },
  featureList: { marginTop: 24, gap: 12 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureText: { ...TYPE.body, color: COLORS.text },
  plansWrap: { marginTop: 24, marginBottom: 22, gap: 12 },
  planCard: { borderRadius: RADII.lg, padding: 18, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, ...SHADOW.card },
  planCardSelected: { borderColor: COLORS.primary, backgroundColor: COLORS.surfaceMuted },
  planTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  planTitle: { fontFamily: FONTS.display, fontSize: 24, color: COLORS.text },
  saveBadge: { backgroundColor: '#4F7B55', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  saveText: { color: COLORS.white, fontFamily: FONTS.bodyBold, fontSize: 11, letterSpacing: 0.7 },
  planPrice: { marginTop: 10, fontFamily: FONTS.display, fontSize: 32, color: COLORS.secondary },
  planMeta: { marginTop: 4, ...TYPE.meta, color: COLORS.textSecondary },
  commitment: { marginTop: 14, textAlign: 'center', ...TYPE.meta, color: COLORS.textLight },
});
