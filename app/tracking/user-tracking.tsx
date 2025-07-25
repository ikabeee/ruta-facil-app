import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    AlertTriangle,
    Bus,
    CheckCircle,
    Clock,
    MapPin,
    Navigation,
    Pause,
    Play,
    RotateCcw,
    X
} from "lucide-react-native";
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Map, { Marker } from '../../components/map/MapView';
import { apiService, RouteTracking, Vehicle } from '../../utils/api.service';

// Interfaces para el seguimiento del usuario
interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

interface RouteProgress {
  currentStopIndex: number;
  distanceToNextStop: number;
  estimatedTimeToNextStop: number;
  totalProgress: number; // 0-1
  remainingDistance: number;
  estimatedTimeRemaining: number;
  isNearStop: boolean;
  hasPassedStop: boolean;
}

export default function UserTrackingScreen() {
  const { routeId } = useLocalSearchParams<{ routeId: string }>();
  const router = useRouter();
  
  // Estados principales
  const [routeData, setRouteData] = useState<RouteTracking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para seguimiento del usuario
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isTrackingUser, setIsTrackingUser] = useState(false);
  const [routeProgress, setRouteProgress] = useState<RouteProgress | null>(null);
  const [locationSubscription, setLocationSubscription] = useState<Location.LocationSubscription | null>(null);
  
  // Estados para vehículos
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Función para solicitar permisos de ubicación
  const requestLocationPermission = async () => {
    try {
      console.log('📍 [USER-TRACKING] Solicitando permisos de ubicación...');
      
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      console.log('📍 [USER-TRACKING] Permiso foreground:', foregroundStatus);
      
      if (foregroundStatus !== 'granted') {
        Alert.alert(
          'Permisos requeridos',
          'Para seguir tu progreso en la ruta, necesitamos acceso a tu ubicación.',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Intentar de nuevo', onPress: requestLocationPermission }
          ]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('❌ [USER-TRACKING] Error solicitando permisos:', error);
      return false;
    }
  };

  // Función para calcular distancia entre dos puntos
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distancia en km
  };

  // Función para calcular el progreso del usuario en la ruta
  const calculateRouteProgress = useCallback((userLoc: UserLocation, routeData: RouteTracking): RouteProgress => {
    if (!routeData.stops || routeData.stops.length === 0) {
      return {
        currentStopIndex: 0,
        distanceToNextStop: 0,
        estimatedTimeToNextStop: 0,
        totalProgress: 0,
        remainingDistance: 0,
        estimatedTimeRemaining: 0,
        isNearStop: false,
        hasPassedStop: false
      };
    }

    const stops = routeData.stops;
    let currentStopIndex = 0;
    let minDistance = Infinity;

    // Encontrar la parada más cercana
    stops.forEach((stop, index) => {
      const distance = calculateDistance(
        userLoc.latitude, 
        userLoc.longitude, 
        stop.latitude, 
        stop.longitude
      );
      if (distance < minDistance) {
        minDistance = distance;
        currentStopIndex = index;
      }
    });

    // Determinar si está cerca de una parada (< 100m)
    const isNearStop = minDistance < 0.1;
    
    // Determinar si ya pasó la parada (verificar dirección del movimiento)
    const hasPassedStop = currentStopIndex > 0 && minDistance > 0.2;

    // Si estamos cerca de la última parada, considerar que hemos llegado
    if (currentStopIndex === stops.length - 1 && isNearStop) {
      return {
        currentStopIndex,
        distanceToNextStop: 0,
        estimatedTimeToNextStop: 0,
        totalProgress: 1,
        remainingDistance: 0,
        estimatedTimeRemaining: 0,
        isNearStop: true,
        hasPassedStop: false
      };
    }

    // Calcular progreso y distancias
    const nextStopIndex = Math.min(currentStopIndex + 1, stops.length - 1);
    const nextStop = stops[nextStopIndex];
    
    const distanceToNextStop = calculateDistance(
      userLoc.latitude,
      userLoc.longitude,
      nextStop.latitude,
      nextStop.longitude
    );

    // Calcular distancia restante total
    let remainingDistance = distanceToNextStop;
    for (let i = nextStopIndex; i < stops.length - 1; i++) {
      remainingDistance += calculateDistance(
        stops[i].latitude,
        stops[i].longitude,
        stops[i + 1].latitude,
        stops[i + 1].longitude
      );
    }

    // Calcular progreso total (0-1)
    const totalRouteDistance = routeData.route.distance || 10; // fallback
    const completedDistance = Math.max(0, totalRouteDistance - remainingDistance);
    const totalProgress = Math.min(1, Math.max(0, completedDistance / totalRouteDistance));

    // Estimaciones de tiempo (velocidad promedio 25 km/h en ciudad)
    const averageSpeed = 25; // km/h
    const estimatedTimeToNextStop = (distanceToNextStop / averageSpeed) * 60; // minutos
    const estimatedTimeRemaining = (remainingDistance / averageSpeed) * 60; // minutos

    return {
      currentStopIndex,
      distanceToNextStop,
      estimatedTimeToNextStop,
      totalProgress,
      remainingDistance,
      estimatedTimeRemaining,
      isNearStop,
      hasPassedStop
    };
  }, []);

  // Función para iniciar el seguimiento del usuario
  const startUserTracking = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    try {
      console.log('🎯 [USER-TRACKING] Iniciando seguimiento del usuario...');
      setIsTrackingUser(true);

      // Obtener ubicación inicial
      const initialLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const userLoc: UserLocation = {
        latitude: initialLocation.coords.latitude,
        longitude: initialLocation.coords.longitude,
        accuracy: initialLocation.coords.accuracy || undefined,
        timestamp: initialLocation.timestamp
      };

      setUserLocation(userLoc);
      console.log('📍 [USER-TRACKING] Ubicación inicial:', userLoc);

      // Calcular progreso inicial
      if (routeData) {
        const progress = calculateRouteProgress(userLoc, routeData);
        setRouteProgress(progress);
        console.log('📊 [USER-TRACKING] Progreso inicial:', progress);
      }

      // Suscribirse a actualizaciones de ubicación
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000, // Actualizar cada 3 segundos
          distanceInterval: 5, // O cuando se mueva 5 metros
        },
        (location) => {
          const newUserLoc: UserLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy || undefined,
            timestamp: location.timestamp
          };

          console.log('📍 [USER-TRACKING] Nueva ubicación usuario:', newUserLoc);
          setUserLocation(newUserLoc);

          // Recalcular progreso
          if (routeData) {
            const progress = calculateRouteProgress(newUserLoc, routeData);
            setRouteProgress(progress);
            console.log('📊 [USER-TRACKING] Progreso actualizado:', progress);
          }
        }
      );

      setLocationSubscription(subscription);
      
    } catch (error) {
      console.error('❌ [USER-TRACKING] Error iniciando seguimiento:', error);
      Alert.alert('Error', 'No se pudo iniciar el seguimiento de ubicación');
      setIsTrackingUser(false);
    }
  };

  // Función para detener el seguimiento
  const stopUserTracking = () => {
    console.log('⏹️ [USER-TRACKING] Deteniendo seguimiento del usuario...');
    setIsTrackingUser(false);
    setRouteProgress(null);
    
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
    }
  };

  // Cargar datos de la ruta
  const loadRouteData = useCallback(async () => {
    if (!routeId) {
      Alert.alert('Error', 'No se seleccionó una ruta');
      router.back();
      return;
    }

    try {
      setLoading(true);
      console.log(`🔄 [USER-TRACKING] Cargando datos de ruta ${routeId}...`);
      
      const trackingData = await apiService.getRouteTracking(Number(routeId));
      console.log('✅ [USER-TRACKING] Datos de ruta cargados:', trackingData.route.name);
      
      setRouteData(trackingData);
      setVehicles(trackingData.vehicles);
      
      if (trackingData.vehicles.length > 0) {
        setSelectedVehicle(trackingData.vehicles[0]);
      }
    } catch (error) {
      console.error('❌ [USER-TRACKING] Error cargando datos:', error);
      setError('No se pudo cargar la información de la ruta');
    } finally {
      setLoading(false);
    }
  }, [routeId, router]);

  // Actualizar posiciones de vehículos
  const updateVehiclePositions = useCallback(async () => {
    if (!routeId || vehicles.length === 0) return;

    try {
      const trackingData = await apiService.getRouteTracking(Number(routeId));
      setVehicles(trackingData.vehicles);
      
      // Actualizar vehículo seleccionado
      if (selectedVehicle) {
        const updatedVehicle = trackingData.vehicles.find(v => v.id === selectedVehicle.id);
        if (updatedVehicle) {
          setSelectedVehicle(updatedVehicle);
        }
      }
    } catch (error) {
      console.error('❌ [USER-TRACKING] Error actualizando vehículos:', error);
    }
  }, [routeId, vehicles.length, selectedVehicle]);

  // Efectos
  useEffect(() => {
    loadRouteData();
  }, [loadRouteData]);

  useEffect(() => {
    if (!isTrackingUser) return;

    const interval = setInterval(updateVehiclePositions, 5000);
    return () => clearInterval(interval);
  }, [isTrackingUser, updateVehiclePositions]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [locationSubscription]);

  // Formatear tiempo
  const formatTime = (minutes: number): string => {
    if (minutes < 1) return '< 1 min';
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  // Formatear distancia
  const formatDistance = (km: number): string => {
    if (km < 1) return `${Math.round(km * 1000)} m`;
    return `${km.toFixed(1)} km`;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#20c997" />
          <Text style={styles.loadingText}>Cargando información de la ruta...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !routeData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <AlertTriangle size={48} color="#ef4444" />
          <Text style={styles.errorText}>{error || 'Error cargando la ruta'}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadRouteData}>
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <X size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{routeData.route.name}</Text>
          <Text style={styles.headerSubtitle}>
            {isTrackingUser ? 'Siguiendo tu ubicación' : 'Toca "Iniciar" para comenzar'}
          </Text>
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <Map
          style={styles.map}
          initialRegion={{
            latitude: userLocation?.latitude || routeData.stops?.[0]?.latitude || 20.17667,
            longitude: userLocation?.longitude || routeData.stops?.[0]?.longitude || -98.05,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={isTrackingUser}
        >
          {/* Paradas de la ruta */}
          {routeData.stops?.map((stop, index) => {
            const isCurrentStop = routeProgress?.currentStopIndex === index;
            const isPassedStop = routeProgress ? index < routeProgress.currentStopIndex : false;
            
            return (
              <Marker
                key={`stop-${stop.id}`}
                coordinate={{
                  latitude: stop.latitude,
                  longitude: stop.longitude,
                }}
                title={stop.name}
                description={`Parada ${index + 1} ${isCurrentStop ? '(Siguiente)' : isPassedStop ? '(Visitada)' : ''}`}
                pinColor={isCurrentStop ? '#22c55e' : isPassedStop ? '#9ca3af' : '#ef4444'}
              />
            );
          })}

          {/* Vehículos */}
          {vehicles.map((vehicle) => (
            <Marker
              key={`vehicle-${vehicle.id}`}
              coordinate={{
                latitude: vehicle.latitude,
                longitude: vehicle.longitude,
              }}
              title={`Unidad ${vehicle.unitNumber}`}
              description={`${vehicle.passengers} pasajeros • ${vehicle.status}`}
              pinColor="#3b82f6"
            />
          ))}

          {/* Ubicación del usuario con estilo personalizado */}
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Tu ubicación"
              description={`Precisión: ${userLocation.accuracy ? Math.round(userLocation.accuracy) + 'm' : 'N/A'}`}
              pinColor="#20c997"
              anchor={{ x: 0.5, y: 0.5 }}
            />
          )}
        </Map>

        {/* Indicador de seguimiento activo */}
        {isTrackingUser && (
          <View style={styles.trackingIndicator}>
            <View style={styles.trackingDot} />
            <Text style={styles.trackingText}>Siguiendo ubicación</Text>
          </View>
        )}
      </View>

      {/* Panel de progreso */}
      {routeProgress && (
        <View style={styles.progressPanel}>
          <View style={styles.progressHeader}>
            <Navigation size={20} color="#20c997" />
            <Text style={styles.progressTitle}>Tu progreso en la ruta</Text>
          </View>
          
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${routeProgress.totalProgress * 100}%` }]} />
          </View>
          
          <View style={styles.progressStats}>
            <View style={styles.statItem}>
              <Clock size={16} color="#6b7280" />
              <Text style={styles.statLabel}>Tiempo restante</Text>
              <Text style={styles.statValue}>{formatTime(routeProgress.estimatedTimeRemaining)}</Text>
            </View>
            
            <View style={styles.statItem}>
              <MapPin size={16} color="#6b7280" />
              <Text style={styles.statLabel}>Distancia restante</Text>
              <Text style={styles.statValue}>{formatDistance(routeProgress.remainingDistance)}</Text>
            </View>
          </View>

          {/* Información de la próxima parada */}
          {routeData.stops && routeProgress.currentStopIndex < routeData.stops.length && (
            <View style={styles.nextStopInfo}>
              <Text style={styles.nextStopTitle}>Próxima parada:</Text>
              <Text style={styles.nextStopName}>
                {routeData.stops[Math.min(routeProgress.currentStopIndex + 1, routeData.stops.length - 1)]?.name || 'Destino final'}
              </Text>
              <Text style={styles.nextStopDistance}>
                {formatDistance(routeProgress.distanceToNextStop)} • {formatTime(routeProgress.estimatedTimeToNextStop)}
              </Text>
            </View>
          )}

          {routeProgress.isNearStop && (
            <View style={styles.nearStopAlert}>
              <CheckCircle size={16} color="#22c55e" />
              <Text style={styles.nearStopText}>
                ¡Estás cerca de una parada!
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Panel de control */}
      <View style={styles.controlPanel}>
        {!isTrackingUser ? (
          <TouchableOpacity style={styles.startButton} onPress={startUserTracking}>
            <Play size={20} color="white" />
            <Text style={styles.startButtonText}>Iniciar seguimiento</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.trackingControls}>
            <TouchableOpacity style={styles.pauseButton} onPress={stopUserTracking}>
              <Pause size={20} color="white" />
              <Text style={styles.pauseButtonText}>Pausar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resetButton} onPress={() => {
              stopUserTracking();
              setTimeout(startUserTracking, 500);
            }}>
              <RotateCcw size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        )}

        {/* Info de vehículo seleccionado */}
        {selectedVehicle && (
          <View style={styles.vehicleInfo}>
            <Bus size={16} color="#20c997" />
            <Text style={styles.vehicleText}>
              Unidad {selectedVehicle.unitNumber} • {selectedVehicle.passengers} pasajeros
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#20c997',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#20c997',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  backButton: {
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  progressPanel: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#20c997',
    borderRadius: 3,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 2,
  },
  nearStopAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  nearStopText: {
    marginLeft: 8,
    color: '#16a34a',
    fontWeight: '500',
  },
  controlPanel: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  startButton: {
    backgroundColor: '#20c997',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  trackingControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pauseButton: {
    backgroundColor: '#ef4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    flex: 1,
  },
  pauseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  resetButton: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  vehicleText: {
    marginLeft: 8,
    color: '#6b7280',
    fontSize: 14,
  },
  trackingIndicator: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(32, 201, 151, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  trackingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginRight: 6,
  },
  trackingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  nextStopInfo: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  nextStopTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  nextStopName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  nextStopDistance: {
    fontSize: 12,
    color: '#6b7280',
  },
});
