<?php

use App\Models\Admin\Billing;
use App\Models\Admin\Room;
use App\Models\Admin\Tenant;
use App\Models\TenantRegistration;
use App\Models\User;
use App\Notifications\TenantRegistrationVerification;
use Illuminate\Support\Facades\Notification;

function createApiTenant(string $email = 'tenant@example.test', int $status = 1): Tenant
{
    $roomNumber = 'A'.(101 + Room::count());
    $room = Room::create([
        'room_number' => $roomNumber,
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 1,
        'status' => 1,
    ]);

    return Tenant::create([
        'first_name' => 'Taylor',
        'last_name' => 'Resident',
        'email' => $email,
        'room_id' => $room->id,
        'move_in_date' => '2026-01-01',
        'status' => $status,
    ]);
}

function createLinkedApiUser(Tenant $tenant, string $password = 'password'): User
{
    $user = User::factory()->create([
        'name' => $tenant->first_name.' '.$tenant->last_name,
        'email' => $tenant->email,
        'password' => $password,
        'email_verified_at' => now(),
    ]);
    $tenant->user()->associate($user);
    $tenant->save();

    return $user;
}

it('creates tenant accounts only after the tenant email is verified', function () {
    Notification::fake();
    $tenant = createApiTenant();

    $this->postJson('/api/v1/register', [
        'email' => strtoupper($tenant->email),
        'password' => 'strong-password',
        'password_confirmation' => 'strong-password',
    ])->assertAccepted();

    expect(User::query()->where('email', $tenant->email)->exists())->toBeFalse()
        ->and(TenantRegistration::query()->where('tenant_id', $tenant->id)->exists())->toBeTrue();

    $verificationUrl = null;
    Notification::assertSentOnDemand(
        TenantRegistrationVerification::class,
        function (TenantRegistrationVerification $notification, array $channels, object $notifiable) use (&$verificationUrl): bool {
            $verificationUrl = $notification->toMail($notifiable)->actionUrl;

            return true;
        },
    );

    $this->get($verificationUrl)
        ->assertOk()
        ->assertSee('Confirm email and create account');

    expect(User::query()->where('email', $tenant->email)->exists())->toBeFalse();

    $this->postJson($verificationUrl)
        ->assertOk()
        ->assertJsonPath('message', 'Email verified. You can now sign in.');

    expect(User::query()->where('email', $tenant->email)->exists())->toBeTrue()
        ->and($tenant->fresh()->user_id)->not->toBeNull()
        ->and(TenantRegistration::query()->where('tenant_id', $tenant->id)->exists())->toBeFalse();

    $this->postJson('/api/v1/login', [
        'email' => $tenant->email,
        'password' => 'strong-password',
    ])->assertOk();
});

it('does not reveal whether an email belongs to a tenant during registration', function () {
    Notification::fake();

    $this->postJson('/api/v1/register', [
        'email' => 'not-a-tenant@example.test',
        'password' => 'strong-password',
        'password_confirmation' => 'strong-password',
    ])->assertAccepted()
        ->assertJsonPath(
            'message',
            'If your email matches an active tenant record, a verification link has been sent.',
        );

    Notification::assertNothingSent();
});

it('authenticates a verified tenant and returns only that tenants information', function () {
    $firstTenant = createApiTenant();
    $user = createLinkedApiUser($firstTenant);
    $otherTenant = createApiTenant('other@example.test');

    Billing::create([
        'tenant_id' => $firstTenant->id,
        'billing_period' => '2026-10',
        'rent' => 1200,
        'water' => 100,
        'electricity' => 50,
        'due_date' => '2026-10-31',
    ]);
    Billing::create([
        'tenant_id' => $otherTenant->id,
        'billing_period' => '2026-10',
        'rent' => 2400,
        'due_date' => '2026-10-31',
    ]);

    $response = $this->postJson('/api/v1/login', [
        'email' => $user->email,
        'password' => 'password',
    ])->assertOk()
        ->assertJsonPath('data.user.tenant.id', $firstTenant->id);

    $token = $response->json('data.token');

    $this->withToken($token)->getJson('/api/v1/me/dashboard')
        ->assertOk()
        ->assertJsonPath('data.summary.amount_due', 1350)
        ->assertJsonCount(1, 'data.current_bills')
        ->assertJsonPath('data.current_bills.0.status', 0);

    $this->withToken($token)->getJson('/api/v1/me/billings?view=history')
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.total', 1350);

    $this->withToken($token)->getJson('/api/v1/me')
        ->assertOk()
        ->assertJsonPath('data.id', $firstTenant->id)
        ->assertJsonPath('data.room.room_number', 'A101');
});

it('returns overdue status based on due date without changing the stored billing status', function () {
    $tenant = createApiTenant();
    $user = createLinkedApiUser($tenant);
    $billing = Billing::create([
        'tenant_id' => $tenant->id,
        'billing_period' => '2026-01',
        'rent' => 1200,
        'due_date' => '2026-01-31',
    ]);

    $response = $this->actingAs($user, 'sanctum')
        ->getJson('/api/v1/me/billings?view=current')
        ->assertOk()
        ->assertJsonPath('data.0.status', 2);

    expect($billing->fresh()->status)->toBe(0);
});

it('rejects login for unverified users and revokes the current token at logout', function () {
    $tenant = createApiTenant();
    $user = User::factory()->unverified()->create([
        'email' => $tenant->email,
        'password' => 'password',
    ]);

    $this->postJson('/api/v1/login', [
        'email' => $user->email,
        'password' => 'password',
    ])->assertForbidden();

    $user->markEmailAsVerified();
    $tenant->user()->associate($user)->save();
    $token = $user->createToken('mobile')->plainTextToken;

    $this->withToken($token)->postJson('/api/v1/logout')->assertOk();
    $this->app['auth']->forgetGuards();
    $this->withToken($token)->getJson('/api/v1/me')->assertUnauthorized();
});

it('rejects requests without a bearer token and invalid billing filters', function () {
    $this->getJson('/api/v1/me')->assertUnauthorized();

    $tenant = createApiTenant();
    $user = createLinkedApiUser($tenant);

    $this->actingAs($user, 'sanctum')
        ->getJson('/api/v1/me/billings?view=other')
        ->assertUnprocessable();
});
