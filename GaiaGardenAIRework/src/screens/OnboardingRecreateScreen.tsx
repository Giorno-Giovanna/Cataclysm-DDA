import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AutoBeforeAfter } from '../components/AutoBeforeAfter';
import { DelayedFadeIn } from '../components/DelayedFadeIn';
import { PrimaryButton } from '../components/PrimaryButton';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';

export function OnboardingRecreateScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 14 }]}>
        <Text style={styles.kicker}>Before & After</Text>
        <View style={styles.visualWrap}>
          <AutoBeforeAfter />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>Recreate Your Exteriors</Text>
          <Text style={styles.subtitle}>Watch your garden change from the original photo to a new design idea.</Text>
        </View>
        <DelayedFadeIn style={styles.buttonWrap}>
          <PrimaryButton title="Continue" onPress={() => navigation.navigate('OnboardingDesignEdit')} />
        </DelayedFadeIn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
  },
  kicker: {
    ...TYPE.eyebrow,
    color: COLORS.primary,
  },
  visualWrap: {
    marginTop: 16,
    borderRadius: RADII.panel,
    overflow: 'hidden',
    ...SHADOW.soft,
  },
  textWrap: {
    paddingTop: 24,
    gap: 10,
  },
  title: {
    fontFamily: FONTS.display,
    fontSize: 34,
    color: COLORS.text,
  },
  subtitle: {
    ...TYPE.body,
    color: COLORS.textSecondary,
  },
  buttonWrap: {
    marginTop: 'auto',
  },
});
