import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  AlertTriangle,
  Bus,
  Clock,
  Heart,
  Home,
  Landmark,
  MapPin,
  Search,
  Send
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { apiService, StarredRoute } from "../../utils/api.service";

export default function FavoritosScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<StarredRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  // Obtener userId del AsyncStorage
  useEffect(() => {
    const getUserId = async () => {
      try {
        console.log('👤 [FAVORITOS] Intentando obtener datos del usuario...');
        
        // Primero intentar con 'userData' (formato anterior)
        let userData = await AsyncStorage.getItem('userData');
        console.log('👤 [FAVORITOS] userData:', userData);
        
        // Si no existe, intentar con 'auth_user' (formato actual)
        if (!userData) {
          const authUser = await AsyncStorage.getItem('auth_user');
          console.log('👤 [FAVORITOS] auth_user:', authUser);
          userData = authUser;
        }
        
        if (userData) {
          const user = JSON.parse(userData);
          console.log('👤 [FAVORITOS] Usuario parseado:', user);
          console.log('👤 [FAVORITOS] User ID encontrado:', user.id);
          setUserId(user.id);
        } else {
          console.log('❌ [FAVORITOS] No se encontraron datos de usuario');
          console.log('📋 [FAVORITOS] Verificando todas las claves en AsyncStorage...');
          
          // Verificar qué claves existen en AsyncStorage
          const allKeys = await AsyncStorage.getAllKeys();
          console.log('🔑 [FAVORITOS] Claves en AsyncStorage:', allKeys);
          
          // Intentar mostrar el contenido de cada clave relacionada con usuario
          for (const key of allKeys) {
            if (key.includes('user') || key.includes('auth') || key.includes('token')) {
              const value = await AsyncStorage.getItem(key);
              console.log(`📝 [FAVORITOS] ${key}:`, value);
            }
          }
          
          // No establecer un userId por defecto, que la pantalla muestre el error
          setLoading(false);
        }
      } catch (error) {
        console.error('❌ [FAVORITOS] Error obteniendo datos del usuario:', error);
        setLoading(false);
      }
    };
    getUserId();
  }, []);

  // Cargar favoritos cuando tenemos el userId
  useEffect(() => {
    const loadFavorites = async () => {
      if (!userId) {
        console.log('⏳ [FAVORITOS] Waiting for userId...');
        return;
      }
      
      try {
        console.log(`🔄 [FAVORITOS] Loading favorites for user ${userId}...`);
        setLoading(true);
        const favoriteRoutes = await apiService.getFavoriteRoutes(userId);
        console.log('✅ [FAVORITOS] Favorites loaded:', favoriteRoutes);
        setFavorites(favoriteRoutes);
      } catch (error) {
        console.error('❌ [FAVORITOS] Error loading favorites:', error);
        Alert.alert('Error', 'No se pudieron cargar los favoritos.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadFavorites();
    }
  }, [userId]);

  // Función para eliminar favorito
  const handleRemoveFavorite = async (favorite: StarredRoute) => {
    Alert.alert(
      'Eliminar favorito',
      `¿Estás seguro de que quieres eliminar "${favorite.name}" de tus favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiService.removeFavorite(favorite.id);
              setFavorites(prev => prev.filter(f => f.id !== favorite.id));
              Alert.alert('Éxito', 'Favorito eliminado');
            } catch (error) {
              console.error('Error removing favorite:', error);
              Alert.alert('Error', 'No se pudo eliminar el favorito.');
            }
          }
        }
      ]
    );
  };

  // Función helper para obtener el color del estado
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return '#22c55e';
      case 'inactive': return '#f97316';
      case 'maintenance': return '#ef4444';
      default: return '#3b82f6';
    }
  };

  // Función helper para obtener el texto del estado
  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'Activa';
      case 'inactive': return 'Inactiva';
      case 'maintenance': return 'Mantenimiento';
      default: return 'Activa';
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Landmark size={20} color="#fff" style={{ marginRight: 8 }} />
          <View>
            <Text style={styles.headerTitle}>Ruta Facil</Text>
            <Text style={styles.headerSubtitle}>Huauchinango, Puebla</Text>
          </View>
        </View>
        {/* Ícono de menú eliminado */}
      </View>

      {/* Título */}
      <Text style={styles.sectionTitle}>Mis rutas favoritas</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ea580c" />
            <Text style={styles.loadingText}>Cargando favoritos...</Text>
          </View>
        ) : userId === null ? (
          <View style={styles.emptyContainer}>
            <AlertTriangle size={48} color="#f97316" />
            <Text style={styles.emptyTitle}>Sesión no encontrada</Text>
            <Text style={styles.emptyText}>
              No se encontraron datos de usuario en el dispositivo. Por favor, inicia sesión nuevamente.
            </Text>
            <TouchableOpacity
              style={styles.goToRoutesButton}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.goToRoutesText}>Ir a Login</Text>
            </TouchableOpacity>
          </View>
        ) : favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Heart size={48} color="#d1d5db" />
            <Text style={styles.emptyTitle}>No tienes rutas favoritas</Text>
            <Text style={styles.emptyText}>
              Agrega rutas a favoritos desde la pantalla principal para verlas aquí
            </Text>
            <TouchableOpacity
              style={styles.goToRoutesButton}
              onPress={() => router.push("/MobileTransportApp/user")}
            >
              <Text style={styles.goToRoutesText}>Ver rutas disponibles</Text>
            </TouchableOpacity>
          </View>
        ) : (
          favorites.map((favorite) => (
            <View key={favorite.id} style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle}>{favorite.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(favorite.routes.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(favorite.routes.status)}</Text>
                </View>
              </View>
              <Text style={styles.routeName}>{favorite.routes.name}</Text>
              <Text style={styles.destination}>
                {favorite.routes.firstPoint} → {favorite.routes.lastPoint}
              </Text>
              {favorite.description && (
                <Text style={styles.description}>{favorite.description}</Text>
              )}

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Clock size={14} color="#6b7280" />
                  <Text style={styles.infoText}>
                    {favorite.routes.estimatedTime ? `${favorite.routes.estimatedTime} min` : '- min'}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <MapPin size={14} color="#6b7280" />
                  <Text style={styles.infoText}>
                    {favorite.routes.distance ? `${favorite.routes.distance.toFixed(1)} km` : '- km'}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Bus size={14} color="#6b7280" />
                  <Text style={styles.infoText}>{favorite.routes.totalStops} paradas</Text>
                </View>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.useRouteBtn}
                  onPress={() => router.push("/MobileTransportApp/routes")}
                >
                  <Send size={16} color="white" />
                  <Text style={styles.useRouteText}>Usar ruta</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteBtn}
                  onPress={() => handleRemoveFavorite(favorite)}
                >
                  <Heart size={16} color="#ef4444" />
                  <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

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
          onPress={() => router.push("/MobileTransportApp/routes")}
        >
          <Search size={24} color="#000000ff" />
          <Text style={styles.navText}>Rutas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/favoritos")}>
          <Heart size={24} color="#20c997" />
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#20c997",
    padding: 16,
    alignItems: "center",
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  headerTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  headerSubtitle: { color: "white", fontSize: 12 },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#111827",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  // Estilos para loading
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    color: "#6b7280",
    fontSize: 14,
  },
  // Estilos para empty state
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
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
    marginBottom: 24,
  },
  goToRoutesButton: {
    backgroundColor: "#20c997",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  goToRoutesText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  // Estilos para cards
  card: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#20c997",
    flex: 1,
  },
  // Badge de estado
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  // Información de ruta
  routeName: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
    marginBottom: 4,
  },
  destination: {
    color: "#6b7280",
    fontSize: 13,
    marginBottom: 8,
  },
  description: {
    color: "#6b7280",
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoText: {
    marginLeft: 4,
    color: "#374151",
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  useRouteBtn: {
    backgroundColor: "#20c997",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
    justifyContent: "center",
  },
  useRouteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  deleteBtn: {
    backgroundColor: "#f9fafb",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#d1d5db",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
    justifyContent: "center",
  },
  deleteText: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 12,
  },
  // Navbar
  navbar: {
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
  navItemActive: {
    alignItems: "center",
    backgroundColor: "#fff7ed",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  navText: {
    fontSize: 10,
    marginTop: 2,
    color: "#6b7280",
  },
});
