import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors, spacing, typography } from '../Styles/theme';
import Header from './Header';

const AssignedVehicleScreen: React.FC = () => {
  const handleSearchPress = () => {
    console.log('Search pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Unidad Asignada"
        showSearch={true}
        onSearchPress={handleSearchPress}
      />
      
      <ScrollView style={styles.content}>
        {/* Assigned Vehicle Card */}
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleHeader}>
            <MaterialIcons name="directions-car" size={48} color={colors.primary} />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleBrand}>Toyota Corolla</Text>
              <Text style={styles.vehicleModel}>Modelo 2020</Text>
              <Text style={styles.vehiclePlate}>Placa: ABC-123</Text>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Activa</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Vehicle Status */}
        <View style={styles.statusCard}>
          <Text style={styles.sectionTitle}>Estado del Vehículo</Text>
          
          <View style={styles.statusRow}>
            <MaterialIcons name="local-gas-station" size={24} color={colors.warning} />
            <Text style={styles.statusLabel}>Combustible</Text>
            <Text style={styles.statusValue}>75%</Text>
          </View>
          
          <View style={styles.statusRow}>
            <MaterialIcons name="speed" size={24} color={colors.info} />
            <Text style={styles.statusLabel}>Kilometraje</Text>
            <Text style={styles.statusValue}>45,230 km</Text>
          </View>
          
          <View style={styles.statusRow}>
            <MaterialIcons name="build" size={24} color={colors.success} />
            <Text style={styles.statusLabel}>Mantenimiento</Text>
            <Text style={styles.statusValue}>Al día</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="report-problem" size={24} color={colors.error} />
            <Text style={styles.actionText}>Reportar Problema</Text>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="build" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Solicitar Mantenimiento</Text>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="description" size={24} color={colors.info} />
            <Text style={styles.actionText}>Ver Documentos</Text>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="history" size={24} color={colors.textSecondary} />
            <Text style={styles.actionText}>Historial de Uso</Text>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  vehicleCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  vehicleBrand: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  vehicleModel: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  vehiclePlate: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: spacing.xs,
  },
  statusText: {
    fontSize: typography.sizes.sm,
    color: colors.success,
    fontWeight: typography.weights.medium,
  },
  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statusLabel: {
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
    marginLeft: spacing.md,
    flex: 1,
  },
  statusValue: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
  actionsCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  actionText: {
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
    marginLeft: spacing.md,
    flex: 1,
  },
});

export default AssignedVehicleScreen;
