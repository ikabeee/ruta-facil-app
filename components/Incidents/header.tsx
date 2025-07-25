import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  title?: 'Mi Perfil' | 'Mis Rutas' | 'Mis Documentos' | 'Unidad' | 'Unidad Asignada' | 'Incidencias';
  showSearch?: boolean;
  onSearchPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "Mis Rutas",
  showSearch = true,
  onSearchPress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {/* Espacio vacío para centrar el título */}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.rightSection}>
        {showSearch && (
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={onSearchPress}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name="search" 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#20c997',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 2,
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  searchButton: {
    padding: 8,
    borderRadius: 20,
  },
});

export default Header;