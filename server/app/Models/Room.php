<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = [
        'type',
        'capacity',
        'price_per_month',
        'occupied',
        'status',
    ];

    public function tenants() {
        return $this->hasMany(Tenant::class);
    }
}
