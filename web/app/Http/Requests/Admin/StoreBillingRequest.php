<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBillingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    protected function prepareForValidation(): void
    {
        $rent = $this->input('rent');

        if (is_string($rent)) {
            $this->merge(['rent' => str_replace(',', '', $rent)]);
        }
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tenant_id' => ['required', 'exists:tenants,id'],
            'billing_period' => [
                'required',
                'date_format:Y-m',
                Rule::unique('billings', 'billing_period')
                    ->where('tenant_id', $this->input('tenant_id')),
            ],
            'rent' => ['required', 'numeric', 'min:0'],
            'water' => ['nullable', 'numeric', 'min:0'],
            'electricity' => ['nullable', 'numeric', 'min:0'],
            'due_date' => ['required', 'date', 'after_or_equal:today'],
        ];
    }

    public function messages(): array
    {
        return [
            'due_date.after_or_equal' => 'Billing period cannot be earlier than today.',
        ];
    }
}
