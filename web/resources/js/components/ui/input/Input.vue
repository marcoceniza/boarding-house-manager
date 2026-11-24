<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'];
    placeholder?: string;
    label?: string;
    type?: 'text' | 'email' | 'password' | 'number';
    error?: string;
}>();

const modelValue = defineModel<string | number>();
</script>

<template>
    <div>
        <label class="block text-sm font-semibold text-slate-700" :for="props.label">
            {{ props.label }}
        </label>
        <input
            :id="props.label"
            v-model="modelValue"
            class="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
            :type="props.type"
            :placeholder="props.placeholder"
            :class="[props.class, props.error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10']"
            :aria-invalid="Boolean(props.error)"
            :aria-describedby="props.error ? `${props.label}-error` : undefined"
        />
        <p v-if="props.error" :id="`${props.label}-error`" class="mt-1.5 text-sm text-rose-600">
            {{ props.error }}
        </p>
    </div>
</template>