<script setup lang="ts">
import { ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { ChevronDown, Menu } from '@lucide/vue';
import { logout } from '@/routes';
import type { User } from '@/types/auth';

defineProps<{
    title: string;
}>();

const emit = defineEmits<{
    'toggle-sidebar': [];
}>();

const page = usePage<{ auth: { user: User | null } }>();
const isProfileOpen = ref(false);
const logoutForm = useForm({});

function logOut(): void {
    logoutForm.post(logout.url());
}
</script>

<template>
    <header
        class="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-sm sm:px-6"
    >
        <div class="flex items-center gap-3">
            <button
                type="button"
                class="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
                aria-label="Open navigation"
                @click="emit('toggle-sidebar')"
            >
                <Menu class="size-5" />
            </button>

            <div>
                <p
                    class="hidden text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase sm:block"
                >
                    Haven House
                </p>
                <h1
                    class="text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
                >
                    {{ title }}
                </h1>
            </div>
        </div>

        <div class="relative">
            <button
                type="button"
                class="flex max-w-full items-center gap-2.5 rounded-xl p-1.5 text-left transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none sm:gap-3"
                aria-haspopup="menu"
                aria-controls="profile-menu"
                :aria-label="`Account menu for ${page.props.auth.user?.name ?? 'Admin'}`"
                :aria-expanded="isProfileOpen"
                @click="isProfileOpen = !isProfileOpen"
            >
                <span class="hidden min-w-0 text-right sm:block">
                    <span
                        class="block max-w-40 truncate text-sm leading-5 font-semibold text-slate-800 lg:max-w-56"
                    >
                        Hello, {{ page.props.auth.user?.name ?? 'Admin' }}
                    </span>
                    <span class="block text-xs leading-4 text-slate-500">
                        Administrator
                    </span>
                </span>
                <span
                    class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-800 ring-1 ring-emerald-200"
                    aria-hidden="true"
                >
                    {{
                        page.props.auth.user?.name?.charAt(0).toUpperCase() ??
                        'A'
                    }}
                </span>
                <ChevronDown
                    class="hidden size-4 shrink-0 text-slate-400 sm:block"
                />
            </button>

            <div
                v-if="isProfileOpen"
                id="profile-menu"
                class="absolute right-0 z-20 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10"
                role="menu"
            >
                <p class="font-semibold text-slate-900">
                    {{ page.props.auth.user?.name }}
                </p>
                <p class="mt-1 text-sm break-all text-slate-500">
                    {{ page.props.auth.user?.email }}
                </p>
                <button
                    type="button"
                    class="mt-4 w-full rounded-xl border-t border-slate-100 px-3 py-3 text-left text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:opacity-50"
                    role="menuitem"
                    :disabled="logoutForm.processing"
                    @click="logOut"
                >
                    {{ logoutForm.processing ? 'Logging out…' : 'Logout' }}
                </button>
            </div>
        </div>
    </header>
</template>
