import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useToastStore } from './toastStore';
import api from '@/lib/axios';

export const useAuthStore = defineStore('auth', () => {

  const isLoading = ref(false);
  const router = useRouter();
  const loginErrors = ref({});
  const registerErrors = ref({});
  const toastStore = useToastStore();
  const user = ref(null);

  const fetchUser = async () => {
    try {
      const res = await api.get('/api/user');
      user.value = res.data;
    } catch {
      user.value = null;
    }
  };

  const authentication = async (url, data) => {

    if (url === 'login') loginErrors.value = {};
    if (url === 'register') registerErrors.value = {};

    try {

      isLoading.value = true;

      // REQUIRED for Laravel Sanctum cookie auth
      if (url === 'login') {
        await api.get('/sanctum/csrf-cookie');
      }

      const res = await api.post(`/api/${url}`, data);

      if (url === 'login') {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }

      toastStore.success(res.data.message);

      return true;

    } catch (error) {

      if (error.response?.status === 422) {
        if (url === 'login') loginErrors.value = error.response.data.errors;
        if (url === 'register') registerErrors.value = error.response.data.errors;
      }

      if (error.response?.status === 401) {
        toastStore.error(error.response.data.message);
      }

      return false;

    } finally {
      isLoading.value = false;
    }
  }

  const logout = async () => {
    try {
      await api.post('/api/logout');
    } catch (error) {
      console.error("Logout failed, but clearing local state anyway", error);
    } finally {
      user.value = null;
      router.push('/login');
      isLoading.value = false;
    }
  }

  return {
    authentication,
    loginErrors,
    registerErrors,
    isLoading,
    fetchUser,
    user,
    logout
  };
});