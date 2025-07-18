import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors, spacing, typography } from '../Styles/theme';

interface HamburgerMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isVisible, onClose }) => {
  const navigateToScreen = (screenPath: string) => {
    onClose();
    router.push(screenPath as any);
  };

  if (!isVisible) return null;

  return (
    <View style={styles.menuOverlay}>
      <TouchableOpacity 
        style={styles.menuBackdrop} 
        onPress={onClose}
      />
      <View style={styles.menuDrawer}>
        {/* Menu Header */}
        <View style={styles.menuHeader}>
          <View style={styles.menuAvatar}>
            <MaterialIcons name="person" size={32} color={colors.primary} />
          </View>
          <View style={styles.menuUserInfo}>
            <Text style={styles.menuUserName}>Carlos Mendoza</Text>
            <Text style={styles.menuUserStatus}>Conductor Activo</Text>
            <View style={styles.menuRatingContainer}>
              <MaterialIcons name="star" size={16} color={colors.warning} />
              <Text style={styles.menuRating}>4.9</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <ScrollView style={styles.menuContent}>
          {[
            { title: 'Inicio', icon: 'home', route: '/Drivers/HomeScreen' },
            { title: 'Rutas', icon: 'directions-car', route: '/Drivers/TripsScreen' },
            { title: 'Ganancias', icon: 'attach-money', route: '/Drivers/EarningsScreen' },
            { title: 'Documentos', icon: 'description', route: '/Drivers/DocumentsScreen' },
            { title: 'Perfil', icon: 'person', route: '/Drivers/ProfileScreen' },
            { title: 'Configuración', icon: 'settings', route: '/Drivers/SettingScreen' },
            { title: 'Soporte', icon: 'help', route: '/Drivers/SupportScreen' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigateToScreen(item.route)}
            >
              <MaterialIcons name={item.icon as any} size={24} color={colors.textPrimary} />
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}

          {/* Quick Actions */}
          <View style={styles.menuQuickActions}>
            <Text style={styles.menuSectionTitle}>ACCIONES RÁPIDAS</Text>
            <TouchableOpacity style={[styles.menuQuickAction, { backgroundColor: colors.error }]}>
              <MaterialIcons name="emergency" size={20} color="white" />
              <Text style={styles.menuQuickActionText}>Incidencia</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Logout */}
        <TouchableOpacity 
          style={styles.menuLogoutButton}
          onPress={() => {
            onClose();
            router.replace('/auth/login');
          }}
        >
          <MaterialIcons name="logout" size={20} color={colors.error} />
          <Text style={styles.menuLogoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default HamburgerMenu;
