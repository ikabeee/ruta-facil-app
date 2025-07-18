import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors, spacing, typography } from '../Styles/theme';

interface CustomDrawerContentProps {
  // Props for custom drawer
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = () => {
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            router.replace('/auth/login');
          }
        }
      ]
    );
  };

  const handleEmergency = () => {
    Alert.alert(
      'Emergencia',
      'Contactando servicios de emergencia...',
      [{ text: 'OK' }]
    );
  };

  const menuItems = [
    { title: 'Inicio', icon: 'home', route: '/Drivers/HomeScreen' },
    { title: 'Viajes', icon: 'directions-car', route: '/Drivers/TripsScreen' },
    { title: 'Ganancias', icon: 'attach-money', route: '/Drivers/EarningsScreen' },
    { title: 'Documentos', icon: 'description', route: '/Drivers/DocumentsScreen' },
    { title: 'Perfil', icon: 'person', route: '/Drivers/ProfileScreen' },
    { title: 'Configuración', icon: 'settings', route: '/Drivers/SettingScreen' },
    { title: 'Soporte', icon: 'help', route: '/Drivers/SupportScreen' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={32} color={colors.primary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Carlos Mendoza</Text>
            <Text style={styles.userStatus}>Conductor Activo</Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color={colors.warning} />
              <Text style={styles.rating}>4.9</Text>
            </View>
          </View>
        </View>

        {/* Navigation Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>127</Text>
            <Text style={styles.statLabel}>Viajes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>98%</Text>
            <Text style={styles.statLabel}>Eficiencia</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => router.push(item.route as any)}
            >
              <MaterialIcons name={item.icon as any} size={24} color={colors.textPrimary} />
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.quickAction, { backgroundColor: colors.error }]}
            onPress={handleEmergency}
          >
            <MaterialIcons name="emergency" size={20} color="white" />
            <Text style={styles.quickActionText}>Emergencia</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: colors.info }]}>
            <MaterialIcons name="feedback" size={20} color="white" />
            <Text style={styles.quickActionText}>Feedback</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: colors.success }]}>
            <MaterialIcons name="share" size={20} color="white" />
            <Text style={styles.quickActionText}>Compartir</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: colors.warning }]}>
            <MaterialIcons name="star-rate" size={20} color="white" />
            <Text style={styles.quickActionText}>Calificar App</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={20} color={colors.error} />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  header: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: 'white',
    marginBottom: spacing.xs,
  },
  userStatus: {
    fontSize: typography.sizes.sm,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: typography.sizes.sm,
    color: 'white',
    marginLeft: spacing.xs,
    fontWeight: typography.weights.medium,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  menuSection: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  menuText: {
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
    marginLeft: spacing.md,
    fontWeight: typography.weights.medium,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    justifyContent: 'space-between',
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginBottom: spacing.sm,
    width: '48%',
    justifyContent: 'center',
  },
  quickActionText: {
    fontSize: typography.sizes.xs,
    color: 'white',
    marginLeft: spacing.xs,
    fontWeight: typography.weights.medium,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  logoutText: {
    fontSize: typography.sizes.md,
    color: colors.error,
    marginLeft: spacing.sm,
    fontWeight: typography.weights.medium,
  },
});

export default CustomDrawerContent;
