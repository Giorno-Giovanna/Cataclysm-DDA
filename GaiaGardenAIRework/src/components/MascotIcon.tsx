import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/theme';

export function MascotIcon({ size = 28 }: { size?: number }) {
  const leafWidth = size * 0.34;
  const leafHeight = size * 0.28;

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <View style={[styles.leafLeft, { width: leafWidth, height: leafHeight, borderRadius: 2 }]} />
      <View style={[styles.leafRight, { width: leafWidth * 1.05, height: leafHeight * 1.2, borderRadius: 2 }]} />
      <View style={[styles.face, { borderRadius: size * 0.12 }]}>
        <View style={styles.eyeRow}>
          <View style={styles.eye} />
          <View style={styles.eye} />
        </View>
        <View style={styles.mouth} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leafLeft: {
    position: 'absolute',
    top: 0,
    left: 1,
    backgroundColor: COLORS.accent,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    transform: [{ rotate: '-36deg' }],
    zIndex: 3,
  },
  leafRight: {
    position: 'absolute',
    top: -1,
    left: 12,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    transform: [{ rotate: '22deg' }],
    zIndex: 3,
  },
  face: {
    width: '88%',
    height: '78%',
    marginTop: '18%',
    backgroundColor: COLORS.surface,
    borderWidth: 3,
    borderColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeRow: {
    width: '58%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  eye: {
    width: 5,
    height: 5,
    backgroundColor: COLORS.secondary,
  },
  mouth: {
    width: 12,
    height: 6,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: COLORS.secondary,
    borderTopWidth: 0,
    marginTop: 5,
  },
});
