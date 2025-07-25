import { useRouter } from "expo-router";
import {
  AlertTriangle,
  Bus,
  Heart,
  Home,
  Landmark,
  MapPin,
  Search,
} from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { apiService, Incident } from '../../utils/api.service';

export default function IncidentesScreen() {
  const router = useRouter();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active'>('active');

  console.log('🚨 [INCIDENTS] Componente iniciado');

  // Cargar incidentes
  const loadIncidents = useCallback(async (showRefresh = false) => {
    try {
      console.log(`🚨 [INCIDENTS] Cargando incidentes - Filtro: ${filter}`);
      
      if (showRefresh) setRefreshing(true);
      else setLoading(true);

      const data = filter === 'active' 
        ? await apiService.getActiveIncidents()
        : await apiService.getAllIncidents();

      console.log(`✅ [INCIDENTS] ${data.length} incidentes cargados`);
      setIncidents(data);
    } catch (error) {
      console.error('❌ [INCIDENTS] Error cargando incidentes:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filter]);

  // Efecto para cargar incidentes al iniciar
  useEffect(() => {
    loadIncidents();
  }, [loadIncidents]);

  // Función para refrescar
  const onRefresh = () => {
    loadIncidents(true);
  };

  // Función para obtener el color de prioridad
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return '#dc2626';
      case 'HIGH': return '#ea580c';
      case 'MEDIUM': return '#d97706';
      case 'LOW': return '#16a34a';
      default: return '#6b7280';
    }
  };

  // Función para obtener el texto de prioridad
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'Crítico';
      case 'HIGH': return 'Alto';
      case 'MEDIUM': return 'Medio';
      case 'LOW': return 'Bajo';
      default: return priority;
    }
  };

  // Función para obtener el texto de estado
  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Pendiente';
      case 'IN_PROGRESS': return 'En Progreso';
      case 'RESOLVED': return 'Resuelto';
      case 'CANCELLED': return 'Cancelado';
      default: return status;
    }
  };

  // Función para formatear la hora
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Renderizar cada incidente
  const renderIncident = ({ item }: { item: Incident }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.leftHeader}>
          <AlertTriangle 
            size={18} 
            color={getPriorityColor(item.priority)} 
          />
          <Text style={[styles.priority, { color: getPriorityColor(item.priority) }]}>
            {getPriorityText(item.priority)}
          </Text>
        </View>
        <Text style={styles.hora}>{formatTime(item.createdAt)}</Text>
      </View>
      
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.descripcion}>{item.description}</Text>
      
      {item.route && (
        <View style={styles.routeInfo}>
          <Bus size={14} color="#6b7280" />
          <Text style={styles.routeName}>{item.route.name}</Text>
        </View>
      )}
      
      {item.location && (
        <View style={styles.locationInfo}>
          <MapPin size={14} color="#6b7280" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      )}
      
      <View style={styles.statusContainer}>
        <Text style={[styles.status, { 
          backgroundColor: item.status === 'RESOLVED' ? '#dcfce7' : '#fef3c7',
          color: item.status === 'RESOLVED' ? '#16a34a' : '#d97706'
        }]}>
          {getStatusText(item.status)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Landmark size={20} color="#fff" style={{ marginRight: 8 }} />
          <View>
            <Text style={styles.headerTitle}>Ruta Fácil</Text>
            <Text style={styles.headerSubtitle}>Huauchinango, Puebla</Text>
          </View>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'active' && styles.filterButtonActive]}
          onPress={() => setFilter('active')}
        >
          <Text style={[styles.filterText, filter === 'active' && styles.filterTextActive]}>
            Activos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            Todos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Título */}
      <Text style={styles.sectionTitle}>
        {filter === 'active' ? 'Incidentes Activos' : 'Todos los Incidentes'}
      </Text>

      {/* Lista de incidentes */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f97316" />
          <Text style={styles.loadingText}>Cargando incidentes...</Text>
        </View>
      ) : (
        <FlatList
          data={incidents}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
          renderItem={renderIncident}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AlertTriangle size={48} color="#d1d5db" />
              <Text style={styles.emptyText}>No hay incidentes reportados</Text>
              <Text style={styles.emptySubtext}>
                {filter === 'active' 
                  ? 'No hay incidentes activos en este momento'
                  : 'No se encontraron incidentes'
                }
              </Text>
            </View>
          }
        />
      )}

      {/* Navegación inferior */}
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
          style={[styles.navItem, styles.navItemActive]}
          onPress={() => router.push("/MobileTransportApp/incidents")}
        >
          <AlertTriangle size={24} color="#f97316" />
          <Text style={[styles.navText, styles.navTextActive]}>Incidentes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#20c997",
    padding: 16,
    alignItems: "center",
  },
  headerLeft: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  headerTitle: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },
  headerSubtitle: { 
    color: "white", 
    fontSize: 12 
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonActive: {
    backgroundColor: '#f97316',
    borderColor: '#f97316',
  },
  filterText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#111827",
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  priority: {
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 6,
    textTransform: 'uppercase',
  },
  hora: {
    fontSize: 12,
    color: "#6b7280",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#111827",
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
    lineHeight: 20,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeName: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  statusContainer: {
    alignItems: 'flex-start',
  },
  status: {
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    textTransform: 'uppercase',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9ca3af',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
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
  navTextActive: {
    color: "#f97316",
    fontWeight: "600",
  },
});
