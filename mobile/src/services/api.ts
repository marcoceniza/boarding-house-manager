import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './axios';

// API service methods
export const apiService = {
  // Authentication endpoints
  auth: {
    login: async (email: string, password: string) => {
      const response = await apiClient.post('/login', { email, password });
      return response.data;
    },

    register: async (email: string, password: string) => {
      const response = await apiClient.post('/register', {
        email,
        password,
        password_confirmation: password,
      });
      return response.data;
    },

    logout: async () => {
      const response = await apiClient.post('/logout');
      return response.data;
    },

    getCurrentUser: async () => {
      const response = await apiClient.get('/me');
      return response.data;
    },
  },

  // Dashboard endpoints
  dashboard: {
    getDashboard: async () => {
      const response = await apiClient.get('/me/dashboard');
      return response.data;
    },
  },

  // Billing endpoints
  billing: {
    getCurrentBills: async (params?: any) => {
      const response = await apiClient.get('/me/billings', { params });
      return response.data;
    },

    getBillingHistory: async (params?: any) => {
      const response = await apiClient.get('/me/billings', {
        params: { ...params, view: 'history' },
      });
      return response.data;
    },
  },

  // Token management
  token: {
    set: async (token: string) => {
      await AsyncStorage.setItem('auth_token', token);
    },

    get: async () => {
      return await AsyncStorage.getItem('auth_token');
    },

    remove: async () => {
      await AsyncStorage.removeItem('auth_token');
    },
  },
};

export default apiService;