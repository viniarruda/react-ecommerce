/**
 * API Route Constants
 * Centralized route definitions for all API endpoints
 */

const API_PREFIX = "/api";

export const AUTH_ROUTES = {
  login: `${API_PREFIX}/auth/login`,
  register: `${API_PREFIX}/auth/register`,
  logout: `${API_PREFIX}/auth/logout`,
  me: `${API_PREFIX}/users/me`,
} as const;

export const PRODUCT_ROUTES = {
  list: `${API_PREFIX}/products`,
  detail: (id: string) => `${API_PREFIX}/products/${id}`,
} as const;

export const CATEGORY_ROUTES = {
  list: `${API_PREFIX}/categories`,
  detail: (id: string) => `${API_PREFIX}/categories/${id}`,
} as const;

export const CART_ROUTES = {
  base: `${API_PREFIX}/cart`,
  items: `${API_PREFIX}/cart/items`,
  item: (itemId: string) => `${API_PREFIX}/cart/items/${itemId}`,
  clear: `${API_PREFIX}/cart/clear`,
} as const;

export const ORDER_ROUTES = {
  list: `${API_PREFIX}/orders`,
  detail: (id: string) => `${API_PREFIX}/orders/${id}`,
  status: (id: string) => `${API_PREFIX}/orders/${id}/status`,
  cancel: (id: string) => `${API_PREFIX}/orders/${id}/cancel`,
  all: `${API_PREFIX}/orders/all`,
} as const;

export const REVIEW_ROUTES = {
  list: (productId: string) => `${API_PREFIX}/reviews/product/${productId}`,
  base: `${API_PREFIX}/reviews`,
  detail: (id: string) => `${API_PREFIX}/reviews/${id}`,
  moderate: (id: string) => `${API_PREFIX}/reviews/${id}/moderate`,
} as const;

export const ADDRESS_ROUTES = {
  list: `${API_PREFIX}/users/me/addresses`,
  create: `${API_PREFIX}/users/me/addresses`,
  detail: (id: string) => `${API_PREFIX}/users/me/addresses/${id}`,
} as const;
