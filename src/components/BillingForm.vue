<script setup>
import { reactive, watch, computed } from "vue";
import dayjs from "dayjs";
import BaseInput from "./base/BaseInput.vue";
import { useBillingStore } from "@/stores/BillingStore";
import { useTenantStore } from "@/stores/TenantStore";

const billingStore = useBillingStore();
const tenantStore = useTenantStore();

const props = defineProps({
    mode: { type: String, default: "Add" }, // Add | Edit | View
});

const formData = reactive({
    tenant_id: "",
    billing_period: dayjs().format("YYYY-MM"),
    rent: "",
    water: "",
    electricity: "",
    due_date: "",
    status: "",
});

// View mode check
const isViewMode = computed(() => props.mode === "View");

// Select options
const statusOptions = [
    { label: "Unpaid", value: "Unpaid" },
    { label: "Paid", value: "Paid" },
    { label: "Overdue", value: "Overdue" },
];

// Tenant dropdown (display name, value = id)
const tenantOptions = computed(() =>
    tenantStore.tenants.map(t => ({
        label: `${t.first_name} ${t.last_name}`,
        value: t.id,
    }))
);

const months = computed(() => {
    const list = [];
    for (let i = 0; i < 12; i++) {
        const month = dayjs().subtract(i, "month");
        list.push({ label: month.format("MMMM YYYY"), value: month.format("YYYY-MM") });
    }
    return list;
});

// Populate form when viewing / editing
watch(() => billingStore.viewData, (billing) => {
    
    if ((props.mode === "View" || props.mode === "Edit") && billing) {
        formData.tenant_id = billing.tenant_id ?? "";
        formData.billing_period = billing.billing_period ?? "";
        formData.rent = billing.rent ?? "";
        formData.water = billing.water ?? "";
        formData.electricity = billing.electricity ?? "";
        formData.due_date = billing.due_date ?? "";
        formData.status = billing.status ?? "";
    }else {
        // Add mode → reset
        Object.keys(formData).forEach(k => (formData[k] = ""));
    }
}, { immediate: true });

const total = computed(() => {
    const r = parseFloat(formData.rent) || 0;
    const w = parseFloat(formData.water) || 0;
    const e = parseFloat(formData.electricity) || 0;
    return r + w + e;
});

// Submit handler
const submitForm = () => {
    if (props.mode === "Edit") {
        billingStore.update(billingStore.viewData.id, { ...formData });
    } else {
        billingStore.store({ ...formData });
    }
};
</script>

<template>
    <form @submit.prevent="submitForm" class="space-y-5">
        <BaseInput
            label="Tenant"
            variant="select"
            :options="tenantOptions"
            option-label="label"
            option-value="value"
            v-model="formData.tenant_id"
            :disabled="isViewMode"
        />
        <BaseInput
            label="Billing Period"
            variant="select"
            :options="months"
            v-model="formData.billing_period"
            :disabled="isViewMode"
        />
        <BaseInput
            label="Rent"
            type="number"
            v-model="formData.rent"
            placeholder="Enter rent"
            :disabled="isViewMode"
        />
        <BaseInput
            label="Water"
            type="number"
            v-model="formData.water"
            placeholder="Enter water"
            :disabled="isViewMode"
        />
        <BaseInput
            label="Electricity"
            type="number"
            v-model="formData.electricity"
            placeholder="Enter electricity"
            :disabled="isViewMode"
        />
        <BaseInput
            label="Due Date"
            type="date"
            v-model="formData.due_date"
            :disabled="isViewMode"
        />
        <BaseInput
            label="Status"
            variant="select"
            :options="statusOptions"
            v-model="formData.status"
            :disabled="isViewMode"
        />
        <BaseInput
            label="Total"
            :value="total"
            :disabled="true"
        />
        <!-- Actions -->
        <div v-if="props.mode !== 'View'" class="flex justify-end gap-2 pt-4">
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
                {{ props.mode }}
            </button>
        </div>
    </form>
</template>