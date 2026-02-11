# Auth API Contract (v1)

Base URL: `http://localhost:3001`

Envelope format (all endpoints):
- success: `{ ok: true, data: ..., meta: { requestId } }`
- error: `{ ok: false, error: { code, message, details? }, meta: { requestId } }`

## `POST /api/v1/auth/signup`

Request body:
```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "fullName": "John Doe",
  "phone": "08123456789"
}
```

## `POST /api/v1/auth/register/otp/request`

Request body:
```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "fullName": "John Doe",
  "phone": "08123456789"
}
```

Success `data`:
```json
{
  "sent": true,
  "expiresInSec": 600,
  "debugOtp": "123456"
}
```

`debugOtp` hanya tampil saat non-production untuk test lokal.

## `POST /api/v1/auth/register/otp/verify`

Request body:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

Success `data`:
```json
{
  "user": { "id": "uuid", "email": "user@example.com" },
  "roles": ["buyer"],
  "session": {
    "accessToken": "...",
    "refreshToken": "...",
    "expiresAt": 1730000000
  }
}
```

## `POST /api/v1/auth/register/otp/resend`

Request body:
```json
{
  "email": "user@example.com"
}
```

Success `data`:
```json
{
  "sent": true,
  "expiresInSec": 600,
  "debugOtp": "654321"
}
```

Success `data`:
```json
{
  "user": { "id": "uuid", "email": "user@example.com" },
  "roles": ["buyer"],
  "session": {
    "accessToken": "...",
    "refreshToken": "...",
    "expiresAt": 1730000000
  },
  "emailConfirmationRequired": false
}
```

## `POST /api/v1/auth/login`

Request body:
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

Success `data`:
```json
{
  "user": { "id": "uuid", "email": "user@example.com" },
  "roles": ["buyer", "seller"],
  "session": {
    "accessToken": "...",
    "refreshToken": "...",
    "expiresAt": 1730000000
  }
}
```

## `GET /api/v1/auth/me`

Header:
`Authorization: Bearer <accessToken>`

Success `data`:
```json
{
  "user": { "id": "uuid", "email": "user@example.com" },
  "profile": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "phone": "08123456789",
    "avatar_url": null,
    "status": "active",
    "created_at": "2026-02-11T00:00:00Z",
    "updated_at": "2026-02-11T00:00:00Z"
  },
  "roles": ["buyer", "seller"],
  "sellerAccess": {
    "hasSellerRole": true,
    "kycStatus": "approved",
    "canSell": true
  }
}
```

## `POST /api/v1/auth/logout`

Success `data`:
```json
{
  "loggedOut": true,
  "message": "Logout endpoint success. Remove client tokens on frontend."
}
```

## `POST /api/v1/auth/password/otp/request`

Request body:
```json
{
  "identifier": "user@example.com",
  "method": "email"
}
```

`method`: `email` | `whatsapp` (optional, auto-detected if omitted)

Success `data`:
```json
{
  "sent": true,
  "method": "email",
  "expiresInSec": 600,
  "debugOtp": "123456"
}
```

`debugOtp` hanya ada di non-production (sementara untuk development).

## `POST /api/v1/auth/password/otp/verify`

Request body:
```json
{
  "identifier": "user@example.com",
  "otp": "123456"
}
```

Success `data`:
```json
{
  "verified": true,
  "resetToken": "uuid-token",
  "expiresInSec": 900
}
```

## `POST /api/v1/auth/password/reset`

Request body:
```json
{
  "identifier": "user@example.com",
  "resetToken": "uuid-token",
  "newPassword": "Password123!"
}
```

Success `data`:
```json
{
  "passwordUpdated": true
}
```
