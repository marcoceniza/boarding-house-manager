<p>Hello {{ $billing->tenant->first_name ?? 'Tenant' }},</p>

<p>
    Please find attached your invoice for
    <strong>{{ $billing->billing_period->format('F Y') }}</strong>.
</p>

<p>
    <strong>Amount Due:</strong> ₱{{ number_format($billing->amount, 2) }}<br>
    <strong>Due Date:</strong>
    {{ optional($billing->due_date)->format('F d, Y') }}
</p>

<p>
    If you have any questions regarding this invoice, feel free to contact us.
</p>

<p>Thank you,<br>
<strong>My Boarding House</strong></p>