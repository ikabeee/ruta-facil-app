import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IncidentsHeaderProps {
  onReportPress?: () => void;
}

const IncidentsHeader: React.FC<IncidentsHeaderProps> = ({ onReportPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incidencias</Text>
      <TouchableOpacity style={styles.reportButton} onPress={onReportPress}>
        <MaterialIcons name="add" size={20} color="white" />
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
    backgroundColor: '#20c997',
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