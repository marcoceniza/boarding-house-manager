<script setup>
import { Bars3Icon } from '@heroicons/vue/24/outline';

defineProps({
    title: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['toggle-sidebar']);
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

        <div class="flex items-center gap-3">
            <span class="text-sm text-gray-600">Hello, Admin</span>
            <div class="w-8 h-8 rounded-full bg-stone-300"></div>
        </div>
    </header>
</template>
