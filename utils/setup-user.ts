// Script temporal para configurar AsyncStorage con datos de usuario válidos
// Este debe ejecutarse en el simulador/emulador de React Native

import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setupUserForTesting() {
  try {
    // Datos del usuario que sabemos que existe en la BD
    const userData = {
      id: 53,
      email: 'carlglz30@gmail.com',
      name: 'Administrador',
      role: 'admin'
    };

    // Guardar en AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    console.log('✅ Usuario configurado en AsyncStorage:', userData);
    
    // Verificar que se guardó
    const saved = await AsyncStorage.getItem('userData');
    if (saved) {
      console.log('✅ Verificación AsyncStorage:', JSON.parse(saved));
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error configurando AsyncStorage:', error);
    return false;
  }
}

// También exportar función para limpiar
export async function clearUserData() {
  try {
    await AsyncStorage.removeItem('userData');
    console.log('🗑️ Datos de usuario eliminados del AsyncStorage');
  } catch (error) {
    console.error('❌ Error limpiando AsyncStorage:', error);
  }
}
