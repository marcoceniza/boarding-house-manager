<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;

class TenantRegistrationVerification extends Notification
{
    use Queueable;

    public function __construct(public readonly string $token) {}

    /** @return array<int, string> */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $url = URL::temporarySignedRoute(
            'api.v1.register.verify',
            Carbon::now()->addMinutes(60),
            ['token' => $this->token],
        );

        return (new MailMessage)
            ->subject('Verify your Haven House account')
            ->line('Verify your email address to finish creating your tenant account.')
            ->action('Verify email address', $url)
            ->line('This link expires in 60 minutes. If you did not request this account, you can ignore this email.');
    }
}
