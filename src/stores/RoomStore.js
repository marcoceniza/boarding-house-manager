import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

export const useRoomStore = defineStore('room', () => {
  const rooms = ref([]);
  const viewData = ref(null);
  const isLoading = ref(false);
  const isRoomLoading = ref(false);
  const toastStore = useToastStore();
  const errors = ref({});

  /* =======================
    Fetch all rooms
  ======================= */
  const index = async () => {
    try {
      isLoading.value = true;
      isRoomLoading.value = true;
      const res = await api.get('/api/rooms');
      rooms.value = res.data.result;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
      isRoomLoading.value = false;
    }
  }

  /* =======================
    Create room
  ======================= */
  const store = async (data) => {
    try {
      isLoading.value = true;

      const res = await api.post('/api/rooms', data);
      rooms.value.unshift(res.data.result);
      toastStore.success(res.data.message);

      return true;
    } catch (error) {

      if (error.response?.status === 422) {
          errors.value = error.response.data.errors;
      } else {
          toastStore.error("Something went wrong");
      }

      return false;
    } finally {
      isLoading.value = false;
    }
  }

  /* =======================
    View single room
  ======================= */
  const show = async (id) => {
    try {
      isLoading.value = true;
      const res = await api.get(`/api/rooms/${id}`);
      viewData.value = res.data.result;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  /* =======================
    Update room
  ======================= */
  const update = async (id, data) => {
    try {
      isLoading.value = true;

      const res = await api.put(`/api/rooms/${id}`, data);

      // sync local list
      const index = rooms.value.findIndex(r => r.id === id);
      if (index !== -1) {
        rooms.value[index] = res.data.result;
      }

      viewData.value = res.data.result;
      toastStore.success(res.data.message);

      return true;
    } catch (error) {

      if (error.response?.status === 422) {
          errors.value = error.response.data.errors;
      } else {
          toastStore.error("Something went wrong");
      }

      return false;
    } finally {
      isLoading.value = false;
    }
  }

  /* =======================
    Clear modal state
  ======================= */
  const clearViewData = () => {
    viewData.value = null;
  }

  /* =======================
    Clear errors state
  ======================= */
  const clearErrors = () => {
    errors.value = {}
  }

  index();

  return {
    rooms,
    viewData,
    isLoading,
    index,
    store,
    show,
    update,
    clearViewData,
    isRoomLoading,
    errors,
    clearErrors
  }
})