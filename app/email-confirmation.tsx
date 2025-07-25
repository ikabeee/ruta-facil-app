"use client"

import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useState } from "react"
import { Alert, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface EmailConfirmationProps {
  email?: string
}

export default function EmailConfirmationScreen({ email }: EmailConfirmationProps) {
  const [isResending, setIsResending] = useState(false)

  const handleResendEmail = async () => {
    setIsResending(true)
    try {

      await new Promise((resolve) => setTimeout(resolve, 2000))
      Alert.alert("Correo reenviado", "Hemos enviado un nuevo correo de confirmación")
    } catch {
      Alert.alert("Error", "No se pudo reenviar el correo")
    } finally {
      setIsResending(false)
    }
  }

  const handleBackToLogin = () => {
    router.push("/login")
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#E0E7FF",
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Ionicons name="mail" size={40} color="#3B82F6" />
        </View>

                <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#374151",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          ¡Te enviamos un correo de confirmación!
        </Text>

        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 16,
              color: "#6B7280",
              textAlign: "center",
              lineHeight: 24,
              marginBottom: 12,
            }}
          >
            Revisa tu bandeja de entrada y haz clic en el enlace para verificar tu cuenta.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#9CA3AF",
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            Si no lo encuentras, revisa la carpeta de spam.
          </Text>
        </View>

                <TouchableOpacity
          style={{
            width: "100%",
            borderRadius: 8,
            paddingVertical: 16,
            backgroundColor: isResending ? "#7DD3FC" : "#00D4AA",
            marginBottom: 16,
          }}
          onPress={handleResendEmail}
          disabled={isResending}
        >
          <Text
            style={{
              color: "#ffffff",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {isResending ? "Reenviando..." : "Reenviar correo"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBackToLogin}>
          <Text
            style={{
              color: "#00D4AA",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Volver al inicio de sesión
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
