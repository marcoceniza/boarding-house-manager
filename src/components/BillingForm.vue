<script setup>
import { reactive, watch, computed, onMounted } from "vue";
import dayjs from "dayjs";
import BaseInput from "./base/BaseInput.vue";
import BaseButton from "./base/BaseButton.vue";
import { useTenantStore } from "@/stores/TenantStore";
import { useRoomStore } from "@/stores/RoomStore";
import { useBillingStore } from "@/stores/BillingStore";

const tenantStore = useTenantStore();
const roomStore = useRoomStore();
const billingStore = useBillingStore();

const emit = defineEmits(["close"]);
const props = defineProps({ mode: { type: String, default: "Create" } });

const formData = reactive({
    tenant_id: "",
    billing_period: dayjs().format("YYYY-MM"),
    rent: "",
    water: "",
    electricity: "",
    due_date: "",
    status: "",
});

const isViewMode = computed(() => props.mode === "View");
const isFetching = computed(() => billingStore.isFormLoading);
const isDisabled = computed(() => props.mode === "View" || isFetching.value);

const months = computed(() => {
    const list = [];
    for (let i = 0; i < 12; i++) {
        const month = dayjs().subtract(i, "month");
        list.push({ label: month.format("MMMM YYYY"), value: month.format("YYYY-MM") });
    }
    return list;
});

watch(() => billingStore.viewData, (billing) => {
    if (props.mode === "View" || props.mode === "Update") {
        if (billing) {
            formData.tenant_id = billing.tenant_id ?? "";
            formData.billing_period = billing.billing_period ?? "";
            formData.rent = billing.rent ?? "";
            formData.water = billing.water ?? "";
            formData.electricity = billing.electricity ?? "";
            formData.due_date = billing.due_date ?? "";
            formData.status = billing.status ?? "";
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
        success = await billingStore.update(
            billingStore.viewData.id,
            { ...formData }
        );
    } else {
        success = await billingStore.store({ ...formData });
    }

    if (success) {
        emit('close');
        billingStore.errors = {};
    }
};

onMounted(() => { roomStore.index() });
</script>

<template>
    <form @submit.prevent="submitForm" class="space-y-5 flex flex-wrap justify-between">
        <BaseInput
            label="Tenant"
            variant="select"
            v-model="formData.tenant_id"
            :disabled="isViewMode"
            :error="billingStore.errors?.tenant_id?.[0]"
        />
        <BaseInput
            label="Billing Period"
            variant="select"
            :options="months"
            v-model="formData.billing_period"
            :disabled="isViewMode"
            :error="billingStore.errors?.billing_period?.[0]"
        />
        <BaseInput
            label="Rent"
            type="number"
            v-model="formData.rent"
            placeholder="Enter rent"
            :disabled="isViewMode"
            :error="billingStore.errors?.rent?.[0]"
        />
        <BaseInput
            label="Water"
            type="number"
            v-model="formData.water"
            placeholder="Enter water"
            :disabled="isViewMode"
            :error="billingStore.errors?.water?.[0]"
        />
        <BaseInput
            label="Electricity"
            type="number"
            v-model="formData.electricity"
            placeholder="Enter electricity"
            :disabled="isViewMode"
            :error="billingStore.errors?.electricity?.[0]"
        />
        <BaseInput
            label="Due Date"
            type="date"
            v-model="formData.due_date"
            :disabled="isViewMode"
            :error="billingStore.errors?.due_date?.[0]"
        />

        <div v-if="props.mode !== 'View'" class="flex justify-end w-full gap-2 pt-4">
            <BaseButton
                variant="secondary"
                size="sm"
                :disabled="isFetching"
                @click="emit('close'); billingStore.clearErrors()"
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