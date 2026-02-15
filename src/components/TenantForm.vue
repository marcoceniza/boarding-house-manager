<script setup>
import { reactive, watch, computed } from "vue";
import BaseInput from "./base/BaseInput.vue";
import { useTenantStore } from "@/stores/TenantStore";
import { useRoomStore } from "@/stores/RoomStore";

const tenantStore = useTenantStore();
const roomStore = useRoomStore();

const formData = reactive({
    first_name: "",
    last_name: "",
    email: "",
    room_id: "",
    move_in_date: "",
    status: "",
});

const isViewMode = computed(() => props.mode === "View"); // Disable inputs in View mode
const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Left", value: "Left" },
    { label: "Inactive", value: "Inactive" },
];

/* ✅ Room options (label + value) */
const roomOptions = computed(() => {
    return roomStore.rooms
        .filter(room => room.status === "Available")
        .map(room => ({
            label: room.room_number,
            value: room.id,
        }));
});

console.log(roomOptions);

const props = defineProps({
    mode: { type: String, default: "Add" }, // Add | Edit | View
});

// Populate formData whenever mode or tenant changes
watch(() => tenantStore.viewData, (room) => {

    if ((props.mode === "View" || props.mode === "Edit") && room) {
        formData.first_name = room.first_name ?? ""
        formData.last_name = room.last_name ?? ""
        formData.email = room.email ?? ""
        formData.room_id = room.room_id ?? ""
        formData.move_in_date = room.move_in_date ?? ""
        formData.status = room.status ?? ""
    } else {
        // Add mode → reset
        Object.keys(formData).forEach(k => formData[k] = "");
    }
}, { immediate: true });

const submitForm = () => {
    if (props.mode === "Edit") {
        tenantStore.update(tenantStore.viewData.id, { ...formData });
    } else {
        tenantStore.store({ ...formData });
    }
};
</script>

<template>
    <form @submit.prevent="submitForm" class="space-y-5 flex flex-wrap justify-between">
        <BaseInput
            label="First Name"
            v-model="formData.first_name"
            :disabled="isViewMode"
            placeholder="Enter first name"
        />
        <BaseInput
            label="Last Name"
            v-model="formData.last_name"
            :disabled="isViewMode"
            placeholder="Enter last name"
        />
        <BaseInput
            label="Email"
            v-model="formData.email"
            :disabled="isViewMode"
            placeholder="Enter email"
        />
        <BaseInput
            label="Room"
            variant="select"
            :options="roomOptions"
            v-model="formData.room_id"
            :disabled="isViewMode"
        />
        <BaseInput
            label="Move in Date"
            type="date"
            v-model="formData.move_in_date"
            :disabled="isViewMode"
            placeholder="Enter move in date"
        />
        <BaseInput
            label="Status"
            variant="select"
            :options="statusOptions"
            v-model="formData.status"
            :disabled="isViewMode"
        />
        <!-- Actions -->
        <div v-if="props.mode !== 'View'" class="flex justify-end gap-2 pt-4">
            <button type="button" class="px-4 py-2 rounded-lg border" @click="$emit('cancel')">
                Cancel
            </button>
            <button type="submit" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                {{ props.mode }}
            </button>
        </div>
    </form>
</template>