<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiResponseFormat
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): mixed
    {
        $response = $next($request);

        // Only modify JSON API responses
        if ($request->is('api/*') && $request->expectsJson()) {
            if ($response instanceof JsonResponse) {
                $data = $response->getData(true);

                // Standardize the response format
                $formattedResponse = [
                    config('app.api_format.success_key', 'success') => true,
                    config('app.api_format.data_key', 'data') => $data,
                    config('app.api_format.message_key', 'message') => null,
                ];

                // Remove null values unless explicitly requested
                $formattedResponse = array_filter($formattedResponse, fn ($value) => $value !== null);

                return new JsonResponse($formattedResponse, $response->getStatusCode(), $response->headers->all(), $response->getJson(), $response->getEncodingOptions());
            }
        }

        return $response;
    }
}
