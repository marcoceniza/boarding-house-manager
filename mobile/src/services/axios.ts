import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, type AxiosInstance } from 'axios';

// API base URL - replace with your actual API endpoint
// const API_BASE_URL = 'http://192.168.254.123:8001/api/v1';
const API_BASE_URL = 'https://hop-cant-grain-administrator.trycloudflare.com/api/v1';

// Create axios instance with default configuration
const apiClient: AxiosInstance = create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config: any) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${token}`,
        };
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh and errors
apiClient.interceptors.response.use(
  (response: any) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Implement token refresh logic here if needed
        // For now, just reject with the error
        await AsyncStorage.removeItem('auth_token');
        return Promise.reject(error);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;