import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const toasts = reactive([]);

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now();
    toasts.push({ id, message, type });

    setTimeout(() => removeToast(id), duration);
  };

  const removeToast = (id) => {
    const index = toasts.findIndex(t => t.id === id);
    if (index !== -1) toasts.splice(index, 1);
  };

  const success = (msg, duration) => addToast(msg, 'success', duration);
  const error = (msg, duration) => addToast(msg, 'error', duration);
  const warning = (msg, duration) => addToast(msg, 'warning', duration);
  const info = (msg, duration) => addToast(msg, 'info', duration);

  return { toasts, addToast, removeToast, success, error, warning, info };
});