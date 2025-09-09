// config/api.ts

// Para desarrollo móvil con Expo, necesitamos usar la IP de tu computadora
// En lugar de localhost, usar la IP interna de tu red

// Configuración para tu entorno de desarrollo:
const API_BASE_URL = 'http://192.168.1.74:7000/api/v1'; // IP local de tu computadora

// Otras opciones según el tipo de dispositivo:
// const API_BASE_URL = 'http://10.0.2.2:7000/api/v1';     // Para emulador Android (mapea a localhost del host)
// const API_BASE_URL = 'http://localhost:7000/api/v1';    // Para web/simulador iOS
// const API_BASE_URL = 'http://127.0.0.1:7000/api/v1';    // Alternativa para simulador iOS

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    VERIFY_2FA: `${API_BASE_URL}/auth/verify-2fa`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
    RESEND_VERIFICATION: `${API_BASE_URL}/auth/resend-verification`,
    RESEND_OTP: `${API_BASE_URL}/auth/resend-otp`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    CURRENT_USER: `${API_BASE_URL}/auth/me`,
  },
  // Otros endpoints pueden ir aquí
};

export default API_ENDPOINTS;
