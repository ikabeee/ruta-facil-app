import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

// Components
import Header from './Header';
import QuickActions from './QuickActions';
import StatusCard from './StatusCard';

// Types locales
interface Trip {
  id: string;
  from: string;
  to: string;
  date: string;
  rating: number;
  fare: number;
}

interface TripStats {
  totalTrips: number;
  completedTrips: number;
  cancelledTrips: number;
  totalEarnings: number;
  averageRating: number;
  todayEarnings: number;
  todayTrips: number;
  rating: number;
}

// Styles
import { colors, spacing } from '../Styles/theme';

// Mock data local
const mockTrips: Trip[] = [
  {
    id: '1',
    from: 'Centro Comercial',
    to: 'Zona Residencial Norte',
    date: '2024-01-15',
    rating: 5,
    fare: 15.50
  },
  {
    id: '2',
    from: 'Aeropuerto',
    to: 'Hotel Plaza',
    date: '2024-01-14',
    rating: 4,
    fare: 28.75
  }
];

const mockDriverStats: TripStats = {
  totalTrips: 245,
  completedTrips: 235,
  cancelledTrips: 10,
  totalEarnings: 4250.00,
  averageRating: 4.8,
  todayEarnings: 125.50,
  todayTrips: 8,
  rating: 4.8
};

const HomeScreen: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [driverStats] = useState<TripStats>(mockDriverStats);
  const [recentTrips] = useState<Trip[]>(mockTrips.slice(0, 3));

  const handleToggleStatus = useCallback(() => {
    setIsOnline(prev => !prev);
  }, []);

  const handleTripPress = useCallback((trip: Trip) => {
    // Simplemente mostrar un alert en lugar de navegar
    console.log('Trip pressed:', trip);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Mis Rutas"
        showSearch={true}
        showLogo={false}
        onSearchPress={() => console.log('Search pressed')}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <StatusCard
            title="Ganancias Hoy"
            value={`$${driverStats.todayEarnings.toFixed(2)}`}
            icon="attach-money"
            color={colors.success}
          />
          <StatusCard
            title="Viajes Hoy"
            value={driverStats.todayTrips.toString()}
            icon="directions-car"
            color={colors.primary}
          />
        </View>
        
        <View style={styles.statsContainer}>
          <StatusCard
            title="Calificación"
            value={driverStats.rating.toString()}
            icon="star"
            color={colors.warning}
          />
          <StatusCard
            title="Total Viajes"
            value={driverStats.totalTrips.toString()}
            icon="timeline"
            color={colors.info}
          />
        </View>

        <QuickActions />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
});

export default HomeScreen;