# Boarding House Manager

Boarding House Manager is a monorepo containing a Laravel web application and an Expo mobile
application. The admin app provides the web interface and backend; the mobile app provides a
resident-facing interface that communicates with the backend API.

## Technology Stack

- **Admin (`admin/`):** PHP `^8.3`, Laravel `^13.17`, Inertia.js `^3.0`, Vue `^3.5`, TypeScript
  `^5.2`, Vite `^8.0`, and Vite Plus `0.3.0`. The web UI is Vue, not React.
- **Mobile (`mobile/`):** Expo `~58.0`, React Native `0.88.0`, React `19.3.0`, TypeScript
  `~6.0.3`, and NativeWind `^4.2.7`.
- **Admin database default:** SQLite, as specified by `admin/.env.example`.

Versions above reflect the dependency declarations in each application's configuration.

## Repository Structure

```text
.
├── .editorconfig
├── .gitignore
├── README.md
├── admin/
│   ├── app/                 # Laravel application code
│   ├── resources/           # Inertia/Vue UI and styles
│   ├── routes/
│   ├── tests/
│   ├── .env.example
│   ├── composer.json
│   └── package.json
└── mobile/
    ├── assets/
    ├── src/
    │   ├── app/             # Expo Router routes
    │   ├── components/
    │   ├── screens/
    │   └── services/
    ├── app.json
    ├── package.json
    └── tsconfig.json
```

Each application has its own dependency manifests, lockfile, and application-specific
configuration.

## Prerequisites

- **Admin:** PHP 8.3 or later, Composer, Node.js and npm, and PHP's PDO SQLite support when using
  the example SQLite database configuration.
- **Mobile:** Node.js and npm. Use an iOS simulator, Android emulator, or compatible device to run
  the native app; a browser can be used with the web script.

The project does not pin Node.js or npm versions.

## Installation and Setup

### Admin

```sh
cd admin
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
npm ci
```

The example environment selects SQLite, and the database directory ignores generated SQLite files.
Review `.env` and configure the database or other services if your setup differs from the example.

### Mobile

```sh
cd mobile
npm ci
```

There is no mobile `.env.example` in the repository. The API client currently has a hard-coded
base address in `src/services/axios.ts`; configure it for the backend and device environment before
using the app against a local or remote server. Adding environment-based mobile configuration is a
TODO.

## Running the Applications

Run each app from its own directory.

### Admin

The Composer `dev` script starts the configured Laravel development process:

```sh
cd admin
composer run dev
```

For separate processes, use Laravel's development server and the package's Vite script:

```sh
cd admin
php artisan serve
```

In another terminal:

```sh
cd admin
npm run dev
```

### Mobile

```sh
cd mobile
npm run start
```

The package also defines `npm run android`, `npm run ios`, and `npm run web` for launching Expo on
those targets.

## Environment Configuration

The admin app's `admin/.env.example` is the template for its local `admin/.env`. It includes
development defaults, including SQLite; review it and replace or adjust values for your environment.
Keep `.env` files and credentials private. The root ignore rules exclude environment files while
allowing `.env.example` files to be committed.

The mobile app currently has no environment example or declared environment-variable configuration.
Its API base address is in `mobile/src/services/axios.ts`; do not put credentials in the source.

## Testing and Build Commands

### Admin

From `admin/`:

- `composer run test` runs the configured PHP formatting check, PHPStan analysis, and Laravel tests.
- `composer run ci:check` runs the frontend checks and type check, then the Composer test script.
- `npm run check` runs the configured Vite Plus checks.
- `npm run types:check` runs `vue-tsc --noEmit`.
- `npm run build` creates the frontend production build.

### Mobile

From `mobile/`, `npm run lint` runs Expo ESLint. No test, type-check, or build script is defined in
the mobile package configuration.

## Git Workflow

The repository root is intended to contain both applications. Make changes to either `admin/` or
`mobile/` within the same Git repository and review them together as needed. Each application
retains its own dependencies, lockfile, scripts, and application-specific configuration; install
and run those dependencies from that application's directory.
