import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Landmark,
  Home,
  Search,
  Heart,
  Send,
  MapPin,
} from "lucide-react-native"; // ❌ Menu eliminado

export default function BuscarDestinoScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const destinos = [
    "Plaza Principal",
    "Mercado de Artesanías",
    "Iglesia Colonial",
    "Mirador del Valle",
    "Cascadas encantadas",
    "Pirámide Antigua",
    "Talleres de Artesanías",
    "Aguas Termales",
    "Casa de la Cultura",
    "Museo del Pueblo",
  ];

  const filteredDestinos = destinos.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado sin icono de menú */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Landmark size={20} color="#fff" style={{ marginRight: 8 }} />
          <View>
            <Text style={styles.headerTitle}>Transporte Mágico</Text>
            <Text style={styles.headerSubtitle}>San Miguel de los Milagros</Text>
          </View>
        </View>
      </View>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar destino..."
          placeholderTextColor="#6b7280"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Lista de destinos */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Destinos populares</Text>

        {filteredDestinos.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={
              item === "Mercado de Artesanías"
                ? styles.selectedItem
                : styles.listItem
            }
            onPress={() => router.push("/MobileTransportApp/user")}
          >
            <MapPin size={16} color="#fb923c" style={{ marginRight: 8 }} />
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/MobileTransportApp/user")}>
          <Home size={24} color="#000" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/MobileTransportApp/search")}>
          <Search size={24} color="#20c997" />
          <Text style={[styles.navText, { color: "#000" }]}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/MobileTransportApp/favoritos")}>
          <Heart size={24} color="#000" />
          <Text style={styles.navText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/MobileTransportApp/routes")}>
          <Send size={24} color="#000" />
          <Text style={styles.navText}>Seguir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start", // Ajustado al eliminar el ícono de menú
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
  searchContainer: {
    padding: 12,
  },
  searchInput: {
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: "#111827",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff7ed",
  },
  itemText: {
    fontSize: 14,
    color: "#111827",
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
