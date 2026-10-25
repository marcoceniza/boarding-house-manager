import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Me\BillingController::index
 * @see app/Http/Controllers/Api/Me/BillingController.php:15
 * @route '/api/v1/me/billings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/me/billings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Me\BillingController::index
 * @see app/Http/Controllers/Api/Me/BillingController.php:15
 * @route '/api/v1/me/billings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Me\BillingController::index
 * @see app/Http/Controllers/Api/Me/BillingController.php:15
 * @route '/api/v1/me/billings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Me\BillingController::index
 * @see app/Http/Controllers/Api/Me/BillingController.php:15
 * @route '/api/v1/me/billings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Me\BillingController::index
 * @see app/Http/Controllers/Api/Me/BillingController.php:15
 * @route '/api/v1/me/billings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Me\BillingController::index
 * @see app/Http/Controllers/Api/Me/BillingController.php:15
 * @route '/api/v1/me/billings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Me\BillingController::index
 * @see app/Http/Controllers/Api/Me/BillingController.php:15
 * @route '/api/v1/me/billings'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const BillingController = { index }

export default BillingController