<?php

namespace App\Http\Resources\Api;

use App\Models\Admin\Billing;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Billing */
class BillingResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        $status = $this->status === 1
            ? 1
            : ($this->status === 2 || $this->due_date->lt(today()) ? 2 : 0);

        return [
            'id' => $this->id,
            'billing_period' => $this->billing_period,
            'rent' => $this->rent,
            'water' => $this->water,
            'electricity' => $this->electricity,
            'total' => $this->total,
            'due_date' => $this->due_date->toDateString(),
            'paid_at' => $this->paid_at?->toDateString(),
            'payment_method' => $this->payment_method,
            'status' => $status,
        ];
    }
}
