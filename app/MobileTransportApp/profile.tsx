import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Building,
    LogOut,
    Mail,
    Shield,
    User,
} from 'lucide-react-native';
import React from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../utils/auth.context';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que deseas cerrar tu sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Cerrar Sesión",
          style: "destructive",
          onPress: async () => {
            try {
              console.log('🚪 [PROFILE] Iniciando cierre de sesión...');
              await logout();
              console.log('✅ [PROFILE] Sesión cerrada correctamente');
              router.replace('/login');
            } catch (error) {
              console.error('❌ [PROFILE] Error al cerrar sesión:', error);
              Alert.alert("Error", "No se pudo cerrar la sesión. Intenta nuevamente.");
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Building size={20} color="white" />
          <Text style={styles.headerTitle}>Mi Perfil</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Profile Content */}
      <View style={styles.content}>
        {/* User Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User size={40} color="#20c997" />
          </View>
          <Text style={styles.userName}>
            {user?.name} {user?.lastName}
          </Text>
          <Text style={styles.userRole}>{user?.role}</Text>
        </View>

        {/* User Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <User size={20} color="#6b7280" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Nombre Completo</Text>
                <Text style={styles.infoValue}>
                  {user?.name} {user?.lastName || ''}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <Mail size={20} color="#6b7280" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Correo Electrónico</Text>
                <Text style={styles.infoValue}>{user?.email}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <Shield size={20} color="#6b7280" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Rol</Text>
                <Text style={styles.infoValue}>{user?.role}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <View 
                style={[
                  styles.statusIndicator, 
                  { backgroundColor: user?.emailVerified ? '#22c55e' : '#f59e0b' }
                ]} 
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Estado de la Cuenta</Text>
                <Text style={styles.infoValue}>
                  {user?.emailVerified ? 'Verificada' : 'Pendiente de verificación'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <LogOut size={20} color="white" />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#20c997',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 16,
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 32, // Para mantener el header centrado
  },
  content: {
    flex: 1,
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: '#6b7280',
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  infoSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 0,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 4,
  },
  logoutSection: {
    marginTop: 'auto',
    paddingBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
