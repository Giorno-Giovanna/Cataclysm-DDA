import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { OfferModal } from '../components/OfferModal';
import { purchasePlan } from '../services/subscriptions';
import { storage } from '../services/storage';
import { PRICING } from '../constants/pricing';

export function PaywallScreen({ navigation }: any) {
  const [plan, setPlan] = useState(PRICING.yearly.id);
  const [offer, setOffer] = useState(false);
  const finishFree = async () => { await storage.setBool(storage.keys.hasCompletedIntro, true); navigation.replace('MainTabs'); };
  const onContinue = async (id = plan) => { await purchasePlan(id); await storage.setBool(storage.keys.hasCompletedIntro, true); navigation.replace('MainTabs'); };
  return <View style={s.c}><Pressable onPress={() => setOffer(true)}><Text style={s.x}>✕</Text></Pressable><Text style={s.h}>Unlock to PRO</Text>{['Faster Rendering','Unlock All Styles','Customize Your Garden','Remove Watermarks'].map((f)=><Text key={f}>• {f}</Text>)}
    <Pressable style={[s.card, plan===PRICING.yearly.id&&s.sel]} onPress={()=>setPlan(PRICING.yearly.id)}><Text>Yearly: $59.99 ({PRICING.yearly.perWeek}/week)</Text></Pressable>
    <Pressable style={[s.card, plan===PRICING.weekly.id&&s.sel]} onPress={()=>setPlan(PRICING.weekly.id)}><Text>Weekly: $7.99</Text></Pressable>
    <PrimaryButton title='Continue' onPress={()=>onContinue()} />
    <Text style={s.f}>No commitment, Cancel anytime</Text>
    <OfferModal visible={offer} onClose={finishFree} onContinue={() => onContinue(PRICING.yearlyOffer.id)} />
  </View>;
}
const s = StyleSheet.create({ c: { flex: 1, padding: 20, backgroundColor: '#111', gap: 10 }, x: { color: '#fff', fontSize: 20 }, h: { color: '#fff', fontSize: 34, fontWeight: '800', marginBottom: 10 }, card: { backgroundColor: '#fff', borderRadius: 14, padding: 14 }, sel: { borderWidth: 2, borderColor: '#2e7d32' }, f: { color: '#ddd', textAlign: 'center' } });
