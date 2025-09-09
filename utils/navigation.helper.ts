// utils/navigation.helper.ts
import { router } from 'expo-router';

export type UserRole = 'USER' | 'DRIVER' | 'ADMIN';

/**
 * Redirige al usuario a la pantalla apropiada basada en su rol
 * @param role - Rol del usuario
 */
export const redirectToRoleBasedHome = (role: string) => {
  console.log(`🚀 Redirigiendo usuario con rol: ${role}`);
  
  switch (role?.toUpperCase()) {
    case 'USER':
      // Usuarios normales van a las tabs principales
      console.log('📱 Redirigiendo a pantallas de Usuario');
      router.replace('/(tabs)');
      break;
      
    case 'DRIVER':
      // Conductores van a su pantalla principal
      console.log('🚗 Redirigiendo a pantallas de Conductor');
      router.replace('/Drivers/HomeScreen');
      break;
      
    case 'ADMIN':
      // Administradores van a tabs (por ahora)
      console.log('⚙️ Redirigiendo a panel de Administrador');
      router.replace('/(tabs)');
      break;
      
    default:
      // Rol desconocido, ir a pantalla por defecto
      console.warn(`⚠️ Rol desconocido: ${role}, redirigiendo a pantalla por defecto`);
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
      return '/(tabs)';
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
