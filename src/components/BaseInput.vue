<script setup>
import { computed } from 'vue';

const model = defineModel();
const props = defineProps({
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    textarea: { type: Boolean, default: false },
    rows: { type: Number, default: 3 },
    label: { type: String, default: '' },
    error: { type: String, default: '' },
});

const inputClasses = computed(() => [
    'border rounded px-4 py-3 w-full text-base leading-tight placeholder-gray-400',
    'focus:outline-none focus:ring-2 focus:ring-offset-1 transition',
    props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
    props.error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:ring-blue-500',
].join(' '))
</script>

<template>
    <div class="flex flex-col w-full">
        <label v-if="label" class="block text-sm font-semibold text-gray-600 mb-1">{{ label }}</label>

        <component
            :is="textarea ? 'textarea' : 'input'"
            v-model="model"
            :type="!textarea ? type : undefined"
            :placeholder="placeholder"
            :disabled="disabled"
            :rows="textarea ? rows : undefined"
            :class="[inputClasses, textarea ? 'resize-y' : '']"
        />

        <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
    </div>
</template>