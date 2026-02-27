import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';
import { useRoomStore } from './RoomStore';

export const useTenantStore = defineStore('tenant', () => {
  const tenants = ref([]);
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
  const selectedTenant = ref(null);
  const roomStore = useRoomStore();
  const isEndTenancyLoading = ref(false);
  const getOccupied = ref('');

  /* =======================
    Fetch all tenants
  ======================= */
  const index = async () => {
    try {
      isListLoading.value = true;
      const res = await api.get('/api/tenants');
      tenants.value = res.data.result;
    } catch (error) {
      console.error(error);
    } finally {
      isListLoading.value = false;
    }
  }

  /* =======================
    Create tenant
  ======================= */
  const store = async (data) => {
    try {
      isFormLoading.value = true;

      const res = await api.post('/api/tenants', data);
      tenants.value.unshift(res.data.result);
      toastStore.success(res.data.message);
      await roomStore.index();

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
    View single tenant
  ======================= */
  const show = async (id, occupied) => {
    try {
      isViewLoading.value = true;
      const res = await api.get(`/api/tenants/${id}`);
      viewData.value = res.data.result;
      getOccupied.value = occupied;
    } catch (error) {
      console.error(error);
    } finally {
      isViewLoading.value = false;
    }
  }

  /* =======================
    Update tenant
  ======================= */
  const update = async (id, data) => {
    try {
      isFormLoading.value = true;

      const res = await api.put(`/api/tenants/${id}`, data);

      // sync local list
      const index = tenants.value.findIndex(r => r.id === id);
      if (index !== -1) {
        tenants.value[index] = res.data.result;
      }

      viewData.value = res.data.result;
      await roomStore.index();
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
    Delete tenant
  ======================= */
  const destroy = async (id) => {
    try {
      isDeleteLoading.value = true;
      const res = await api.delete(`/api/tenants/${id}`);
      toastStore.success(res.data.message);
      tenants.value = tenants.value.filter(r => r.id !== id);
      await roomStore.index();
    } catch (error) {
      console.error(error);
    } finally {
      isDeleteLoading.value = false;
    }
  }

  /* =======================
    End tenancy
  ======================= */
  const endTenancy = async (id) => {
    try {
      isEndTenancyLoading.value = true;

      const res = await api.post(`/api/tenants/${id}/end-tenancy`);

      toastStore.success(res.data.message);

      // 🔄 Update tenant locally instead of removing
      const index = tenants.value.findIndex(t => t.id === id);
      if (index !== -1) {
        tenants.value[index] = res.data.result;
      }

      // 🔄 Refresh rooms (since availability changed)
      await roomStore.index();

    } catch (error) {
      console.error(error);
      toastStore.error('Failed to end tenancy');
    } finally {
      isEndTenancyLoading.value = false;
    }
  };

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
    tenants,
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
    selectedTenant,
    isListLoading,
    isViewLoading,
    isFormLoading,
    destroy,
    isOpenDeleteModal,
    isDeleteLoading,
    endTenancy,
    isEndTenancyLoading,
    getOccupied
  }
})