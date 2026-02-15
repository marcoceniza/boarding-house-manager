<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();

            // Unique room identifier shown to tenants/admin
            $table->string('room_number')->unique();

            // Room category or layout
            $table->string('type');

            // Maximum number of tenants allowed in this room
            $table->unsignedInteger('capacity');

            // Monthly rental price for this room
            $table->decimal('price_per_month', 10, 2);

            // Cached count of current tenants in the room
            $table->unsignedInteger('occupied')->default(0);

            // Current room status as numeric code
            // 0 = Available, 1 = Occupied, 2 = Maintenance
            $table->tinyInteger('status')->default(0)
                    ->comment('0 = Available, 1 = Occupied, 2 = Maintenance');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
