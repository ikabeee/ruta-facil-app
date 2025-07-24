import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HamburgerMenu from '../Drivers/HamburgerMenu';
import { colors, spacing, typography } from '../Styles/theme';
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
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Menu Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={toggleMenu}
        >
          <MaterialIcons name="menu" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Incidencias</Text>
        </View>
        
        <View style={styles.headerButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <IncidentsHeader onReportPress={onReportIncident} />        <View style={styles.incidentsList}>
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

      {/* Hamburger Menu Overlay */}
      <HamburgerMenu 
        isVisible={isMenuVisible} 
        onClose={() => setIsMenuVisible(false)} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    padding: spacing.xs,
    borderRadius: spacing.xs,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
  },
  incidentsList: {
    paddingHorizontal: 20,
  },
});

export default IncidentsScreen;