import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native';
import { Ionicons, MaterialIcons, Entypo, Feather } from '@expo/vector-icons';

// Ocultar header de Expo Router
export const options = {
  headerShown: false,
};

export default function RoutesScreen() {
  return (
    <View style={styles.container}>
      {/* HEADER AZUL */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ruta Facil</Text>
        <View style={styles.statusContainer}>
          <Ionicons
            name="ellipse"
            size={10}
            color="#60A5FA"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.statusText}>Inactivo</Text>
          <Switch value={false} onValueChange={() => {}} />
        </View>
      </View>

      {/* ICONOS DE ABAJO DEL HEADER */}
      <View style={styles.topIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="share-2" size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="alert-triangle" size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="navigation" size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="star" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* MIS RUTAS + BOTÓN NUEVA RUTA EN FILA */}
        <View style={styles.routesHeader}>
          <Text style={styles.sectionTitle}>Mis Rutas</Text>
          <TouchableOpacity style={styles.newRouteButton}>
            <Text style={styles.newRouteButtonText}>+ Nueva Ruta</Text>
          </TouchableOpacity>
        </View>

        {/* RUTA 1 */}
        <View style={styles.routeCard}>
          <View style={styles.routeHeader}>
            <Ionicons name="location-sharp" size={20} color="#20c997" />
            <Text style={styles.routeTitle}>Centro - Mercado</Text>
          </View>
          <Text style={styles.routeSubtext}>8 paradas registradas</Text>
          <View style={styles.routeButtons}>
            <TouchableOpacity
              style={[styles.startButton, styles.activeStartButton]}
            >
              <Entypo name="controller-play" size={16} color="#fff" />
              <Text style={[styles.startButtonText, { color: '#fff' }]}>
                Iniciar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* RUTA 2 */}
        <View style={styles.routeCard}>
          <View style={styles.routeHeader}>
            <Ionicons name="location-sharp" size={20} color="#20c997" />
            <Text style={styles.routeTitle}>Escuela - Plaza</Text>
          </View>
          <Text style={styles.routeSubtext}>6 paradas registradas</Text>
          <View style={styles.routeButtons}>
            <TouchableOpacity style={styles.startButton}>
              <Entypo name="controller-play" size={16} color="#20c997" />
              <Text
                style={[styles.startButtonText, { color: '#20c997' }]}
              >
                Iniciar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* REGISTRAR NUEVA RUTA */}
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
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#FFFFFF',
    marginRight: 8,
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconButton: {
    padding: 8,
  },
  scroll: {
    padding: 16,
  },
  routesHeader: {
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
    backgroundColor: '#20c997',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
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
  paddingHorizontal:60,
  borderRadius: 4,
  alignItems: 'center',
  gap: 6,
  },
  activeStartButton: {
    backgroundColor: '#20c997',
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
