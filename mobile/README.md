# Haven House Tenant Portal

An Expo / React Native tenant portal for reviewing room details, billing statements, payment history,
and resident profile information.

## Run

```bash
npm install
npx expo start
```

## Demo account

- Email: `tenant@havenhouse.ph`
- Password: `password123`

Authentication, registration, and tenant/bill state are simulated locally. Session information is
stored on-device with AsyncStorage; no remote account or payment service is connected.

## App structure

- `src/app/` contains Expo Router route entry points.
- `src/screens/auth/` contains the sign-in and registration screens.
- `src/screens/tabs/` contains the Home, History, and Profile screens.
- `src/components/` contains reusable billing components.
- `src/components/ui/` contains shared interface components, each in its own folder with a local `index.ts` export.
- `src/data/` contains demo credentials and mock tenant, room, and bill records.
- `src/types/` contains shared tenant, room, bill, session, and reusable callback types.
- `src/utils/` contains shared formatting and billing-status helpers.

## Styling

The app uses NativeWind v4 utility classes for cross-platform styling. Tailwind classes are configured
in `tailwind.config.js`, and `global.css` is processed by Metro for web, iOS, and Android.
