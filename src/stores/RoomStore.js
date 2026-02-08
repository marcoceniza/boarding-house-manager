import { onMounted, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useRoomStore = defineStore('room', () => {
  const isLoading = ref(false);
  const router = useRouter()
  
  const index = async () => {
    const res = await axios.get('/api/rooms', {
      
    });

    console.log(res.data)
  }

  return { index }
})
