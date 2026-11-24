# Boarding House Manager

Boarding House Manager is a monorepo containing a Laravel web application and an Expo mobile application. The web app provides the admin interface and backend API for rooms, tenants and billing; the mobile app gives residents access to their own billing and profile data.

## Technology Stack

- **Web (`web/`):** PHP `^8.3`, Laravel `^13.17`, Inertia.js `^3.0`, Vue `^3.5`, TypeScript `^5.2`, Vite `^8.0`, and Vite Plus `0.3.0`. The web UI is Vue, not React.
- **Mobile (`mobile/`):** Expo `~58.0`, React Native `0.88`, React `19.3`, TypeScript `~6.0.3`, and NativeWind `^4.2.7`.
- **Web database default:** SQLite, as specified by `web/.env.example`. Docker overrides this with MySQL on the shared `database` network.

Versions above reflect the dependency declarations in each application's configuration.

## Repository Structure

```text
.
├── .editorconfig
├── .gitignore
├── README.md
├── mobile/                  # Expo / React Native resident application
│   ├── assets/
│   ├── src/
│   │   ├── app/             # Expo Router routes
│   │   ├── components/
│   │   ├── screens/
│   │   └── services/
│   ├── .env.example
│   ├── app.json
│   └── package.json
└── web/                     # Laravel admin panel and API
    ├── app/                 # Laravel application code
    ├── database/
    ├── docker/              # wait-for-db.sh
    ├── resources/           # Inertia/Vue UI and styles
    ├── routes/
    ├── tests/
    ├── .env.example
    ├── Dockerfile
    ├── docker-compose.yml
    ├── composer.json
    └── package.json
```

The root Git repository tracks both application directories directly; neither app is a submodule. Each application has its own dependency manifest, lockfile and application-specific configuration.

## Prerequisites

- **Web:** PHP 8.3 or later, Composer, Node.js and npm, and PHP's PDO SQLite support when using the example SQLite database configuration. Docker is optional but recommended.
- **Mobile:** Node.js and npm. Use an iOS simulator, Android emulator, a compatible device, or a browser with the web script.

## Installation and Setup

### Web

```sh
cd web
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
npm install
npm run build
```

The example environment selects SQLite for non-Docker development. For Docker, set `DB_DATABASE`, `DB_USERNAME` and `DB_PASSWORD` in `web/.env` instead — see below.

### Mobile

```sh
cd mobile
npm install
```

Copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_BASE_URL` to a reachable API base including `/api/v1`. If the variable is unset, the app falls back to the URL already compiled into `src/services/axios.ts`.

## Running the Applications

Run each app from its own directory.

### Web

The Composer `dev` script starts the configured Laravel development process:

```sh
cd web
composer run dev
```

For separate processes:

```sh
cd web
php artisan serve
```

In another terminal:

```sh
cd web
npm run dev
```

#### Docker

The web app can run in Docker against the shared MySQL container:

```sh
cd web
docker compose up -d --build
docker compose exec app php artisan migrate --force
```

The app is available at `http://localhost:8002` (host port 8002 maps to container port 8000; 8000 and 8001 are used by the other apps). It joins the external `database` network from `C:/Users/marco/docker/database/compose.yml`; the database container publishes no host port. Stop it with `docker compose down`.

Health endpoints: `/health` checks the database connection and `/api/health` returns a static JSON status.

### Mobile

```sh
cd mobile
npm run start
```

The package also defines `npm run android`, `npm run ios` and `npm run web`.

## Environment Configuration

The web app's `web/.env.example` is the template for its local `web/.env`. It includes SQLite development defaults; Docker requires the `DB_*` variables to be set. Keep `.env` files and credentials private — the root ignore rules exclude them while allowing `.env.example` files to be committed.

The mobile app reads `EXPO_PUBLIC_API_BASE_URL` from `mobile/.env`. Do not put credentials in the source.

## Testing and Build Commands

### Web

From `web/`:

- `php artisan test` runs the Laravel/Pest suite.
- `vendor/bin/pint --test` checks PHP formatting.
- `npm run check` runs the configured Vite Plus checks.
- `npm run types:check` runs `vue-tsc --noEmit`.
- `npm run build` creates the frontend production build.

Note: one existing API test asserts a billing `status` of `0` with a fixed due date in October 2026. Because the resource marks past-due bills as `2`, that assertion fails once the date passes. Update the fixture to a future date to fix it.

### Mobile

From `mobile/`:

- `npx tsc --noEmit` checks TypeScript types.
- `npm run lint` runs Expo ESLint.

## Git Workflow

The repository root contains both applications as regular tracked directories. Make changes to either `web/` or `mobile/` and review them together. Each application retains its own dependencies, lockfile, scripts and application-specific configuration; install and run those dependencies from that application's directory.
