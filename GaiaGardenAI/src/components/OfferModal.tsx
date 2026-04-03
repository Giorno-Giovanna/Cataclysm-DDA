import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from './PrimaryButton';

export function OfferModal({ visible, onClose, onContinue }: { visible: boolean; onClose: () => void; onContinue: () => void }) {
  const [sec, setSec] = useState(58);

  useEffect(() => {
    if (!visible) {
      setSec(58); // Reset timer when modal closes
      return;
    }
    const t = setInterval(() => setSec((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {/* Close Button - Large touch target */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <View style={styles.closeCircle}>
              <Text style={styles.closeText}>✕</Text>
            </View>
          </TouchableOpacity>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.badge}>🎁 LIMITED TIME</Text>
            <Text style={styles.header}>ONE TIME OFFER</Text>
            <Text style={styles.subtitle}>Design your garden effortlessly with AI power!</Text>

            {/* Countdown Timer */}
            <View style={styles.timerContainer}>
              <Text style={styles.timerLabel}>Offer expires in</Text>
              <Text style={styles.timer}>00:{String(sec).padStart(2, '0')}</Text>
            </View>

            {/* Pricing */}
            <View style={styles.pricingContainer}>
              <Text style={styles.priceLabel}>Yearly Access</Text>
              <Text style={styles.price}>$0.77 / week</Text>
              <Text style={styles.priceDetail}>Billed $39.99/year, cancel anytime</Text>
            </View>

            {/* CTA */}
            <PrimaryButton title="Continue" onPress={onContinue} />

            {/* Footer */}
            <Text style={styles.footer}>No commitment, Cancel anytime</Text>
            <View style={styles.linksRow}>
              <Text style={styles.link}>Privacy</Text>
              <Text style={styles.linkSeparator}>|</Text>
              <Text style={styles.link}>Terms</Text>
              <Text style={styles.linkSeparator}>|</Text>
              <Text style={styles.link}>Restore</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 10,
  },
  closeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    alignItems: 'center',
    paddingTop: 20,
  },
  badge: {
    backgroundColor: '#FFF3E0',
    color: '#E65100',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
    marginBottom: 8,
  },
  subtitle: {
    color: '#555',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerLabel: {
    color: '#888',
    fontSize: 13,
    marginBottom: 4,
  },
  timer: {
    fontSize: 42,
    fontWeight: '700',
    color: '#E53935',
  },
  pricingContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 16,
  },
  priceLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2E7D32',
  },
  priceDetail: {
    color: '#888',
    fontSize: 13,
    marginTop: 4,
  },
  footer: {
    color: '#888',
    fontSize: 12,
    marginTop: 16,
    marginBottom: 8,
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  link: {
    color: '#666',
    fontSize: 11,
  },
  linkSeparator: {
    color: '#ccc',
    fontSize: 11,
  },
});
