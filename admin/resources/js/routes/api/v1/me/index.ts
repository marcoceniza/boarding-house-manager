import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
import billings from './billings'
/**
* @see \App\Http\Controllers\Api\Me\ProfileController::show
 * @see app/Http/Controllers/Api/Me/ProfileController.php:14
 * @route '/api/v1/me'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/me',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Me\ProfileController::show
 * @see app/Http/Controllers/Api/Me/ProfileController.php:14
 * @route '/api/v1/me'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Me\ProfileController::show
 * @see app/Http/Controllers/Api/Me/ProfileController.php:14
 * @route '/api/v1/me'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Me\ProfileController::show
 * @see app/Http/Controllers/Api/Me/ProfileController.php:14
 * @route '/api/v1/me'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Me\ProfileController::show
 * @see app/Http/Controllers/Api/Me/ProfileController.php:14
 * @route '/api/v1/me'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Me\ProfileController::show
 * @see app/Http/Controllers/Api/Me/ProfileController.php:14
 * @route '/api/v1/me'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Me\ProfileController::show
 * @see app/Http/Controllers/Api/Me/ProfileController.php:14
 * @route '/api/v1/me'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Api\Me\DashboardController::__invoke
 * @see app/Http/Controllers/Api/Me/DashboardController.php:15
 * @route '/api/v1/me/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/api/v1/me/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Me\DashboardController::__invoke
 * @see app/Http/Controllers/Api/Me/DashboardController.php:15
 * @route '/api/v1/me/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Me\DashboardController::__invoke
 * @see app/Http/Controllers/Api/Me/DashboardController.php:15
 * @route '/api/v1/me/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Me\DashboardController::__invoke
 * @see app/Http/Controllers/Api/Me/DashboardController.php:15
 * @route '/api/v1/me/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Me\DashboardController::__invoke
 * @see app/Http/Controllers/Api/Me/DashboardController.php:15
 * @route '/api/v1/me/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Me\DashboardController::__invoke
 * @see app/Http/Controllers/Api/Me/DashboardController.php:15
 * @route '/api/v1/me/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Me\DashboardController::__invoke
 * @see app/Http/Controllers/Api/Me/DashboardController.php:15
 * @route '/api/v1/me/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
const me = {
    show: Object.assign(show, show),
dashboard: Object.assign(dashboard, dashboard),
billings: Object.assign(billings, billings),
}

export default me