import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function PrimaryButton({ title, onPress, disabled }: { title: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [styles.wrap, pressed && { opacity: 0.9 }, disabled && { opacity: 0.4 }]}>
      <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.btn}>
        <Text style={styles.txt}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  btn: { borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  txt: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
