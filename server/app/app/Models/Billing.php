<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Billing extends Model
{
    protected $fillable = [
        'tenant_id',
        'billing_period',
        'rent',
        'water',
        'electricity',
        'total',
        'due_date',
        'status',
    ];

    protected $casts = [
        'due_date' => 'date',
        'billing_period' => 'date',
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

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}