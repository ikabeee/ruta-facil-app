import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Types
interface HeaderProps {
  title?: 'Mi Perfil' | 'Mis Rutas' | 'Mis Documentos' | 'Unidad' | 'Unidad Asignada' | 'Incidencias';
  showSearch?: boolean;
  showEdit?: boolean;
  showLogo?: boolean;
  onSearchPress?: () => void;
  onEditPress?: () => void;
}

// Styles
import { spacing, typography } from '../Styles/theme';

const Header: React.FC<HeaderProps> = ({ 
  title = "Mis Rutas",
  showSearch = false,
  showEdit = false,
  showLogo = false,
  onSearchPress,
  onEditPress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showLogo && (
          <View style={styles.logoContainer}>
            <MaterialIcons name="route" size={20} color="white" />
            <Text style={styles.logoTitle}>Ruta Fácil</Text>
          </View>
        )}
      </View>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.rightSection}>
        {showSearch && (
          <TouchableOpacity 
            style={styles.actionButton}
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
        {showEdit && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onEditPress}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name="edit" 
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#20c997',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  leftSection: {
    position: 'absolute',
    left: spacing.lg,
    width: 60,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: 'white',
    textAlign: 'center',
  },
  rightSection: {
    position: 'absolute',
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: spacing.sm,
    borderRadius: 20,
    marginLeft: spacing.xs,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
});

export default Header;