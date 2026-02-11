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
            // Examples: 101, 102, A1, B-03
            $table->string('room_number')->unique();

            // Room category or layout
            // Examples: Single, Double, Studio, Family
            $table->string('type');

            // Maximum number of tenants allowed in this room
            $table->unsignedInteger('capacity');

            // Monthly rental price for this room
            $table->decimal('price_per_month', 10, 2);

            // Cached count of current tenants in the room
            $table->unsignedInteger('occupied')->default(0);

            // Current room status
            // Possible values: available, full, maintenance
            $table->string('status')->default('available');
            
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
