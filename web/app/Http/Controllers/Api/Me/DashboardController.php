<?php

namespace App\Http\Controllers\Api\Me;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\BillingResource;
use App\Http\Resources\Api\TenantProfileResource;
use App\Models\Admin\Tenant;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $user = $request->user();

        abort_unless($user instanceof User, 403, 'This account is not linked to a tenant.');
        $tenant = $user->tenant()->with('room')->first();

        abort_unless($tenant instanceof Tenant, 403, 'This account is not linked to a tenant.');

        $outstandingBills = $tenant->billings()
            ->where('status', '!=', 1)
            ->orderByDesc('billing_period')
            ->orderByDesc('id')
            ->get();

        return response()->json([
            'data' => [
                'tenant' => new TenantProfileResource($tenant),
                'summary' => [
                    'amount_due' => round((float) $outstandingBills->sum('total'), 2),
                    'outstanding_count' => $outstandingBills->count(),
                ],
                'current_bills' => BillingResource::collection($outstandingBills->take(5))->resolve(),
            ],
        ]);
    }
}
