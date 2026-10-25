import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
import verify8ef1b2 from './verify'
/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::verify
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:70
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
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:70
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
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:70
 * @route '/api/v1/register/verify/{token}'
 */
verify.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::verify
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:70
 * @route '/api/v1/register/verify/{token}'
 */
verify.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verify.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::verify
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:70
 * @route '/api/v1/register/verify/{token}'
 */
    const verifyForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: verify.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::verify
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:70
 * @route '/api/v1/register/verify/{token}'
 */
        verifyForm.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::verify
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:70
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
const register = {
    verify: Object.assign(verify, verify8ef1b2),
}

export default register