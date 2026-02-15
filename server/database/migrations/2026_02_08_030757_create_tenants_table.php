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

            // First name of the tenant
            $table->string('first_name');

            // Last name of the tenant
            $table->string('last_name');

            // Tenant email address (used for billing notifications)
            $table->string('email')->unique();

            // Reference to the room the tenant occupies
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();

            // Date when tenant moved in
            $table->date('move_in_date');

            // Tenant status as numeric code
            // 0 = Inactive, 1 = Active, 2 = Left
            $table->tinyInteger('status')->default(1)
                    ->comment('0 = Inactive, 1 = Active, 2 = Left');

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
