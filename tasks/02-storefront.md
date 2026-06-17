# Task 02: Web storefront (the biggest functional gap)

## Description

`apps/web` is ~10% of a storefront today: only auth UI (login/register/forgot, with no
route protection) + a home page. Build the customer-facing storefront on top of the
existing `@react-shop/sdk` (REST hooks already cover most endpoints) and
`@react-shop/design-system` components.

## Dependencies

- Task 00 (build must be green; DS must compile)

## Reference

> Source: existing modules and SDK in the current repo

- Pattern: `apps/web/app/modules/auth/` (screens + components + index barrels)
- Layout: `apps/web/app/modules/layout/` (HeaderWrapper, FooterWrapper)
- SDK hooks: `packages/sdk/src/services/` — `useProducts`, `useProduct`, `useCategories`,
  `useCart`, `useCartMutations`, `useOrders`, `useReviews`, `useLogin/useRegister/useLogout`, `useMe`
- DS components: `ProductCard`, `PriceDisplay`, `Rating`, `Header`, `Footer`, `SearchBar`, `CartIcon`, `Select`, `Modal`, `Toast`

## Sub-tasks

### 02.1 — Auth hardening (route protection + session)
- Add `apps/web/middleware.ts` to gate protected routes (account, checkout) and redirect.
- Auth context/provider sourcing the current user from `useMe`; wire real logout (`useLogout`).
- Keep home and product browsing public.

### 02.2 — Product listing + search + filters + categories
- Route: `apps/web/app/(main)/products/page.tsx` using `useProducts` + `useCategories`.
- Search bar (DS `SearchBar`), category filter, price/sort filters, pagination, empty/loading/error states.

### 02.3 — Product detail page (PDP)
- Route: `apps/web/app/(main)/products/[slug]/page.tsx` using `useProduct`.
- Image gallery, variant selection, `PriceDisplay`, `Rating` + reviews (`useReviews`), add-to-cart.

### 02.4 — Cart
- Route: `apps/web/app/(main)/cart/page.tsx` using `useCart` + `useCartMutations`.
- Line items, quantity update, remove, totals, proceed-to-checkout.

### 02.5 — Checkout
- Route: `apps/web/app/(main)/checkout/page.tsx` (multi-step: address → review → payment mock).
- Create order via the orders endpoint; show confirmation. Payment is a mock in this phase
  (real gateways are deferred to the backend phase).

### 02.6 — Account area
- Routes under `apps/web/app/(main)/account/`: profile, order history + tracking (`useOrders`),
  wishlist (SDK already supports it).

## Acceptance Criteria

- [ ] Unauthenticated users can browse products/PDP; checkout & account require auth (middleware)
- [ ] Product list supports search, category filter, sort, pagination + empty/loading/error states
- [ ] PDP renders variants, price, rating, reviews, and add-to-cart works
- [ ] Cart reads/writes via SDK; totals correct; quantity/remove work
- [ ] Checkout creates a real order against the backend + seed and shows confirmation
- [ ] Account shows profile + order history; logout clears session
- [ ] New code follows the existing `modules/<feature>/{screens,components}` + barrel pattern
- [ ] Uses design-system components (no ad-hoc duplicates); `pnpm lint`/typecheck green
