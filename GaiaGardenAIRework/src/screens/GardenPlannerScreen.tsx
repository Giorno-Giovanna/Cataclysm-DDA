import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/PrimaryButton';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';
import { storage } from '../services/storage';
import { PlannerPlanItem } from '../types';

const YARD_TYPES = ['Backyard', 'Front Yard', 'Patio', 'Pool Area'];
const CLIMATES = ['Warm', 'Dry', 'Temperate', 'Shady'];
const GOALS = ['Low Maintenance', 'Entertaining', 'Family Friendly', 'Privacy'];

function buildPlan(goal: string, climate: string, yardType: string): PlannerPlanItem[] {
  const byGoal: Record<string, PlannerPlanItem[]> = {
    'Low Maintenance': [
      { id: 'g1', title: 'Cut plant variety', detail: 'Use fewer plant types in larger groups to simplify upkeep.' },
      { id: 'g2', title: 'Add mulch zones', detail: 'Cover open soil to reduce weeds and hold moisture longer.' },
    ],
    Entertaining: [
      { id: 'g3', title: 'Create one social zone', detail: 'Anchor the space with seating, lighting, and one focal feature.' },
      { id: 'g4', title: 'Improve movement', detail: 'Keep a clear path from door to seating and cooking areas.' },
    ],
    'Family Friendly': [
      { id: 'g5', title: 'Keep open play space', detail: 'Leave one main zone uncluttered and easy to supervise.' },
      { id: 'g6', title: 'Choose durable finishes', detail: 'Use simple hardscape and tougher planting near high-traffic edges.' },
    ],
    Privacy: [
      { id: 'g7', title: 'Layer the boundary', detail: 'Mix hedging, tall grasses, or screens instead of relying on one row.' },
      { id: 'g8', title: 'Aim seating inward', detail: 'Turn the main seating zone away from neighboring views.' },
    ],
  };

  const byClimate: Record<string, PlannerPlanItem> = {
    Warm: { id: 'c1', title: 'Plan for shade', detail: 'Add one shaded spot with trees, pergola cover, or a canopy.' },
    Dry: { id: 'c2', title: 'Cut water demand', detail: 'Favor drought-tolerant planting and drip irrigation zones.' },
    Temperate: { id: 'c3', title: 'Layer for the seasons', detail: 'Mix evergreen structure with plants that peak in different months.' },
    Shady: { id: 'c4', title: 'Use shade-friendly planting', detail: 'Lean into foliage texture, paving, and brighter seating finishes.' },
  };

  const byYardType: Record<string, PlannerPlanItem> = {
    Backyard: { id: 'y1', title: 'Define zones', detail: 'Split the yard into lounge, path, and planting areas before adding details.' },
    'Front Yard': { id: 'y2', title: 'Boost curb appeal', detail: 'Prioritize entry path clarity and one simple focal planting moment.' },
    Patio: { id: 'y3', title: 'Use vertical interest', detail: 'Bring in planters, screens, and compact furniture to add depth.' },
    'Pool Area': { id: 'y4', title: 'Keep circulation open', detail: 'Leave clean walk paths around the water and avoid visual clutter.' },
  };

  return [...byGoal[goal], byClimate[climate], byYardType[yardType]];
}

export function GardenPlannerScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [yardType, setYardType] = useState(YARD_TYPES[0]);
  const [climate, setClimate] = useState(CLIMATES[0]);
  const [goal, setGoal] = useState(GOALS[0]);
  const plan = useMemo(() => buildPlan(goal, climate, yardType), [climate, goal, yardType]);

  const savePlan = async () => {
    await storage.addPlannerPlan({
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      yardType,
      climate,
      goal,
      items: plan,
    });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom + 36, paddingHorizontal: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={COLORS.text} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.kicker}>Garden Planner</Text>
          <Text style={styles.header}>Build a simple weekly plan</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Yard type</Text>
      <View style={styles.chipRow}>
        {YARD_TYPES.map((entry) => (
          <Pressable key={entry} style={[styles.chip, yardType === entry && styles.chipActive]} onPress={() => setYardType(entry)}>
            <Text style={[styles.chipText, yardType === entry && styles.chipTextActive]}>{entry}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Climate</Text>
      <View style={styles.chipRow}>
        {CLIMATES.map((entry) => (
          <Pressable key={entry} style={[styles.chip, climate === entry && styles.chipActive]} onPress={() => setClimate(entry)}>
            <Text style={[styles.chipText, climate === entry && styles.chipTextActive]}>{entry}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Main goal</Text>
      <View style={styles.chipRow}>
        {GOALS.map((entry) => (
          <Pressable key={entry} style={[styles.chip, goal === entry && styles.chipActive]} onPress={() => setGoal(entry)}>
            <Text style={[styles.chipText, goal === entry && styles.chipTextActive]}>{entry}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>This week</Text>
        <Text style={styles.planMeta}>
          {yardType} · {climate} · {goal}
        </Text>
        <View style={styles.planList}>
          {plan.map((item, index) => (
            <View key={item.id} style={styles.planRow}>
              <View style={styles.planIndex}>
                <Text style={styles.planIndexText}>{index + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.planRowTitle}>{item.title}</Text>
                <Text style={styles.planRowDetail}>{item.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <PrimaryButton title="Save Plan" onPress={savePlan} />
      <PrimaryButton
        title="Use In Design"
        onPress={() =>
          navigation.navigate('GardenDesign', {
            mode: 'create',
            starterPrompt: `${goal.toLowerCase()} ${yardType.toLowerCase()} for a ${climate.toLowerCase()} climate`,
          })
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 },
  backButton: { width: 40, height: 40, borderRadius: RADII.sm, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  kicker: { ...TYPE.eyebrow, color: COLORS.primary },
  header: { marginTop: 4, fontFamily: FONTS.display, fontSize: 30, color: COLORS.text },
  sectionLabel: { marginTop: 18, marginBottom: 10, ...TYPE.meta, color: COLORS.textLight, textTransform: 'uppercase' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: RADII.sm, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surfaceMuted },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { ...TYPE.meta, color: COLORS.textSecondary },
  chipTextActive: { color: COLORS.white },
  planCard: { marginTop: 22, marginBottom: 18, borderRadius: RADII.lg, padding: 18, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, ...SHADOW.card },
  planTitle: { fontFamily: FONTS.display, fontSize: 28, color: COLORS.text },
  planMeta: { marginTop: 4, ...TYPE.body, color: COLORS.textSecondary },
  planList: { marginTop: 18, gap: 14 },
  planRow: { flexDirection: 'row', gap: 12 },
  planIndex: { width: 28, height: 28, borderRadius: 999, backgroundColor: COLORS.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  planIndexText: { fontFamily: FONTS.bodyBold, color: COLORS.primary, fontSize: 13 },
  planRowTitle: { fontFamily: FONTS.bodyBold, color: COLORS.text, fontSize: 16 },
  planRowDetail: { marginTop: 4, ...TYPE.body, color: COLORS.textSecondary },
});
