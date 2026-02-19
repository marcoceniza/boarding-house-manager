<script setup>
import { ref } from "vue";
import { useRoomStore } from "@/stores/RoomStore";
import { PlusIcon } from '@heroicons/vue/24/outline';
import BaseButton from "@/components/base/BaseButton.vue";
import StatusBadge from "@/components/StatusBadge.vue";
import ActionButtons from "@/components/ActionButtons.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import RoomForm from "@/components/RoomForm.vue";
import RoomDeleteConfirm from "@/components/RoomDeleteConfirm.vue";

const roomStore = useRoomStore();

const openAddRoom = () => {
    roomStore.selectedRoom = null;
    roomStore.currentMode = "Add";
    roomStore.isOpenModal = true;
};
</script>

<template>
    <div class="flex justify-end items-center my-4">
        <BaseButton variant="success" size="sm" @click="openAddRoom">
            <PlusIcon class="size-4" /> Add Room
        </BaseButton>
    </div>

    <!-- DESKTOP -->
    <div class="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        <table class="min-w-full border border-gray-200">
            <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                    <th class="px-4 py-3 text-left">Room No.</th>
                    <th class="px-4 py-3 text-left">Type</th>
                    <th class="px-4 py-3 text-left">Capacity</th>
                    <th class="px-4 py-3 text-left">Price / Month</th>
                    <th class="px-4 py-3 text-left">Occupied</th>
                    <th class="px-4 py-3 text-left">Status</th>
                    <th class="px-4 py-3 text-center">Actions</th>
                </tr>
            </thead>

            <tbody class="divide-y text-sm">
                <tr v-if="roomStore.isListLoading"> 
                    <td class="text-center text-gray-500 h-15" colspan="7">Loading...</td> 
                </tr> 
                <tr v-else-if="roomStore.rooms.length === 0"> 
                    <td class="text-center text-gray-500 h-15" colspan="7">No Data</td> 
                </tr>
                <tr v-else v-for="room in roomStore.rooms" :key="room.id">
                    <td class="px-4 py-3">{{ room.room_number }}</td>
                    <td class="px-4 py-3">{{ room.type }}</td>
                    <td class="px-4 py-3">{{ room.capacity }}</td>
                    <td class="px-4 py-3">{{ room.price_per_month }}</td>
                    <td class="px-4 py-3">{{ room.occupied }}</td>
                    <td class="px-4 py-3">
                        <StatusBadge :status="room.status" />
                    </td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <ActionButtons :room="room" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- MOBILE -->
    <div class="md:hidden">
        <div
            v-if="roomStore.isListLoading"
            class="bg-white rounded-lg shadow p-6 text-center text-gray-500"
        >
            Loading...
        </div>
        <div
            v-else-if="roomStore.rooms.length === 0"
            class="bg-white rounded-lg shadow p-6 text-center text-gray-500"
        >
            No Data
        </div>
        <div v-else class="space-y-4">
            <div
                v-for="room in roomStore.rooms"
                :key="room.id"
                class="bg-white rounded-lg shadow p-4"
            >
                <div class="flex justify-between items-center">
                    <h3 class="font-bold text-lg">
                        Room {{ room.room_number }}
                    </h3>
                    <StatusBadge :status="room.status" />
                </div>

                <div class="mt-3 text-sm space-y-1 text-gray-600">
                    <p><strong>Type:</strong> {{ room.type }}</p>
                    <p><strong>Capacity:</strong> {{ room.capacity }}</p>
                    <p><strong>Price:</strong> {{ room.price_per_month }}</p>
                    <p><strong>Occupied:</strong> {{ room.occupied }}</p>
                </div>

                <div class="mt-4 flex gap-2 justify-end">
                    <ActionButtons :room="room" />
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <BaseModal
        v-model:isOpen="roomStore.isOpenModal"
        :title="roomStore.currentMode"
        @close="roomStore.isOpenModal = false; roomStore.clearViewData()"
    >
        <div v-if="roomStore.isViewLoading">
            <div class="space-y-2 p-6">
                <div class="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div class="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                <div class="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            </div>
        </div>
        <RoomForm
            v-else
            :mode="roomStore.currentMode"
            @close="roomStore.isOpenModal = false"
        />
    </BaseModal>

    <!-- Delete confirm -->
    <RoomDeleteConfirm
        v-if="roomStore.currentMode === 'Delete' && roomStore.isOpenDeleteModal"
    />
</template>