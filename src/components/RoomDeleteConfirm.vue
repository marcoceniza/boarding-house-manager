<script setup>
import BaseButton from '@/components/base/BaseButton.vue'
import { useRoomStore } from '@/stores/RoomStore'

const roomStore = useRoomStore()

const close = () => roomStore.isOpenDeleteModal = false;

const confirmDelete = async () => {
    if (!roomStore.selectedRoom?.id) return;


    await roomStore.destroy(roomStore.selectedRoom.id);
    close();
}
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div
            class="absolute inset-0 bg-black/80"
            @click="close"
        />

        <!-- Modal -->
        <div class="relative bg-white rounded-lg w-full max-w-sm p-6 shadow-lg">
            <h3 class="text-lg font-semibold mb-3 text-red-600">
                Delete Room
            </h3>

            <p class="text-sm text-gray-600 whitespace-pre-line">
                Delete room <strong>{{ roomStore.selectedRoom?.room_number }}</strong>?

                This action cannot be undone.
            </p>

            <div class="flex justify-end gap-2 mt-6">
                <BaseButton
                    size="sm"
                    variant="secondary"
                    @click="close"
                >
                    Cancel
                </BaseButton>

                <BaseButton
                    size="sm"
                    variant="danger"
                    :disabled="roomStore.isDeleteLoading"
                    @click="confirmDelete"
                >
                    {{ roomStore.isDeleteLoading ? 'Deleting...' : 'Yes, Delete' }}
                </BaseButton>
            </div>
        </div>
    </div>
</template>