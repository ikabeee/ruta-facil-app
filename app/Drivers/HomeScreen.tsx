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
import HamburgerMenu from './HamburgerMenu';

interface HomeScreenProps {
  // No navigation props needed for expo-router
};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Menu Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={toggleMenu}
        >
          <MaterialIcons name="menu" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
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
            <Text style={styles.statTitle}>Rutas Hoy</Text>
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

        {/* Recent Routes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Rutas Recientes</Text>
            <TouchableOpacity onPress={() => router.push('/Drivers/TripsScreen')}>
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
  menuButton: {
    padding: spacing.sm,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
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
  
  // Menu Hamburger Styles
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  menuBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuDrawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: colors.surface,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuHeader: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuUserInfo: {
    flex: 1,
  },
  menuUserName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: 'white',
    marginBottom: spacing.xs,
  },
  menuUserStatus: {
    fontSize: typography.sizes.sm,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.xs,
  },
  menuRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuRating: {
    fontSize: typography.sizes.sm,
    color: 'white',
    marginLeft: spacing.xs,
    fontWeight: typography.weights.medium,
  },
  menuContent: {
    flex: 1,
    paddingVertical: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuText: {
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
    marginLeft: spacing.md,
    fontWeight: typography.weights.medium,
  },
  menuQuickActions: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.md,
  },
  menuSectionTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    letterSpacing: 1,
  },
  menuQuickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginBottom: spacing.sm,
    justifyContent: 'center',
  },
  menuQuickActionText: {
    fontSize: typography.sizes.xs,
    color: 'white',
    marginLeft: spacing.xs,
    fontWeight: typography.weights.medium,
  },
  menuLogoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  menuLogoutText: {
    fontSize: typography.sizes.md,
    color: colors.error,
    marginLeft: spacing.sm,
    fontWeight: typography.weights.medium,
  },
});

export default HomeScreen;
