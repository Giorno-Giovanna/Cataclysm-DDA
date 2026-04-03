import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';

export function PrimaryButton({ title, onPress, disabled }: { title: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.wrap, pressed && styles.wrapPressed, disabled && styles.wrapDisabled]}
    >
      <View style={styles.btn}>
        <Text style={styles.txt}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    ...SHADOW.card,
  },
  wrapPressed: {
    opacity: 0.92,
    transform: [{ translateY: 1 }],
  },
  wrapDisabled: {
    opacity: 0.45,
  },
  btn: {
    minHeight: 58,
    borderRadius: RADII.md,
    backgroundColor: '#2F6C3E',
    borderWidth: 1,
    borderColor: '#265834',
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    ...TYPE.body,
    color: COLORS.white,
    fontFamily: FONTS.bodyBold,
    fontSize: 15,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
