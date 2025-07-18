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

const TripsScreen: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const filters = ['Todos (12)', 'Hoy (3)', 'Esta semana (8)', 'Este mes (12)'];
  
  const trips = [
    {
      date: '15 Ene 2024',
      from: 'Centro Comercial Plaza',
      to: 'Zona Rosa',
      earnings: 15.50,
      time: '14:30',
      duration: '25 min',
      distance: '8.5 km',
      rating: 5,
    },
    {
      date: '15 Ene 2024',
      from: 'Aeropuerto Internacional',
      to: 'Hotel Plaza Central',
      earnings: 28.75,
      time: '12:15',
      duration: '45 min',
      distance: '15.2 km',
      rating: 4,
    },
    {
      date: '14 Ene 2024',
      from: 'Universidad Nacional',
      to: 'Residencial Norte',
      earnings: 12.25,
      time: '10:45',
      duration: '20 min',
      distance: '6.8 km',
      rating: 5,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <MaterialIcons name="menu" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Mis Rutas</Text>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.filterButton, index === 0 && styles.activeFilter]}
          >
            <Text style={[styles.filterText, index === 0 && styles.activeFilterText]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Trips List */}
      <ScrollView style={styles.tripsList}>
        {trips.map((trip, index) => (
          <View key={index} style={styles.tripCard}>
            <View style={styles.tripHeader}>
              <Text style={styles.tripDate}>{trip.date}</Text>
              <Text style={styles.tripEarnings}>${trip.earnings}</Text>
            </View>
            
            <View style={styles.routeContainer}>
              <View style={styles.routePoint}>
                <MaterialIcons name="my-location" size={16} color={colors.success} />
                <Text style={styles.locationText}>{trip.from}</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routePoint}>
                <MaterialIcons name="location-on" size={16} color={colors.error} />
                <Text style={styles.locationText}>{trip.to}</Text>
              </View>
            </View>
            
            <View style={styles.tripFooter}>
              <View style={styles.tripStats}>
                <Text style={styles.statText}>{trip.time}</Text>
                <Text style={styles.statText}>{trip.duration}</Text>
                <Text style={styles.statText}>{trip.distance}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <MaterialIcons name="star" size={16} color={colors.warning} />
                <Text style={styles.ratingText}>{trip.rating}</Text>
              </View>
            </View>
          </View>
        ))}
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
  filtersContainer: {
    backgroundColor: colors.surface,
  },
  filtersContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginRight: spacing.sm,
  },
  activeFilter: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  activeFilterText: {
    color: 'white',
    fontWeight: typography.weights.medium,
  },
  tripsList: {
    flex: 1,
    padding: spacing.lg,
  },
  tripCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    elevation: 2,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tripDate: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  tripEarnings: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.success,
  },
  routeContainer: {
    marginBottom: spacing.md,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  locationText: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: colors.border,
    marginLeft: 7,
    marginVertical: spacing.xs,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripStats: {
    flexDirection: 'row',
  },
  statText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginRight: spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
});

export default TripsScreen;