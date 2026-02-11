import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/lib/axios';

export const useBillingStore = defineStore('billing', () => {
  const billings = ref([]);
  const viewData = ref(null);
  const isLoading = ref(false);

  /* =======================
    Fetch all billings
  ======================= */
  const index = async () => {
    try {
      isLoading.value = true;
      const res = await api.get('/api/billings');
      billings.value = res.data.result;

      console.log(billings.value);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  /* =======================
    Create billing
  ======================= */
  const store = async (data) => {
    try {
      const res = await api.post('/api/billings', data);
      billings.value.unshift(res.data.result); // optional instant UI update
    } catch (error) {
      console.error(error);
    }
  }

  /* =======================
    View single billing
  ======================= */
  const show = async (id) => {
    try {
      isLoading.value = true;
      const res = await api.get(`/api/billings/${id}`);
      viewData.value = res.data.result;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  /* =======================
    Update billing
  ======================= */
  const update = async (id, data) => {
    try {
      const res = await api.put(`/api/billings/${id}`, data);

      // sync local list
      const index = billings.value.findIndex(r => r.id === id);
      if (index !== -1) {
        billings.value[index] = res.data.result;
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

  /* =======================
    Send invoice
  ======================= */
  const sendInvoice  = async (id) => {
    try {
      const res = await api.post(`/api/billings/${id}/send-invoice`);
      
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  // auto fetch
  index()

  return {
    billings,
    viewData,
    isLoading,
    index,
    store,
    show,
    update,
    clearViewData,
    sendInvoice
  }
})