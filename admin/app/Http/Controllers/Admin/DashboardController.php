<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Billing;
use App\Models\Admin\Room;
use App\Models\Admin\Tenant;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $today = today();
        $statistics = [
            'rooms' => Room::count(),
            'activeTenants' => Tenant::where('status', 1)->count(),
            'collectedThisMonth' => Billing::whereBetween('paid_at', [
                $today->copy()->startOfMonth()->toDateString(),
                $today->copy()->endOfMonth()->toDateString(),
            ])->sum('total'),
            'outstandingBalance' => Billing::where('status', '!=', 1)->sum('total'),
        ];

        $rooms = Room::query()
            ->latest('updated_at')
            ->limit(4)
            ->get(['id', 'room_number', 'created_at', 'updated_at']);
        $tenants = Tenant::query()
            ->latest('updated_at')
            ->limit(4)
            ->get(['id', 'first_name', 'last_name', 'created_at', 'updated_at']);
        $billings = Billing::query()
            ->with('tenant:id,first_name,last_name')
            ->latest('updated_at')
            ->limit(4)
            ->get(['id', 'tenant_id', 'billing_period', 'created_at', 'updated_at']);

        $activities = $rooms
            ->map(fn (Room $room): array => [
                'id' => "room-{$room->id}",
                'type' => 'room',
                'title' => $room->created_at->equalTo($room->updated_at) ? 'Room added' : 'Room updated',
                'description' => "Room {$room->room_number}",
                'occurred_at' => $room->updated_at,
            ])
            ->concat($tenants->map(fn (Tenant $tenant): array => [
                'id' => "tenant-{$tenant->id}",
                'type' => 'tenant',
                'title' => $tenant->created_at->equalTo($tenant->updated_at) ? 'Tenant added' : 'Tenant updated',
                'description' => "{$tenant->first_name} {$tenant->last_name}",
                'occurred_at' => $tenant->updated_at,
            ]))
            ->concat($billings->map(fn (Billing $billing): array => [
                'id' => "billing-{$billing->id}",
                'type' => 'billing',
                'title' => $billing->created_at->equalTo($billing->updated_at) ? 'Billing created' : 'Billing updated',
                'description' => "{$billing->tenant?->first_name} {$billing->tenant?->last_name} · {$billing->billing_period}",
                'occurred_at' => $billing->updated_at,
            ]))
            ->sortByDesc('occurred_at')
            ->take(4)
            ->values();

        return Inertia::render('dashboard/Index', [
            'activities' => $activities,
            'statistics' => $statistics,
        ]);
    }
}
