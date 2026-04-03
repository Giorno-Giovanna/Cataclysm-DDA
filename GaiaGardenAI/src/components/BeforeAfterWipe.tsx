import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, ImageSourcePropType, LayoutChangeEvent, StyleSheet, View } from 'react-native';

type BeforeAfterWipeProps = {
  beforeSource: ImageSourcePropType;
  afterSource: ImageSourcePropType;
  height: number;
  borderRadius?: number;
  sweepDurationMs?: number;
  centerPauseMs?: number;
};

export function BeforeAfterWipe({
  beforeSource,
  afterSource,
  height,
  borderRadius = 28,
  sweepDurationMs = 2500,
  centerPauseMs = 300,
}: BeforeAfterWipeProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    progress.stopAnimation();
    progress.setValue(0);

    const halfDuration = Math.max(0, (sweepDurationMs - centerPauseMs) / 2);
    const buildSweep = (end: number) =>
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 0.5,
          duration: halfDuration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.delay(centerPauseMs),
        Animated.timing(progress, {
          toValue: end,
          duration: halfDuration,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: false,
        }),
      ]);

    const animation = Animated.loop(
      Animated.sequence([
        buildSweep(1),
        Animated.timing(progress, {
          toValue: 0.5,
          duration: halfDuration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.delay(centerPauseMs),
        Animated.timing(progress, {
          toValue: 0,
          duration: halfDuration,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [centerPauseMs, progress, sweepDurationMs]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const nextWidth = event.nativeEvent.layout.width;
    if (nextWidth !== cardWidth) {
      setCardWidth(nextWidth);
    }
  };

  const revealWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, cardWidth],
  });

  const lineTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, cardWidth],
  });

  const fullImageStyle = cardWidth > 0 ? { width: cardWidth } : null;

  return (
    <View style={[styles.card, { height, borderRadius }]} onLayout={handleLayout}>
      <Image source={beforeSource} style={styles.image} resizeMode="cover" />
      <Animated.View style={[styles.revealMask, { width: revealWidth }]}>
        <Image source={afterSource} style={[styles.clippedImage, fullImageStyle]} resizeMode="cover" />
      </Animated.View>
      {cardWidth > 0 ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.divider,
            {
              transform: [{ translateX: Animated.subtract(lineTranslateX, 1) }],
            },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#dfe5da',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.09,
    shadowRadius: 20,
    elevation: 6,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  clippedImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    height: '100%',
  },
  revealMask: {
    ...StyleSheet.absoluteFillObject,
    left: 0,
    overflow: 'hidden',
  },
  divider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
  },
});
