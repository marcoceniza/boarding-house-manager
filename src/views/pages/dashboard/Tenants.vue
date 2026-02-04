<template>
    <div class="overflow-x-auto bg-white mt-5 rounded-lg shadow">
        <table class="min-w-full border border-gray-200">
            <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                    <th class="px-4 py-3 text-left">
                        Tenant ID
                    </th>
                    <th class="px-4 py-3 text-left">
                        Name
                    </th>
                    <th class="px-4 py-3 text-left">
                        Room
                    </th>
                    <th class="px-4 py-3 text-left">
                        Monthly Rent
                    </th>
                    <th class="px-4 py-3 text-left">
                        Status
                    </th>
                    <th class="px-4 py-3 text-center">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 text-sm">
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3">
                        T-001
                    </td>
                    <td class="px-4 py-3 font-medium">
                        Juan Dela Cruz
                    </td>
                    <td class="px-4 py-3">
                        Room 101
                    </td>
                    <td class="px-4 py-3">
                        ₱3,500
                    </td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                            Active
                        </span>
                    </td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <button class="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                            View
                        </button>
                        <button class="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                            Remove
                        </button>
                    </td>
                </tr>
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3">
                        T-002
                    </td>
                    <td class="px-4 py-3 font-medium">
                        Maria Santos
                    </td>
                    <td class="px-4 py-3">
                        Room 102
                    </td>
                    <td class="px-4 py-3">
                        ₱4,000
                    </td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                            Pending
                        </span>
                    </td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <button class="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                            View
                        </button>
                        <button class="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                            Remove
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>