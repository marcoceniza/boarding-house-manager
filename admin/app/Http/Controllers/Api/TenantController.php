<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin\Tenant;
use Illuminate\Http\JsonResponse;

class TenantController extends Controller
{
    public function index(): JsonResponse
    {
        $tenants = Tenant::with('room')
            ->where('status', '!=', 2)
            ->latest()
            ->get();

        return response()->json($tenants);
    }
}
