import React, { useRef, useState } from 'react';
import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DelayedFadeIn } from '../components/DelayedFadeIn';
import { PrimaryButton } from '../components/PrimaryButton';
import { GARDEN_PLACEHOLDERS } from '../constants/gardenPlaceholders';

type PanelSlide = {
  key: 'edit' | 'design';
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  label: string;
};

const panelSlides: PanelSlide[] = [
  {
    key: 'edit',
    title: 'Edit anything, your way',
    subtitle: 'Redesign anything in seconds. Full flexibility at your fingertips.',
    image: GARDEN_PLACEHOLDERS.pool,
    label: 'Remove & Replace',
  },
  {
    key: 'design',
    title: 'Design with Drag & Drop',
    subtitle: 'Rearrange plants and decor with ready-made assets.',
    image: GARDEN_PLACEHOLDERS.pergola,
    label: 'Drag & Drop',
  },
];

export function OnboardingDesignEditScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const panelWidth = width - 32;
  const ref = useRef<FlatList>(null);
  const activeSlide = panelSlides[activeIndex];

  return (
    <View style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 10 }]}>
        <Text style={styles.brandTitle}>Garden AI</Text>
        <View style={styles.panelWrap}>
          <FlatList
            ref={ref}
            data={panelSlides}
            horizontal
            pagingEnabled
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={[styles.card, { width: panelWidth }]}>
                <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.label}</Text>
                </View>
              </View>
            )}
            getItemLayout={(_, index) => ({
              length: panelWidth,
              offset: panelWidth * index,
              index,
            })}
            onMomentumScrollEnd={(event) => {
              const nextIndex = Math.round(event.nativeEvent.contentOffset.x / panelWidth);
              setActiveIndex(nextIndex);
            }}
          />
          <View style={styles.pageDots}>
            {panelSlides.map((_, index) => (
              <View key={index} style={[styles.pageDot, index === activeIndex && styles.pageDotActive]} />
            ))}
          </View>
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{activeSlide.title}</Text>
          <Text style={styles.subtitle}>{activeSlide.subtitle}</Text>
        </View>
        <DelayedFadeIn style={styles.buttonWrap}>
          <PrimaryButton title="Continue" onPress={() => navigation.replace('MainTabs')} />
        </DelayedFadeIn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f3',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1b1b1b',
    textAlign: 'center',
  },
  panelWrap: {
    marginTop: 22,
    alignItems: 'center',
  },
  card: {
    height: 420,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#dfe5da',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 22,
    elevation: 7,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  tag: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  tagText: {
    color: '#4d4d4d',
    fontSize: 14,
    fontWeight: '700',
  },
  pageDots: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
  },
  pageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d6d6d6',
  },
  pageDotActive: {
    width: 22,
    borderRadius: 999,
    backgroundColor: '#2e7d32',
  },
  textWrap: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: '#101010',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: '#4f4f4f',
    textAlign: 'center',
  },
  buttonWrap: {
    marginTop: 'auto',
  },
});
