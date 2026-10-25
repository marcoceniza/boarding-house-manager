<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { Paginated } from '@/types/boarding-house';

defineProps<{
    pagination: Paginated<unknown>;
}>();

function labelText(label: string): string {
    return label.replaceAll('&laquo;', '‹').replaceAll('&raquo;', '›');
}
</script>

<template>
    <nav
        v-if="pagination.total > 0"
        class="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm shadow-slate-200/40 sm:flex-row sm:items-center sm:justify-between sm:px-5"
        aria-label="Pagination"
    >
        <p class="text-sm text-slate-500">
            Showing
            <span class="font-semibold text-slate-800">{{
                pagination.from
            }}</span>
            to
            <span class="font-semibold text-slate-800">{{
                pagination.to
            }}</span>
            of
            <span class="font-semibold text-slate-800">{{
                pagination.total
            }}</span>
            results
        </p>

        <div class="flex flex-wrap items-center gap-1.5">
            <template v-for="link in pagination.links" :key="link.label">
                <Link
                    v-if="link.url"
                    :href="link.url"
                    preserve-scroll
                    class="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                    :class="
                        link.active
                            ? 'border-emerald-700 bg-emerald-700 text-white'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    "
                    :aria-current="link.active ? 'page' : undefined"
                    >{{ labelText(link.label) }}</Link
                >
                <span
                    v-else
                    class="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm text-slate-400"
                    :class="
                        link.label.includes('Previous') ||
                        link.label.includes('Next')
                            ? 'border border-slate-100'
                            : ''
                    "
                    aria-hidden="true"
                    >{{ labelText(link.label) }}</span
                >
            </template>
        </div>
    </nav>
</template>
