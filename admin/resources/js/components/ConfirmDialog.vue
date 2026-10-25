<script setup lang="ts">
defineProps<{
    show: boolean;
    title: string;
    message: string;
    processing?: boolean;
    error?: string;
    confirmLabel?: string;
}>();

const emit = defineEmits<{
    cancel: [];
    confirm: [];
}>();
</script>

<template>
    <Teleport to="body">
        <div
            v-if="show"
            class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
            @click.self="emit('cancel')"
        >
            <section
                class="w-full max-w-md rounded-3xl border border-white/70 bg-white p-6 shadow-2xl shadow-slate-950/20 sm:p-7"
                role="alertdialog"
                aria-modal="true"
                :aria-label="title"
            >
                <div
                    class="mb-5 flex size-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-100"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        class="size-6"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v4m0 4h.01M10.3 3.9 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3l-7.5-13.1a2 2 0 0 0-3.4 0Z"
                        />
                    </svg>
                </div>
                <h2 class="text-lg font-bold tracking-tight text-slate-900">
                    {{ title }}
                </h2>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                    {{ message }}
                </p>
                <p
                    v-if="error"
                    class="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700"
                    role="alert"
                >
                    {{ error }}
                </p>
                <p class="mt-4 text-xs font-medium text-slate-500">
                    This action cannot be undone.
                </p>

                <div
                    class="mt-7 flex flex-col-reverse justify-end gap-2 sm:flex-row"
                >
                    <button
                        type="button"
                        class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                        :disabled="processing"
                        @click="emit('cancel')"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        class="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
                        :disabled="processing"
                        @click="emit('confirm')"
                    >
                        {{
                            processing
                                ? 'Please wait…'
                                : (confirmLabel ?? 'Confirm')
                        }}
                    </button>
                </div>
            </section>
        </div>
    </Teleport>
</template>
