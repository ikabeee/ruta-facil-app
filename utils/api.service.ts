// utils/api.service.ts
import * as ExpoLocation from 'expo-location';

// Configuración de la API
const API_BASE_URL = 'http://192.168.1.74:7000';

export interface Location {
  id?: number;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state?: string;
  country: string;
  timestamp?: string;
  note?: string;
}

export interface Route {
  id: number;
  code?: string;
  name: string;
  img?: string;
  firstPoint: string;
  lastPoint: string;
  description?: string;
  distance?: number;
  estimatedTime?: number;
  totalStops: number;
  assignedUnits: number;
  dailyTrips: number;
  operatingHours?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface StarredRoute {
  id: number;
  name: string;
  description?: string;
  routeId: number;
  userId: number;
  createdAt: string;
  routes: Route;
}

export interface FavoriteToggleResponse {
  action: 'added' | 'removed';
  starredRoute?: StarredRoute;
  routeId: number;
  userId: number;
}

export interface Incident {
  id: number;
  type?: string;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  location?: string;
  unit?: string;
  reportedBy?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CANCELLED';
  createdAt: string;
  updatedAt?: string;
  routeId: number;
  route: {
    id: number;
    name: string;
    code?: string;
    firstPoint: string;
    lastPoint: string;
    description?: string;
  };
}

export interface IncidentStats {
  total: number;
  byStatus: {
    pending: number;
    inProgress: number;
    resolved: number;
    cancelled: number;
  };
  byPriority: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  active: number;
}

export interface Stop {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  facilities?: string;
  accessibility?: string;
  order: number;
}

export interface Vehicle {
  id: string;
  routeId: number;
  unitNumber: string;
  latitude: number;
  longitude: number;
  heading: number;
  speed: number;
  passengers: number;
  capacity: number;
  status: string;
  lastUpdate: string;
  nextStop: {
    latitude: number;
    longitude: number;
    stopName: string;
    order: number;
  };
  estimatedArrival: string;
  routeProgress: number;
}

export interface RouteCoordinate {
  latitude: number;
  longitude: number;
  stopName: string;
  order: number;
}

export interface RouteTracking {
  route: {
    id: number;
    name: string;
    code?: string;
    description?: string;
    firstPoint: string;
    lastPoint: string;
    estimatedTime?: number;
    distance?: number;
    operatingHours?: string;
    status: string;
  };
  stops: Stop[];
  routeCoordinates: RouteCoordinate[];
  vehicles: Vehicle[];
  totalStops: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Método genérico para hacer peticiones
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      console.log(`🌐 [API] Making request to: ${url}`);

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ [API] Response received:`, data);
      return data;
    } catch (error) {
      console.error(`❌ [API] Error in ${endpoint}:`, error);
      throw error;
    }
  }

  // Obtener ubicación actual del dispositivo
  async getCurrentLocation(): Promise<Location> {
    try {
      console.log('📍 [LOCATION] Obteniendo ubicación del dispositivo...');
      
      // Obtener la ubicación real del dispositivo
      const realLocation = await this.getUserRealLocation();
      
      if (realLocation) {
        // Obtener información de dirección
        const address = await this.getAddressFromCoords(realLocation.latitude, realLocation.longitude);
        const geoInfo = await this.getLocationInfo(realLocation.latitude, realLocation.longitude);
        
        // Convertir coordenadas a ubicación legible
        const locationData: Location = {
          id: Date.now(),
          latitude: realLocation.latitude,
          longitude: realLocation.longitude,
          address: address,
          city: geoInfo.city || "Huauchinango",
          state: geoInfo.state || "Puebla",
          country: geoInfo.country || "México",
          timestamp: new Date().toISOString()
        };
        
        console.log(`✅ [LOCATION] Ubicación obtenida: ${locationData.address}`);
        return locationData;
      } else {
        // Ubicación por defecto si no se puede obtener la real
        console.log('⚠️ [LOCATION] Usando ubicación por defecto');
        return {
          id: 1,
          latitude: 20.1812635,
          longitude: -98.0450254,
          address: "Centro de Huauchinango, Puebla, México",
          city: "Huauchinango",
          state: "Puebla",
          country: "México",
          timestamp: new Date().toISOString(),
          note: "Ubicación por defecto - No se pudieron obtener coordenadas del dispositivo"
        };
      }
    } catch (error) {
      console.error('❌ [LOCATION] Error getting location:', error);
      // Ubicación por defecto en caso de error
      return {
        id: 1,
        latitude: 20.1812635,
        longitude: -98.0450254,
        address: "Centro de Huauchinango, Puebla, México",
        city: "Huauchinango",
        state: "Puebla",
        country: "México",
        timestamp: new Date().toISOString(),
        note: "Ubicación por defecto - Error al obtener coordenadas"
      };
    }
  }

  // Obtener la ubicación real del dispositivo usando Expo Location
  private async getUserRealLocation(): Promise<{ latitude: number; longitude: number } | null> {
    try {
      console.log('📍 [LOCATION] Requesting location permissions...');
      
      // Solicitar permisos de ubicación
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.warn('⚠️ [LOCATION] Permission to access location was denied');
        return null;
      }

      console.log('📍 [LOCATION] Getting current position...');
      
      // Obtener ubicación actual
      let location = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.High,
        timeInterval: 10000,
        distanceInterval: 1,
      });

      const { latitude, longitude } = location.coords;
      console.log(`✅ [LOCATION] Location obtained: ${latitude}, ${longitude}`);
      
      return { latitude, longitude };
    } catch (error) {
      console.error('❌ [LOCATION] Error getting location:', error);
      return null;
    }
  }

  // Obtener información de ubicación (ciudad, estado, país) usando Expo Location
  private async getLocationInfo(latitude: number, longitude: number): Promise<{city?: string, state?: string, country?: string}> {
    try {
      const reverseGeocode = await ExpoLocation.reverseGeocodeAsync({
        latitude,
        longitude
      });

      if (reverseGeocode && reverseGeocode.length > 0) {
        const location = reverseGeocode[0];
        return {
          city: location.city || location.subregion || undefined,
          state: location.region || undefined,
          country: location.country || undefined
        };
      }
      
      return {};
    } catch (error) {
      console.error('❌ [LOCATION] Error getting location info:', error);
      return {};
    }
  }

  // Convertir coordenadas a dirección legible usando Expo Location
  private async getAddressFromCoords(latitude: number, longitude: number): Promise<string> {
    try {
      console.log(`📍 [LOCATION] Converting coordinates to address: ${latitude}, ${longitude}`);
      
      const reverseGeocode = await ExpoLocation.reverseGeocodeAsync({
        latitude,
        longitude
      });

      if (reverseGeocode && reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        
        // Construir dirección más específica
        const addressParts = [];
        
        if (address.streetNumber) addressParts.push(address.streetNumber);
        if (address.street) addressParts.push(address.street);
        if (address.district) addressParts.push(address.district);
        
        const formattedAddress = addressParts.length > 0 
          ? addressParts.join(' ') 
          : `${address.city || 'Huauchinango'}, ${address.region || 'Puebla'}`;
        
        console.log(`✅ [LOCATION] Address obtained: ${formattedAddress}`);
        return formattedAddress;
      } else {
        console.log('⚠️ [LOCATION] No address found, using default');
        return "Ubicación actual";
      }
    } catch (error) {
      console.error('❌ [LOCATION] Error converting coordinates to address:', error);
      return "Ubicación actual";
    }
  }

  // Obtener todas las rutas
  async getAllRoutes(): Promise<Route[]> {
    const response = await this.makeRequest<Route[]>('/api/v1/public/routes');
    return response.data;
  }

  // Obtener rutas cercanas basadas en ubicación
  async getNearbyRoutes(latitude: number, longitude: number, radius: number = 5): Promise<Route[]> {
    const response = await this.makeRequest<Route[]>(
      `/api/v1/public/routes/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
    );
    return response.data;
  }

  // Buscar rutas por nombre
  async searchRoutes(query: string): Promise<Route[]> {
    const response = await this.makeRequest<Route[]>(
      `/api/v1/public/routes/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  }

  // Obtener una ruta por ID
  async getRouteById(id: number): Promise<Route> {
    const response = await this.makeRequest<Route>(`/api/v1/public/routes/${id}`);
    return response.data;
  }

  // === MÉTODOS DE FAVORITOS ===

  // Obtener rutas favoritas por usuario
  async getFavoriteRoutes(userId: number): Promise<StarredRoute[]> {
    const response = await this.makeRequest<StarredRoute[]>(`/api/v1/public/starred-routes/user/${userId}`);
    return response.data;
  }

  // Verificar si una ruta es favorita
  async checkIsFavorite(userId: number, routeId: number): Promise<boolean> {
    try {
      const response = await this.makeRequest<{isFavorite: boolean, starredRoute: StarredRoute | null}>(`/api/v1/public/starred-routes/check/${userId}/${routeId}`);
      return response.data.isFavorite;
    } catch (error) {
      console.error('❌ [FAVORITES] Error checking favorite:', error);
      return false;
    }
  }

  // Agregar/quitar de favoritos (toggle)
  async toggleFavorite(userId: number, routeId: number, name?: string): Promise<FavoriteToggleResponse> {
    const response = await this.makeRequest<FavoriteToggleResponse>('/api/v1/public/starred-routes/toggle', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        routeId,
        name: name || 'Mi ruta favorita'
      })
    });
    return response.data;
  }

  // Eliminar favorito por ID
  async removeFavorite(id: number): Promise<void> {
    await this.makeRequest<void>(`/api/v1/public/starred-routes/${id}`, {
      method: 'DELETE'
    });
  }

  // === MÉTODOS DE INCIDENTES ===

  // Obtener todos los incidentes
  async getAllIncidents(): Promise<Incident[]> {
    const response = await this.makeRequest<Incident[]>('/api/v1/public/incidents');
    return response.data;
  }

  // Obtener incidentes activos (PENDING e IN_PROGRESS)
  async getActiveIncidents(): Promise<Incident[]> {
    const response = await this.makeRequest<Incident[]>('/api/v1/public/incidents/active');
    return response.data;
  }

  // Obtener incidentes por ruta
  async getIncidentsByRoute(routeId: number): Promise<Incident[]> {
    const response = await this.makeRequest<Incident[]>(`/api/v1/public/incidents/route/${routeId}`);
    return response.data;
  }

  // Obtener incidentes por prioridad
  async getIncidentsByPriority(priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'): Promise<Incident[]> {
    const response = await this.makeRequest<Incident[]>(`/api/v1/public/incidents/priority/${priority}`);
    return response.data;
  }

  // Obtener estadísticas de incidentes
  async getIncidentStats(): Promise<IncidentStats> {
    const response = await this.makeRequest<IncidentStats>('/api/v1/public/incidents/stats');
    return response.data;
  }

  // Obtener un incidente por ID
  async getIncidentById(id: number): Promise<Incident> {
    const response = await this.makeRequest<Incident>(`/api/v1/public/incidents/${id}`);
    return response.data;
  }

  // === MÉTODOS DE SEGUIMIENTO DE RUTAS ===

  // Obtener información completa de seguimiento de una ruta
  async getRouteTracking(routeId: number): Promise<RouteTracking> {
    const response = await this.makeRequest<RouteTracking>(`/api/v1/public/route-tracking/${routeId}`);
    return response.data;
  }

  // Obtener posición de vehículos en una ruta
  async getRouteVehicles(routeId: number): Promise<Vehicle[]> {
    const response = await this.makeRequest<Vehicle[]>(`/api/v1/public/route-tracking/${routeId}/vehicles`);
    return response.data;
  }

  // Obtener paradas de una ruta con estimaciones
  async getRouteStopsWithEstimations(routeId: number): Promise<Stop[]> {
    const response = await this.makeRequest<Stop[]>(`/api/v1/public/route-tracking/${routeId}/stops`);
    return response.data;
  }

  // === MÉTODOS DE TRACKING EN TIEMPO REAL (LEGACY) ===

  // Iniciar seguimiento de una ruta
  async startRouteTracking(routeId: number | string): Promise<ApiResponse<any>> {
    const response = await this.makeRequest<any>(`/api/v1/public/tracking/routes/${routeId}/start`);
    return response;
  }

  // Obtener ubicación actual del autobús
  async getBusLocation(routeId: number | string): Promise<ApiResponse<any>> {
    const response = await this.makeRequest<any>(`/api/v1/public/tracking/routes/${routeId}/location`);
    return response;
  }

  // Detener seguimiento de una ruta
  async stopRouteTracking(routeId: number | string): Promise<ApiResponse<any>> {
    const response = await this.makeRequest<any>(`/api/v1/public/tracking/routes/${routeId}/stop`);
    return response;
  }

  // Obtener todas las rutas con seguimiento activo
  async getActiveTrackingRoutes(): Promise<ApiResponse<any>> {
    const response = await this.makeRequest<any>('/api/v1/public/tracking/active');
    return response;
  }
}

export const apiService = new ApiService();
