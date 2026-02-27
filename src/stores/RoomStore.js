import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';

export const useRoomStore = defineStore('room', () => {
  const rooms = ref([]);
  const viewData = ref(null);
  const isListLoading = ref(false);
  const isFormLoading = ref(false);
  const isViewLoading = ref(false);
  const isDeleteLoading = ref(false);
  const toastStore = useToastStore();
  const errors = ref({});
  const isOpenModal = ref(false);
  const isOpenDeleteModal = ref(false);
  const currentMode = ref("Add");
  const selectedRoom = ref(null);

  /* =======================
    Fetch all rooms
  ======================= */
  const index = async () => {
    try {
      isListLoading.value = true;
      const res = await api.get('/rooms');
      rooms.value = res.data.result;
    } catch (error) {
      console.error(error);
    } finally {
      isListLoading.value = false;
    }
  }

  /* =======================
    Create room
  ======================= */
  const store = async (data) => {
    try {
      isFormLoading.value = true;

      const res = await api.post('/rooms', data);
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
      isFormLoading.value = false;
    }
  }

  /* =======================
    View single room
  ======================= */
  const show = async (id) => {
    try {
      isViewLoading.value = true;
      const res = await api.get(`/rooms/${id}`);
      viewData.value = res.data.result;
    } catch (error) {
      console.error(error);
    } finally {
      isViewLoading.value = false;
    }
  }

  /* =======================
    Update room
  ======================= */
  const update = async (id, data) => {
    try {
      isFormLoading.value = true;

      const res = await api.put(`/rooms/${id}`, data);

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
      isFormLoading.value = false;
    }
  }

  /* =======================
    Delete room
  ======================= */
  const destroy = async (id) => {
    try {
      isDeleteLoading.value = true;
      const res = await api.delete(`/rooms/${id}`);
      toastStore.success(res.data.message);
      rooms.value = rooms.value.filter(r => r.id !== id);
    } catch (error) {
      console.error(error);
    } finally {
      isDeleteLoading.value = false;
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
    index,
    store,
    show,
    update,
    clearViewData,
    errors,
    clearErrors,
    isOpenModal,
    currentMode,
    selectedRoom,
    isListLoading,
    isViewLoading,
    isFormLoading,
    destroy,
    isOpenDeleteModal,
    isDeleteLoading
  }
})