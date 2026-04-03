import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { storage } from '../services/storage';
import { DesignHistoryItem } from '../types';

export function HistoryScreen() {
  const [items, setItems] = useState<DesignHistoryItem[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const interval = setInterval(() => {
      storage.getJSON<DesignHistoryItem[]>(storage.keys.history, []).then(setItems);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!items.length) {
    return (
      <View style={[styles.emptyState, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
        <Text style={styles.emptyTitle}>No designs yet</Text>
        <Text style={styles.emptySubtitle}>Your saved garden designs will appear here</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 28, paddingHorizontal: 16 }}
    >
      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.styleName}</Text>
          <Text style={styles.cardMeta}>{new Date(item.createdAt).toLocaleString()}</Text>
          <Text style={styles.cardBody}>{item.customPrompt}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7f7f3',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f3',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  emptySubtitle: {
    marginTop: 6,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  cardMeta: {
    marginTop: 4,
    color: '#666',
    fontSize: 13,
  },
  cardBody: {
    marginTop: 8,
    color: '#333',
  },
});
