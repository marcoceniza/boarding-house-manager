<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Room;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $rooms = Room::with('tenants')->get(); // include tenants for each room
        $rooms = ['test 1', 'test 2']; // include tenants for each room

        return response()->json([
            'success' => true,
            'message' => 'Rooms fetched successfully',
            'result' => $rooms
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|max:50',
            'capacity' => 'required|integer|min:1',
            'price_per_month' => 'required|numeric|min:0',
            'status' => 'nullable|string|in:available,full,maintenance',
        ]);

        $room = Room::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Room created successfully',
            'result' => $room
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
            'result' => $room
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $room = Room::findOrFail($id);

        $validated = $request->validate([
            'type' => 'sometimes|string|max:50',
            'capacity' => 'sometimes|integer|min:1',
            'price_per_month' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|in:available,full,maintenance',
        ]);

        $room->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Room updated successfully',
            'result' => $room
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $room = Room::findOrFail($id);
        $room->delete();

        return response()->json([
            'success' => true,
            'message' => 'Room deleted successfully',
        ]);
    }
}