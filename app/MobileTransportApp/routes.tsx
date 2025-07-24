import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MapView, { Marker } from "../../components/map/MapView";
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
      {/* Mapa pantalla completa */}
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

      {/* Panel inferior compacto */}
      <View style={styles.bottomPanel}>
        <View style={styles.infoRow}>
          <Info size={14} color="#f97316" />
          <Text style={styles.infoTitle}>Plaza → Mercado</Text>
        </View>

        <Text style={styles.infoSmall}>
          5 min • 0.8 km • <Text style={{ color: "#16a34a" }}>$12</Text>
        </Text>

        <View style={styles.statusBadge}>
          <Circle size={10} color="#22c55e" style={{ marginRight: 6 }} />
          <Text style={styles.statusText}>Llegando</Text>
        </View>

        {/* Botones compactos */}
        <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
          <TouchableOpacity
            style={[styles.btnMini, { backgroundColor: "#20c997" }]}
            onPress={() => router.push("/MobileTransportApp/qualifications")}
          >
            <Check size={14} color="#fff" />
            <Text style={styles.btnTextLight}>Calificar Conductor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnMini, { borderWidth: 1, borderColor: "#ccc" }]}
            onPress={() => router.push("/MobileTransportApp/user")}
          >
            <X size={14} color="#111827" />
            <Text style={styles.btnTextDark}>Cancelar Viaje</Text>
          </TouchableOpacity>
        </View>
      </View>

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
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#20c997",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
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
    color: "white",
    fontSize: 12,
  },
  bottomPanel: {
    position: "absolute",
    bottom: 60,
    left: 16,
    right: 16,
    backgroundColor: "#ffffffee",
    padding: 12,
    borderRadius: 12,
    elevation: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoTitle: {
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 6,
    color: "#111827",
  },
  infoSmall: {
    fontSize: 12,
    color: "#4b5563",
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
  btnMini: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
    flex: 1,
    justifyContent: "center",
  },
  btnTextLight: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  btnTextDark: {
    color: "#111827",
    fontWeight: "600",
    fontSize: 12,
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
