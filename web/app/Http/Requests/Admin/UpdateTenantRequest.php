<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTenantRequest extends FormRequest
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
            'first_name' => ['sometimes', 'required', 'string', 'max:50'],
            'last_name' => ['sometimes', 'required', 'string', 'max:50'],
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:100',
                Rule::unique('tenants', 'email')->ignore($this->route('tenant')),
            ],
            'room_id' => ['sometimes', 'required', 'integer', 'exists:rooms,id'],
            'move_in_date' => ['sometimes', 'required', 'date', 'after_or_equal:today'],
            'occupied' => ['sometimes', 'required', 'integer', 'min:1'],
        ];
    }
}
