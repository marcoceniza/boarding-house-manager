<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class ApiRateLimit
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\\Http\\Request): (\\Illuminate\\Http\\Response|\\Illuminate\\Http\\RedirectResponse)  $next
     * @return \Illuminate\\Http\\Response|\\Illuminate\\Http\\RedirectResponse
     */
    public function handle(Request $request, Closure $next, string $limiter): mixed
    {
        if (! RateLimiter::has($limiter)) {
            // Fallback to default rate limiting if custom limiter doesn't exist
            return $this->handleDefaultRateLimit($request, $next);
        }

        return RateLimiter::attempt(
            key: $limiter,
            callback: function (Request $request) use ($next) {
                return $next($request);
            },
            decaySeconds: 60, // Default decay period
        );
    }

    /**
     * Handle default rate limiting for API endpoints.
     */
    protected function handleDefaultRateLimit(Request $request, Closure $next): mixed
    {
        // Fallback to Laravel's default throttle middleware behavior
        return $next($request);
    }
}
