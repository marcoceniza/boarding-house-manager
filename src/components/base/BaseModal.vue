<script setup>
const props = defineProps({
    show: { type: Boolean, required: true },
    title: { type: String, default: "Modal Title" },
    mode: { type: String, default: "view" } // add, edit, delete, view
});
const emit = defineEmits(["close"]);
const close = () => emit("close");
</script>

<template>
    <transition name="fade">
        <div
            v-if="props.show"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click.self="close"
        >
            <transition name="scale">
                <div
                    class="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative"
                    @keydown.escape.window="close"
                >
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold">{{ props.title }}</h3>
                        <button @click="close" class="text-gray-400 hover:text-gray-600">&times;</button>
                    </div>
                    <div>
                        <slot></slot>
                    </div>
                    <div v-if="$slots.footer" class="mt-4">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.scale-enter-active {
transition: transform 0.2s ease, opacity 0.2s ease;
}
.scale-enter-from {
    transform: scale(0.9);
    opacity: 0;
}
.scale-leave-active {
    transition: transform 0.2s ease, opacity 0.2s ease;
}
.scale-leave-to {
    transform: scale(0.9);
    opacity: 0;
}
</style>