<?php

namespace App\Http\Controllers\Api\Me;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\BillingResource;
use App\Models\Admin\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\Rule;

class BillingController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $validated = $request->validate([
            'view' => ['sometimes', 'string', Rule::in(['current', 'history'])],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:50'],
        ]);
        $user = $request->user();

        abort_unless($user instanceof User, 403, 'This account is not linked to a tenant.');
        $tenant = $user->tenant()->first();

        abort_unless($tenant instanceof Tenant, 403, 'This account is not linked to a tenant.');

        $billings = $tenant->billings()
            ->when(
                ($validated['view'] ?? 'history') === 'current',
                fn ($query) => $query->where('status', '!=', 1),
            )
            ->orderByDesc('billing_period')
            ->orderByDesc('id')
            ->paginate($validated['per_page'] ?? 10)
            ->withQueryString();

        return BillingResource::collection($billings);
    }
}
