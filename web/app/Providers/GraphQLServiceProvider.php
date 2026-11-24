<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class GraphQLServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // GraphQL will be configured in the bootstrap file
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // GraphQL will be configured here
    }
}
