import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(false);
  const router = useRouter();
  
  const authentication = async (url, data) => {
    try {
      isLoading.value = true;
      const res = await axios.post(`/api/${url}`, data);

      if(url === 'login') {
        router.push('/dashboard');
        localStorage.setItem('token', res.data.access_token);
      }else {
        router.push('/login');
      }
    }catch(error) {
      console.error(error)
    }
  }

  return { authentication }
})
