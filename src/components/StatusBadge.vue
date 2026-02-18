<script setup>
defineProps({ status: String })
</script>

<template>
    <span
        class="px-2 py-1 rounded-full text-xs font-semibold"
        :class="{
            'bg-green-100 text-green-800': status === 'Available',
            'bg-red-100 text-red-800': status === 'Occupied',
            'bg-yellow-100 text-yellow-800': status === 'Maintenance'
        }"
    >
        {{ status }}
    </span>
</template>