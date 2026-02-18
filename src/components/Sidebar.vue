<script setup>
import { useRoute, RouterLink } from 'vue-router';

const route = useRoute();
const isActive = (path) => route.path === path;

defineProps({ open: Boolean });
defineEmits(['close']);
</script>

<template>
    <aside
        class="fixed md:static inset-y-0 left-0 w-64 bg-blue-500 flex flex-col
            transform transition-transform duration-300
            md:translate-x-0"
        :class="open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
    >
        <div class="flex justify-between items-center px-6 py-4">
            <h2 class="text-xl font-bold text-white">My System</h2>
            <button class="md:hidden text-white text-2xl cursor-pointer" @click="$emit('close')">✕</button>
        </div>

        <nav class="flex-1 px-4 space-y-2">
            <RouterLink
                to="/dashboard"
                @click="$emit('close')"
                :class="[
                'block px-4 py-2 rounded-lg',
                isActive('/dashboard')
                    ? 'bg-stone-100 text-gray-800 font-semibold'
                    : 'text-white hover:bg-stone-100 hover:text-gray-800 hover:font-semibold'
                ]"
            >Dashboard</RouterLink>

            <RouterLink
                to="/dashboard/rooms"
                @click="$emit('close')"
                :class="[
                'block px-4 py-2 rounded-lg',
                isActive('/dashboard/rooms')
                    ? 'bg-stone-100 text-gray-800 font-semibold'
                    : 'text-white hover:bg-stone-100 hover:text-gray-800 hover:font-semibold'
                ]"
            >Rooms</RouterLink>

            <RouterLink
                to="/dashboard/tenants"
                @click="$emit('close')"
                :class="[
                'block px-4 py-2 rounded-lg',
                isActive('/dashboard/tenants')
                    ? 'bg-stone-100 text-gray-800 font-semibold'
                    : 'text-white hover:bg-stone-100 hover:text-gray-800 hover:font-semibold'
                ]"
            >Tenants</RouterLink>

            <RouterLink
                to="/dashboard/billings"
                @click="$emit('close')"
                :class="[
                'block px-4 py-2 rounded-lg',
                isActive('/dashboard/billings')
                    ? 'bg-stone-100 text-gray-800 font-semibold'
                    : 'text-white hover:bg-stone-100 hover:text-gray-800 hover:font-semibold'
                ]"
            >Billings</RouterLink>

            <RouterLink
                to="/dashboard/profile"
                @click="$emit('close')"
                :class="[
                'block px-4 py-2 rounded-lg',
                isActive('/dashboard/profile')
                    ? 'bg-stone-100 text-gray-800 font-semibold'
                    : 'text-white hover:bg-stone-100 hover:text-gray-800 hover:font-semibold'
                ]"
            >Admin Profile</RouterLink>
        </nav>

        <p class="px-6 py-4 border-t text-sm text-white/70">© 2026</p>
    </aside>
</template>
