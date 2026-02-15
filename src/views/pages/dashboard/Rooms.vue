<script setup>
import { ref } from "vue";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import RoomForm from "@/components/RoomForm.vue";
import { useRoomStore } from "@/stores/RoomStore";
import { EyeIcon, PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/vue/24/outline';

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
    <div class="flex justify-end items-center my-4">
        <BaseButton
            variant="success"
            size="sm"
            @click="openAddRoom"
        >
            <PlusIcon class="size-4" />Add Room
        </BaseButton>
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
                <tr v-if="roomStore.isRoomLoading">
                    <td class="text-center text-gray-500 h-15" colspan="7">Loading...</td>
                </tr>
                <tr v-else-if="roomStore.rooms.length === 0">
                    <td class="text-center text-gray-500 h-15" colspan="7">No Data</td>
                </tr>
                <tr v-else v-for="room in roomStore.rooms" :key="room.id" class="hover:bg-gray-50">
                    <td class="px-4 py-3 font-medium">{{ room.room_number }}</td>
                    <td class="px-4 py-3 font-medium">{{ room.type }}</td>
                    <td class="px-4 py-3 font-medium">{{ room.capacity }}</td>
                    <td class="px-4 py-3 font-medium">{{ room.price_per_month }}</td>
                    <td class="px-4 py-3 font-medium">{{ room.occupied }}</td>
                    <td class="px-4 py-3">
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
                    </td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <BaseButton
                            title="View"
                            size="sm"
                            @click="roomStore.show(room.id); currentMode = 'View'; isOpenModal = true"
                        >
                            <EyeIcon class="size-4 cursor-pointer" />
                        </BaseButton>

                        <template v-if="!isRoomLocked(room)">
                            <BaseButton
                                title="Edit"
                                size="sm"
                                variant="warning"
                                @click="roomStore.show(room.id); currentMode = 'Edit'; isOpenModal = true"
                            >
                                <PencilSquareIcon class="size-4 cursor-pointer" />
                            </BaseButton>
                            <BaseButton
                                title="Delete"
                                size="sm"
                                variant="danger"
                                @click="roomStore.delete(room.id)"
                            >
                                <TrashIcon class="size-4 cursor-pointer" />
                            </BaseButton>
                        </template>

                        <span
                            v-else
                            class="text-xs text-gray-400 italic"
                            title="Room is occupied. Edit tenant first."
                        >
                            Locked
                        </span>
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
</template>