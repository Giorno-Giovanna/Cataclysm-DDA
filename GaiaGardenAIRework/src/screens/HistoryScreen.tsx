import React, { useCallback, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { storage } from '../services/storage';
import { DesignHistoryItem, PlannerPlan } from '../types';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';

export function HistoryScreen({ navigation }: any) {
  const [items, setItems] = useState<DesignHistoryItem[]>([]);
  const [plans, setPlans] = useState<PlannerPlan[]>([]);
  const insets = useSafeAreaInsets();

  const load = useCallback(() => {
    storage.getJSON<DesignHistoryItem[]>(storage.keys.history, []).then(setItems);
    storage.getJSON<PlannerPlan[]>(storage.keys.plannerPlans, []).then(setPlans);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  if (!items.length && !plans.length) {
    return (
      <View style={[styles.emptyState, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 110 }]}>
        <Text style={styles.emptyKicker}>Archive</Text>
        <Text style={styles.emptyTitle}>No saved designs yet</Text>
        <Text style={styles.emptySubtitle}>Saved designs and planner notes will show up here once you start building ideas.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: insets.bottom + 110, paddingHorizontal: 16, gap: 14 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.emptyKicker}>Archive</Text>
      <Text style={styles.emptyTitle}>Saved designs</Text>
      {plans.length ? (
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Planner notes</Text>
          {plans.map((plan) => (
            <View key={plan.id} style={styles.planCard}>
              <Text style={styles.cardTitle}>
                {plan.yardType} · {plan.goal}
              </Text>
              <Text style={styles.cardMeta}>{new Date(plan.createdAt).toLocaleString()}</Text>
              {plan.items.slice(0, 2).map((item) => (
                <Text key={item.id} style={styles.planBullet}>
                  • {item.title}: {item.detail}
                </Text>
              ))}
              <Pressable
                style={styles.actionRow}
                onPress={() =>
                  navigation.navigate('GardenDesign', {
                    mode: 'create',
                    starterPrompt: `${plan.goal.toLowerCase()} ${plan.yardType.toLowerCase()} for a ${plan.climate.toLowerCase()} climate`,
                  })
                }
              >
                <Text style={styles.linkText}>Use In Design</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}

      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.resultImageUri || item.originalImageUri }} style={styles.previewImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.styleName}</Text>
            <Text style={styles.cardMeta}>{new Date(item.createdAt).toLocaleString()}</Text>
            <Text style={styles.cardBody}>{item.customPrompt || 'No custom note added.'}</Text>
            <View style={styles.cardActions}>
              <Pressable
                style={styles.actionRow}
                onPress={() =>
                  navigation.navigate('GardenDesign', {
                    mode: 'create',
                    selectedStyleId: item.styleId,
                    starterPrompt: item.customPrompt,
                  })
                }
              >
                <Text style={styles.linkText}>Use Again</Text>
              </Pressable>
              <Pressable style={styles.iconAction} onPress={() => storage.removeHistory(item.id)}>
                <MaterialCommunityIcons name="trash-can-outline" size={18} color={COLORS.danger} />
              </Pressable>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  emptyState: { flex: 1, justifyContent: 'center', backgroundColor: COLORS.background, paddingHorizontal: 24 },
  emptyKicker: { ...TYPE.eyebrow, color: COLORS.primary },
  emptyTitle: { marginTop: 8, fontFamily: FONTS.display, fontSize: 34, color: COLORS.text },
  emptySubtitle: { marginTop: 10, ...TYPE.body, color: COLORS.textSecondary },
  sectionBlock: { gap: 12, marginBottom: 6 },
  sectionTitle: { fontFamily: FONTS.display, fontSize: 26, color: COLORS.text },
  planCard: { padding: 18, borderRadius: RADII.lg, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, ...SHADOW.card },
  card: { borderRadius: RADII.lg, overflow: 'hidden', backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, ...SHADOW.card },
  previewImage: { width: '100%', height: 168 },
  cardContent: { padding: 18 },
  cardTitle: { fontFamily: FONTS.display, fontSize: 24, color: COLORS.text },
  cardMeta: { marginTop: 4, ...TYPE.meta, color: COLORS.textLight },
  cardBody: { marginTop: 10, ...TYPE.body, color: COLORS.textSecondary },
  planBullet: { ...TYPE.body, color: COLORS.textSecondary, marginTop: 8 },
  cardActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  linkText: { ...TYPE.meta, color: COLORS.primary, textTransform: 'uppercase' },
  iconAction: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
});
