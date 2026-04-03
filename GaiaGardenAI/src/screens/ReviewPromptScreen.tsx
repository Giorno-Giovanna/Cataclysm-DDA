import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlaceholderReviewCard } from '../components/PlaceholderReviewCard';
import { PrimaryButton } from '../components/PrimaryButton';

export function ReviewPromptScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}>
      <Text style={styles.heart}>+</Text>
      <Text style={styles.heading}>Help Us Grow</Text>
      <Text style={styles.subheading}>Show your love by giving us a review on the App Store.</Text>
      <PlaceholderReviewCard />
      <View style={styles.buttonWrap}>
        <PrimaryButton title="Continue" onPress={() => navigation.replace('Paywall', { source: 'onboarding' })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f3',
    gap: 12,
  },
  heart: {
    fontSize: 56,
  },
  heading: {
    fontSize: 36,
    fontWeight: '800',
    color: '#111',
  },
  subheading: {
    color: '#666',
    fontSize: 16,
    lineHeight: 23,
  },
  buttonWrap: {
    marginTop: 'auto',
  },
});
