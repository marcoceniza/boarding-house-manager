<script setup>
import { RouterView } from 'vue-router'
import Toast from './components/Toast.vue'
import { useAuthStore } from './stores/AuthStore'
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.fetchUser();
})
</script>

<template>
  <RouterView />
  <Toast />
</template>