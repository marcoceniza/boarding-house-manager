<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Billing;
use Illuminate\Support\Str;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public $billing;

    public function __construct(Billing $billing)
    {
        $this->billing = $billing;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Monthly Invoice'
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.invoice',
            with: [
                'billing' => $this->billing,
            ]
        );
    }

    public function attachments(): array
    {
        return [
            Attachment::fromData(
                fn () => Pdf::loadView('pdf.invoice', [
                    'tenantName' => $this->billing->tenant->first_name . ' ' . $this->billing->tenant->last_name,
                    'period'     => $this->billing->billing_period->format('F Y'),
                    'dueDate'    => $this->billing->due_date->format('F d, Y'),
                    'total'      => $this->billing->amount,
                ])->output(),
                // Generate filename dynamically
                Str::slug($this->billing->tenant->first_name . ' ' . $this->billing->tenant->last_name)
                . '-' 
                . $this->billing->billing_period->format('Y-n') // e.g., 2026-2
                . '-invoice.pdf'
            )->withMime('application/pdf'),
        ];
    }
}