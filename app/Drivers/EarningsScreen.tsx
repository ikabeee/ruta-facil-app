import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
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

const EarningsScreen: React.FC = () => {

  const handleSearchPress = () => {
    console.log('Search pressed in Unidad Asignada');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Unidad Asignada"
        showSearch={true}
        onSearchPress={handleSearchPress}
      />

      <ScrollView style={styles.content}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.mainCard}>
            <Text style={styles.mainCardTitle}>Unidad Asignada</Text>
            <Text style={styles.mainCardValue}>TAX-2024</Text>
            <View style={styles.changeIndicator}>
              <MaterialIcons name="check-circle" size={16} color={colors.success} />
              <Text style={styles.changeText}>Activa y operativa</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Kilómetros</Text>
            <Text style={styles.statValue}>24,567</Text>
            <Text style={styles.statSubtext}>km recorridos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Estado</Text>
            <Text style={styles.statValue}>Excelente</Text>
            <Text style={styles.statSubtext}>última revisión</Text>
          </View>
        </View>


      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/Drivers/HomeScreen')}
        >
          <MaterialIcons name="home" size={24} color="#666" />
          <Text style={[styles.navText, { color: "#666" }]}>Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/Drivers/TripsScreen')}
        >
          <MaterialIcons name="directions-car" size={24} color="#666" />
          <Text style={[styles.navText, { color: "#666" }]}>Rutas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/Drivers/EarningsScreen')}
        >
          <MaterialIcons name="local-taxi" size={24} color="#20c997" />
          <Text style={[styles.navText, { color: "#20c997" }]}>Unidad</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/Drivers/ProfileScreen')}
        >
          <MaterialIcons name="person" size={24} color="#666" />
          <Text style={[styles.navText, { color: "#666" }]}>Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Button for Incidents */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => router.push('/Incidents/IncidentsScreen')}
      >
        <MaterialIcons name="warning" size={28} color="white" />
      </TouchableOpacity>
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
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  headerButton: {
    padding: spacing.sm,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  summaryContainer: {
    marginBottom: spacing.lg,
  },
  mainCard: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
  },
  mainCardTitle: {
    fontSize: typography.sizes.md,
    color: 'white',
    opacity: 0.9,
  },
  mainCardValue: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: 'white',
    marginVertical: spacing.sm,
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: typography.sizes.sm,
    color: 'white',
    marginLeft: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    marginHorizontal: spacing.xs,
    elevation: 2,
  },
  statTitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statSubtext: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  chartContainer: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.lg,
    elevation: 2,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    marginTop: spacing.md,
  },
  chartText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  section: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.lg,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  earningItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  earningDate: {
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
  },
  earningTrips: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  earningAmount: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.success,
  },
  // Bottom Navigation Styles
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default EarningsScreen;