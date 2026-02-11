<script setup>
import { reactive, watch, computed } from "vue";
import BaseInput from "./base/BaseInput.vue";
import { useRoomStore } from "@/stores/RoomStore";

const roomStore = useRoomStore();

const props = defineProps({
    mode: { type: String, default: "Add" }, // Add | Edit | View
});

const formData = reactive({
    room_number: "",
    type: "",
    capacity: "",
    price_per_month: "",
    occupied: "",
    status: "",
});

// Disable inputs in View mode
const isViewMode = computed(() => props.mode === "View");

const typeOptions = [
    { label: "Single", value: "Single" },
    { label: "Double", value: "Double" },
    { label: "Studio", value: "Studio" },
    { label: "Family", value: "Family" },
];

const statusOptions = [
    { label: "Available", value: "Available" },
    { label: "Full", value: "Full" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Family", value: "Family" },
];

// Populate formData whenever mode or room changes
watch(() => roomStore.viewData, (room) => {

    if (props.mode === "View" || props.mode === "Edit") {
        if (room) {
            formData.room_number = room.room_number ?? ""
            formData.type = room.type ?? ""
            formData.capacity = room.capacity ?? ""
            formData.price_per_month = room.price_per_month ?? ""
            formData.occupied = room.occupied ?? ""
            formData.status = room.status ?? ""
        }
    } else {
        // Add mode → reset
        Object.keys(formData).forEach(k => formData[k] = "")
    }
}, { immediate: true });

const submitForm = () => {
    if (props.mode === "Edit") {
        roomStore.update(roomStore.viewData.id, { ...formData });
    } else {
        roomStore.store({ ...formData });
    }
};
</script>

<template>
    <form @submit.prevent="submitForm" class="space-y-5">
        <BaseInput
            label="Room No."
            v-model="formData.room_number"
            :disabled="isViewMode"
            placeholder="Enter room no."
        />
        <BaseInput
            label="Type"
            v-model="formData.type"
            variant="select"
            :options="typeOptions"
            :disabled="isViewMode"
            placeholder="Choose a room"
        />
        <BaseInput
            label="Capacity"
            v-model="formData.capacity"
            :disabled="isViewMode"
            placeholder="Enter room capacity"
        />
        <BaseInput
            label="Price / Month"
            v-model="formData.price_per_month"
            :disabled="isViewMode"
            placeholder="Enter room price"
        />
        <BaseInput
            label="Occupied"
            v-model="formData.occupied"
            :disabled="isViewMode"
            placeholder="Enter occupied (0,1,2...)"
        />
        <BaseInput
            label="Status"
            v-model="formData.status"
            variant="select"
            :options="statusOptions"
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