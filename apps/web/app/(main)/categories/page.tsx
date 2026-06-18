"use client";

import Link from "next/link";
import { useCategories } from "@react-shop/sdk";

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--shop-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-16">
        <p className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--shop-muted)] mb-2">Browse</p>
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold text-gray-900 dark:text-gray-50 mb-10 leading-tight">
          Categories
        </h1>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-[color:var(--shop-overlay)]" />
            ))}
          </div>
        )}

        {!isLoading && (!categories || categories.length === 0) && (
          <div className="py-24 text-center">
            <p className="font-display text-3xl text-[color:var(--shop-muted)] italic">No categories yet</p>
          </div>
        )}

        {!isLoading && categories && categories.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  className="group relative overflow-hidden rounded-2xl p-8 flex flex-col justify-end min-h-[160px] border border-[color:var(--shop-border)] shop-card"
                  style={{ backgroundColor: "var(--shop-surface)" }}
                >
                  <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-[color:var(--color-primary-600)] transition-colors">
                    {cat.name}
                  </h2>
                  {cat.description && (
                    <p className="text-sm text-[color:var(--shop-muted)] mt-1 line-clamp-2">{cat.description}</p>
                  )}
                  <span className="mt-3 text-xs font-semibold tracking-[0.14em] uppercase text-[color:var(--color-primary-600)] group-hover:underline">
                    Browse →
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/products" className="text-sm font-semibold text-[color:var(--shop-muted)] hover:text-[color:var(--color-primary-600)] transition-colors">
                View all products →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
