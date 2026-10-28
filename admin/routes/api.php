<?php

use App\Http\Controllers\Api\Auth\AuthenticationController;
use App\Http\Controllers\Api\Auth\TenantRegistrationController;
use App\Http\Controllers\Api\Me\BillingController;
use App\Http\Controllers\Api\Me\DashboardController;
use App\Http\Controllers\Api\Me\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
})->name('health');

Route::prefix('v1')->name('api.v1.')->group(function (): void {
    Route::post('/register', [TenantRegistrationController::class, 'store'])
        ->middleware('throttle:5,1')
        ->name('register');
    Route::get('/register/verify/{token}', [TenantRegistrationController::class, 'verify'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('register.verify');
    Route::post('/register/verify/{token}', [TenantRegistrationController::class, 'confirm'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('register.verify.confirm');
    Route::post('/login', [AuthenticationController::class, 'store'])
        ->middleware('throttle:5,1')
        ->name('login');

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::post('/logout', [AuthenticationController::class, 'destroy'])->name('logout');
        Route::get('/me', [ProfileController::class, 'show'])->name('me.show');
        Route::patch('/me', [ProfileController::class, 'update'])->name('me.update');
        Route::get('/me/dashboard', DashboardController::class)->name('me.dashboard');
        Route::get('/me/billings', [BillingController::class, 'index'])->name('me.billings.index');
    });
});
