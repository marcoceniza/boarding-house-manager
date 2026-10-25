<script setup lang="ts">
defineProps<{
    show: boolean;
    title: string;
}>();

const emit = defineEmits<{
    close: [];
}>();
</script>

<template>
    <Teleport to="body">
        <div
            v-if="show"
            class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
            @click.self="emit('close')"
            @keydown.esc.window="emit('close')"
        >
            <section
                class="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-slate-950/20"
                role="dialog"
                aria-modal="true"
                :aria-label="title"
            >
                <div
                    class="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:px-7"
                >
                    <div>
                        <p
                            class="text-[10px] font-semibold tracking-[0.16em] text-emerald-700 uppercase"
                        >
                            Haven House
                        </p>
                        <h2
                            class="mt-1 text-xl font-bold tracking-tight text-slate-900"
                        >
                            {{ title }}
                        </h2>
                    </div>
                    <button
                        type="button"
                        class="flex size-9 items-center justify-center rounded-xl text-xl leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"
                        aria-label="Close"
                        @click="emit('close')"
                    >
                        &times;
                    </button>
                </div>
                <div class="overflow-y-auto px-6 py-6 sm:px-7">
                    <slot />
                </div>
            </section>
        </div>
    </Teleport>
</template>
