import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function TrackingScreen() {
  const { routeId } = useLocalSearchParams();
  const router = useRouter();

  console.log('🚌 [TRACKING] Pantalla de seguimiento abierta con routeId:', routeId);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Seguimiento de Ruta</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.routeText}>Ruta ID: {routeId}</Text>
        <Text style={styles.description}>
          Esta es la pantalla de seguimiento para la ruta seleccionada.
        </Text>
        <Text style={styles.status}>✅ Navegación funcionando correctamente</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#20c997',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  status: {
    fontSize: 16,
    color: '#20c997',
    fontWeight: 'bold',
  },
});
