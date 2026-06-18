"use client";

import Link from "next/link";
import { useProducts } from "@react-shop/sdk";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);

export default function NewArrivalsPage() {
  const { data: products, isLoading } = useProducts();
  const newArrivals = [...(products ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 12);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--shop-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-16">
        <p className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--shop-muted)] mb-2">Just dropped</p>
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold text-gray-900 dark:text-gray-50 mb-10 leading-tight">
          New Arrivals
        </h1>

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <div className="rounded-xl bg-[color:var(--shop-overlay)] aspect-[3/4]" />
                <div className="mt-3 space-y-2">
                  <div className="h-3 bg-[color:var(--shop-overlay)] rounded w-4/5" />
                  <div className="h-4 bg-[color:var(--shop-overlay)] rounded w-2/5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && newArrivals.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-display text-3xl text-[color:var(--shop-muted)] italic mb-4">Coming soon</p>
            <Link href="/products" className="text-sm text-[color:var(--color-primary-600)] font-semibold">Browse all products →</Link>
          </div>
        )}

        {!isLoading && newArrivals.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
            {newArrivals.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group block shop-card">
                <div className="relative overflow-hidden rounded-xl bg-[color:var(--shop-overlay)] aspect-[3/4]">
                  <img src={p.images?.[0]?.url ?? "/placeholder-product.jpg"} alt={p.title} className="shop-card-img w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 text-[10px] font-semibold bg-gray-900 text-white px-2.5 py-1 rounded-full">New</span>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{p.title}</h3>
                  <span className="font-mono-price text-sm font-bold text-gray-900 dark:text-gray-100 mt-1 block">{fmt(p.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
