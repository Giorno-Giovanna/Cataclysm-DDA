import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export function AutoFeatureSwapCard({ labelA, labelB, alt }: { labelA: string; labelB: string; alt?: boolean }) {
  const o = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(o, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.timing(o, { toValue: 0.3, duration: 1200, useNativeDriver: true }),
    ])).start();
  }, [o]);
  return <View style={styles.box}><View style={[styles.bg, { backgroundColor: alt ? '#c9dfc5' : '#dcebd8' }]}><Text>Placeholder Garden Visual</Text></View><Animated.View style={[styles.overlay,{opacity:o}]} /><Text style={styles.tagA}>{labelA}</Text><Text style={styles.tagB}>{labelB}</Text></View>;
}
const styles = StyleSheet.create({
  box: { height: 330, borderRadius: 24, overflow: 'hidden' },
  bg: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.3)' },
  tagA: { position: 'absolute', top: 12, left: 12, backgroundColor: '#fff', padding: 6, borderRadius: 10 },
  tagB: { position: 'absolute', bottom: 12, right: 12, backgroundColor: '#fff', padding: 6, borderRadius: 10 },
});
