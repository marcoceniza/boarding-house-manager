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

            // Room category or layout
            // Examples: Single, Double, Studio, Family
            $table->string('type');

            // Maximum number of tenants allowed in this room
            // Example: 1, 2, 4
            $table->unsignedInteger('capacity');

            // Monthly rental price for this room
            // Example: 3500.00, 5500.00
            $table->decimal('price_per_month', 10, 2);

            // Cached count of current tenants in the room
            // Example: 0, 1, 2
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
