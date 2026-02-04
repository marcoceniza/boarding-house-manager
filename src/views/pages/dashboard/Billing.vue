<template>
    <div class="bg-white rounded-lg mt-5 shadow overflow-x-auto">
        <table class="min-w-full border border-gray-200">
            <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                    <th class="px-4 py-3 text-left">
                        Billing ID
                    </th>
                    <th class="px-4 py-3 text-left">
                        Tenant
                    </th>
                    <th class="px-4 py-3 text-left">
                        Room
                    </th>
                    <th class="px-4 py-3 text-left">
                        Billing Period
                    </th>
                    <th class="px-4 py-3 text-left">
                        Amount
                    </th>
                    <th class="px-4 py-3 text-left">
                        Due Date
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
                <!-- Paid -->
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3">
                        B-0001
                    </td>
                    <td class="px-4 py-3 font-medium">
                        Juan Dela Cruz
                    </td>
                    <td class="px-4 py-3">
                        Room 101
                    </td>
                    <td class="px-4 py-3">
                        Jan 2026
                    </td>
                    <td class="px-4 py-3 font-semibold">
                        ₱3,500
                    </td>
                    <td class="px-4 py-3">
                        Jan 05, 2026
                    </td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                            Paid
                        </span>
                    </td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <button class="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700">
                            View
                        </button>
                    </td>
                </tr>
                <!-- Unpaid -->
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3">
                        B-0002
                    </td>
                    <td class="px-4 py-3 font-medium">
                        Maria Santos
                    </td>
                    <td class="px-4 py-3">
                        Room 102
                    </td>
                    <td class="px-4 py-3">
                        Jan 2026
                    </td>
                    <td class="px-4 py-3 font-semibold">
                        ₱4,000
                    </td>
                    <td class="px-4 py-3 text-red-600 font-medium">
                        Jan 05, 2026
                    </td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                            Unpaid
                        </span>
                    </td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <button class="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                            Mark Paid
                        </button>
                        <button class="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700">
                            View
                        </button>
                    </td>
                </tr>
                <!-- Overdue -->
                <tr class="hover:bg-red-50">
                    <td class="px-4 py-3">
                        B-0003
                    </td>
                    <td class="px-4 py-3 font-medium">
                        Pedro Reyes
                    </td>
                    <td class="px-4 py-3">
                        Room 103
                    </td>
                    <td class="px-4 py-3">
                        Dec 2025
                    </td>
                    <td class="px-4 py-3 font-semibold">
                        ₱3,200
                    </td>
                    <td class="px-4 py-3 text-red-600 font-semibold">
                        Dec 05, 2025
                    </td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                            Overdue
                        </span>
                    </td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <button class="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                            Mark Paid
                        </button>
                        <button class="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700">
                            View
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>