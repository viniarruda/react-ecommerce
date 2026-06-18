"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useProducts, useCategories } from "@react-shop/sdk";
import type { SortOption } from "../components";
import { formatPrice } from "@/lib/format";
import { branding } from "@/config/branding";

const fmt = (n: number) => formatPrice(n, { minimumFractionDigits: 0 });

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest",
  "price-asc": "Price: Low → High",
  "price-desc": "Price: High → Low",
  "name-asc": "Name A–Z",
};

function ProductCard({
  id, title, price, comparePrice, image, isFeatured, brand,
}: {
  id: string; title: string; price: number; comparePrice?: number | null;
  image: string; isFeatured: boolean; brand?: string | null;
}) {
  const hasDiscount = comparePrice && comparePrice > price;
  const discount = hasDiscount ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  return (
    <Link href={`/products/${id}`} className="group block shop-card">
      <div className="relative overflow-hidden rounded-xl bg-[color:var(--shop-overlay)] aspect-[3/4]">
        <img src={image} alt={title} className="shop-card-img w-full h-full object-cover" />
        {isFeatured && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.14em] uppercase bg-[color:var(--color-primary-600)] text-white px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-3 right-3 text-[10px] font-bold bg-gray-900 text-white px-2.5 py-1 rounded-full">
            −{discount}%
          </span>
        )}
      </div>
      <div className="mt-3">
        {brand && (
          <p className="text-[10px] tracking-[0.14em] uppercase text-[color:var(--shop-muted)] mb-0.5">{brand}</p>
        )}
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1 leading-snug">{title}</h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-mono-price text-sm font-bold text-gray-900 dark:text-gray-100">{fmt(price)}</span>
          {hasDiscount && (
            <span className="font-mono-price text-xs text-[color:var(--shop-muted)] line-through">{fmt(comparePrice!)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="rounded-xl bg-[color:var(--shop-overlay)] aspect-[3/4]" />
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-[color:var(--shop-overlay)] rounded w-4/5" />
        <div className="h-4 bg-[color:var(--shop-overlay)] rounded w-2/5" />
      </div>
    </div>
  );
}

export function ProductListScreen() {
  const { data: products, isLoading, error } = useProducts();
  const { data: categories } = useCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!products) return [];
    let result = [...products];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      result = result.filter((p) => p.categories?.some((c) => c.id === selectedCategory));
    }
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "name-asc": result.sort((a, b) => a.title.localeCompare(b.title, branding.locale.language)); break;
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--shop-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        {/* ── Page header ── */}
        <div className="pt-12 pb-8 border-b border-[color:var(--shop-border)]">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--shop-muted)] mb-2">
            {branding.store.name} Store
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold text-gray-900 dark:text-gray-50 leading-tight">
            All Products
          </h1>
        </div>

        {/* ── Filter bar ── */}
        <div className="py-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between border-b border-[color:var(--shop-border)]">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--shop-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[color:var(--shop-surface)] border border-[color:var(--shop-border)] rounded-full text-gray-900 dark:text-gray-100 placeholder:text-[color:var(--shop-muted)] focus:outline-none focus:border-[color:var(--color-primary-600)] transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Category pills */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-[0.1em] uppercase transition-colors ${
                  selectedCategory === ""
                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                    : "bg-[color:var(--shop-surface)] border border-[color:var(--shop-border)] text-[color:var(--shop-muted)] hover:border-gray-400"
                }`}
              >
                All
              </button>
              {categories?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-[0.1em] uppercase transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-[color:var(--color-primary-600)] text-white"
                      : "bg-[color:var(--shop-surface)] border border-[color:var(--shop-border)] text-[color:var(--shop-muted)] hover:border-gray-400"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[color:var(--shop-surface)] border border-[color:var(--shop-border)] text-xs font-semibold text-gray-700 dark:text-gray-200 hover:border-gray-400 transition-colors"
              >
                <span>{SORT_LABELS[sortBy]}</span>
                <svg className={`w-3.5 h-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[color:var(--shop-surface)] border border-[color:var(--shop-border)] rounded-xl shadow-lg z-20 overflow-hidden">
                  {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors ${
                        sortBy === opt
                          ? "bg-[color:var(--color-primary-50)] dark:bg-[color:var(--color-primary-900)] text-[color:var(--color-primary-700)] dark:text-[color:var(--color-primary-300)]"
                          : "text-gray-700 dark:text-gray-200 hover:bg-[color:var(--shop-overlay)]"
                      }`}
                    >
                      {SORT_LABELS[opt]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Result count ── */}
        <div className="py-4">
          <p className="text-[11px] tracking-[0.14em] uppercase text-[color:var(--shop-muted)]">
            {isLoading ? "Loading…" : `${filtered.length} ${filtered.length === 1 ? "product" : "products"}`}
          </p>
        </div>

        {/* ── Grid ── */}
        {error && (
          <div className="py-10 text-center">
            <p className="text-sm text-red-500">Failed to load products. Please try again.</p>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 pb-20">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)}
          </div>
        )}

        {!isLoading && filtered.length === 0 && !error && (
          <div className="py-24 text-center">
            <p className="font-display text-3xl text-[color:var(--shop-muted)] italic mb-3">
              Nothing found
            </p>
            <p className="text-sm text-[color:var(--shop-muted)]">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        {!isLoading && filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 pb-20">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                title={p.title}
                price={p.price}
                comparePrice={p.comparePrice}
                image={p.images?.[0]?.url ?? "/placeholder-product.jpg"}
                isFeatured={p.isFeatured}
                brand={p.brand}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
