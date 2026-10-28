import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::store
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:22
 * @route '/api/v1/register'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::store
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:22
 * @route '/api/v1/register'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::store
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:22
 * @route '/api/v1/register'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::store
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:22
 * @route '/api/v1/register'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::store
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:22
 * @route '/api/v1/register'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::verify
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:75
 * @route '/api/v1/register/verify/{token}'
 */
export const verify = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(args, options),
    method: 'get',
})

verify.definition = {
    methods: ["get","head"],
    url: '/api/v1/register/verify/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::verify
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:75
 * @route '/api/v1/register/verify/{token}'
 */
verify.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return verify.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::verify
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:75
 * @route '/api/v1/register/verify/{token}'
 */
verify.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::verify
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:75
 * @route '/api/v1/register/verify/{token}'
 */
verify.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verify.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::verify
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:75
 * @route '/api/v1/register/verify/{token}'
 */
    const verifyForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: verify.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::verify
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:75
 * @route '/api/v1/register/verify/{token}'
 */
        verifyForm.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::verify
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:75
 * @route '/api/v1/register/verify/{token}'
 */
        verifyForm.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    verify.form = verifyForm
/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::confirm
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:82
 * @route '/api/v1/register/verify/{token}'
 */
export const confirm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirm.url(args, options),
    method: 'post',
})

confirm.definition = {
    methods: ["post"],
    url: '/api/v1/register/verify/{token}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::confirm
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:82
 * @route '/api/v1/register/verify/{token}'
 */
confirm.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return confirm.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::confirm
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:82
 * @route '/api/v1/register/verify/{token}'
 */
confirm.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirm.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::confirm
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:82
 * @route '/api/v1/register/verify/{token}'
 */
    const confirmForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: confirm.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::confirm
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:82
 * @route '/api/v1/register/verify/{token}'
 */
        confirmForm.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: confirm.url(args, options),
            method: 'post',
        })
    
    confirm.form = confirmForm
const TenantRegistrationController = { store, verify, confirm }

export default TenantRegistrationController