<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

const page = usePage();
const isSidebarOpen = ref(false);

const pageTitles: Record<string, string> = {
    'dashboard/Index': 'Dashboard',
    'rooms/Index': 'Rooms',
    'tenants/Index': 'Tenants',
    'billings/Index': 'Billings',
};

const title = computed(() => pageTitles[page.component] ?? 'Dashboard');

watch(
    () => page.url,
    () => {
        isSidebarOpen.value = false;
    },
);
</script>

<template>
    <div class="min-h-screen bg-slate-50">
        <button
            v-if="isSidebarOpen"
            type="button"
            class="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-sm md:hidden"
            aria-label="Close navigation"
            @click="isSidebarOpen = false"
        />

        <div class="flex min-h-screen">
            <Sidebar :open="isSidebarOpen" @close="isSidebarOpen = false" />

            <main class="min-w-0 flex-1 p-4 sm:p-6 xl:p-8">
                <Header :title="title" @toggle-sidebar="isSidebarOpen = true" />

                <div
                    v-if="page.props.flash?.success || page.props.flash?.error"
                    class="mt-5 rounded-xl border px-4 py-3.5 text-sm shadow-sm"
                    :class="
                        page.props.flash?.error
                            ? 'border-rose-200 bg-rose-50 text-rose-800'
                            : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                    "
                    role="status"
                    aria-live="polite"
                >
                    {{ page.props.flash?.error ?? page.props.flash?.success }}
                </div>

                <slot />
            </main>
        </div>
    </div>
</template>
