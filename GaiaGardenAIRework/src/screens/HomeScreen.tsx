import React, { useEffect, useRef, useState } from 'react';
import { Image, LayoutChangeEvent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GARDEN_PLACEHOLDERS } from '../constants/gardenPlaceholders';
import { BeforeAfterWipe } from '../components/BeforeAfterWipe';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';
import { GardenMode } from '../types';

const GAIA_MASCOT = require('../../assets/ui/gaiamascot.jpg');

const SECTIONS = [
  {
    key: 'garden-design',
    chip: 'Garden Design',
    title: 'AI Garden Design',
    subtitle: 'Choose a style. AI designs the garden.',
    kind: 'wipe',
    before: GARDEN_PLACEHOLDERS.path,
    after: GARDEN_PLACEHOLDERS.pool,
    onPress: 'normal' as GardenMode,
  },
  {
    key: 'add',
    chip: 'Add to My Garden',
    title: 'Add To My Garden',
    subtitle: 'Add a fire pit, lounge area, planter bed, or other new feature.',
    kind: 'image',
    image: GARDEN_PLACEHOLDERS.lounge,
    onPress: 'add' as GardenMode,
    starterPrompt: 'Add a fire pit and seating area near the center of the yard',
  },
  {
    key: 'style',
    chip: 'Style Reference',
    title: 'Style Reference',
    subtitle: 'Browse reference looks and apply that style to your yard.',
    kind: 'image',
    image: GARDEN_PLACEHOLDERS.courtyard,
    onPress: 'explore',
  },
  {
    key: 'planner',
    chip: 'Garden Planner',
    title: 'Garden Planner',
    subtitle: 'Snap a photo, get a weekly garden plan.',
    kind: 'image',
    image: GARDEN_PLACEHOLDERS.modern,
    badge: 'New',
    onPress: 'planner',
  },
  {
    key: 'create',
    chip: 'Create Garden',
    title: 'Create Garden',
    subtitle: 'Start from a text idea and shape the look you want.',
    kind: 'prompt',
    prompt: 'prompt: Create a modern BBQ area',
    onPress: 'create' as GardenMode,
    starterPrompt: 'Create a modern BBQ area with built-in seating and warm lighting',
  },
  {
    key: 'replace',
    chip: 'Replace/Remove',
    title: 'Replace/Remove Objects',
    subtitle: 'Target one part of the yard and swap it for a better option.',
    kind: 'image',
    image: GARDEN_PLACEHOLDERS.firepool,
    onPress: 'replace' as GardenMode,
    starterPrompt: 'Replace the current seating area with a cleaner modern lounge',
  },
  {
    key: 'drag',
    chip: 'Drag & Drop',
    title: 'Drag & Drop',
    subtitle: 'Build a layout with clear zones and movable pieces.',
    kind: 'image',
    image: GARDEN_PLACEHOLDERS.pergola,
    onPress: 'drag' as GardenMode,
    starterPrompt: 'Design a layout with a dining zone, lounge zone, and path',
  },
];

export function HomeScreen({ navigation }: any) {
  const [activeChip, setActiveChip] = useState(SECTIONS[0].key);
  const [offerSeconds, setOfferSeconds] = useState(191);
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const sectionOffsets = useRef<Record<string, number>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setOfferSeconds((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const onSectionLayout = (key: string) => (event: LayoutChangeEvent) => {
    sectionOffsets.current[key] = event.nativeEvent.layout.y;
  };

  const scrollToSection = (key: string) => {
    const y = sectionOffsets.current[key];
    if (typeof y === 'number') {
      scrollRef.current?.scrollTo({ y: Math.max(0, y - 6), animated: true });
      setActiveChip(key);
    }
  };

  const onScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y + 140;
    let currentKey = SECTIONS[0].key;

    for (const section of SECTIONS) {
      const top = sectionOffsets.current[section.key];
      if (typeof top === 'number' && y >= top) {
        currentKey = section.key;
      }
    }

    if (currentKey !== activeChip) {
      setActiveChip(currentKey);
    }
  };

  const handleCardPress = (section: (typeof SECTIONS)[number]) => {
    if (section.onPress === 'explore') {
      navigation.navigate('Explore');
      return;
    }

    if (section.onPress === 'planner') {
      navigation.navigate('GardenPlanner');
      return;
    }

    navigation.navigate('GardenDesign', { mode: section.onPress, starterPrompt: section.starterPrompt });
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.topShell, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerShell}>
          <Text style={styles.header}>Gaia</Text>
          <View style={styles.actions}>
            <Pressable style={styles.proButton} onPress={() => navigation.navigate('Paywall', { source: 'app' })}>
              <MaterialCommunityIcons name="leaf" size={14} color={COLORS.white} />
              <Text style={styles.proButtonText}>PRO</Text>
            </Pressable>
            <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Chat')}>
              <Image source={GAIA_MASCOT} style={styles.mascotButtonImage} resizeMode="contain" />
            </Pressable>
            <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
              <MaterialCommunityIcons name="cog-outline" size={24} color={COLORS.text} />
            </Pressable>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
          {SECTIONS.map((section) => (
            <Pressable
              key={section.key}
              onPress={() => scrollToSection(section.key)}
              style={[styles.filterChip, activeChip === section.key && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, activeChip === section.key && styles.filterTextActive]}>{section.chip}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: insets.bottom + 120, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {SECTIONS.map((section) => (
          <Pressable key={section.key} onLayout={onSectionLayout(section.key)} style={styles.card} onPress={() => handleCardPress(section)}>
            {section.kind === 'wipe' ? (
              <BeforeAfterWipe beforeSource={section.before!} afterSource={section.after!} height={252} borderRadius={0} sweepDurationMs={2500} />
            ) : section.kind === 'prompt' ? (
              <View style={styles.promptCard}>
                <View style={styles.promptBubble}>
                  <Text style={styles.promptText}>{section.prompt}</Text>
                </View>
              </View>
            ) : (
              <View>
                <Image source={section.image!} style={styles.singleImage} resizeMode="cover" />
                {section.badge ? (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>{section.badge}</Text>
                  </View>
                ) : null}
              </View>
            )}

            <View style={styles.cardFooter}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{section.title}</Text>
                <Text style={styles.cardSubtitle}>{section.subtitle}</Text>
              </View>
              <MaterialCommunityIcons name="arrow-right" size={24} color={COLORS.text} />
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable style={[styles.offerBadge, { top: insets.top + 264 }]} onPress={() => navigation.navigate('OneTimeOffer', { title: 'Exclusive Deal' })}>
        <View style={styles.offerTop}>
          <Text style={styles.offerPercent}>50%</Text>
          <Text style={styles.offerLabel}>OFF</Text>
        </View>
        <View style={styles.offerBottom}>
          <MaterialCommunityIcons name="timer-sand" size={12} color={COLORS.white} />
          <Text style={styles.offerTime}>
            {String(Math.floor(offerSeconds / 60)).padStart(2, '0')}:{String(offerSeconds % 60).padStart(2, '0')}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  topShell: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingBottom: 8,
    zIndex: 5,
  },
  headerShell: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  header: { fontFamily: FONTS.bodyBold, fontSize: 30, color: COLORS.text },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  proButton: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#2F6C3E', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 9 },
  proButtonText: { fontFamily: FONTS.bodyBold, color: COLORS.white, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8 },
  iconButton: { minWidth: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  mascotButtonImage: { width: 30, height: 30 },
  filtersRow: { gap: 10, paddingTop: 14, paddingRight: 12 },
  filterChip: { borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#E5E5E5' },
  filterChipActive: { backgroundColor: '#2F6C3E', borderColor: '#2F6C3E' },
  filterText: { color: COLORS.textSecondary, fontFamily: FONTS.bodyBold, fontSize: 14 },
  filterTextActive: { color: COLORS.white },
  scroll: { flex: 1 },
  card: { overflow: 'hidden', borderRadius: RADII.lg, backgroundColor: COLORS.surface, marginBottom: 18, borderWidth: 1, borderColor: COLORS.border, ...SHADOW.card },
  singleImage: { width: '100%', height: 240 },
  promptCard: { width: '100%', height: 240, backgroundColor: COLORS.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  promptBubble: { backgroundColor: COLORS.textLight, borderRadius: RADII.sm, paddingHorizontal: 18, paddingVertical: 16, minWidth: '72%' },
  promptText: { color: COLORS.white, fontFamily: FONTS.body, fontSize: 16, textAlign: 'center' },
  newBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: '#4F7B55', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  newBadgeText: { color: COLORS.white, fontSize: 12, fontFamily: FONTS.bodyBold },
  cardFooter: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 10 },
  cardTitle: { fontFamily: FONTS.bodyBold, fontSize: 16, color: COLORS.text },
  cardSubtitle: { marginTop: 4, ...TYPE.body, color: COLORS.textLight, fontSize: 14, lineHeight: 20 },
  offerBadge: { position: 'absolute', right: 14, width: 66, alignItems: 'center', zIndex: 8 },
  offerTop: { width: '100%', backgroundColor: '#FF6436', borderRadius: 20, paddingTop: 8, paddingBottom: 6, alignItems: 'center', ...SHADOW.card },
  offerPercent: { color: COLORS.white, fontFamily: FONTS.bodyBold, fontSize: 24, lineHeight: 24 },
  offerLabel: { color: COLORS.white, fontFamily: FONTS.bodyBold, fontSize: 14, lineHeight: 14 },
  offerBottom: { marginTop: 2, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F05B2B', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4 },
  offerTime: { color: COLORS.white, fontFamily: FONTS.bodyBold, fontSize: 11 },
});
