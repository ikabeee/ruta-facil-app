import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors, spacing, typography } from '../Styles/theme';
import Header from './Header';

const { height } = Dimensions.get('window');

const TripsScreen: React.FC = () => {
  const [isButtonPressed, setIsButtonPressed] = React.useState(false);

  const handleSearchPress = () => {
    console.log('Search pressed in Mis Rutas');
  };

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
    <View style={styles.container}>
      {/* Mapa de fondo */}
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 13.7031,
          longitude: -89.2044,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: 13.7031, longitude: -89.2044 }}
          title="Inicio"
          description="Centro Comercial Plaza"
        />
        <Marker
          coordinate={{ latitude: 13.6929, longitude: -89.2182 }}
          title="Destino"
          description="Aeropuerto Internacional"
          pinColor="tomato"
        />
      </MapView>

      {/* Encabezado y botón */}
      <SafeAreaView style={styles.headerWrapper}>
        <Header
          title="Mis Rutas"
          showSearch
          showLogo={false}
          onSearchPress={handleSearchPress}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.startRouteButton,
              isButtonPressed && styles.startRouteButtonPressed,
            ]}
            activeOpacity={0.8}
            onPressIn={() => setIsButtonPressed(true)}
            onPressOut={() => setIsButtonPressed(false)}
          >
            <Text style={styles.routeAssignedText}>Ruta:</Text>
            <Text style={styles.routeDetailsText}>Centro → Aeropuerto</Text>
            <MaterialIcons name="navigation" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Hoja inferior */}
      <View style={styles.bottomSheet}>
        <ScrollView contentContainerStyle={styles.tripsList}>
          {trips.map((trip, index) => (
            <View key={index} style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <Text style={styles.tripDate}>{trip.date}</Text>
                <Text style={styles.tripEarnings}>${trip.earnings}</Text>
              </View>

              <View style={styles.routeContainer}>
                <View style={styles.routePoint}>
                  <MaterialIcons name="my-location" size={14} color={colors.success} />
                  <Text style={styles.locationText}>{trip.from}</Text>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routePoint}>
                  <MaterialIcons name="location-on" size={14} color={colors.error} />
                  <Text style={styles.locationText}>{trip.to}</Text>
                </View>
              </View>

              <View style={styles.tripFooter}>
                <Text style={styles.statText}>
                  {trip.time} • {trip.duration} • {trip.distance}
                </Text>
                <View style={styles.ratingContainer}>
                  <MaterialIcons name="star" size={14} color={colors.warning} />
                  <Text style={styles.ratingText}>{trip.rating}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Navegación inferior original */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/Drivers/HomeScreen')}>
          <MaterialIcons name="home" size={24} color="#999" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/Drivers/TripsScreen')}>
          <MaterialIcons name="directions-car" size={24} color="#20c997" />
          <Text style={[styles.navText, { color: '#20c997' }]}>Rutas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/Drivers/EarningsScreen')}>
          <MaterialIcons name="local-taxi" size={24} color="#999" />
          <Text style={styles.navText}>Unidad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/Drivers/ProfileScreen')}>
          <MaterialIcons name="person" size={24} color="#999" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Botón flotante */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push('/Incidents/IncidentsScreen')}
      >
        <MaterialIcons name="warning" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,
    backgroundColor: 'transparent',
    paddingTop: spacing.sm,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  startRouteButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  startRouteButtonPressed: { transform: [{ scale: 0.97 }], opacity: 0.9 },
  routeAssignedText: { fontSize: 11, color: 'white', opacity: 0.8, marginBottom: 2 },
  routeDetailsText: { fontSize: 12, color: 'white', fontWeight: 'bold' },

  bottomSheet: {
    position: 'absolute',
    bottom: 70,
    width: '100%',
    height: height * 0.38,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  tripsList: { paddingBottom: 100 },
  tripCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    elevation: 1,
  },
  tripHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  tripDate: { fontSize: 12, color: colors.textSecondary },
  tripEarnings: { fontSize: 14, fontWeight: 'bold', color: colors.success },
  routeContainer: { marginBottom: 4 },
  routePoint: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  locationText: { fontSize: 13, color: colors.textPrimary, marginLeft: 6, flex: 1 },
  routeLine: {
    width: 2,
    height: 12,
    backgroundColor: colors.border,
    marginLeft: 7,
    marginVertical: 2,
  },
  tripFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statText: { fontSize: 11, color: colors.textSecondary },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 12, color: colors.textSecondary, marginLeft: 4 },

  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 8,
    elevation: 8,
    zIndex: 20,
  },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 12, color: '#999', marginTop: 2, fontWeight: '500' },

  floatingButton: {
    position: 'absolute',
    bottom: 120,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    zIndex: 15,
  },
});

export default TripsScreen;
