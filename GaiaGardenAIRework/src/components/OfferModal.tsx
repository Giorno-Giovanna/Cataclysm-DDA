import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from './PrimaryButton';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';

export function OfferModal({ visible, onClose, onContinue }: { visible: boolean; onClose: () => void; onContinue: () => void }) {
  const [sec, setSec] = useState(58);

  useEffect(() => {
    if (!visible) {
      setSec(58);
      return;
    }
    const timer = setInterval(() => setSec((current) => (current > 0 ? current - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={20} color={COLORS.textSecondary} />
          </Pressable>

          <Text style={styles.eyebrow}>Special Offer</Text>
          <Text style={styles.header}>Unlock PRO</Text>
          <Text style={styles.subtitle}>Get more tools, more styles, and more control in one plan.</Text>

          <View style={styles.timerPanel}>
            <Text style={styles.timerLabel}>Offer expires in</Text>
            <Text style={styles.timer}>00:{String(sec).padStart(2, '0')}</Text>
          </View>

          <View style={styles.priceCard}>
            <Text style={styles.priceLabel}>Yearly Access</Text>
            <Text style={styles.price}>$0.77 / week</Text>
            <Text style={styles.priceDetail}>Billed $39.99/year. Cancel anytime.</Text>
          </View>

          <PrimaryButton title="Continue" onPress={onContinue} />
          <Text style={styles.footer}>Privacy  •  Terms  •  Restore</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.overlayStrong,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.soft,
  },
  closeButton: {
    alignSelf: 'flex-end',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: RADII.sm,
    marginBottom: 8,
  },
  eyebrow: {
    ...TYPE.eyebrow,
    color: COLORS.primary,
  },
  header: {
    marginTop: 10,
    fontFamily: FONTS.display,
    fontSize: 30,
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 10,
    ...TYPE.body,
    color: COLORS.textSecondary,
  },
  timerPanel: {
    marginTop: 18,
    padding: 18,
    borderRadius: RADII.lg,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  timerLabel: {
    ...TYPE.meta,
    color: COLORS.textLight,
  },
  timer: {
    marginTop: 6,
    fontFamily: FONTS.display,
    fontSize: 42,
    color: COLORS.danger,
  },
  priceCard: {
    marginTop: 16,
    marginBottom: 18,
    padding: 18,
    borderRadius: RADII.lg,
    backgroundColor: COLORS.surfaceDark,
  },
  priceLabel: {
    ...TYPE.meta,
    color: '#D7C8BA',
  },
  price: {
    marginTop: 8,
    fontFamily: FONTS.display,
    fontSize: 32,
    color: COLORS.white,
  },
  priceDetail: {
    marginTop: 6,
    ...TYPE.meta,
    color: '#D8E9DD',
  },
  footer: {
    marginTop: 14,
    textAlign: 'center',
    ...TYPE.meta,
    color: COLORS.textLight,
  },
});
