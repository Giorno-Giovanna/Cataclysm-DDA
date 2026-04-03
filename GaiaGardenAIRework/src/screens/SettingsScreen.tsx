import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { restorePurchases } from '../services/subscriptions';
import { COLORS, FONTS, RADII, SHADOW, TYPE } from '../constants/theme';

const topItems = [
  { icon: 'heart-outline', label: 'Rate Us' },
  { icon: 'account-group-outline', label: 'Invite & Earn' },
  { icon: 'ticket-percent-outline', label: 'Redeem Code' },
  { icon: 'account-outline', label: 'Already have an account?' },
  { icon: 'share-variant-outline', label: 'Share with Friends' },
  { icon: 'instagram', label: 'Follow on Instagram' },
  { icon: 'sprout-outline', label: 'Our Culture' },
];

const lowerItems = [
  { icon: 'translate', label: 'Languages' },
  { icon: 'message-text-outline', label: 'Support & Feedback' },
  { icon: 'shield-check-outline', label: 'Privacy Policy & Terms' },
  { icon: 'identifier', label: 'User ID', value: 'NrSm0A...' },
  { icon: 'restore', label: 'Restore Purchase' },
];

export function SettingsScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  const renderItem = (item: { icon: string; label: string; value?: string }) => (
    <Pressable
      key={item.label}
      style={styles.itemRow}
      onPress={async () => {
        if (item.label === 'Restore Purchase') {
          const result = await restorePurchases();
          Alert.alert('Restore Purchases', result.isSubscribed ? 'Active subscription found.' : 'No purchases found.');
        }
      }}
    >
      <View style={styles.itemLeft}>
        <MaterialCommunityIcons name={item.icon as any} size={20} color={COLORS.secondary} />
        <Text style={styles.itemLabel}>{item.label}</Text>
      </View>
      <View style={styles.itemRight}>
        {item.value ? <Text style={styles.itemValue}>{item.value}</Text> : null}
        <MaterialCommunityIcons name="arrow-right" size={18} color={COLORS.textLight} />
      </View>
    </Pressable>
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom + 40, paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={COLORS.text} />
        </Pressable>
        <Text style={styles.header}>Settings</Text>
      </View>

      <Pressable style={styles.proCard} onPress={() => navigation.navigate('Paywall', { source: 'app' })}>
        <Text style={styles.proEyebrow}>PRO Membership</Text>
        <Text style={styles.proTitle}>Unlock more PRO tools</Text>
        <View style={styles.bulletList}>
          {['Unlimited renders', 'Enhanced customization', 'No watermarks'].map((point) => (
            <View key={point} style={styles.bulletRow}>
              <MaterialCommunityIcons name="check-decagram" size={18} color={COLORS.accent} />
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
        </View>
      </Pressable>

      <View style={styles.listSection}>{topItems.map(renderItem)}</View>
      <View style={styles.listSection}>{lowerItems.map(renderItem)}</View>

      <View style={styles.footerMark}>
        <Text style={styles.footerBrand}>Gaia Garden AI</Text>
        <Text style={styles.footerUrl}>rework build</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 },
  backButton: { width: 40, height: 40, borderRadius: RADII.sm, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  header: { fontFamily: FONTS.display, fontSize: 34, color: COLORS.text },
  proCard: { borderRadius: RADII.xl, padding: 20, backgroundColor: COLORS.secondary, ...SHADOW.card },
  proEyebrow: { ...TYPE.eyebrow, color: '#D8E9DD' },
  proTitle: { marginTop: 10, fontFamily: FONTS.display, fontSize: 30, color: COLORS.white },
  bulletList: { marginTop: 16, gap: 12 },
  bulletRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bulletText: { ...TYPE.body, color: COLORS.white },
  listSection: { marginTop: 18, gap: 10 },
  itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: RADII.md, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 14, paddingVertical: 16, ...SHADOW.card },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  itemLabel: { color: COLORS.text, fontFamily: FONTS.body, fontSize: 16 },
  itemRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  itemValue: { color: COLORS.textLight, fontSize: 14 },
  footerMark: { alignItems: 'center', marginTop: 30 },
  footerBrand: { fontFamily: FONTS.display, fontSize: 28, color: COLORS.text },
  footerUrl: { marginTop: 2, ...TYPE.meta, color: COLORS.textLight },
});
