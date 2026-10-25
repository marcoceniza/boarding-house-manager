import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\BillingController::index
 * @see app/Http/Controllers/Admin/BillingController.php:21
 * @route '/dashboard/billings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/billings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BillingController::index
 * @see app/Http/Controllers/Admin/BillingController.php:21
 * @route '/dashboard/billings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BillingController::index
 * @see app/Http/Controllers/Admin/BillingController.php:21
 * @route '/dashboard/billings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BillingController::index
 * @see app/Http/Controllers/Admin/BillingController.php:21
 * @route '/dashboard/billings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BillingController::index
 * @see app/Http/Controllers/Admin/BillingController.php:21
 * @route '/dashboard/billings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BillingController::index
 * @see app/Http/Controllers/Admin/BillingController.php:21
 * @route '/dashboard/billings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BillingController::index
 * @see app/Http/Controllers/Admin/BillingController.php:21
 * @route '/dashboard/billings'
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
* @see \App\Http\Controllers\Admin\BillingController::store
 * @see app/Http/Controllers/Admin/BillingController.php:65
 * @route '/dashboard/billings'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/billings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\BillingController::store
 * @see app/Http/Controllers/Admin/BillingController.php:65
 * @route '/dashboard/billings'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BillingController::store
 * @see app/Http/Controllers/Admin/BillingController.php:65
 * @route '/dashboard/billings'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\BillingController::store
 * @see app/Http/Controllers/Admin/BillingController.php:65
 * @route '/dashboard/billings'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BillingController::store
 * @see app/Http/Controllers/Admin/BillingController.php:65
 * @route '/dashboard/billings'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\BillingController::update
 * @see app/Http/Controllers/Admin/BillingController.php:78
 * @route '/dashboard/billings/{billing}'
 */
export const update = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/billings/{billing}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\BillingController::update
 * @see app/Http/Controllers/Admin/BillingController.php:78
 * @route '/dashboard/billings/{billing}'
 */
update.url = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { billing: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { billing: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    billing: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        billing: typeof args.billing === 'object'
                ? args.billing.id
                : args.billing,
                }

    return update.definition.url
            .replace('{billing}', parsedArgs.billing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BillingController::update
 * @see app/Http/Controllers/Admin/BillingController.php:78
 * @route '/dashboard/billings/{billing}'
 */
update.put = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\BillingController::update
 * @see app/Http/Controllers/Admin/BillingController.php:78
 * @route '/dashboard/billings/{billing}'
 */
update.patch = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\BillingController::update
 * @see app/Http/Controllers/Admin/BillingController.php:78
 * @route '/dashboard/billings/{billing}'
 */
    const updateForm = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BillingController::update
 * @see app/Http/Controllers/Admin/BillingController.php:78
 * @route '/dashboard/billings/{billing}'
 */
        updateForm.put = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\BillingController::update
 * @see app/Http/Controllers/Admin/BillingController.php:78
 * @route '/dashboard/billings/{billing}'
 */
        updateForm.patch = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\BillingController::destroy
 * @see app/Http/Controllers/Admin/BillingController.php:116
 * @route '/dashboard/billings/{billing}'
 */
export const destroy = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/billings/{billing}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\BillingController::destroy
 * @see app/Http/Controllers/Admin/BillingController.php:116
 * @route '/dashboard/billings/{billing}'
 */
destroy.url = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { billing: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { billing: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    billing: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        billing: typeof args.billing === 'object'
                ? args.billing.id
                : args.billing,
                }

    return destroy.definition.url
            .replace('{billing}', parsedArgs.billing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BillingController::destroy
 * @see app/Http/Controllers/Admin/BillingController.php:116
 * @route '/dashboard/billings/{billing}'
 */
destroy.delete = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\BillingController::destroy
 * @see app/Http/Controllers/Admin/BillingController.php:116
 * @route '/dashboard/billings/{billing}'
 */
    const destroyForm = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BillingController::destroy
 * @see app/Http/Controllers/Admin/BillingController.php:116
 * @route '/dashboard/billings/{billing}'
 */
        destroyForm.delete = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\BillingController::markPaid
 * @see app/Http/Controllers/Admin/BillingController.php:88
 * @route '/dashboard/billings/{billing}/mark-paid'
 */
export const markPaid = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markPaid.url(args, options),
    method: 'post',
})

markPaid.definition = {
    methods: ["post"],
    url: '/dashboard/billings/{billing}/mark-paid',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\BillingController::markPaid
 * @see app/Http/Controllers/Admin/BillingController.php:88
 * @route '/dashboard/billings/{billing}/mark-paid'
 */
markPaid.url = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { billing: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { billing: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    billing: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        billing: typeof args.billing === 'object'
                ? args.billing.id
                : args.billing,
                }

    return markPaid.definition.url
            .replace('{billing}', parsedArgs.billing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BillingController::markPaid
 * @see app/Http/Controllers/Admin/BillingController.php:88
 * @route '/dashboard/billings/{billing}/mark-paid'
 */
markPaid.post = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markPaid.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\BillingController::markPaid
 * @see app/Http/Controllers/Admin/BillingController.php:88
 * @route '/dashboard/billings/{billing}/mark-paid'
 */
    const markPaidForm = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markPaid.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BillingController::markPaid
 * @see app/Http/Controllers/Admin/BillingController.php:88
 * @route '/dashboard/billings/{billing}/mark-paid'
 */
        markPaidForm.post = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markPaid.url(args, options),
            method: 'post',
        })
    
    markPaid.form = markPaidForm
/**
* @see \App\Http\Controllers\Admin\BillingController::sendInvoice
 * @see app/Http/Controllers/Admin/BillingController.php:124
 * @route '/dashboard/billings/{billing}/send-invoice'
 */
export const sendInvoice = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendInvoice.url(args, options),
    method: 'post',
})

sendInvoice.definition = {
    methods: ["post"],
    url: '/dashboard/billings/{billing}/send-invoice',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\BillingController::sendInvoice
 * @see app/Http/Controllers/Admin/BillingController.php:124
 * @route '/dashboard/billings/{billing}/send-invoice'
 */
sendInvoice.url = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { billing: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { billing: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    billing: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        billing: typeof args.billing === 'object'
                ? args.billing.id
                : args.billing,
                }

    return sendInvoice.definition.url
            .replace('{billing}', parsedArgs.billing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BillingController::sendInvoice
 * @see app/Http/Controllers/Admin/BillingController.php:124
 * @route '/dashboard/billings/{billing}/send-invoice'
 */
sendInvoice.post = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendInvoice.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\BillingController::sendInvoice
 * @see app/Http/Controllers/Admin/BillingController.php:124
 * @route '/dashboard/billings/{billing}/send-invoice'
 */
    const sendInvoiceForm = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sendInvoice.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BillingController::sendInvoice
 * @see app/Http/Controllers/Admin/BillingController.php:124
 * @route '/dashboard/billings/{billing}/send-invoice'
 */
        sendInvoiceForm.post = (args: { billing: number | { id: number } } | [billing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sendInvoice.url(args, options),
            method: 'post',
        })
    
    sendInvoice.form = sendInvoiceForm
const billings = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
markPaid: Object.assign(markPaid, markPaid),
sendInvoice: Object.assign(sendInvoice, sendInvoice),
}

export default billings