<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBillingRequest;
use App\Http\Requests\Admin\UpdateBillingRequest;
use App\Mail\InvoiceMail;
use App\Models\Admin\Billing;
use App\Models\Admin\Tenant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class BillingController extends Controller
{
    public function index(Request $request): Response
    {
        $validated = $request->validate([
            'date' => ['nullable', 'date_format:Y-m-d'],
            'month' => ['nullable', 'date_format:Y-m'],
        ]);
        $date = $validated['date']
            ?? (($validated['month'] ?? now()->format('Y-m')) === now()->format('Y-m')
                ? now()->toDateString()
                : "{$validated['month']}-01");
        $month = substr($date, 0, 7);
        $setBillingStatus = function (Billing $billing): void {
            $billing->status = $billing->status === 1
                ? 1
                : ($billing->due_date->lt(today()) ? 2 : 0);
        };
        $billings = Billing::with('tenant.room')
            ->whereDoesntHave('tenant', fn ($query) => $query->where('status', 2))
            ->whereDate('created_at', $date)
            ->latest()
            ->paginate(10)
            ->withQueryString();
        $billings->getCollection()->each($setBillingStatus);
        $formerBillings = Billing::with('tenant.room')
            ->whereHas('tenant', fn ($query) => $query->where('status', 2))
            ->latest()
            ->get();
        $formerBillings->each($setBillingStatus);

        return Inertia::render('billings/Index', [
            'billings' => $billings,
            'formerBillings' => $formerBillings,
            'date' => $date,
            'month' => $month,
            'billedTenantIds' => Billing::where('billing_period', $month)
                ->pluck('tenant_id'),
            'tenants' => Tenant::with('room')
                ->where('status', 1)
                ->orderBy('last_name')
                ->orderBy('first_name')
                ->get(),
        ]);
    }

    public function store(StoreBillingRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['water'] = $validated['water'] ?? 0;
        $validated['electricity'] = $validated['electricity'] ?? 0;

        Billing::create($validated);

        return $this->indexRedirect($request->query('date'), $request->query('month'))
            ->with('success', 'Billing created successfully.');
    }

    public function update(UpdateBillingRequest $request, Billing $billing): RedirectResponse
    {
        $validated = $request->validated();

        $billing->update($validated);

        return $this->indexRedirect($request->query('date'), $request->query('month'))
            ->with('success', 'Billing updated successfully.');
    }

    public function markPaid(Request $request, Billing $billing): RedirectResponse
    {
        $validated = $request->validate([
            'paid_at' => ['required', 'date', 'before_or_equal:today'],
            'payment_method' => ['required', 'in:cash,bank_transfer,e_wallet,other'],
        ]);

        DB::transaction(function () use ($billing, $validated): void {
            $billing = Billing::whereKey($billing->getKey())
                ->lockForUpdate()
                ->firstOrFail();

            if ($billing->status === 1) {
                throw ValidationException::withMessages([
                    'billing' => 'This billing has already been marked as paid.',
                ]);
            }

            $billing->status = 1;
            $billing->paid_at = $validated['paid_at'];
            $billing->payment_method = $validated['payment_method'];
            $billing->save();
        });

        return $this->indexRedirect($request->query('date'), $request->query('month'))
            ->with('success', 'Payment recorded successfully.');
    }

    public function destroy(Request $request, Billing $billing): RedirectResponse
    {
        $billing->delete();

        return $this->indexRedirect($request->query('date'), $request->query('month'))
            ->with('success', 'Billing deleted successfully.');
    }

    public function sendInvoice(Request $request, Billing $billing): RedirectResponse
    {
        $billing->load('tenant.room');
        Mail::to($billing->tenant->email)->send(new InvoiceMail($billing));

        return $this->indexRedirect($request->query('date'), $request->query('month'))
            ->with('success', 'Invoice sent successfully.');
    }

    private function indexRedirect(?string $date, ?string $month): RedirectResponse
    {
        $query = is_string($date)
            ? ['date' => $date]
            : (is_string($month) ? ['month' => $month] : []);

        return to_route(
            'dashboard.billings.index',
            $query,
        );
    }
}
