import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import {
    ChevronLeft,
    Clock,
    Heart,
    MapPin,
    Navigation,
    Route,
    Users
} from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { apiService, Route as RouteType } from "../../utils/api.service";

interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export default function RouteSelectorScreen() {
  const router = useRouter();
  
  // Estados principales
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearbyRoutes, setNearbyRoutes] = useState<RouteType[]>([]);
  const [allRoutes, setAllRoutes] = useState<RouteType[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(true);
  const [favoriteStates, setFavoriteStates] = useState<Record<number, boolean>>({});
  const [userId, setUserId] = useState<number | null>(null);
  const [radius, setRadius] = useState(10); // Radio en km

  // Obtener userId del AsyncStorage
  useEffect(() => {
    const getUserId = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData') || await AsyncStorage.getItem('auth_user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUserId(parsedUser.id || parsedUser.user?.id);
        }
      } catch (error) {
        console.error('❌ [ROUTE-SELECTOR] Error obteniendo userId:', error);
      }
    };
    getUserId();
  }, []);

  // Cargar rutas cercanas
  const loadNearbyRoutes = useCallback(async (location: UserLocation) => {
    try {
      setLoading(true);
      console.log(`🗺️ [ROUTE-SELECTOR] Buscando rutas cerca de (${location.latitude}, ${location.longitude})`);
      
      const routes = await apiService.getNearbyRoutes(
        location.latitude,
        location.longitude,
        radius
      );
      
      console.log(`🚌 [ROUTE-SELECTOR] ${routes.length} rutas cercanas encontradas`);
      setNearbyRoutes(routes);
      
      // Si no hay rutas cercanas, cargar todas como fallback
      if (routes.length === 0) {
        await loadAllRoutes();
      }
      
    } catch (error) {
      console.error('❌ [ROUTE-SELECTOR] Error cargando rutas cercanas:', error);
      await loadAllRoutes();
    } finally {
      setLoading(false);
    }
  }, [radius]);

  // Cargar todas las rutas como fallback
  const loadAllRoutes = async () => {
    try {
      setLoading(true);
      console.log('🚌 [ROUTE-SELECTOR] Cargando todas las rutas...');
      
      const routes = await apiService.getAllRoutes();
      setAllRoutes(routes);
      
      console.log(`✅ [ROUTE-SELECTOR] ${routes.length} rutas totales cargadas`);
    } catch (error) {
      console.error('❌ [ROUTE-SELECTOR] Error cargando rutas:', error);
      Alert.alert('Error', 'No se pudieron cargar las rutas disponibles.');
    } finally {
      setLoading(false);
    }
  };

  // Solicitar permisos y obtener ubicación
  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        console.log('📍 [ROUTE-SELECTOR] Solicitando permisos de ubicación...');
        
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permisos requeridos',
            'Para mostrarte rutas cercanas, necesitamos acceso a tu ubicación.',
            [
              { text: 'Usar ubicación predeterminada', onPress: () => loadAllRoutes() },
              { text: 'Intentar de nuevo', onPress: getCurrentLocation }
            ]
          );
          return;
        }

        console.log('🎯 [ROUTE-SELECTOR] Obteniendo ubicación actual...');
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const currentLocation: UserLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy || undefined
        };

        setUserLocation(currentLocation);
        console.log('✅ [ROUTE-SELECTOR] Ubicación obtenida:', currentLocation);
        
        // Cargar rutas cercanas
        await loadNearbyRoutes(currentLocation);
        
      } catch (error) {
        console.error('❌ [ROUTE-SELECTOR] Error obteniendo ubicación:', error);
        Alert.alert(
          'Error de ubicación',
          'No se pudo obtener tu ubicación. Se mostrarán todas las rutas disponibles.',
          [{ text: 'OK', onPress: () => loadAllRoutes() }]
        );
      } finally {
        setLocationLoading(false);
      }
    };

    getCurrentLocation();
  }, [loadNearbyRoutes]);

  // Cargar estados de favoritos
  useEffect(() => {
    const loadFavoriteStates = async () => {
      if (!userId || (nearbyRoutes.length === 0 && allRoutes.length === 0)) return;

      try {
        const routes = nearbyRoutes.length > 0 ? nearbyRoutes : allRoutes;
        const favoritePromises = routes.map(route => 
          apiService.checkIsFavorite(userId, route.id)
        );
        
        const favoriteResults = await Promise.all(favoritePromises);
        const newFavoriteStates: Record<number, boolean> = {};
        
        routes.forEach((route, index) => {
          newFavoriteStates[route.id] = favoriteResults[index];
        });
        
        setFavoriteStates(newFavoriteStates);
      } catch (error) {
        console.error('❌ [ROUTE-SELECTOR] Error cargando favoritos:', error);
      }
    };

    loadFavoriteStates();
  }, [userId, nearbyRoutes, allRoutes]);

  // Manejar selección de ruta
  const handleRouteSelect = (route: RouteType) => {
    Alert.alert(
      'Iniciar seguimiento',
      `¿Quieres seguir tu progreso en la ruta "${route.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Iniciar seguimiento',
          onPress: () => {
            console.log(`🎯 [ROUTE-SELECTOR] Iniciando seguimiento de ruta ${route.id}: ${route.name}`);
            router.push(`/tracking/user-tracking?routeId=${route.id}`);
          }
        }
      ]
    );
  };

  // Alternar favorito
  const toggleFavorite = async (route: RouteType) => {
    if (!userId) {
      Alert.alert('Error', 'Debes iniciar sesión para usar favoritos');
      return;
    }

    try {
      const newState = !favoriteStates[route.id];
      await apiService.toggleFavorite(userId, route.id);
      setFavoriteStates(prev => ({
        ...prev,
        [route.id]: newState
      }));
    } catch (error) {
      console.error('❌ [ROUTE-SELECTOR] Error toggle favorito:', error);
      Alert.alert('Error', 'No se pudo actualizar el favorito');
    }
  };

  // Función para cambiar el radio de búsqueda
  const changeRadius = (newRadius: number) => {
    setRadius(newRadius);
    if (userLocation) {
      loadNearbyRoutes(userLocation);
    }
  };

  const displayedRoutes = nearbyRoutes.length > 0 ? nearbyRoutes : allRoutes;
  const isShowingNearby = nearbyRoutes.length > 0;

  if (locationLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Obteniendo tu ubicación...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isShowingNearby ? 'Rutas Cercanas' : 'Todas las Rutas'}
        </Text>
        <View style={styles.headerRight} />
      </View>

      {/* Información de ubicación */}
      {userLocation && (
        <View style={styles.locationInfo}>
          <MapPin size={16} color="#3b82f6" />
          <Text style={styles.locationText}>
            Mostrando rutas cerca de tu ubicación actual
          </Text>
        </View>
      )}

      {/* Selector de radio */}
      {isShowingNearby && (
        <View style={styles.radiusSelector}>
          <Text style={styles.radiusLabel}>Radio de búsqueda:</Text>
          <View style={styles.radiusButtons}>
            {[5, 10, 25, 50].map((radiusOption) => (
              <TouchableOpacity
                key={radiusOption}
                style={[
                  styles.radiusButton,
                  radius === radiusOption && styles.radiusButtonActive
                ]}
                onPress={() => changeRadius(radiusOption)}
              >
                <Text style={[
                  styles.radiusButtonText,
                  radius === radiusOption && styles.radiusButtonTextActive
                ]}>
                  {radiusOption}km
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Lista de rutas */}
      <ScrollView style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={styles.loadingText}>Cargando rutas...</Text>
          </View>
        ) : displayedRoutes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Route size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No hay rutas disponibles</Text>
            <Text style={styles.emptyText}>
              {isShowingNearby 
                ? `No se encontraron rutas dentro de ${radius}km. Intenta aumentar el radio de búsqueda.`
                : 'No hay rutas registradas en el sistema.'
              }
            </Text>
            {isShowingNearby && (
              <TouchableOpacity
                style={styles.showAllButton}
                onPress={loadAllRoutes}
              >
                <Text style={styles.showAllButtonText}>Ver todas las rutas</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.routesList}>
            {displayedRoutes.map((route) => (
              <TouchableOpacity
                key={route.id}
                style={styles.routeCard}
                onPress={() => handleRouteSelect(route)}
              >
                {/* Header de la ruta */}
                <View style={styles.routeHeader}>
                  <View style={styles.routeInfo}>
                    <Text style={styles.routeName}>{route.name}</Text>
                    <Text style={styles.routeCode}>{route.code}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(route)}
                  >
                    <Heart
                      size={20}
                      color={favoriteStates[route.id] ? "#ef4444" : "#9ca3af"}
                      fill={favoriteStates[route.id] ? "#ef4444" : "transparent"}
                    />
                  </TouchableOpacity>
                </View>

                {/* Información de destinos */}
                <View style={styles.destinationInfo}>
                  <Text style={styles.destination}>
                    📍 {route.firstPoint} → {route.lastPoint}
                  </Text>
                </View>

                {/* Estadísticas de la ruta */}
                <View style={styles.routeStats}>
                  <View style={styles.statItem}>
                    <Clock size={14} color="#6b7280" />
                    <Text style={styles.statText}>
                      {route.estimatedTime ? `${route.estimatedTime} min` : 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Users size={14} color="#6b7280" />
                    <Text style={styles.statText}>{route.assignedUnits || 0} unidades</Text>
                  </View>
                  {route.distance && (
                    <View style={styles.statItem}>
                      <Navigation size={14} color="#3b82f6" />
                      <Text style={[styles.statText, { color: '#3b82f6' }]}>
                        {route.distance.toFixed(1)}km
                      </Text>
                    </View>
                  )}
                </View>

                {/* Botón de acción */}
                <View style={styles.routeAction}>
                  <TouchableOpacity style={styles.trackButton}>
                    <Navigation size={16} color="white" />
                    <Text style={styles.trackButtonText}>Seguir Ruta</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginRight: 32, // Compensar el botón de back
  },
  headerRight: {
    width: 32,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#0369a1',
  },
  radiusSelector: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  radiusLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  radiusButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  radiusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'white',
  },
  radiusButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  radiusButtonText: {
    fontSize: 12,
    color: '#6b7280',
  },
  radiusButtonTextActive: {
    color: 'white',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  showAllButton: {
    marginTop: 24,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  showAllButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  routesList: {
    padding: 16,
    gap: 12,
  },
  routeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  routeCode: {
    fontSize: 12,
    color: '#6b7280',
  },
  favoriteButton: {
    padding: 4,
  },
  destinationInfo: {
    marginBottom: 12,
  },
  destination: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  routeStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
  },
  routeAction: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  trackButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
