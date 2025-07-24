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

const TripsScreen: React.FC = () => {
  const [isButtonPressed, setIsButtonPressed] = React.useState(false);

  const handleSearchPress = () => {
    console.log('Search pressed in Mis Rutas');
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
      <Header 
        title="Mis Rutas"
        showSearch={true}
        showLogo={false}
        onSearchPress={handleSearchPress}
      />

      {/* Botón Empezar Ruta */}
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonTitle}>Comenzar Ruta</Text>
        <TouchableOpacity 
          style={[
            styles.startRouteButton, 
            isButtonPressed && styles.startRouteButtonPressed
          ]} 
          activeOpacity={0.8}
          onPressIn={() => setIsButtonPressed(true)}
          onPressOut={() => setIsButtonPressed(false)}
        >
          <Text style={styles.routeAssignedText}>Ruta Asignada:</Text>
          <Text style={styles.routeDetailsText}>Centro → Aeropuerto</Text>
          <MaterialIcons name="navigation" size={28} color="white" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>

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
          <MaterialIcons name="directions-car" size={24} color="#20c997" />
          <Text style={[styles.navText, { color: "#20c997" }]}>Rutas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/Drivers/EarningsScreen')}
        >
          <MaterialIcons name="local-taxi" size={24} color="#666" />
          <Text style={[styles.navText, { color: "#666" }]}>Unidad</Text>
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
  buttonContainer: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  startRouteButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 16,
    shadowColor: '#FF4444',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    paddingHorizontal: spacing.sm,
  },
  startRouteButtonPressed: {
    elevation: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    transform: [{ scale: 0.98 }],
  },
  routeAssignedText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  routeDetailsText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: 'white',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  buttonIcon: {
    marginTop: spacing.xs,
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

export default TripsScreen;