<script setup>
import { ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

const route = useRoute();
const isSidebarOpen = ref(false);

watch(() => route.path, () => {
    isSidebarOpen.value = false;
});
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <div
            v-if="isSidebarOpen"
            class="fixed inset-0 bg-black/50 z-40 md:hidden"
            @click="isSidebarOpen = false"
        />

        <div class="flex min-h-screen">
            <Sidebar
                :open="isSidebarOpen"
                @close="isSidebarOpen = false"
                class="z-50"
            />
            <main class="flex-1 p-4 md:p-6">
                <Header
                    :title="route.name"
                    @toggle-sidebar="isSidebarOpen = true"
                />
                <RouterView />
            </main>
        </div>
    </div>
</template>
