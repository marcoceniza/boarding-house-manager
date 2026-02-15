<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\BillingController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('rooms', RoomController::class);
    Route::apiResource('tenants', TenantController::class);
    Route::apiResource('billings', BillingController::class);
    Route::post('/tenants/{id}/end-tenancy', [TenantController::class, 'endTenancy']);
    Route::post('/billings/{id}/send-invoice', [BillingController::class, 'sendInvoice']);
});