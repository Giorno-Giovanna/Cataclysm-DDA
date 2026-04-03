import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AutoBeforeAfter } from '../components/AutoBeforeAfter';
import { DelayedFadeIn } from '../components/DelayedFadeIn';
import { PrimaryButton } from '../components/PrimaryButton';

export function OnboardingRecreateScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 10 }]}>
        <Text style={styles.brandTitle}>Garden AI</Text>
        <View style={styles.visualWrap}>
          <AutoBeforeAfter />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>Recreate Your Exteriors</Text>
          <Text style={styles.subtitle}>Easily design your garden.</Text>
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
    backgroundColor: '#f7f7f3',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1b1b1b',
    textAlign: 'center',
  },
  visualWrap: {
    marginTop: 22,
  },
  textWrap: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: '#101010',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: '#4f4f4f',
    textAlign: 'center',
  },
  buttonWrap: {
    marginTop: 'auto',
  },
});
