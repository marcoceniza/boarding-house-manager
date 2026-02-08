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
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            
            // Full name of the tenant
            // Example: Juan Dela Cruz
            $table->string('name');

            // Tenant email address (used for billing notifications)
            // Example: juan.delacruz@email.com
            $table->string('email')->unique();

            // Reference to the room the tenant occupies
            $table->foreignId('room_id')
                ->constrained()
                ->cascadeOnDelete();

            // Date when tenant moved in
            // Example: 2026-01-15
            $table->date('move_in_date');

            // Tenant status in the boarding house
            // Possible values: active, left, inactive
            $table->string('status')->default('active');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};
