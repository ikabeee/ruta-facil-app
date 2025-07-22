import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import {
  AlertTriangle,
  Home,
  Search,
  Heart,
  Send,
  Landmark,
} from "lucide-react-native";

const incidentes = [
  {
    id: "1",
    tipo: "Retraso de unidad",
    descripcion: "La unidad de la Ruta Templos presenta un retraso de 10 minutos.",
    hora: "10:35 AM",
  },
  {
    id: "2",
    tipo: "Desvío de ruta",
    descripcion: "La Ruta Centro Histórico ha sido desviada por obras.",
    hora: "9:50 AM",
  },
  {
    id: "3",
    tipo: "Unidad fuera de servicio",
    descripcion: "Ruta Mirador no está disponible temporalmente.",
    hora: "8:20 AM",
  },
];

export default function IncidentesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Landmark size={20} color="#fff" style={{ marginRight: 8 }} />
          <View>
            <Text style={styles.headerTitle}>Ruta Facil</Text>
            <Text style={styles.headerSubtitle}>Huauchinango, Puebla</Text>
          </View>
        </View>
      </View>

      {/* Título */}
      <Text style={styles.sectionTitle}>Incidentes reportados</Text>

      <FlatList
        data={incidentes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <AlertTriangle size={18} color="#f97316" />
              <Text style={styles.tipo}>{item.tipo}</Text>
              <Text style={styles.hora}>{item.hora}</Text>
            </View>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
          </View>
        )}
      />

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
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/favoritos")}
        >
          <Heart size={24} color="#000" />
          <Text style={styles.navText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/MobileTransportApp/routes")}
        >
          <Send size={24} color="#000" />
          <Text style={styles.navText}>Seguir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItemActive}
          onPress={() => router.push("/MobileTransportApp/incidents")}
        >
          <AlertTriangle size={24} color="#20c997" />
          <Text style={[styles.navText, { color: "#000" }]}>Incidentes</Text>
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
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  tipo: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#20c997",
    flex: 1,
    marginLeft: 6,
  },
  hora: {
    fontSize: 12,
    color: "#6b7280",
  },
  descripcion: {
    fontSize: 13,
    color: "#374151",
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
