import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: any;
  color: string;
}

// Styles
import { colors, spacing, typography } from '../Styles/theme';

const StatusCard: React.FC<StatusCardProps> = ({ 
  title, 
  value, 
  icon, 
  color 
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <MaterialIcons name={icon} size={24} color="white" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
});

export default StatusCard;
