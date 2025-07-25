import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../utils/auth.context";

export default function HomeTab() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {user.name} {user.lastName}
          </Text>
          <Text style={styles.userRole}>Rol: {user.role}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      )}
      <Text style={styles.subtitle}>¿A dónde quieres ir hoy?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#20c997',
    marginBottom: 20,
  },
  userInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    minWidth: 250,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userRole: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 12,
    color: '#999',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});