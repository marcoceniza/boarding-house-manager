import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import register702019 from './register'
import me from './me'
/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::register
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:22
 * @route '/api/v1/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/api/v1/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::register
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:22
 * @route '/api/v1/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::register
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:22
 * @route '/api/v1/register'
 */
register.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::register
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:22
 * @route '/api/v1/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: register.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Auth\TenantRegistrationController::register
 * @see app/Http/Controllers/Api/Auth/TenantRegistrationController.php:22
 * @route '/api/v1/register'
 */
        registerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: register.url(options),
            method: 'post',
        })
    
    register.form = registerForm
/**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::login
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:17
 * @route '/api/v1/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/api/v1/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::login
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:17
 * @route '/api/v1/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::login
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:17
 * @route '/api/v1/login'
 */
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::login
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:17
 * @route '/api/v1/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: login.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::login
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:17
 * @route '/api/v1/login'
 */
        loginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: login.url(options),
            method: 'post',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::logout
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:70
 * @route '/api/v1/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/api/v1/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::logout
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:70
 * @route '/api/v1/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::logout
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:70
 * @route '/api/v1/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::logout
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:70
 * @route '/api/v1/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Auth\AuthenticationController::logout
 * @see app/Http/Controllers/Api/Auth/AuthenticationController.php:70
 * @route '/api/v1/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
const v1 = {
    register: Object.assign(register, register702019),
login: Object.assign(login, login),
logout: Object.assign(logout, logout),
me: Object.assign(me, me),
}

export default v1