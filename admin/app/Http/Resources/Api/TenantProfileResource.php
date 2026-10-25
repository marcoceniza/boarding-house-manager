<?php

namespace App\Http\Resources\Api;

use App\Models\Admin\Tenant;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Tenant */
class TenantProfileResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'move_in_date' => $this->move_in_date->toDateString(),
            'ended_at' => $this->ended_at?->toISOString(),
            'status' => $this->status,
            'room' => $this->whenLoaded('room', fn (): array => [
                'id' => $this->room->id,
                'room_number' => $this->room->room_number,
                'type' => $this->room->type,
                'price_per_month' => $this->room->price_per_month,
            ]),
        ];
    }
}
