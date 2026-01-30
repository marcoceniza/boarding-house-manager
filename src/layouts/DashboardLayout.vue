<script setup>
import { RouterView } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';

</script>

<template>
    <div class="min-h-screen flex bg-gray-100">
        <Sidebar />

        <main class="flex-1 p-6">
            <RouterView />
        </main>
    </div>
</template>

