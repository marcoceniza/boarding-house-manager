<script setup>
defineProps({
    title: String,
    default: ''
});

</script>

<template>
    <header class="bg-white px-6 py-4 flex items-center justify-between">
        <h1 class="text-xl font-bold text-gray-800">{{ title }}</h1>
        <div class="flex items-center gap-3">
            <span class="text-sm text-gray-600">Hello, Admin</span>
            <div class="w-8 h-8 rounded-full bg-stone-300"></div>
        </div>
    </header>
</template>