<script setup lang="ts">
import { Eye, Pencil, Trash2 } from '@lucide/vue';

defineProps<{
    locked?: boolean;
    hideMutations?: boolean;
}>();

const emit = defineEmits<{
    view: [];
    edit: [];
    delete: [];
}>();
</script>

<template>
    <div class="flex items-center justify-center gap-1">
        <button
            type="button"
            class="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
            aria-label="View"
            @click="emit('view')"
        >
            <Eye class="size-4" />
        </button>
        <button
            v-if="!hideMutations"
            type="button"
            class="rounded-lg p-2 text-amber-700 transition hover:bg-amber-50 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Edit"
            :disabled="locked"
            @click="emit('edit')"
        >
            <Pencil class="size-4" />
        </button>
        <button
            v-if="!hideMutations"
            type="button"
            class="rounded-lg p-2 text-rose-600 transition hover:bg-rose-50 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Delete"
            :disabled="locked"
            @click="emit('delete')"
        >
            <Trash2 class="size-4" />
        </button>
    </div>
</template>
