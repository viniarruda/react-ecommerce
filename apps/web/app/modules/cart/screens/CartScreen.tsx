"use client";

import Link from "next/link";
import { Heading, Text, Button, Card, Skeleton, PriceDisplay } from "@react-shop/design-system";
import { useCart, useClearCart, useMe } from "@react-shop/sdk";
import { useGuestCart } from "@/app/providers/GuestCartProvider";
import { CartItemRow } from "../components";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

/* ── Guest cart view ─────────────────────────────────────── */
function GuestCartScreen() {
  const { items, updateItem, removeItem, clear, subtotal, itemCount } = useGuestCart();

  if (items.length === 0) {
    return (
      <EmptyCart />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Heading as="h1" size="3xl">Shopping Cart</Heading>
        <Button variant="ghost" size="sm" onClick={clear}>Clear Cart</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card padding="md">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <Text weight="medium" className="truncate block">{item.title}</Text>
                  {item.variantName && <Text size="sm" color="secondary">{item.variantName}</Text>}
                  <PriceDisplay price={item.price} size="sm" className="mt-1" />
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <button onClick={() => updateItem(item.productId, item.variantId, item.quantity - 1)} className="px-2 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 transition-colors">−</button>
                      <span className="px-2 py-1 text-sm font-medium min-w-[1.5rem] text-center">{item.quantity}</span>
                      <button onClick={() => updateItem(item.productId, item.variantId, item.quantity + 1)} className="px-2 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 transition-colors">+</button>
                    </div>
                    <button onClick={() => removeItem(item.productId, item.variantId)} className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <PriceDisplay price={item.price * item.quantity} size="md" />
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div>
          <Card padding="lg" className="sticky top-4">
            <Heading as="h3" size="xl" className="mb-4">Order Summary</Heading>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <Text color="secondary">Subtotal ({itemCount} items)</Text>
                <Text weight="semibold">{fmt(subtotal)}</Text>
              </div>
              <div className="flex justify-between">
                <Text color="secondary">Shipping</Text>
                <Text size="sm" className="text-green-600 font-medium">Free</Text>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
              <div className="flex justify-between">
                <Text weight="semibold" size="lg">Total</Text>
                <Text weight="semibold" size="lg">{fmt(subtotal)}</Text>
              </div>
            </div>
            <Link href="/login?redirect=/checkout">
              <Button variant="solid" size="lg" fullWidth>
                Sign in to Checkout
              </Button>
            </Link>
            <p className="text-xs text-center text-gray-400 mt-3">
              Sign in to complete your purchase
            </p>
            <Link href="/products" className="block mt-3 text-center">
              <Text size="sm" className="text-primary-600 hover:text-primary-700">
                Continue Shopping
              </Text>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ── Authenticated cart view ─────────────────────────────── */
function AuthCartScreen() {
  const { data: cart, isLoading } = useCart();
  const { mutate: clearCart, isPending: clearing } = useClearCart();

  if (isLoading) {
    return (
      <div>
        <Skeleton variant="text" className="h-8 w-1/4 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" className="h-24 rounded-lg" />
            ))}
          </div>
          <Skeleton variant="rectangular" className="h-64 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) return <EmptyCart />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Heading as="h1" size="3xl">Shopping Cart</Heading>
        <Button variant="ghost" size="sm" onClick={() => clearCart()} disabled={clearing}>
          {clearing ? "Clearing..." : "Clear Cart"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card padding="md">
            {cart.items.map((item) => <CartItemRow key={item.id} item={item} />)}
          </Card>
        </div>
        <div>
          <Card padding="lg" className="sticky top-4">
            <Heading as="h3" size="xl" className="mb-4">Order Summary</Heading>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <Text color="secondary">Subtotal</Text>
                <PriceDisplay price={cart.subtotal} size="sm" />
              </div>
              <div className="flex justify-between">
                <Text color="secondary">Tax</Text>
                <PriceDisplay price={cart.tax} size="sm" />
              </div>
              <div className="flex justify-between">
                <Text color="secondary">Shipping</Text>
                <Text size="sm" className="text-green-600 font-medium">Free</Text>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
              <div className="flex justify-between">
                <Text weight="semibold" size="lg">Total</Text>
                <PriceDisplay price={cart.total} size="lg" />
              </div>
            </div>
            <Link href="/checkout">
              <Button variant="solid" size="lg" fullWidth>Proceed to Checkout</Button>
            </Link>
            <Link href="/products" className="block mt-3 text-center">
              <Text size="sm" className="text-primary-600 hover:text-primary-700">Continue Shopping</Text>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div>
      <Heading as="h1" size="3xl" className="mb-6">Shopping Cart</Heading>
      <Card variant="outline" padding="lg" className="text-center">
        <Text size="xl" className="mb-2">Your cart is empty</Text>
        <Text color="secondary" className="mb-6">Looks like you haven't added anything yet.</Text>
        <Link href="/products">
          <Button variant="solid" size="lg">Browse Products</Button>
        </Link>
      </Card>
    </div>
  );
}

/* ── Root ────────────────────────────────────────────────── */
export function CartScreen() {
  const { data: user } = useMe();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--shop-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-10">
        {user ? <AuthCartScreen /> : <GuestCartScreen />}
      </div>
    </div>
  );
}
