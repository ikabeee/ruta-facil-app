import { MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, spacing, typography } from '../Styles/theme';

interface HomeScreenProps {
  // No navigation props needed for expo-router
};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  // Asegurar que la pantalla se recarga correctamente
  useFocusEffect(
    React.useCallback(() => {
      // Aquí puedes agregar lógica para refrescar datos cuando la pantalla gane foco
      return () => {
        // Cleanup si es necesario
      };
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Verde Compacto */}
      <View style={styles.headerCompact}>
        <View style={styles.logoContainer}>
          <MaterialIcons name="route" size={20} color="white" />
          <Text style={styles.logoTitle}>Ruta Fácil</Text>
        </View>
        <Text style={styles.locationText}>Huauchinango, Puebla</Text>
        <View style={styles.menuButton} />
      </View>

      {/* Ubicación Actual Card */}
      <View style={styles.locationCard}>
        <View style={styles.locationHeader}>
          <MaterialIcons name="my-location" size={18} color="white" />
          <Text style={styles.locationLabel}>Tu ubicación actual</Text>
        </View>
        <Text style={styles.locationTitle}>Centro</Text>
        <Text style={styles.locationSubtitle}>Huauchinango, Puebla</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Estadísticas del Conductor */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="local-taxi" size={24} color="#20c997" />
            </View>
            <Text style={styles.statLabel}>Unidad Designada</Text>
            <Text style={styles.statValue}>Unit-042</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="directions-bus" size={24} color="#20c997" />
            </View>
            <Text style={styles.statLabel}>Rutas Hoy</Text>
            <Text style={styles.statValue}>8</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="star" size={24} color="#FFD700" />
            </View>
            <Text style={styles.statLabel}>Calificación</Text>
            <Text style={styles.statValue}>4.8</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <MaterialIcons name="trending-up" size={24} color="#20c997" />
            </View>
            <Text style={styles.statLabel}>Total Viajes</Text>
            <Text style={styles.statValue}>1,247</Text>
          </View>
        </View>

        {/* Rutas Recientes */}
        <View style={styles.routesSection}>
          <View style={styles.routesSectionHeader}>
            <Text style={styles.routesSectionTitle}>Rutas Recientes</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          {/* Ruta Centro Comercial */}
          <View style={styles.routeCard}>
            <View style={styles.routeHeader}>
              <View style={styles.routeDestination}>
                <MaterialIcons name="my-location" size={16} color="#20c997" />
                <Text style={styles.routeFrom}>Centro Comercial</Text>
              </View>
              <Text style={styles.routeTime}>14:30</Text>
            </View>
            <View style={styles.routeDestination}>
              <MaterialIcons name="location-on" size={16} color="#FF5722" />
              <Text style={styles.routeTo}>Zona Rosa</Text>
            </View>
            <View style={styles.routeDetailsRow}>
              <View style={styles.routeRating}>
                <MaterialIcons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>5</Text>
              </View>
            </View>
          </View>

          {/* Ruta Aeropuerto */}
          <View style={styles.routeCard}>
            <View style={styles.routeHeader}>
              <View style={styles.routeDestination}>
                <MaterialIcons name="my-location" size={16} color="#20c997" />
                <Text style={styles.routeFrom}>Aeropuerto</Text>
              </View>
              <Text style={styles.routeTime}>12:15</Text>
            </View>
            <View style={styles.routeDestination}>
              <MaterialIcons name="location-on" size={16} color="#FF5722" />
              <Text style={styles.routeTo}>Hotel Plaza</Text>
            </View>
            <View style={styles.routeDetailsRow}>
              <View style={styles.routeRating}>
                <MaterialIcons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4</Text>
              </View>
            </View>
          </View>

          {/* Ruta Universidad */}
          <View style={styles.routeCard}>
            <View style={styles.routeHeader}>
              <View style={styles.routeDestination}>
                <MaterialIcons name="my-location" size={16} color="#20c997" />
                <Text style={styles.routeFrom}>Universidad</Text>
              </View>
              <Text style={styles.routeTime}>10:45</Text>
            </View>
            <View style={styles.routeDestination}>
              <MaterialIcons name="location-on" size={16} color="#FF5722" />
              <Text style={styles.routeTo}>Residencial Norte</Text>
            </View>
            <View style={styles.routeDetailsRow}>
              <View style={styles.routeRating}>
                <MaterialIcons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>5</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button for Incidents */}
      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => router.push('/Incidents/IncidentsScreen')}
      >
        <MaterialIcons name="warning" size={28} color="white" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/Drivers/HomeScreen')}>
          <MaterialIcons name="home" size={24} color="#20c997" />
          <Text style={[styles.navText, { color: '#20c997' }]}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/Drivers/TripsScreen')}>
          <MaterialIcons name="directions-car" size={24} color="#666" />
          <Text style={styles.navText}>Rutas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/Drivers/EarningsScreen')}>
          <MaterialIcons name="local-taxi" size={24} color="#666" />
          <Text style={styles.navText}>Unidad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/Drivers/ProfileScreen')}>
          <MaterialIcons name="person" size={24} color="#666" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  // Header compacto como en la imagen
  headerCompact: {
    backgroundColor: '#20c997',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  locationText: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
  },
  menuButton: {
    padding: 4,
  },
  // Card de ubicación actual
  locationCard: {
    backgroundColor: '#20c997',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationLabel: {
    color: 'white',
    fontSize: 12,
    marginLeft: 6,
    opacity: 0.9,
  },
  locationTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  locationSubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  // Content
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  // Estadísticas del conductor
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  // Barra de búsqueda
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  // Botones de acción
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  // Sección de rutas
  routesSection: {
    marginBottom: 80,
  },
  routesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  routesSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#20c997',
    fontWeight: '500',
  },
  // Cards de rutas
  routeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeDestination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeFrom: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  routeTo: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  routeTime: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  routeDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  routeRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
    fontWeight: '500',
  },
  // Floating Action Button for Incidents
  floatingButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  // Bottom Navigation
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  
  // Estilos del Menu Hamburger (mantener los existentes)
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  menuBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuDrawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: colors.surface,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuHeader: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuUserInfo: {
    flex: 1,
  },
  menuUserName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: 'white',
    marginBottom: spacing.xs,
  },
  menuUserStatus: {
    fontSize: typography.sizes.sm,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.xs,
  },
  menuRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuRating: {
    fontSize: typography.sizes.sm,
    color: 'white',
    marginLeft: spacing.xs,
    fontWeight: typography.weights.medium,
  },
  menuContent: {
    flex: 1,
    paddingVertical: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuText: {
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
    marginLeft: spacing.md,
    fontWeight: typography.weights.medium,
  },
  menuQuickActions: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.md,
  },
  menuSectionTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    letterSpacing: 1,
  },
  menuQuickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginBottom: spacing.sm,
    justifyContent: 'center',
  },
  menuQuickActionText: {
    fontSize: typography.sizes.xs,
    color: 'white',
    marginLeft: spacing.xs,
    fontWeight: typography.weights.medium,
  },
  menuLogoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  menuLogoutText: {
    fontSize: typography.sizes.md,
    color: colors.error,
    marginLeft: spacing.sm,
    fontWeight: typography.weights.medium,
  },
});

export default HomeScreen;
