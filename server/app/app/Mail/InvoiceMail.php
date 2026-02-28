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
use Carbon\Carbon;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public $billing;

    public function __construct(Billing $billing)
    {
        $this->billing = $billing;

        $this->periodFormatted = Carbon::createFromFormat('Y-m', $billing->billing_period)
    ->format('F Y');
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Payment Reminder'
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.invoice',
            with: [
                'billing' => $this->billing,
                'periodFormatted' => $this->periodFormatted,
            ]
        );
    }

    public function attachments(): array
    {
        return [
            Attachment::fromData(
                fn () => Pdf::loadView('pdf.invoice', [
                    'tenantName'   => $this->billing->tenant->first_name . ' ' . $this->billing->tenant->last_name,
                'period'           => Carbon::createFromFormat('Y-m', $this->billing->billing_period)->format('F Y'),
                    'rent'         => $this->billing->rent,
                    'water'        => $this->billing->water,
                    'electricity'  => $this->billing->electricity,
                    'dueDate'      => $this->billing->due_date->format('F d, Y'),
                    'total'        => $this->billing->total,
                ])->output(),
                // Generate filename dynamically
                Str::slug($this->billing->tenant->first_name . ' ' . $this->billing->tenant->last_name)
                . '-' 
                . Carbon::createFromFormat('Y-m', $this->billing->billing_period)->format('Y-n')
                . '-invoice.pdf'
            )->withMime('application/pdf'),
        ];
    }
}