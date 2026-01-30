<template>
    <div class="min-h-screen flex bg-gray-100">
        <aside class="w-64 bg-blue-500 hidden md:flex flex-col">
            <h2 class="px-6 py-4 text-xl font-extrabold text-white">My System</h2>

            <nav class="flex-1 px-4 space-y-2">
                <RouterLink to="/dashboard" class="block px-4 py-2 rounded-lg bg-stone-100 text-gray-800 font-semibold">Dashboard</RouterLink>
                <RouterLink to="/dashboard/tenants" class="block px-4 py-2 rounded-lg text-white hover:bg-stone-100 hover:text-gray-800 hover:font-semibold">Tenants</RouterLink>
                <RouterLink to="/dashboard/rooms" class="block px-4 py-2 rounded-lg text-white hover:bg-stone-100 hover:text-gray-800 hover:font-semibold" >Rooms</RouterLink>
                <RouterLink to="/dashboard/billing" class="block px-4 py-2 rounded-lg text-white hover:bg-stone-100 hover:text-gray-800 hover:font-semibold">Billing</RouterLink>
                <RouterLink to="/dashboard/settings" class="block px-4 py-2 rounded-lg text-white hover:bg-stone-100 hover:text-gray-800 hover:font-semibold">Settings</RouterLink>
            </nav>

            <p class="px-6 py-4 border-t text-sm text-white/70">© 2026</p>
        </aside>
    </div>
</template>