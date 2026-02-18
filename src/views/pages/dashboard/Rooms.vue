<script setup>
import { ref } from "vue";
import { useRoomStore } from "@/stores/RoomStore";
import { EyeIcon, PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/vue/24/outline';
import BaseButton from "@/components/base/BaseButton.vue";
import StatusBadge from "@/components/StatusBadge.vue";
import ActionButtons from "@/components/ActionButtons.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import RoomForm from "@/components/RoomForm.vue";

const roomStore = useRoomStore();

const isOpenModal = ref(false);
const currentMode = ref("Add");
const selectedRoom = ref(null);

const openAddRoom = () => {
    selectedRoom.value = null;
    currentMode.value = "Add";
    isOpenModal.value = true;
};

const isRoomLocked = (room) => room.tenants && room.tenants.length > 0;
</script>

<template>
    <!-- Add button -->
    <div class="flex justify-end items-center my-4">
        <BaseButton variant="success" size="sm" @click="openAddRoom">
            <PlusIcon class="size-4" /> Add Room
        </BaseButton>
    </div>

    <!-- DESKTOP TABLE -->
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
                <tr v-if="roomStore.isRoomLoading"> 
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

    <!-- Modal -->
    <BaseModal
        v-model:isOpen="isOpenModal"
        @close="isOpenModal = false; roomStore.clearViewData()"
    >
        <RoomForm :mode="currentMode" @close="isOpenModal = false" />
    </BaseModal>

    <!-- MOBILE STATES -->
    <div class="md:hidden">
        <div
            v-if="roomStore.isRoomLoading"
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
                    <span
                        class="px-2 py-1 rounded-full text-xs font-semibold"
                        :class="{
                            'bg-green-100 text-green-800': room.status === 'Available',
                            'bg-red-100 text-red-800': room.status === 'Occupied',
                            'bg-yellow-100 text-yellow-800': room.status === 'Maintenance'
                        }"
                    >
                        {{ room.status }}
                    </span>
                </div>

                <div class="mt-3 text-sm space-y-1 text-gray-600">
                    <p><strong>Type:</strong> {{ room.type }}</p>
                    <p><strong>Capacity:</strong> {{ room.capacity }}</p>
                    <p><strong>Price:</strong> {{ room.price_per_month }}</p>
                    <p><strong>Occupied:</strong> {{ room.occupied }}</p>
                </div>

                <div class="mt-4 flex gap-2 justify-end">
                    <BaseButton size="sm" @click="roomStore.show(room.id)">
                        <EyeIcon class="size-4" />
                    </BaseButton>

                    <template v-if="!isRoomLocked(room)">
                        <BaseButton size="sm" variant="warning">
                            <PencilSquareIcon class="size-4" />
                        </BaseButton>
                        <BaseButton size="sm" variant="danger">
                            <TrashIcon class="size-4" />
                        </BaseButton>
                    </template>

                    <span
                        v-else
                        class="text-xs text-gray-400 italic"
                    >
                        Locked
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>