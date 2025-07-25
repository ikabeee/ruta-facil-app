import { useRouter } from 'expo-router';
import {
  AlertTriangle,
  ArrowLeft,
  Building,
  Bus,
  Clock,
  Heart,
  Home,
  MapPin,
  Search,
  Send,
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { apiService, Route } from '../../utils/api.service';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Cargar todas las rutas al inicio
  useEffect(() => {
    loadAllRoutes();
  }, []);

  // Buscar rutas en tiempo real cuando cambia la búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim() === '') {
        loadAllRoutes();
      } else {
        searchRoutes();
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const loadAllRoutes = async () => {
    try {
      setIsInitialLoading(true);
      console.log('🔍 [SEARCH] Cargando todas las rutas...');
      const allRoutes = await apiService.getAllRoutes();
      setRoutes(allRoutes);
      console.log('✅ [SEARCH] Rutas cargadas:', allRoutes.length);
    } catch (error) {
      console.error('❌ [SEARCH] Error cargando rutas:', error);
      setRoutes([]);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const searchRoutes = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setIsLoading(true);
      console.log('🔍 [SEARCH] Buscando rutas:', searchQuery);
      const searchResults = await apiService.searchRoutes(searchQuery.trim());
      setRoutes(searchResults);
      console.log('✅ [SEARCH] Resultados encontrados:', searchResults.length);
    } catch (error) {
      console.error('❌ [SEARCH] Error en búsqueda:', error);
      setRoutes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Función helper para obtener el color del estado
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return '#22c55e'
      case 'inactive': return '#f97316'
      case 'maintenance': return '#ef4444'
      default: return '#3b82f6'
    }
  };

  // Función helper para obtener el texto del estado
  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'Activa'
      case 'inactive': return 'Inactiva'
      case 'maintenance': return 'Mantenimiento'
      default: return 'Activa'
    }
  };

  const renderRouteItem = ({ item }: { item: Route }) => (
    <TouchableOpacity style={styles.routeCard}>
      <View style={styles.routeHeader}>
        <Text style={styles.routeName}>{item.name}</Text>
        <View style={[styles.statusBadge, { 
          backgroundColor: getStatusColor(item.status) 
        }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      
      <View style={styles.routeInfo}>
        <MapPin size={16} color="#6b7280" />
        <Text style={styles.routeDescription}>
          {item.firstPoint} → {item.lastPoint}
        </Text>
      </View>

      {item.description && (
        <Text style={styles.routeDescriptionText}>{item.description}</Text>
      )}

      <View style={styles.routeDetails}>
        <View style={styles.detailItem}>
          <Clock size={14} color="#6b7280" />
          <Text style={styles.detailText}>
            {item.estimatedTime ? `${item.estimatedTime} min` : '- min'}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <MapPin size={14} color="#6b7280" />
          <Text style={styles.detailText}>
            {item.distance ? `${item.distance.toFixed(1)} km` : '- km'}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Bus size={14} color="#6b7280" />
          <Text style={styles.detailText}>{item.totalStops} paradas</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Building size={20} color="white" />
          <Text style={styles.headerTitle}>Buscar Rutas</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar rutas por nombre, origen o destino..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
      </View>

      {/* Results */}
      <View style={styles.resultsContainer}>
        {isInitialLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#20c997" />
            <Text style={styles.loadingText}>Cargando rutas...</Text>
          </View>
        ) : (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>
                {searchQuery ? `Resultados para "${searchQuery}"` : 'Todas las rutas'}
              </Text>
              <Text style={styles.resultsCount}>
                {routes.length} ruta{routes.length !== 1 ? 's' : ''}
              </Text>
              {isLoading && (
                <ActivityIndicator size="small" color="#20c997" style={styles.searchLoader} />
              )}
            </View>

            <FlatList
              data={routes}
              renderItem={renderRouteItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    {searchQuery ? 'No se encontraron rutas' : 'No hay rutas disponibles'}
                  </Text>
                </View>
              }
            />
          </>
        )}
      </View>

      {/* Bottom Navigation */}
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
          <Search size={24} color="#20c997" />
          <Text style={[styles.navText, { color: "#20c997" }]}>Buscar</Text>
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
          <Send size={24} color="#000000ff" />
          <Text style={styles.navText}>Seguir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/incidents")}
        >
          <AlertTriangle size={24} color="#000000ff" />
          <Text style={styles.navText}>Incidentes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#20c997',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 40,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#111827',
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  resultsCount: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  searchLoader: {
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  routeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  routeDescription: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  routeDescriptionText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#6b7280',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    marginTop: 2,
    color: '#000000ff',
  },
});
