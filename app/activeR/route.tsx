import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import { HeaderBar } from '../../components/activeRoute/HeaderBar';
import { CardBox } from '../../components/activeRoute/CardBox';
import { StatBadge } from '../../components/activeRoute/StatBadge';

export default function RouteScreen() {
  const [paused, setPaused] = useState(false);

  return (
    <View style={styles.container}>
      <HeaderBar />

      {/* Sección de pestañas */}
      <View style={styles.tabRow}>
        <Feather name="share-2" size={22} color="#6B7280" />
        <Feather name="alert-triangle" size={22} color="#6B7280" />
        <Feather name="send" size={22} color="#20c997" />
        <Feather name="star" size={22} color="#6B7280" />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Ruta Activa */}
        <CardBox>
          <View style={styles.rowSpace}>
            <Text style={styles.cardTitle}>Ruta Activa</Text>
            <Text style={styles.inProgress}>{paused ? 'Pausado' : 'En Curso'}</Text>
          </View>

          <View style={[styles.row, { marginBottom: 16 }]}>
            <Ionicons name="location-sharp" size={16} color="#0072ff" />
            <Text style={{ marginLeft: 6 }}>Centro – Mercado</Text>
          </View>

          <View style={[styles.row, { marginBottom: 16 }]}>
            <StatBadge value="3/8" label="Paradas" color="#2563EB" />
            <StatBadge value="45m" label="Tiempo" color="#16A34A" />
          </View>

          <View style={styles.row}>
            {/* Pausar */}
            <TouchableOpacity
              style={[styles.pauseBtn, { marginRight: 8 }]}
              onPress={() => setPaused(!paused)}
            >
              <Switch
                value={paused}
                onValueChange={setPaused}
                trackColor={{ false: '#D1D5DB', true: '#20c997' }}
                thumbColor="#FFF"
              />
              <Text style={{ marginLeft: 8 }}>Pausar</Text>
            </TouchableOpacity>

            {/* Finalizar */}
            <TouchableOpacity style={styles.finishBtn}>
              <Text style={{ color: '#FFF', fontWeight: '600' }}>Finalizar</Text>
            </TouchableOpacity>
          </View>
        </CardBox>

        {/* Próximas Paradas */}
        <CardBox>
          <Text style={styles.cardTitle}>Próximas Paradas</Text>

          {/* Parada 1 */}
          <View style={[styles.row, { marginTop: 16, marginBottom: 16 }]}>
            <View style={[styles.dot, { backgroundColor: '#2563EB' }]}>
              <Text style={styles.dotText}>4</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.stopName}>Plaza Central</Text>
              <Text style={styles.stopTime}>2 min aprox.</Text>
            </View>
            <TouchableOpacity style={styles.checkBtn}>
              <Feather name="check" color="#FFF" size={16} />
            </TouchableOpacity>
          </View>

          {/* Parada 2 */}
          <View style={[styles.row, { opacity: 0.6 }]}>
            <View style={[styles.dot, { backgroundColor: '#D1D5DB' }]}>
              <Text style={[styles.dotText, { color: '#374151' }]}>5</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.stopName}>Mercado Municipal</Text>
              <Text style={styles.stopTime}>8 min aprox.</Text>
            </View>
          </View>
        </CardBox>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: { fontWeight: '600', fontSize: 16 },
  inProgress: {
    backgroundColor: '#374151',
    color: '#FFF',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  pauseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  finishBtn: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotText: { color: '#FFF', fontWeight: '700' },
  stopName: { fontWeight: '500' },
  stopTime: { fontSize: 12, color: '#6B7280' },
  checkBtn: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 6,
  },
});
