# Next.js Boilerplate (BE + FE) — TypeScript + Tailwind CSS v4

Monorepo sederhana (npm workspaces) berisi:
- `apps/be` → Next.js (App Router) sebagai **Backend API** (Route Handlers)
- `apps/fe` → Next.js (App Router) sebagai **Frontend**
- `packages/shared` → schema & type bersama (Zod)

## Prasyarat
- Node.js terbaru (LTS juga oke)
- pnpm (disarankan)

## Quick start
```bash
npm install
npm run dev
```

Default ports:
- FE: http://localhost:3000
- BE: http://localhost:3001

## Environment
Copy contoh env:
```bash
cp apps/be/.env.example apps/be/.env
cp apps/fe/.env.example apps/fe/.env
```

FE akan memanggil BE via `NEXT_PUBLIC_API_BASE_URL` (default: `http://localhost:3001`).

## Endpoint contoh (BE)
- `GET /api/health`
- `POST /api/v1/echo` (validasi Zod)
- `GET /api/v1/users` (dummy in-memory)

## Catatan konvensi
- App Router + Route Handlers untuk API (web-standard Request/Response).
- Response JSON distandarkan (`{ ok, data, error, meta }`).
- Validasi input pakai Zod (di `packages/shared`).
- Tailwind v4 setup mengikuti framework guide resmi Tailwind.



## Multi-domain (Buyer/Seller/Admin) di Vercel

FE (`apps/fe`) sudah diset untuk 1 project Vercel dengan 3 domain:
- Buyer: `accarena.store`
- Seller: `seller.accarena.store`
- Admin: `admin.accarena.store`

Routing dibedakan berdasarkan `Host` header lewat `apps/fe/src/middleware.ts` dan di-*rewrite* ke:
- `/_sites/buyer/*`
- `/_sites/seller/*`
- `/_sites/admin/*`

Struktur halaman:
- `apps/fe/src/app/_sites/buyer`
- `apps/fe/src/app/_sites/seller`
- `apps/fe/src/app/_sites/admin`

### Setup domain di Vercel
1. Deploy `apps/fe` ke 1 Vercel Project.
2. Tambahkan domain: `accarena.store`, `seller.accarena.store`, `admin.accarena.store`.
3. Ikuti instruksi DNS dari Vercel (umumnya apex pakai A record, subdomain pakai CNAME).

### Dev lokal (opsional)
Kalau mau ngetes subdomain secara lokal:
- Tambahkan ke hosts file:
  - `127.0.0.1 seller.localhost`
  - `127.0.0.1 admin.localhost`
- Jalankan FE: `npm run dev`
- Buka:
  - http://seller.localhost:3000
  - http://admin.localhost:3000
  - http://localhost:3000 (buyer)
