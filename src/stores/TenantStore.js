import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/lib/axios';

export const useTenantStore = defineStore('tenant', () => {
  const tenants = ref([]);
  const viewData = ref(null);
  const isLoading = ref(false);

  /* =======================
    Fetch all tenants
  ======================= */
  const index = async () => {
    try {
      isLoading.value = true;
      const res = await api.get('/api/tenants');
      tenants.value = res.data.result;

      console.log(tenants.value);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  /* =======================
    Create tenant
  ======================= */
  const store = async (data) => {
    try {
      const res = await api.post('/api/tenants', data);
      tenants.value.unshift(res.data.result); // optional instant UI update
    } catch (error) {
      console.error(error);
    }
  }

  /* =======================
    View single tenant
  ======================= */
  const show = async (id) => {
    try {
      isLoading.value = true;
      const res = await api.get(`/api/tenants/${id}`);
      viewData.value = res.data.result;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  /* =======================
    Update tenant
  ======================= */
  const update = async (id, data) => {
    try {
      const res = await api.put(`/api/tenants/${id}`, data);

      // sync local list
      const index = tenants.value.findIndex(r => r.id === id);
      if (index !== -1) {
        tenants.value[index] = res.data.result;
      }

      viewData.value = res.data.result;
    } catch (error) {
      console.error(error);
    }
  }

  /* =======================
    Clear modal state
  ======================= */
  const clearViewData = () => {
    viewData.value = null;
  }

  // auto fetch
  index()

  return {
    tenants,
    viewData,
    isLoading,
    index,
    store,
    show,
    update,
    clearViewData
  }
})