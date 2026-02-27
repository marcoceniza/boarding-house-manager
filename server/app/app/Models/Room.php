<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tenant;

class Room extends Model
{
    protected $fillable = [
        'room_number',
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
