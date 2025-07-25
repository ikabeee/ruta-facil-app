// utils/navigation.helper.ts
import { router } from 'expo-router';

export type UserRole = 'USER' | 'DRIVER' | 'ADMIN';

/**
 * Redirige al usuario a la pantalla apropiada basada en su rol
 * @param role - Rol del usuario
 */
export const redirectToRoleBasedHome = (role: string) => {
  console.log(`🚀 [NAVIGATION] Iniciando redirección para rol: ${role}`);
  
  switch (role?.toUpperCase()) {
    case 'USER':
      console.log('📱 [NAVIGATION] Usuario detectado, redirigiendo a MobileTransportApp...');
      try {
        // Usar solo replace sin dismissAll para evitar errores de navegación
        router.replace('/MobileTransportApp/user');
        console.log('✅ [NAVIGATION] Redirección a /MobileTransportApp/user ejecutada');
      } catch (error) {
        console.error('❌ [NAVIGATION] Error en redirección:', error);
        // Fallback: usar push en lugar de replace
        router.push('/MobileTransportApp/user');
        console.log('🔄 [NAVIGATION] Fallback: usando push');
      }
      break;
      case 'DRIVER':
        // Conductores van a su pantalla principal
        console.log('🚗 [NAVIGATION] Conductor detectado, redirigiendo a Drivers...');
        router.replace('/Drivers/HomeScreen');
        break;
        
      case 'ADMIN':
        // Administradores van a tabs (por ahora)
        console.log('⚙️ [NAVIGATION] Admin detectado, redirigiendo a tabs...');
        router.replace('/(tabs)');
        break;
        
      default:
        // Rol desconocido, ir a pantalla por defecto
        console.warn(`⚠️ [NAVIGATION] Rol desconocido: ${role}, redirigiendo a tabs por defecto`);
        router.replace('/(tabs)');
        break;
  }
};

/**
 * Obtiene la ruta de inicio basada en el rol del usuario
 * @param role - Rol del usuario
 * @returns Ruta de inicio correspondiente
 */
export const getHomeRouteForRole = (role: string): string => {
  switch (role?.toUpperCase()) {
    case 'USER':
      return '/MobileTransportApp/user';
    case 'DRIVER':
      return '/Drivers/HomeScreen';
    case 'ADMIN':
      return '/(tabs)'; // Por ahora, mismo que usuarios
    default:
      return '/(tabs)';
  }
};

/**
 * Verifica si el usuario tiene permisos para acceder a una ruta específica
 * @param userRole - Rol del usuario
 * @param routePath - Ruta a verificar
 * @returns true si tiene permisos, false si no
 */
export const hasAccessToRoute = (userRole: string, routePath: string): boolean => {
  const role = userRole?.toUpperCase();
  
  // Rutas públicas (accesibles para todos)
  const publicRoutes = ['/login', '/register', '/otp-verification', '/welcome'];
  if (publicRoutes.some(route => routePath.startsWith(route))) {
    return true;
  }
  
  // Rutas específicas por rol
  if (routePath.startsWith('/MobileTransportApp') || routePath.startsWith('/(tabs)')) {
    return role === 'USER' || role === 'ADMIN';
  }
  
  if (routePath.startsWith('/Drivers')) {
    return role === 'DRIVER' || role === 'ADMIN';
  }
  
  // Por defecto, permitir acceso
  return true;
};

/**
 * Mensajes de bienvenida personalizados por rol
 */
export const getWelcomeMessage = (role: string, userName?: string): string => {
  const name = userName ? `, ${userName}` : '';
  
  switch (role?.toUpperCase()) {
    case 'USER':
      return `¡Bienvenido${name}! ¿A dónde quieres ir hoy?`;
    case 'DRIVER':
      return `¡Bienvenido conductor${name}! Listo para comenzar tu jornada.`;
    case 'ADMIN':
      return `¡Bienvenido administrador${name}! Panel de control disponible.`;
    default:
      return `¡Bienvenido${name}!`;
  }
};
