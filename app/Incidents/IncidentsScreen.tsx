import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import IncidentCard from './IncidentCard';
import IncidentsHeader from './IncidentsHeader';
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

  // Header con 4 iconos que navegan a diferentes pantallas
  const headerIcons = [
    {
      name: 'map-outline', // icono de rutas
      screen: '/routes',
    },
    {
      name: 'warning-outline',
      screen: '/incidents',
    },
    {
      name: 'paper-plane-outline',
      screen: '/explore',
    },
    {
      name: 'star-outline',
      screen: '/favorites',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerIconsContainer}>
        {headerIcons.map((icon) => (
          <TouchableOpacity
            key={icon.name}
            style={styles.iconButton}
            onPress={() => router.push(icon.screen)}
          >
            <Ionicons name={icon.name} size={28} color="#374151" />
          </TouchableOpacity>
        ))}
      </View>
      <IncidentsHeader onReportPress={onReportIncident} />
      
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  incidentsList: {
    paddingHorizontal: 20,
  },
  headerIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
});

export default IncidentsScreen;