# Services Directory

This directory contains API service implementations for the mobile application.

## API Service

The `apiService` provides a centralized interface for making HTTP requests to the backend API using Axios.

### Features

- **Authentication endpoints**: Login, register, logout, get current user
- **Dashboard endpoints**: Get tenant dashboard data
- **Billing endpoints**: Get current bills and billing history
- **Token management**: Store/retrieve auth tokens from AsyncStorage
- **Request/response interceptors**: Automatic token injection and error handling
- **Type safety**: Full TypeScript support with proper typing

### Usage

```typescript
import { apiService } from '@/services';

// Authentication
const user = await apiService.auth.getCurrentUser();
await apiService.auth.login(email, password);

// Dashboard
const dashboard = await apiService.dashboard.getDashboard();

// Billing
const currentBills = await apiService.billing.getCurrentBills();
const billingHistory = await apiService.billing.getBillingHistory();
```

### API Endpoints

All endpoints use the base URL `https://your-api-domain.com/api/v1` (update as needed):

- `POST /login` - Authenticate user
- `POST /register` - Register new tenant
- `POST /logout` - Logout current user
- `GET /me` - Get current user profile
- `GET /me/dashboard` - Get dashboard data
- `GET /me/billings` - Get billing data (current/history)

### Configuration

The API service automatically handles:

- Adding auth tokens to requests via AsyncStorage
- Error handling including 401 unauthorized responses
- Request/response interceptors for logging and transformations
- Proper content-type headers
- Request timeouts

### Notes

- Replace the `API_BASE_URL` with your actual API endpoint
- Ensure the backend API is properly secured with HTTPS in production
- The service uses Laravel Sanctum tokens for authentication (as per the Admin API documentation)