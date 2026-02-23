<script setup>
import { reactive, watch, computed } from "vue";
import dayjs from "dayjs";
import BaseInput from "./base/BaseInput.vue";
import BaseButton from "./base/BaseButton.vue";
import { useTenantStore } from "@/stores/TenantStore";
import { useBillingStore } from "@/stores/BillingStore";
import { onMounted } from "vue";
import { useRoomStore } from "@/stores/RoomStore";

const tenantStore = useTenantStore();
const billingStore = useBillingStore();
const roomStore = useRoomStore();

const emit = defineEmits(["close"]);
const props = defineProps({ mode: { type: String, default: "Create" } });

const formData = reactive({
    tenant_id: "",
    billing_period: "",
    rent: "",
    water: "",
    electricity: "",
    due_date: "",
    status: "",
});

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

const tenantOptions = computed(() => {
    const billedTenantIds = billingStore.billings.map(b => b.tenant.id);

    return tenantStore.tenants
        .filter(tenant => tenant.status === 1 &&
            (!billedTenantIds.includes(tenant.id) || tenant.id === formData.tenant_id)
        )
        .map(tenant => ({
            label: `${tenant.first_name} ${tenant.last_name}`,
            value: tenant.id,
        }));
});

const displayDueDate = computed(() => {
    if (!formData.due_date) return '';
    return dayjs(formData.due_date).format('MMMM D, YYYY');
});

watch(() => formData.rent, (newVal) => {
    if (!newVal) return;
    let numeric = newVal.toString().replace(/,/g, '').replace(/\D/g, '');

    if (numeric.length > 3) {
        numeric = numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    formData.rent = numeric;
}, { immediate: true });

watch(() => billingStore.viewData, (billing) => {
    if (props.mode === "View" || props.mode === "Update") {
        if (!billing) return;

        formData.tenant_id = billing.tenant_id ?? null;
        formData.billing_period = billing.billing_period ?? "";

        const rent = billing.tenant?.room?.price_per_month ?? 0;
        formData.rent = rent
            ? rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : "";

        formData.water = billing.water ?? 0;
        formData.electricity = billing.electricity ?? 0;

        formData.due_date = billing.due_date
            ? dayjs(billing.due_date).format("YYYY-MM-DD")
            : null;

        formData.status = billing.status ?? 0;

    } else if (props.mode === "Create") {

        Object.keys(formData).forEach(k => formData[k] = "");

        formData.status = 0;
        formData.tenant_id = null;
        formData.billing_period = dayjs().format("YYYY-MM");
        formData.due_date = dayjs().format("YYYY-MM-DD");
        formData.rent = 0;
    }
}, { immediate: true });

watch(() => formData.tenant_id, (tenantId) => {
    if (!tenantId || props.mode === "View") {
        formData.rent = "";
        return;
    }

    const tenant = tenantStore.tenants.find(t => t.id === tenantId);

    if (tenant?.room) {
        let rent = tenant.room.price_per_month ?? 0;
        const numeric = rent.toString().replace(/\D/g, '');
        formData.rent = numeric.length > 3
            ? numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : numeric;
    } else {
        formData.rent = "";
    }
});

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

onMounted( async () => {
    await roomStore.index();
    await billingStore.index();
    await tenantStore.index();
});
</script>

<template>
    <form @submit.prevent="submitForm" class="space-y-5 flex flex-wrap justify-between">
        <BaseInput
            label="Tenant"
            variant="select"
            :options="tenantOptions"
            v-model="formData.tenant_id"
            :disabled="isDisabled || props.mode === 'Update'"
            placeholder="Select tenant"
            :error="billingStore.errors?.tenant_id?.[0]"
        />
        <BaseInput
            label="Billing Period"
            variant="select"
            :options="months"
            v-model="formData.billing_period"
            :disabled="isDisabled || props.mode === 'Create' || props.mode === 'Update'"
            placeholder="Select billing period"
            :error="billingStore.errors?.billing_period?.[0]"
        />
        <BaseInput
            label="Rent"
            v-model="formData.rent"
            placeholder="Enter rent"
            :disabled="isDisabled || props.mode === 'Create' || props.mode === 'Update'"
            note="Note: Auto-populated after selecting a tenant."
            :isMode="props.mode"
            :error="billingStore.errors?.rent?.[0]"
        />
        <BaseInput
            label="Water"
            type="number"
            v-model="formData.water"
            placeholder="Enter water"
            :disabled="isDisabled"
            :error="billingStore.errors?.water?.[0]"
        />
        <BaseInput
            label="Electricity"
            type="number"
            v-model="formData.electricity"
            placeholder="Enter electricity"
            :disabled="isDisabled"
            :error="billingStore.errors?.electricity?.[0]"
        />
        <BaseInput
            label="Due Date"
            :type="props.mode === 'View' ? 'text' : 'date'"
            :model-value="props.mode === 'View' ? displayDueDate : formData.due_date"
            @update:model-value="val => formData.due_date = val"
            :disabled="isDisabled"
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