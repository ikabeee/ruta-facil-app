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
import { useAuth } from "../utils/auth.context"
import { AuthService } from "../utils/auth.service"
import { getWelcomeMessage, redirectToRoleBasedHome } from "../utils/navigation.helper"

interface LoginFormData {
  email: string
  password: string
}

export default function LoginScreen() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  
  const { login: contextLogin } = useAuth()

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = (): boolean => {
    if (!formData.email.trim() || !formData.email.includes("@")) {
      Alert.alert("Error", "Ingresa un email válido")
      return false
    }
    if (!formData.password.trim()) {
      Alert.alert("Error", "La contraseña es requerida")
      return false
    }
    return true
  }

  const handleLogin = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const result = await AuthService.login(formData);
      
      if (result.success) {
        // Login exitoso directo (no debería ocurrir con OTP habilitado)
        if (result.data && result.data.user && result.data.token) {
          // Validate that we have both user and token before proceeding
          await contextLogin(result.data.user, result.data.token);
          
          // Redirigir basado en el rol del usuario
          const welcomeMsg = getWelcomeMessage(result.data.user.role, result.data.user.name);
          Alert.alert(
            "¡Bienvenido!",
            welcomeMsg,
            [
              {
                text: "Continuar",
                onPress: () => redirectToRoleBasedHome(result.data.user.role)
              }
            ]
          );
        } else {
          console.error('Login success but missing user data or token:', result.data);
          Alert.alert("Error", "Datos de autenticación incompletos. Intenta nuevamente.");
        }
      } else if (result.requiresOTP) {
        // Requiere verificación OTP
        Alert.alert(
          "Verificación requerida",
          "Te hemos enviado un código de verificación de 6 dígitos a tu correo electrónico. Por favor, revisa tu bandeja de entrada.",
          [
            {
              text: "OK",
              onPress: () => router.push({
                pathname: "/otp-verification",
                params: { email: result.email || formData.email }
              })
            }
          ]
        );
      } else {
        // Error en las credenciales o verificación de email requerida
        if (result.error?.includes('verificar tu correo electrónico') || 
            result.error?.includes('verificación de email')) {
          Alert.alert(
            "Verificación de email requerida",
            result.error,
            [
              {
                text: "Reenviar email",
                onPress: async () => {
                  try {
                    const resendResult = await AuthService.resendOTP(formData.email);
                    if (resendResult.success) {
                      Alert.alert("Email enviado", "Hemos reenviado el correo de verificación");
                    } else {
                      Alert.alert("Error", resendResult.error || "No se pudo reenviar el correo de verificación");
                    }
                  } catch (resendError) {
                    console.error("Error reenviando:", resendError);
                    Alert.alert("Error", "No se pudo reenviar el correo de verificación");
                  }
                }
              },
              {
                text: "OK",
                style: "cancel"
              }
            ]
          );
        } else {
          Alert.alert("Error", result.error || "Credenciales incorrectas");
        }
      }
    } catch (error) {
      console.error("Error en login:", error);
      Alert.alert("Error", "Ocurrió un error inesperado. Intenta nuevamente.");
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    // TODO: Crear pantalla de forgot password
    Alert.alert("Funcionalidad no disponible", "Esta función estará disponible próximamente")
  }

  const handleGoToRegister = () => {
    router.push("/register")
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Header */}
          <View style={{ marginTop: 40, marginBottom: 40, alignItems: "center" }}>
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: "#E0E7FF",
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Ionicons name="bus" size={40} color="#00D4AA" />
            </View>
            
            <Text style={{ fontSize: 36, fontWeight: "bold", color: "#00D4AA", textAlign: "center" }}>
              RutaFácil
            </Text>
            <Text style={{ color: "#374151", textAlign: "center", marginTop: 8, fontSize: 20, fontWeight: "500" }}>
              Iniciar Sesión
            </Text>
          </View>

          {/* Formulario */}
          <View style={{ gap: 20 }}>
            {/* Email */}
            <View>
              <Text style={{ color: "#374151", fontWeight: "500", marginBottom: 8 }}>
                Correo electrónico
              </Text>
              <TextInput
                style={{
                  backgroundColor: "#F3F4F6",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  color: "#111827",
                  fontSize: 16,
                }}
                placeholder="ejemplo@correo.com"
                placeholderTextColor="#9CA3AF"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Contraseña */}
            <View>
              <Text style={{ color: "#374151", fontWeight: "500", marginBottom: 8 }}>
                Contraseña
              </Text>
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

            {/* Recordarme y Olvidé contraseña */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: rememberMe ? "#00D4AA" : "#D1D5DB",
                    backgroundColor: rememberMe ? "#00D4AA" : "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 8,
                  }}
                >
                  {rememberMe && <Ionicons name="checkmark" size={12} color="#ffffff" />}
                </View>
                <Text style={{ color: "#374151", fontSize: 14 }}>Recordarme</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={{ color: "#00D4AA", fontSize: 14, fontWeight: "500" }}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Botón de Login */}
          <TouchableOpacity
            style={{
              marginTop: 32,
              borderRadius: 8,
              paddingVertical: 16,
              backgroundColor: isLoading ? "#7DD3FC" : "#00D4AA",
            }}
            onPress={handleLogin}
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
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Text>
          </TouchableOpacity>

          {/* Enlace a registro */}
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#6B7280", fontSize: 16 }}>
              ¿No tienes una cuenta?{" "}
            </Text>
            <TouchableOpacity onPress={handleGoToRegister} style={{ marginTop: 4 }}>
              <Text style={{ color: "#00D4AA", fontSize: 16, fontWeight: "500" }}>
                Regístrate aquí
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
