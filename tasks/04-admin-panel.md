# Task 04: Admin Panel

## Description

Build a full admin panel under the `/admin` route group within `apps/web`. Admins can
manage products, categories, orders, reviews, and users from a dedicated sidebar layout.
Only users with `role === ADMIN` can access it; all others are redirected to `/`.

## Dependencies

- Task 00 (build green)
- Task 02 (storefront — SDK hooks + auth pattern)

## Reference

> Source: existing `apps/web/app/modules/` pattern + server controllers

- Pattern: `apps/web/app/modules/auth/` (screens + components + barrel)
- Layout: `apps/web/app/(main)/layout.tsx` (route-group layout pattern)
- SDK mutations: `packages/sdk/src/services/mutations/useProductMutations.ts`

## Sub-tasks

### 04.1 — Server additions
- `GET /api/reviews/` — list all reviews (admin), optional `?status=` filter
- `PUT /api/reviews/:id/moderate` — wire existing `reviewService.moderateReview()`
- `GET /api/users/` — list all users (wire existing `userService.findAll()`)

### 04.2 — SDK additions
- `useAllReviews(status?)` — query all reviews
- `useAllUsers()` — query all users

### 04.3 — Admin layout + role guard
- `apps/web/app/(admin)/layout.tsx` — client component; checks `user.role === ADMIN`,
  redirects non-admins to `/`. Renders sidebar + top bar.
- `apps/web/app/modules/admin/components/AdminSidebar.tsx` — links to all admin sections.

### 04.4 — Dashboard
- Route: `apps/web/app/(admin)/admin/page.tsx`
- Stats cards: total products, categories, orders (+ total revenue), pending reviews, users.

### 04.5 — Products management
- Route: `apps/web/app/(admin)/admin/products/page.tsx` — table + create/edit modal + delete.
- Uses `useProducts`, `useCreateProduct`, `useUpdateProduct`, `useDeleteProduct`.

### 04.6 — Categories management
- Route: `apps/web/app/(admin)/admin/categories/page.tsx` — table + inline create/edit.
- Uses `useCategories`, `useCreateCategory`, `useUpdateCategory`, `useDeleteCategory`.

### 04.7 — Orders management
- Route: `apps/web/app/(admin)/admin/orders/page.tsx` — table with status badge + update dropdown.
- Route: `apps/web/app/(admin)/admin/orders/[id]/page.tsx` — detail view + status control.
- Uses `useAllOrders`, `useOrder`, `useUpdateOrderStatus`, `useCancelOrder`.

### 04.8 — Review moderation
- Route: `apps/web/app/(admin)/admin/reviews/page.tsx` — queue of pending reviews;
  approve / reject with `useModerateReview`.

### 04.9 — Users list
- Route: `apps/web/app/(admin)/admin/users/page.tsx` — read-only table with role badge.
- Uses `useAllUsers`.

## Acceptance Criteria

- [x] Non-admin users are redirected from `/admin/**` to `/` (middleware + client layout guard)
- [x] Sidebar links to all sections; active route highlighted
- [x] Products: create, edit, delete work end-to-end via modal
- [x] Categories: create, edit, delete work end-to-end via modal
- [x] Orders: list all + inline status dropdown + order detail page with cancel
- [x] Reviews: filter tabs (All / Pending / Approved / Rejected); approve and reject per row
- [x] Users: table with name, email, role badge, verified status, join date
- [x] Dashboard stats (revenue, orders, products, categories, pending reviews, users)
- [x] `pnpm lint` / typecheck green
