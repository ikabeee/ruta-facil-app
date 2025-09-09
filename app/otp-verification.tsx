"use client"

import { Ionicons } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import { useRef, useState } from "react"
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../utils/auth.context"
import { AuthService } from "../utils/auth.service"
import { getWelcomeMessage, redirectToRoleBasedHome } from "../utils/navigation.helper"

export default function OtpVerificationScreen() {
  const { email } = useLocalSearchParams<{ email: string }>()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<TextInput[]>([])
  
  const { login: contextLogin } = useAuth()

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)

    // Avanzar al siguiente campo si se ingresó un dígito
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyPress = (key: string, index: number) => {
    // Retroceder al campo anterior si se presiona backspace
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("")
    
    if (otpCode.length !== 6) {
      Alert.alert("Error", "Por favor ingresa el código completo de 6 dígitos")
      return
    }

    setIsLoading(true)
    try {
      const result = await AuthService.verifyOTP({
        code: otpCode,
        email: email || undefined
      });

      if (result.success && result.data) {
        // Validate that we have both user and token before proceeding
        if (!result.data.user || !result.data.token) {
          console.error('Invalid auth data received:', result.data);
          Alert.alert("Error", "Datos de autenticación incompletos. Intenta nuevamente.");
          return;
        }

        // Usar el contexto de autenticación para guardar la sesión
        await contextLogin(result.data.user, result.data.token);
        
        console.log("Usuario autenticado:", result.data);
        
        // Mensaje de bienvenida personalizado según el rol
        const welcomeMsg = getWelcomeMessage(result.data.user.role, result.data.user.name);
        const userRole = result.data.user.role; // Guardar para usar en el callback
        
        Alert.alert(
          "¡Verificación exitosa!",
          welcomeMsg,
          [
            {
              text: "Continuar",
              onPress: () => redirectToRoleBasedHome(userRole)
            }
          ]
        );
      } else {
        Alert.alert("Error", result.error || "Código incorrecto. Intenta nuevamente");
        // Limpiar el OTP en caso de error
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error("Error en verificación OTP:", error);
      Alert.alert("Error", "Ocurrió un error inesperado. Intenta nuevamente.");
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (!email) {
      Alert.alert("Error", "No se puede reenviar el código sin el email");
      return;
    }

    setIsResending(true)
    try {
      const result = await AuthService.resendOTP(email);
      
      if (result.success) {
        Alert.alert("Código reenviado", "Hemos enviado un nuevo código a tu correo");
        // Limpiar campos OTP
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        Alert.alert("Error", result.error || "No se pudo reenviar el código");
      }
    } catch (error) {
      console.error("Error al reenviar código:", error);
      Alert.alert("Error", "No se pudo reenviar el código");
    } finally {
      setIsResending(false)
    }
  }

  const handleBackToLogin = () => {
    router.push("/login")
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: "center", alignItems: "center" }}>
        {/* Icono */}
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
          <Ionicons name="shield-checkmark" size={40} color="#3B82F6" />
        </View>

        {/* Título */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            color: "#111827",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Verificación de seguridad
        </Text>

        {/* Descripción */}
        <Text
          style={{
            fontSize: 16,
            color: "#6B7280",
            textAlign: "center",
            lineHeight: 24,
            marginBottom: 32,
          }}
        >
          Ingresa el código de 6 dígitos que enviamos a{"\n"}
          <Text style={{ fontWeight: "600", color: "#00D4AA" }}>{email}</Text>
        </Text>

        {/* Campos OTP */}
        <View 
          style={{ 
            flexDirection: "row", 
            justifyContent: "space-between", 
            marginBottom: 32,
            width: "100%",
            maxWidth: 300
          }}
        >
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref
              }}
              style={{
                width: 45,
                height: 55,
                borderWidth: 2,
                borderColor: digit ? "#00D4AA" : "#E5E7EB",
                borderRadius: 8,
                textAlign: "center",
                fontSize: 20,
                fontWeight: "600",
                color: "#111827",
                backgroundColor: digit ? "#F0FDF4" : "#F9FAFB",
              }}
              value={digit}
              onChangeText={(value) => handleOtpChange(value.replace(/[^0-9]/g, ""), index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Botón de verificar */}
        <TouchableOpacity
          style={{
            width: "100%",
            borderRadius: 8,
            paddingVertical: 16,
            backgroundColor: isLoading ? "#7DD3FC" : "#00D4AA",
            marginBottom: 16,
          }}
          onPress={handleVerifyOtp}
          disabled={isLoading}
        >
          <Text
            style={{
              color: "#ffffff",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {isLoading ? "Verificando..." : "Verificar código"}
          </Text>
        </TouchableOpacity>

        {/* Reenviar código */}
        <TouchableOpacity
          onPress={handleResendCode}
          disabled={isResending}
          style={{ marginBottom: 16 }}
        >
          <Text
            style={{
              color: isResending ? "#9CA3AF" : "#00D4AA",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {isResending ? "Reenviando..." : "Reenviar código"}
          </Text>
        </TouchableOpacity>

        {/* Volver al login */}
        <TouchableOpacity onPress={handleBackToLogin}>
          <Text
            style={{
              color: "#6B7280",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Volver al inicio de sesión
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
