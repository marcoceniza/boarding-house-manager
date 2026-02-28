<script setup>
import { computed } from 'vue'

const props = defineProps({
    status: { type: String, required: true },
    item: { type: String, default: 'room' },
})

const STATUS_MAP = {
    room: {
        0: { label: 'Available', class: 'bg-green-100 text-green-800' },
        1: { label: 'Occupied', class: 'bg-red-100 text-red-800' },
        2: { label: 'Maintenance', class: 'bg-yellow-100 text-yellow-800' },
    },
    tenant: {
        0: { label: 'Inactive', class: 'bg-gray-100 text-gray-800' },
        1: { label: 'Active', class: 'bg-green-100 text-green-800' },
        2: { label: 'Left', class: 'bg-red-100 text-red-800' },
    },
    billing: {
        0: { label: 'Unpaid', class: 'bg-gray-100 text-gray-800' },
        1: { label: 'Paid', class: 'bg-green-100 text-green-800' },
        2: { label: 'Overdue', class: 'bg-red-100 text-red-800' },
    },
}

const statusMeta = computed(() => {
    return STATUS_MAP[props.item]?.[props.status] ?? {
        label: 'Unknown',
        class: 'bg-gray-100 text-gray-800'
    }
})

const statusLabel = computed(() => statusMeta.value.label)
const statusClasses = computed(() => statusMeta.value.class)
</script>

<template>
    <span
        class="px-2 py-1 rounded-full text-xs font-semibold"
        :class="statusClasses"
    >
        {{ statusLabel }}
    </span>
</template>