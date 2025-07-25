import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import {
  AlertTriangle,
  Building,
  Bus,
  Clock,
  Heart,
  Home,
  MapPin,
  Search,
  Send,
  User,
} from "lucide-react-native"
import React from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

export default function MobileTransportApp() {
  const router = useRouter()
  const routes = [
    {
      name: "Ruta Centro Histórico",
      description: "Plaza Principal → Mercado de Artesanías",
      status: "Llegando",
      statusColor: "#22c55e",
      time: "5",
      distance: "0,8",
      price: "12",
    },
    {
      name: "Ruta Templos",
      description: "Iglesia Colonial → Pirámide Antigua",
      status: "En ruta",
      statusColor: "#3b82f6",
      time: "12",
      distance: "2,1",
      price: "15",
    },
    {
      name: "Ruta Mirador",
      description: "Centro → Mirador del Valle",
      status: "Retrasado",
      statusColor: "#f97316",
      time: "8",
      distance: "1,5",
      price: "18",
    },
    {
      name: "Ruta Artesanos",
      description: "Mercado Artesanal → Centro",
      status: "En ruta",
      statusColor: "#3b82f6",
      time: "7",
      distance: "1,0",
      price: "10",
    },
  ]

  return (
    <View style={styles.container}>
      {/* Header con botón de perfil */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Building size={24} color="white" />
          <View>
            <Text style={styles.headerTitle}>Ruta Facil</Text>
            <Text style={styles.headerSubtitle}>Huauchinango, Puebla</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => router.push('/MobileTransportApp/profile')}
        >
          <User size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView style={styles.content} contentContainerStyle={{ padding: 16 }}>
        {/* Location Card */}
        <View style={styles.locationCard}>
          <View style={styles.locationTop}>
            <MapPin size={16} color="white" />
            <Text style={styles.locationLabel}>Tu ubicación actual</Text>
          </View>
          <Text style={styles.locationTitle}>Centro</Text>
          <Text style={styles.locationSubtitle}>Huauchinango, Puebla</Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#000000ff" style={styles.searchIcon} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/MobileTransportApp/search")}
            style={{ flex: 1 }}
          >
            <View pointerEvents="none">
              <TextInput
                style={styles.searchInput}
                placeholder="¿A dónde quieres ir?"
                placeholderTextColor="#000000ff"
                editable={false}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionBtn}>
            <Heart size={24} color="#20c997" />
            <Text style={styles.quickActionText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionBtn}>
            <Search size={24} color="#20c997" />
            <Text style={styles.quickActionText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* Nearby Routes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bus size={20} color="#ea580c" />
            <Text style={styles.sectionTitle}>Rutas cercanas</Text>
          </View>

          {routes.map((route, index) => (
            <View key={index} style={styles.routeCard}>
              <View style={styles.routeHeader}>
                <Text style={styles.routeTitle}>{route.name}</Text>
                <View style={[styles.badge, { backgroundColor: route.statusColor }]}>
                  <Text style={styles.badgeText}>{route.status}</Text>
                </View>
              </View>
              <Text style={styles.routeDescription}>{route.description}</Text>
              <View style={styles.routeInfo}>
                <View style={styles.infoItem}>
                  <Clock size={16} color="#000000ff" />
                  <Text style={styles.infoText}>{route.time} min</Text>
                </View>
                <View style={styles.infoItem}>
                  <MapPin size={16} color="#000000ff" />
                  <Text style={styles.infoText}>{route.distance} km</Text>
                </View>
                <Text style={styles.routePrice}>${route.price}</Text>
              </View>
              <View style={styles.routeButtons}>
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={() => router.push("/MobileTransportApp/routes")}
                >
                  <Send size={16} color="white" />
                  <Text style={styles.followText}>Seguir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={async () => {
                    try {
                      const stored = await AsyncStorage.getItem("favoritos")
                      let favoritos = stored ? JSON.parse(stored) : []
                      if (!favoritos.some((f: { name: string }) => f.name === route.name)) {
                        favoritos.push(route)
                        await AsyncStorage.setItem("favoritos", JSON.stringify(favoritos))
                      }
                    } catch {
                      // Manejo de error silencioso
                    }
                    router.push("/MobileTransportApp/favoritos")
                  }}
                >
                  <Heart size={16} color="#ea580c" />
                  <Text style={styles.saveText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      <View style={styles.navbar}>
  <TouchableOpacity
    style={styles.navItem}
    onPress={() => router.push("/MobileTransportApp/user")}
  >
    <Home size={24} color="#20c997" />
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
    <Send size={24} color="#000000ff" />
    <Text style={styles.navText}>Seguir</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.navItem}
    onPress={() => router.push("/MobileTransportApp/incidents")}
  >
    <AlertTriangle size={24} color="#000000ff" />
    <Text style={[styles.navText, { color: "#000000ff" }]}>Incidentes</Text>
  </TouchableOpacity>
</View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    backgroundColor: "#20c997",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  profileButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerTitle: { color: "white", fontSize: 16, fontWeight: "bold" },
  headerSubtitle: { color: "white", fontSize: 12, opacity: 0.9 },
  content: { flex: 1 },
  locationCard: {
    backgroundColor: "#20c997",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  locationTop: { flexDirection: "row", alignItems: "center", gap: 6 },
  locationLabel: { color: "white", fontSize: 12, opacity: 0.9 },
  locationTitle: { color: "white", fontSize: 18, fontWeight: "bold", marginTop: 4 },
  locationSubtitle: { color: "white", fontSize: 13, opacity: 0.9 },
  searchContainer: {
    position: "relative",
    marginBottom: 16,
    justifyContent: "center",
  },
  searchIcon: { position: "absolute", left: 12, zIndex: 1 },
  searchInput: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
    paddingLeft: 36,
    paddingRight: 12,
    borderColor: "#d1d5db",
    borderWidth: 1,
    color: "#111827",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  quickActionBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000000ff",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 12,
    marginHorizontal: 4,
    backgroundColor: "#fff",
  },
  quickActionText: { color: "#000000ff", fontSize: 14, marginTop: 4 },
  section: { marginBottom: 32 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#111827" },
  routeCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  routeHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
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
  routeButtons: { flexDirection: "row", gap: 8, marginTop: 12 },
  followButton: {
    flex: 1,
    backgroundColor: "#20c997",
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  followText: { color: "white", fontWeight: "bold" },
  saveButton: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "white",
  },
  saveText: { color: "#000000ff", fontWeight: "bold" },
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
