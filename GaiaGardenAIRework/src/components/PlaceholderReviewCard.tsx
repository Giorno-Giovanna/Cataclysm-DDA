import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';

export function PlaceholderReviewCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>App Store Review</Text>
      <Text style={styles.name}>Mia from Austin</Text>
      <Text style={styles.stars}>★★★★★</Text>
      <Text style={styles.quote}>“This app made it much easier to picture what my garden could look like.”</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADII.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    ...SHADOW.card,
  },
  eyebrow: {
    ...TYPE.eyebrow,
    color: COLORS.textLight,
  },
  name: {
    marginTop: 10,
    fontFamily: FONTS.display,
    fontSize: 24,
    color: COLORS.text,
  },
  stars: {
    marginTop: 6,
    color: COLORS.accent,
    letterSpacing: 2,
    fontSize: 16,
  },
  quote: {
    marginTop: 12,
    ...TYPE.body,
    color: COLORS.textSecondary,
  },
});
