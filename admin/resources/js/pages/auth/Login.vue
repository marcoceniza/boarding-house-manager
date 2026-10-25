<script setup>
import { ref } from 'vue';
import { Building2, Check, Eye, EyeOff, ShieldCheck } from '@lucide/vue';
import { useForm } from '@inertiajs/vue3';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { store as login } from '@/routes/login';

const showPassword = ref(false);
const form = useForm({
    email: '',
    password: '',
});

const handleSubmit = () => {
    form.post(login(), {
        onFinish: () => {
            form.reset('password');
        },
    });
};
</script>

<template>
    <div class="grid min-h-screen bg-[#f4f7f5] lg:grid-cols-[1.05fr_0.95fr]">
        <aside
            class="relative hidden overflow-hidden bg-[#102c25] px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between xl:px-20"
        >
            <div
                class="absolute -top-24 -right-28 size-[34rem] rounded-full border border-emerald-300/10"
            ></div>
            <div
                class="absolute -top-8 -right-12 size-[24rem] rounded-full border border-emerald-300/10"
            ></div>
            <div
                class="absolute -bottom-40 -left-32 size-[32rem] rounded-full bg-emerald-400/10 blur-3xl"
            ></div>

            <div class="relative flex items-center gap-3">
                <span
                    class="flex size-11 items-center justify-center rounded-2xl bg-emerald-300/15 text-emerald-200"
                >
                    <Building2 class="size-5" />
                </span>
                <div>
                    <p class="font-bold tracking-wide">Haven House</p>
                    <p class="text-xs text-emerald-100/60">
                        Property management
                    </p>
                </div>
            </div>

            <div class="relative max-w-xl py-16">
                <p
                    class="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-emerald-100"
                >
                    <span class="size-1.5 rounded-full bg-emerald-300"></span>
                    A calmer way to manage your property
                </p>
                <h1
                    class="text-4xl leading-tight font-semibold tracking-tight xl:text-5xl"
                >
                    Make room for what matters.
                </h1>
                <p class="mt-5 max-w-md text-base leading-7 text-slate-300">
                    Keep residents, rooms, and monthly billing organized from
                    one thoughtful workspace.
                </p>
                <div class="mt-9 space-y-3 text-sm text-emerald-50/85">
                    <p class="flex items-center gap-3">
                        <Check class="size-4 text-emerald-300" /> A clear view
                        of every room
                    </p>
                    <p class="flex items-center gap-3">
                        <Check class="size-4 text-emerald-300" /> Resident
                        records in one place
                    </p>
                    <p class="flex items-center gap-3">
                        <Check class="size-4 text-emerald-300" /> Simple,
                        dependable billing
                    </p>
                </div>
            </div>

            <p class="relative text-xs text-slate-400">
                Built to make the everyday easier.
            </p>
        </aside>

        <main
            class="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8"
        >
            <div class="w-full max-w-md">
                <div class="mb-8 flex items-center gap-3 lg:hidden">
                    <span
                        class="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800"
                    >
                        <Building2 class="size-5" />
                    </span>
                    <div>
                        <p class="font-bold text-slate-900">Haven House</p>
                        <p class="text-xs text-slate-500">
                            Property management
                        </p>
                    </div>
                </div>

                <section
                    class="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-10"
                >
                    <div class="mb-8">
                        <div
                            class="mb-5 flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                        >
                            <ShieldCheck class="size-6" />
                        </div>
                        <p
                            class="text-xs font-semibold tracking-[0.15em] text-emerald-700 uppercase"
                        >
                            Admin workspace
                        </p>
                        <h2
                            class="mt-2 text-3xl font-bold tracking-tight text-slate-900"
                        >
                            Welcome back
                        </h2>
                        <p class="mt-2 text-sm leading-6 text-slate-500">
                            Sign in to continue managing your property.
                        </p>
                    </div>

                    <form class="space-y-5" @submit.prevent="handleSubmit">
                        <Input
                            type="email"
                            label="Email"
                            v-model="form.email"
                            placeholder="you@example.com"
                            :error="form.errors.email"
                        />
                        <div class="relative">
                            <Input
                                :type="showPassword ? 'text' : 'password'"
                                label="Password"
                                v-model="form.password"
                                placeholder="Enter your password"
                                :error="form.errors.password"
                            />
                            <button
                                type="button"
                                class="absolute top-8 right-2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                                :aria-label="
                                    showPassword
                                        ? 'Hide password'
                                        : 'Show password'
                                "
                                :aria-pressed="showPassword"
                                @click="showPassword = !showPassword"
                            >
                                <EyeOff v-if="showPassword" class="size-5" />
                                <Eye v-else class="size-5" />
                            </button>
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            :disabled="form.processing"
                            class="!h-12 !rounded-xl !bg-emerald-700 !font-semibold !shadow-md !shadow-emerald-900/15 hover:!bg-emerald-800"
                        >
                            {{
                                form.processing
                                    ? 'Signing in...'
                                    : 'Sign in to your account'
                            }}
                        </Button>
                    </form>
                    <p class="mt-7 text-center text-xs text-slate-400">
                        Secure sign-in for property administrators
                    </p>
                </section>
            </div>
        </main>
    </div>
</template>
