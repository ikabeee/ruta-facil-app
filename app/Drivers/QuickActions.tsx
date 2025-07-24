import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { colors, spacing, typography } from '../Styles/theme';

interface QuickAction {
  id: string;
  title: string;
  icon: any;
  color: string;
  onPress: () => void;
}

const QuickActions: React.FC = () => {
  const handleActionPress = (actionTitle: string) => {
    Alert.alert('Acción', `Presionaste: ${actionTitle}`);
  };

  const actions: QuickAction[] = [
    { 
      id: '1', 
      title: 'Historial', 
      icon: 'history', 
      color: colors.primary,
      onPress: () => handleActionPress('Historial')
    },
    { 
      id: '2', 
      title: 'Soporte', 
      icon: 'help', 
      color: colors.info,
      onPress: () => handleActionPress('Soporte')
    },
    { 
      id: '3', 
      title: 'Documentos', 
      icon: 'description', 
      color: colors.warning,
      onPress: () => handleActionPress('Documentos')
    },
    { 
      id: '4', 
      title: 'Configuración', 
      icon: 'settings', 
      color: colors.textSecondary,
      onPress: () => handleActionPress('Configuración')
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action) => (
          <TouchableOpacity 
            key={action.id} 
            style={styles.actionButton}
            onPress={action.onPress}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
              <MaterialIcons name={action.icon} size={24} color="white" />
            </View>
            <Text style={styles.actionTitle}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actionTitle: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});

export default QuickActions;
