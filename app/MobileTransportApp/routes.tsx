import { useLocalSearchParams, useRouter } from "expo-router";
import {
  AlertTriangle,
  Bus,
  Circle,
  Clock,
  Heart,
  Home,
  Landmark,
  MapPin,
  Navigation,
  Search,
  Send,
  Users,
  X,
} from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Map, { Marker } from "../../components/map/MapView";
import { apiService, Route, RouteTracking, Vehicle } from '../../utils/api.service';

export default function RoutesScreen() {
  const router = useRouter();
  const { routeId } = useLocalSearchParams();
  
  // Estados para vista de seguimiento
  const [routeTracking, setRouteTracking] = useState<RouteTracking | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [trackingActive, setTrackingActive] = useState(false);
  
  // Estados para vista de listado
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const isTrackingMode = !!routeId;

  console.log('🚌 [ROUTES] Pantalla iniciada - Modo:', isTrackingMode ? `seguimiento (ID: ${routeId})` : 'listado');

  // Cargar todas las rutas disponibles
  const loadAllRoutes = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🔄 [ROUTES] Cargando todas las rutas disponibles...');
      
      const allRoutes = await apiService.getAllRoutes();
      console.log(`✅ [ROUTES] ${allRoutes.length} rutas cargadas`);
      
      setRoutes(allRoutes);
    } catch (error) {
      console.error('❌ [ROUTES] Error cargando rutas:', error);
      Alert.alert('Error', 'No se pudieron cargar las rutas disponibles');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtrar rutas por búsqueda
  const filteredRoutes = routes.filter(route => 
    route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Cargar información de la ruta
  const loadRouteTracking = useCallback(async () => {
    if (!routeId) {
      console.log('❌ [ROUTES] No se proporcionó routeId');
      Alert.alert('Error', 'No se seleccionó una ruta para seguir');
      router.back();
      return;
    }

    try {
      setLoading(true);
      console.log(`🔄 [ROUTES] Cargando información de seguimiento para ruta ${routeId}...`);
      
      const trackingData = await apiService.getRouteTracking(Number(routeId));
      console.log('✅ [ROUTES] Información de seguimiento cargada:', trackingData.route.name);
      
      setRouteTracking(trackingData);
      setVehicles(trackingData.vehicles);
      
      // Seleccionar el primer vehículo por defecto
      if (trackingData.vehicles.length > 0) {
        setSelectedVehicle(trackingData.vehicles[0]);
        setTrackingActive(true);
      }
    } catch (error) {
      console.error('❌ [ROUTES] Error cargando información de seguimiento:', error);
      Alert.alert('Error', 'No se pudo cargar la información de la ruta');
      router.back();
    } finally {
      setLoading(false);
    }
  }, [routeId, router]);

  // Actualizar posición de vehículos cada 5 segundos
  const updateVehiclePositions = useCallback(async () => {
    if (!routeId || !trackingActive) return;

    try {
      console.log(`🔄 [ROUTES] Actualizando posiciones de vehículos...`);
      const trackingData = await apiService.getRouteTracking(Number(routeId));
      setVehicles(trackingData.vehicles);
      
      // Actualizar vehículo seleccionado si existe
      if (selectedVehicle) {
        const updatedVehicle = trackingData.vehicles.find(v => v.id === selectedVehicle.id);
        if (updatedVehicle) {
          setSelectedVehicle(updatedVehicle);
        }
      }
    } catch (error) {
      console.error('❌ [ROUTES] Error actualizando posiciones:', error);
    }
  }, [routeId, trackingActive, selectedVehicle]);

  // Cargar datos iniciales
  useEffect(() => {
    if (isTrackingMode) {
      loadRouteTracking();
    } else {
      loadAllRoutes();
    }
  }, [isTrackingMode, loadRouteTracking, loadAllRoutes]);

  // Actualización automática cada 5 segundos
  useEffect(() => {
    if (!trackingActive) return;

    const interval = setInterval(() => {
      updateVehiclePositions();
    }, 5000);

    return () => clearInterval(interval);
  }, [updateVehiclePositions, trackingActive]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#20c997" />
          <Text style={styles.loadingText}>
            {isTrackingMode ? 'Cargando información de la ruta...' : 'Cargando rutas disponibles...'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Vista de listado de rutas (cuando no hay routeId)
  if (!isTrackingMode) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Bus size={20} color="#fff" style={{ marginRight: 8 }} />
            <View>
              <Text style={styles.headerTitle}>Rutas Disponibles</Text>
              <Text style={styles.headerSubtitle}>Selecciona una ruta para seguir</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <X size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Buscador */}
        <View style={styles.searchContainer}>
          <Search size={16} color="#6b7280" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar rutas..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Lista de rutas */}
        <ScrollView style={styles.routesList} showsVerticalScrollIndicator={false}>
          {filteredRoutes.length === 0 ? (
            <View style={styles.emptyContainer}>
              <AlertTriangle size={48} color="#f97316" />
              <Text style={styles.emptyTitle}>No se encontraron rutas</Text>
              <Text style={styles.emptyDescription}>
                {searchQuery ? 'Intenta con una búsqueda diferente' : 'No hay rutas disponibles en este momento'}
              </Text>
            </View>
          ) : (
            filteredRoutes.map((route) => (
              <TouchableOpacity
                key={route.id}
                style={styles.routeCard}
                onPress={() => router.push(`/MobileTransportApp/routes?routeId=${route.id}`)}
              >
                <View style={styles.routeCardHeader}>
                  <View style={styles.routeInfo}>
                    <Text style={styles.routeCardName}>{route.name}</Text>
                    <Text style={styles.routeCardDescription}>{route.description}</Text>
                  </View>
                  <View style={styles.routeActions}>
                    <TouchableOpacity style={styles.trackButton}>
                      <Navigation size={16} color="#fff" />
                      <Text style={styles.trackButtonText}>Seguir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.routeDetails}>
                  <View style={styles.routeDetail}>
                    <MapPin size={12} color="#6b7280" />
                    <Text style={styles.routeDetailText}>
                      {route.firstPoint} → {route.lastPoint}
                    </Text>
                  </View>
                  <View style={styles.routeDetail}>
                    <Clock size={12} color="#6b7280" />
                    <Text style={styles.routeDetailText}>Tiempo estimado: {route.estimatedTime} min</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {/* Barra de navegación */}
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/MobileTransportApp/user")}
          >
            <Home size={24} color="#000000ff" />
            <Text style={styles.navText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => router.push("/MobileTransportApp/search")}
          >
            <Search size={24} color="#000000ff" />
            <Text style={styles.navText}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => router.push("/MobileTransportApp/favoritos")}
          >
            <Heart size={24} color="#000000ff" />
            <Text style={styles.navText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => router.push("/MobileTransportApp/routes")}
          >
            <Send size={24} color="#f97316" />
            <Text style={[styles.navText, { color: "#f97316" }]}>Rutas</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!routeTracking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <AlertTriangle size={48} color="#ef4444" />
          <Text style={styles.errorText}>No se pudo cargar la ruta</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadRouteTracking}>
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Configurar región del mapa centrada en la ruta
  const mapRegion = {
    latitude: routeTracking.stops.length > 0 ? routeTracking.stops[0].latitude : 20.18,
    longitude: routeTracking.stops.length > 0 ? routeTracking.stops[0].longitude : -98.05,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Mapa pantalla completa */}
      <Map
        style={styles.map}
        initialRegion={mapRegion}
      >
        {/* Marcadores de paradas */}
        {routeTracking.stops.map((stop) => (
          <Marker
            key={stop.id}
            coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
            title={stop.name}
            description={stop.address}
          />
        ))}

        {/* Marcadores de vehículos */}
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            coordinate={{ latitude: vehicle.latitude, longitude: vehicle.longitude }}
            title={`Unidad ${vehicle.unitNumber}`}
            description={`${vehicle.passengers}/${vehicle.capacity} pasajeros - ${Math.round(vehicle.speed)} km/h`}
          />
        ))}
      </Map>

      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Landmark size={20} color="#fff" style={{ marginRight: 8 }} />
          <View>
            <Text style={styles.headerTitle}>Ruta Fácil</Text>
            <Text style={styles.headerSubtitle}>Huauchinango, Puebla</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <X size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Panel de información de la ruta */}
      <View style={styles.routeInfoPanel}>
        <View style={styles.routeHeader}>
          <Navigation size={16} color="#20c997" />
          <Text style={styles.routeName}>{routeTracking.route.name}</Text>
          <View style={styles.liveIndicator}>
            <Circle size={8} color="#ef4444" />
            <Text style={styles.liveText}>EN VIVO</Text>
          </View>
        </View>
        <Text style={styles.routeDescription}>{routeTracking.route.description}</Text>
      </View>

      {/* Panel de vehículos */}
      <View style={styles.vehiclesPanel}>
        <Text style={styles.vehiclesPanelTitle}>Vehículos Activos ({vehicles.length})</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vehiclesList}>
          {vehicles.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={[
                styles.vehicleCard,
                selectedVehicle?.id === vehicle.id && styles.vehicleCardSelected
              ]}
              onPress={() => setSelectedVehicle(vehicle)}
            >
              <View style={styles.vehicleHeader}>
                <Text style={styles.vehicleUnit}>Unidad {vehicle.unitNumber}</Text>
                <View style={styles.vehicleStatus}>
                  <Circle size={6} color="#22c55e" />
                </View>
              </View>
              <View style={styles.vehicleInfo}>
                <View style={styles.vehicleInfoItem}>
                  <Users size={12} color="#6b7280" />
                  <Text style={styles.vehicleInfoText}>{vehicle.passengers}/{vehicle.capacity}</Text>
                </View>
                <View style={styles.vehicleInfoItem}>
                  <Navigation size={12} color="#6b7280" />
                  <Text style={styles.vehicleInfoText}>{Math.round(vehicle.speed)} km/h</Text>
                </View>
              </View>
              {selectedVehicle?.id === vehicle.id && vehicle.nextStop && (
                <View style={styles.nextStopInfo}>
                  <Clock size={10} color="#f97316" />
                  <Text style={styles.nextStopText}>
                    Próxima: {vehicle.nextStop.stopName || 'Calculando...'}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Panel inferior con información del vehículo seleccionado */}
      {selectedVehicle && (
        <View style={styles.bottomPanel}>
          <View style={styles.selectedVehicleInfo}>
            <View style={styles.selectedVehicleHeader}>
              <Text style={styles.selectedVehicleTitle}>Unidad {selectedVehicle.unitNumber}</Text>
              <View style={styles.selectedVehicleStats}>
                <View style={styles.statItem}>
                  <Users size={14} color="#6b7280" />
                  <Text style={styles.statText}>{selectedVehicle.passengers}/{selectedVehicle.capacity}</Text>
                </View>
                <View style={styles.statItem}>
                  <Navigation size={14} color="#6b7280" />
                  <Text style={styles.statText}>{Math.round(selectedVehicle.speed)} km/h</Text>
                </View>
              </View>
            </View>
            {selectedVehicle.nextStop && (
              <View style={styles.nextStopDetails}>
                <MapPin size={12} color="#f97316" />
                <Text style={styles.nextStopTitle}>Próxima parada: {selectedVehicle.nextStop.stopName}</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Barra de navegación */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/user")}
        >
          <Home size={24} color="#000000ff" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/search")}
        >
          <Search size={24} color="#000000ff" />
          <Text style={styles.navText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/favoritos")}
        >
          <Heart size={24} color="#000000ff" />
          <Text style={styles.navText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/routes")}
        >
          <Send size={24} color="#f97316" />
          <Text style={[styles.navText, { color: "#f97316" }]}>Rutas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6b7280",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    color: "#374151",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: "#20c997",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#20c997",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  headerSubtitle: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.9,
  },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 20,
  },
  routeInfoPanel: {
    position: "absolute",
    top: 70,
    left: 16,
    right: 16,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 9,
  },
  routeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  routeName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 8,
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#dc2626",
    marginLeft: 4,
  },
  routeDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  vehiclesPanel: {
    position: "absolute",
    top: 180,
    left: 16,
    right: 16,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 8,
  },
  vehiclesPanelTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  vehiclesList: {
    maxHeight: 120,
  },
  vehicleCard: {
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
    minWidth: 140,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  vehicleCardSelected: {
    backgroundColor: "#ecfdf5",
    borderColor: "#20c997",
  },
  vehicleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  vehicleUnit: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  vehicleStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22c55e",
  },
  vehicleInfo: {
    gap: 4,
  },
  vehicleInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  vehicleInfoText: {
    fontSize: 10,
    color: "#6b7280",
  },
  nextStopInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  nextStopText: {
    fontSize: 9,
    color: "#f97316",
    fontWeight: "500",
  },
  bottomPanel: {
    position: "absolute",
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 7,
  },
  selectedVehicleInfo: {
    gap: 12,
  },
  selectedVehicleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedVehicleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  selectedVehicleStats: {
    flexDirection: "row",
    gap: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: "#6b7280",
  },
  nextStopDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  nextStopTitle: {
    fontSize: 12,
    color: "#f97316",
    fontWeight: "500",
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 10,
    marginTop: 2,
    color: "#6b7280",
  },
  // Nuevos estilos para vista de listado
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 12,
    margin: 16,
    marginTop: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#374151",
  },
  routesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
  },
  routeCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  routeCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  routeInfo: {
    flex: 1,
    marginRight: 12,
  },
  routeCardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  routeCardDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  routeActions: {
    alignItems: "flex-end",
  },
  trackButton: {
    backgroundColor: "#20c997",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  trackButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  routeDetails: {
    gap: 8,
  },
  routeDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  routeDetailText: {
    fontSize: 12,
    color: "#6b7280",
  },
});
