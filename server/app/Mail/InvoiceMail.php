<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;
    public $billing;

    /**
     * Create a new message instance.
     */
    public function __construct($billing)
    {
        $this->billing = $billing;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Monthly Invoice',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.invoice',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            Attachment::fromData(
                fn () => Pdf::loadView('pdf.invoice', [
                    'boardingHouse' => 'My Boarding House',
                    'tenantName'    => $this->billing->tenant->name,
                    'room'          => $this->billing->room->name,
                    'period'        => $this->billing->period,
                    'dueDate'       => $this->billing->due_date->format('M d, Y'),
                    'total'         => $this->billing->room->rate,
                ])->output(),
                'invoice.pdf'
            )->withMime('application/pdf'),
        ];
    }
}
