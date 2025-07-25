import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import {
  AlertTriangle,
  Building,
  Bus,
  Clock,
  Heart,
  Home,
  MapPin,
  Search,
  Send,
  User,
} from "lucide-react-native"
import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { apiService, Location, Route } from "../../utils/api.service"

export default function MobileTransportApp() {
  const router = useRouter()
  const [routes, setRoutes] = useState<Route[]>([])
  const [location, setLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState(true)
  const [favoriteStates, setFavoriteStates] = useState<Record<number, boolean>>({})
  const [userId, setUserId] = useState<number | null>(null)

  // Obtener userId del AsyncStorage
  useEffect(() => {
    const getUserId = async () => {
      try {
        console.log('👤 [USER] Intentando obtener datos del usuario...')
        
        // Primero intentar con 'userData' (formato anterior)
        let userData = await AsyncStorage.getItem('userData')
        console.log('👤 [USER] userData:', userData)
        
        // Si no existe, intentar con 'auth_user' (formato actual)
        if (!userData) {
          const authUser = await AsyncStorage.getItem('auth_user')
          console.log('👤 [USER] auth_user:', authUser)
          userData = authUser
        }
        
        if (userData) {
          const user = JSON.parse(userData)
          console.log('👤 [USER] Usuario parseado:', user)
          console.log('👤 [USER] User ID encontrado:', user.id)
          setUserId(user.id)
        } else {
          console.log('❌ [USER] No se encontraron datos de usuario')
          console.log('📋 [USER] Verificando todas las claves en AsyncStorage...')
          
          // Verificar qué claves existen en AsyncStorage
          const allKeys = await AsyncStorage.getAllKeys()
          console.log('🔑 [USER] Claves en AsyncStorage:', allKeys)
          
          // Intentar mostrar el contenido de cada clave relacionada con usuario
          for (const key of allKeys) {
            if (key.includes('user') || key.includes('auth') || key.includes('token')) {
              const value = await AsyncStorage.getItem(key)
              console.log(`📝 [USER] ${key}:`, value)
            }
          }
        }
      } catch (error) {
        console.error('❌ [USER] Error obteniendo datos del usuario:', error)
      }
    }
    getUserId()
  }, [])

  // Cargar datos al inicializar el componente
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        console.log('🚀 [USER] Iniciando carga de datos...')
        setLoading(true)
        
        // Primero cargar la ubicación
        console.log('📍 [USER] Cargando ubicación...')
        const locationData = await apiService.getCurrentLocation()
        console.log('📍 [USER] Ubicación obtenida:', locationData)
        setLocation(locationData)
        
        // Luego cargar rutas cercanas basadas en la ubicación
        console.log('� [USER] Cargando rutas cercanas...')
        let routesData: Route[] = []
        
        try {
          // Intentar obtener rutas cercanas si tenemos coordenadas válidas
          if (locationData.latitude && locationData.longitude) {
            console.log(`🗺️ [USER] Buscando rutas cerca de ${locationData.latitude}, ${locationData.longitude}`)
            routesData = await apiService.getNearbyRoutes(
              locationData.latitude, 
              locationData.longitude, 
              10 // Radio de 10km
            )
            console.log(`� [USER] ${routesData.length} rutas cercanas encontradas`)
          }
          
          // Si no hay rutas cercanas, cargar todas las rutas como fallback
          if (routesData.length === 0) {
            console.log('🚌 [USER] No hay rutas cercanas, cargando todas las rutas...')
            routesData = await apiService.getAllRoutes()
            console.log(`🚌 [USER] ${routesData.length} rutas totales cargadas`)
          }
        } catch (error) {
          console.error('❌ [USER] Error cargando rutas cercanas, usando fallback:', error)
          routesData = await apiService.getAllRoutes()
        }
        
        setRoutes(routesData)
        console.log('✅ [USER] Datos básicos cargados correctamente')
      } catch (error) {
        console.error('❌ [USER] Error loading initial data:', error)
        Alert.alert(
          'Error',
          'No se pudieron cargar los datos. Por favor, intenta de nuevo.',
          [{ text: 'Reintentar', onPress: () => loadInitialData() }]
        )
      } finally {
        setLoading(false)
      }
    }

    // Cargar datos básicos inmediatamente
    loadInitialData()
  }, [])

  // Cargar estados de favoritos cuando tenemos userId y rutas
  useEffect(() => {
    const loadFavoriteStates = async () => {
      if (!userId || routes.length === 0) {
        console.log('⏳ [USER] Esperando userId y rutas para cargar favoritos...')
        return
      }

      try {
        console.log(`⭐ [USER] Cargando estados de favoritos para usuario ${userId}...`)
        const favoritePromises = routes.map(route => 
          apiService.checkIsFavorite(userId, route.id)
        )
        const favoriteResults = await Promise.all(favoritePromises)
        
        const newFavoriteStates: Record<number, boolean> = {}
        routes.forEach((route, index) => {
          newFavoriteStates[route.id] = favoriteResults[index]
        })
        
        console.log('✅ [USER] Estados de favoritos cargados:', newFavoriteStates)
        setFavoriteStates(newFavoriteStates)
      } catch (error) {
        console.error('❌ [USER] Error loading favorite states:', error)
      }
    }

    loadFavoriteStates()
  }, [userId, routes])

  // Función para manejar agregar/quitar favoritos
  const handleToggleFavorite = async (route: Route) => {
    if (!userId) {
      console.log('❌ [USER] No hay userId para toggle favorito')
      Alert.alert('Error', 'Debes iniciar sesión para usar favoritos')
      return
    }

    try {
      console.log(`⭐ [USER] Toggle favorito para ruta ${route.id} (${route.name})`)
      const result = await apiService.toggleFavorite(userId, route.id, route.name)
      console.log('✅ [USER] Toggle favorito resultado:', result)
      
      // Actualizar el estado local
      setFavoriteStates(prev => ({
        ...prev,
        [route.id]: result.action === 'added'
      }))

      // Mostrar mensaje de confirmación
      const message = result.action === 'added' ? 'Ruta agregada a favoritos' : 'Ruta eliminada de favoritos'
      Alert.alert('Éxito', message)
    } catch (error) {
      console.error('❌ [USER] Error toggling favorite:', error)
      Alert.alert('Error', 'No se pudo actualizar favoritos. Intenta de nuevo.')
    }
  }

  // Función helper para obtener el color del estado
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return '#22c55e'
      case 'inactive': return '#f97316'
      case 'maintenance': return '#ef4444'
      default: return '#3b82f6'
    }
  }

  // Función helper para obtener el texto del estado
  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'Activa'
      case 'inactive': return 'Inactiva'
      case 'maintenance': return 'Mantenimiento'
      default: return 'Activa'
    }
  }

  return (
    <View style={styles.container}>
      {/* Header con botón de perfil */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Building size={24} color="white" />
          <View>
            <Text style={styles.headerTitle}>Ruta Facil</Text>
            <Text style={styles.headerSubtitle}>Huauchinango, Puebla</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => router.push('/MobileTransportApp/profile')}
        >
          <User size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView style={styles.content} contentContainerStyle={{ padding: 16 }}>
        {/* Location Card */}
        <View style={styles.locationCard}>
          <View style={styles.locationTop}>
            <MapPin size={16} color="white" />
            <Text style={styles.locationLabel}>Tu ubicación actual</Text>
          </View>
          <Text style={styles.locationTitle}>
            {location?.address || 'Cargando...'}
          </Text>
          <Text style={styles.locationSubtitle}>
            {location ? `${location.city}, ${location.state}` : 'Huauchinango, Puebla'}
          </Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#000000ff" style={styles.searchIcon} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/MobileTransportApp/search")}
            style={{ flex: 1 }}
          >
            <View pointerEvents="none">
              <TextInput
                style={styles.searchInput}
                placeholder="¿A dónde quieres ir?"
                placeholderTextColor="#000000ff"
                editable={false}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionBtn}>
            <Heart size={24} color="#20c997" />
            <Text style={styles.quickActionText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionBtn}>
            <Search size={24} color="#20c997" />
            <Text style={styles.quickActionText}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickActionBtn, styles.trackRouteBtn]}
            onPress={() => router.push('/tracking/route-selector')}
          >
            <Bus size={24} color="white" />
            <Text style={[styles.quickActionText, { color: 'white', fontWeight: '600' }]}>Seguir Ruta</Text>
          </TouchableOpacity>
        </View>

        {/* Nearby Routes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bus size={20} color="#ea580c" />
            <Text style={styles.sectionTitle}>Rutas cercanas</Text>
          </View>

          {userId === null ? (
            <View style={styles.emptyContainer}>
              <AlertTriangle size={48} color="#f97316" />
              <Text style={styles.emptyTitle}>Sesión no encontrada</Text>
              <Text style={styles.emptyText}>
                No se encontraron datos de usuario en el dispositivo. Por favor, inicia sesión nuevamente.
              </Text>
              <TouchableOpacity
                style={[styles.quickActionBtn, { backgroundColor: "#20c997", borderRadius: 8, paddingVertical: 12 }]}
                onPress={() => router.push("/login")}
              >
                <Text style={[styles.quickActionText, { color: "white", fontWeight: "bold" }]}>Ir a Login</Text>
              </TouchableOpacity>
            </View>
          ) : loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#ea580c" />
              <Text style={styles.loadingText}>Cargando rutas...</Text>
            </View>
          ) : routes.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay rutas disponibles</Text>
            </View>
          ) : (
            routes.map((route, index) => (
              <View key={route.id || index} style={styles.routeCard}>
                <View style={styles.routeHeader}>
                  <Text style={styles.routeTitle}>{route.name}</Text>
                  <View style={[styles.badge, { backgroundColor: getStatusColor(route.status) }]}>
                    <Text style={styles.badgeText}>{getStatusText(route.status)}</Text>
                  </View>
                </View>
                <Text style={styles.routeDescription}>
                  {route.description || `${route.firstPoint} → ${route.lastPoint}`}
                </Text>
                <View style={styles.routeInfo}>
                  <View style={styles.infoItem}>
                    <Clock size={16} color="#000000ff" />
                    <Text style={styles.infoText}>
                      {route.estimatedTime ? `${route.estimatedTime} min` : '- min'}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <MapPin size={16} color="#000000ff" />
                    <Text style={styles.infoText}>
                      {route.distance ? `${route.distance.toFixed(1)} km` : '- km'}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Bus size={16} color="#000000ff" />
                    <Text style={styles.infoText}>{route.totalStops} paradas</Text>
                  </View>
                </View>
                <View style={styles.routeButtons}>
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => {
                      console.log('🚌 [USER] Navegando a seguimiento del usuario con route ID:', route.id);
                      router.push(`/tracking/user-tracking?routeId=${route.id}`);
                    }}
                  >
                    <Send size={16} color="white" />
                    <Text style={styles.followText}>Seguir</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.saveButton,
                      favoriteStates[route.id] && { backgroundColor: '#ea580c' }
                    ]}
                    onPress={() => handleToggleFavorite(route)}
                  >
                    <Heart 
                      size={16} 
                      color={favoriteStates[route.id] ? "white" : "#ea580c"} 
                      fill={favoriteStates[route.id] ? "white" : "none"}
                    />
                    <Text style={[
                      styles.saveText,
                      favoriteStates[route.id] && { color: 'white' }
                    ]}>
                      {favoriteStates[route.id] ? 'Favorito' : 'Guardar'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      <View style={styles.navbar}>
  <TouchableOpacity
    style={styles.navItem}
    onPress={() => router.push("/MobileTransportApp/user")}
  >
    <Home size={24} color="#20c997" />
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
    <Send size={24} color="#000000ff" />
    <Text style={styles.navText}>Seguir</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.navItem}
    onPress={() => router.push("/MobileTransportApp/incidents")}
  >
    <AlertTriangle size={24} color="#000000ff" />
    <Text style={[styles.navText, { color: "#000000ff" }]}>Incidentes</Text>
  </TouchableOpacity>
</View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    backgroundColor: "#20c997",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  profileButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerTitle: { color: "white", fontSize: 16, fontWeight: "bold" },
  headerSubtitle: { color: "white", fontSize: 12, opacity: 0.9 },
  content: { flex: 1 },
  locationCard: {
    backgroundColor: "#20c997",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  locationTop: { flexDirection: "row", alignItems: "center", gap: 6 },
  locationLabel: { color: "white", fontSize: 12, opacity: 0.9 },
  locationTitle: { color: "white", fontSize: 18, fontWeight: "bold", marginTop: 4 },
  locationSubtitle: { color: "white", fontSize: 13, opacity: 0.9 },
  searchContainer: {
    position: "relative",
    marginBottom: 16,
    justifyContent: "center",
  },
  searchIcon: { position: "absolute", left: 12, zIndex: 1 },
  searchInput: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
    paddingLeft: 36,
    paddingRight: 12,
    borderColor: "#d1d5db",
    borderWidth: 1,
    color: "#111827",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  quickActionBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000000ff",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 12,
    marginHorizontal: 4,
    backgroundColor: "#fff",
  },
  quickActionText: { color: "#000000ff", fontSize: 14, marginTop: 4 },
  trackRouteBtn: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  section: { marginBottom: 32 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#111827" },
  loadingContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 8,
  },
  emptyContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  routeCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  routeHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  routeTitle: { fontSize: 15, fontWeight: "bold", color: "#111827" },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { color: "white", fontSize: 10 },
  routeDescription: { fontSize: 13, color: "#6b7280", marginTop: 4 },
  routeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },
  infoItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  infoText: { fontSize: 12, color: "#4b5563" },
  routePrice: { fontSize: 13, fontWeight: "bold", color: "#16a34a" },
  routeButtons: { flexDirection: "row", gap: 8, marginTop: 12 },
  followButton: {
    flex: 1,
    backgroundColor: "#20c997",
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  followText: { color: "white", fontWeight: "bold" },
  saveButton: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "white",
  },
  saveText: { color: "#000000ff", fontWeight: "bold" },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 10, marginTop: 2, color: "#000000ff" },
})
