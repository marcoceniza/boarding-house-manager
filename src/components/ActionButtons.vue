<script setup>
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/base/BaseButton.vue'
import { useRoomStore } from '@/stores/RoomStore'

const props = defineProps({ room: Object })
const roomStore = useRoomStore();

const isLocked = props.room.tenants && props.room.tenants.length > 0;

const openViewModal = () => {
    roomStore.currentMode = 'View';
    roomStore.clearViewData();
    roomStore.isOpenModal = true;
    roomStore.show(props.room.id);
}

const openEditModal = () => {
    roomStore.currentMode = 'Edit';
    roomStore.clearViewData();
    roomStore.isOpenModal = true;
    roomStore.show(props.room.id);
}

const openDeleteModal = () => {
    roomStore.currentMode = 'Delete';
    roomStore.selectedRoom = props.room;
    roomStore.isOpenDeleteModal = true;
}
</script>

<template>
    <BaseButton
        size="sm"
        @click="openViewModal"
    >
        <EyeIcon class="size-4" />
    </BaseButton>

    <template v-if="!isLocked">
        <BaseButton @click="openEditModal" size="sm" variant="warning">
            <PencilSquareIcon class="size-4" />
        </BaseButton>
        <BaseButton @click="openDeleteModal" size="sm" variant="danger">
            <TrashIcon class="size-4" />
        </BaseButton>
    </template>

    <span v-else class="text-xs text-gray-400 italic">
        Locked
    </span>
</template>