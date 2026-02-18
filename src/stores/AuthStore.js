import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToastStore } from './toastStore';

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(false);
  const router = useRouter();
  const loginErrors = ref({});
  const registerErrors = ref({});
  const toastStore = useToastStore();
  
  const authentication = async (url, data) => {
    if (url === 'login') loginErrors.value = {};
    if (url === 'register') registerErrors.value = {};

    try {
      isLoading.value = true;
      const res = await axios.post(`/api/${url}`, data);

      if(url === 'login') {
        router.push('/dashboard');
        localStorage.setItem('token', res.data.token);
      }else {
        router.push('/login');
      }

      toastStore.success(res.data.message);

      return true;
    }catch(error) {
      if (error.response?.status === 422) {
        if (url === 'login') loginErrors.value = error.response.data.errors;
        if (url === 'register') registerErrors.value = error.response.data.errors;
      }

      if (error.response?.status === 401) {
        toastStore.error(error.response.data.message);
      }

      return false;
    }finally {
      isLoading.value = false;
    }
  }

  return { authentication, loginErrors, registerErrors, isLoading }
})
