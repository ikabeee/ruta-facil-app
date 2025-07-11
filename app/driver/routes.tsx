import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

// Oculta el header "driver/routes"
export const options = {
  headerShown: false,
};

export default function RoutesScreen() {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      title: 'Centro - Mercado',
      color: '#3B82F6',
      stops: 8,
      isActive: false,
    },
    {
      id: 2,
      title: 'Escuela - Plaza',
      color: '#10B981',
      stops: 6,
      isActive: false,
    },
  ]);

  // Determinar si alguna ruta está activa
  const anyActive = routes.some((route) => route.isActive);

  // Función para activar o desactivar una ruta
  const toggleRoute = (id) => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) =>
        route.id === id
          ? { ...route, isActive: !route.isActive }
          : route
      )
    );
  };

  // Hacer que el switch principal active o desactive todas las rutas
  const toggleAllRoutes = (value) => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) => ({
        ...route,
        isActive: value,
      }))
    );
  };

  return (
    <View style={styles.container}>
      {/* Header azul */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ruta Fácil</Text>
        <View style={styles.statusContainer}>
          <Ionicons
            name="ellipse"
            size={10}
            color={anyActive ? "#10B981" : "#60A5FA"}
            style={{ marginRight: 4 }}
          />
          <Text style={styles.statusText}>
            {anyActive ? "Activo" : "Inactivo"}
          </Text>
          <Switch
            value={anyActive}
            onValueChange={toggleAllRoutes}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Sección encabezado */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mis Rutas</Text>
          <TouchableOpacity style={styles.newRouteButton}>
            <Text style={styles.newRouteButtonText}>+ Nueva Ruta</Text>
          </TouchableOpacity>
        </View>

        {routes.map((route) => (
          <View key={route.id} style={styles.routeCard}>
            <View style={styles.routeHeader}>
              <Ionicons
                name="location-sharp"
                size={20}
                color={route.color}
              />
              <Text style={styles.routeTitle}>{route.title}</Text>
            </View>
            <Text style={styles.routeSubtext}>
              {route.stops} paradas registradas
            </Text>
            <View style={styles.routeButtons}>
              <TouchableOpacity
                style={[
                  styles.startButton,
                  route.isActive && styles.activeStartButton,
                ]}
                onPress={() => toggleRoute(route.id)}
              >
                <Entypo
                  name="controller-play"
                  size={16}
                  color={route.isActive ? "#fff" : "#000"}
                />
                <Text
                  style={[
                    styles.startButtonText,
                    { color: route.isActive ? "#fff" : "#000" },
                  ]}
                >
                  {route.isActive ? "Detener" : "Iniciar"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Registrar Nueva Ruta */}
        <View style={styles.newRouteCard}>
          <TouchableOpacity style={styles.mapBox}>
            <Ionicons name="location-outline" size={28} color="#9CA3AF" />
            <Text style={styles.mapText}>
              Toca para marcar paradas{'\n'}Mapa del pueblo mágico
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} disabled>
            <Text style={styles.saveButtonText}>
              Guardar Ruta (0 paradas)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#20c997',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 30,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#FFFFFF',
    marginRight: 8,
  },
  scroll: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  newRouteButton: {
    backgroundColor: '#000000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  newRouteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  routeCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeTitle: {
    fontWeight: 'bold',
    marginLeft: 6,
  },
  routeSubtext: {
    color: '#6B7280',
    marginBottom: 8,
  },
  routeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
    gap: 6,
  },
  activeStartButton: {
    backgroundColor: '#000000',
  },
  startButtonText: {
    color: '#000000',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#374151',
  },
  newRouteCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  mapBox: {
    height: 120,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 12,
  },
  mapText: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#9CA3AF',
    padding: 12,
    borderRadius: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});