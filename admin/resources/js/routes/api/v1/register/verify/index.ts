import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::confirm
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:77
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
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:77
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
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:77
 * @route '/api/v1/register/verify/{token}'
 */
confirm.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirm.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::confirm
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:77
 * @route '/api/v1/register/verify/{token}'
 */
    const confirmForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: confirm.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::confirm
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:77
 * @route '/api/v1/register/verify/{token}'
 */
        confirmForm.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: confirm.url(args, options),
            method: 'post',
        })
    
    confirm.form = confirmForm
const verify = {
    confirm: Object.assign(confirm, confirm),
}

export default verify