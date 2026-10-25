<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

const props = withDefaults(
    defineProps<{
        class?: ButtonHTMLAttributes['class'];
        variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost';
        size?: 'sm' | 'md' | 'lg';
        fullWidth?: boolean;
        disabled?: boolean;
        type?: ButtonHTMLAttributes['type'];
    }>(),
    {
        variant: 'primary',
        size: 'md',
        fullWidth: false,
        disabled: false,
        type: 'button',
    },
);

const variants = {
    primary: 'bg-emerald-700 text-white shadow-sm hover:bg-emerald-800',
    secondary: 'bg-slate-700 text-white hover:bg-slate-800',
    success: 'bg-emerald-700 text-white hover:bg-emerald-800',
    danger: 'bg-rose-600 text-white hover:bg-rose-700',
    outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
};

const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
};
</script>

<template>
    <button
        :type="props.type"
        :disabled="props.disabled"
        :class="[
            'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
            variants[props.variant],
            sizes[props.size],
            props.fullWidth && 'w-full',
            props.class,
        ]"
    >
        <slot />
    </button>
</template>