"use client"

import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useState } from "react"
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface FormData {
  firstName: string
  lastName: string
  username: string
  email: string
  confirmEmail: string
  password: string
  confirmPassword: string
}

export default function RegisterScreen() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      Alert.alert("Error", "El nombre es requerido")
      return false
    }
    if (!formData.lastName.trim()) {
      Alert.alert("Error", "El apellido es requerido")
      return false
    }
    if (!formData.username.trim()) {
      Alert.alert("Error", "El nombre de usuario es requerido")
      return false
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      Alert.alert("Error", "Ingresa un email válido")
      return false
    }
    if (formData.email !== formData.confirmEmail) {
      Alert.alert("Error", "Los emails no coinciden")
      return false
    }
    if (formData.password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden")
      return false
    }
    return true
  }

  const handleRegister = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/email-confirmation")
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la cuenta")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
                    <View style={{ marginTop: 32, marginBottom: 32, alignItems: "center" }}>
            <Text style={{ fontSize: 36, fontWeight: "bold", color: "#00D4AA", textAlign: "center" }}>RutaFácil</Text>
            <Text style={{ color: "#374151", textAlign: "center", marginTop: 8, fontSize: 20, fontWeight: "500" }}>
              Regístrate
            </Text>
          </View>

          <View style={{ gap: 16 }}>
            <View>
              <Text style={{ color: "#374151", fontWeight: "500", marginBottom: 8 }}>Nombre</Text>
              <TextInput
                style={{
                  backgroundColor: "#F3F4F6",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  color: "#111827",
                  fontSize: 16,
                }}
                placeholder="John"
                placeholderTextColor="#9CA3AF"
                value={formData.firstName}
                onChangeText={(value) => handleInputChange("firstName", value)}
                autoCapitalize="words"
              />
            </View>

                        <View>
              <Text style={{ color: "#374151", fontWeight: "500", marginBottom: 8 }}>Apellido</Text>
              <TextInput
                style={{
                  backgroundColor: "#F3F4F6",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  color: "#111827",
                  fontSize: 16,
                }}
                placeholder="Doe"
                placeholderTextColor="#9CA3AF"
                value={formData.lastName}
                onChangeText={(value) => handleInputChange("lastName", value)}
                autoCapitalize="words"
              />
            </View>
            <View>
              <Text style={{ color: "#374151", fontWeight: "500", marginBottom: 8 }}>Nombre de usuario</Text>
              <TextInput
                style={{
                  backgroundColor: "#F3F4F6",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  color: "#111827",
                  fontSize: 16,
                }}
                placeholder="johndoe43"
                placeholderTextColor="#9CA3AF"
                value={formData.username}
                onChangeText={(value) => handleInputChange("username", value)}
                autoCapitalize="none"
              />
            </View>

            {/* Email */}
            <View>
              <Text style={{ color: "#374151", fontWeight: "500", marginBottom: 8 }}>Email</Text>
              <TextInput
                style={{
                  backgroundColor: "#F3F4F6",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  color: "#111827",
                  fontSize: 16,
                }}
                placeholder="example@example.com"
                placeholderTextColor="#9CA3AF"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Confirmar Email */}
            <View>
              <Text style={{ color: "#374151", fontWeight: "500", marginBottom: 8 }}>Confirmar email</Text>
              <TextInput
                style={{
                  backgroundColor: "#F3F4F6",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  color: "#111827",
                  fontSize: 16,
                }}
                placeholder="example@example.com"
                placeholderTextColor="#9CA3AF"
                value={formData.confirmEmail}
                onChangeText={(value) => handleInputChange("confirmEmail", value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Contraseña */}
            <View>
              <Text style={{ color: "#374151", fontWeight: "500", marginBottom: 8 }}>Contraseña</Text>
              <View style={{ position: "relative" }}>
                <TextInput
                  style={{
                    backgroundColor: "#F3F4F6",
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    paddingRight: 48,
                    color: "#111827",
                    fontSize: 16,
                  }}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 16, top: 16 }}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirmar Contraseña */}
            <View>
              <Text style={{ color: "#374151", fontWeight: "500", marginBottom: 8 }}>Confirmar contraseña</Text>
              <View style={{ position: "relative" }}>
                <TextInput
                  style={{
                    backgroundColor: "#F3F4F6",
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    paddingRight: 48,
                    color: "#111827",
                    fontSize: 16,
                  }}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange("confirmPassword", value)}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 16, top: 16 }}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

                    <TouchableOpacity
            style={{
              marginTop: 32,
              borderRadius: 8,
              paddingVertical: 16,
              backgroundColor: isLoading ? "#7DD3FC" : "#00D4AA",
            }}
            onPress={handleRegister}
            disabled={isLoading}
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
              {isLoading ? "Registrando..." : "Registrarse"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
