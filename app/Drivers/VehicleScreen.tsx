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

const VehicleScreen: React.FC = () => {
  const handleEditVehicle = () => {
    console.log('Edit vehicle pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Unidad"
        showEdit={true}
        onEditPress={handleEditVehicle}
      />
      
      <ScrollView style={styles.content}>
        {/* Vehicle Info Card */}
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleHeader}>
            <MaterialIcons name="directions-car" size={48} color={colors.primary} />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleBrand}>Toyota Corolla</Text>
              <Text style={styles.vehicleYear}>2020</Text>
              <Text style={styles.vehiclePlate}>ABC-123</Text>
            </View>
          </View>
        </View>

        {/* Vehicle Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Detalles del Vehículo</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Marca:</Text>
            <Text style={styles.detailValue}>Toyota</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Modelo:</Text>
            <Text style={styles.detailValue}>Corolla</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Año:</Text>
            <Text style={styles.detailValue}>2020</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Placa:</Text>
            <Text style={styles.detailValue}>ABC-123</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Color:</Text>
            <Text style={styles.detailValue}>Blanco</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsCard}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="build" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Mantenimiento</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="description" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Documentos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="local-gas-station" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Combustible</Text>
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
    elevation: 2,
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
  vehicleYear: {
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
  detailsCard: {
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  detailValue: {
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
  },
});

export default VehicleScreen;
