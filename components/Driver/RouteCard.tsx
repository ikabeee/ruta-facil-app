import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type RouteCardProps = {
  name: string;
  stops: number;
  active: boolean;
};

export default function RouteCard({
  name,
  stops,
  active,
}: RouteCardProps) {
  return (
    <View style={[styles.card, active && styles.activeCard]}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>{stops} paradas registradas</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, active && styles.activeButton]}>
          <Text style={[styles.buttonText, active && styles.activeButtonText]}>
            ▶ Iniciar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
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
  activeCard: {
    borderColor: '#2563EB',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#6B7280',
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    backgroundColor: '#E5E7EB',
    padding: 8,
    borderRadius: 4,
  },
  activeButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#000',
  },
  activeButtonText: {
    color: '#fff',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 8,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#374151',
  },
});
