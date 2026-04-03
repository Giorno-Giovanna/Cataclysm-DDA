import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GARDEN_PLACEHOLDERS } from '../constants/gardenPlaceholders';
import { BeforeAfterWipe } from '../components/BeforeAfterWipe';

const GAIA_MASCOT = require('../../assets/ui/gaiamascot.jpg');
const SETTINGS_GEAR = require('../../assets/ui/settingsgear.jpg');

const FILTERS = ['Garden Design', 'Add to My Garden', 'Style Reference'];

const cards = [
  {
    title: 'AI Garden Design',
    subtitle: 'Choose a style. AI designs the garden',
    before: GARDEN_PLACEHOLDERS.path,
    after: GARDEN_PLACEHOLDERS.pool,
    onPress: 'normal',
  },
  {
    title: 'Add to My Garden',
    subtitle: 'Add furniture, decor, or features to your space',
    single: GARDEN_PLACEHOLDERS.pergola,
    onPress: 'add',
  },
  {
    title: 'Style Reference',
    subtitle: 'Browse inspiration for your next redesign',
    single: GARDEN_PLACEHOLDERS.sunset,
    onPress: 'explore',
  },
];

export function HomeScreen({ navigation }: any) {
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 28, paddingHorizontal: 14 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <Text style={styles.header}>Garden AI</Text>
        <View style={styles.actions}>
          <Pressable style={styles.proButton} onPress={() => navigation.navigate('Paywall', { source: 'app' })}>
            <Ionicons name="star" size={11} color="#fff" />
            <Text style={styles.proButtonText}>PRO</Text>
          </Pressable>
          <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Chat')}>
            <Image source={GAIA_MASCOT} style={styles.mascotButtonImage} resizeMode="cover" />
          </Pressable>
          <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
            <Image source={SETTINGS_GEAR} style={styles.settingsButtonImage} resizeMode="contain" />
          </Pressable>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
        {FILTERS.map((filter) => (
          <Pressable
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[styles.filterChip, selectedFilter === filter && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>{filter}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {cards.map((card) => (
        <Pressable
          key={card.title}
          style={styles.card}
          onPress={() => {
            if (card.onPress === 'explore') {
              navigation.navigate('Explore');
            } else {
              navigation.navigate('GardenDesign', { mode: card.onPress });
            }
          }}
        >
          {card.before && card.after ? (
            <BeforeAfterWipe
              beforeSource={card.before}
              afterSource={card.after}
              height={240}
              borderRadius={0}
              sweepDurationMs={2500}
              centerPauseMs={300}
            />
          ) : (
            <Image source={card.single} style={styles.singleImage} resizeMode="cover" />
          )}

          <View style={styles.cardFooter}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            </View>
            <Ionicons name="arrow-forward" size={24} color="#1a1a1a" />
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7f7f3',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 34,
    fontWeight: '900',
    color: '#121212',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  proButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2f6837',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  proButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotButtonImage: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
  },
  settingsButtonImage: {
    width: 23,
    height: 23,
  },
  filtersRow: {
    paddingTop: 16,
    paddingBottom: 14,
    gap: 10,
  },
  filterChip: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f0efec',
    borderWidth: 1,
    borderColor: '#dfddd8',
  },
  filterChipActive: {
    backgroundColor: '#2f6837',
    borderColor: '#2f6837',
  },
  filterText: {
    color: '#565656',
    fontSize: 15,
    fontWeight: '700',
  },
  filterTextActive: {
    color: '#fff',
  },
  card: {
    overflow: 'hidden',
    borderRadius: 24,
    backgroundColor: '#fff',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  singleImage: {
    width: '100%',
    height: 230,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#202020',
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: '#7a7a7a',
  },
});
