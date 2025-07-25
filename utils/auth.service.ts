// utils/auth.service.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from '../config/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyOTPRequest {
  code: string;
  email?: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    lastName?: string;
    email: string;
    role: string;
    emailVerified: boolean;
  };
  token: string;
  expiresIn: number; // Changed to number to match backend
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

export class AuthService {
  static async login(data: LoginRequest): Promise<{ success: boolean; data?: any; error?: string; requiresOTP?: boolean; email?: string }> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Login exitoso (no debería llegar aquí con OTP habilitado)
        return { success: true, data: responseData };
      } else {
        // Verificar si requiere OTP
        if (response.status === 422 && (
          responseData.message?.includes('REQUIRES_OTP_VERIFICATION:') ||
          responseData.requiresOTPVerification
        )) {
          const email = responseData.email || 
                        (responseData.message?.includes('REQUIRES_OTP_VERIFICATION:') ? 
                         responseData.message.split(':')[1] : data.email);
          return { 
            success: false, 
            requiresOTP: true, 
            email: email,
            error: responseData.message || 'Se ha enviado un código de verificación a tu correo electrónico' 
          };
        }
        
        // Verificar si requiere verificación de email
        if (responseData.requiresEmailVerification) {
          return { 
            success: false, 
            error: responseData.message || 'Debes verificar tu correo electrónico antes de iniciar sesión'
          };
        }
        
        return { 
          success: false, 
          error: responseData.message || 'Credenciales incorrectas' 
        };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        error: 'Error de conexión. Verifica tu conexión a internet.' 
      };
    }
  }

  static async verifyOTP(data: VerifyOTPRequest): Promise<{ success: boolean; data?: AuthResponse; error?: string }> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.VERIFY_2FA, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      console.log('=== BACKEND RESPONSE ===');
      console.log('Status:', response.status);
      console.log('Response Data:', JSON.stringify(responseData, null, 2));

      if (response.ok) {
        // Check if this is a login completion (has user and token) or just email verification
        if (responseData.data && responseData.data.user) {
          console.log('✅ Response has user data');
          console.log('🔍 Checking for token field...');
          console.log('Has token:', !!responseData.data.token);
          console.log('Available data fields:', Object.keys(responseData.data));
          
          // This is a successful OTP login completion
          return { 
            success: true, 
            data: responseData.data
          };
        } else {
          // This is just email verification, not a login
          return { 
            success: false, 
            error: 'Este código es para verificación de email, no para login. Por favor usa el formulario de login.' 
          };
        }
      } else {
        return { 
          success: false, 
          error: responseData.message || 'Código de verificación incorrecto' 
        };
      }
    } catch (error) {
      console.error('Error en verificación OTP:', error);
      return { 
        success: false, 
        error: 'Error de conexión. Verifica tu conexión a internet.' 
      };
    }
  }

  static async resendOTP(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Usar el nuevo endpoint específico para reenvío de OTP
      const response = await fetch(API_ENDPOINTS.AUTH.RESEND_OTP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        return { success: true };
      } else {
        const responseData = await response.json();
        return { 
          success: false, 
          error: responseData.message || 'No se pudo reenviar el código' 
        };
      }
    } catch (error) {
      console.error('Error al reenviar OTP:', error);
      return { 
        success: false, 
        error: 'Error de conexión. Verifica tu conexión a internet.' 
      };
    }
  }

  // Nuevo método para guardar la sesión del usuario
  static async saveUserSession(authData: AuthResponse): Promise<void> {
    try {
      // Usar AsyncStorage para React Native
      await AsyncStorage.setItem('auth_token', authData.token);
      await AsyncStorage.setItem('auth_user', JSON.stringify(authData.user));
      await AsyncStorage.setItem('token_expires', authData.expiresIn.toString());
      console.log('Sesión guardada exitosamente');
    } catch (error) {
      console.error('Error guardando sesión:', error);
    }
  }

  // Método para limpiar la sesión
  static async clearUserSession(): Promise<void> {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('auth_user');
      await AsyncStorage.removeItem('token_expires');
      console.log('Sesión limpiada exitosamente');
    } catch (error) {
      console.error('Error limpiando sesión:', error);
    }
  }

  // Método para obtener la sesión actual
  static async getCurrentSession(): Promise<{ token: string; user: any } | null> {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userData = await AsyncStorage.getItem('auth_user');
      
      if (token && userData) {
        return {
          token,
          user: JSON.parse(userData)
        };
      }
      return null;
    } catch (error) {
      console.error('Error obteniendo sesión:', error);
      return null;
    }
  }
}

export default AuthService;
