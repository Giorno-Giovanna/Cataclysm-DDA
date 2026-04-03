import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Image, ImageSourcePropType, StyleSheet, useWindowDimensions, View } from 'react-native';
import { ONBOARDING_IMAGES } from '../constants/onboardingImages';
import { RADII } from '../constants/theme';

const COLUMN_GAP = 12;
const CARD_GAP = 12;
const COLUMN_IMAGE_INDEXES = [
  [0, 3, 6, 9],
  [1, 4, 7, 2],
  [5, 8, 0, 3],
];

const HEIGHT_VARIANTS = [
  [180, 210, 168, 198],
  [212, 170, 204, 176],
  [194, 182, 214, 170],
];

function AnimatedColumn({
  images,
  heights,
  width,
  direction,
  duration,
  topOffset = 0,
}: {
  images: ImageSourcePropType[];
  heights: number[];
  width: number;
  direction: 'up' | 'down';
  duration: number;
  topOffset?: number;
}) {
  const travel = heights.reduce((sum, height) => sum + height, 0) + CARD_GAP * heights.length;
  const translateY = useRef(new Animated.Value(direction === 'up' ? 0 : -travel)).current;
  const repeatedImages = useMemo(() => [...images, ...images], [images]);
  const repeatedHeights = useMemo(() => [...heights, ...heights], [heights]);

  useEffect(() => {
    translateY.setValue(direction === 'up' ? 0 : -travel);

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: direction === 'up' ? -travel : 0,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: direction === 'up' ? 0 : -travel,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [direction, duration, travel, translateY]);

  return (
    <View style={[styles.columnViewport, { width, marginTop: topOffset }]}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {repeatedImages.map((image, index) => (
          <View
            key={`${direction}-${index}`}
            style={[
              styles.card,
              {
                width,
                height: repeatedHeights[index],
                marginBottom: CARD_GAP,
              },
            ]}
          >
            <Image source={image} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

export function MasonryHeroColumns() {
  const { width: screenWidth } = useWindowDimensions();
  const contentWidth = screenWidth - 56;
  const columnWidth = (contentWidth - COLUMN_GAP * 2) / 3;
  const columns = COLUMN_IMAGE_INDEXES.map((indexes) => indexes.map((imageIndex) => ONBOARDING_IMAGES[imageIndex]));

  return (
    <View style={styles.container}>
      <AnimatedColumn images={columns[0]} heights={HEIGHT_VARIANTS[0]} width={columnWidth} direction="up" duration={22000} topOffset={20} />
      <AnimatedColumn images={columns[1]} heights={HEIGHT_VARIANTS[1]} width={columnWidth} direction="down" duration={19000} />
      <AnimatedColumn images={columns[2]} heights={HEIGHT_VARIANTS[2]} width={columnWidth} direction="up" duration={21000} topOffset={28} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: COLUMN_GAP,
    overflow: 'hidden',
    paddingTop: 18,
  },
  columnViewport: {
    flex: 1,
    overflow: 'hidden',
  },
  card: {
    borderRadius: RADII.lg,
    overflow: 'hidden',
    backgroundColor: '#d8dfd4',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
