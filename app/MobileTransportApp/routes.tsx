import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  Landmark,
  Info,
  Check,
  X,
  Home,
  Search,
  Heart,
  Send,
  Circle,
  AlertTriangle,
} from "lucide-react-native";

export default function SeguirRutaScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Landmark size={20} color="#fff" style={{ marginRight: 8 }} />
          <View>
            <Text style={styles.headerTitle}>Ruta Fácil</Text>
            <Text style={styles.headerSubtitle}>Huauchinango, Puebla</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Información de la Ruta */}
        <View style={styles.routeCard}>
          <Text style={styles.routeCardTitle}>Siguiendo tu ruta</Text>
          <Text style={styles.routeCardSubtitle}>Ruta Centro Histórico</Text>
        </View>

        {/* Mapa */}
        <View style={styles.mapCard}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 20.1743,
              longitude: -98.0474,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{ latitude: 20.1743, longitude: -98.0474 }}
              title="Autobús"
              description="En camino a tu ubicación"
            />
          </MapView>
        </View>

        {/* Detalles del viaje */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Info size={16} color="#f97316" />
            <Text style={styles.infoTitle}>Información del viaje</Text>
          </View>

          <Text style={styles.infoText}>
            <Text style={styles.label}>Destino: </Text>
            Plaza Principal → Mercado de Artesanías
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Tiempo estimado: </Text>5 minutos
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Distancia: </Text>0.8 km
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Costo: </Text>
            <Text style={{ color: "#16a34a" }}>$12 MXN</Text>
          </Text>

          <View style={styles.statusBadge}>
            <Circle size={10} color="#22c55e" style={{ marginRight: 6 }} />
            <Text style={styles.statusText}>Llegando</Text>
          </View>
        </View>

        {/* Botones de acción */}
        <TouchableOpacity
          style={styles.successBtn}
          onPress={() => router.push("/MobileTransportApp/qualifications")}
        >
          <Check size={16} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.successText}>Calificar Conductor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.push("/MobileTransportApp/user")}
        >
          <X size={16} color="#111827" style={{ marginRight: 6 }} />
          <Text style={styles.cancelText}>Cancelar seguimiento</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Navegación inferior */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/user")}
        >
          <Home size={24} color="#000000ff" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/search")}
        >
          <Search size={24} color="#000000ff" />
          <Text style={styles.navText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/favoritos")}
        >
          <Heart size={24} color="#000000ff" />
          <Text style={styles.navText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/routes")}
        >
          <Send size={24} color="#20c997" />
          <Text style={styles.navText}>Seguir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/incidents")}
        >
          <AlertTriangle size={24} color="#000" />
          <Text style={styles.navText}>Incidentes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#20c997",
    padding: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  headerSubtitle: {
    color: "#ffe4e6",
    fontSize: 12,
  },
  routeCard: {
    backgroundColor: "#20c997",
    padding: 12,
    margin: 16,
    borderRadius: 8,
  },
  routeCardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  routeCardSubtitle: {
    color: "#e0e7ff",
    fontSize: 12,
  },
  mapCard: {
    backgroundColor: "#e0f2fe",
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: 250,
  },
  infoCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoTitle: {
    fontWeight: "bold",
    marginLeft: 6,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#111827",
  },
  label: {
    fontWeight: "bold",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: "#ecfdf5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  successBtn: {
    flexDirection: "row",
    backgroundColor: "#20c997",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  successText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelBtn: {
    flexDirection: "row",
    borderColor: "#d1d5db",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  cancelText: {
    color: "#111827",
    fontWeight: "bold",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 10,
    marginTop: 2,
    color: "#6b7280",
  },
});
