<script setup>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

</script>

<template>
    <div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-amber-50 via-stone-100 to-rose-50">
        <div class="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/90 backdrop-blur shadow-2xl">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-extrabold text-gray-800">Create an Account</h1>
                <p class="text-gray-500 mt-2">Sign up to get started</p>
            </div>
            <form @submit.prevent="register" class="space-y-5">
                <BaseInput
                    label="Name"
                    placeholder="Name"
                />
                <BaseInput
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                />
                <BaseInput
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                />
                <BaseInput
                    type="password"
                    label="Confirm Password"
                    placeholder="••••••••"
                />
                <BaseButton type="submit" rounded fullWidth>CREATE ACCOUNT</BaseButton>
            </form>
            <p class="text-center text-sm text-gray-600 mt-6">
                Already have an account?
                <a @click="$router.push('/login')" class="text-indigo-600 cursor-pointer font-semibold hover:underline">Log in</a>
            </p>
        </div>
    </div>
</template>