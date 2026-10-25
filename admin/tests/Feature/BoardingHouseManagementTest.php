<?php

use App\Mail\InvoiceMail;
use App\Models\Admin\Billing;
use App\Models\Admin\Room;
use App\Models\Admin\Tenant;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;

it('redirects unauthenticated users away from management pages', function () {
    $this->get(route('dashboard.rooms.index'))
        ->assertRedirect(route('login'));
});

it('shows the four most recent room tenant and billing activities', function () {
    $this->travelTo('2026-10-01 09:00:00');

    $firstRoom = Room::create([
        'room_number' => 'A101',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 1,
        'status' => 1,
    ]);

    $this->travel(1)->minutes();

    $firstTenant = Tenant::create([
        'first_name' => 'Alex',
        'last_name' => 'Rivera',
        'email' => 'alex.rivera@example.test',
        'room_id' => $firstRoom->id,
        'move_in_date' => now()->toDateString(),
        'status' => 1,
    ]);

    $this->travel(1)->minutes();

    Billing::create([
        'tenant_id' => $firstTenant->id,
        'billing_period' => '2026-10',
        'rent' => 1200,
        'due_date' => '2026-10-31',
    ]);

    $this->travel(1)->minutes();

    $secondRoom = Room::create([
        'room_number' => 'A102',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 1,
        'status' => 1,
    ]);

    $this->travel(1)->minutes();

    $secondTenant = Tenant::create([
        'first_name' => 'Jamie',
        'last_name' => 'Kim',
        'email' => 'jamie.kim@example.test',
        'room_id' => $secondRoom->id,
        'move_in_date' => now()->toDateString(),
        'status' => 1,
    ]);

    $this->travel(1)->minutes();

    Billing::create([
        'tenant_id' => $secondTenant->id,
        'billing_period' => '2026-10',
        'rent' => 1200,
        'due_date' => '2026-10-31',
    ]);

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/Index')
            ->has('activities', 4)
            ->where('activities.0.id', 'billing-2')
            ->where('activities.0.title', 'Billing created')
            ->where('activities.1.id', 'tenant-2')
            ->where('activities.2.id', 'room-2')
            ->where('activities.3.id', 'billing-1'));
});

it('shows live room tenancy and billing statistics on the dashboard', function () {
    $this->travelTo('2026-10-22 12:00:00');

    $activeRoom = Room::create([
        'room_number' => 'D101',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 1,
        'status' => 1,
    ]);
    $formerRoom = Room::create([
        'room_number' => 'D102',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 0,
        'status' => 0,
    ]);
    $activeTenant = Tenant::create([
        'first_name' => 'Active',
        'last_name' => 'Tenant',
        'email' => 'active.dashboard@example.test',
        'room_id' => $activeRoom->id,
        'move_in_date' => '2026-10-01',
        'status' => 1,
    ]);
    $formerTenant = Tenant::create([
        'first_name' => 'Former',
        'last_name' => 'Tenant',
        'email' => 'former.dashboard@example.test',
        'room_id' => $formerRoom->id,
        'move_in_date' => '2025-10-01',
        'ended_at' => '2026-10-01 12:00:00',
        'status' => 2,
    ]);
    Billing::create([
        'tenant_id' => $activeTenant->id,
        'billing_period' => '2026-10',
        'rent' => 1200,
        'water' => 100,
        'due_date' => '2026-10-31',
        'paid_at' => '2026-10-20',
        'status' => 1,
    ]);
    Billing::create([
        'tenant_id' => $activeTenant->id,
        'billing_period' => '2026-09',
        'rent' => 500,
        'due_date' => '2026-09-30',
        'paid_at' => '2026-09-20',
        'status' => 1,
    ]);
    Billing::create([
        'tenant_id' => $formerTenant->id,
        'billing_period' => '2026-09',
        'rent' => 600,
        'due_date' => '2026-09-30',
        'status' => 0,
    ]);

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/Index')
            ->where('statistics.rooms', 2)
            ->where('statistics.activeTenants', 1)
            ->where('statistics.collectedThisMonth', 1300)
            ->where('statistics.outstandingBalance', 600));
});

it('renders rooms in an Inertia page for authenticated users', function () {
    $room = Room::create([
        'room_number' => 'A101',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 0,
        'status' => 0,
    ]);

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.rooms.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('rooms/Index')
            ->has('rooms.data', 1)
            ->where('rooms.data.0.id', $room->id)
            ->has('rooms.data.0.tenants', 0));
});

it('includes active tenant names with rooms and excludes former tenants', function () {
    $room = Room::create([
        'room_number' => 'A102',
        'type' => 'Double',
        'capacity' => 2,
        'price_per_month' => 1800,
        'occupied' => 1,
        'status' => 1,
    ]);
    $activeTenant = Tenant::create([
        'first_name' => 'Jordan',
        'last_name' => 'Lee',
        'email' => 'jordan.lee@example.test',
        'room_id' => $room->id,
        'move_in_date' => '2026-10-01',
        'status' => 1,
    ]);
    Tenant::create([
        'first_name' => 'Former',
        'last_name' => 'Resident',
        'email' => 'former.resident@example.test',
        'room_id' => $room->id,
        'move_in_date' => '2025-10-01',
        'ended_at' => '2026-09-30 12:00:00',
        'status' => 2,
    ]);

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.rooms.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('rooms/Index')
            ->has('rooms.data.0.tenants', 1)
            ->where('rooms.data.0.tenants.0.id', $activeTenant->id)
            ->where('rooms.data.0.tenants.0.first_name', 'Jordan')
            ->where('rooms.data.0.tenants.0.last_name', 'Lee'));
});

it('paginates room results on the server', function () {
    foreach (range(1, 11) as $number) {
        Room::create([
            'room_number' => sprintf('R%03d', $number),
            'type' => 'Single',
            'capacity' => 1,
            'price_per_month' => 1200,
            'occupied' => 0,
            'status' => 0,
        ]);
    }

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.rooms.index', ['page' => 2]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('rooms/Index')
            ->has('rooms.data', 1)
            ->where('rooms.current_page', 2)
            ->where('rooms.total', 11));
});

it('paginates tenant results on the server', function () {
    $room = Room::create([
        'room_number' => 'T001',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 0,
        'status' => 0,
    ]);

    foreach (range(1, 11) as $number) {
        Tenant::create([
            'first_name' => 'Tenant',
            'last_name' => (string) $number,
            'email' => "tenant{$number}@example.test",
            'room_id' => $room->id,
            'move_in_date' => '2026-01-01',
            'status' => 1,
        ]);
    }

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.tenants.index', ['page' => 2]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('tenants/Index')
            ->has('tenants.data', 1)
            ->where('tenants.current_page', 2)
            ->where('tenants.total', 11));
});

it('shows current tenants separately from former tenancy records', function () {
    $room = Room::create([
        'room_number' => 'T002',
        'type' => 'Double',
        'capacity' => 2,
        'price_per_month' => 1800,
        'occupied' => 1,
        'status' => 1,
    ]);
    $currentTenant = Tenant::create([
        'first_name' => 'Current',
        'last_name' => 'Tenant',
        'email' => 'current.tenant@example.test',
        'room_id' => $room->id,
        'move_in_date' => '2026-01-01',
        'status' => 1,
    ]);
    $formerTenant = Tenant::create([
        'first_name' => 'Former',
        'last_name' => 'Tenant',
        'email' => 'former.tenant@example.test',
        'room_id' => $room->id,
        'move_in_date' => '2025-01-01',
        'status' => 2,
        'ended_at' => '2026-10-01 10:00:00',
    ]);

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.tenants.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('tenants/Index')
            ->has('tenants.data', 1)
            ->where('tenants.data.0.id', $currentTenant->id)
            ->has('formerTenants', 1)
            ->where('formerTenants.0.id', $formerTenant->id)
            ->where('formerTenants.0.room.room_number', 'T002'));
});

it('shows only the current month billings by default', function () {
    $this->travelTo('2026-10-22 12:00:00');

    $room = Room::create([
        'room_number' => 'B001',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 1,
        'status' => 1,
    ]);
    $tenant = Tenant::create([
        'first_name' => 'Current',
        'last_name' => 'Tenant',
        'email' => 'current@example.test',
        'room_id' => $room->id,
        'move_in_date' => now()->toDateString(),
        'status' => 1,
    ]);
    Billing::create([
        'tenant_id' => $tenant->id,
        'billing_period' => '2026-10',
        'rent' => 1200,
        'due_date' => '2026-10-31',
    ]);

    $this->travelTo('2026-10-21 12:00:00');
    Billing::create([
        'tenant_id' => Tenant::create([
            'first_name' => 'Previous',
            'last_name' => 'Day',
            'email' => 'previous.day@example.test',
            'room_id' => $room->id,
            'move_in_date' => now()->toDateString(),
            'status' => 1,
        ])->id,
        'billing_period' => '2026-10',
        'rent' => 1200,
        'due_date' => '2026-10-31',
    ]);

    $this->travelTo('2026-10-22 12:00:00');
    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.billings.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('billings/Index')
            ->where('month', '2026-10')
            ->where('date', '2026-10-22')
            ->has('billings.data', 1)
            ->where('billings.data.0.billing_period', '2026-10')
            ->has('billedTenantIds', 2));

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.billings.index', ['date' => '2026-10-21']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('billings/Index')
            ->where('date', '2026-10-21')
            ->where('month', '2026-10')
            ->has('billings.data', 1)
            ->where('billings.data.0.billing_period', '2026-10'));

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.billings.index', ['date' => '2026-10-23']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('billings/Index')
            ->where('date', '2026-10-23')
            ->has('billings.data', 0));
});

it('keeps former tenant billings in the archive instead of the current list', function () {
    $this->travelTo('2026-10-20 12:00:00');

    $room = Room::create([
        'room_number' => 'B003',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 0,
        'status' => 0,
    ]);
    $formerTenant = Tenant::create([
        'first_name' => 'Former',
        'last_name' => 'Resident',
        'email' => 'former.resident@example.test',
        'room_id' => $room->id,
        'move_in_date' => '2025-01-01',
        'ended_at' => '2026-10-19 12:00:00',
        'status' => 2,
    ]);
    $formerBilling = Billing::create([
        'tenant_id' => $formerTenant->id,
        'billing_period' => '2026-09',
        'rent' => 1200,
        'due_date' => '2026-10-01',
        'status' => 0,
    ]);

    $this->travelTo('2026-10-22 12:00:00');
    $activeTenant = Tenant::create([
        'first_name' => 'Current',
        'last_name' => 'Resident',
        'email' => 'current.resident@example.test',
        'room_id' => $room->id,
        'move_in_date' => '2026-10-20',
        'status' => 1,
    ]);
    $activeBilling = Billing::create([
        'tenant_id' => $activeTenant->id,
        'billing_period' => '2026-10',
        'rent' => 1200,
        'due_date' => '2026-10-31',
        'status' => 0,
    ]);

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.billings.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('billings/Index')
            ->has('billings.data', 1)
            ->where('billings.data.0.id', $activeBilling->id)
            ->where('billings.data.0.status', 0)
            ->has('formerBillings', 1)
            ->where('formerBillings.0.id', $formerBilling->id)
            ->where('formerBillings.0.tenant.id', $formerTenant->id)
            ->where('formerBillings.0.status', 2));
});

it('filters and paginates billings while retaining the selected date', function () {
    $this->travelTo('2026-09-21 12:00:00');

    $room = Room::create([
        'room_number' => 'B002',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 1,
        'status' => 1,
    ]);

    foreach (range(1, 11) as $number) {
        $tenant = Tenant::create([
            'first_name' => 'Tenant',
            'last_name' => (string) $number,
            'email' => "billed{$number}@example.test",
            'room_id' => $room->id,
            'move_in_date' => '2026-01-01',
            'status' => 1,
        ]);

        Billing::create([
            'tenant_id' => $tenant->id,
            'billing_period' => '2026-09',
            'rent' => 1200,
            'due_date' => '2026-09-30',
        ]);
    }

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.billings.index', [
            'date' => '2026-09-21',
            'page' => 2,
        ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('billings/Index')
            ->where('month', '2026-09')
            ->where('date', '2026-09-21')
            ->has('billings.data', 1)
            ->where('billings.current_page', 2)
            ->where('billings.total', 11)
            ->where(
                'billings.prev_page_url',
                route('dashboard.billings.index', [
                    'date' => '2026-09-21',
                    'page' => 1,
                ]),
            )
            ->has('billedTenantIds', 11));
});

it('rejects an invalid billing month filter', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.billings.index', ['month' => '2026-13']))
        ->assertSessionHasErrors('month');
});

it('creates rooms with available status and no occupants', function () {
    $this->actingAs(User::factory()->create())
        ->from(route('dashboard.rooms.index'))
        ->post(route('dashboard.rooms.store'), [
            'room_number' => 'B202',
            'type' => 'Double',
            'capacity' => 2,
            'price_per_month' => '1,450.00',
        ])
        ->assertRedirect(route('dashboard.rooms.index'))
        ->assertSessionHas('success', 'Room created successfully.');

    $this->assertDatabaseHas('rooms', [
        'room_number' => 'B202',
        'occupied' => 0,
        'status' => 0,
    ]);
});

it('rejects room creation when required fields are missing', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('dashboard.rooms.store'), [])
        ->assertSessionHasErrors([
            'room_number',
            'type',
            'capacity',
            'price_per_month',
        ]);
});

it('rejects changing room capacity while tenants occupy the room', function () {
    $room = Room::create([
        'room_number' => 'B303',
        'type' => 'Double',
        'capacity' => 3,
        'price_per_month' => 1800,
        'occupied' => 2,
        'status' => 1,
    ]);

    $this->actingAs(User::factory()->create())
        ->from(route('dashboard.rooms.index'))
        ->put(route('dashboard.rooms.update', $room), [
            'room_number' => $room->room_number,
            'type' => $room->type,
            'capacity' => 1,
            'price_per_month' => '1,800.00',
        ])
        ->assertSessionHasErrors([
            'room' => 'Cannot update a room while it has active tenants.',
        ]);

    $this->assertDatabaseHas('rooms', [
        'id' => $room->id,
        'capacity' => 3,
        'occupied' => 2,
    ]);
});

it('rejects updating a room while it has active tenants', function () {
    $room = Room::create([
        'room_number' => 'B404',
        'type' => 'Double',
        'capacity' => 2,
        'price_per_month' => 1800,
        'occupied' => 1,
        'status' => 1,
    ]);

    $this->actingAs(User::factory()->create())
        ->from(route('dashboard.rooms.index'))
        ->put(route('dashboard.rooms.update', $room), [
            'room_number' => 'B405',
            'type' => 'Family',
            'capacity' => 3,
            'price_per_month' => 2200,
        ])
        ->assertRedirect(route('dashboard.rooms.index'))
        ->assertSessionHasErrors([
            'room' => 'Cannot update a room while it has active tenants.',
        ]);

    $this->assertDatabaseHas('rooms', [
        'id' => $room->id,
        'room_number' => 'B404',
        'type' => 'Double',
        'capacity' => 2,
        'price_per_month' => 1800,
        'occupied' => 1,
        'status' => 1,
    ]);
});

it('rejects deleting a room while it has active tenants', function () {
    $room = Room::create([
        'room_number' => 'B505',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 1,
        'status' => 1,
    ]);

    $this->actingAs(User::factory()->create())
        ->from(route('dashboard.rooms.index'))
        ->delete(route('dashboard.rooms.destroy', $room))
        ->assertRedirect(route('dashboard.rooms.index'))
        ->assertSessionHasErrors([
            'room' => 'Cannot delete a room with active tenants.',
        ]);

    $this->assertModelExists($room);
});

it('creates a tenant and updates the selected room occupancy', function () {
    $this->freezeTime();

    $room = Room::create([
        'room_number' => 'C303',
        'type' => 'Family',
        'capacity' => 3,
        'price_per_month' => 2500,
        'occupied' => 0,
        'status' => 0,
    ]);

    $this->actingAs(User::factory()->create())
        ->post(route('dashboard.tenants.store'), [
            'first_name' => 'Sam',
            'last_name' => 'Rivera',
            'email' => 'sam@example.test',
            'room_id' => $room->id,
            'move_in_date' => now()->toDateString(),
            'occupied' => 2,
        ])
        ->assertRedirect(route('dashboard.tenants.index'))
        ->assertSessionHas('success', 'Tenant created successfully.');

    $this->assertDatabaseHas('tenants', [
        'email' => 'sam@example.test',
        'status' => 1,
    ]);
    $this->assertDatabaseHas('rooms', [
        'id' => $room->id,
        'occupied' => 2,
        'status' => 1,
    ]);
});

it('moves an active tenant between rooms and updates both room records', function () {
    $this->freezeTime();

    $currentRoom = Room::create([
        'room_number' => 'C404',
        'type' => 'Double',
        'capacity' => 2,
        'price_per_month' => 1800,
        'occupied' => 2,
        'status' => 1,
    ]);
    $newRoom = Room::create([
        'room_number' => 'C405',
        'type' => 'Family',
        'capacity' => 4,
        'price_per_month' => 2600,
        'occupied' => 0,
        'status' => 0,
    ]);
    $tenant = Tenant::create([
        'first_name' => 'Casey',
        'last_name' => 'Hall',
        'email' => 'casey@example.test',
        'room_id' => $currentRoom->id,
        'move_in_date' => now()->toDateString(),
        'status' => 1,
    ]);

    $this->actingAs(User::factory()->create())
        ->put(route('dashboard.tenants.update', $tenant), [
            'first_name' => 'Casey',
            'last_name' => 'Hall',
            'email' => 'casey@example.test',
            'room_id' => $newRoom->id,
            'move_in_date' => now()->toDateString(),
            'occupied' => 2,
        ])
        ->assertRedirect(route('dashboard.tenants.index'));

    $this->assertDatabaseHas('rooms', [
        'id' => $currentRoom->id,
        'status' => 0,
        'occupied' => 0,
    ]);
    $this->assertDatabaseHas('rooms', [
        'id' => $newRoom->id,
        'status' => 1,
        'occupied' => 2,
    ]);
    $this->assertDatabaseHas('tenants', [
        'id' => $tenant->id,
        'room_id' => $newRoom->id,
    ]);
});

it('rejects tenant occupancy above the room capacity without changing the room', function () {
    $this->freezeTime();

    $room = Room::create([
        'room_number' => 'D404',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1000,
        'occupied' => 0,
        'status' => 0,
    ]);

    $this->actingAs(User::factory()->create())
        ->post(route('dashboard.tenants.store'), [
            'first_name' => 'Alex',
            'last_name' => 'Lee',
            'email' => 'alex@example.test',
            'room_id' => $room->id,
            'move_in_date' => now()->toDateString(),
            'occupied' => 2,
        ])
        ->assertSessionHasErrors('occupied');

    $this->assertDatabaseMissing('tenants', ['email' => 'alex@example.test']);
    $this->assertDatabaseHas('rooms', [
        'id' => $room->id,
        'occupied' => 0,
        'status' => 0,
    ]);
});

it('ends an active tenancy and makes its room available', function () {
    $this->freezeTime();

    $room = Room::create([
        'room_number' => 'E505',
        'type' => 'Double',
        'capacity' => 2,
        'price_per_month' => 1800,
        'occupied' => 2,
        'status' => 1,
    ]);
    $tenant = Tenant::create([
        'first_name' => 'Jamie',
        'last_name' => 'Kim',
        'email' => 'jamie@example.test',
        'room_id' => $room->id,
        'move_in_date' => now()->toDateString(),
        'status' => 1,
    ]);
    $billing = Billing::create([
        'tenant_id' => $tenant->id,
        'billing_period' => now()->format('Y-m'),
        'rent' => 1800,
        'water' => 0,
        'electricity' => 0,
        'due_date' => now()->addDays(1)->toDateString(),
    ]);

    $this->actingAs(User::factory()->create())
        ->post(route('dashboard.tenants.end-tenancy', $tenant))
        ->assertRedirect(route('dashboard.tenants.index'))
        ->assertSessionHas('success', 'Tenancy ended successfully.');

    $this->assertDatabaseHas('tenants', [
        'id' => $tenant->id,
        'status' => 2,
    ]);
    $this->assertDatabaseHas('rooms', [
        'id' => $room->id,
        'occupied' => 0,
        'status' => 0,
    ]);
    expect($tenant->fresh()->ended_at)->not->toBeNull();
    $this->assertModelExists($billing);
    expect($billing->fresh()->status)->toBe(0);

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.rooms.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('rooms/Index')
            ->where('rooms.data.0.occupied', 0)
            ->where('rooms.data.0.status', 0));
});

it('does not make a room available when deleting a former tenant', function () {
    $this->freezeTime();

    $room = Room::create([
        'room_number' => 'F606',
        'type' => 'Double',
        'capacity' => 2,
        'price_per_month' => 1800,
        'occupied' => 2,
        'status' => 1,
    ]);
    $tenant = Tenant::create([
        'first_name' => 'Taylor',
        'last_name' => 'Ng',
        'email' => 'taylor@example.test',
        'room_id' => $room->id,
        'move_in_date' => now()->toDateString(),
        'status' => 2,
        'ended_at' => now(),
    ]);

    $this->actingAs(User::factory()->create())
        ->delete(route('dashboard.tenants.destroy', $tenant))
        ->assertRedirect(route('dashboard.tenants.index'));

    $this->assertDatabaseMissing('tenants', ['id' => $tenant->id]);
    $this->assertDatabaseHas('rooms', [
        'id' => $room->id,
        'occupied' => 2,
        'status' => 1,
    ]);
});

it('preserves tenant billing records when deletion is attempted', function () {
    $room = Room::create([
        'room_number' => 'G707',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 1,
        'status' => 1,
    ]);
    $tenant = Tenant::create([
        'first_name' => 'Morgan',
        'last_name' => 'Park',
        'email' => 'morgan.park@example.test',
        'room_id' => $room->id,
        'move_in_date' => now()->toDateString(),
        'status' => 1,
    ]);
    $billing = Billing::create([
        'tenant_id' => $tenant->id,
        'billing_period' => now()->format('Y-m'),
        'rent' => 1200,
        'water' => 0,
        'electricity' => 0,
        'due_date' => now()->addDays(1)->toDateString(),
    ]);

    $this->actingAs(User::factory()->create())
        ->from(route('dashboard.tenants.index'))
        ->delete(route('dashboard.tenants.destroy', $tenant))
        ->assertRedirect(route('dashboard.tenants.index'))
        ->assertSessionHasErrors([
            'tenant' => 'Cannot delete this tenant while billing records exist. End the tenancy instead to preserve billing history.',
        ]);

    $this->assertModelExists($tenant);
    $this->assertModelExists($billing);
    $this->assertDatabaseHas('rooms', [
        'id' => $room->id,
        'occupied' => 1,
        'status' => 1,
    ]);
});

it('prevents database deletion of tenants with billing records', function () {
    $room = Room::create([
        'room_number' => 'H808',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 0,
        'status' => 0,
    ]);
    $tenant = Tenant::create([
        'first_name' => 'Robin',
        'last_name' => 'Shah',
        'email' => 'robin.shah@example.test',
        'room_id' => $room->id,
        'move_in_date' => now()->toDateString(),
        'status' => 2,
    ]);
    $billing = Billing::create([
        'tenant_id' => $tenant->id,
        'billing_period' => now()->format('Y-m'),
        'rent' => 1200,
        'water' => 0,
        'electricity' => 0,
        'due_date' => now()->addDays(1)->toDateString(),
    ]);

    expect(fn () => $tenant->delete())->toThrow(QueryException::class);

    $this->assertModelExists($tenant);
    $this->assertModelExists($billing);
});

it('creates billing totals and sends a renderable PDF invoice', function () {
    $this->freezeTime();

    $room = Room::create([
        'room_number' => 'G707',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 1,
        'status' => 1,
    ]);
    $tenant = Tenant::create([
        'first_name' => 'Morgan',
        'last_name' => 'Park',
        'email' => 'morgan@example.test',
        'room_id' => $room->id,
        'move_in_date' => now()->toDateString(),
        'status' => 1,
    ]);

    $this->actingAs(User::factory()->create())
        ->post(route('dashboard.billings.store', [
            'month' => now()->format('Y-m'),
        ]), [
            'tenant_id' => $tenant->id,
            'billing_period' => now()->format('Y-m'),
            'rent' => '1,200.00',
            'water' => 150,
            'electricity' => 100,
            'due_date' => now()->addDays(1)->toDateString(),
        ])
        ->assertRedirect(route('dashboard.billings.index', [
            'month' => now()->format('Y-m'),
        ]));

    $billing = Billing::query()->firstOrFail();
    expect((float) $billing->total)->toBe(1450.0);

    Mail::fake();

    $this->actingAs(User::factory()->create())
        ->post(route('dashboard.billings.send-invoice', [
            'billing' => $billing->id,
            'month' => now()->format('Y-m'),
        ]))
        ->assertRedirect(route('dashboard.billings.index', [
            'month' => now()->format('Y-m'),
        ]))
        ->assertSessionHas('success', 'Invoice sent successfully.');

    Mail::assertSent(InvoiceMail::class, fn (InvoiceMail $mail) => $mail->hasTo($tenant->email)
        && str_contains($mail->render(), now()->format('F Y'))
        && count($mail->attachments()) === 1);

    $pdf = Pdf::loadView('pdf.invoice', [
        'tenantName' => 'Morgan Park',
        'period' => now()->format('F Y'),
        'rent' => 1200,
        'water' => 150,
        'electricity' => 100,
        'dueDate' => now()->addDays(1)->format('F d, Y'),
        'total' => 1450,
    ])->output();

    expect(str_starts_with($pdf, '%PDF'))->toBeTrue();
});

it('records a full billing payment with its date and method', function () {
    $this->travelTo('2026-10-22 12:00:00');
    $room = Room::create([
        'room_number' => 'I909',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 1,
        'status' => 1,
    ]);
    $tenant = Tenant::create([
        'first_name' => 'Casey',
        'last_name' => 'Morgan',
        'email' => 'casey.morgan@example.test',
        'room_id' => $room->id,
        'move_in_date' => '2026-10-01',
        'status' => 1,
    ]);
    $billing = Billing::create([
        'tenant_id' => $tenant->id,
        'billing_period' => '2026-10',
        'rent' => 1200,
        'water' => 150,
        'electricity' => 100,
        'due_date' => '2026-10-15',
        'status' => 2,
    ]);

    $this->actingAs(User::factory()->create())
        ->from(route('dashboard.billings.index', ['date' => '2026-10-22']))
        ->post(route('dashboard.billings.mark-paid', [
            'billing' => $billing->id,
            'date' => '2026-10-22',
        ]), [
            'paid_at' => '2026-10-22 00:00:00',
            'payment_method' => 'bank_transfer',
        ])
        ->assertRedirect(route('dashboard.billings.index', [
            'date' => '2026-10-22',
        ]))
        ->assertSessionHas('success', 'Payment recorded successfully.');

    $this->assertDatabaseHas('billings', [
        'id' => $billing->id,
        'status' => 1,
        'paid_at' => '2026-10-22 00:00:00',
        'payment_method' => 'bank_transfer',
        'rent' => 1200,
        'water' => 150,
        'electricity' => 100,
        'total' => 1450,
    ]);
});

it('rejects recording a payment more than once', function () {
    $this->travelTo('2026-10-22 12:00:00');
    $room = Room::create([
        'room_number' => 'J010',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 1,
        'status' => 1,
    ]);
    $tenant = Tenant::create([
        'first_name' => 'Riley',
        'last_name' => 'Taylor',
        'email' => 'riley.taylor@example.test',
        'room_id' => $room->id,
        'move_in_date' => '2026-10-01',
        'status' => 1,
    ]);
    $billing = Billing::create([
        'tenant_id' => $tenant->id,
        'billing_period' => '2026-10',
        'rent' => 1200,
        'water' => 0,
        'electricity' => 0,
        'due_date' => '2026-10-31',
        'status' => 1,
    ]);
    $billing->update([
        'paid_at' => '2026-10-20 00:00:00',
        'payment_method' => 'cash',
    ]);

    $this->actingAs(User::factory()->create())
        ->from(route('dashboard.billings.index'))
        ->post(route('dashboard.billings.mark-paid', $billing), [
            'paid_at' => '2026-10-22',
            'payment_method' => 'bank_transfer',
        ])
        ->assertRedirect(route('dashboard.billings.index'))
        ->assertSessionHasErrors([
            'billing' => 'This billing has already been marked as paid.',
        ]);

    $this->assertDatabaseHas('billings', [
        'id' => $billing->id,
        'status' => 1,
        'paid_at' => '2026-10-20 00:00:00',
        'payment_method' => 'cash',
    ]);
});

it('rejects future payment dates without changing billing status', function () {
    $this->travelTo('2026-10-22 12:00:00');
    $room = Room::create([
        'room_number' => 'K111',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 1,
        'status' => 1,
    ]);
    $tenant = Tenant::create([
        'first_name' => 'Avery',
        'last_name' => 'Jordan',
        'email' => 'avery.jordan@example.test',
        'room_id' => $room->id,
        'move_in_date' => '2026-10-01',
        'status' => 1,
    ]);
    $billing = Billing::create([
        'tenant_id' => $tenant->id,
        'billing_period' => '2026-10',
        'rent' => 1200,
        'water' => 0,
        'electricity' => 0,
        'due_date' => '2026-10-31',
    ]);

    $this->actingAs(User::factory()->create())
        ->from(route('dashboard.billings.index'))
        ->post(route('dashboard.billings.mark-paid', $billing), [
            'paid_at' => '2026-10-23',
            'payment_method' => 'cash',
        ])
        ->assertRedirect(route('dashboard.billings.index'))
        ->assertSessionHasErrors('paid_at');

    $this->assertDatabaseHas('billings', [
        'id' => $billing->id,
        'status' => 0,
        'paid_at' => null,
        'payment_method' => null,
    ]);
});

it('displays unpaid billing as overdue after its due date', function () {
    $this->travelTo('2026-10-22 12:00:00');
    $room = Room::create([
        'room_number' => 'L212',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 1,
        'status' => 1,
    ]);
    $tenant = Tenant::create([
        'first_name' => 'Drew',
        'last_name' => 'Quinn',
        'email' => 'drew.quinn@example.test',
        'room_id' => $room->id,
        'move_in_date' => '2026-10-01',
        'status' => 1,
    ]);
    $billing = Billing::create([
        'tenant_id' => $tenant->id,
        'billing_period' => '2026-10',
        'rent' => 1200,
        'water' => 0,
        'electricity' => 0,
        'due_date' => '2026-10-21',
    ]);

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.billings.index', ['date' => '2026-10-22']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('billings/Index')
            ->where('billings.data.0.id', $billing->id)
            ->where('billings.data.0.status', 2));

    $this->assertDatabaseHas('billings', [
        'id' => $billing->id,
        'status' => 0,
    ]);
});

it('updates billing amounts and recalculates the total', function () {
    $this->freezeTime();

    $tenantRoom = Room::create([
        'room_number' => 'H808',
        'type' => 'Single',
        'capacity' => 1,
        'price_per_month' => 1200,
        'occupied' => 1,
        'status' => 1,
    ]);
    $tenant = Tenant::create([
        'first_name' => 'Robin',
        'last_name' => 'Shah',
        'email' => 'robin@example.test',
        'room_id' => $tenantRoom->id,
        'move_in_date' => now()->toDateString(),
        'status' => 1,
    ]);
    $billing = Billing::create([
        'tenant_id' => $tenant->id,
        'billing_period' => now()->format('Y-m'),
        'rent' => 1200,
        'water' => 100,
        'electricity' => 100,
        'due_date' => now()->addDays(1)->toDateString(),
    ]);

    $this->actingAs(User::factory()->create())
        ->put(route('dashboard.billings.update', [
            'billing' => $billing->id,
            'month' => now()->format('Y-m'),
        ]), [
            'tenant_id' => $tenant->id,
            'billing_period' => $billing->billing_period,
            'rent' => '1,200.00',
            'water' => 250,
            'electricity' => 100,
            'due_date' => now()->addDays(2)->toDateString(),
        ])
        ->assertRedirect(route('dashboard.billings.index', [
            'month' => now()->format('Y-m'),
        ]));

    expect((float) $billing->fresh()->total)->toBe(1550.0);
});
