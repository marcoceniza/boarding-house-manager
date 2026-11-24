<?php

use App\Http\Controllers\Admin\BillingController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\TenantController;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

Route::get('/health', function () {
    DB::select('select 1');

    return response('ok', 200)->header('Content-Type', 'text/plain');
});

Route::get('/', function (Request $request): Response|RedirectResponse {
    if ($request->user()) {
        return to_route('dashboard.index');
    }

    return Inertia::render('auth/Login');
})->name('home');

Route::middleware('guest')->group(function () {
    Route::inertia('/login', 'auth/Login')->name('login');
});

Route::middleware(['auth', 'admin'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');

    Route::resource('rooms', RoomController::class)->except(['create', 'edit', 'show']);
    Route::resource('tenants', TenantController::class)->except(['create', 'edit', 'show']);
    Route::post('/tenants/{tenant}/end-tenancy', [TenantController::class, 'endTenancy'])
        ->name('tenants.end-tenancy');

    Route::resource('billings', BillingController::class)->except(['create', 'edit', 'show']);
    Route::post('/billings/{billing}/mark-paid', [BillingController::class, 'markPaid'])
        ->name('billings.mark-paid');
    Route::post('/billings/{billing}/send-invoice', [BillingController::class, 'sendInvoice'])
        ->name('billings.send-invoice');
});

Route::fallback(function (Request $request): RedirectResponse {
    if ($request->expectsJson() || $request->user()) {
        abort(404);
    }

    return to_route('login');
});
