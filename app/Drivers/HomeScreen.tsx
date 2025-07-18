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

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola!</Text>
          <Text style={styles.driverName}>Carlos Mendoza</Text>
        </View>
        <TouchableOpacity style={styles.statusButton}>
          <MaterialIcons name="radio-button-unchecked" size={20} color="white" />
          <Text style={styles.statusText}>Desconectado</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.success }]}>
              <MaterialIcons name="attach-money" size={24} color="white" />
            </View>
            <Text style={styles.statTitle}>Ganancias Hoy</Text>
            <Text style={styles.statValue}>$125.50</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.primary }]}>
              <MaterialIcons name="directions-car" size={24} color="white" />
            </View>
            <Text style={styles.statTitle}>Viajes Hoy</Text>
            <Text style={styles.statValue}>8</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.warning }]}>
              <MaterialIcons name="star" size={24} color="white" />
            </View>
            <Text style={styles.statTitle}>Calificación</Text>
            <Text style={styles.statValue}>4.8</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.info }]}>
              <MaterialIcons name="timeline" size={24} color="white" />
            </View>
            <Text style={styles.statTitle}>Total Viajes</Text>
            <Text style={styles.statValue}>1,247</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.actionsGrid}>
            {[
              { title: 'Historial', icon: 'history', color: colors.primary },
              { title: 'Soporte', icon: 'help', color: colors.info },
              { title: 'Documentos', icon: 'description', color: colors.warning },
              { title: 'Configuración', icon: 'settings', color: colors.textSecondary },
            ].map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionButton}>
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <MaterialIcons name={action.icon as any} size={24} color="white" />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Trips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Viajes Recientes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          {[
            { from: 'Centro Comercial', to: 'Zona Rosa', earnings: 15.50, time: '14:30', rating: 5 },
            { from: 'Aeropuerto', to: 'Hotel Plaza', earnings: 28.75, time: '12:15', rating: 4 },
            { from: 'Universidad', to: 'Residencial Norte', earnings: 12.25, time: '10:45', rating: 5 },
          ].map((trip, index) => (
            <View key={index} style={styles.tripCard}>
              <View style={styles.tripInfo}>
                <View style={styles.routePoint}>
                  <MaterialIcons name="my-location" size={16} color={colors.success} />
                  <Text style={styles.locationText}>{trip.from}</Text>
                </View>
                <View style={styles.routePoint}>
                  <MaterialIcons name="location-on" size={16} color={colors.error} />
                  <Text style={styles.locationText}>{trip.to}</Text>
                </View>
              </View>
              <View style={styles.tripDetails}>
                <Text style={styles.tripTime}>{trip.time}</Text>
                <Text style={styles.tripEarnings}>${trip.earnings}</Text>
                <View style={styles.ratingContainer}>
                  <MaterialIcons name="star" size={16} color={colors.warning} />
                  <Text style={styles.ratingText}>{trip.rating}</Text>
                </View>
              </View>
            </View>
          ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    elevation: 2,
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
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontWeight: typography.weights.medium,
    marginLeft: spacing.xs,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statTitle: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  section: {
    marginVertical: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.medium,
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
  tripCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  tripInfo: {
    flex: 1,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  locationText: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    marginLeft: spacing.xs,
  },
  tripDetails: {
    alignItems: 'flex-end',
  },
  tripTime: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  tripEarnings: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.success,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
});

export default HomeScreen;
