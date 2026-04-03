import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { ONBOARDING_IMAGES } from '../constants/onboardingImages';

export type FeatureCarouselSlide = {
  title: string;
  subtitle: string;
  labelA: string;
  labelB: string;
  primary: ImageSourcePropType;
  secondary?: ImageSourcePropType;
  iconText: string;
};

const DEFAULT_SLIDES: FeatureCarouselSlide[] = [
  {
    title: 'Edit anything, your way',
    subtitle: 'Redesign anything in seconds. Full flexibility at your fingertips.',
    labelA: 'Outdoor decor',
    labelB: 'Remove & Replace',
    primary: ONBOARDING_IMAGES[4],
    secondary: ONBOARDING_IMAGES[0],
    iconText: '><',
  },
  {
    title: 'Design with Drag & Drop',
    subtitle: 'Rearrange plants and decor with ready-made assets.',
    labelA: 'Ready assets',
    labelB: 'Drag & Drop',
    primary: ONBOARDING_IMAGES[5],
    iconText: '|||',
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
  const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    onIndexChange?.(activeIndex);
  }, [activeIndex, onIndexChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fade, { toValue: 0, duration: 220, useNativeDriver: true }),
        Animated.timing(fade, { toValue: 1, duration: 260, useNativeDriver: true }),
      ]).start();
      setActiveIndex((current) => (current + 1) % sourceSlides.length);
    }, 2600);

    return () => clearInterval(interval);
  }, [fade, sourceSlides.length]);

  const activeSlide = sourceSlides[activeIndex];

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.card, { opacity: fade }]}>
        <Image source={activeSlide.primary} style={styles.image} resizeMode="cover" />
        {activeSlide.secondary ? (
          <>
            <View style={styles.secondaryMask}>
              <Image source={activeSlide.secondary} style={styles.image} resizeMode="cover" />
            </View>
            <View style={styles.splitDivider} />
          </>
        ) : null}
        <Text style={styles.tagA}>{activeSlide.labelA}</Text>
        <Text style={styles.tagB}>{activeSlide.labelB}</Text>
        <View style={styles.iconBadge}>
          <Text style={styles.iconText}>{activeSlide.iconText}</Text>
        </View>
      </Animated.View>
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
    width: '100%',
    height: 360,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#dce4d8',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  secondaryMask: {
    ...StyleSheet.absoluteFillObject,
    width: '52%',
    overflow: 'hidden',
  },
  splitDivider: {
    position: 'absolute',
    left: '52%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  tagA: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    color: '#505050',
    fontWeight: '700',
    fontSize: 15,
  },
  tagB: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    color: '#505050',
    fontWeight: '700',
    fontSize: 15,
  },
  iconBadge: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#444',
    fontSize: 16,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cfcfcf',
  },
  activeDot: {
    width: 22,
    borderRadius: 999,
    backgroundColor: '#2e7d32',
  },
});
