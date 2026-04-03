import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { restorePurchases } from '../services/subscriptions';

const topItems = [
  { icon: 'thumbs-up', label: 'Rate Us' },
  { icon: 'people', label: 'Invite & Earn' },
  { icon: 'pricetag', label: 'Redeem Code' },
  { icon: 'person', label: 'Already have an account?' },
  { icon: 'share-social', label: 'Share with Friends' },
  { icon: 'logo-instagram', label: 'Follow on Instagram' },
  { icon: 'leaf', label: 'Our Culture' },
];

const lowerItems = [
  { icon: 'language', label: 'Languages' },
  { icon: 'mail', label: 'Support & Feedback' },
  { icon: 'shield-checkmark', label: 'Privacy Policy & Terms' },
  { icon: 'person-circle', label: 'User ID', value: 'NrSm0A...' },
  { icon: 'refresh', label: 'Restore Purchase' },
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
        <Ionicons name={item.icon as any} size={19} color="#111" />
        <Text style={styles.itemLabel}>{item.label}</Text>
      </View>
      <View style={styles.itemRight}>
        {item.value ? <Text style={styles.itemValue}>{item.value}</Text> : null}
        <Ionicons name="chevron-forward" size={18} color="#999" />
      </View>
    </Pressable>
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 30, paddingHorizontal: 14 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#111" />
        </Pressable>
        <Text style={styles.header}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Pressable style={styles.proCard} onPress={() => navigation.navigate('Paywall', { source: 'app' })}>
        <View style={styles.proCardHeader}>
          <Text style={styles.proCardTitle}>Garden AI</Text>
          <View style={styles.proPill}>
            <Text style={styles.proPillText}>PRO</Text>
          </View>
        </View>

        <View style={styles.bulletList}>
          {['Unlock All Styles', 'Customize Elements', 'Remove Watermarks'].map((point) => (
            <View key={point} style={styles.bulletRow}>
              <Ionicons name="checkmark-circle" size={18} color="#fff" />
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tryButton}>
          <Text style={styles.tryButtonText}>Try Pro Now</Text>
        </View>
      </Pressable>

      <View style={styles.listSection}>{topItems.map(renderItem)}</View>
      <View style={[styles.listSection, styles.secondSection]}>{lowerItems.map(renderItem)}</View>

      <View style={styles.footerMark}>
        <Text style={styles.footerBrand}>TerraMotive</Text>
        <Text style={styles.footerUrl}>www.terramotive.tech</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7f7f3',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
  },
  headerSpacer: {
    width: 32,
  },
  proCard: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: '#6f9160',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 5,
  },
  proCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  proCardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  proPill: {
    backgroundColor: '#35553a',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  proPillText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  bulletList: {
    marginTop: 18,
    gap: 10,
    paddingLeft: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bulletText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tryButton: {
    alignSelf: 'center',
    marginTop: 18,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 999,
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  tryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  listSection: {
    marginTop: 18,
    gap: 10,
  },
  secondSection: {
    marginTop: 24,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    backgroundColor: '#f1f0ed',
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemLabel: {
    color: '#232323',
    fontSize: 16,
    fontWeight: '500',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemValue: {
    color: '#8a8a8a',
    fontSize: 14,
  },
  footerMark: {
    alignItems: 'center',
    marginTop: 26,
  },
  footerBrand: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111',
  },
  footerUrl: {
    marginTop: 2,
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
  },
});
