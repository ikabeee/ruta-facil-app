import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../Drivers/Header';
import IncidentCard from './IncidentCard';
import ReportIncidentSection from './ReportIncidentSection';

// Mock data - replace with your API calls
const mockIncidents = [
  {

    id: '1',
    type: 'Tráfico Pesado',
    status: 'Activa',
    location: 'Calle Principal - frente al mercado',
    reportedBy: 'Conductor #23',
    timeAgo: '15 min',
    icon: 'warning',
    statusColor: '#FF5252',
  },
  {
    id: '2',
    type: 'Obra en Construcción',
    status: 'Resuelta',
    location: 'Av. Mágica - altura del puente',
    reportedBy: 'Sistema',
    timeAgo: '2 horas',
    icon: 'construct',
    statusColor: '#9E9E9E',
  },
];

interface IncidentsScreenProps {
  incidents?: typeof mockIncidents;
  onReportIncident?: () => void;
  onIncidentPress?: (incidentId: string) => void;
}

const IncidentsScreen: React.FC<IncidentsScreenProps> = ({
  incidents = mockIncidents,
  onReportIncident,
  onIncidentPress,
}) => {
  const router = useRouter();

  const handleSearchPress = () => {
    console.log('Search pressed in Incidencias');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Incidencias"
        showSearch={true}
        onSearchPress={handleSearchPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>        
        <View style={styles.incidentsList}>
          {incidents.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onPress={() => onIncidentPress?.(incident.id)}
            />
          ))}
        </View>

        <ReportIncidentSection />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/Drivers/HomeScreen')}
        >
          <MaterialIcons name="home" size={24} color="#666" />
          <Text style={[styles.navText, { color: "#666" }]}>Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/Drivers/TripsScreen')}
        >
          <MaterialIcons name="directions-car" size={24} color="#666" />
          <Text style={[styles.navText, { color: "#666" }]}>Rutas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/Drivers/EarningsScreen')}
        >
          <MaterialIcons name="local-taxi" size={24} color="#666" />
          <Text style={[styles.navText, { color: "#666" }]}>Unidad</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.replace('/Drivers/ProfileScreen')}
        >
          <MaterialIcons name="person" size={24} color="#666" />
          <Text style={[styles.navText, { color: "#666" }]}>Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Button for Incidents - Active State */}
      <TouchableOpacity 
        style={[styles.floatingButton, { backgroundColor: '#20c997' }]}
        onPress={() => router.push('/Incidents/IncidentsScreen')}
      >
        <MaterialIcons name="warning" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  incidentsList: {
    paddingHorizontal: 20,
  },
  // Bottom Navigation Styles
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default IncidentsScreen;