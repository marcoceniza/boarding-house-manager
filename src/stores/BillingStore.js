import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/lib/axios';
import { useToastStore } from './toastStore';
import { useRoomStore } from './RoomStore';

export const useBillingStore = defineStore('billing', () => {
  const billings = ref([]);
  const viewData = ref(null);
  const isListLoading = ref(false);
  const isFormLoading = ref(false);
  const isViewLoading = ref(false);
  const isDeleteLoading = ref(false);
  const isSendInvoiceLoading = ref(false);
  const toastStore = useToastStore();
  const errors = ref({});
  const isOpenModal = ref(false);
  const isOpenDeleteModal = ref(false);
  const isOpenSendInvoiceModal = ref(false);
  const currentMode = ref("Add");
  const selectedBilling = ref(null);
  const selectedInvoice = ref(null);
  const roomStore = useRoomStore();

  /* =======================
    Fetch all billings
  ======================= */
  const index = async () => {
    try {
      isListLoading.value = true;
      const res = await api.get('/billings');
      billings.value = res.data.result;
    } catch (error) {
      console.error(error);
    } finally {
      isListLoading.value = false;
    }
  }

  /* =======================
    Create billing
  ======================= */
  const store = async (data) => {
    try {
      isFormLoading.value = true;

      const res = await api.post('/billings', data);
      billings.value.unshift(res.data.result);
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
    View single billing
  ======================= */
  const show = async (id, occupied) => {
    try {
      isViewLoading.value = true;
      const res = await api.get(`/billings/${id}`);
      viewData.value = res.data.result;
    } catch (error) {
      console.error(error);
    } finally {
      isViewLoading.value = false;
    }
  }

  /* =======================
    Update billing
  ======================= */
  const update = async (id, data) => {
    try {
      isFormLoading.value = true;

      const res = await api.put(`/billings/${id}`, data);

      // sync local list
      const index = billings.value.findIndex(r => r.id === id);
      if (index !== -1) {
        billings.value[index] = res.data.result;
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
    Delete billing
  ======================= */
  const destroy = async (id) => {
    try {
      isDeleteLoading.value = true;
      const res = await api.delete(`/billings/${id}`);

      toastStore.success(res.data.message);
      billings.value = billings.value.filter(r => r.id !== id);
      await roomStore.index();
    } catch (error) {
      console.error(error);
    } finally {
      isDeleteLoading.value = false;
    }
  }

  /* =======================
    Send invoice
  ======================= */
  const sendInvoice  = async (id) => {
    try {
      isSendInvoiceLoading.value = true;
      const res = await api.post(`/billings/${id}/send-invoice`);

      toastStore.success(res.data.message);
      await roomStore.index();
    } catch (error) {
      console.error(error);
    } finally {
      isSendInvoiceLoading.value = false;
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
    billings,
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
    isListLoading,
    isViewLoading,
    isFormLoading,
    destroy,
    isOpenDeleteModal,
    isDeleteLoading,
    sendInvoice,
    selectedBilling,
    isSendInvoiceLoading,
    isOpenSendInvoiceModal,
    selectedInvoice
  }
})