<script setup>
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
import { useTenantStore } from "@/stores/TenantStore";
import { PlusIcon, UserMinusIcon } from '@heroicons/vue/24/outline';
import BaseButton from "@/components/base/BaseButton.vue";
import StatusBadge from "@/components/StatusBadge.vue";
import ActionButtons from "@/components/ActionButtons.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import TenantForm from "@/components/TenantForm.vue";
import ConfirmDelete from "@/components/ConfirmDelete.vue";
import { useRoomStore } from "@/stores/RoomStore";
import ConfirmEndTenancy from "@/components/ConfirmEndTenancy.vue";

const tenantStore = useTenantStore();
const roomStore = useRoomStore();

const isEndTenancy = ref(false);
const selectedTenantId = ref(null);

const openAddTenant = () => {
    tenantStore.selectedTenant = null;
    tenantStore.currentMode = "Create";
    tenantStore.isOpenModal = true;
};
const openViewTenant = (tenant) => {
    tenantStore.currentMode = 'View';
    tenantStore.clearViewData();
    tenantStore.isOpenModal = true;
    tenantStore.show(tenant.id);
}
const openEditTenant = (tenant) => {
    tenantStore.currentMode = 'Update';
    tenantStore.clearViewData();
    tenantStore.isOpenModal = true;
    tenantStore.show(tenant.id, tenant.room.occupied);
}
const openDeleteTenant = (tenant) => {
    tenantStore.currentMode = 'Delete';
    tenantStore.selectedTenant = tenant;
    tenantStore.isOpenDeleteModal = true;
}
const openEndTenancy = (tenant) => {
    selectedTenantId.value = tenant.id;
    tenantStore.selectedTenant = tenant;
    isEndTenancy.value = true;
};
const confirmEndTenancy = async () => {
    if (!selectedTenantId.value) return;

    await tenantStore.endTenancy(selectedTenantId.value);
    isEndTenancy.value = false;
    selectedTenantId.value = null;
};
const confirmTenantDelete = async () => {
    await tenantStore.destroy(tenantStore.selectedTenant.id);
    tenantStore.isOpenDeleteModal = false;
}

onMounted(() => { roomStore.index() });
</script>

<template>
    <div class="flex justify-end items-center my-4">
        <BaseButton variant="success" size="sm" @click="openAddTenant">
            <PlusIcon class="size-4" /> Create Tenant
        </BaseButton>
    </div>

    <!-- DESKTOP -->
    <div class="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        <table class="min-w-full border border-gray-200">
            <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                    <th class="px-4 py-3 text-left">Firstname</th>
                    <th class="px-4 py-3 text-left">Lastname</th>
                    <th class="px-4 py-3 text-left">Email</th>
                    <th class="px-4 py-3 text-left">Room No.</th>
                    <th class="px-4 py-3 text-left">Move in Date</th>
                    <th class="px-4 py-3 text-left">Status</th>
                    <th class="px-4 py-3 text-center">Actions</th>
                    <th class="px-4 py-3 text-center">End Tenancy</th>
                </tr>
            </thead>

            <tbody class="divide-y text-sm">
                <tr v-if="tenantStore.isListLoading"> 
                    <td class="text-center text-gray-500 h-15" colspan="8">Loading...</td> 
                </tr> 
                <tr v-else-if="tenantStore.tenants.length === 0"> 
                    <td class="text-center text-gray-500 h-15" colspan="8">No Data</td> 
                </tr>
                <tr v-else v-for="tenant in tenantStore.tenants" :key="tenant.id">
                    <td class="px-4 py-3 font-medium">{{ tenant.first_name }}</td>
                    <td class="px-4 py-3 font-medium">{{ tenant.last_name }}</td>
                    <td class="px-4 py-3 font-medium">{{ tenant.email }}</td>
                    <td class="px-4 py-3 font-medium">{{ tenant.room?.room_number ?? '-' }}</td>
                    <td class="px-4 py-3 font-medium">{{ dayjs(tenant.move_in_date).format('MMMM D, YYYY') }}</td>
                    <td class="px-4 py-3">
                        <StatusBadge :status="tenant.status" item="tenant" />
                    </td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <ActionButtons
                            :item="tenant"
                            @view="openViewTenant(tenant)"
                            @edit="openEditTenant(tenant)"
                            @delete="openDeleteTenant(tenant)"
                        />
                    </td>
                    <td class="text-center">
                        <BaseButton
                            class="block mx-auto"
                            variant="danger"
                            size="sm"
                            @click="openEndTenancy(tenant)"
                        >
                            <UserMinusIcon class="size-4" />
                        </BaseButton>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- MOBILE -->
    <div class="md:hidden">
        <div
            v-if="tenantStore.isListLoading"
            class="bg-white rounded-lg shadow p-6 text-center text-gray-500"
        >
            Loading...
        </div>
        <div
            v-else-if="tenantStore.tenants.length === 0"
            class="bg-white rounded-lg shadow p-6 text-center text-gray-500"
        >
            No Data
        </div>
        <div v-else class="space-y-4">
            <div
                v-for="tenant in tenantStore.tenants"
                :key="tenant.id"
                class="bg-white rounded-lg shadow p-4"
            >
                <div class="flex justify-between items-center">
                    <h3 class="font-bold text-lg">Tenant</h3>
                    <StatusBadge :status="tenant.status" item="tenant" />
                </div>

                <div class="mt-3 text-sm space-y-1 text-gray-600">
                    <p><strong>Name:</strong> {{ tenant.first_name }} {{ tenant.last_name }}</p>
                    <p><strong>Email:</strong> {{ tenant.email }}</p>
                    <p><strong>Move in Date:</strong> {{ dayjs(tenant.move_in_date).format('MMMM D, YYYY') }}</p>
                    <p><strong>Room Number:</strong> {{ tenant.room?.room_number ?? '-' }}</p>
                </div>

                <div class="mt-4 flex gap-2 justify-end">
                    <ActionButtons
                        :item="tenant"
                        @view="openViewTenant(tenant)"
                        @edit="openEditTenant(tenant)"
                        @delete="openDeleteTenant(tenant)"
                    />
                    <BaseButton
                        variant="danger"
                        size="sm"
                        @click="openEndTenancy(tenant)"
                    >
                        <UserMinusIcon class="size-4" />
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <BaseModal
        v-model:isOpen="tenantStore.isOpenModal"
        :title="tenantStore.currentMode"
        @close="tenantStore.isOpenModal = false; tenantStore.clearViewData()"
    >
        <div v-if="tenantStore.isViewLoading">
            <div class="space-y-2 p-6">
                <div class="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div class="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                <div class="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            </div>
        </div>
        <TenantForm
            v-else
            :mode="tenantStore.currentMode"
            @close="tenantStore.isOpenModal = false"
        />
    </BaseModal>

    <!-- Delete confirm end tenancy -->
    <ConfirmEndTenancy
        :isOpen="isEndTenancy"
        title="End Tenancy"
        :message="`${tenantStore.selectedTenant?.first_name} ${tenantStore.selectedTenant?.last_name}?`"
        :loading="tenantStore.isEndTenancyLoading"
        @confirm="confirmEndTenancy"
        @close="isEndTenancy = false"
    />

    <!-- Delete confirm tenant -->
    <ConfirmDelete
        :isOpen="tenantStore.isOpenDeleteModal"
        title="Delete Tenant"
        :message="`Delete tenant ${tenantStore.selectedTenant?.first_name} ${tenantStore.selectedTenant?.last_name}?`"
        :loading="tenantStore.isDeleteLoading"
        @confirm="confirmTenantDelete"
        @close="tenantStore.isOpenDeleteModal = false"
    />
</template>