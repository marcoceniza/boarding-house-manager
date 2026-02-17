<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const showPassword = ref(false);
const router = useRouter();
const authStore = useAuthStore();

const formData = reactive({
    email: '',
    password: '',
});

</script>

<template>
    <div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-amber-50 via-stone-100 to-rose-50">
        <div class="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/90 backdrop-blur shadow-2xl">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-extrabold text-gray-800">Welcome Back</h1>
                <p class="text-gray-500 mt-2">Please login to your account</p>
            </div>
            <form @submit.prevent="authStore.authentication('login', formData)" class="space-y-5">
                <BaseInput
                    type="email"
                    label="Email"
                    v-model="formData.email"
                    placeholder="you@example.com"
                    :error="authStore.loginErrors?.email?.[0]"
                />
                <div class="relative">
                    <BaseInput
                        :type="showPassword ? 'text' : 'password'"
                        label="Password"
                        v-model="formData.password"
                        placeholder="••••••••"
                        :error="authStore.loginErrors?.password?.[0]"
                    />

                    <component
                        :is="showPassword ? EyeSlashIcon : EyeIcon"
                        class="size-5 text-gray-500 absolute right-3 cursor-pointer hover:text-gray-700 transition-colors duration-150"
                        :class="authStore.loginErrors?.password?.[0] ? 'bottom-9.25' : 'bottom-3'"
                        @click="showPassword = !showPassword"
                    />
                </div>
                <div class="flex items-center justify-end text-sm">
                    <a href="#" class="text-indigo-600 hover:underline">Forgot password?</a>
                </div>
                <BaseButton
                    type="submit"
                    rounded
                    fullWidth
                    :disabled="authStore.isLoading"
                >
                    {{ authStore.isLoading ? 'Logging in...' : 'LOGIN' }}
                </BaseButton>
            </form>
            <p class="text-center text-sm text-gray-600 mt-6">
                Don’t have an account?
                <a @click="router.push('/register')"  class="text-indigo-600 cursor-pointer font-semibold hover:underline">Sign up</a>
            </p>
        </div>
    </div>
</template>