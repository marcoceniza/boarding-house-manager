<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class ApiRateLimitingServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureApiRateLimiters();
    }

    /**
     * Configure optimized API rate limiters for different endpoint types.
     */
    protected function configureApiRateLimiters(): void
    {
        // Auth endpoints - Stricter limits to prevent brute force
        RateLimiter::for('api.login', function (Request $request): Limit {
            $ip = $request->ip();
            $email = $request->input('email') ?: $request->input('username');
            $throttleKey = Str::transliterate(Str::lower($email) ?: $ip).'|'.$ip;

            return Limit::perMinute(5)->by($throttleKey);
        });

        RateLimiter::for('api.register', function (Request $request): Limit {
            $ip = $request->ip();
            $email = $request->input('email');
            $throttleKey = $email ? Str::lower($email).'|'.$ip : $ip;

            return Limit::perMinute(3)->by($throttleKey);
        });

        RateLimiter::for('api.verification', function (Request $request): Limit {
            $ip = $request->ip();
            $email = $request->input('email') ?: $request->input('username');
            $throttleKey = Str::transliterate(Str::lower($email) ?: $ip).'|'.$ip;

            return Limit::perMinute(4)->by($throttleKey);
        });

        // Authenticated API endpoints - Moderate limits
        RateLimiter::for('api.authenticated', function (Request $request): Limit {
            $userId = $request->user()?->id;
            $ip = $request->ip();
            $throttleKey = $userId ? "user:{$userId}" : $ip;

            return Limit::perMinute(60)->by($throttleKey);
        });

        // Sensitive authenticated endpoints - Stricter limits
        RateLimiter::for('api.sensitive', function (Request $request): Limit {
            $userId = $request->user()?->id;
            $ip = $request->ip();
            $throttleKey = $userId ? "user:{$userId}" : $ip;

            return Limit::perMinute(30)->by($throttleKey);
        });

        // Public API endpoints - Light limits
        RateLimiter::for('api.public', function (Request $request): Limit {
            $ip = $request->ip();
            $throttleKey = "ip:{$ip}";

            return Limit::perMinute(120)->by($throttleKey);
        });

        // Dashboard/billing endpoints - Moderate limits
        RateLimiter::for('api.billing', function (Request $request): Limit {
            $userId = $request->user()?->id;
            $ip = $request->ip();
            $throttleKey = $userId ? "user:{$userId}" : $ip;

            return Limit::perMinute(30)->by($throttleKey);
        });

        // Admin endpoints - Stricter limits
        RateLimiter::for('api.admin', function (Request $request): Limit {
            $userId = $request->user()?->id;
            $ip = $request->ip();
            $throttleKey = $userId ? "user:{$userId}" : $ip;

            return Limit::perMinute(20)->by($throttleKey);
        });
    }
}
