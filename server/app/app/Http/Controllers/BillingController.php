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
        $request->merge([
            'rent' => str_replace(',', '', $request->rent),
        ]);

        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'billing_period' => 'required|string',
            'rent' => 'required|numeric|min:0',
            'water' => 'required|nullable|numeric|min:0',
            'electricity' => 'required|nullable|numeric|min:0',
            'due_date' => 'required|date|after_or_equal:today',
            'status' => 'nullable|integer|in:0,1,2',
        ], [
            'due_date.after_or_equal' => 'Billing period cannot be earlier than today.'
        ]);

        $validated['water'] = $validated['water'] ?? 0;
        $validated['electricity'] = $validated['electricity'] ?? 0;

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

        $request->merge([
            'rent' => str_replace(',', '', $request->rent),
        ]);

        $validated = $request->validate([
            'tenant_id' => 'sometimes|exists:tenants,id',
            'billing_period' => 'sometimes|string',
            'rent' => 'sometimes|numeric|min:0',
            'water' => 'sometimes|numeric|min:0',
            'electricity' => 'sometimes|numeric|min:0',
            'due_date' => 'required|date|after_or_equal:today',
            'status' => 'nullable|integer|in:0,1,2',
        ], [
            'due_date.after_or_equal' => 'Billing period cannot be earlier than today.'
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
    public function sendInvoice($id)
    {
        $billing = Billing::with('tenant')->findOrFail($id);

        $tenantEmail = $billing->tenant->email;

        Mail::to($tenantEmail)->send(new InvoiceMail($billing));

        return response()->json([
            'message' => 'Test invoice sent successfully'
        ]);
    }
}