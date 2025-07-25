import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatCard from './StatCard';

interface MonthlyStatsSectionProps {
  trips: number;
  punctuality: number;
}

const MonthlyStatsSection: React.FC<MonthlyStatsSectionProps> = ({
  trips,
  punctuality,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estadísticas del Mes</Text>
      
      <View style={styles.statsRow}>
        <StatCard
          value={trips.toString()}
          label="Viajes"
          color="#4A90E2"
        />
        
        <StatCard
          value={`${punctuality}%`}
          label="Puntualidad"
          color="#4CAF50"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 20,
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default MonthlyStatsSection;