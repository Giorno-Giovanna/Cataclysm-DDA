import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function PlaceholderReviewCard() {
  return <View style={styles.c}><Text style={styles.n}>Placeholder User</Text><Text style={styles.s}>★★★★★</Text><Text style={styles.t}>Loved the results!</Text><Text style={styles.b}>Placeholder Review</Text></View>;
}
const styles = StyleSheet.create({ c: { backgroundColor: '#fff', borderRadius: 16, padding: 16 }, n: { fontWeight: '700' }, s: { color: '#d4a400', marginVertical: 4 }, t: { fontWeight: '600' }, b: { color: '#555', marginTop: 4 } });
