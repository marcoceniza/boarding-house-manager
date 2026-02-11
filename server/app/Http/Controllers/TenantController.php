<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tenant;
use App\Models\Room;

class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tenants = Tenant::with('room')->get();

        return response()->json([
            'success' => true,
            'message' => 'Tenants fetched successfully',
            'result' => $tenants
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'email' => 'required|email|unique:tenants,email',
            'room_id' => 'required|exists:rooms,id',
            'move_in_date' => 'required|date',
            'status' => 'nullable|string|in:Active,Left,Inactive',
        ]);

        $tenant = Tenant::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Tenant created successfully',
            'result' => $tenant->load('room')
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tenant = Tenant::with('room', 'billings')->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Tenant details fetched successfully',
            'result' => $tenant
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tenant = Tenant::findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'email' => 'sometimes|email|unique:tenants,email,' . $tenant->id,
            'room_id' => 'required|exists:rooms,id',
            'move_in_date' => 'sometimes|date',
            'status' => 'sometimes|string|in:Active,Left,Inactive',
        ]);

        $tenant->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Tenant updated successfully',
            'result' => $tenant->load('room')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tenant = Tenant::findOrFail($id);
        $tenant->delete();

        return response()->json([
            'success' => true,
            'message' => 'Tenant deleted successfully'
        ]);
    }
}
