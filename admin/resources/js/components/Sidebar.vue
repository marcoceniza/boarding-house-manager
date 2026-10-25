<script setup lang="ts">
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import {
    Building2,
    LayoutDashboard,
    ReceiptText,
    DoorOpen,
    UsersRound,
} from '@lucide/vue';
import dashboard from '@/routes/dashboard';

defineProps<{
    open: boolean;
}>();

const emit = defineEmits<{
    close: [];
}>();

const page = usePage();
const navigation = [
    { label: 'Dashboard', href: dashboard.index.url(), icon: LayoutDashboard },
    { label: 'Rooms', href: dashboard.rooms.index.url(), icon: DoorOpen },
    { label: 'Tenants', href: dashboard.tenants.index.url(), icon: UsersRound },
    {
        label: 'Billings',
        href: dashboard.billings.index.url(),
        icon: ReceiptText,
    },
];

const currentUrl = computed(() => page.url.split('?')[0]);

function isActive(href: string): boolean {
    return href === '/dashboard'
        ? currentUrl.value === href
        : currentUrl.value.startsWith(href);
}
</script>

<template>
    <aside
        class="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-[#102c25] text-white transition-transform duration-300 md:static md:translate-x-0"
        :class="open ? 'translate-x-0' : '-translate-x-full'"
    >
        <div
            class="flex items-center justify-between border-b border-white/10 px-6 py-6"
        >
            <div class="flex items-center gap-3">
                <span
                    class="flex size-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300"
                >
                    <Building2 class="size-5" />
                </span>
                <div>
                    <h2 class="text-sm font-bold tracking-wide text-white">
                        Haven House
                    </h2>
                    <p class="mt-0.5 text-xs text-emerald-100/60">
                        Property management
                    </p>
                </div>
            </div>
            <button
                type="button"
                class="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white md:hidden"
                aria-label="Close navigation"
                @click="emit('close')"
            >
                &times;
            </button>
        </div>

        <div
            class="px-6 pt-7 pb-2 text-[10px] font-semibold tracking-[0.18em] text-white/40 uppercase"
        >
            Workspace
        </div>
        <nav class="flex-1 space-y-1 px-4" aria-label="Main navigation">
            <Link
                v-for="item in navigation"
                :key="item.href"
                :href="item.href"
                class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                :class="
                    isActive(item.href)
                        ? 'bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/15 ring-inset'
                        : 'text-slate-300 hover:bg-white/7 hover:text-white'
                "
                @click="emit('close')"
            >
                <component :is="item.icon" class="size-[18px] shrink-0" />
                <span>{{ item.label }}</span>
            </Link>
        </nav>

        <div class="m-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p class="text-xs font-semibold text-white">
                Your property, in order.
            </p>
            <p class="mt-1 text-xs leading-5 text-slate-400">
                Manage rooms, residents, and monthly billing in one place.
            </p>
        </div>
        <p class="border-t border-white/10 px-6 py-4 text-xs text-slate-500">
            © 2026 Haven House
        </p>
    </aside>
</template>
