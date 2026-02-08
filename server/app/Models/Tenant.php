<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    protected $fillable = [
        'name',
        'email',
        'room_id',
        'move_in_date',
        'status',
    ];

    protected $casts = [
        'move_in_date' => 'date',
    ];

    public function room() {
        return $this->belongsTo(Room::class);
    }

    public function billings() {
        return $this->hasMany(Billing::class);
    }
}
