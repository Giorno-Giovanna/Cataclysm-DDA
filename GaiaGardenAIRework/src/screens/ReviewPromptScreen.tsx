import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlaceholderReviewCard } from '../components/PlaceholderReviewCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { COLORS, FONTS, TYPE } from '../constants/theme';

export function ReviewPromptScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 20 }]}>
      <Text style={styles.kicker}>Support Gaia</Text>
      <Text style={styles.heading}>Help us grow</Text>
      <Text style={styles.subheading}>If the app has been helpful, a review on the App Store really helps us out.</Text>
      <PlaceholderReviewCard />
      <View style={styles.buttonWrap}>
        <PrimaryButton title="Continue" onPress={() => navigation.replace('Paywall', { source: 'onboarding' })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.background, gap: 14 },
  kicker: { ...TYPE.eyebrow, color: COLORS.primary },
  heading: { fontFamily: FONTS.display, fontSize: 36, color: COLORS.text },
  subheading: { ...TYPE.body, color: COLORS.textSecondary },
  buttonWrap: { marginTop: 'auto' },
});
