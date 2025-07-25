// components/RoleProtectedRoute.tsx
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../utils/auth.context';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  requiredRole
}) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  // Manejar redirección a login en useEffect
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, user, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Verificando permisos...</Text>
      </View>
    );
  }

  // Si no está autenticado, mostrar loading mientras redirige
  if (!isAuthenticated || !user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Redirigiendo...</Text>
      </View>
    );
  }

  // Si se especifica un rol requerido, verificar acceso
  if (requiredRole) {
    const userRole = user.role?.toUpperCase();
    const allowedRoles = Array.isArray(requiredRole) 
      ? requiredRole.map(role => role.toUpperCase())
      : [requiredRole.toUpperCase()];

    if (!allowedRoles.includes(userRole)) {
      // Usuario no tiene el rol requerido
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Acceso Denegado</Text>
          <Text style={styles.errorText}>
            No tienes permisos para acceder a esta sección.
          </Text>
          <Text style={styles.errorRole}>
            Tu rol: {user.role}
          </Text>
        </View>
      );
    }
  }

  // Usuario tiene permisos, mostrar el contenido
  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  errorRole: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});
