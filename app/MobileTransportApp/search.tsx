import React from "react"
import { useRouter } from "expo-router"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import {
  Home,
  Search,
  Heart,
  Send,
  AlertTriangle,
  MapPin,
  Clock,
  Bus,
} from "lucide-react-native"

export default function SeguirRutaScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      {/* Encabezado de seguimiento */}
      <View style={styles.header}>
        <Bus size={24} color="white" />
        <View>
          <Text style={styles.headerTitle}>Seguimiento de Ruta</Text>
          <Text style={styles.headerSubtitle}>Ruta Activa en Tiempo Real</Text>
        </View>
      </View>

      {/* Estado actual */}
      <View style={styles.routeCard}>
        <View style={styles.routeHeader}>
          <Text style={styles.routeTitle}>Ruta Centro Histórico</Text>
          <View style={[styles.badge, { backgroundColor: "#22c55e" }]}> 
            <Text style={styles.badgeText}>Llegando</Text>
          </View>
        </View>
        <Text style={styles.routeDescription}>Plaza Principal → Mercado de Artesanías</Text>
        <View style={styles.routeInfo}>
          <View style={styles.infoItem}>
            <Clock size={16} color="#000" />
            <Text style={styles.infoText}>5 min</Text>
          </View>
          <View style={styles.infoItem}>
            <MapPin size={16} color="#000" />
            <Text style={styles.infoText}>0,8 km</Text>
          </View>
          <Text style={styles.routePrice}>$12</Text>
        </View>
      </View>

      {/* Mensaje principal */}
      <View style={styles.centerTextContainer}>
        <Text style={styles.centerTitle}>Seguimiento de Ruta Activa</Text>
        <Text style={styles.centerSubtitle}>
          Aquí se mostrará el estado del transporte en tiempo real.
        </Text>
      </View>

      {/* Barra de navegación inferior */}
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
          <Text style={[styles.navText, { color: "#20c997" }]}>Seguir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/incidents")}
        >
          <AlertTriangle size={24} color="#000000ff" />
          <Text style={styles.navText}>Incidentes</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6", justifyContent: "space-between" },
  header: {
    backgroundColor: "#20c997",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 8,
  },
  headerTitle: { color: "white", fontSize: 16, fontWeight: "bold" },
  headerSubtitle: { color: "white", fontSize: 12, opacity: 0.9 },
  routeCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  routeTitle: { fontSize: 15, fontWeight: "bold", color: "#111827" },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { color: "white", fontSize: 10 },
  routeDescription: { fontSize: 13, color: "#6b7280", marginTop: 4 },
  routeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },
  infoItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  infoText: { fontSize: 12, color: "#4b5563" },
  routePrice: { fontSize: 13, fontWeight: "bold", color: "#16a34a" },
  centerTextContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  centerTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  centerSubtitle: { fontSize: 16, color: "#6b7280" },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 10, marginTop: 2, color: "#000000ff" },
})
