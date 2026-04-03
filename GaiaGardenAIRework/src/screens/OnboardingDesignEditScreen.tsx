import React, { useRef, useState } from 'react';
import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DelayedFadeIn } from '../components/DelayedFadeIn';
import { PrimaryButton } from '../components/PrimaryButton';
import { GARDEN_PLACEHOLDERS } from '../constants/gardenPlaceholders';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';

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
    image: GARDEN_PLACEHOLDERS.firepool,
    label: 'Remove & Replace',
  },
  {
    key: 'design',
    title: 'Design with Drag & Drop',
    subtitle: 'Rearrange plants and decor with ready-made assets.',
    image: GARDEN_PLACEHOLDERS.lounge,
    label: 'Drag & Drop',
  },
];

export function OnboardingDesignEditScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const panelWidth = width - 36;
  const activeSlide = panelSlides[activeIndex];
  const listRef = useRef<FlatList>(null);

  const handleContinue = () => {
    if (activeIndex === 0) {
      listRef.current?.scrollToIndex({ index: 1, animated: true });
      setActiveIndex(1);
      return;
    }
    navigation.replace('ReviewPrompt');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 14 }]}>
        <Text style={styles.kicker}>More Tools</Text>
        <View style={styles.panelWrap}>
          <FlatList
            ref={listRef}
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
          <Text style={styles.title}>{activeSlide.key === 'edit' ? 'Change anything, your way' : 'Plan with drag and drop'}</Text>
          <Text style={styles.subtitle}>{activeSlide.key === 'edit' ? 'Quickly swap or update parts of your garden.' : 'Move items around and build the layout you want.'}</Text>
        </View>
        <DelayedFadeIn style={styles.buttonWrap}>
          <PrimaryButton title="Continue" onPress={handleContinue} />
        </DelayedFadeIn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
  },
  kicker: {
    ...TYPE.eyebrow,
    color: COLORS.primary,
  },
  panelWrap: {
    marginTop: 16,
    alignItems: 'center',
  },
  card: {
    height: 430,
    borderRadius: RADII.panel,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.soft,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  tag: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    backgroundColor: COLORS.surfaceDark,
    borderRadius: RADII.sm,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tagText: {
    ...TYPE.meta,
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  pageDots: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  pageDot: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.border,
    borderRadius: 2,
  },
  pageDotActive: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  textWrap: {
    paddingTop: 24,
    gap: 10,
  },
  title: {
    fontFamily: FONTS.display,
    fontSize: 32,
    color: COLORS.text,
  },
  subtitle: {
    ...TYPE.body,
    color: COLORS.textSecondary,
  },
  buttonWrap: {
    marginTop: 'auto',
  },
});
