<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { Bars3Icon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
const authStore = useAuthStore();

defineProps({
    title: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['toggle-sidebar']);
const isShowProfile = ref(false);
</script>

<template>
    <header class="bg-white px-6 py-4 flex items-center justify-between shadow">
        <div class="flex items-center gap-3">
            <button
                class="md:hidden text-gray-800 text-2xl cursor-pointer"
                @click="emit('toggle-sidebar')"
            >
                <Bars3Icon class="size-5.5" />
            </button>

            <h1 class="text-xl font-bold text-gray-800">{{ title }}</h1>
        </div>

        <div @click="isShowProfile = !isShowProfile" class="flex items-center gap-3 cursor-pointer relative">
            <span class="text-sm text-gray-600">Hello, Admin</span>
            <div class="w-8 h-8 rounded-full bg-stone-300"></div>
            <ul v-show="isShowProfile" class="absolute top-10 bg-gray-500 right-0 p-4 text-white">
                <li>John Doe</li>
                <li>johndoe@gmail.com</li>
                <li @click="authStore.logout" class="text-center">Logout</li>
            </ul>
        </div>
    </header>
</template>