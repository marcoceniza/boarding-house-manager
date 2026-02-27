<script setup>
import { onMounted } from "vue";
import dayjs from "dayjs";
import { PlusIcon, InboxArrowDownIcon } from '@heroicons/vue/24/outline';
import BaseButton from "@/components/base/BaseButton.vue";
import StatusBadge from "@/components/StatusBadge.vue";
import ActionButtons from "@/components/ActionButtons.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import BillingForm from "@/components/BillingForm.vue";
import ConfirmDelete from "@/components/ConfirmDelete.vue";
import { useBillingStore } from "@/stores/BillingStore";
import { useRoomStore } from "@/stores/RoomStore";
import ConfirmSendInvoice from "@/components/ConfirmSendInvoice.vue";

const billingStore = useBillingStore();
const roomStore = useRoomStore();

const openAddBilling = () => {
    billingStore.selectedBilling = null;
    billingStore.currentMode = "Create";
    billingStore.isOpenModal = true;
};
const openViewBilling = (billing) => {
    billingStore.currentMode = 'View';
    billingStore.clearViewData();
    billingStore.isOpenModal = true;
    billingStore.show(billing.id);
}
const openEditBilling = (billing) => {
    billingStore.currentMode = 'Update';
    billingStore.clearViewData();
    billingStore.isOpenModal = true;
    billingStore.show(billing.id);
}
const openDeleteBilling = (billing) => {
    billingStore.currentMode = 'Delete';
    billingStore.selectedBilling = billing;
    billingStore.isOpenDeleteModal = true;
}
const confirmBillingDelete = async () => {
    await billingStore.destroy(billingStore.selectedBilling.id);
    billingStore.isOpenDeleteModal = false;
}
const openSendInvoice = (invoice) => {
    billingStore.selectedInvoice = invoice;
    billingStore.isOpenSendInvoiceModal = true;
}
const confirmSendInvoice = async () => {
    await billingStore.sendInvoice(billingStore.selectedInvoice.id);
    billingStore.isOpenSendInvoiceModal = false;
}
const formatPrice = (price) => {
    const numeric = price.toString().replace(/\D/g, '');

    return numeric.length > 3
        ? numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : numeric;
}

onMounted( async () => {
    await roomStore.index();
});
</script>

<template>
    <div class="flex justify-end items-center my-4">
        <BaseButton variant="success" size="sm" @click="openAddBilling">
            <PlusIcon class="size-4" /> Create Billing
        </BaseButton>
    </div>

    <!-- DESKTOP -->
    <div class="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        <table class="min-w-full border border-gray-200">
            <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                    <th class="px-4 py-3 text-left">Tenant</th>
                    <th class="px-4 py-3 text-left">Tenant Email</th>
                    <th class="px-4 py-3 text-left">Rent</th>
                    <th class="px-4 py-3 text-left">Water</th>
                    <th class="px-4 py-3 text-left">Electricity</th>
                    <th class="px-4 py-3 text-left">Billing Period</th>
                    <th class="px-4 py-3 text-left">Due Date</th>
                    <th class="px-4 py-3 text-left">Status</th>
                    <th class="px-4 py-3 text-left">Total</th>
                    <th class="px-4 py-3 text-center">Actions</th>
                    <th class="px-4 py-3 text-center">Invoice</th>
                </tr>
            </thead>
            <tbody class="divide-y text-sm">
                <tr v-if="billingStore.isListLoading"> 
                    <td class="text-center text-gray-500 h-15" colspan="11">Loading...</td>
                </tr> 
                <tr v-else-if="billingStore.billings.length === 0"> 
                    <td class="text-center text-gray-500 h-15" colspan="11">No Data</td>
                </tr>
                <tr v-else v-for="billing in billingStore.billings" :key="billing.id">
                    <td class="px-4 py-3 font-medium">{{ billing?.tenant?.first_name }} {{ billing?.tenant?.last_name }}</td>
                    <td class="px-4 py-3 font-medium">{{ billing.tenant.email }}</td>
                    <td class="px-4 py-3 font-medium">₱{{ formatPrice(billing.rent) }}</td>
                    <td class="px-4 py-3 font-medium">₱{{ billing.water }}</td>
                    <td class="px-4 py-3 font-medium">₱{{ billing.electricity }}</td>
                    <td class="px-4 py-3 font-medium">{{ dayjs(billing.billing_period).format('MMMM YYYY') }}</td>
                    <td class="px-4 py-3 font-medium">{{ dayjs(billing.due_date).format('MMMM D, YYYY') }}</td>
                    <td class="px-4 py-3">
                        <StatusBadge :status="billing.status" item="billing" />
                    </td>
                    <td class="px-4 py-3 text-red-500 font-bold">₱{{ formatPrice(billing.total) }}</td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <ActionButtons
                            :item="billing"
                            @view="openViewBilling(billing)"
                            @edit="openEditBilling(billing)"
                            @delete="openDeleteBilling(billing)"
                        />
                    </td>
                    <td class="text-center">
                        <BaseButton
                            variant="danger"
                            size="sm"
                            @click="openSendInvoice(billing)"
                        >
                            <InboxArrowDownIcon class="size-4" />
                        </BaseButton>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- MOBILE -->
    <div class="md:hidden">
        <div
            v-if="billingStore.isListLoading"
            class="bg-white rounded-lg shadow p-6 text-center text-gray-500"
        >
            Loading...
        </div>
        <div
            v-else-if="billingStore.billings.length === 0"
            class="bg-white rounded-lg shadow p-6 text-center text-gray-500"
        >
            No Data
        </div>
        <div v-else class="space-y-4">
            <div
                v-for="billing in billingStore.billings"
                :key="billing.id"
                class="bg-white rounded-lg shadow p-4"
            >
                <div class="flex justify-between items-center">
                    <h3 class="font-bold text-lg">Billing</h3>
                    <StatusBadge :status="billing.status" item="billing" />
                </div>

                <div class="mt-3 text-sm space-y-1 text-gray-600">
                    <p><strong>Tenant:</strong> {{ billing?.tenant?.first_name }} {{ billing?.tenant?.last_name }}</p>
                    <p><strong>Tenant Email:</strong> {{ billing?.tenant?.email }}</p>
                    <p><strong>Rent:</strong> ₱{{ formatPrice(billing.rent) }}</p>
                    <p><strong>Water:</strong> ₱{{ billing.water }}</p>
                    <p><strong>Electricity:</strong> ₱{{ billing.electricity }}</p>
                    <p><strong>Billing Period:</strong> {{ dayjs(billing.billing_period).format('MMMM YYYY') }}</p>
                    <p><strong>Due Date:</strong> {{ dayjs(billing.due_date).format('MMMM D, YYYY') }}</p>
                    <p class="text-xl"><strong>Total:</strong> <b class="text-red-500">₱{{ formatPrice(billing.total) }}</b></p>
                </div>

                <div class="mt-4 flex gap-2 justify-end">
                    <ActionButtons
                        :item="billing"
                        @view="openViewBilling(billing)"
                        @edit="openEditBilling(billing)"
                        @delete="openDeleteBilling(billing)"
                    />
                    <BaseButton
                        variant="danger"
                        size="sm"
                        @click="openSendInvoice(billing)"
                    >
                        <InboxArrowDownIcon class="size-4" />
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <BaseModal
        v-model:isOpen="billingStore.isOpenModal"
        :title="billingStore.currentMode"
        @close="billingStore.isOpenModal = false; billingStore.clearViewData()"
    >
        <div v-if="billingStore.isViewLoading">
            <div class="space-y-2 p-6">
                <div class="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div class="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                <div class="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            </div>
        </div>
        <BillingForm
            v-else
            :mode="billingStore.currentMode"
            @close="billingStore.isOpenModal = false"
        />
    </BaseModal>

    <!-- Delete confirm billing -->
    <ConfirmDelete
        :isOpen="billingStore.isOpenDeleteModal"
        title="Delete Biling"
        :message="`Delete billing for ${billingStore.selectedBilling?.tenant?.first_name} ${billingStore.selectedBilling?.tenant?.last_name}?`"
        :loading="billingStore.isDeleteLoading"
        @confirm="confirmBillingDelete"
        @close="billingStore.isOpenDeleteModal = false"
    />

    <!-- Confirm send invoice -->
    <ConfirmSendInvoice
        :isOpen="billingStore.isOpenSendInvoiceModal"
        title="Send Invoice"
        :message="billingStore.selectedInvoice"
        :loading="billingStore.isSendInvoiceLoading"
        @confirm="confirmSendInvoice"
        @close="billingStore.isOpenSendInvoiceModal = false"
    />
</template>