import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORIES } from '../constants/categories';
import { GARDEN_STYLES, TRENDS } from '../constants/copy';

export function ExploreScreen() {
  const [selected, setSelected] = useState('All');
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 28, paddingHorizontal: 16 }}
    >
      <Text style={styles.header}>Gaia AI</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stylesRow}>
        {GARDEN_STYLES.map((style) => (
          <View key={style.id} style={styles.styleItem}>
            <View style={styles.styleIcon}>
              <Text>{style.emoji}</Text>
            </View>
            <Text style={styles.styleLabel}>{style.name}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Discover Trends</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendsRow}>
        {TRENDS.map((trend) => (
          <View key={trend} style={styles.trendCard}>
            <Text>{trend}</Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
        {CATEGORIES.map((category) => (
          <Text
            key={category}
            onPress={() => setSelected(category)}
            style={[styles.categoryChip, selected === category && styles.categoryChipActive]}
          >
            {category}
          </Text>
        ))}
      </ScrollView>

      <View style={styles.grid}>
        {[...Array(10)].map((_, index) => (
          <View key={index} style={styles.gridCard}>
            <Text>Placeholder Trend Card</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7f7f3',
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
  },
  stylesRow: {
    paddingVertical: 12,
    gap: 14,
  },
  styleItem: {
    alignItems: 'center',
  },
  styleIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#dcebd8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleLabel: {
    marginTop: 6,
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  trendsRow: {
    paddingVertical: 10,
    gap: 10,
  },
  trendCard: {
    width: 220,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#cfe2ca',
    padding: 10,
    justifyContent: 'flex-end',
  },
  categoriesRow: {
    paddingVertical: 6,
    gap: 8,
  },
  categoryChip: {
    backgroundColor: '#fff',
    color: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryChipActive: {
    backgroundColor: '#2e7d32',
    color: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 8,
  },
  gridCard: {
    width: '48%',
    height: 120,
    backgroundColor: '#dcebd8',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
