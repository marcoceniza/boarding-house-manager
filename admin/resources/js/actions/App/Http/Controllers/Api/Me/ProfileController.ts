import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
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
* @see \App\Http\Controllers\Api\Me\ProfileController::update
 * @see app/Http/Controllers/Api/Me/ProfileController.php:28
 * @route '/api/v1/me'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/api/v1/me',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\Me\ProfileController::update
 * @see app/Http/Controllers/Api/Me/ProfileController.php:28
 * @route '/api/v1/me'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\Me\ProfileController::update
 * @see app/Http/Controllers/Api/Me/ProfileController.php:28
 * @route '/api/v1/me'
 */
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\Me\ProfileController::update
 * @see app/Http/Controllers/Api/Me/ProfileController.php:28
 * @route '/api/v1/me'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\Me\ProfileController::update
 * @see app/Http/Controllers/Api/Me/ProfileController.php:28
 * @route '/api/v1/me'
 */
        updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const ProfileController = { show, update }

export default ProfileController