import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
// No map import for web version
import {
    AlertTriangle,
    Check,
    Circle,
    Heart,
    Home,
    Info,
    Landmark,
    Search,
    Send,
    X,
} from "lucide-react-native";

export default function SeguirRutaScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Web alternative to MapView */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapPlaceholderText}>
          Mapa no disponible en versión web
        </Text>
      </View>

      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Landmark size={20} color="#fff" style={{ marginRight: 8 }} />
          <View>
            <Text style={styles.busLine}>Ruta 32</Text>
            <Text style={styles.busStatus}>En camino</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => console.log("Info pressed")}
        >
          <Info size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Flotantes de retraso */}
      <View style={styles.delayContainer}>
        <View style={styles.delayBadge}>
          <AlertTriangle size={16} color="#fff" style={{ marginRight: 5 }} />
          <Text style={styles.delayText}>Retraso 5 min</Text>
        </View>
      </View>

      {/* Contenedor de ruta */}
      <View style={styles.routeContainer}>
        {/* Origen y Destino */}
        <View style={styles.routeHeader}>
          <View style={styles.routePoint}>
            <Circle size={12} color="#4CAF50" fill="#4CAF50" />
            <Text style={styles.routeText}>Mi ubicación</Text>
          </View>

          <View style={styles.routeDivider}></View>

          <View style={styles.routePoint}>
            <Circle size={12} color="#F44336" fill="#F44336" />
            <Text style={styles.routeText}>Mercado Central</Text>
          </View>
        </View>

        {/* Detalles de ruta */}
        <View style={styles.routeDetails}>
          <View style={styles.routeDetail}>
            <Text style={styles.routeDetailLabel}>Tiempo estimado:</Text>
            <Text style={styles.routeDetailValue}>15 min</Text>
          </View>

          <View style={styles.routeDetail}>
            <Text style={styles.routeDetailLabel}>Distancia:</Text>
            <Text style={styles.routeDetailValue}>2.5 km</Text>
          </View>

          <View style={styles.routeDetail}>
            <Text style={styles.routeDetailLabel}>Costo:</Text>
            <Text style={styles.routeDetailValue}>$15 MXN</Text>
          </View>
        </View>

        {/* Incidencias en ruta */}
        <View style={styles.incidentsSection}>
          <Text style={styles.incidentsTitle}>Incidencias en tu ruta</Text>

          <View style={styles.incident}>
            <AlertTriangle
              size={18}
              color="#F44336"
              style={{ marginRight: 10 }}
            />
            <View style={styles.incidentInfo}>
              <Text style={styles.incidentText}>
                Tráfico por obra en construcción
              </Text>
              <Text style={styles.incidentLocation}>Calle Revolución</Text>
            </View>
          </View>
        </View>

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => router.back()}
          >
            <X size={20} color="#F44336" style={{ marginRight: 5 }} />
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.confirmButton]}
            onPress={() => console.log("Confirmar")}
          >
            <Check size={20} color="#4CAF50" style={{ marginRight: 5 }} />
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de navegación */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/MobileTransportApp/search")}
        >
          <Home size={24} color="#666" />
          <Text style={styles.navLabel}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/MobileTransportApp/search")}
        >
          <Search size={24} color="#666" />
          <Text style={styles.navLabel}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.activeNav]}
          onPress={() => router.push("/MobileTransportApp/routes")}
        >
          <Send size={24} color="#0066CC" />
          <Text style={[styles.navLabel, styles.activeLabel]}>Rutas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/MobileTransportApp/favoritos")}
        >
          <Heart size={24} color="#666" />
          <Text style={styles.navLabel}>Favoritos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  mapPlaceholder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#e1e1e1",
    alignItems: "center",
    justifyContent: "center",
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,102,204,0.9)",
    borderRadius: 12,
    padding: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  busLine: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  busStatus: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },
  infoButton: {
    padding: 8,
  },
  delayContainer: {
    position: "absolute",
    top: 120,
    right: 20,
  },
  delayBadge: {
    backgroundColor: "#FF9800",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  delayText: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
  },
  routeContainer: {
    position: "absolute",
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  routeHeader: {
    marginBottom: 20,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  routeDivider: {
    width: 2,
    height: 20,
    backgroundColor: "#DDDDDD",
    marginLeft: 5,
  },
  routeText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
  routeDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F5F7FA",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  routeDetail: {
    alignItems: "center",
  },
  routeDetailLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  routeDetailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  incidentsSection: {
    borderTopWidth: 1,
    borderColor: "#EEEEEE",
    paddingTop: 15,
    marginBottom: 20,
  },
  incidentsTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  incident: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    padding: 12,
    borderRadius: 8,
  },
  incidentInfo: {
    flex: 1,
  },
  incidentText: {
    fontSize: 14,
    color: "#333",
  },
  incidentLocation: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
  },
  cancelButtonText: {
    color: "#F44336",
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  confirmButtonText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  navButton: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  activeNav: {},
  activeLabel: {
    color: "#0066CC",
  },
});
