<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: { type: String, default: 'button' },
    variant: { type: String, default: 'primary' },
    disabled: { type: Boolean, default: false },
    fullWidth: { type: Boolean, default: false },
    rounded: { type: Boolean, default: true },
    size: { type: String, default: 'md' },
});
const emit = defineEmits(['click']);

const buttonClasses = computed(() => {
    const base = [
        'font-semibold focus:outline-none focus:ring-2 focus:ring-offset-1 transition cursor-pointer',
        props.disabled ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90',
        props.rounded ? 'rounded-lg' : '',
        props.fullWidth ? 'w-full' : 'inline-flex',
    ];

    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg',
    };
    base.push(sizes[props.size] || sizes.md);

    const variants = {
        primary: 'bg-blue-500 text-white focus:ring-blue-500',
        secondary: 'bg-gray-500 text-white focus:ring-gray-500',
        danger: 'bg-red-500 text-white focus:ring-red-500',
    };
    base.push(variants[props.variant] || variants.primary);

    return base.join(' ');
});

const handleClick = (event) => {
    if (!props.disabled) emit('click', event);
};
</script>

<template>
    <button
        :type="type"
        :disabled="disabled"
        :class="buttonClasses"
        @click="handleClick"
    >
        <slot />
    </button>
</template>