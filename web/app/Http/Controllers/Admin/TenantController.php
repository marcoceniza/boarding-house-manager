<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTenantRequest;
use App\Http\Requests\Admin\UpdateTenantRequest;
use App\Models\Admin\Room;
use App\Models\Admin\Tenant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class TenantController extends Controller
{
    public function index(): Response
    {
        $tenants = Tenant::with('room')
            ->where('status', '!=', 2)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('tenants/Index', [
            'tenants' => $tenants,
            'formerTenants' => Tenant::with('room')
                ->where('status', 2)
                ->orderByDesc('ended_at')
                ->get(),
            'rooms' => Room::query()->orderBy('room_number')->get(),
        ]);
    }

    public function store(StoreTenantRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $tenant = DB::transaction(function () use ($validated) {
            $room = Room::where('id', $validated['room_id'])
                ->where('status', 0)
                ->lockForUpdate()
                ->firstOrFail();

            if ($validated['occupied'] > $room->capacity) {
                throw ValidationException::withMessages([
                    'occupied' => 'Occupancy cannot exceed the room capacity.',
                ]);
            }

            $tenantData = collect($validated)->except('occupied')->all();
            $tenantData['status'] = 1;
            $tenant = Tenant::create($tenantData);

            $room->update([
                'status' => 1,
                'occupied' => $validated['occupied'],
            ]);

            return $tenant;
        });

        return to_route('dashboard.tenants.index')->with('success', 'Tenant created successfully.');
    }

    public function update(UpdateTenantRequest $request, Tenant $tenant): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($tenant, $validated) {
            if (isset($validated['room_id']) && (int) $tenant->room_id !== (int) $validated['room_id']) {
                if ($tenant->status !== 1) {
                    throw ValidationException::withMessages([
                        'room_id' => 'Only active tenancies can be assigned to another room.',
                    ]);
                }

                $newRoom = Room::whereKey($validated['room_id'])
                    ->where('status', 0)
                    ->lockForUpdate()
                    ->firstOrFail();

                $occupied = $validated['occupied']
                    ?? Room::whereKey($tenant->room_id)->value('occupied')
                    ?? 0;

                if ($occupied > $newRoom->capacity) {
                    throw ValidationException::withMessages([
                        'room_id' => 'The selected room does not have enough capacity.',
                    ]);
                }

                Room::whereKey($tenant->room_id)
                    ->lockForUpdate()
                    ->update(['status' => 0, 'occupied' => 0]);

                $newRoom->update([
                    'status' => 1,
                    'occupied' => $occupied,
                ]);
            }

            $tenant->update(collect($validated)->except('occupied')->all());
        });

        return to_route('dashboard.tenants.index')->with('success', 'Tenant updated successfully.');
    }

    public function destroy(Tenant $tenant): RedirectResponse
    {
        DB::transaction(function () use ($tenant) {
            if ($tenant->billings()->exists()) {
                throw ValidationException::withMessages([
                    'tenant' => 'Cannot delete this tenant while billing records exist. End the tenancy instead to preserve billing history.',
                ]);
            }

            if ($tenant->status === 1) {
                Room::whereKey($tenant->room_id)
                    ->lockForUpdate()
                    ->update(['status' => 0, 'occupied' => 0]);
            }

            $tenant->delete();
        });

        return to_route('dashboard.tenants.index')->with('success', 'Tenant deleted successfully.');
    }

    public function endTenancy(Tenant $tenant): RedirectResponse
    {
        if ($tenant->status !== 1) {
            throw ValidationException::withMessages([
                'tenant' => 'Tenancy has already ended or the tenant is inactive.',
            ]);
        }

        DB::transaction(function () use ($tenant) {
            $tenant->update([
                'status' => 2,
                'ended_at' => now(),
            ]);

            Room::whereKey($tenant->room_id)
                ->lockForUpdate()
                ->update(['status' => 0, 'occupied' => 0]);
        });

        return to_route('dashboard.tenants.index')->with('success', 'Tenancy ended successfully.');
    }
}
