import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors, spacing, typography } from '../Styles/theme';
import HamburgerMenu from './HamburgerMenu';

interface SettingsScreenProps {
  // No navigation props needed for expo-router
}

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [locationSharing, setLocationSharing] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [autoAccept, setAutoAccept] = React.useState(false);
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={toggleMenu}
        >
          <MaterialIcons name="menu" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Configuración</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CUENTA</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="person" size={24} color={colors.primary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Información Personal</Text>
                <Text style={styles.settingSubtitle}>Editar perfil y datos</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="security" size={24} color={colors.warning} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Seguridad</Text>
                <Text style={styles.settingSubtitle}>Contraseña y autenticación</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="payment" size={24} color={colors.success} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Métodos de Pago</Text>
                <Text style={styles.settingSubtitle}>Gestionar formas de cobro</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APLICACIÓN</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="notifications" size={24} color={colors.info} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Notificaciones</Text>
                <Text style={styles.settingSubtitle}>Recibir alertas y avisos</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={notifications ? colors.surface : colors.textDisabled}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="location-on" size={24} color={colors.error} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Compartir Ubicación</Text>
                <Text style={styles.settingSubtitle}>Permitir seguimiento GPS</Text>
              </View>
            </View>
            <Switch
              value={locationSharing}
              onValueChange={setLocationSharing}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={locationSharing ? colors.surface : colors.textDisabled}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="dark-mode" size={24} color={colors.textSecondary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Modo Oscuro</Text>
                <Text style={styles.settingSubtitle}>Tema oscuro de la app</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={darkMode ? colors.surface : colors.textDisabled}
            />
          </View>
        </View>

        {/* Driver Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONDUCTOR</Text>
          

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="directions-car" size={24} color={colors.primary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Mi Vehículo</Text>
                <Text style={styles.settingSubtitle}>Toyota Corolla 2020</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="description" size={24} color={colors.warning} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Documentos</Text>
                <Text style={styles.settingSubtitle}>Licencia, seguro, permisos</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SOPORTE</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="help" size={24} color={colors.info} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Centro de Ayuda</Text>
                <Text style={styles.settingSubtitle}>Preguntas frecuentes</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="feedback" size={24} color={colors.secondary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Enviar Comentarios</Text>
                <Text style={styles.settingSubtitle}>Reportar problemas</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="info" size={24} color={colors.textSecondary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Acerca de</Text>
                <Text style={styles.settingSubtitle}>Versión 1.0.0</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
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
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    elevation: 2,
  },
  backButton: {
    padding: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: colors.surface,
    marginTop: spacing.md,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    letterSpacing: 1,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  settingTitle: {
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  settingSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
});

export default SettingsScreen;
