import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::store
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:17
 * @route '/api/v1/login'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::store
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:17
 * @route '/api/v1/login'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::store
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:17
 * @route '/api/v1/login'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::store
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:17
 * @route '/api/v1/login'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::store
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:17
 * @route '/api/v1/login'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::destroy
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:70
 * @route '/api/v1/logout'
 */
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: destroy.url(options),
    method: 'post',
})

destroy.definition = {
    methods: ["post"],
    url: '/api/v1/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::destroy
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:70
 * @route '/api/v1/logout'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::destroy
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:70
 * @route '/api/v1/logout'
 */
destroy.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: destroy.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::destroy
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:70
 * @route '/api/v1/logout'
 */
    const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::destroy
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:70
 * @route '/api/v1/logout'
 */
        destroyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(options),
            method: 'post',
        })
    
    destroy.form = destroyForm
const AuthenticationController = { store, destroy }

export default AuthenticationController