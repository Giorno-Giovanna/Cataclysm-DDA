import React, { useRef, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { PrimaryButton } from '../components/PrimaryButton';
import { MasonryHeroColumns } from '../components/MasonryHeroColumns';
import { AutoBeforeAfter } from '../components/AutoBeforeAfter';
import { AutoFeatureSwapCard } from '../components/AutoFeatureSwapCard';

const slides = [
  { t: 'Transform Your Garden', s: 'Instantly redesign your outdoor space with AI', cta: 'Get Started' },
  { t: 'Recreate Your Exteriors', s: 'Easily design your garden.', cta: 'Continue' },
  { t: 'Edit anything, your way', s: 'Redesign anything in seconds. Full flexibility at your fingertips.', cta: 'Continue' },
  { t: 'Design with Drag & Drop', s: 'Rearrange plants and decor with ready-made assets.', cta: 'Continue' },
];

export function OnboardingScreen({ navigation }: any) {
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList>(null);
  const next = async () => {
    await Haptics.selectionAsync();
    if (index === slides.length - 1) return navigation.replace('ReviewPrompt');
    ref.current?.scrollToIndex({ index: index + 1 });
  };

  return <View style={{ flex: 1, padding: 20, backgroundColor: '#f7f7f3' }}>
    <FlatList horizontal pagingEnabled ref={ref} data={slides} keyExtractor={(i) => i.t} showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width))}
      renderItem={({ item, index: i }) => <View style={styles.slide}>{i===0?<MasonryHeroColumns />:i===1?<AutoBeforeAfter />:<AutoFeatureSwapCard labelA={i===2?'Outdoor decor':'Ready assets'} labelB={i===2?'Remove & Replace':'Drag & Drop'} alt={i===3} />}<Text style={styles.t}>{item.t}</Text><Text style={styles.s}>{item.s}</Text>{i===0&&<Text style={styles.proof}>Trusted by thousands
★★★★★
Top-rated design experience</Text>}</View>} />
    <View style={styles.bottom}><View style={styles.dots}>{slides.map((_, i) => <View key={i} style={[styles.dot, i===index&&styles.active]} />)}</View><PrimaryButton title={slides[index].cta} onPress={next} /></View>
  </View>;
}

const styles = StyleSheet.create({ slide: { width: 350, flex: 1, gap: 14, paddingTop: 30 }, t: { fontSize: 31, fontWeight: '800' }, s: { color: '#666', fontSize: 16 }, proof: { color: '#333' }, bottom: { gap: 12, paddingBottom: 16 }, dots: { flexDirection: 'row', justifyContent: 'center', gap: 8 }, dot: { width: 8, height: 8, borderRadius: 8, backgroundColor: '#c7c7c7' }, active: { width: 22, backgroundColor: '#2e7d32' } });
