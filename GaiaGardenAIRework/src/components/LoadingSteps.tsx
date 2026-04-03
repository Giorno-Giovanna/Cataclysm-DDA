import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, RADII, TYPE } from '../constants/theme';

const steps = ['Reading your garden photo', 'Building the layout', 'Adding plants and features', 'Rendering your new design'];

export function LoadingSteps() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((current) => (current + 1) % steps.length), 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.wrap}>
      {steps.map((step, index) => (
        <View key={step} style={[styles.row, index <= idx && styles.rowActive]}>
          <View style={[styles.dot, index <= idx && styles.dotActive]} />
          <Text style={[styles.text, index <= idx && styles.textActive]}>{step}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: RADII.sm,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  rowActive: {
    backgroundColor: COLORS.surface,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.border,
    transform: [{ rotate: '45deg' }],
  },
  dotActive: {
    backgroundColor: COLORS.primary,
  },
  text: {
    ...TYPE.body,
    color: COLORS.textLight,
  },
  textActive: {
    color: COLORS.text,
    fontFamily: FONTS.bodyBold,
  },
});
