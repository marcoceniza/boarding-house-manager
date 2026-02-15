<script setup>
import { computed } from "vue";

const model = defineModel();

const props = defineProps({
    variant:{ type: String, default: "input" }, // input | textarea | select | checkbox | radio
    type: { type:  String, default: "text" },
    placeholder: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
    rows: { type: Number, default: 3 },
    label: { type: String, default: "" },
    error: { type: String, default: "" },
    options: { type: Array, default: () => [] } // [{ label: 'Room 1', value: 1 }]
});

const inputClasses = computed(() => [
    "border rounded px-4 py-3 w-full text-base leading-tight",
    "focus:outline-none focus:ring-2 focus:ring-offset-1 transition",
    props.disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white",
    props.error
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-blue-500",
    ].join(" "));
</script>

<template>
    <div class="flex flex-col w-[48%] gap-1">
        <!-- LABEL -->
        <label
            v-if="label && variant !== 'checkbox'"
            class="text-sm font-semibold text-gray-600"
        >
            {{ label }}
        </label>

        <!-- INPUT -->
        <input
            v-if="variant === 'input'"
            v-model="model"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            :class="inputClasses"
        />

        <!-- TEXTAREA -->
        <textarea
            v-else-if="variant === 'textarea'"
            v-model="model"
            :rows="rows"
            :placeholder="placeholder"
            :disabled="disabled"
            :class="[inputClasses, 'resize-y']"
        />

        <!-- SELECT -->
        <select
            v-else-if="variant === 'select'"
            v-model="model"
            :disabled="disabled"
            :class="inputClasses"
        >
            <option value="" disabled>
                {{ placeholder || "Select an option" }}
            </option>

            <option
                v-for="(option, idx) in options"
                :key="idx"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>

        <!-- CHECKBOX -->
        <label
            v-else-if="variant === 'checkbox'"
            class="flex items-center gap-2 text-sm text-gray-700"
        >
        <input
            type="checkbox"
            v-model="model"
            :disabled="disabled"
            class="h-4 w-4 rounded border-gray-300"
        />
            {{ label || placeholder }}
        </label>

        <!-- RADIO -->
        <div v-else-if="variant === 'radio'" class="flex flex-col gap-2">
            <label
                v-for="option in options"
                :key="option.value"
                class="flex items-center gap-2 text-sm text-gray-700"
            >
                <input
                    type="radio"
                    :value="option.value"
                    v-model="model"
                    :disabled="disabled"
                    class="h-4 w-4"
                />
                {{ option.label }}
            </label>
        </div>

        <!-- ERROR -->
        <p v-if="error" class="text-sm text-red-500">
            {{ error }}
        </p>
    </div>
</template>