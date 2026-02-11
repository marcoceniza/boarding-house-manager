<script setup>
import { ref } from "vue";
import BaseModal from "@/components/base/BaseModal.vue";
import RoomForm from "@/components/RoomForm.vue";
import { useRoomStore } from "@/stores/RoomStore";

const roomStore = useRoomStore();

const showModal = ref(false);
const currentMode = ref("Add");
const selectedRoom = ref(null);

// Handlers
const openAddRoom = () => {
    selectedRoom.value = null;
    currentMode.value = "Add";
    showModal.value = true;
};
</script>

<template>
    <div class="flex justify-end items-center my-4">
        <button
            @click="openAddRoom"
            class="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
        >
            + Add Room
        </button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-x-auto">
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
            <tbody class="divide-y divide-gray-200 text-sm">
                <tr v-for="room in roomStore.rooms" :key="room.id" class="hover:bg-gray-50">
                    <td class="px-4 py-3 font-medium">{{ room.room_number }}</td>
                    <td class="px-4 py-3 font-medium">{{ room.type }}</td>
                    <td class="px-4 py-3 font-medium">{{ room.capacity }}</td>
                    <td class="px-4 py-3 font-medium">{{ room.price_per_month }}</td>
                    <td class="px-4 py-3 font-medium">{{ room.occupied }}</td>
                    <td class="px-4 py-3 font-medium">{{ room.status }}</td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <button
                            @click="roomStore.show(room.id); currentMode = 'View'; showModal = true"
                            class="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            View
                        </button>
                        <button
                            @click="roomStore.show(room.id); currentMode = 'Edit'; showModal = true"
                            class="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Edit
                        </button>
                        <button
                            @click="roomStore.delete(room.id)"
                            class="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Modal -->
    <BaseModal
        :show="showModal"
        @close="showModal = false; roomStore.clearViewData()"
    >
        <RoomForm :mode="currentMode" />
    </BaseModal>
</template>