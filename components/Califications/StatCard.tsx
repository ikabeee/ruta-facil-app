import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatCardProps {
  value: string;
  label: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, color }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  value: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});

export default StatCard;