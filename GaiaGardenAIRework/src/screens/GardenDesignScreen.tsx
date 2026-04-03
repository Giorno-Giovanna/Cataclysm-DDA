import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GARDEN_STYLES } from '../constants/copy';
import { PrimaryButton } from '../components/PrimaryButton';
import { LoadingSteps } from '../components/LoadingSteps';
import { analyzeGardenPhoto, generateGardenDesign } from '../services/api';
import { GARDEN_PLACEHOLDERS } from '../constants/gardenPlaceholders';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';
import { GardenMode } from '../types';

const MODE_CONFIG: Record<GardenMode, { kicker: string; title: string; subtitle: string; promptChips: string[] }> = {
  normal: {
    kicker: 'Garden Design',
    title: 'Create a new garden design',
    subtitle: 'Upload one photo, pick a style, and guide the result with a few clear notes.',
    promptChips: ['Low maintenance', 'More privacy', 'Outdoor dining', 'Better lighting'],
  },
  add: {
    kicker: 'Add To My Garden',
    title: 'Add something new',
    subtitle: 'Use one short prompt to introduce a new feature into the space.',
    promptChips: ['Add a fire pit', 'Add a pergola', 'Add raised planters', 'Add a dining area'],
  },
  style: {
    kicker: 'Style Reference',
    title: 'Apply a style direction',
    subtitle: 'Start from a reference look and adapt that mood to the user’s garden.',
    promptChips: ['Modern resort', 'Mediterranean', 'Natural and lush', 'Calm minimalist'],
  },
  create: {
    kicker: 'Create Garden',
    title: 'Start from an idea',
    subtitle: 'Describe the kind of garden the user wants and keep the setup simple.',
    promptChips: ['Modern BBQ area', 'Small family garden', 'Luxury patio', 'Low-water backyard'],
  },
  replace: {
    kicker: 'Replace Or Remove',
    title: 'Swap one part of the yard',
    subtitle: 'Tell the model what needs to change so it can focus on one clear edit.',
    promptChips: ['Replace the chairs', 'Remove clutter', 'Swap the paving', 'Update the planting'],
  },
  drag: {
    kicker: 'Drag And Drop',
    title: 'Plan the layout',
    subtitle: 'Use structure-based prompts to define zones before refining materials and style.',
    promptChips: ['Lounge plus dining', 'Add a central path', 'Poolside seating', 'Split into 3 zones'],
  },
};

const BUDGET_OPTIONS = ['Budget', 'Mid', 'Premium'];
const MAINTENANCE_OPTIONS = ['Easy', 'Balanced', 'Detailed'];

export function GardenDesignScreen({ navigation, route }: any) {
  const mode = (route.params?.mode ?? 'normal') as GardenMode;
  const modeConfig = MODE_CONFIG[mode];
  const [uri, setUri] = useState<string>();
  const [style, setStyle] = useState<any>();
  const [prompt, setPrompt] = useState(route.params?.starterPrompt ?? (mode === 'add' ? 'add fire pit' : ''));
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [budget, setBudget] = useState(BUDGET_OPTIONS[1]);
  const [maintenance, setMaintenance] = useState(MAINTENANCE_OPTIONS[1]);
  const selectedStyleId = route.params?.selectedStyleId as string | undefined;
  const referenceTitle = route.params?.referenceTitle as string | undefined;

  useEffect(() => {
    if (!selectedStyleId) {
      return;
    }
    const matched = GARDEN_STYLES.find((entry) => entry.id === selectedStyleId);
    if (matched) {
      setStyle(matched);
    }
  }, [selectedStyleId]);

  const finalPrompt = useMemo(() => {
    const pieces = [prompt.trim(), `${budget.toLowerCase()} budget`, `${maintenance.toLowerCase()} upkeep`].filter(Boolean);
    return pieces.join(', ');
  }, [budget, maintenance, prompt]);

  const pick = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7, base64: true });
    if (!res.canceled) {
      const nextUri = res.assets[0].uri;
      setUri(nextUri);
      const photoSummary = await analyzeGardenPhoto('mock-image', prompt);
      setAnalysis(photoSummary.summary);
    }
  };

  const generate = async () => {
    if (!uri || !style) return;
    setLoading(true);
    const result = await generateGardenDesign('mock-image', style.prompt, finalPrompt);
    const placeholderResultUri = Image.resolveAssetSource(GARDEN_PLACEHOLDERS.modern).uri;
    setLoading(false);
    navigation.replace('Result', { originalImageUri: uri, style, customPrompt: finalPrompt, analysis, ...result, resultImageUri: placeholderResultUri });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.kicker}>{modeConfig.kicker}</Text>
      <Text style={styles.header}>{modeConfig.title}</Text>
      <Text style={styles.subtitle}>{modeConfig.subtitle}</Text>

      {referenceTitle ? (
        <View style={styles.referenceCard}>
          <MaterialCommunityIcons name="image-filter-center-focus" size={18} color={COLORS.primary} />
          <Text style={styles.referenceText}>Reference style selected: {referenceTitle}</Text>
        </View>
      ) : null}

      {uri ? (
        <View style={styles.previewCard}>
          <Image source={{ uri }} style={styles.previewImage} />
          <Pressable onPress={pick} style={styles.previewAction}>
            <MaterialCommunityIcons name="image-edit-outline" size={18} color={COLORS.text} />
            <Text style={styles.previewActionText}>Change photo</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable onPress={pick} style={styles.uploadCard}>
          <MaterialCommunityIcons name="image-plus" size={28} color={COLORS.primary} />
          <Text style={styles.uploadTitle}>Upload your garden photo</Text>
          <Text style={styles.uploadSubtitle}>Bring in a yard, patio, or border to start the redesign.</Text>
        </Pressable>
      )}

      {analysis ? (
        <View style={styles.analysisCard}>
          <Text style={styles.analysisLabel}>Scene read</Text>
          <Text style={styles.analysisBody}>{analysis}</Text>
        </View>
      ) : null}

      <Text style={styles.sectionTitle}>Choose a direction</Text>
      <View style={styles.stylesWrap}>
        {GARDEN_STYLES.map((entry) => (
          <Pressable key={entry.id} onPress={() => setStyle(entry)} style={[styles.styleChip, style?.id === entry.id && styles.styleChipActive]}>
            <Text style={[styles.styleChipText, style?.id === entry.id && styles.styleChipTextActive]}>{entry.name}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Quick prompt ideas</Text>
      <View style={styles.stylesWrap}>
        {modeConfig.promptChips.map((entry) => (
          <Pressable key={entry} onPress={() => setPrompt(entry)} style={styles.quickChip}>
            <Text style={styles.quickChipText}>{entry}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Budget</Text>
      <View style={styles.stylesWrap}>
        {BUDGET_OPTIONS.map((entry) => (
          <Pressable key={entry} onPress={() => setBudget(entry)} style={[styles.styleChip, budget === entry && styles.styleChipActive]}>
            <Text style={[styles.styleChipText, budget === entry && styles.styleChipTextActive]}>{entry}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Maintenance</Text>
      <View style={styles.stylesWrap}>
        {MAINTENANCE_OPTIONS.map((entry) => (
          <Pressable key={entry} onPress={() => setMaintenance(entry)} style={[styles.styleChip, maintenance === entry && styles.styleChipActive]}>
            <Text style={[styles.styleChipText, maintenance === entry && styles.styleChipTextActive]}>{entry}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Creative notes</Text>
      <TextInput
        value={prompt}
        onChangeText={setPrompt}
        placeholder="Add notes like low-maintenance planting, warm stone, or a fire lounge."
        multiline
        style={styles.promptInput}
        placeholderTextColor={COLORS.textLight}
      />

      {loading ? (
        <View style={styles.loadingCard}>
          <ActivityIndicator color={COLORS.primary} />
          <Text style={styles.loadingTitle}>Generating your design</Text>
          <LoadingSteps />
        </View>
      ) : (
        <PrimaryButton title="Generate Design" onPress={generate} disabled={!uri || !style} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 18, paddingBottom: 48, gap: 16 },
  kicker: { ...TYPE.eyebrow, color: COLORS.primary },
  header: { fontFamily: FONTS.display, fontSize: 34, color: COLORS.text },
  uploadCard: { borderRadius: RADII.lg, padding: 24, borderWidth: 1, borderStyle: 'dashed', borderColor: COLORS.primary, backgroundColor: COLORS.surface, alignItems: 'flex-start', gap: 10 },
  uploadTitle: { fontFamily: FONTS.display, fontSize: 26, color: COLORS.text },
  uploadSubtitle: { ...TYPE.body, color: COLORS.textSecondary },
  previewCard: { borderRadius: RADII.lg, overflow: 'hidden', backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, ...SHADOW.card },
  previewImage: { width: '100%', height: 260 },
  previewAction: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 14 },
      previewActionText: { ...TYPE.meta, color: COLORS.text, textTransform: 'uppercase' },
  analysisCard: { borderRadius: RADII.md, padding: 16, backgroundColor: COLORS.surfaceDark },
  analysisLabel: { ...TYPE.eyebrow, color: '#D8E9DD' },
  analysisBody: { marginTop: 8, ...TYPE.body, color: COLORS.white },
  sectionTitle: { fontFamily: FONTS.display, fontSize: 26, color: COLORS.text },
  subtitle: { marginTop: 8, ...TYPE.body, color: COLORS.textSecondary },
  referenceCard: { marginTop: 8, marginBottom: 2, flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: RADII.md, padding: 14, backgroundColor: COLORS.surfaceMuted, borderWidth: 1, borderColor: COLORS.border },
  referenceText: { ...TYPE.body, color: COLORS.text },
  stylesWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  styleChip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: RADII.sm, backgroundColor: COLORS.surfaceMuted, borderWidth: 1, borderColor: COLORS.border },
  styleChipActive: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
  styleChipText: { ...TYPE.meta, color: COLORS.textSecondary },
  styleChipTextActive: { color: COLORS.white },
  quickChip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: RADII.sm, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  quickChipText: { ...TYPE.meta, color: COLORS.text },
  promptInput: { minHeight: 130, borderRadius: RADII.lg, padding: 16, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, color: COLORS.text, fontFamily: FONTS.body, fontSize: 16, lineHeight: 24, textAlignVertical: 'top' },
  loadingCard: { borderRadius: RADII.lg, padding: 18, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, gap: 14 },
  loadingTitle: { fontFamily: FONTS.display, fontSize: 24, color: COLORS.text },
});
