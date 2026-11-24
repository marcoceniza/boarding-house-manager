<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import {
    Activity,
    DoorOpen,
    ReceiptText,
    UsersRound,
    UserRoundPlus,
    Wallet,
} from '@lucide/vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { index as billingsIndex } from '@/routes/dashboard/billings';
import { index as roomsIndex } from '@/routes/dashboard/rooms';
import { index as tenantsIndex } from '@/routes/dashboard/tenants';

defineOptions({ layout: DashboardLayout });

type ActivityItem = {
    id: string;
    type: 'room' | 'tenant' | 'billing';
    title: string;
    description: string;
    occurred_at: string;
};

const props = defineProps<{
    activities: ActivityItem[];
    statistics: {
        rooms: number;
        activeTenants: number;
        collectedThisMonth: number;
        outstandingBalance: number;
    };
}>();

const stats = computed(() => [
    {
        label: 'Rooms',
        value: props.statistics.rooms.toLocaleString('en-US'),
        description: 'Rooms on record',
        icon: DoorOpen,
        tone: 'bg-sky-50 text-sky-700',
        href: roomsIndex.url(),
    },
    {
        label: 'Active Tenants',
        value: props.statistics.activeTenants.toLocaleString('en-US'),
        description: 'Current active tenancies',
        icon: UsersRound,
        tone: 'bg-emerald-50 text-emerald-700',
        href: tenantsIndex.url(),
    },
    {
        label: 'Collected This Month',
        value: `₱${props.statistics.collectedThisMonth.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`,
        description: 'Payments recorded this month',
        icon: Wallet,
        tone: 'bg-amber-50 text-amber-700',
        href: billingsIndex.url(),
    },
    {
        label: 'Outstanding Balance',
        value: `₱${props.statistics.outstandingBalance.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`,
        description: 'Across unpaid and overdue bills',
        icon: ReceiptText,
        tone: 'bg-violet-50 text-violet-700',
        href: billingsIndex.url(),
    },
]);

const activityIcons = {
    room: DoorOpen,
    tenant: UserRoundPlus,
    billing: ReceiptText,
};

const activityTones = {
    room: 'bg-sky-50 text-sky-700',
    tenant: 'bg-emerald-50 text-emerald-700',
    billing: 'bg-amber-50 text-amber-700',
};

const formatActivityDate = (value: string): string => {
    return new Date(value).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
};
</script>

<template>
    <div class="page-content">
        <div class="page-intro">
            <div>
                <p class="page-eyebrow">Overview</p>
                <h2 class="page-heading">Your dashboard</h2>
                <p class="page-description">
                    A quick snapshot of what is happening across your property.
                </p>
            </div>
            <p class="text-sm text-slate-500">Welcome to your workspace</p>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            <Link
                v-for="stat in stats"
                :key="stat.label"
                :href="stat.href"
                class="block rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
            >
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <p class="text-sm font-medium text-slate-500">
                            {{ stat.label }}
                        </p>
                        <p
                            class="mt-3 text-3xl font-bold tracking-tight text-slate-900"
                        >
                            {{ stat.value }}
                        </p>
                        <p class="mt-2 text-xs text-slate-400">
                            {{ stat.description }}
                        </p>
                    </div>
                    <span
                        class="flex size-11 items-center justify-center rounded-xl"
                        :class="stat.tone"
                    >
                        <component :is="stat.icon" class="size-5" />
                    </span>
                </div>
            </Link>
        </div>

        <section class="data-panel">
            <div
                class="flex flex-col gap-1 border-b border-slate-100 px-6 py-5 sm:px-7"
            >
                <p class="page-eyebrow">Latest updates</p>
                <h2 class="text-lg font-bold tracking-tight text-slate-900">
                    Recent activity
                </h2>
            </div>
            <div
                v-if="activities.length === 0"
                class="px-6 py-12 text-center sm:px-7"
            >
                <span
                    class="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500"
                >
                    <Activity class="size-5" />
                </span>
                <p class="mt-4 text-sm font-semibold text-slate-800">
                    You're all caught up
                </p>
                <p class="mt-1 text-sm text-slate-500">
                    New activity will appear here as your property is updated.
                </p>
            </div>
            <ul v-else class="divide-y divide-slate-100 px-6 sm:px-7">
                <li
                    v-for="activity in activities"
                    :key="activity.id"
                    class="flex items-center gap-4 py-4 first:pt-5 last:pb-5"
                >
                    <span
                        class="flex size-10 shrink-0 items-center justify-center rounded-xl"
                        :class="activityTones[activity.type]"
                        aria-hidden="true"
                    >
                        <component
                            :is="activityIcons[activity.type]"
                            class="size-5"
                        />
                    </span>
                    <div class="min-w-0 flex-1">
                        <p class="text-sm font-semibold text-slate-800">
                            {{ activity.title }}
                        </p>
                        <p class="mt-0.5 truncate text-sm text-slate-500">
                            {{ activity.description }}
                        </p>
                    </div>
                    <time
                        :datetime="activity.occurred_at"
                        class="shrink-0 text-right text-xs text-slate-400"
                    >
                        {{ formatActivityDate(activity.occurred_at) }}
                    </time>
                </li>
            </ul>
        </section>
    </div>
</template>
