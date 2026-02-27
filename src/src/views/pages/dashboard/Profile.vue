<template>
    <div class=" bg-white rounded-lg shadow mt-5 p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">
            Admin Profile
        </h2>
        <form class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input type="text" class="mt-1 w-full rounded border-gray-300 focus:ring focus:ring-blue-200"
                placeholder="Juan Dela Cruz" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">
                    Email Address
                </label>
                <input type="email" class="mt-1 w-full rounded border-gray-300 focus:ring focus:ring-blue-200"
                placeholder="admin@email.com" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input type="text" class="mt-1 w-full rounded border-gray-300 focus:ring focus:ring-blue-200"
                placeholder="09XXXXXXXXX" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <input type="text" disabled class="mt-1 w-full rounded bg-gray-100 border-gray-300"
                value="admin" />
            </div>
            <div class="pt-4">
                <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Update Profile
                </button>
            </div>
        </form>
    </div>
</template>