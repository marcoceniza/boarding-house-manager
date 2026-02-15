<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import { useBillingStore } from "@/stores/BillingStore";
import BaseModal from "@/components/base/BaseModal.vue";
import BillingForm from "@/components/BillingForm.vue";

const billingStore = useBillingStore();

const showModal = ref(false);
const currentMode = ref("Add");
const selectedBilling = ref(null);

// Handlers
const openAddBilling = () => {
    selectedBilling.value = null;
    currentMode.value = "Add";
    showModal.value = true;
};
</script>

<template>
    <div class="flex justify-end items-center my-4">
        <button
            @click="openAddBilling"
            class="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
        >
            + Add Billing
        </button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-x-auto">
        <table class="min-w-full border border-gray-200">
            <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                    <th class="px-4 py-3 text-left">Tenant</th>
                    <th class="px-4 py-3 text-left">Tenant Email</th>
                    <th class="px-4 py-3 text-left">Billing Period</th>
                    <th class="px-4 py-3 text-left">Rent</th>
                    <th class="px-4 py-3 text-left">Water</th>
                    <th class="px-4 py-3 text-left">Electricity</th>
                    <th class="px-4 py-3 text-left">Total</th>
                    <th class="px-4 py-3 text-left">Due Date</th>
                    <th class="px-4 py-3 text-left">Status</th>
                    <th>Invoice</th>
                    <th class="px-4 py-3 text-center">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 text-sm">
                <tr v-if="billingStore.billings.length === 0">
                    <td class="text-center text-gray-500 py-10" colspan="11">No Data</td>
                </tr>
                <tr v-else v-for="billing in billingStore.billings" :key="billing.id" class="hover:bg-gray-50">
                    <td class="px-4 py-3 font-medium">{{ billing.tenant.first_name }} {{ billing.tenant.last_name }}</td>
                    <td class="px-4 py-3 font-medium">{{ billing.tenant.email }}</td>
                    <td class="px-4 py-3 font-medium">{{ dayjs(billing.billing_period).format('MMMM YYYY') }}</td>
                    <td class="px-4 py-3 font-medium">₱{{ billing.rent.toFixed(2) }}</td>
                    <td class="px-4 py-3 font-medium">₱{{ billing.water.toFixed(2) }}</td>
                    <td class="px-4 py-3 font-medium">₱{{ billing.electricity.toFixed(2) }}</td>
                    <td class="px-4 py-3 font-medium">₱{{ billing.total.toFixed(2) }}</td>
                    <td class="px-4 py-3 font-medium">{{ dayjs(billing.due_date).format('MMMM D, YYYY') }}</td>
                    <td class="px-4 py-3 font-medium">{{ billing.status }}</td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <button
                            @click="billingStore.sendInvoice(billing.id)"
                            class="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Send Invoice
                        </button>
                    </td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <button
                            @click="billingStore.show(billing.id); currentMode = 'View'; showModal = true"
                            class="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            View
                        </button>
                        <button
                            @click="billingStore.show(billing.id); currentMode = 'Edit'; showModal = true"
                            class="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Edit
                        </button>
                        <button
                            @click="billingStore.delete(billing.id)"
                            class="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Modal -->
    <BaseModal
        :show="showModal"
        @close="showModal = false; billingStore.clearViewData()"
    >
        <BillingForm :mode="currentMode" />
    </BaseModal>
</template>