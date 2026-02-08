<script setup>
import { reactive, watch, computed, ref } from "vue";
import BaseInput from "./base/BaseInput.vue";

const props = defineProps({
    data:{ type: Object, default: null },
    mode: { type: String, default: "add" } // add | edit | view
});
const emit = defineEmits(["submit", "cancel"]);
const form = reactive({
    name: "",
    email: "",
    room: "",
    contact: "",
});

// populate form when editing / viewing
watch(() => props.data,
    (newData) => {
        if (newData) {
            form.name = newData.name ?? "";
            form.email = newData.email ?? "";
            form.room = newData.room ?? "";
            form.contact = newData.contact ?? "";
        }
    },
    { immediate: true }
);

// read-only when viewing
const isViewMode = computed(() => props.mode === "view");
const submitForm = () => emit("submit", { ...form });
const rooms = ref(['Single', 'Shared']);
const status = ref(['Available', 'Full']);
const test = ref('');
</script>
<template>
    <form @submit.prevent="submitForm" class="space-y-5">
        <BaseInput
            label="Room No."
            :disabled="isViewMode"
            placeholder="Enter room no."
        />
        <BaseInput
            label="Type"
            v-model="test"
            variant="select"
            :options="rooms"
            :disabled="isViewMode"
            placeholder="Choose a room"
        />
        <BaseInput
            label="Capacity"
            :disabled="isViewMode"
            placeholder="Enter room capacity"
        />
        <BaseInput
            label="Price / Month"
            :disabled="isViewMode"
            placeholder="Enter room price / month"
        />
        <BaseInput
            label="Occupied"
            :disabled="isViewMode"
            placeholder="Enter occupied"
        />
        <BaseInput
            label="Status"
            v-model="test"
            variant="select"
            :options="status"
            :disabled="isViewMode"
        />
        <!-- Actions -->
        <div v-if="!isViewMode" class="flex justify-end gap-2 pt-4">
            <button
                type="button"
                class="px-4 py-2 rounded-lg border"
                @click="$emit('cancel')"
                >
            Cancel
            </button>
            <button
                type="submit"
                class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
            {{ props.mode === "edit" ? "Update" : "Save" }}
            </button>
        </div>
    </form>
</template>