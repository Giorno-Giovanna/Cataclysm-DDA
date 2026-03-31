import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from './PrimaryButton';

export function OfferModal({ visible, onClose, onContinue }: { visible: boolean; onClose: () => void; onContinue: () => void }) {
  const [sec, setSec] = useState(58);
  useEffect(() => { if (!visible) return; const t = setInterval(() => setSec((s) => (s > 0 ? s - 1 : 0)), 1000); return () => clearInterval(t); }, [visible]);
  return <Modal visible={visible} transparent animationType="slide"><View style={s.bg}><View style={s.card}><Pressable onPress={onClose}><Text style={s.x}>✕</Text></Pressable><Text style={s.h}>ONE TIME OFFER</Text><Text style={s.sub}>Design your garden effortlessly with AI power!</Text><Text style={s.timer}>00:{String(sec).padStart(2, '0')}</Text><Text style={s.price}>$0.77 / week</Text><Text style={s.small}>Billed $39.99/year, cancel anytime</Text><PrimaryButton title="Continue" onPress={onContinue} /></View></View></Modal>;
}
const s = StyleSheet.create({ bg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.72)', justifyContent: 'center', padding: 20 }, card: { backgroundColor: '#fff', borderRadius: 20, padding: 20, gap: 8 }, x: { fontSize: 20 }, h: { fontSize: 24, fontWeight: '800' }, sub: { color: '#555' }, timer: { fontSize: 30, fontWeight: '700' }, price: { fontSize: 26, fontWeight: '800' }, small: { color: '#666', marginBottom: 10 } });
