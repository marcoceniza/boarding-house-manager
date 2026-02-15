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
        $rooms = Room::with('tenants')->get();

        return response()->json([
            'success' => true,
            'message' => 'Rooms fetched successfully',
            'result'  => $rooms
        ]);
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
            'price_per_month' => 'required|numeric|min:0',
        ]);

        // New rooms always start empty
        $validated['occupied'] = 0;
        $validated['status']   = 'Available';

        $room = Room::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Room created successfully',
            'result'  => $room
        ]);
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
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $room = Room::findOrFail($id);

        $validated = $request->validate([
            'room_number'     => 'required|string|max:10|unique:rooms,room_number,' . $room->id,
            'type'            => 'required|string|max:50',
            'capacity'        => 'required|integer|min:1',
            'price_per_month' => 'required|numeric|min:0',
            'status'          => 'nullable|in:Available,Occupied,Maintenance',
        ]);

        // ❗ Prevent shrinking capacity below current occupancy
        if ($validated['capacity'] < $room->occupied) {
            throw ValidationException::withMessages([
                'capacity' => 'Capacity cannot be less than current occupied count.'
            ]);
        }

        // Auto-calculate status unless manually set to Maintenance
        if (($validated['status'] ?? null) !== 'Maintenance') {
            $validated['status'] = $room->occupied >= $validated['capacity']
                ? 'Occupied'
                : 'Available';
        }

        $room->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Room updated successfully',
            'result'  => $room
        ]);
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
        ]);
    }
}