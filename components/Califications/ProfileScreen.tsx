import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import MonthlyStatsSection from './MonthlyStatsSection';
import RatingSection from './RatingSection';
import RecentCommentsSection from './RecentCommentsSection';

// Mock data - replace with your API calls
const mockProfileData = {
  rating: 4.7,
  totalRatings: 127,
  recentComments: [
    {
      id: '1',
      rating: 5,
      comment: 'Excelente conductor, muy puntual y amable',
      timeAgo: 'Hace 2 días',
    },
    {
      id: '2',
      rating: 4,
      comment: 'Buen servicio, manejo seguro',
      timeAgo: 'Hace 1 semana',
    },
    {
      id: '3',
      rating: 5,
      comment: 'Muy profesional, conoce bien las rutas del pueblo',
      timeAgo: 'Hace 1 semana',
    },
  ],
  monthlyStats: {
    trips: 89,
    punctuality: 98,
  },
};

interface ProfileScreenProps {
  profileData?: typeof mockProfileData;
  onRefresh?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profileData = mockProfileData,
  onRefresh,
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
    <>
      <View style={styles.headerIconsContainer}>
        {headerIcons.map((icon) => (
          <TouchableOpacity
            key={icon.name}
            style={styles.iconButton}
            onPress={() => {
              if (icon.name === 'warning-outline') {
                router.push('/Incidents/IncidentsScreen');
                return;
              }
              if (icon.name === 'star-outline') {
                // No hacer nada, ya estamos en la pantalla de ProfileScreen
                return;
              }
              router.push(icon.screen);
            }}
          >
            <Ionicons name={icon.name} size={28} color="#374151" />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.statsContainer}>
        <MonthlyStatsSection
          trips={profileData.monthlyStats.trips}
          punctuality={profileData.monthlyStats.punctuality}
        />
      </View>
      <ScrollView 
        style={[styles.container, { marginTop: 130 }]} // margen para menu + stats
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <RatingSection
          rating={profileData.rating}
          totalRatings={profileData.totalRatings}
        />
        
        <RecentCommentsSection
          comments={profileData.recentComments}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  statsContainer: {
    position: 'absolute',
    top: 60, // debajo del menu
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
});

export default ProfileScreen;