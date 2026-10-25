<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTenantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:100', 'unique:tenants,email'],
            'room_id' => ['required', 'integer', 'exists:rooms,id'],
            'move_in_date' => ['required', 'date', 'after_or_equal:today'],
            'occupied' => ['required', 'integer', 'min:1'],
            // Status => 0 = Inactive, 1 = Active, 2 = Left
            'status' => ['nullable', 'integer', 'in:0,1,2'],
        ];
    }

    public function messages(): array
    {
        return [
            'move_in_date.after_or_equal' => 'Move-in date cannot be earlier than today.',
        ];
    }
}
