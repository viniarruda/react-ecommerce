import { branding } from "@/config/branding";

/**
 * Formats a number as a currency string using the store's configured
 * locale and currency (see `config/branding.ts`).
 *
 * Pass `options` to override defaults per call site, e.g.
 * `formatPrice(price, { minimumFractionDigits: 0 })` for whole-value lists.
 */
export function formatPrice(
  value: number,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(branding.locale.language, {
    style: "currency",
    currency: branding.locale.currency,
    ...options,
  }).format(value);
}

/**
 * Formats a date using the store's configured locale.
 */
export function formatDate(
  value: string | number | Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Date(value).toLocaleDateString(branding.locale.language, options);
}
