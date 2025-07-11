import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export const HeaderBar = () => (
  <View style={styles.wrapper}>
    <View>
      <Text style={styles.title}>Ruta Fácil</Text>
      <Text style={styles.subtitle}>Ruta: Centro – Mercado</Text>
    </View>

    <View style={styles.status}>
      <Ionicons name="ellipse" size={10} color="#00e676" />
      <Text style={styles.statusText}>En Ruta</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#20c997',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { color: '#FFF', fontWeight: '700', fontSize: 30 },
  subtitle: { color: '#FFF', fontSize: 12 },
  status: { flexDirection: 'row', alignItems: 'center' },
  statusText: { color: '#FFF', marginLeft: 4, fontSize: 12 },
});
