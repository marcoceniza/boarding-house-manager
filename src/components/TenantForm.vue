<script setup>
import { reactive, watch, computed, onMounted } from "vue";
import dayjs from "dayjs";
import BaseInput from "./base/BaseInput.vue";
import BaseButton from "./base/BaseButton.vue";
import { useTenantStore } from "@/stores/TenantStore";
import { useRoomStore } from "@/stores/RoomStore";

const tenantStore = useTenantStore();
const roomStore = useRoomStore();

const emit = defineEmits(["close"]);
const props = defineProps({ mode: { type: String, default: "Create" } });

const formData = reactive({
    first_name: "",
    last_name: "",
    email: "",
    room_id: "",
    move_in_date: "",
    occupied: "",
    status: "",
});

const isFetching = computed(() => tenantStore.isFormLoading);
const isDisabled = computed(() => props.mode === "View" || isFetching.value);

const options = {
    status: [
        { label: "Inactive", value: 0 },
        { label: "Active", value: 1 },
        { label: "Left", value: 2 },
    ],
};

const roomOptions = computed(() => {
    return roomStore.rooms
        .filter(room => room.status === 0 || room.id === formData.room_id)
        .map(room => ({
            label: room.room_number,
            value: room.id,
        }));
});

watch(() => tenantStore.viewData, (tenant) => {
    if (props.mode === "View" || props.mode === "Update") {
        if (tenant) {
            formData.first_name = tenant.first_name ?? "";
            formData.last_name = tenant.last_name ?? "";
            formData.email = tenant.email ?? "";
            formData.room_id = tenant.room?.id ?? null;
            formData.move_in_date = tenant.move_in_date ? dayjs(tenant.move_in_date).format("YYYY-MM-DD") : null;
            formData.occupied = tenantStore.getOccupied ?? "";
            formData.status = tenant.status ?? "";
            formData.created_at = dayjs(tenant.created_at).format("MMM D, YYYY • h:mm A") ?? "";
            formData.updated_at = dayjs(tenant.updated_at).format("MMM D, YYYY • h:mm A") ?? "";
        }
    } else {
        Object.keys(formData).forEach((k) => (formData[k] = ""));
        formData.occupied = null;
        formData.status = 1;
        formData.room_id = null;
    }
}, { immediate: true });

const submitForm = async () => {
    let success = false;

    if (props.mode === "Update") {
        success = await tenantStore.update(
            tenantStore.viewData.id,
            { ...formData }
        );
    } else {
        success = await tenantStore.store({ ...formData });
    }

    if (success) {
        emit('close');
        tenantStore.errors = {};
    }
};

onMounted(() => { roomStore.index() });
</script>

<template>
    <form @submit.prevent="submitForm" class="space-y-5 flex flex-wrap justify-between">
        <BaseInput
            label="First Name *"
            v-model="formData.first_name"
            :disabled="isDisabled"
            placeholder="Enter first name"
            :error="tenantStore.errors?.first_name?.[0]"
        />
        <BaseInput
            label="Last Name *"
            v-model="formData.last_name"
            :disabled="isDisabled"
            placeholder="Enter last name"
            :error="tenantStore.errors?.last_name?.[0]"
        />
        <BaseInput
            label="Email *"
            v-model="formData.email"
            :disabled="isDisabled"
            placeholder="Enter email"
            :error="tenantStore.errors?.email?.[0]"
        />
        <BaseInput
            label="Room *"
            variant="select"
            :options="roomOptions"
            placeholder="Select Room"
            v-model="formData.room_id"
            :disabled="isDisabled"
            :error="tenantStore.errors?.room_id?.[0]"
        />
        <BaseInput
            v-if="props.mode === 'Create'"
            label="Occupied *"
            v-model="formData.occupied"
            :disabled="isDisabled"
            placeholder="Number of occupants"
            :error="tenantStore.errors?.occupied?.[0]"
        />
        <BaseInput
            label="Move in Date *"
            type="date"
            v-model="formData.move_in_date"
            :disabled="isDisabled"
            placeholder="Enter move in date"
            :error="tenantStore.errors?.move_in_date?.[0]"
        />
        <BaseInput
            v-if="props.mode !== 'Create'"
            label="Status *"
            variant="select"
            :options="options.status"
            v-model="formData.status"
            :disabled="
                props.mode === 'Create' ||
                props.mode === 'Update' ||
                isDisabled
            "
            :error="tenantStore.errors?.status?.[0]"
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
                @click="emit('close'); tenantStore.clearErrors()"
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