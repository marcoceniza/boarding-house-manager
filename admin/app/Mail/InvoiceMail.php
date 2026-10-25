<?php

namespace App\Mail;

use App\Models\Admin\Billing;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Billing $billing) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Payment Reminder');
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.invoice',
            with: [
                'billing' => $this->billing,
                'periodFormatted' => $this->formattedPeriod(),
            ],
        );
    }

    /** @return array<int, Attachment> */
    public function attachments(): array
    {
        $tenantName = $this->billing->tenant->first_name.' '.$this->billing->tenant->last_name;

        return [
            Attachment::fromData(
                fn (): string => Pdf::loadView('pdf.invoice', [
                    'tenantName' => $tenantName,
                    'period' => $this->formattedPeriod(),
                    'rent' => $this->billing->rent,
                    'water' => $this->billing->water,
                    'electricity' => $this->billing->electricity,
                    'dueDate' => $this->billing->due_date->format('F d, Y'),
                    'total' => $this->billing->total,
                ])->output(),
                Str::slug($tenantName).'-'.Carbon::createFromFormat(
                    'Y-m',
                    $this->billing->billing_period,
                )->format('Y-n').'-invoice.pdf',
            )->withMime('application/pdf'),
        ];
    }

    private function formattedPeriod(): string
    {
        return Carbon::createFromFormat('Y-m', $this->billing->billing_period)->format('F Y');
    }
}
