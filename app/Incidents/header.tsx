import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  driverStatus?: 'Activo' | 'Inactivo';
  onStatusChange?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  driverStatus = 'Inactivo',
  onStatusChange 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ruta Facil </Text>
      <View style={[
        styles.statusBadge, 
        driverStatus === 'Activo' ? styles.active : styles.inactive
      ]}>
        <View style={[
          styles.statusDot,
          driverStatus === 'Activo' ? styles.activeDot : styles.inactiveDot
        ]} />
        <Text style={styles.statusText}>{driverStatus}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  active: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  inactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
  inactiveDot: {
    backgroundColor: '#FFF',
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Header;