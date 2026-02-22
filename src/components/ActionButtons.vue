<script setup>
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import BaseButton from '@/components/base/BaseButton.vue';

const props = defineProps({
    item: { type: Object, required: true },
    locked: { type: Boolean, default: false }
});

const emit = defineEmits(['view', 'edit', 'delete']);
</script>

<template>
    <BaseButton size="sm" @click="emit('view', item)">
        <EyeIcon class="size-4" />
    </BaseButton>

    <BaseButton
        size="sm"
        variant="warning"
        @click="emit('edit', item)"
        :disabled="props.locked"
    >
        <PencilSquareIcon class="size-4" />
    </BaseButton>

    <BaseButton
        size="sm"
        variant="danger"
        @click="emit('delete', item)"
        :disabled="props.locked"
    >
        <TrashIcon class="size-4" />
    </BaseButton>
</template>