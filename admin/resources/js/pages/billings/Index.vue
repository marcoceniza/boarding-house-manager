<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { router, useForm } from '@inertiajs/vue3';
import { Check, Inbox, Plus } from '@lucide/vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import Modal from '@/components/Modal.vue';
import Pagination from '@/components/Pagination.vue';
import RowActions from '@/components/RowActions.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import {
    destroy,
    index as billingIndex,
    markPaid,
    sendInvoice,
    store,
    update,
} from '@/routes/dashboard/billings';
import type { Billing, Paginated, Tenant } from '@/types/boarding-house';

defineOptions({ layout: DashboardLayout });

const props = defineProps<{
    billings: Paginated<Billing>;
    formerBillings: Billing[];
    tenants: Tenant[];
    month: string;
    date: string;
    billedTenantIds: number[];
}>();

const selectedDate = ref(props.date);
const mode = ref<'create' | 'edit' | 'view'>('create');
const selectedBilling = ref<Billing | null>(null);
const isModalOpen = ref(false);
const isDeleteOpen = ref(false);
const isInvoiceOpen = ref(false);
const isMarkPaidOpen = ref(false);
const isFormerBillingsOpen = ref(false);

const form = useForm({
    tenant_id: null as number | null,
    billing_period: '',
    rent: 0,
    water: 0,
    electricity: 0,
    due_date: '',
});
const deleteForm = useForm<{ billing?: string }>({});
const invoiceForm = useForm<{ invoice?: string }>({});
const markPaidForm = useForm<{
    paid_at: string;
    payment_method: string;
    billing?: string;
}>({
    paid_at: '',
    payment_method: 'cash',
});

watch(
    () => props.date,
    (date) => {
        selectedDate.value = date;
    },
);

const modalTitle = computed(
    () =>
        ({
            create: 'Create Billing',
            edit: 'Update Billing',
            view: 'Billing Details',
        })[mode.value],
);

const monthOptions = computed(() => {
    const current = new Date();
    const options = Array.from({ length: 12 }, (_, offset) => {
        const date = new Date(
            current.getFullYear(),
            current.getMonth() - offset,
            1,
        );
        const month = String(date.getMonth() + 1).padStart(2, '0');

        return {
            label: date.toLocaleString('en-US', {
                month: 'long',
                year: 'numeric',
            }),
            value: `${date.getFullYear()}-${month}`,
        };
    });

    if (!options.some((option) => option.value === props.month)) {
        options.push({
            label: formatPeriod(props.month),
            value: props.month,
        });
        options.sort((left, right) => right.value.localeCompare(left.value));
    }

    return options;
});

const availableTenants = computed(() => {
    const tenants = [...props.tenants];
    const billingTenant = selectedBilling.value?.tenant;

    if (
        billingTenant &&
        !tenants.some((tenant) => tenant.id === billingTenant.id)
    ) {
        tenants.push(billingTenant);
    }

    return tenants.filter(
        (tenant) =>
            !props.billedTenantIds.includes(tenant.id) ||
            tenant.id === form.tenant_id,
    );
});

const total = computed(
    () =>
        Number(form.rent || 0) +
        Number(form.water || 0) +
        Number(form.electricity || 0),
);

const currentPeriod = () => {
    return props.date.slice(0, 7);
};

const today = () => props.date;

const currentDate = () => {
    const date = new Date();
    const localOffset = date.getTimezoneOffset() * 60_000;

    return new Date(date.getTime() - localOffset).toISOString().slice(0, 10);
};

const filterByDate = () => {
    if (!selectedDate.value) {
        return;
    }

    router.get(
        billingIndex.url({ query: { date: selectedDate.value } }),
        {},
        {
            preserveScroll: true,
            replace: true,
        },
    );
};

const openCreate = () => {
    mode.value = 'create';
    selectedBilling.value = null;
    form.reset();
    form.clearErrors();
    form.billing_period = props.month || currentPeriod();
    form.due_date = today();
    isModalOpen.value = true;
};

const openBilling = (billing: Billing, nextMode: 'edit' | 'view') => {
    mode.value = nextMode;
    selectedBilling.value = billing;
    form.clearErrors();
    form.tenant_id = billing.tenant_id;
    form.billing_period = billing.billing_period;
    form.rent = Number(billing.rent);
    form.water = Number(billing.water);
    form.electricity = Number(billing.electricity);
    form.due_date = billing.due_date.slice(0, 10);
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    form.clearErrors();
};

const setTenantRent = () => {
    if (mode.value !== 'create') {
        return;
    }

    const tenant = props.tenants.find((item) => item.id === form.tenant_id);
    form.rent = Number(tenant?.room?.price_per_month ?? 0);
};

const submit = () => {
    const onSuccess = () => {
        isModalOpen.value = false;
        form.reset();
        form.clearErrors();
    };

    if (mode.value === 'edit' && selectedBilling.value) {
        form.put(
            update(selectedBilling.value.id, {
                query: { date: props.date },
            }).url,
            { onSuccess },
        );

        return;
    }

    form.post(store.url({ query: { date: props.date } }), { onSuccess });
};

const beginDelete = (billing: Billing) => {
    selectedBilling.value = billing;
    deleteForm.clearErrors();
    isDeleteOpen.value = true;
};

const confirmDelete = () => {
    if (!selectedBilling.value) {
        return;
    }

    deleteForm.delete(
        destroy(selectedBilling.value.id, {
            query: { date: props.date },
        }).url,
        {
            onSuccess: () => {
                isDeleteOpen.value = false;
                selectedBilling.value = null;
                deleteForm.clearErrors();
            },
        },
    );
};

const beginSendInvoice = (billing: Billing) => {
    selectedBilling.value = billing;
    invoiceForm.clearErrors();
    isInvoiceOpen.value = true;
};

const confirmSendInvoice = () => {
    if (!selectedBilling.value) {
        return;
    }

    invoiceForm.post(
        sendInvoice(selectedBilling.value.id, {
            query: { date: props.date },
        }).url,
        {
            onSuccess: () => {
                isInvoiceOpen.value = false;
                selectedBilling.value = null;
                invoiceForm.clearErrors();
            },
        },
    );
};

const beginMarkPaid = (billing: Billing) => {
    selectedBilling.value = billing;
    markPaidForm.reset();
    markPaidForm.clearErrors();
    markPaidForm.paid_at = currentDate();
    markPaidForm.payment_method = 'cash';
    isMarkPaidOpen.value = true;
};

const beginMarkPaidFromArchive = (billing: Billing) => {
    isFormerBillingsOpen.value = false;
    beginMarkPaid(billing);
};

const confirmMarkPaid = () => {
    if (!selectedBilling.value) {
        return;
    }

    markPaidForm.post(
        markPaid(selectedBilling.value.id, {
            query: { date: props.date },
        }).url,
        {
            onSuccess: () => {
                isMarkPaidOpen.value = false;
                selectedBilling.value = null;
                markPaidForm.reset();
                markPaidForm.clearErrors();
            },
        },
    );
};

const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

const formatPeriod = (period: string) => {
    const [year, month] = period.split('-').map(Number);

    return new Date(year, month - 1, 1).toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
    });
};

const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
};

const tenantName = (tenant?: Tenant) => {
    return tenant
        ? `${tenant.first_name} ${tenant.last_name}`
        : 'Unknown tenant';
};

const paymentMethodName = (method: string | null) => {
    const names: Record<string, string> = {
        cash: 'Cash',
        bank_transfer: 'Bank Transfer',
        e_wallet: 'E-Wallet',
        other: 'Other',
    };

    return method ? (names[method] ?? method) : '-';
};
</script>

<template>
    <div class="page-content">
        <div class="page-intro">
            <div>
                <p class="page-eyebrow">Finance</p>
                <h2 class="page-heading">Billings</h2>
                <p class="page-description">
                    Review monthly charges, due dates, and invoice status.
                </p>
            </div>
            <div class="flex flex-wrap items-end gap-2">
                <button
                    type="button"
                    class="secondary-button"
                    @click="isFormerBillingsOpen = true"
                >
                    Former Tenant Bills ({{ formerBillings.length }})
                </button>
                <label
                    class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm"
                >
                    Choose a date
                    <input
                        v-model="selectedDate"
                        type="date"
                        required
                        class="form-control mt-1 min-h-10 min-w-44 px-3 py-2 text-sm"
                        @change="filterByDate"
                    />
                </label>
                <button
                    type="button"
                    class="primary-button"
                    @click="openCreate"
                >
                    <Plus class="size-4" />
                    Create Billing
                </button>
            </div>
        </div>

        <div v-if="billings.data.length === 0" class="empty-state">
            <p class="font-semibold text-slate-800">
                No billing records for this month
            </p>
            <p class="mt-1">
                Create a billing record to track monthly charges and invoices.
            </p>
        </div>

        <div v-else class="data-panel hidden overflow-x-auto md:block">
            <table class="data-table min-w-full">
                <thead>
                    <tr>
                        <th class="px-4 py-3">Tenant</th>
                        <th class="px-4 py-3">Tenant Email</th>
                        <th class="px-4 py-3">Rent</th>
                        <th class="px-4 py-3">Water</th>
                        <th class="px-4 py-3">Electricity</th>
                        <th class="px-4 py-3">Billing Period</th>
                        <th class="px-4 py-3">Due Date</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3">Total</th>
                        <th class="px-4 py-3 text-center">Actions</th>
                        <th class="px-4 py-3 text-center">Invoice</th>
                        <th class="px-4 py-3 text-center">Payment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="billing in billings.data" :key="billing.id">
                        <td class="font-semibold text-slate-900">
                            {{ tenantName(billing.tenant) }}
                        </td>
                        <td class="px-4 py-3">{{ billing.tenant?.email }}</td>
                        <td class="px-4 py-3">
                            ₱{{ formatPrice(billing.rent) }}
                        </td>
                        <td class="px-4 py-3">
                            ₱{{ formatPrice(billing.water) }}
                        </td>
                        <td class="px-4 py-3">
                            ₱{{ formatPrice(billing.electricity) }}
                        </td>
                        <td class="px-4 py-3">
                            {{ formatPeriod(billing.billing_period) }}
                        </td>
                        <td class="px-4 py-3">
                            {{ formatDate(billing.due_date) }}
                        </td>
                        <td class="px-4 py-3">
                            <StatusBadge
                                item="billing"
                                :status="billing.status"
                            />
                        </td>
                        <td class="font-bold text-slate-900">
                            ₱{{ formatPrice(billing.total) }}
                        </td>
                        <td class="px-4 py-3 text-center">
                            <template v-if="billing.status !== 1">
                                <RowActions
                                    @view="openBilling(billing, 'view')"
                                    @edit="openBilling(billing, 'edit')"
                                    @delete="beginDelete(billing)"
                                />
                            </template>
                            <span v-else>-</span>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <template v-if="billing.status !== 1">
                                <button
                                    type="button"
                                    class="rounded-lg bg-emerald-50 p-2.5 text-emerald-700 transition hover:bg-emerald-100"
                                    :aria-label="`Send invoice to ${billing.tenant?.email ?? 'tenant'}`"
                                    @click="beginSendInvoice(billing)"
                                >
                                    <Inbox class="size-4" />
                                </button>
                            </template>
                            <span v-else>-</span>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <button
                                v-if="billing.status !== 1"
                                type="button"
                                class="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                                :aria-label="`Record payment for ${tenantName(billing.tenant)}`"
                                @click="beginMarkPaid(billing)"
                            >
                                <Check class="size-4" />
                                Mark Paid
                            </button>
                            <span
                                v-else
                                class="text-xs font-medium text-emerald-700"
                            >
                                {{
                                    billing.paid_at
                                        ? formatDate(billing.paid_at)
                                        : 'Paid'
                                }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="billings.data.length" class="space-y-4 md:hidden">
            <article
                v-for="billing in billings.data"
                :key="billing.id"
                class="mobile-card"
            >
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <p
                            class="text-xs font-medium tracking-wide text-slate-400 uppercase"
                        >
                            {{ formatPeriod(billing.billing_period) }}
                        </p>
                        <h2 class="mt-1 text-base font-bold text-slate-900">
                            {{ tenantName(billing.tenant) }}
                        </h2>
                    </div>
                    <StatusBadge item="billing" :status="billing.status" />
                </div>
                <dl class="mt-4 space-y-2.5 text-sm text-slate-600">
                    <div class="flex justify-between gap-3">
                        <dt>Tenant Email</dt>
                        <dd class="text-right break-all">
                            {{ billing.tenant?.email }}
                        </dd>
                    </div>
                    <div class="flex justify-between gap-3">
                        <dt>Rent</dt>
                        <dd>₱{{ formatPrice(billing.rent) }}</dd>
                    </div>
                    <div class="flex justify-between gap-3">
                        <dt>Water</dt>
                        <dd>₱{{ formatPrice(billing.water) }}</dd>
                    </div>
                    <div class="flex justify-between gap-3">
                        <dt>Electricity</dt>
                        <dd>₱{{ formatPrice(billing.electricity) }}</dd>
                    </div>
                    <div class="flex justify-between gap-3">
                        <dt>Billing Period</dt>
                        <dd>{{ formatPeriod(billing.billing_period) }}</dd>
                    </div>
                    <div class="flex justify-between gap-3">
                        <dt>Due Date</dt>
                        <dd>{{ formatDate(billing.due_date) }}</dd>
                    </div>
                    <div
                        v-if="billing.status === 1"
                        class="flex justify-between gap-3"
                    >
                        <dt>Paid On</dt>
                        <dd>
                            {{
                                billing.paid_at
                                    ? formatDate(billing.paid_at)
                                    : '-'
                            }}
                        </dd>
                    </div>
                    <div
                        v-if="billing.status === 1"
                        class="flex justify-between gap-3"
                    >
                        <dt>Payment Method</dt>
                        <dd>{{ paymentMethodName(billing.payment_method) }}</dd>
                    </div>
                    <div
                        class="flex justify-between gap-3 border-t border-slate-100 pt-3 text-base font-bold text-slate-900"
                    >
                        <dt>Total</dt>
                        <dd>₱{{ formatPrice(billing.total) }}</dd>
                    </div>
                </dl>
                <div class="mt-4 flex items-center justify-end gap-2">
                    <template v-if="billing.status !== 1">
                        <RowActions
                            @view="openBilling(billing, 'view')"
                            @edit="openBilling(billing, 'edit')"
                            @delete="beginDelete(billing)"
                        />
                        <button
                            type="button"
                            class="rounded-lg bg-emerald-50 p-2.5 text-emerald-700 transition hover:bg-emerald-100"
                            :aria-label="`Send invoice to ${billing.tenant?.email ?? 'tenant'}`"
                            @click="beginSendInvoice(billing)"
                        >
                            <Inbox class="size-4" />
                        </button>
                        <button
                            type="button"
                            class="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                            @click="beginMarkPaid(billing)"
                        >
                            <Check class="size-4" />
                            Mark Paid
                        </button>
                    </template>
                    <span v-else>-</span>
                </div>
            </article>
        </div>

        <Pagination :pagination="billings" />

        <Modal
            :show="isFormerBillingsOpen"
            title="Former Tenant Billings"
            @close="isFormerBillingsOpen = false"
        >
            <div v-if="formerBillings.length === 0" class="empty-state">
                <p class="font-semibold text-slate-800">No archived billings</p>
                <p class="mt-1">
                    Billings will appear here when a tenant's tenancy ends.
                </p>
            </div>
            <div v-else class="space-y-4">
                <p class="text-sm text-slate-600">
                    These billing records are retained for former tenants and
                    are separate from the current billing list.
                </p>
                <div class="data-panel hidden overflow-x-auto md:block">
                    <table class="data-table min-w-full">
                        <thead>
                            <tr>
                                <th class="px-4 py-3">Tenant</th>
                                <th class="px-4 py-3">Billing Period</th>
                                <th class="px-4 py-3">Due Date</th>
                                <th class="px-4 py-3">Status</th>
                                <th class="px-4 py-3">Total</th>
                                <th class="px-4 py-3">Payment Details</th>
                                <th class="px-4 py-3 text-center">Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="billing in formerBillings"
                                :key="billing.id"
                            >
                                <td
                                    class="px-4 py-3 font-semibold text-slate-900"
                                >
                                    {{ tenantName(billing.tenant) }}
                                </td>
                                <td class="px-4 py-3">
                                    {{ formatPeriod(billing.billing_period) }}
                                </td>
                                <td class="px-4 py-3">
                                    {{ formatDate(billing.due_date) }}
                                </td>
                                <td class="px-4 py-3">
                                    <StatusBadge
                                        item="billing"
                                        :status="billing.status"
                                    />
                                </td>
                                <td class="px-4 py-3 font-bold text-slate-900">
                                    ₱{{ formatPrice(billing.total) }}
                                </td>
                                <td class="px-4 py-3">
                                    <span v-if="billing.status === 1">
                                        {{
                                            billing.paid_at
                                                ? formatDate(billing.paid_at)
                                                : 'Paid'
                                        }}
                                        ·
                                        {{
                                            paymentMethodName(
                                                billing.payment_method,
                                            )
                                        }}
                                    </span>
                                    <span v-else>-</span>
                                </td>
                                <td class="px-4 py-3 text-center">
                                    <button
                                        v-if="billing.status !== 1"
                                        type="button"
                                        class="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                                        @click="
                                            beginMarkPaidFromArchive(billing)
                                        "
                                    >
                                        <Check class="size-4" />
                                        Mark Paid
                                    </button>
                                    <span
                                        v-else
                                        class="text-xs font-medium text-emerald-700"
                                    >
                                        Paid
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="space-y-3 md:hidden">
                    <article
                        v-for="billing in formerBillings"
                        :key="billing.id"
                        class="mobile-card"
                    >
                        <div class="flex items-start justify-between gap-3">
                            <div>
                                <h3 class="font-semibold text-slate-900">
                                    {{ tenantName(billing.tenant) }}
                                </h3>
                                <p class="mt-1 text-sm text-slate-600">
                                    {{ formatPeriod(billing.billing_period) }}
                                </p>
                            </div>
                            <StatusBadge
                                item="billing"
                                :status="billing.status"
                            />
                        </div>
                        <dl class="mt-4 space-y-2 text-sm text-slate-600">
                            <div class="flex justify-between gap-3">
                                <dt>Due Date</dt>
                                <dd>{{ formatDate(billing.due_date) }}</dd>
                            </div>
                            <div class="flex justify-between gap-3">
                                <dt>Total</dt>
                                <dd class="font-bold text-slate-900">
                                    ₱{{ formatPrice(billing.total) }}
                                </dd>
                            </div>
                            <template v-if="billing.status === 1">
                                <div class="flex justify-between gap-3">
                                    <dt>Paid On</dt>
                                    <dd>
                                        {{
                                            billing.paid_at
                                                ? formatDate(billing.paid_at)
                                                : '-'
                                        }}
                                    </dd>
                                </div>
                                <div class="flex justify-between gap-3">
                                    <dt>Payment Method</dt>
                                    <dd>
                                        {{
                                            paymentMethodName(
                                                billing.payment_method,
                                            )
                                        }}
                                    </dd>
                                </div>
                            </template>
                        </dl>
                        <button
                            v-if="billing.status !== 1"
                            type="button"
                            class="mt-4 inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                            @click="beginMarkPaidFromArchive(billing)"
                        >
                            <Check class="size-4" />
                            Mark Paid
                        </button>
                    </article>
                </div>
            </div>
        </Modal>

        <Modal :show="isModalOpen" :title="modalTitle" @close="closeModal">
            <dl
                v-if="mode === 'view' && selectedBilling"
                class="details-grid grid gap-3 sm:grid-cols-2"
            >
                <div>
                    <dt class="text-sm text-gray-500">Tenant</dt>
                    <dd class="font-medium">
                        {{ tenantName(selectedBilling.tenant) }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Tenant Email</dt>
                    <dd class="font-medium">
                        {{ selectedBilling.tenant?.email }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Rent</dt>
                    <dd class="font-medium">
                        ₱{{ formatPrice(selectedBilling.rent) }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Water</dt>
                    <dd class="font-medium">
                        ₱{{ formatPrice(selectedBilling.water) }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Electricity</dt>
                    <dd class="font-medium">
                        ₱{{ formatPrice(selectedBilling.electricity) }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Billing Period</dt>
                    <dd class="font-medium">
                        {{ formatPeriod(selectedBilling.billing_period) }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Due Date</dt>
                    <dd class="font-medium">
                        {{ formatDate(selectedBilling.due_date) }}
                    </dd>
                </div>
                <div v-if="selectedBilling.status === 1">
                    <dt class="text-sm text-gray-500">Paid On</dt>
                    <dd class="font-medium">
                        {{
                            selectedBilling.paid_at
                                ? formatDate(selectedBilling.paid_at)
                                : '-'
                        }}
                    </dd>
                </div>
                <div v-if="selectedBilling.status === 1">
                    <dt class="text-sm text-gray-500">Payment Method</dt>
                    <dd class="font-medium">
                        {{ paymentMethodName(selectedBilling.payment_method) }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Total</dt>
                    <dd class="font-bold text-slate-900">
                        ₱{{ formatPrice(selectedBilling.total) }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Created at</dt>
                    <dd class="font-medium">
                        {{ formatDate(selectedBilling.created_at) }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm text-gray-500">Updated at</dt>
                    <dd class="font-medium">
                        {{ formatDate(selectedBilling.updated_at) }}
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
                        Tenant *
                        <select
                            v-model.number="form.tenant_id"
                            required
                            :disabled="mode === 'edit'"
                            @change="setTenantRent"
                        >
                            <option :value="null" disabled>
                                Select tenant
                            </option>
                            <option
                                v-for="tenant in availableTenants"
                                :key="tenant.id"
                                :value="tenant.id"
                            >
                                {{ tenant.first_name }} {{ tenant.last_name }}
                            </option>
                        </select>
                        <span
                            v-if="form.errors.tenant_id"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.tenant_id }}</span
                        >
                    </label>
                    <label class="form-label">
                        Billing Period *
                        <select
                            v-model="form.billing_period"
                            required
                            :disabled="mode !== 'create'"
                        >
                            <option
                                v-for="month in monthOptions"
                                :key="month.value"
                                :value="month.value"
                            >
                                {{ month.label }}
                            </option>
                        </select>
                        <span
                            v-if="form.errors.billing_period"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.billing_period }}</span
                        >
                    </label>
                    <label class="form-label">
                        Rent *
                        <input
                            v-model.number="form.rent"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            :disabled="mode !== 'create'"
                        />
                        <span
                            v-if="mode === 'create'"
                            class="mt-1 block text-xs text-gray-500"
                            >Auto-populated after selecting a tenant.</span
                        >
                        <span
                            v-if="form.errors.rent"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.rent }}</span
                        >
                    </label>
                    <label class="form-label">
                        Water
                        <input
                            v-model.number="form.water"
                            type="number"
                            min="0"
                            step="0.01"
                        />
                        <span
                            v-if="form.errors.water"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.water }}</span
                        >
                    </label>
                    <label class="form-label">
                        Electricity
                        <input
                            v-model.number="form.electricity"
                            type="number"
                            min="0"
                            step="0.01"
                        />
                        <span
                            v-if="form.errors.electricity"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.electricity }}</span
                        >
                    </label>
                    <label class="form-label">
                        Due Date *
                        <input
                            v-model="form.due_date"
                            type="date"
                            required
                            :min="today()"
                        />
                        <span
                            v-if="form.errors.due_date"
                            class="mt-1 block text-sm text-red-600"
                            >{{ form.errors.due_date }}</span
                        >
                    </label>
                </div>
                <div
                    class="rounded-xl bg-emerald-50 px-4 py-3 text-right font-bold text-emerald-900"
                >
                    Total <span class="ml-2">₱{{ formatPrice(total) }}</span>
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

        <Modal
            :show="isMarkPaidOpen"
            title="Record Payment"
            @close="isMarkPaidOpen = false"
        >
            <form
                class="dashboard-form space-y-5"
                @submit.prevent="confirmMarkPaid"
            >
                <div
                    v-if="selectedBilling"
                    class="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                    <p class="font-semibold text-slate-900">
                        {{ tenantName(selectedBilling.tenant) }}
                    </p>
                    <p>
                        {{ formatPeriod(selectedBilling.billing_period) }}
                        · Total ₱{{ formatPrice(selectedBilling.total) }}
                    </p>
                </div>
                <p
                    v-if="markPaidForm.errors.billing"
                    class="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700"
                    role="alert"
                >
                    {{ markPaidForm.errors.billing }}
                </p>
                <label class="form-label">
                    Payment Date *
                    <input
                        v-model="markPaidForm.paid_at"
                        type="date"
                        required
                        :max="currentDate()"
                    />
                    <span
                        v-if="markPaidForm.errors.paid_at"
                        class="mt-1 block text-sm text-red-600"
                    >
                        {{ markPaidForm.errors.paid_at }}
                    </span>
                </label>
                <label class="form-label">
                    Payment Method *
                    <select v-model="markPaidForm.payment_method" required>
                        <option value="cash">Cash</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="e_wallet">E-Wallet</option>
                        <option value="other">Other</option>
                    </select>
                    <span
                        v-if="markPaidForm.errors.payment_method"
                        class="mt-1 block text-sm text-red-600"
                    >
                        {{ markPaidForm.errors.payment_method }}
                    </span>
                </label>
                <div
                    class="flex flex-col-reverse justify-end gap-2 border-t border-slate-100 pt-5 sm:flex-row"
                >
                    <button
                        type="button"
                        class="secondary-button"
                        :disabled="markPaidForm.processing"
                        @click="isMarkPaidOpen = false"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="primary-button"
                        :disabled="markPaidForm.processing"
                    >
                        {{
                            markPaidForm.processing
                                ? 'Recording…'
                                : 'Confirm Payment'
                        }}
                    </button>
                </div>
            </form>
        </Modal>

        <ConfirmDialog
            :show="isDeleteOpen"
            title="Delete Billing"
            :message="`Delete billing for ${tenantName(selectedBilling?.tenant)}?`"
            confirm-label="Yes, Delete"
            :processing="deleteForm.processing"
            :error="deleteForm.errors.billing"
            @cancel="isDeleteOpen = false"
            @confirm="confirmDelete"
        />

        <ConfirmDialog
            :show="isInvoiceOpen"
            title="Send Invoice"
            :message="
                selectedBilling
                    ? `Send invoice to ${tenantName(selectedBilling.tenant)} (${selectedBilling.tenant?.email}) for ₱${formatPrice(selectedBilling.total)}?`
                    : 'Send this invoice?'
            "
            confirm-label="Send"
            :processing="invoiceForm.processing"
            :error="invoiceForm.errors.invoice"
            @cancel="isInvoiceOpen = false"
            @confirm="confirmSendInvoice"
        />
    </div>
</template>
