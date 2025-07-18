import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/constants/useColorScheme';
import '../global.css';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="email-confirmation" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="incidents" options={{ headerShown: false }} />
        <Stack.Screen name="Califications" options={{ headerShown: false }} />
        <Stack.Screen name="Califications/ProfileScreen" options={{ headerShown: false }} />
        <Stack.Screen name="Drivers/HomeScreen" options={{ headerShown: false }} />
        <Stack.Screen name="Drivers/TripsScreen" options={{ headerShown: false }} />  
        <Stack.Screen name="Drivers/EarningsScreen" options={{ headerShown: false }} />
        <Stack.Screen name="Drivers/DocumentsScreen" options={{ headerShown: false }} />
        <Stack.Screen name="Drivers/ProfileScreen" options={{ headerShown: false }} />
        <Stack.Screen name="Drivers/SettingScreen" options={{ headerShown: false }} />  
        <Stack.Screen name="Drivers/SupportScreen" options={{ headerShown: false }} />
        <Stack.Screen name="Drivers/CustomDrawerContent" options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
