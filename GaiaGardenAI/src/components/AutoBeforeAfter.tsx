import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export function AutoBeforeAfter() {
  const x = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(x, { toValue: 0.82, duration: 2400, useNativeDriver: false }),
        Animated.timing(x, { toValue: 0.18, duration: 2400, useNativeDriver: false }),
      ]),
    ).start();
  }, [x]);
  const leftW = x.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  return (
    <View style={styles.box}>
      <View style={[styles.side, { backgroundColor: '#d7e7d3' }]}><Text>Placeholder Before</Text></View>
      <Animated.View style={[styles.afterMask, { width: leftW }]}><View style={[styles.side, { backgroundColor: '#b9dab5' }]}><Text>Placeholder After</Text></View></Animated.View>
      <Animated.View style={[styles.line, { left: leftW }]} />
    </View>
  );
}
const styles = StyleSheet.create({
  box: { height: 340, borderRadius: 24, overflow: 'hidden', backgroundColor: '#eee' },
  side: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  afterMask: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  line: { position: 'absolute', top: 0, bottom: 0, width: 2, backgroundColor: '#fff' },
});
