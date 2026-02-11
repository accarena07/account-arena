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
