import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = { value: string; label: string; color?: string };

export const StatBadge = ({ value, label, color = '#2563EB' }: Props) => (
  <View style={styles.container}>
    <Text style={[styles.value, { color }]}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { marginRight: 24, alignItems: 'center' },
  value: { fontSize: 28, fontWeight: '700' },
  label: { fontSize: 12, color: '#6B7280' },
});

