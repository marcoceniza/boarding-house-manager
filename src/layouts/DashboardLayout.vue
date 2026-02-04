<script setup>
import { RouterView, useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

const route = useRoute();

</script>

<template>
    <div class="min-h-screen flex bg-gray-100">
        <Sidebar />
        <main class="flex-1 p-6">
            <Header :title="route.name"/>
            <RouterView />
        </main>
    </div>
</template>

