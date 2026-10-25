<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    item: 'room' | 'tenant' | 'billing';
    status: number;
}>();

const statusMap: Record<
    string,
    Record<number, { label: string; classes: string }>
> = {
    room: {
        0: {
            label: 'Available',
            classes: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15',
        },
        1: {
            label: 'Occupied',
            classes: 'bg-amber-50 text-amber-700 ring-amber-600/15',
        },
        2: {
            label: 'Maintenance',
            classes: 'bg-slate-100 text-slate-700 ring-slate-600/15',
        },
    },
    tenant: {
        0: {
            label: 'Inactive',
            classes: 'bg-slate-100 text-slate-700 ring-slate-600/15',
        },
        1: {
            label: 'Active',
            classes: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15',
        },
        2: {
            label: 'Left',
            classes: 'bg-rose-50 text-rose-700 ring-rose-600/15',
        },
    },
    billing: {
        0: {
            label: 'Unpaid',
            classes: 'bg-amber-50 text-amber-700 ring-amber-600/15',
        },
        1: {
            label: 'Paid',
            classes: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15',
        },
        2: {
            label: 'Overdue',
            classes: 'bg-rose-50 text-rose-700 ring-rose-600/15',
        },
    },
};

const status = computed(
    () =>
        statusMap[props.item][props.status] ?? {
            label: 'Unknown',
            classes: 'bg-slate-100 text-slate-700 ring-slate-600/15',
        },
);
</script>

<template>
    <span
        class="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset"
        :class="status.classes"
    >
        {{ status.label }}
    </span>
</template>
