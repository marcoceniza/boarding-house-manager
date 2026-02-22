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
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Status => 0 = Inactive, 1 = Active, 2 = Left
        $validated = $request->validate([
            'first_name'    => 'required|string|max:50',
            'last_name'     => 'required|string|max:50',
            'email'         => 'required|email|unique:tenants,email',
            'room_id'       => 'required|exists:rooms,id',
            'move_in_date'  => 'required|date|after_or_equal:today',
            'occupied'     => 'required|integer|min:1',
            'status'        => 'nullable|integer|in:0,1,2',
        ], [
            'move_in_date.after_or_equal' => 'Move-in date cannot be earlier than today.'
        ]);

        $tenant = DB::transaction(function () use ($validated) {

            $room = Room::where('id', $validated['room_id'])
                ->where('status', 0)
                ->lockForUpdate()
                ->firstOrFail();

            $tenant = Tenant::create($validated);

            $room->update([
                'status' => 1,
                'occupied' => $validated['occupied']
            ]);

            return $tenant;
        });

        return response()->json([
            'success' => true,
            'message' => 'Tenant created successfully',
            'result'  => $tenant->load('room')
        ], 200);
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
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tenant = Tenant::findOrFail($id);

        $validated = $request->validate([
            'first_name'   => 'required|string|max:50',
            'last_name'    => 'required|string|max:50',
            'email'        => 'sometimes|email|unique:tenants,email,' . $tenant->id,
            'room_id'      => 'required|exists:rooms,id',
            'move_in_date' => 'sometimes|date',
            'status'       => 'nullable|integer|in:0,1,2',
            'occupied'     => 'required|integer|min:1',
        ]);

        $tenant = DB::transaction(function () use ($tenant, $validated) {

            // 🔹 If room is changed
            if ($tenant->room_id !== $validated['room_id']) {

                // Lock & free old room
                Room::where('id', $tenant->room_id)
                    ->lockForUpdate()
                    ->update(['status' => 0, 'occupied' => 0]);

                // Lock & occupy new room
                Room::where('id', $validated['room_id'])
                    ->where('status', 0)
                    ->lockForUpdate()
                    ->firstOrFail()
                    ->update(['status' => 1, 'occupied' => $request->occupied]);
            }

            $tenant->update($validated);

            return $tenant;
        });

        return response()->json([
            'success' => true,
            'message' => 'Tenant updated successfully',
            'result'  => $tenant->load('room'),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tenant = Tenant::findOrFail($id);

        DB::transaction(function () use ($tenant) {

            Room::where('id', $tenant->room_id)
                ->lockForUpdate()
                ->update(['status' => 0]);

            $tenant->delete();
        });

        return response()->json([
            'success' => true,
            'message' => 'Tenant deleted successfully'
        ], 200);
    }
    
    /**
     * End tenancy for a tenant
     */
    public function endTenancy(string $id)
    {
        $tenant = Tenant::with('room')->findOrFail($id);

        // Only active tenants can be ended
        if ($tenant->status !== 1) {
            return response()->json([
                'success' => false,
                'message' => 'Tenancy has already ended or tenant is inactive',
            ], 400);
        }

        $tenant = DB::transaction(function () use ($tenant) {

            // 🔒 Lock tenant row
            $tenant->lockForUpdate();

            // 1️⃣ Mark tenant as LEFT
            $tenant->update([
                'status'   => 2, // Left
                'ended_at' => now(),
            ]);

            // 2️⃣ Free the room (lock it)
            if ($tenant->room_id) {
                Room::where('id', $tenant->room_id)
                    ->lockForUpdate()
                    ->update([
                        'status'   => 0, // Available
                        'occupied' => 0,
                    ]);
            }

            return $tenant;
        });

        return response()->json([
            'success' => true,
            'message' => 'Tenancy ended successfully',
            'result'  => $tenant->fresh('room'),
        ], 200);
    }
}