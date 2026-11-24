<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRoomRequest;
use App\Http\Requests\Admin\UpdateRoomRequest;
use App\Models\Admin\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    public function index(): Response
    {
        $rooms = Room::with([
            'tenants' => fn ($query) => $query
                ->select('id', 'room_id', 'first_name', 'last_name')
                ->where('status', 1),
        ])->latest()->paginate(10)->withQueryString();

        return Inertia::render('rooms/Index', [
            'rooms' => $rooms,
        ]);
    }

    public function store(StoreRoomRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['occupied'] = 0;
        $validated['status'] = 0;

        Room::create($validated);

        return to_route('dashboard.rooms.index')->with('success', 'Room created successfully.');
    }

    public function update(UpdateRoomRequest $request, Room $room): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($room, $validated) {
            $room = Room::whereKey($room->getKey())
                ->lockForUpdate()
                ->firstOrFail();

            if ($room->occupied > 0) {
                throw ValidationException::withMessages([
                    'room' => 'Cannot update a room while it has active tenants.',
                ]);
            }

            if ($validated['capacity'] < $room->occupied) {
                throw ValidationException::withMessages([
                    'capacity' => 'Capacity cannot be less than current occupied count.',
                ]);
            }

            if ($room->status !== 2) {
                $validated['status'] = $room->occupied >= $validated['capacity'] ? 1 : 0;
            }

            $room->update($validated);
        });

        return to_route('dashboard.rooms.index')->with('success', 'Room updated successfully.');
    }

    public function destroy(Room $room): RedirectResponse
    {
        DB::transaction(function () use ($room) {
            $room = Room::whereKey($room->getKey())
                ->lockForUpdate()
                ->firstOrFail();

            if ($room->occupied > 0) {
                throw ValidationException::withMessages([
                    'room' => 'Cannot delete a room with active tenants.',
                ]);
            }

            $room->delete();
        });

        return to_route('dashboard.rooms.index')->with('success', 'Room deleted successfully.');
    }
}
