<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleRedirect = () => {
    const token = localStorage.getItem('token')

    if (token) {
        router.push({ name: 'Dashboard' })
    } else {
        router.push({ name: 'login' })
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
        <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p class="text-gray-600 mb-6">
            Oops! The page you are looking for does not exist.
        </p>

        <button
            @click="handleRedirect"
            class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
            Go back
        </button>
        </div>
    </div>
</template>