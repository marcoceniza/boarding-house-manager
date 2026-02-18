<script setup>
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/base/BaseButton.vue'
import { useRoomStore } from '@/stores/RoomStore'

const props = defineProps({ room: Object })
const roomStore = useRoomStore()

const isLocked = props.room.tenants && props.room.tenants.length > 0
</script>

<template>
    <BaseButton size="sm" @click="roomStore.show(room.id)">
        <EyeIcon class="size-4" />
    </BaseButton>

    <template v-if="!isLocked">
        <BaseButton size="sm" variant="warning">
            <PencilSquareIcon class="size-4" />
        </BaseButton>
        <BaseButton size="sm" variant="danger">
            <TrashIcon class="size-4" />
        </BaseButton>
    </template>

    <span v-else class="text-xs text-gray-400 italic">
        Locked
    </span>
</template>