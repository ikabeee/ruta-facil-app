import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  Landmark,
  Menu,
  Home,
  Search,
  Heart,
  Send,
  Star,
  StarOff,
} from "lucide-react-native";

const TripCompletedScreen = () => {
  const [rating, setRating] = useState(0);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* ENCABEZADO */}
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

      {/* CONTENIDO */}
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>¡Viaje completado!</Text>
        <Text style={styles.subtitle}>
          Esperamos que hayas disfrutado tu viaje por nuestro pueblo mágico.
        </Text>

        <View style={styles.card}>
          <View style={styles.avatar} />
          <Text style={styles.name}>José Miguel Hernández</Text>
          <Text style={styles.label}>Certificado de conductor</Text>

          <View style={styles.ratingBox}>
            <Star size={12} color="#fff" />
            <Text style={styles.ratingText}>4.8</Text>
          </View>
        </View>

        <Text style={styles.question}>¿Cómo calificarías tu experiencia?</Text>

        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity key={i} onPress={() => setRating(i)}>
              {i <= rating ? (
                <Star size={30} color="#20c997" />
              ) : (
                <StarOff size={30} color="#d1d5db" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryText}>Selecciona una calificación</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipBtn}
          onPress={() => router.push("/MobileTransportApp/user")}
        >
          <Text style={styles.skipText}>Omitir por ahora</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/MobileTransportApp/user")}> 
          <Home size={24} color="#000" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/MobileTransportApp/search")}> 
          <Search size={24} color="#000" />
          <Text style={styles.navText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/MobileTransportApp/favoritos")}> 
          <Heart size={24} color="#000" />
          <Text style={styles.navText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive} onPress={() => router.push("/MobileTransportApp/routes")}> 
          <Send size={24} color="#20c997" />
          <Text style={[styles.navText, { color: "#000" }]}>Seguir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TripCompletedScreen;

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
  scroll: {
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 6 },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: "#e5e7eb",
    borderRadius: 32,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "bold" },
  label: { fontSize: 13, color: "#6b7280", marginBottom: 8 },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#20c997",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingText: { color: "#fff", marginLeft: 4 },
  question: { fontSize: 16, marginBottom: 10 },
  starsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  primaryBtn: {
    backgroundColor: "#20c997",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
  },
  primaryText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  skipBtn: {
    borderColor: "#d1d5db",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    marginTop: 10,
  },
  skipText: { textAlign: "center", color: "#000", fontWeight: "bold" },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  navItem: { alignItems: "center" },
  navItemActive: {
    alignItems: "center",
    backgroundColor: "#fff7ed",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  navText: { fontSize: 10, marginTop: 2, color: "#6b7280" },
});
