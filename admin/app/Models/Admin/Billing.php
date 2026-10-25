<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['tenant_id', 'billing_period', 'rent', 'water', 'electricity', 'total', 'due_date', 'paid_at', 'payment_method', 'status'])]
class Billing extends Model
{
    protected $casts = [
        'due_date' => 'date',
        'paid_at' => 'date',
        // Keep billing_period as string, e.g., '2026-02'
        'billing_period' => 'string',
    ];

    // Automatically calculate total before saving
    protected static function booted()
    {
        static::saving(function ($billing) {
            $billing->rent = $billing->rent ?? 0;
            $billing->water = $billing->water ?? 0;
            $billing->electricity = $billing->electricity ?? 0;
            $billing->total = $billing->rent + $billing->water + $billing->electricity;
        });
    }

    /** @return BelongsTo<Tenant, $this> */
    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }
}
