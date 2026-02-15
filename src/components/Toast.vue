<script setup>
import { useToastStore } from "@/stores/toastStore";

const toastStore = useToastStore();
</script>

<template>
    <transition-group
        name="toast"
        tag="div"
        class="fixed top-5 right-5 z-50 flex flex-col gap-3"
    >
        <div
            v-for="toast in toastStore.toasts"
            :key="toast.id"
            :class="[
                'min-w-[250px] px-4 py-3 rounded shadow-lg text-white flex justify-between items-center transition-all duration-300',
                toast.type === 'success' ? 'bg-green-500' :
                toast.type === 'error' ? 'bg-red-500' :
                toast.type === 'warning' ? 'bg-yellow-500 text-black' :
                'bg-blue-500'
            ]"
        >
        <span>{{ toast.message }}</span>
        <button @click="toastStore.removeToast(toast.id)" class="ml-2 font-bold">&times;</button>
        </div>
    </transition-group>
</template>

<style scoped>
.toast-enter-from {
    transform: translateX(100%);
    opacity: 0;
}
.toast-enter-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}
.toast-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
.toast-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}
</style>