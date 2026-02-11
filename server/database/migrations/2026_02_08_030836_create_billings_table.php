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
        Schema::create('billings', function (Blueprint $table) {
            $table->id();
            
            // Tenant being billed
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();

            // Billing month and year
            // Format: YYYY-MM
            $table->string('billing_period');

            // Amounts billed for the period
            $table->decimal('rent', 10, 2)->default(0);
            $table->decimal('water', 10, 2)->default(0);
            $table->decimal('electricity', 10, 2)->default(0);

            // Total amount (can calculate in model or DB)
            $table->decimal('total', 10, 2);

            // Date when payment is due
            $table->date('due_date');

            // Billing payment status
            // Possible values: unpaid, paid, overdue
            $table->string('status')->default('unpaid');

            // Prevent duplicate billing for the same tenant and period
            $table->unique(['tenant_id', 'billing_period']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billings');
    }
};