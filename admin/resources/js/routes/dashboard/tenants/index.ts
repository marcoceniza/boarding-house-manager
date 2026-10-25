import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:18
 * @route '/dashboard/tenants'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/tenants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:18
 * @route '/dashboard/tenants'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:18
 * @route '/dashboard/tenants'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:18
 * @route '/dashboard/tenants'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:18
 * @route '/dashboard/tenants'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:18
 * @route '/dashboard/tenants'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:18
 * @route '/dashboard/tenants'
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
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:36
 * @route '/dashboard/tenants'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/tenants',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:36
 * @route '/dashboard/tenants'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:36
 * @route '/dashboard/tenants'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:36
 * @route '/dashboard/tenants'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:36
 * @route '/dashboard/tenants'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:67
 * @route '/dashboard/tenants/{tenant}'
 */
export const update = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/tenants/{tenant}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:67
 * @route '/dashboard/tenants/{tenant}'
 */
update.url = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tenant: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tenant: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: typeof args.tenant === 'object'
                ? args.tenant.id
                : args.tenant,
                }

    return update.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:67
 * @route '/dashboard/tenants/{tenant}'
 */
update.put = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:67
 * @route '/dashboard/tenants/{tenant}'
 */
update.patch = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:67
 * @route '/dashboard/tenants/{tenant}'
 */
    const updateForm = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:67
 * @route '/dashboard/tenants/{tenant}'
 */
        updateForm.put = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:67
 * @route '/dashboard/tenants/{tenant}'
 */
        updateForm.patch = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:110
 * @route '/dashboard/tenants/{tenant}'
 */
export const destroy = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/tenants/{tenant}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:110
 * @route '/dashboard/tenants/{tenant}'
 */
destroy.url = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tenant: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tenant: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: typeof args.tenant === 'object'
                ? args.tenant.id
                : args.tenant,
                }

    return destroy.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:110
 * @route '/dashboard/tenants/{tenant}'
 */
destroy.delete = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:110
 * @route '/dashboard/tenants/{tenant}'
 */
    const destroyForm = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:110
 * @route '/dashboard/tenants/{tenant}'
 */
        destroyForm.delete = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Admin\TenantController::endTenancy
 * @see app/Http/Controllers/Admin/TenantController.php:131
 * @route '/dashboard/tenants/{tenant}/end-tenancy'
 */
export const endTenancy = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: endTenancy.url(args, options),
    method: 'post',
})

endTenancy.definition = {
    methods: ["post"],
    url: '/dashboard/tenants/{tenant}/end-tenancy',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::endTenancy
 * @see app/Http/Controllers/Admin/TenantController.php:131
 * @route '/dashboard/tenants/{tenant}/end-tenancy'
 */
endTenancy.url = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tenant: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tenant: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: typeof args.tenant === 'object'
                ? args.tenant.id
                : args.tenant,
                }

    return endTenancy.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::endTenancy
 * @see app/Http/Controllers/Admin/TenantController.php:131
 * @route '/dashboard/tenants/{tenant}/end-tenancy'
 */
endTenancy.post = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: endTenancy.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::endTenancy
 * @see app/Http/Controllers/Admin/TenantController.php:131
 * @route '/dashboard/tenants/{tenant}/end-tenancy'
 */
    const endTenancyForm = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: endTenancy.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::endTenancy
 * @see app/Http/Controllers/Admin/TenantController.php:131
 * @route '/dashboard/tenants/{tenant}/end-tenancy'
 */
        endTenancyForm.post = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: endTenancy.url(args, options),
            method: 'post',
        })
    
    endTenancy.form = endTenancyForm
const tenants = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
endTenancy: Object.assign(endTenancy, endTenancy),
}

export default tenants