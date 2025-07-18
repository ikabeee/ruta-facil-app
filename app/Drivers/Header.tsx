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
  driverName: string;
  isOnline: boolean;
  onToggleStatus: () => void;
}

// Styles
import { colors, spacing, typography } from '../Styles/theme';

const Header: React.FC<HeaderProps> = ({ 
  driverName, 
  isOnline, 
  onToggleStatus 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.greeting}>¡Hola!</Text>
        <Text style={styles.driverName}>{driverName}</Text>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.statusButton,
          { backgroundColor: isOnline ? colors.success : colors.error }
        ]}
        onPress={onToggleStatus}
        activeOpacity={0.8}
      >
        <MaterialIcons 
          name={isOnline ? 'radio-button-checked' : 'radio-button-unchecked'} 
          size={20} 
          color="white" 
        />
        <Text style={styles.statusText}>
          {isOnline ? 'En Línea' : 'Desconectado'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leftSection: {
    flex: 1,
  },
  greeting: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  driverName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontWeight: typography.weights.medium,
    marginLeft: spacing.xs,
  },
});

export default Header;