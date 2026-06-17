# Authentication

JWT-based authentication with access and refresh tokens.

## Overview

- **Strategy**: JWT (access token + refresh token)
- **Storage**: Memory (access token) + localStorage (refresh token)
- **Guards**: `JwtAuthGuard` on protected REST endpoints
- **Roles**: `CUSTOMER`, `ADMIN`, `SUPER_ADMIN`

## Flow

```
1. POST /api/auth/register  →  { user, accessToken, refreshToken }
2. POST /api/auth/login     →  { user, accessToken, refreshToken }
3. GET  /api/products       →  Authorization: Bearer <accessToken>
4. POST /api/auth/refresh   →  { accessToken }  (when access token expires)
5. POST /api/auth/logout    →  clears refresh token
```

## Using Auth in the Web App

```typescript
'use client';
import { useLogin, useRegister, useLogout, useMe } from '@react-shop/sdk';

// Check current user
const { data: user, isLoading } = useMe();

// Login
const login = useLogin();
await login.mutateAsync({ email, password });

// Register
const register = useRegister();
await register.mutateAsync({ email, password, firstName, lastName });

// Logout
const logout = useLogout();
await logout.mutateAsync();
```

## Route Protection (Middleware)

Protected routes (account, checkout) use Next.js middleware:

```typescript
// apps/web/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED = ['/account', '/checkout'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const isProtected = PROTECTED.some(p => request.nextUrl.pathname.startsWith(p));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/account/:path*', '/checkout/:path*'] };
```

## Backend Guards

```typescript
// Protect a controller or individual route
@UseGuards(JwtAuthGuard)
@Get('me')
getMe(@CurrentUser() user: User) {
  return user;
}

// Admin-only
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Delete(':id')
remove(@Param('id') id: string) {
  return this.productService.remove(id);
}
```

## Test Credentials (after seeding)

| Role     | Email                     | Password     |
|----------|---------------------------|--------------|
| Admin    | admin@ecommerce.com       | admin123     |
| Customer | customer@example.com      | customer123  |
