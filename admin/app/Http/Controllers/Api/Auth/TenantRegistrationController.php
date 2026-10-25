<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\RegisterTenantRequest;
use App\Models\Admin\Tenant;
use App\Models\TenantRegistration;
use App\Models\User;
use App\Notifications\TenantRegistrationVerification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;
use Illuminate\View\View;

class TenantRegistrationController extends Controller
{
    public function store(RegisterTenantRequest $request): JsonResponse
    {
        $input = $request->validated();
        $token = Str::random(64);
        $notification = DB::transaction(function () use ($input, $token): ?array {
            $tenant = Tenant::query()
                ->whereRaw('LOWER(email) = ?', [$input['email']])
                ->where('status', 1)
                ->lockForUpdate()
                ->first();

            if (
                ! $tenant
                || $tenant->user_id !== null
                || User::query()
                    ->whereRaw('LOWER(email) = ?', [mb_strtolower($tenant->email)])
                    ->exists()
            ) {
                return null;
            }

            TenantRegistration::query()
                ->where('tenant_id', $tenant->id)
                ->delete();

            $registration = TenantRegistration::create([
                'tenant_id' => $tenant->id,
                'email' => $tenant->email,
                'password' => Hash::make($input['password']),
                'token_hash' => hash('sha256', $token),
                'expires_at' => now()->addMinutes(60),
            ]);

            return [
                'email' => $registration->email,
                'token' => $token,
            ];
        });

        if ($notification) {
            Notification::route('mail', $notification['email'])
                ->notify(new TenantRegistrationVerification($notification['token']));
        }

        return response()->json([
            'message' => 'If your email matches an active tenant record, a verification link has been sent.',
        ], 202);
    }

    public function verify(Request $request): View
    {
        return view('api.tenant-registration-verification', [
            'confirmationUrl' => $request->fullUrl(),
        ]);
    }

    public function confirm(string $token): JsonResponse
    {
        $user = DB::transaction(function () use ($token): ?User {
            $registration = TenantRegistration::query()
                ->where('token_hash', hash('sha256', $token))
                ->where('expires_at', '>', now())
                ->lockForUpdate()
                ->first();

            if (! $registration) {
                return null;
            }

            $tenant = Tenant::query()
                ->whereKey($registration->tenant_id)
                ->where('status', 1)
                ->lockForUpdate()
                ->first();

            if (
                ! $tenant
                || $tenant->user_id !== null
                || mb_strtolower($tenant->email) !== mb_strtolower($registration->email)
                || User::query()
                    ->whereRaw('LOWER(email) = ?', [mb_strtolower($registration->email)])
                    ->exists()
            ) {
                $registration->delete();

                return null;
            }

            $user = User::create([
                'name' => trim($tenant->first_name.' '.$tenant->last_name),
                'email' => mb_strtolower($registration->email),
                'password' => $registration->password,
            ]);
            $user->markEmailAsVerified();

            $tenant->user()->associate($user);
            $tenant->save();
            $registration->delete();

            return $user;
        });

        if (! $user) {
            return response()->json([
                'message' => 'This registration link is invalid, expired, or no longer available.',
            ], 410);
        }

        return response()->json([
            'message' => 'Email verified. You can now sign in.',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ],
        ]);
    }
}
