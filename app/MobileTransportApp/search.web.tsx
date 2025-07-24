import { useRouter } from "expo-router";
import React from "react";
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
// Web version doesn't use react-native-maps
import {
    Landmark,
    MapPin,
    Search
} from "lucide-react-native";

const { width, height } = Dimensions.get("window");

export default function BuscarDestinoScreen() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

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
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buscar destino</Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="¿A dónde vas?"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Mapa web alternativo - usando un div con mensaje */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapPlaceholder}>
          Mapa no disponible en versión web
        </Text>
      </View>

      {/* Lista de destinos */}
      <ScrollView style={styles.destinationsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Destinos recientes</Text>
        </View>

        {filteredDestinos.slice(0, 3).map((destino, index) => (
          <TouchableOpacity key={index} style={styles.destinationItem}>
            <View style={styles.iconCircle}>
              <MapPin size={18} color="#4CAF50" />
            </View>
            <View style={styles.destinationText}>
              <Text style={styles.destinationName}>{destino}</Text>
              <Text style={styles.destinationAddress}>Ubicación cercana al centro</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Destinos populares</Text>
        </View>

        {filteredDestinos.slice(3, 10).map((destino, index) => (
          <TouchableOpacity key={index} style={styles.destinationItem}>
            <View style={styles.iconCircle}>
              <Landmark size={18} color="#2196F3" />
            </View>
            <View style={styles.destinationText}>
              <Text style={styles.destinationName}>{destino}</Text>
              <Text style={styles.destinationAddress}>Punto turístico de interés</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  backButton: {
    padding: 5,
  },
  backText: {
    fontSize: 24,
    color: "#333",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 15,
    color: "#333",
  },
  searchContainer: {
    padding: 15,
    backgroundColor: "white",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  mapContainer: {
    width: width,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e1e1",
  },
  mapPlaceholder: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  destinationsContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  sectionHeader: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#F5F7FA",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  destinationItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
    alignItems: "center",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  destinationText: {
    marginLeft: 12,
    flex: 1,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  destinationAddress: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
});
