<?php

namespace App\Models\Admin;

use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['first_name', 'last_name', 'email', 'room_id', 'move_in_date', 'status', 'ended_at'])]
class Tenant extends Model
{
    protected $casts = [
        'move_in_date' => 'date',
        'ended_at' => 'datetime',
    ];

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** @return BelongsTo<Room, $this> */
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    /** @return HasMany<Billing, $this> */
    public function billings(): HasMany
    {
        return $this->hasMany(Billing::class);
    }
}
