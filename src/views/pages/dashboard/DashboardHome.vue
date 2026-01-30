<script setup>
import Header from '@/components/Header.vue';

const stats = [
    { label: 'Users', value: 128 },
    { label: 'Active Sessions', value: 42 },
    { label: 'Revenue', value: '$3,240' },
    { label: 'New Signups', value: 12 },
]
</script>

<template>
    <div class="min-h-screen flex bg-stone-100">
        <div class="flex-1 flex flex-col">
            <Header />
            <main class="flex-1 p-6 space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div
                        v-for="stat in stats"
                        :key="stat.label"
                        class="bg-white p-5 rounded-xl shadow-sm"
                    >
                        <p class="text-sm text-gray-500">{{ stat.label }}</p>
                        <p class="text-2xl font-extrabold text-gray-800 mt-1">{{ stat.value }}</p>
                    </div>
                </div>
                <div class="bg-white rounded-xl p-6 shadow-sm">
                    <h2 class="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
                    <div class="text-sm text-gray-500">No recent activity yet.</div>
                </div>
            </main>
        </div>
    </div>
</template>