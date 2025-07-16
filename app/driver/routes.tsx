import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';// Si usas Expo, cambia por: import { Ionicons } from '@expo/vector-icons';

const ConductorScreen = () => {
  const [activo, setActivo] = useState(false);

  const handleIniciar = () => {
    setActivo(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ruta Facil</Text>
        <View style={styles.status}>
          <Ionicons
            name="ellipse"
            size={10}
            color={activo ? '#4CAF50' : '#8E8E93'}
          />
          <Text style={[styles.statusText, activo && styles.statusActivo]}>
            {activo ? 'Activo' : 'Inactivo'}
          </Text>
        </View>
      </View>

      {/* Nav Tabs */}
      <View style={styles.navTabs}>
        <Ionicons name="share-social-outline" size={20} />
        <Ionicons name="alert-circle-outline" size={20} />
        <Ionicons name="paper-plane-outline" size={20} />
        <Ionicons name="star-outline" size={20} />
      </View>

      {/* Mis Rutas + Nueva Ruta */}
      <ScrollView style={styles.content}>
        <View style={styles.rutasHeader}>
          <Text style={styles.sectionTitle}>Mis rutas</Text>
          <TouchableOpacity style={styles.newRouteButton}>
            <Ionicons name="add" size={16} color="#fff" />
            <Text style={styles.newRouteText}>Nueva Ruta</Text>
          </TouchableOpacity>
        </View>

        {/* Ruta 1 */}
        <View style={styles.routeCard}>
          <View style={styles.routeHeader}>
            <Ionicons name="location-outline" size={16} color="#007AFF" />
            <Text style={styles.routeTitle}>Centro - Mercado</Text>
          </View>
          <Text style={styles.subText}>8 paradas registradas</Text>

          <View style={styles.routeActions}>
            <TouchableOpacity style={styles.startButton} onPress={handleIniciar}>
              <Ionicons name="play" size={14} color="#fff" />
              <Text style={styles.startButtonText}>Iniciar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Text>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ruta 2 */}
        <View style={styles.routeCard}>
          <View style={styles.routeHeader}>
            <Ionicons name="location-outline" size={16} color="green" />
            <Text style={styles.routeTitle}>Escuela - Plaza</Text>
          </View>
          <Text style={styles.subText}>6 paradas registradas</Text>

          <View style={styles.routeActions}>
            <TouchableOpacity style={styles.startButtonOutline} onPress={handleIniciar}>
              <Ionicons name="play" size={14} color="#000" />
              <Text style={styles.startOutlineText}>Iniciar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Text>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Registrador Nueva Ruta */}
        <View style={styles.registrarCard}>
          <Text style={styles.registrarTitle}>Registrador Nueva Ruta</Text>
          <View style={styles.mapBox}>
            <Ionicons name="pin-outline" size={28} color="#999" />
            <Text style={styles.mapText}>Toca para marcar paradas</Text>
            <Text style={styles.mapSubText}>Mapa del pueblo mágico</Text>
          </View>
          <TouchableOpacity style={styles.saveButtonDisabled}>
            <Text style={styles.saveButtonText}>Guardar Ruta (0 paradas)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConductorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#20c997',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#E0E0E0',
    marginLeft: 6,
    fontSize: 12,
  },
  statusActivo: {
    color: '#C8FACC',
    fontWeight: 'bold',
  },
  navTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#F2F2F2',
  },
  content: {
    paddingHorizontal: 16,
  },
  rutasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  newRouteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  newRouteText: {
    color: '#fff',
    marginLeft: 6,
  },
  routeCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeTitle: {
    marginLeft: 6,
    fontWeight: 'bold',
  },
  subText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 10,
  },
  routeActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  startButtonText: {
    color: '#fff',
    marginLeft: 4,
  },
  startButtonOutline: {
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  startOutlineText: {
    marginLeft: 4,
    color: '#000',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  registrarCard: {
    marginVertical: 16,
  },
  registrarTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mapBox: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  mapText: {
    marginTop: 8,
    fontWeight: '500',
  },
  mapSubText: {
    color: '#888',
    fontSize: 12,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
