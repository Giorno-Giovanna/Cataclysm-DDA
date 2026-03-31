import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

function Col({ delay = 0 }: { delay?: number }) {
  const y = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const a = Animated.loop(Animated.sequence([
      Animated.timing(y, { toValue: -140, duration: 5000 + delay, useNativeDriver: true }),
      Animated.timing(y, { toValue: 0, duration: 0, useNativeDriver: true }),
    ]));
    a.start();
    return () => a.stop();
  }, [delay, y]);
  return <Animated.View style={{ transform: [{ translateY: y }] }}>{[...Array(4)].map((_, i) => <View key={i} style={styles.card}><Text>Placeholder Garden Visual</Text></View>)}</Animated.View>;
}

export function MasonryHeroColumns() {
  return <View style={styles.row}><Col /><Col delay={900} /><Col delay={1400} /></View>;
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, height: 330 },
  card: { height: 110, marginBottom: 8, borderRadius: 16, backgroundColor: '#dcebd8', justifyContent: 'center', alignItems: 'center', width: 112 },
});
