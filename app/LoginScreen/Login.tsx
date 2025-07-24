import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Chrome } from "lucide-react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Título */}
        <Text style={styles.title}>Aplicación de transporte</Text>
        <Text style={styles.subtitle}>
          ¡Bienvenido de nuevo! Por favor, inicia sesión en tu cuenta.
        </Text>

        {/* Input email */}
        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#9ca3af"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* Input password */}
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* Recuperar contraseña */}
        <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 6 }}>
          <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {/* Botón Iniciar sesión */}
        <TouchableOpacity style={{ width: "100%", marginTop: 16 }}>
          <LinearGradient
            colors={["#14b8a6", "#3b82f6"]}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.loginButton}
          >
            <Text style={styles.loginText}>Iniciar sesión</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Registro */}
        <Text style={styles.registerText}>
          ¿No tienes una cuenta? <Text style={styles.link}>Registrarse</Text>
        </Text>

        {/* Línea divisoria */}
        <View style={styles.divider} />

        {/* Botón de Google */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Chrome size={18} color="#000" style={{ marginRight: 6 }} />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  innerContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 14,
    color: "#111827",
  },
  link: {
    color: "#059669",
    fontSize: 13,
  },
  loginButton: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  registerText: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 13,
    color: "#374151",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 4,
  },
  socialText: {
    fontSize: 14,
    color: "#111827",
  },
});
