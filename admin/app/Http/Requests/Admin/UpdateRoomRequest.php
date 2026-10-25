<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    protected function prepareForValidation(): void
    {
        $price = $this->input('price_per_month');

        if (is_string($price)) {
            $this->merge(['price_per_month' => str_replace(',', '', $price)]);
        }
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'room_number' => [
                'required',
                'string',
                'max:10',
                Rule::unique('rooms', 'room_number')->ignore($this->route('room')),
            ],
            'type' => ['required', 'string', 'max:50'],
            'capacity' => ['required', 'integer', 'min:1'],
            'price_per_month' => ['required', 'numeric', 'min:0'],
        ];
    }
}
