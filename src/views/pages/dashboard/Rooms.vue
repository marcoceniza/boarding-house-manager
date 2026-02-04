<template>
    <div class="flex justify-end items-center my-4">
        <button class="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700">
            + Add Room
        </button>
    </div>
    <div class="bg-white rounded-lg shadow overflow-x-auto">
        <table class="min-w-full border border-gray-200">
            <thead class="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                    <th class="px-4 py-3 text-left">
                        Room No.
                    </th>
                    <th class="px-4 py-3 text-left">
                        Type
                    </th>
                    <th class="px-4 py-3 text-left">
                        Capacity
                    </th>
                    <th class="px-4 py-3 text-left">
                        Price / Month
                    </th>
                    <th class="px-4 py-3 text-left">
                        Occupied
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
                <!-- Room Row -->
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 font-medium">
                        Room 101
                    </td>
                    <td class="px-4 py-3">
                        Single
                    </td>
                    <td class="px-4 py-3">
                        1
                    </td>
                    <td class="px-4 py-3">
                        ₱3,500
                    </td>
                    <td class="px-4 py-3">
                        1 / 1
                    </td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                            Full
                        </span>
                    </td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <button class="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700">
                            View
                        </button>
                        <button class="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                            Edit
                        </button>
                        <button class="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                            Delete
                        </button>
                    </td>
                </tr>
                <!-- Available Room -->
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 font-medium">
                        Room 102
                    </td>
                    <td class="px-4 py-3">
                        Shared
                    </td>
                    <td class="px-4 py-3">
                        4
                    </td>
                    <td class="px-4 py-3">
                        ₱2,500
                    </td>
                    <td class="px-4 py-3">
                        2 / 4
                    </td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                            Available
                        </span>
                    </td>
                    <td class="px-4 py-3 text-center space-x-2">
                        <button class="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700">
                            View
                        </button>
                        <button class="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                            Edit
                        </button>
                        <button class="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>