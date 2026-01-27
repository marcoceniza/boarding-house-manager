<script setup>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

</script>

<template>
    <div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-amber-50 via-stone-100 to-rose-50">
        <div class="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/90 backdrop-blur shadow-2xl">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-extrabold text-gray-800">Welcome Back 👋</h1>
                <p class="text-gray-500 mt-2">Please login to your account</p>
            </div>
            <form @submit.prevent="login" class="space-y-5">
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
                <div class="flex items-center justify-between text-sm">
                    <label class="flex items-center gap-2 text-gray-600">
                    <input type="checkbox" class="rounded text-indigo-600 focus:ring-indigo-500">Remember me</label>
                    <a href="#" class="text-indigo-600 hover:underline">Forgot password?</a>
                </div>
                <BaseButton type="submit" rounded fullWidth>Login</BaseButton>
            </form>
            <p class="text-center text-sm text-gray-600 mt-6">
                Don’t have an account?
                <a href="#" class="text-indigo-600 font-semibold hover:underline">Sign up</a>
            </p>
        </div>
    </div>
</template>