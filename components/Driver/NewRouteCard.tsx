import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function NewRouteCard() {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.mapBox}>
        <Text style={styles.mapText}>Toca para marcar paradas{'\n'}Mapa del pueblo mágico</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} disabled>
        <Text style={styles.saveButtonText}>Guardar Ruta (0 paradas)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  mapBox: {
    height: 120,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 12,
  },
  mapText: {
    color: '#9CA3AF',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#9CA3AF',
    padding: 12,
    borderRadius: 4,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
