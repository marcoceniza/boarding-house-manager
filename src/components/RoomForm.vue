<script setup>
import { reactive, watch, computed } from "vue";
import dayjs from "dayjs";
import BaseInput from "./base/BaseInput.vue";
import BaseButton from "./base/BaseButton.vue";
import { useRoomStore } from "@/stores/RoomStore";

const roomStore = useRoomStore();

const emit = defineEmits(["close"]);
const props = defineProps({ mode: { type: String, default: "Create" } });

const formData = reactive({
    room_number: "",
    type: "",
    capacity: "",
    price_per_month: "",
    occupied: 0,
    status: 0,
});

const isFetching = computed(() => roomStore.isFormLoading);
const isOccupied = computed(() => formData.status === 1);
const isDisabled = computed(() => props.mode === "View" || isFetching.value);

const options = {
    type: [
        { label: "Single", value: "Single" },
        { label: "Double", value: "Double" },
        { label: "Studio", value: "Studio" },
        { label: "Family", value: "Family" },
    ],
    status: [
        { label: "Available", value:  0 },
        { label: "Occupied", value: 1 },
        { label: "Maintenance", value: 2 },
    ],
};

watch(() => formData.price_per_month, (newVal) => {
    if (!newVal) return;
    let numeric = newVal.toString().replace(/,/g, '').replace(/\D/g, '');

    if (numeric.length > 3) {
        numeric = numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    formData.price_per_month = numeric;
}, { immediate: true });

watch(() => roomStore.viewData, (room) => {
    if (props.mode === "View" || props.mode === "Update") {
        if (room) {
            formData.room_number = room.room_number ?? "";
            formData.type = room.type ?? null;
            formData.capacity = room.capacity ?? "";

            let price = room.price_per_month ?? "";
            if (price) {
                const numeric = price.toString().replace(/\D/g, '');
                formData.price_per_month =
                    numeric.length > 3
                    ? numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : numeric;
            } else {
                formData.price_per_month = "";
            }

            formData.occupied = room.occupied ?? 0;
            formData.status = room.status ?? 0;
            formData.created_at = dayjs(room.created_at).format("MMM D, YYYY • h:mm A") ?? "";
            formData.updated_at = dayjs(room.updated_at).format("MMM D, YYYY • h:mm A") ?? "";
        }
    } else {
        Object.keys(formData).forEach((k) => (formData[k] = ""));
        formData.occupied = 0;
        formData.status = 0;
        formData.type = null;
    }
}, { immediate: true });

const submitForm = async () => {
    let success = false;

    if (props.mode === "Update") {
        success = await roomStore.update(
            roomStore.viewData.id,
            { ...formData }
        );
    } else {
        success = await roomStore.store({ ...formData });
    }

    if (success) {
        emit('close');
        roomStore.errors = {};
    }
};
</script>

<template>
    <form @submit.prevent="submitForm" class="space-y-5 flex flex-wrap justify-between">
        <BaseInput
            label="Room No. *"
            v-model="formData.room_number"
            :disabled="isDisabled"
            placeholder="Enter room no."
            :error="roomStore.errors?.room_number?.[0]"
        />
        <BaseInput
            label="Type *"
            v-model="formData.type"
            variant="select"
            :options="options.type"
            :disabled="isDisabled"
            placeholder="Choose a room type"
            :error="roomStore.errors?.type?.[0]"
        />
        <BaseInput
            label="Capacity *"
            v-model="formData.capacity"
            :disabled="isDisabled || isOccupied"
            placeholder="Enter room capacity"
            :error="roomStore.errors?.capacity?.[0]"
        />
        <BaseInput
            label="Price / Month *"
            v-model="formData.price_per_month"
            :disabled="isDisabled"
            placeholder="Enter room price"
            :error="roomStore.errors?.price_per_month?.[0]"
        />
        <BaseInput
            label="Occupied *"
            v-model="formData.occupied"
            :disabled="
                props.mode === 'Create' ||
                props.mode === 'Update' ||
                isDisabled
            "
            placeholder="Enter number of occupants"
        />
        <BaseInput
            label="Status *"
            v-model="formData.status"
            variant="select"
            :options="options.status"
            :disabled="
                props.mode === 'Create' ||
                props.mode === 'Update' ||
                isDisabled
            "
        />
        <BaseInput
            v-if="props.mode === 'View'"
            label="Created at"
            v-model="formData.created_at"
            :disabled="props.mode === 'Create' || isDisabled"
        />
        <BaseInput
            v-if="props.mode === 'View'"
            label="Updated at"
            v-model="formData.updated_at"
            :disabled="props.mode === 'Create' || isDisabled"
        />

        <div v-if="props.mode !== 'View'" class="flex justify-end w-full gap-2 pt-4">
            <BaseButton
                variant="secondary"
                size="sm"
                :disabled="isFetching"
                @click="emit('close'); roomStore.clearErrors()"
            >
                Cancel
            </BaseButton>
            <BaseButton
                type="submit"
                size="sm"
                :loading="isFetching"
                :disabled="isFetching"
            >
                <span v-if="isFetching">
                    {{ props.mode === 'Create' ? 'Creating...' : 'Updating...' }}
                </span>
                <span v-else>
                    {{ props.mode }}
                </span>
            </BaseButton>
        </div>
    </form>
</template>