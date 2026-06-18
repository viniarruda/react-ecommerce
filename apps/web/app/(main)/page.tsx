"use client";

import Link from "next/link";
import { useProducts, useCategories } from "@react-shop/sdk";
import { formatPrice } from "@/lib/format";
import { branding } from "@/config/branding";

/* ── Price formatter ─────────────────────────────────────── */
const fmt = (n: number) => formatPrice(n, { minimumFractionDigits: 0 });

/* ── Marquee strip ───────────────────────────────────────── */
const MARQUEE_ITEMS = [
  "NEW ARRIVALS",
  "✦",
  `FREE SHIPPING OVER ${fmt(branding.shipping.freeShippingThreshold)}`,
  "✦",
  "EASY RETURNS",
  "✦",
  "CURATED COLLECTION",
  "✦",
  "NEW ARRIVALS",
  "✦",
  `FREE SHIPPING OVER ${fmt(branding.shipping.freeShippingThreshold)}`,
  "✦",
  "EASY RETURNS",
  "✦",
  "CURATED COLLECTION",
  "✦",
];

function MarqueeBar({ inverted = false }: { inverted?: boolean }) {
  return (
    <div
      className={`overflow-hidden py-3 border-y ${
        inverted
          ? "bg-[color:var(--color-primary-600)] border-[color:var(--color-primary-700)] text-white"
          : "bg-[color:var(--shop-surface)] border-[color:var(--shop-border)] text-[color:var(--shop-muted)]"
      }`}
    >
      <div className="animate-marquee whitespace-nowrap text-xs tracking-[0.18em] font-medium uppercase">
        {MARQUEE_ITEMS.map((item, i) => (
          <span key={i} className="mx-6">{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Product card ────────────────────────────────────────── */
function ShopProductCard({
  id,
  title,
  price,
  comparePrice,
  image,
  isFeatured,
  brand,
  size = "default",
}: {
  id: string;
  title: string;
  price: number;
  comparePrice?: number | null;
  image: string;
  isFeatured: boolean;
  brand?: string | null;
  size?: "default" | "large";
}) {
  const hasDiscount = comparePrice && comparePrice > price;
  const discount = hasDiscount
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;

  return (
    <Link href={`/products/${id}`} className="group block shop-card">
      <div className="relative overflow-hidden rounded-lg bg-[color:var(--shop-overlay)] aspect-[4/5]">
        <img
          src={image}
          alt={title}
          className="shop-card-img w-full h-full object-cover"
        />
        {isFeatured && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.14em] uppercase bg-[color:var(--color-primary-600)] text-white px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-3 right-3 text-[10px] font-semibold bg-black text-white px-2.5 py-1 rounded-full">
            −{discount}%
          </span>
        )}
      </div>
      <div className="mt-3 px-0.5">
        {brand && (
          <p className="text-[10px] tracking-[0.14em] uppercase text-[color:var(--shop-muted)] mb-0.5">
            {brand}
          </p>
        )}
        <h3
          className={`text-gray-900 dark:text-gray-100 leading-snug line-clamp-1 ${
            size === "large" ? "text-base font-medium" : "text-sm font-medium"
          }`}
        >
          {title}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-mono-price text-sm font-bold text-gray-900 dark:text-gray-100">
            {fmt(price)}
          </span>
          {hasDiscount && (
            <span className="font-mono-price text-xs text-[color:var(--shop-muted)] line-through">
              {fmt(comparePrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ── Skeleton card ───────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="rounded-lg bg-[color:var(--shop-overlay)] aspect-[4/5]" />
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-[color:var(--shop-overlay)] rounded w-4/5" />
        <div className="h-4 bg-[color:var(--shop-overlay)] rounded w-2/5" />
      </div>
    </div>
  );
}

/* ── Home page ───────────────────────────────────────────── */
export default function HomePage() {
  const { data: products, isLoading } = useProducts();
  const { data: categories } = useCategories();

  const featured = products?.filter((p) => p.isFeatured).slice(0, 4) ?? [];
  const recent = products?.slice(0, 8) ?? [];
  const displayProducts = featured.length >= 4 ? featured : recent;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--shop-bg)" }}>
      {/* ── Top marquee ── */}
      <MarqueeBar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-end">

            {/* Left: headline + CTA */}
            <div>
              <p className="anim-fade-up text-[11px] tracking-[0.22em] uppercase text-[color:var(--shop-muted)] mb-6">
                SS '26 — New Collection
              </p>

              <h1 className="anim-fade-up anim-delay-1 font-display leading-[0.88] text-gray-900 dark:text-gray-50 tracking-tight">
                <span className="block text-[clamp(3.5rem,9vw,8.5rem)] font-medium">
                  Discover
                </span>
                <span className="block text-[clamp(3.5rem,9vw,8.5rem)] font-extrabold -mt-1">
                  the Finest
                </span>
                <span className="block text-[clamp(3.5rem,9vw,8.5rem)] font-medium text-[color:var(--color-primary-600)] -mt-1">
                  Products.
                </span>
              </h1>

              <div className="anim-fade-up anim-delay-2 flex flex-wrap items-center gap-6 mt-10">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-4 text-sm font-semibold tracking-[0.1em] uppercase rounded-full hover:bg-[color:var(--color-primary-600)] dark:hover:bg-[color:var(--color-primary-500)] transition-colors duration-300"
                >
                  Explore Collection
                  <span className="text-base">→</span>
                </Link>
                {products && (
                  <span className="font-mono-price text-xs text-[color:var(--shop-muted)]">
                    {products.length} products from {products.length > 0 ? fmt(Math.min(...products.map((p) => p.price))) : "$0"}
                  </span>
                )}
              </div>
            </div>

            {/* Right: stats column */}
            <div className="anim-fade-up anim-delay-3 hidden lg:flex flex-col items-end gap-8 pb-2">
              {[
                { label: "Products", value: products?.length ?? "—" },
                { label: "Categories", value: categories?.length ?? "—" },
                { label: "Free Returns", value: "30d" },
              ].map(({ label, value }) => (
                <div key={label} className="text-right">
                  <p className="font-mono-price text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {value}
                  </p>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--shop-muted)] mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-6 md:mx-12 lg:mx-20 border-t border-[color:var(--shop-border)]" />

      {/* ── FEATURED PRODUCTS ────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto">

          {/* Section header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--shop-muted)] mb-2">
                Handpicked for you
              </p>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold text-gray-900 dark:text-gray-50 leading-tight">
                {featured.length > 0 ? "Featured" : "New Arrivals"}
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs tracking-[0.14em] uppercase font-semibold text-[color:var(--shop-muted)] hover:text-[color:var(--color-primary-600)] transition-colors border-b border-transparent hover:border-[color:var(--color-primary-600)] pb-0.5"
            >
              View all →
            </Link>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
              {displayProducts.map((p) => (
                <ShopProductCard
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
          ) : (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-[color:var(--shop-muted)] italic">
                Products coming soon
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Gold marquee ── */}
      <MarqueeBar inverted />

      {/* ── CATEGORIES ───────────────────────────────────── */}
      {categories && categories.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--shop-muted)] mb-6">
              Browse by category
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="px-5 py-2.5 rounded-full border border-[color:var(--shop-border)] text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-[color:var(--color-primary-600)] hover:text-[color:var(--color-primary-600)] transition-colors bg-[color:var(--shop-surface)]"
              >
                All Products
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  className="px-5 py-2.5 rounded-full border border-[color:var(--shop-border)] text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-[color:var(--color-primary-600)] hover:text-[color:var(--color-primary-600)] transition-colors bg-[color:var(--shop-surface)]"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEWSLETTER CTA ───────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <div
            className="rounded-2xl px-8 md:px-16 py-14 md:py-20 text-center"
            style={{ backgroundColor: "var(--shop-surface)", border: "1px solid var(--shop-border)" }}
          >
            <p className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--shop-muted)] mb-4">
              Stay in the loop
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-gray-900 dark:text-gray-50 mb-2">
              Join the community
            </h2>
            <p className="text-sm text-[color:var(--shop-muted)] mb-8 max-w-sm mx-auto">
              Get early access to new arrivals, exclusive offers, and curated picks delivered to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-bg)] text-sm text-gray-900 dark:text-gray-100 placeholder:text-[color:var(--shop-muted)] focus:outline-none focus:border-[color:var(--color-primary-600)] transition-colors"
              />
              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-semibold tracking-[0.08em] hover:bg-[color:var(--color-primary-600)] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
