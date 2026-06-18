"use client";

import { useState } from "react";
import Link from "next/link";
import { useProduct, useMe } from "@react-shop/sdk";
import { ImageGallery, VariantSelector, ReviewList, AddToCartButton } from "../components";
import { formatPrice } from "@/lib/format";

const fmt = (n: number) => formatPrice(n);

interface Props { productId: string }

export function ProductDetailScreen({ productId }: Props) {
  const { data: product, isLoading, error } = useProduct(productId);
  const { data: user } = useMe();
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  const selectedVariant = product?.variants?.find((v) => v.id === selectedVariantId) ?? null;
  const displayPrice = selectedVariant?.price ?? product?.price ?? 0;
  const displayCompare = selectedVariant?.comparePrice ?? product?.comparePrice ?? undefined;
  const hasDiscount = displayCompare && displayCompare > displayPrice;
  const discount = hasDiscount ? Math.round(((displayCompare - displayPrice) / displayCompare) * 100) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen animate-pulse" style={{ backgroundColor: "var(--shop-bg)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="rounded-2xl bg-[color:var(--shop-overlay)] aspect-square" />
            <div className="space-y-5 pt-4">
              <div className="h-3 bg-[color:var(--shop-overlay)] rounded w-1/4" />
              <div className="h-12 bg-[color:var(--shop-overlay)] rounded w-4/5" />
              <div className="h-8 bg-[color:var(--shop-overlay)] rounded w-1/3" />
              <div className="space-y-2 pt-4">
                <div className="h-4 bg-[color:var(--shop-overlay)] rounded" />
                <div className="h-4 bg-[color:var(--shop-overlay)] rounded w-5/6" />
              </div>
              <div className="h-14 bg-[color:var(--shop-overlay)] rounded-full mt-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--shop-bg)" }}>
        <div className="text-center">
          <p className="font-display text-5xl italic text-[color:var(--shop-muted)] mb-4">Not found</p>
          <Link href="/products" className="text-sm text-[color:var(--color-primary-600)] font-semibold">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const stock = selectedVariant?.quantity ?? product.inventory;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--shop-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        {/* ── Breadcrumb ── */}
        <div className="py-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[color:var(--shop-muted)]">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100 truncate max-w-[200px]">{product.title}</span>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 pb-16">

          {/* ── Left: image gallery ── */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <ImageGallery images={product.images ?? []} title={product.title} />
          </div>

          {/* ── Right: product info ── */}
          <div className="flex flex-col gap-6">

            {/* Brand + badges */}
            <div className="flex items-center gap-3">
              {product.brand && (
                <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[color:var(--shop-muted)]">
                  {product.brand}
                </span>
              )}
              {product.isFeatured && (
                <span className="text-[10px] tracking-[0.14em] uppercase bg-[color:var(--color-primary-600)] text-white px-2.5 py-1 rounded-full font-semibold">
                  Featured
                </span>
              )}
              {!product.isActive && (
                <span className="text-[10px] tracking-[0.14em] uppercase bg-gray-200 dark:bg-gray-700 text-gray-500 px-2.5 py-1 rounded-full font-semibold">
                  Unavailable
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold text-gray-900 dark:text-gray-50 leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-mono-price text-3xl font-bold text-gray-900 dark:text-gray-100">
                {fmt(displayPrice)}
              </span>
              {hasDiscount && (
                <>
                  <span className="font-mono-price text-lg text-[color:var(--shop-muted)] line-through">
                    {fmt(displayCompare!)}
                  </span>
                  <span className="text-xs font-bold tracking-[0.1em] bg-[color:var(--color-primary-100)] dark:bg-[color:var(--color-primary-900)] text-[color:var(--color-primary-700)] dark:text-[color:var(--color-primary-300)] px-2.5 py-1 rounded-full">
                    −{discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-[color:var(--shop-border)]" />

            {/* Description */}
            {product.description && (
              <p className="text-base text-[color:var(--shop-muted)] leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Variants */}
            {(product.variants?.length ?? 0) > 0 && (
              <VariantSelector
                variants={product.variants ?? []}
                selectedVariantId={selectedVariantId}
                onSelect={setSelectedVariantId}
              />
            )}

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-xs font-medium text-[color:var(--shop-muted)]">
                {stock > 10 ? "In Stock" : stock > 0 ? `Only ${stock} left` : "Out of Stock"}
              </span>
              {product.sku && (
                <span className="text-xs text-[color:var(--shop-muted)] ml-3 font-mono-price">
                  SKU: {product.sku}
                </span>
              )}
            </div>

            {/* Add to cart */}
            <div className="pt-2">
              <AddToCartButton
                productId={product.id}
                variantId={selectedVariantId}
                stock={stock}
                isAuthenticated={!!user}
                product={product}
                variantName={selectedVariant?.name}
              />
            </div>

            {/* Perks */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: "🚚", label: "Free shipping", sub: "Over $50" },
                { icon: "↩", label: "Easy returns", sub: "30 days" },
                { icon: "🔒", label: "Secure checkout", sub: "256-bit SSL" },
              ].map(({ icon, label, sub }) => (
                <div
                  key={label}
                  className="text-center p-3 rounded-xl"
                  style={{ backgroundColor: "var(--shop-surface)", border: "1px solid var(--shop-border)" }}
                >
                  <div className="text-xl mb-1">{icon}</div>
                  <p className="text-[10px] font-semibold text-gray-700 dark:text-gray-200 leading-tight">{label}</p>
                  <p className="text-[10px] text-[color:var(--shop-muted)]">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Reviews ── */}
        <div className="border-t border-[color:var(--shop-border)] py-16">
          <ReviewList productId={productId} isAuthenticated={!!user} />
        </div>
      </div>
    </div>
  );
}
