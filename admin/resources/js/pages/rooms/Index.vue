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
import { destroy, store, update } from '@/routes/dashboard/rooms';
import type { Paginated, Room } from '@/types/boarding-house';

defineOptions({ layout: DashboardLayout });

const props = defineProps<{
    rooms: Paginated<Room>;
}>();

const mode = ref<'create' | 'edit' | 'view'>('create');
const selectedRoom = ref<Room | null>(null);
const isModalOpen = ref(false);
const isDeleteOpen = ref(false);

const form = useForm<{
    room_number: string;
    type: string;
    capacity: number;
    price_per_month: number;
    room?: string;
}>({
    room_number: '',
    type: '',
    capacity: 1,
    price_per_month: 0,
});
const deleteForm = useForm<{ room?: string }>({});

const modalTitle = computed(
    () =>
        ({
            create: 'Create Room',
            edit: 'Update Room',
            view: 'Room Details',
        })[mode.value],
);

const roomTypes = ['Single', 'Double', 'Studio', 'Family'];

const openCreate = () => {
    mode.value = 'create';
    selectedRoom.value = null;
    form.reset();
    form.clearErrors();
    form.capacity = 1;
    isModalOpen.value = true;
};

const openRoom = (room: Room, nextMode: 'edit' | 'view') => {
    mode.value = nextMode;
    selectedRoom.value = room;
    form.clearErrors();
    form.room_number = room.room_number;
    form.type = room.type;
    form.capacity = room.capacity;
    form.price_per_month = Number(room.price_per_month);
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

    if (mode.value === 'edit' && selectedRoom.value) {
        form.put(update(selectedRoom.value.id).url, { onSuccess });

        return;
    }

    form.post(store.url(), { onSuccess });
};

const confirmDelete = () => {
    if (!selectedRoom.value) {
        return;
    }

    deleteForm.delete(destroy(selectedRoom.value.id).url, {
        onSuccess: () => {
            isDeleteOpen.value = false;
            selectedRoom.value = null;
            deleteForm.clearErrors();
        },
    });
};

const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

const formatDate = (value: string) => {
    return new Date(value).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
};

const beginDelete = (room: Room) => {
    selectedRoom.value = room;
    deleteForm.clearErrors();
    isDeleteOpen.value = true;
};
</script>

<template>
    <div class="page-content">
        <div class="page-intro">
            <div>
                <p class="page-eyebrow">Property</p>
                <h2 class="page-heading">Rooms</h2>
                <p class="page-description">
                    Manage room availability, capacity, and monthly rates.
                </p>
            </div>
            <button type="button" class="primary-button" @click="openCreate">
                <Plus class="size-4" />
                Create Room
            </button>
        </div>

        <div v-if="props.rooms.data.length === 0" class="empty-state">
            <p class="font-semibold text-slate-800">No rooms added</p>
            <p class="mt-1">
                Create a room to begin tracking capacity and availability.
            </p>
        </div>

        <div v-else class="data-panel hidden overflow-x-auto md:block">
            <table class="data-table min-w-full">
                <thead>
                    <tr>
                        <th class="px-4 py-3">Room No.</th>
                        <th class="px-4 py-3">Type</th>
                        <th class="px-4 py-3">Capacity</th>
                        <th class="px-4 py-3">Price / Month</th>
                        <th class="px-4 py-3">Occupied</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="room in props.rooms.data" :key="room.id">
                        <td class="font-semibold text-slate-900">
                            {{ room.room_number }}
                        </td>
                        <td class="px-4 py-3">{{ room.type }}</td>
                        <td class="px-4 py-3">{{ room.capacity }}</td>
                        <td class="px-4 py-3">
                            ₱{{ formatPrice(room.price_per_month) }}
                        </td>
                        <td class="px-4 py-3">{{ room.occupied }}</td>
                        <td class="px-4 py-3">
                            <StatusBadge item="room" :status="room.status" />
                        </td>
                        <td class="px-4 py-3">
                            <RowActions
                                :hide-mutations="room.occupied > 0"
                                @view="openRoom(room, 'view')"
                                @edit="openRoom(room, 'edit')"
                                @delete="beginDelete(room)"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="props.rooms.data.length" class="space-y-4 md:hidden">
            <article
                v-for="room in props.rooms.data"
                :key="room.id"
                class="mobile-card"
            >
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <p
                            class="text-xs font-medium tracking-wide text-slate-400 uppercase"
                        >
                            {{ room.type }} room
                        </p>
                        <h2 class="mt-1 text-base font-bold text-slate-900">
                            Room {{ room.room_number }}
                        </h2>
                    </div>
                    <StatusBadge item="room" :status="room.status" />
                </div>
                <dl class="mt-4 space-y-2.5 text-sm text-slate-600">
                    <div class="flex justify-between gap-3">
                        <dt>Type</dt>
                        <dd>{{ room.type }}</dd>
                    </div>
                    <div class="flex justify-between gap-3">
                        <dt>Capacity</dt>
                        <dd>{{ room.capacity }}</dd>
                    </div>
                    <div class="flex justify-between gap-3">
                        <dt>Price</dt>
                        <dd>₱{{ formatPrice(room.price_per_month) }}</dd>
                    </div>
                    <div class="flex justify-between gap-3">
                        <dt>Occupied</dt>
                        <dd>{{ room.occupied }}</dd>
                    </div>
                </dl>
                <div class="mt-4 flex justify-end">
                    <RowActions
                        :hide-mutations="room.occupied > 0"
                        @view="openRoom(room, 'view')"
                        @edit="openRoom(room, 'edit')"
                        @delete="beginDelete(room)"
                    />
                </div>
            </article>
        </div>

        <Pagination :pagination="props.rooms" />

        <Modal :show="isModalOpen" :title="modalTitle" @close="closeModal">
            <dl
                v-if="mode === 'view' && selectedRoom"
                class="details-grid grid gap-3 sm:grid-cols-2"
            >
                <div>
                    <dt class="text-sm text-gray-500">Room No.</dt>
                    <dd class="font-medium">{{ selectedRoom.room_number }}</dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Type</dt>
                    <dd class="font-medium">{{ selectedRoom.type }}</dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Capacity</dt>
                    <dd class="font-medium">{{ selectedRoom.capacity }}</dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Price / Month</dt>
                    <dd class="font-medium">
                        ₱{{ formatPrice(selectedRoom.price_per_month) }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Occupied By</dt>
                    <dd class="font-medium">
                        {{
                            selectedRoom.tenants?.length
                                ? selectedRoom.tenants
                                      .map(
                                          (tenant) =>
                                              `${tenant.first_name} ${tenant.last_name}`,
                                      )
                                      .join(', ')
                                : 'None'
                        }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Status</dt>
                    <dd>
                        <StatusBadge
                            item="room"
                            :status="selectedRoom.status"
                        />
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Created at</dt>
                    <dd class="font-medium">
                        {{ formatDate(selectedRoom.created_at) }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Updated at</dt>
                    <dd class="font-medium">
                        {{ formatDate(selectedRoom.updated_at) }}
                    </dd>
                </div>
            </dl>

            <form
                v-else
                class="dashboard-form space-y-5"
                @submit.prevent="submit"
            >
                <p
                    v-if="form.errors.room"
                    class="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700"
                    role="alert"
                >
                    {{ form.errors.room }}
                </p>
                <div class="grid gap-4 sm:grid-cols-2">
                    <label class="form-label">
                        Room No. *
                        <input
                            v-model="form.room_number"
                            required
                            maxlength="10"
                            placeholder="Enter room no."
                        />
                        <span
                            v-if="form.errors.room_number"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.room_number }}</span
                        >
                    </label>
                    <label class="form-label">
                        Type *
                        <select v-model="form.type" required>
                            <option value="" disabled>
                                Choose a room type
                            </option>
                            <option
                                v-for="type in roomTypes"
                                :key="type"
                                :value="type"
                            >
                                {{ type }}
                            </option>
                        </select>
                        <span
                            v-if="form.errors.type"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.type }}</span
                        >
                    </label>
                    <label class="form-label">
                        Capacity *
                        <input
                            v-model.number="form.capacity"
                            type="number"
                            required
                            min="1"
                        />
                        <span
                            v-if="form.errors.capacity"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.capacity }}</span
                        >
                    </label>
                    <label class="form-label">
                        Price / Month *
                        <input
                            v-model.number="form.price_per_month"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                        />
                        <span
                            v-if="form.errors.price_per_month"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.price_per_month }}</span
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
            title="Delete Room"
            :message="`Delete room ${selectedRoom?.room_number}?`"
            confirm-label="Yes, Delete"
            :processing="deleteForm.processing"
            :error="deleteForm.errors.room"
            @cancel="isDeleteOpen = false"
            @confirm="confirmDelete"
        />
    </div>
</template>
