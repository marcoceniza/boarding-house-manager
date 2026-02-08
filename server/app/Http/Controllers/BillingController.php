<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\InvoiceMail;
use Illuminate\Support\Facades\Mail;
use App\Models\Billing;
use App\Models\Tenant;

class BillingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $billings = Billing::with('tenant.room')->get();

        return response()->json([
            'success' => true,
            'message' => 'Billings fetched successfully',
            'result' => $billings
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'billing_period' => 'required|string', // e.g., '2026-02'
            'amount' => 'required|numeric|min:0',
            'due_date' => 'required|date',
            'status' => 'nullable|string|in:unpaid,paid,overdue',
        ]);

        // Optional: automatically fill amount from tenant's room price if not provided
        if (!isset($validated['amount'])) {
            $validated['amount'] = Tenant::find($validated['tenant_id'])->room->price_per_month;
        }

        $billing = Billing::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Billing created successfully',
            'result' => $billing->load('tenant.room')
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $billing = Billing::with('tenant.room')->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Billing details fetched successfully',
            'result' => $billing
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $billing = Billing::findOrFail($id);

        $validated = $request->validate([
            'tenant_id' => 'sometimes|exists:tenants,id',
            'billing_period' => 'sometimes|string',
            'amount' => 'sometimes|numeric|min:0',
            'due_date' => 'sometimes|date',
            'status' => 'sometimes|string|in:unpaid,paid,overdue',
        ]);

        $billing->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Billing updated successfully',
            'result' => $billing->load('tenant.room')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $billing = Billing::findOrFail($id);
        $billing->delete();

        return response()->json([
            'success' => true,
            'message' => 'Billing deleted successfully'
        ]);
    }

    /**
     * Send invoice to the tenant's email.
     */
    public function sendInvoice()
    {
        // fake billing data (NO DB)
        $billing = (object) [
            'id' => 1,
            'tenant' => (object) [
                'email' => 'marcoceniza20@gmail.com',
                'name'  => 'Marco',
            ],
            'room' => (object) [
                'name' => 'Room 3',
                'rate' => 999,
            ],
            'period' => 'February 2026',
            'due_date' => now()->addDays(7),
        ];

        Mail::to('marcoceniza20@gmail.com')
            ->send(new InvoiceMail($billing));

        return response()->json([
            'message' => 'Test invoice sent successfully'
        ]);
    }
}
