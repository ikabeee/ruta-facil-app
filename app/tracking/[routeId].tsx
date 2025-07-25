import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Map, { Marker } from '../../components/map/MapView';
import { apiService } from '../../utils/api.service';

// Tipos para TypeScript
interface BusLocation {
  routeId: number;
  position: {
    lat: number;
    lng: number;
  };
  currentStopIndex: number;
  progress: number;
  passengers: number;
  capacity: number;
  vehicleId: string;
  status: string;
  lastUpdate: number;
  eta?: number;
}

interface RouteStop {
  stopId: number;
  lat: number;
  lng: number;
  stopName: string;
  order: number;
}

interface RouteData {
  id: number;
  code: string;
  name: string;
  description: string;
  estimatedTime: number;
  totalStops: number;
}

export default function RouteTrackingScreen() {
  const router = useRouter();
  const { routeId: rawRouteId, routeName } = useLocalSearchParams();
  const mapRef = useRef(null);
  
  // Convertir routeId a string para evitar problemas de tipo
  const routeId = Array.isArray(rawRouteId) ? rawRouteId[0] : rawRouteId;
  
  // Estados
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [busLocation, setBusLocation] = useState<BusLocation | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trackingInterval, setTrackingInterval] = useState<number | null>(null);
  const [routeStops, setRouteStops] = useState<RouteStop[]>([]);
  const [routeCoordinates, setRouteCoordinates] = useState<{latitude: number, longitude: number}[]>([]);

  // Efecto para inicializar el seguimiento
  useEffect(() => {
    if (routeId) {
      initializeTracking();
    }

    return () => {
      // Limpiar intervalo cuando el componente se desmonte
      if (trackingInterval) {
        clearInterval(trackingInterval);
      }
      stopTracking();
    };
  }, [routeId]);

  /**
   * Inicializar el seguimiento de la ruta
   */
  const initializeTracking = async () => {
    try {
      setLoading(true);
      console.log(`🚀 Iniciando seguimiento para ruta ${routeId}...`);
      
      const response = await apiService.startRouteTracking(routeId);
      
      if (response.success) {
        setRouteData(response.data.route);
        setRouteStops(response.data.stops);
        setBusLocation(response.data.currentBus);
        setIsTracking(true);
        
        // Convertir coordenadas para el mapa
        const coords = response.data.stops.map((stop: any) => ({
          latitude: stop.lat,
          longitude: stop.lng
        }));
        setRouteCoordinates(coords);
        
        // Centrar el mapa en la ruta
        if (coords.length > 0 && mapRef.current) {
          (mapRef.current as any).fitToCoordinates(coords, {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true
          });
        }
        
        // Iniciar actualizaciones periódicas
        startLocationUpdates();
        
        console.log('✅ Seguimiento iniciado correctamente');
      } else {
        Alert.alert('Error', response.message || 'No se pudo iniciar el seguimiento');
        router.back();
      }
    } catch (error) {
      console.error('❌ Error al inicializar seguimiento:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Iniciar actualizaciones periódicas de ubicación
   */
  const startLocationUpdates = () => {
    const interval = setInterval(async () => {
      try {
        const response = await apiService.getBusLocation(routeId);
        if (response.success) {
          setBusLocation(response.data);
          
          // Animar el mapa hacia la nueva posición del autobús
          if (response.data.position && mapRef.current) {
            (mapRef.current as any).animateToRegion({
              latitude: response.data.position.lat,
              longitude: response.data.position.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }, 1000);
          }
        }
      } catch (error) {
        console.error('❌ Error al actualizar ubicación:', error);
      }
    }, 2000); // Actualizar cada 2 segundos
    
    setTrackingInterval(interval);
  };

  /**
   * Detener el seguimiento
   */
  const stopTracking = async () => {
    try {
      if (trackingInterval) {
        clearInterval(trackingInterval);
        setTrackingInterval(null);
      }
      
      if (isTracking && routeId) {
        await apiService.stopRouteTracking(routeId);
      }
      
      setIsTracking(false);
      console.log('🛑 Seguimiento detenido');
    } catch (error) {
      console.error('❌ Error al detener seguimiento:', error);
    }
  };

  /**
   * Función para calcular el color del autobús según ocupación
   */
  const getBusColor = () => {
    if (!busLocation) return '#007AFF';
    
    const occupancy = (busLocation.passengers / busLocation.capacity) * 100;
    if (occupancy >= 90) return '#FF3B30'; // Rojo - Lleno
    if (occupancy >= 70) return '#FF9500'; // Naranja - Casi lleno
    if (occupancy >= 40) return '#FFCC00'; // Amarillo - Medio lleno
    return '#34C759'; // Verde - Disponible
  };

  /**
   * Formatear tiempo ETA
   */
  const formatETA = (minutes: number) => {
    if (minutes < 1) return 'Llegando';
    if (minutes === 1) return '1 min';
    return `${minutes} mins`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Iniciando seguimiento...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => {
            stopTracking();
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.routeTitle}>{routeName || routeData?.name}</Text>
          <Text style={styles.routeCode}>{routeData?.code}</Text>
        </View>
        
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, { backgroundColor: isTracking ? '#34C759' : '#FF3B30' }]} />
          <Text style={styles.statusText}>{isTracking ? 'EN VIVO' : 'OFFLINE'}</Text>
        </View>
      </View>

      {/* Mapa */}
      <Map
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={false}
        initialRegion={{
          latitude: 20.179444, // Huauchinango centro
          longitude: -98.05,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        {/* Polyline de la ruta - Comentado temporalmente */}
        {/*routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#007AFF"
            strokeWidth={4}
          />
        )*/}

        {/* Marcadores de paradas */}
        {routeStops.map((stop, index) => (
          <Marker
            key={stop.stopId || index}
            coordinate={{
              latitude: stop.lat,
              longitude: stop.lng
            }}
            title={stop.stopName}
            description={`Parada ${stop.order}`}
          >
            <View style={styles.stopMarker}>
              <Text style={styles.stopNumber}>{stop.order}</Text>
            </View>
          </Marker>
        ))}

        {/* Marcador del autobús */}
        {busLocation && busLocation.position && (
          <Marker
            coordinate={{
              latitude: busLocation.position.lat,
              longitude: busLocation.position.lng
            }}
            title={`Autobús ${busLocation.vehicleId}`}
            description={`${busLocation.passengers}/${busLocation.capacity} pasajeros`}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={[styles.busMarker, { backgroundColor: getBusColor() }]}>
              <Ionicons name="bus" size={20} color="#FFFFFF" />
            </View>
          </Marker>
        )}

        {/* Círculo de precisión del autobús - Comentado temporalmente */}
        {/*busLocation && busLocation.position && (
          <Circle
            center={{
              latitude: busLocation.position.lat,
              longitude: busLocation.position.lng
            }}
            radius={50}
            fillColor="rgba(0, 122, 255, 0.1)"
            strokeColor="rgba(0, 122, 255, 0.3)"
            strokeWidth={1}
          />
        )*/}
      </Map>

      {/* Panel de información inferior */}
      {busLocation && (
        <View style={styles.infoPanel}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="people" size={20} color="#666" />
              <Text style={styles.infoText}>{busLocation.passengers}/{busLocation.capacity}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="time" size={20} color="#666" />
              <Text style={styles.infoText}>{formatETA(busLocation.eta || 5)}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="speedometer" size={20} color="#666" />
              <Text style={styles.infoText}>{Math.round(busLocation.progress || 0)}%</Text>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${busLocation.progress || 0}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>Progreso de la ruta</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.stopButton, { backgroundColor: isTracking ? '#FF3B30' : '#34C759' }]}
            onPress={() => {
              if (isTracking) {
                stopTracking();
                router.back();
              } else {
                initializeTracking();
              }
            }}
          >
            <Ionicons name={isTracking ? "stop" : "play"} size={20} color="#FFFFFF" />
            <Text style={styles.stopButtonText}>
              {isTracking ? 'Detener Seguimiento' : 'Iniciar Seguimiento'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    fontWeight: '500'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7'
  },
  backButton: {
    padding: 8,
    marginRight: 12
  },
  headerInfo: {
    flex: 1
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000'
  },
  routeCode: {
    fontSize: 14,
    color: '#666',
    marginTop: 2
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666'
  },
  map: {
    flex: 1
  },
  stopMarker: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF'
  },
  stopNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF'
  },
  busMarker: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  infoPanel: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16
  },
  infoItem: {
    alignItems: 'center'
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginTop: 4
  },
  progressContainer: {
    marginBottom: 16
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E5E7',
    borderRadius: 3,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8
  },
  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  }
});
