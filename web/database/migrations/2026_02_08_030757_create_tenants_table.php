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

            // Tenant basic info
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();

            // Reference to the room the tenant occupies
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();

            // Date when tenant moved in
            $table->date('move_in_date');

            // Date when tenancy ended (nullable)
            $table->timestamp('ended_at')->nullable();

            // Tenant status
            // 0 = Inactive, 1 = Active, 2 = Left
            $table->tinyInteger('status')->default(1)
                    ->comment('0 = Inactive, 1 = Active, 2 = Left');

            $table->timestamps();

            // Indexes (performance)
            $table->index('room_id');
            $table->index('status');
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
