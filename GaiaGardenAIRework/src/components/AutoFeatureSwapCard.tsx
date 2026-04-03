import React, { useMemo, useState } from 'react';
import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { ONBOARDING_IMAGES } from '../constants/onboardingImages';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';

export type FeatureCarouselSlide = {
  title: string;
  subtitle: string;
  labelA: string;
  labelB: string;
  primary: ImageSourcePropType;
  secondary?: ImageSourcePropType;
};

const DEFAULT_SLIDES: FeatureCarouselSlide[] = [
  {
    title: 'Edit anything, your way',
    subtitle: 'Redesign anything in seconds. Full flexibility at your fingertips.',
    labelA: 'Outdoor decor',
    labelB: 'Remove & Replace',
    primary: ONBOARDING_IMAGES[4],
    secondary: ONBOARDING_IMAGES[0],
  },
  {
    title: 'Design with Drag & Drop',
    subtitle: 'Rearrange plants and decor with ready-made assets.',
    labelA: 'Ready assets',
    labelB: 'Drag & Drop',
    primary: ONBOARDING_IMAGES[5],
  },
];

export function AutoFeatureSwapCard({
  slides = DEFAULT_SLIDES,
  onIndexChange,
}: {
  slides?: FeatureCarouselSlide[];
  onIndexChange?: (index: number) => void;
}) {
  const sourceSlides = useMemo(() => slides, [slides]);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={sourceSlides}
        horizontal
        pagingEnabled
        keyExtractor={(_, index) => String(index)}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const nextIndex = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
          setActiveIndex(nextIndex);
          onIndexChange?.(nextIndex);
        }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.primary} style={styles.image} resizeMode="cover" />
            <View style={styles.tagTop}>
              <Text style={styles.tagText}>{item.labelA}</Text>
            </View>
            <View style={styles.tagBottom}>
              <Text style={styles.tagText}>{item.labelB}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.dots}>
        {sourceSlides.map((_, index) => (
          <View key={index} style={[styles.dot, index === activeIndex && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 16,
  },
  card: {
    width: 360,
    height: 360,
    borderRadius: RADII.xl,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    ...SHADOW.card,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tagTop: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: COLORS.surface,
    borderRadius: RADII.sm,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  tagBottom: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    backgroundColor: COLORS.surfaceDark,
    borderRadius: RADII.sm,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  tagText: {
    ...TYPE.meta,
    color: COLORS.text,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: COLORS.border,
  },
  activeDot: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
});
