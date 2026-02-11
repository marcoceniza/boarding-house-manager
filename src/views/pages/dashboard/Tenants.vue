<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import { useTenantStore } from "@/stores/TenantStore";
import BaseModal from "@/components/base/BaseModal.vue";
import TenantForm from "@/components/TenantForm.vue";

const tenantStore = useTenantStore();

const showModal = ref(false);
const currentMode = ref("Add");
const selectedTenant = ref(null);

// Handlers
const openAddTenant = () => {
    selectedTenant.value = null;
    currentMode.value = "Add";
    showModal.value = true;
};
</script>

<template>
    <div class="flex justify-end items-center my-4">
        <button
            @click="openAddTenant"
            class="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
        >
            + Add Tenant
        </button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-x-auto">
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
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 text-sm">
                <tr v-for="tenant in tenantStore.tenants" :key="tenant.id" class="hover:bg-gray-50">
                    <td class="px-4 py-3 font-medium">{{ tenant.first_name }}</td>
                    <td class="px-4 py-3 font-medium">{{ tenant.last_name }}</td>
                    <td class="px-4 py-3 font-medium">{{ tenant.email }}</td>
                    <td class="px-4 py-3 font-medium">{{ tenant.room.room_number }}</td>
                    <td class="px-4 py-3 font-medium">{{ dayjs(tenant.move_in_date).format('MMMM D, YYYY') }}</td>
                    <td class="px-4 py-3 font-medium">{{ tenant.status }}</td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <button
                            @click="tenantStore.show(tenant.id); currentMode = 'View'; showModal = true"
                            class="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            View
                        </button>
                        <button
                            @click="tenantStore.show(tenant.id); currentMode = 'Edit'; showModal = true"
                            class="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Edit
                        </button>
                        <button
                            @click="tenantStore.delete(tenant.id)"
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
        @close="showModal = false; tenantStore.clearViewData()"
    >
        <TenantForm :mode="currentMode" />
    </BaseModal>
</template>