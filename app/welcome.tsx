"use client"

import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function WelcomeScreen() {
  const handleLogin = () => {
    router.push("/login")
  }

  const handleRegister = () => {
    router.push("/register")
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: "center", alignItems: "center" }}>
        {/* Logo y título */}
        <View style={{ alignItems: "center", marginBottom: 64 }}>
          <View
            style={{
              width: 120,
              height: 120,
              backgroundColor: "#E0E7FF",
              borderRadius: 60,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Ionicons name="bus" size={60} color="#00D4AA" />
          </View>
          
          <Text style={{ fontSize: 42, fontWeight: "bold", color: "#00D4AA", textAlign: "center" }}>
            RutaFácil
          </Text>
          <Text 
            style={{ 
              fontSize: 18, 
              color: "#6B7280", 
              textAlign: "center", 
              marginTop: 8,
              lineHeight: 24 
            }}
          >
            Tu compañero de viaje inteligente
          </Text>
        </View>

        {/* Descripción */}
        <View style={{ marginBottom: 48 }}>
          <Text
            style={{
              fontSize: 16,
              color: "#374151",
              textAlign: "center",
              lineHeight: 24,
              paddingHorizontal: 16,
            }}
          >
            Encuentra las mejores rutas, horarios en tiempo real y mantente conectado con tu transporte público.
          </Text>
        </View>

        {/* Botones */}
        <View style={{ width: "100%", gap: 16 }}>
          {/* Botón de Iniciar Sesión */}
          <TouchableOpacity
            style={{
              width: "100%",
              borderRadius: 12,
              paddingVertical: 16,
              backgroundColor: "#00D4AA",
              elevation: 2,
              shadowColor: "#00D4AA",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
            onPress={handleLogin}
          >
            <Text
              style={{
                color: "#ffffff",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Iniciar Sesión
            </Text>
          </TouchableOpacity>

          {/* Botón de Registro */}
          <TouchableOpacity
            style={{
              width: "100%",
              borderRadius: 12,
              paddingVertical: 16,
              backgroundColor: "transparent",
              borderWidth: 2,
              borderColor: "#00D4AA",
            }}
            onPress={handleRegister}
          >
            <Text
              style={{
                color: "#00D4AA",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Crear Cuenta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
