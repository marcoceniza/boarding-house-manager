<script setup>
import { useToastStore } from "@/stores/toastStore";

const toastStore = useToastStore();
</script>

<template>
    <TransitionGroup
        name="toast"
        tag="div"
        class="fixed bottom-5 right-5 z-50 flex flex-col gap-3"
    >
        <div
            v-for="toast in toastStore.toasts"
            :key="toast.id"
            :class="[
                'min-w-28 px-4 py-3 rounded shadow-lg text-white flex justify-between items-center transition-all duration-300',
                toast.type === 'success' ? 'bg-green-600' :
                toast.type === 'error' ? 'bg-red-600' :
                toast.type === 'warning' ? 'bg-yellow-600 text-black' :
                'bg-blue-600'
            ]"
        >
        <span>{{ toast.message }}</span>
        <!-- <button @click="toastStore.removeToast(toast.id)" class="ml-2 font-bold">&times;</button> -->
        </div>
    </TransitionGroup>
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