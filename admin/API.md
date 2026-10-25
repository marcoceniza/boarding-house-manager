# Tenant mobile API

The tenant-facing API is versioned under `/api/v1`. It uses Laravel Sanctum personal access tokens and returns JSON. It is separate from the Inertia admin routes.

## Tenant enrollment

`POST /api/v1/register` accepts `email`, `password`, and `password_confirmation`. The email must match an active tenant record. To avoid account enumeration, the endpoint returns the same `202` response whether or not enrollment can proceed. When enrollment is eligible, the API emails a signed, one-hour verification link to the address already on the tenant record. `GET /api/v1/register/verify/{token}` only shows a confirmation page; account creation requires an explicit `POST` to that same signed URL. This prevents email link scanners from consuming the registration link and creating an account automatically.

Registration does not accept a tenant ID or tenant name. Existing verified users can be associated during login only when their verified account email matches an unlinked active tenant record.

## Authentication

- `POST /api/v1/login` accepts `email` and `password`. On success, it returns `data.token`, `data.token_type` (`Bearer`), and a minimal user/tenant identity. Tokens expire after 30 days. Login is rejected until email verification is complete.
- Send the token in the `Authorization` header using the `Bearer YOUR_TOKEN` format for authenticated requests.
- `POST /api/v1/logout` revokes the current personal access token.
- `GET /api/v1/me` returns the authenticated tenant profile and room.

## Dashboard and bills

- `GET /api/v1/me/dashboard` returns the authenticated tenant, `summary.amount_due`, `summary.outstanding_count`, and up to five latest unpaid/overdue bills.
- `GET /api/v1/me/billings?view=current|history&page=1&per_page=10` returns paginated billing records for only the authenticated tenant. `current` returns unpaid/overdue bills; `history` returns all billing records. `per_page` is limited to 50.
- Billing status is returned as `0` unpaid, `1` paid, or `2` overdue. An unpaid bill past its due date is presented as overdue without modifying its stored status.

All monetary fields use the existing billing records and are returned as decimal values. This API does not implement bill payment or profile mutation.

## Setup

Run `php artisan migrate` from the `admin/` directory after deploying these changes. Configure a working mail transport to deliver registration verification links. Local development can use Laravel's configured log mailer to inspect the generated link. Protect the API with HTTPS in deployed environments.
