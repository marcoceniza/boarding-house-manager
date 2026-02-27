<script setup>
import BaseButton from '@/components/base/BaseButton.vue'

const props = defineProps({
    isOpen: { type: Boolean, required: true },
    title: { type: String, default: '' },
    message: { type: String, required: true },
    loading: { type: Boolean, default: false },
})

const emit = defineEmits(['confirm', 'close'])

const close = () => emit('close')
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div
            class="absolute inset-0 bg-black/80"
            @click="close"
        />

        <!-- Modal -->
        <div class="relative bg-white rounded-lg w-full max-w-sm p-6 shadow-lg mx-5">
            <h3 class="text-lg font-semibold mb-3 text-red-600">
                {{ title }}
            </h3>

            <p class="text-sm text-gray-600 whitespace-pre-line">
                {{ message }}
                <br /><br />
                <strong>This action cannot be undone.</strong>
            </p>

            <div class="flex justify-end gap-2 mt-6">
                <BaseButton size="sm" variant="secondary" @click="close">
                    Cancel
                </BaseButton>

                <BaseButton
                    size="sm"
                    variant="danger"
                    :disabled="loading"
                    @click="$emit('confirm')"
                >
                    {{ loading ? 'Deleting...' : 'Yes, Delete' }}
                </BaseButton>
            </div>
        </div>
    </div>
</template>