import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\RoomController::index
 * @see app/Http/Controllers/Admin/RoomController.php:17
 * @route '/dashboard/rooms'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/rooms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\RoomController::index
 * @see app/Http/Controllers/Admin/RoomController.php:17
 * @route '/dashboard/rooms'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\RoomController::index
 * @see app/Http/Controllers/Admin/RoomController.php:17
 * @route '/dashboard/rooms'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\RoomController::index
 * @see app/Http/Controllers/Admin/RoomController.php:17
 * @route '/dashboard/rooms'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\RoomController::index
 * @see app/Http/Controllers/Admin/RoomController.php:17
 * @route '/dashboard/rooms'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\RoomController::index
 * @see app/Http/Controllers/Admin/RoomController.php:17
 * @route '/dashboard/rooms'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\RoomController::index
 * @see app/Http/Controllers/Admin/RoomController.php:17
 * @route '/dashboard/rooms'
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
/**
* @see \App\Http\Controllers\Admin\RoomController::store
 * @see app/Http/Controllers/Admin/RoomController.php:30
 * @route '/dashboard/rooms'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/rooms',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\RoomController::store
 * @see app/Http/Controllers/Admin/RoomController.php:30
 * @route '/dashboard/rooms'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\RoomController::store
 * @see app/Http/Controllers/Admin/RoomController.php:30
 * @route '/dashboard/rooms'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\RoomController::store
 * @see app/Http/Controllers/Admin/RoomController.php:30
 * @route '/dashboard/rooms'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\RoomController::store
 * @see app/Http/Controllers/Admin/RoomController.php:30
 * @route '/dashboard/rooms'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\RoomController::update
 * @see app/Http/Controllers/Admin/RoomController.php:42
 * @route '/dashboard/rooms/{room}'
 */
export const update = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/rooms/{room}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\RoomController::update
 * @see app/Http/Controllers/Admin/RoomController.php:42
 * @route '/dashboard/rooms/{room}'
 */
update.url = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { room: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { room: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    room: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        room: typeof args.room === 'object'
                ? args.room.id
                : args.room,
                }

    return update.definition.url
            .replace('{room}', parsedArgs.room.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\RoomController::update
 * @see app/Http/Controllers/Admin/RoomController.php:42
 * @route '/dashboard/rooms/{room}'
 */
update.put = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\RoomController::update
 * @see app/Http/Controllers/Admin/RoomController.php:42
 * @route '/dashboard/rooms/{room}'
 */
update.patch = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\RoomController::update
 * @see app/Http/Controllers/Admin/RoomController.php:42
 * @route '/dashboard/rooms/{room}'
 */
    const updateForm = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\RoomController::update
 * @see app/Http/Controllers/Admin/RoomController.php:42
 * @route '/dashboard/rooms/{room}'
 */
        updateForm.put = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\RoomController::update
 * @see app/Http/Controllers/Admin/RoomController.php:42
 * @route '/dashboard/rooms/{room}'
 */
        updateForm.patch = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\RoomController::destroy
 * @see app/Http/Controllers/Admin/RoomController.php:73
 * @route '/dashboard/rooms/{room}'
 */
export const destroy = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/rooms/{room}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\RoomController::destroy
 * @see app/Http/Controllers/Admin/RoomController.php:73
 * @route '/dashboard/rooms/{room}'
 */
destroy.url = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { room: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { room: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    room: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        room: typeof args.room === 'object'
                ? args.room.id
                : args.room,
                }

    return destroy.definition.url
            .replace('{room}', parsedArgs.room.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\RoomController::destroy
 * @see app/Http/Controllers/Admin/RoomController.php:73
 * @route '/dashboard/rooms/{room}'
 */
destroy.delete = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\RoomController::destroy
 * @see app/Http/Controllers/Admin/RoomController.php:73
 * @route '/dashboard/rooms/{room}'
 */
    const destroyForm = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\RoomController::destroy
 * @see app/Http/Controllers/Admin/RoomController.php:73
 * @route '/dashboard/rooms/{room}'
 */
        destroyForm.delete = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const rooms = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default rooms