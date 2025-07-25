// utils/auth.context.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { redirectToRoleBasedHome } from './navigation.helper';

export interface User {
  id: number;
  name: string;
  lastName?: string;
  email: string;
  role: string;
  emailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('auth_token');
      const storedUser = await AsyncStorage.getItem('auth_user');

      if (storedToken && storedUser) {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
        
        // Redirigir automáticamente basado en el rol cuando hay sesión existente
        console.log('🔄 [AUTH] Sesión existente encontrada para:', userData.email, 'Rol:', userData.role);
        
        // Pequeño delay para asegurar que el estado esté actualizado
        setTimeout(() => {
          redirectToRoleBasedHome(userData.role);
        }, 200);
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: User, userToken: string) => {
    try {
      // Validate that we have both user data and token before storing
      if (!userToken || !userData || !userData.id || !userData.email) {
        throw new Error('Missing user data or token');
      }

      // Additional validation to ensure token is not empty or just whitespace
      if (typeof userToken !== 'string' || userToken.trim().length === 0) {
        throw new Error('Invalid token format');
      }

      // Log token type for debugging
      if (userToken.startsWith('temp_token_')) {
        console.log('🔧 Storing temporary token for user:', userData.email);
      } else {
        console.log('✅ Storing valid JWT token for user:', userData.email);
      }

      await AsyncStorage.setItem('auth_token', userToken);
      await AsyncStorage.setItem('auth_user', JSON.stringify(userData));
      
      setToken(userToken);
      setUser(userData);
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('auth_user');
      
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
