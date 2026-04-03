import React from 'react';
import { StyleSheet, View } from 'react-native';

export function MascotIcon({ size = 28 }: { size?: number }) {
  const leafWidth = size * 0.34;
  const leafHeight = size * 0.28;

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <View style={[styles.leafLeft, { width: leafWidth, height: leafHeight, borderRadius: leafHeight }]} />
      <View style={[styles.leafRight, { width: leafWidth * 1.05, height: leafHeight * 1.2, borderRadius: leafHeight }]} />
      <View style={[styles.face, { borderRadius: size * 0.34 }]}>
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
    top: 1,
    left: 2,
    backgroundColor: '#87d56f',
    borderWidth: 2,
    borderColor: '#275f37',
    transform: [{ rotate: '-38deg' }],
    zIndex: 3,
  },
  leafRight: {
    position: 'absolute',
    top: -1,
    left: 12,
    backgroundColor: '#9ae37d',
    borderWidth: 2,
    borderColor: '#275f37',
    transform: [{ rotate: '22deg' }],
    zIndex: 3,
  },
  face: {
    width: '88%',
    height: '78%',
    marginTop: '18%',
    backgroundColor: '#edf9df',
    borderWidth: 3,
    borderColor: '#275f37',
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
    borderRadius: 3,
    backgroundColor: '#122816',
  },
  mouth: {
    width: 12,
    height: 6,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: '#122816',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 5,
  },
});
