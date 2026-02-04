<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const showPassword = ref(false);
const router = useRouter();

</script>

<template>
    <div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-amber-50 via-stone-100 to-rose-50">
        <div class="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/90 backdrop-blur shadow-2xl">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-extrabold text-gray-800">Welcome Back</h1>
                <p class="text-gray-500 mt-2">Please login to your account</p>
            </div>
            <form @submit.prevent="login" class="space-y-5">
                <BaseInput
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                />
                <div class="relative">
                    <BaseInput
                        :type="showPassword ? 'text' : 'password'"
                        label="Password"
                        placeholder="••••••••"
                    />

                    <component
                        :is="showPassword ? EyeSlashIcon : EyeIcon"
                        class="size-5 text-gray-500 absolute right-3 bottom-3 cursor-pointer hover:text-gray-700 transition-colors duration-150"
                        @click="showPassword = !showPassword"
                    />
                </div>
                <div class="flex items-center justify-between text-sm">
                    <label class="flex items-center gap-2 text-gray-600">
                    <input type="checkbox" class="rounded text-indigo-600 focus:ring-indigo-500">Remember me</label>
                    <a href="#" class="text-indigo-600 hover:underline">Forgot password?</a>
                </div>
                <BaseButton type="submit" rounded fullWidth>LOGIN</BaseButton>
            </form>
            <p class="text-center text-sm text-gray-600 mt-6">
                Don’t have an account?
                <a @click="router.push('/register')"  class="text-indigo-600 cursor-pointer font-semibold hover:underline">Sign up</a>
            </p>
        </div>
    </div>
</template>