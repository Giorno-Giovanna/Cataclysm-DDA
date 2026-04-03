import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, ImageSourcePropType, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { COLORS, SHADOW } from '../constants/theme';

type BeforeAfterWipeProps = {
  beforeSource: ImageSourcePropType;
  afterSource: ImageSourcePropType;
  height: number;
  borderRadius?: number;
  sweepDurationMs?: number;
};

export function BeforeAfterWipe({
  beforeSource,
  afterSource,
  height,
  borderRadius = 28,
  sweepDurationMs = 2500,
}: BeforeAfterWipeProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    progress.stopAnimation();
    progress.setValue(0);
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: sweepDurationMs,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: sweepDurationMs,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [progress, sweepDurationMs]);

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
    backgroundColor: COLORS.surface,
    ...SHADOW.soft,
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
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
  },
});
