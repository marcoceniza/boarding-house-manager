<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Models\Admin\Tenant;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class AuthenticationController extends Controller
{
    public function store(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();
        $user = User::query()
            ->whereRaw('LOWER(email) = ?', [$credentials['email']])
            ->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'The provided credentials are invalid.'], 401);
        }

        if (! $user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Verify your email address before signing in.'], 403);
        }

        $tenant = DB::transaction(function () use ($user): ?Tenant {
            $tenant = Tenant::query()
                ->whereRaw('LOWER(email) = ?', [mb_strtolower($user->email)])
                ->where('status', 1)
                ->lockForUpdate()
                ->first();

            if ($tenant && ! $user->tenant()->exists() && $tenant->user_id === null) {
                $tenant->user()->associate($user);
                $tenant->save();
            }

            return $user->tenant()->with('room')->first();
        });

        if (! $tenant) {
            return response()->json(['message' => 'This account is not linked to an active tenant.'], 403);
        }

        $token = $user->createToken('mobile', ['*'], now()->addDays(30))->plainTextToken;

        return response()->json([
            'data' => [
                'token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'tenant' => [
                        'id' => $tenant->id,
                        'first_name' => $tenant->first_name,
                        'last_name' => $tenant->last_name,
                    ],
                ],
            ],
        ]);
    }

    public function destroy(Request $request): JsonResponse
    {
        $token = $request->user()?->currentAccessToken();

        if ($token instanceof PersonalAccessToken) {
            $token->delete();
        }

        return response()->json(['message' => 'Signed out successfully.']);
    }
}
