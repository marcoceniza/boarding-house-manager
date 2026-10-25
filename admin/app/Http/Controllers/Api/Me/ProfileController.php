<?php

namespace App\Http\Controllers\Api\Me;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\TenantProfileResource;
use App\Models\Admin\Tenant;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();

        abort_unless($user instanceof User, 403, 'This account is not linked to a tenant.');
        $tenant = $user->tenant()->with('room')->first();

        abort_unless($tenant instanceof Tenant, 403, 'This account is not linked to a tenant.');

        return response()->json([
            'data' => new TenantProfileResource($tenant),
        ]);
    }
}
