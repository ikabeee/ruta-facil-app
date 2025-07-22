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
import {
  Landmark,
  Menu,
  Clock,
  DollarSign,
  Home,
  Search,
  Heart,
  Send,
  AlertTriangle,
} from "lucide-react-native";

export default function FavoritosScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Landmark size={20} color="#fff" style={{ marginRight: 8 }} />
          <View>
            <Text style={styles.headerTitle}>Transporte Mágico</Text>
            <Text style={styles.headerSubtitle}>San Miguel de los Milagros</Text>
          </View>
        </View>
        <Menu size={20} color="#fff" />
      </View>

      {/* Título */}
      <Text style={styles.sectionTitle}>Mis rutas favoritas</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Ruta 1 */}
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.cardTitle}>Mi ruta al trabajo</Text>
            <Text style={styles.status}>En ruta</Text>
          </View>
          <Text style={styles.routeName}>Ruta Centro Histórico</Text>
          <Text style={styles.destination}>
            Plaza Principal → Mercado de Artesanías
          </Text>

          <View style={styles.infoRow}>
            <Clock size={14} color="#6b7280" />
            <Text style={styles.infoText}>5 minutos</Text>
            <DollarSign size={14} color="#6b7280" style={{ marginLeft: 12 }} />
            <Text style={styles.infoText}>$12 pesos mexicanos</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.useRouteBtn}>
              <Text style={styles.useRouteText}>Usar ruta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ruta 2 */}
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.cardTitle}>Fin de semana mágico</Text>
            <Text style={styles.status}>En ruta</Text>
          </View>
          <Text style={styles.routeName}>Ruta Cascadas</Text>
          <Text style={styles.destination}>
            Centro → Cascadas Encantadas
          </Text>

          <View style={styles.infoRow}>
            <Clock size={14} color="#6b7280" />
            <Text style={styles.infoText}>25 minutos</Text>
            <DollarSign size={14} color="#6b7280" style={{ marginLeft: 12 }} />
            <Text style={styles.infoText}>$25 pesos mexicanos</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.useRouteBtn}>
              <Text style={styles.useRouteText}>Usar ruta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Navegación inferior */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/user")}
        >
          <Home size={24} color="#000" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/search")}
        >
          <Search size={24} color="#000" />
          <Text style={styles.navText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItemActive}
          onPress={() => router.push("/MobileTransportApp/favoritos")}
        >
          <Heart size={24} color="#20c997" />
          <Text style={[styles.navText, { color: "#000" }]}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/routes")}
        >
          <Send size={24} color="#000" />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#20c997",
    padding: 16,
    alignItems: "center",
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  headerTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  headerSubtitle: { color: "#ffe4e6", fontSize: 12 },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#111827",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#20c997",
  },
  status: {
    backgroundColor: "#e0f2fe",
    color: "#0284c7",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  routeName: {
    fontSize: 14,
    color: "#374151",
    marginTop: 4,
  },
  destination: {
    color: "#6b7280",
    fontSize: 13,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 4,
    color: "#374151",
    fontSize: 13,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  useRouteBtn: {
    backgroundColor: "#20c997",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  useRouteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteBtn: {
    backgroundColor: "#f9fafb",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  deleteText: {
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
  navItemActive: {
    alignItems: "center",
    backgroundColor: "#fff7ed",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  navText: {
    fontSize: 10,
    marginTop: 2,
    color: "#6b7280",
  },
});
