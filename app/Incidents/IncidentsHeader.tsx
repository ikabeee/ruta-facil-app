import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IncidentsHeaderProps {
  onReportPress?: () => void;
}

const IncidentsHeader: React.FC<IncidentsHeaderProps> = ({ onReportPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incidencias</Text>
      <TouchableOpacity style={styles.reportButton} onPress={onReportPress}>
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.reportButtonText}>Reportar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  reportButton: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  reportButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default IncidentsHeader;