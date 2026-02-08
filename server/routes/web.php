<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::post('/billings/{id}/send-invoice', [BillingController::class, 'sendInvoice']);