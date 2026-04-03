import React, { ReactNode, useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';

export function DelayedFadeIn({
  children,
  delayMs = 1500,
  durationMs = 420,
  style,
}: {
  children: ReactNode;
  delayMs?: number;
  durationMs?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: durationMs,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [delayMs, durationMs, opacity]);

  return <Animated.View style={[style, { opacity }]}>{children}</Animated.View>;
}
