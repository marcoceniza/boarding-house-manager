<script setup lang="ts">
import { computed, ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { Plus } from '@lucide/vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import Modal from '@/components/Modal.vue';
import Pagination from '@/components/Pagination.vue';
import RowActions from '@/components/RowActions.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { destroy, endTenancy, store, update } from '@/routes/dashboard/tenants';
import type { Paginated, Room, Tenant } from '@/types/boarding-house';

defineOptions({ layout: DashboardLayout });

const props = defineProps<{
    tenants: Paginated<Tenant>;
    formerTenants: Tenant[];
    rooms: Room[];
}>();

const mode = ref<'create' | 'edit' | 'view'>('create');
const selectedTenant = ref<Tenant | null>(null);
const isModalOpen = ref(false);
const isDeleteOpen = ref(false);
const isEndTenancyOpen = ref(false);
const isFormerTenantsOpen = ref(false);

const form = useForm({
    first_name: '',
    last_name: '',
    email: '',
    room_id: null as number | null,
    move_in_date: '',
    occupied: 1,
});
const deleteForm = useForm<{ tenant?: string }>({});
const endTenancyForm = useForm<{ tenant?: string }>({});

const modalTitle = computed(
    () =>
        ({
            create: 'Create Tenant',
            edit: 'Update Tenant',
            view: 'Tenant Details',
        })[mode.value],
);

const availableRooms = computed(() =>
    props.rooms.filter((room) => room.status === 0 || room.id === form.room_id),
);

const selectedRoom = computed(() =>
    props.rooms.find((room) => room.id === form.room_id),
);

const today = () => {
    const date = new Date();
    const localOffset = date.getTimezoneOffset() * 60_000;

    return new Date(date.getTime() - localOffset).toISOString().slice(0, 10);
};

const openCreate = () => {
    mode.value = 'create';
    selectedTenant.value = null;
    form.reset();
    form.clearErrors();
    form.move_in_date = today();
    form.occupied = 1;
    isModalOpen.value = true;
};

const openTenant = (tenant: Tenant, nextMode: 'edit' | 'view') => {
    mode.value = nextMode;
    selectedTenant.value = tenant;
    form.clearErrors();
    form.first_name = tenant.first_name;
    form.last_name = tenant.last_name;
    form.email = tenant.email;
    form.room_id = tenant.room_id;
    form.move_in_date = tenant.move_in_date.slice(0, 10);
    form.occupied = tenant.room?.occupied ?? 1;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    form.clearErrors();
};

const submit = () => {
    const onSuccess = () => {
        isModalOpen.value = false;
        form.reset();
        form.clearErrors();
    };

    if (mode.value === 'edit' && selectedTenant.value) {
        form.put(update(selectedTenant.value.id).url, { onSuccess });

        return;
    }

    form.post(store.url(), { onSuccess });
};

const beginDelete = (tenant: Tenant) => {
    selectedTenant.value = tenant;
    deleteForm.clearErrors();
    isDeleteOpen.value = true;
};

const confirmDelete = () => {
    if (!selectedTenant.value) {
        return;
    }

    deleteForm.delete(destroy(selectedTenant.value.id).url, {
        onSuccess: () => {
            isDeleteOpen.value = false;
            selectedTenant.value = null;
            deleteForm.clearErrors();
        },
    });
};

const beginEndTenancy = (tenant: Tenant) => {
    selectedTenant.value = tenant;
    endTenancyForm.clearErrors();
    isEndTenancyOpen.value = true;
};

const confirmEndTenancy = () => {
    if (!selectedTenant.value) {
        return;
    }

    endTenancyForm.post(endTenancy(selectedTenant.value.id).url, {
        onSuccess: () => {
            isEndTenancyOpen.value = false;
            selectedTenant.value = null;
            endTenancyForm.clearErrors();
        },
    });
};

const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
};
</script>

<template>
    <div class="page-content">
        <div class="page-intro">
            <div>
                <p class="page-eyebrow">People</p>
                <h2 class="page-heading">Tenants</h2>
                <p class="page-description">
                    Keep resident details and tenancy status up to date.
                </p>
            </div>
            <div class="flex flex-wrap gap-2">
                <button
                    type="button"
                    class="secondary-button"
                    @click="isFormerTenantsOpen = true"
                >
                    Former Tenants ({{ formerTenants.length }})
                </button>
                <button
                    type="button"
                    class="primary-button"
                    @click="openCreate"
                >
                    <Plus class="size-4" />
                    Create Tenant
                </button>
            </div>
        </div>

        <div v-if="tenants.data.length === 0" class="empty-state">
            <p class="font-semibold text-slate-800">No current tenants</p>
            <p class="mt-1">Create a tenant to start a new tenancy.</p>
        </div>

        <div v-else class="data-panel hidden overflow-x-auto md:block">
            <table class="data-table min-w-full">
                <thead>
                    <tr>
                        <th class="px-4 py-3">Firstname</th>
                        <th class="px-4 py-3">Lastname</th>
                        <th class="px-4 py-3">Email</th>
                        <th class="px-4 py-3">Room No.</th>
                        <th class="px-4 py-3">Move in Date</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3 text-center">Actions</th>
                        <th class="px-4 py-3 text-center">End Tenancy</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tenant in tenants.data" :key="tenant.id">
                        <td class="font-semibold text-slate-900">
                            {{ tenant.first_name }}
                        </td>
                        <td class="font-semibold text-slate-900">
                            {{ tenant.last_name }}
                        </td>
                        <td class="px-4 py-3">{{ tenant.email }}</td>
                        <td class="px-4 py-3">
                            {{ tenant.room?.room_number ?? '-' }}
                        </td>
                        <td class="px-4 py-3">
                            {{ formatDate(tenant.move_in_date) }}
                        </td>
                        <td class="px-4 py-3">
                            <StatusBadge
                                item="tenant"
                                :status="tenant.status"
                            />
                        </td>
                        <td class="px-4 py-3">
                            <RowActions
                                @view="openTenant(tenant, 'view')"
                                @edit="openTenant(tenant, 'edit')"
                                @delete="beginDelete(tenant)"
                            />
                        </td>
                        <td class="px-4 py-3 text-center">
                            <button
                                v-if="tenant.status === 1"
                                type="button"
                                class="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                                @click="beginEndTenancy(tenant)"
                            >
                                End
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="tenants.data.length" class="space-y-4 md:hidden">
            <article
                v-for="tenant in tenants.data"
                :key="tenant.id"
                class="mobile-card"
            >
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <p
                            class="text-xs font-medium tracking-wide text-slate-400 uppercase"
                        >
                            Tenant
                        </p>
                        <h2 class="mt-1 text-base font-bold text-slate-900">
                            {{ tenant.first_name }} {{ tenant.last_name }}
                        </h2>
                    </div>
                    <StatusBadge item="tenant" :status="tenant.status" />
                </div>
                <dl class="mt-4 space-y-2.5 text-sm text-slate-600">
                    <div class="flex justify-between gap-3">
                        <dt>Email</dt>
                        <dd class="text-right break-all">{{ tenant.email }}</dd>
                    </div>
                    <div class="flex justify-between gap-3">
                        <dt>Move in Date</dt>
                        <dd>{{ formatDate(tenant.move_in_date) }}</dd>
                    </div>
                    <div class="flex justify-between gap-3">
                        <dt>Room Number</dt>
                        <dd>{{ tenant.room?.room_number ?? '-' }}</dd>
                    </div>
                </dl>
                <div class="mt-4 flex items-center justify-end gap-2">
                    <RowActions
                        @view="openTenant(tenant, 'view')"
                        @edit="openTenant(tenant, 'edit')"
                        @delete="beginDelete(tenant)"
                    />
                    <button
                        v-if="tenant.status === 1"
                        type="button"
                        class="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                        @click="beginEndTenancy(tenant)"
                    >
                        End
                    </button>
                </div>
            </article>
        </div>

        <Pagination :pagination="tenants" />

        <Modal
            :show="isFormerTenantsOpen"
            title="Former Tenants"
            @close="isFormerTenantsOpen = false"
        >
            <div v-if="formerTenants.length === 0" class="empty-state">
                <p class="font-semibold text-slate-800">No ended tenancies</p>
                <p class="mt-1">
                    Tenants will appear here after their tenancy has ended.
                </p>
            </div>
            <div v-else class="space-y-4">
                <p class="text-sm text-slate-600">
                    These records are retained for history and billing purposes.
                </p>
                <div class="data-panel hidden overflow-x-auto md:block">
                    <table class="data-table min-w-full">
                        <thead>
                            <tr>
                                <th class="px-4 py-3">Tenant</th>
                                <th class="px-4 py-3">Email</th>
                                <th class="px-4 py-3">Room</th>
                                <th class="px-4 py-3">Move in Date</th>
                                <th class="px-4 py-3">Ended On</th>
                                <th class="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="tenant in formerTenants"
                                :key="tenant.id"
                            >
                                <td
                                    class="px-4 py-3 font-semibold text-slate-900"
                                >
                                    {{ tenant.first_name }}
                                    {{ tenant.last_name }}
                                </td>
                                <td class="px-4 py-3">{{ tenant.email }}</td>
                                <td class="px-4 py-3">
                                    {{ tenant.room?.room_number ?? '-' }}
                                </td>
                                <td class="px-4 py-3">
                                    {{ formatDate(tenant.move_in_date) }}
                                </td>
                                <td class="px-4 py-3">
                                    {{
                                        tenant.ended_at
                                            ? formatDate(tenant.ended_at)
                                            : '-'
                                    }}
                                </td>
                                <td class="px-4 py-3">
                                    <StatusBadge
                                        item="tenant"
                                        :status="tenant.status"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="space-y-3 md:hidden">
                    <article
                        v-for="tenant in formerTenants"
                        :key="tenant.id"
                        class="mobile-card"
                    >
                        <div class="flex items-start justify-between gap-3">
                            <div>
                                <h3 class="font-semibold text-slate-900">
                                    {{ tenant.first_name }}
                                    {{ tenant.last_name }}
                                </h3>
                                <p
                                    class="mt-1 text-sm break-all text-slate-600"
                                >
                                    {{ tenant.email }}
                                </p>
                            </div>
                            <StatusBadge
                                item="tenant"
                                :status="tenant.status"
                            />
                        </div>
                        <dl class="mt-4 space-y-2 text-sm text-slate-600">
                            <div class="flex justify-between gap-3">
                                <dt>Room</dt>
                                <dd>{{ tenant.room?.room_number ?? '-' }}</dd>
                            </div>
                            <div class="flex justify-between gap-3">
                                <dt>Move in Date</dt>
                                <dd>{{ formatDate(tenant.move_in_date) }}</dd>
                            </div>
                            <div class="flex justify-between gap-3">
                                <dt>Ended On</dt>
                                <dd>
                                    {{
                                        tenant.ended_at
                                            ? formatDate(tenant.ended_at)
                                            : '-'
                                    }}
                                </dd>
                            </div>
                        </dl>
                    </article>
                </div>
            </div>
        </Modal>

        <Modal :show="isModalOpen" :title="modalTitle" @close="closeModal">
            <dl
                v-if="mode === 'view' && selectedTenant"
                class="details-grid grid gap-3 sm:grid-cols-2"
            >
                <div>
                    <dt class="text-sm text-gray-500">First Name</dt>
                    <dd class="font-medium">{{ selectedTenant.first_name }}</dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Last Name</dt>
                    <dd class="font-medium">{{ selectedTenant.last_name }}</dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Email</dt>
                    <dd class="font-medium">{{ selectedTenant.email }}</dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Room</dt>
                    <dd class="font-medium">
                        {{ selectedTenant.room?.room_number ?? '-' }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Move in Date</dt>
                    <dd class="font-medium">
                        {{ formatDate(selectedTenant.move_in_date) }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Status</dt>
                    <dd>
                        <StatusBadge
                            item="tenant"
                            :status="selectedTenant.status"
                        />
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Created at</dt>
                    <dd class="font-medium">
                        {{ formatDate(selectedTenant.created_at) }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Updated at</dt>
                    <dd class="font-medium">
                        {{ formatDate(selectedTenant.updated_at) }}
                    </dd>
                </div>
            </dl>

            <form
                v-else
                class="dashboard-form space-y-5"
                @submit.prevent="submit"
            >
                <div class="grid gap-4 sm:grid-cols-2">
                    <label class="form-label">
                        First Name <span class="text-red-500">*</span>
                        <input
                            v-model="form.first_name"
                            required
                            maxlength="50"
                            placeholder="Enter first name"
                        />
                        <span
                            v-if="form.errors.first_name"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.first_name }}</span
                        >
                    </label>
                    <label class="form-label">
                        Last Name <span class="text-red-500">*</span>
                        <input
                            v-model="form.last_name"
                            required
                            maxlength="50"
                            placeholder="Enter last name"
                        />
                        <span
                            v-if="form.errors.last_name"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.last_name }}</span
                        >
                    </label>
                    <label class="form-label">
                        Email <span class="text-red-500">*</span>
                        <input
                            v-model="form.email"
                            type="email"
                            required
                            maxlength="100"
                            placeholder="Enter email"
                        />
                        <span
                            v-if="form.errors.email"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.email }}</span
                        >
                    </label>
                    <label class="form-label">
                        Room <span class="text-red-500">*</span>
                        <select
                            v-model.number="form.room_id"
                            required
                            :disabled="
                                mode === 'edit' && selectedTenant?.status !== 1
                            "
                        >
                            <option :value="null" disabled>Select Room</option>
                            <option
                                v-for="room in availableRooms"
                                :key="room.id"
                                :value="room.id"
                            >
                                {{ room.room_number }} ({{ room.type }})
                            </option>
                        </select>
                        <span
                            v-if="form.errors.room_id"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.room_id }}</span
                        >
                    </label>
                    <label v-if="mode === 'create'" class="form-label">
                        Occupied <span class="text-red-500">*</span>
                        <input
                            v-model.number="form.occupied"
                            type="number"
                            required
                            min="1"
                            :max="selectedRoom?.capacity"
                            placeholder="Number of occupants"
                        />
                        <span
                            v-if="form.errors.occupied"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.occupied }}</span
                        >
                    </label>
                    <label class="form-label">
                        Move in Date <span class="text-red-500">*</span>
                        <input
                            v-model="form.move_in_date"
                            type="date"
                            required
                            :min="today()"
                        />
                        <span
                            v-if="form.errors.move_in_date"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.move_in_date }}</span
                        >
                    </label>
                </div>
                <div
                    class="flex flex-col-reverse justify-end gap-2 border-t border-slate-100 pt-5 sm:flex-row"
                >
                    <button
                        type="button"
                        class="secondary-button"
                        :disabled="form.processing"
                        @click="closeModal"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="primary-button"
                        :disabled="form.processing"
                    >
                        {{
                            form.processing
                                ? 'Saving…'
                                : mode === 'create'
                                  ? 'Create'
                                  : 'Update'
                        }}
                    </button>
                </div>
            </form>
        </Modal>

        <ConfirmDialog
            :show="isDeleteOpen"
            title="Delete Tenant"
            :message="`Delete tenant ${selectedTenant?.first_name} ${selectedTenant?.last_name}?`"
            confirm-label="Yes, Delete"
            :processing="deleteForm.processing"
            :error="deleteForm.errors.tenant"
            @cancel="isDeleteOpen = false"
            @confirm="confirmDelete"
        />

        <ConfirmDialog
            :show="isEndTenancyOpen"
            title="End Tenancy"
            :message="`Are you sure you want to end the tenancy for ${selectedTenant?.first_name} ${selectedTenant?.last_name}?`"
            confirm-label="Yes, End Tenancy"
            :processing="endTenancyForm.processing"
            :error="endTenancyForm.errors.tenant"
            @cancel="isEndTenancyOpen = false"
            @confirm="confirmEndTenancy"
        />
    </div>
</template>
