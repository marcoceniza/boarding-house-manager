<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tenant;
use App\Models\Room;
use Illuminate\Support\Facades\DB;

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
            'first_name'    => 'required|string|max:50',
            'last_name'     => 'required|string|max:50',
            'email'         => 'required|email|unique:tenants,email',
            'room_id'       => 'required|exists:rooms,id',
            'move_in_date'  => 'required|date',
            'status'        => 'nullable|string|in:Active,Left,Inactive',
        ]);

        DB::transaction(function () use ($validated, &$tenant) {

            // ✅ Ensure room is AVAILABLE
            $room = Room::where('id', $validated['room_id'])
                ->where('status', 'Available')
                ->lockForUpdate()
                ->firstOrFail();

            // Create tenant
            $tenant = Tenant::create($validated);

            // Mark room as OCCUPIED
            $room->update([
                'status' => 'Occupied'
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Tenant created successfully',
            'result'  => $tenant->load('room')
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
            'result'  => $tenant
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tenant = Tenant::findOrFail($id);

        $validated = $request->validate([
            'first_name'    => 'required|string|max:50',
            'last_name'     => 'required|string|max:50',
            'email'         => 'sometimes|email|unique:tenants,email,' . $tenant->id,
            'room_id'       => 'required|exists:rooms,id',
            'move_in_date'  => 'sometimes|date',
            'status'        => 'sometimes|string|in:Active,Left,Inactive',
        ]);

        DB::transaction(function () use ($tenant, $validated) {

            // If room is changed
            if ($tenant->room_id !== $validated['room_id']) {

                // Free old room
                Room::where('id', $tenant->room_id)->update([
                    'status' => 'Available'
                ]);

                // Occupy new room (must be available)
                Room::where('id', $validated['room_id'])
                    ->where('status', 'Available')
                    ->lockForUpdate()
                    ->firstOrFail()
                    ->update([
                        'status' => 'Occupied'
                    ]);
            }

            $tenant->update($validated);
        });

        return response()->json([
            'success' => true,
            'message' => 'Tenant updated successfully',
            'result'  => $tenant->load('room')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tenant = Tenant::findOrFail($id);

        DB::transaction(function () use ($tenant) {

            // Free room
            Room::where('id', $tenant->room_id)->update([
                'status' => 'Available'
            ]);

            $tenant->delete();
        });

        return response()->json([
            'success' => true,
            'message' => 'Tenant deleted successfully'
        ]);
    }
    
    /**
     * End tenancy for a tenant
     */
    public function endTenancy(string $id)
    {
        $tenant = Tenant::with('room')->findOrFail($id);

        // Only active tenants can be ended
        if ($tenant->status !== 'Active') {
            return response()->json([
                'success' => false,
                'message' => 'Tenancy has already ended or tenant is inactive',
            ], 400);
        }

        DB::transaction(function () use ($tenant) {
            // 1️⃣ Update tenant status to Inactive
            $tenant->update([
                'status' => 'Inactive',
                'ended_at' => now(), // optional column for history
            ]);

            // 2️⃣ Free the room
            if ($tenant->room) {
                $tenant->room->update([
                    'status' => 'Available',
                    'occupied' => 0,
                ]);
            }
        });

        return response()->json([
            'success' => true,
            'message' => 'Tenancy ended successfully',
            'result' => $tenant->fresh('room')
        ]);
    }
}