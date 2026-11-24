<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['room_number', 'type', 'capacity', 'price_per_month', 'occupied', 'status'])]
class Room extends Model
{
    /** @return HasMany<Tenant, $this> */
    public function tenants(): HasMany
    {
        return $this->hasMany(Tenant::class);
    }
}
