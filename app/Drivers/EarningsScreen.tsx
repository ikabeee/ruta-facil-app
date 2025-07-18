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
import HamburgerMenu from './HamburgerMenu';

const EarningsScreen: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={toggleMenu}
        >
          <MaterialIcons name="menu" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Ganancias</Text>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="file-download" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.mainCard}>
            <Text style={styles.mainCardTitle}>Ganancias de Hoy</Text>
            <Text style={styles.mainCardValue}>$125.50</Text>
            <View style={styles.changeIndicator}>
              <MaterialIcons name="trending-up" size={16} color={colors.success} />
              <Text style={styles.changeText}>+12% vs ayer</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Esta Semana</Text>
            <Text style={styles.statValue}>$847.25</Text>
            <Text style={styles.statSubtext}>32 viajes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Este Mes</Text>
            <Text style={styles.statValue}>$3,245.80</Text>
            <Text style={styles.statSubtext}>128 viajes</Text>
          </View>
        </View>

        {/* Chart Placeholder */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Ganancias por Día</Text>
          <View style={styles.chartPlaceholder}>
            <MaterialIcons name="show-chart" size={48} color={colors.textSecondary} />
            <Text style={styles.chartText}>Gráfico de ganancias</Text>
          </View>
        </View>

        {/* Recent Earnings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ganancias Recientes</Text>
          {[
            { date: 'Hoy', amount: 125.50, trips: 8 },
            { date: 'Ayer', amount: 98.75, trips: 6 },
            { date: '13 Ene', amount: 156.25, trips: 10 },
            { date: '12 Ene', amount: 87.50, trips: 5 },
          ].map((earning, index) => (
            <View key={index} style={styles.earningItem}>
              <View>
                <Text style={styles.earningDate}>{earning.date}</Text>
                <Text style={styles.earningTrips}>{earning.trips} viajes</Text>
              </View>
              <Text style={styles.earningAmount}>${earning.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Hamburger Menu Overlay */}
      <HamburgerMenu 
        isVisible={isMenuVisible} 
        onClose={() => setIsMenuVisible(false)} 
      />
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
});

export default EarningsScreen;