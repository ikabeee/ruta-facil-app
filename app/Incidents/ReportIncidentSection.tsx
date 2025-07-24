import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReportIncidentSectionProps {
  onCategoryPress?: (category: string) => void;
}

const ReportIncidentSection: React.FC<ReportIncidentSectionProps> = ({ 
  onCategoryPress 
}) => {
  const categories = [
    { id: 'traffic', title: 'Tráfico', icon: 'warning-outline' },
    { id: 'accident', title: 'Accidente', icon: 'medical-outline' },
    { id: 'construction', title: 'Obra', icon: 'construct-outline' },
    { id: 'other', title: 'Otro', icon: 'chatbubble-outline' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportar Incidencia</Text>
      
      <View style={styles.categoriesGrid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryButton}
            onPress={() => onCategoryPress?.(category.id)}
          >
            <Ionicons 
              name={category.icon as any} 
              size={24} 
              color="#666" 
            />
            <Text style={styles.categoryText}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontWeight: '500',
  },
});

export default ReportIncidentSection;