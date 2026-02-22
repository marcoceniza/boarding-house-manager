<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Room;
use Illuminate\Validation\ValidationException;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = Room::with('tenants')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'message' => 'Rooms fetched successfully',
            'result'  => $rooms
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_number'     => 'required|string|max:10|unique:rooms,room_number',
            'type'            => 'required|string|max:50',
            'capacity'        => 'required|integer|min:1',
            'price_per_month' => 'required|string|min:0',
        ]);

        // New rooms always start empty
        // Status => 0 = Available, 1 = Occupied, 2 = Maintenance
        $validated['occupied'] = 0;
        $validated['status']   = 0;

        $room = Room::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Room created successfully',
            'result'  => $room
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $room = Room::with('tenants')->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Room details fetched successfully',
            'result'  => $room
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $room = Room::findOrFail($id);

        // Status => 0 = Available, 1 = Occupied, 2 = Maintenance
        $validated = $request->validate([
            'room_number'     => 'required|string|max:10|unique:rooms,room_number,' . $room->id,
            'type'            => 'required|string|max:50',
            'capacity'        => 'required|integer|min:1',
            'price_per_month' => 'required|string|min:0',
            'status'          => 'nullable|integer|in:0,1,2', 
        ]);

        // ❗ Prevent shrinking capacity below current occupancy
        if ($validated['capacity'] < $room->occupied) {
            throw ValidationException::withMessages([
                'capacity' => 'Capacity cannot be less than current occupied count.'
            ]);
        }

        // Auto-calculate status unless manually set to Maintenance
        if (($validated['status'] ?? null) !== 2) {
            $validated['status'] = $room->occupied >= $validated['capacity'] ? 1 : 0;
        }

        $room->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Room updated successfully',
            'result'  => $room
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $room = Room::findOrFail($id);

        // Prevent deleting a room with active tenants
        if ($room->occupied > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete a room with active tenants.'
            ], 422);
        }

        $room->delete();

        return response()->json([
            'success' => true,
            'message' => 'Room deleted successfully',
        ], 200);
    }
}