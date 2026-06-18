"use client";

import { useState } from "react";
import { useAddToCart, type Product } from "@react-shop/sdk";
import { useGuestCart } from "@/app/providers/GuestCartProvider";

interface AddToCartButtonProps {
  productId: string;
  variantId: string | null;
  stock: number;
  isAuthenticated: boolean;
  product?: Pick<Product, "title" | "price" | "images">;
  variantName?: string;
}

export function AddToCartButton({
  productId,
  variantId,
  stock,
  isAuthenticated,
  product,
  variantName,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { mutate: addToServerCart, isPending } = useAddToCart();
  const guestCart = useGuestCart();

  const handleAdd = () => {
    if (isAuthenticated) {
      addToServerCart(
        { productId, variantId, quantity },
        {
          onSuccess: () => {
            setJustAdded(true);
            setTimeout(() => setJustAdded(false), 2000);
          },
        }
      );
    } else {
      guestCart.addItem({
        productId,
        variantId,
        quantity,
        title: product?.title ?? "Product",
        price: product?.price ?? 0,
        image: product?.images?.[0]?.url ?? "/placeholder-product.jpg",
        variantName,
      });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  if (stock === 0) {
    return (
      <button disabled className="w-full py-4 rounded-full bg-[color:var(--shop-overlay)] border border-[color:var(--shop-border)] text-sm font-semibold tracking-[0.08em] uppercase text-[color:var(--shop-muted)] cursor-not-allowed">
        Out of Stock
      </button>
    );
  }

  return (
    <div className="flex gap-3">
      <div
        className="flex items-center rounded-full border border-[color:var(--shop-border)]"
        style={{ backgroundColor: "var(--shop-surface)" }}
      >
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="w-11 h-11 flex items-center justify-center text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="min-w-[2rem] text-center text-sm font-semibold text-gray-900 dark:text-gray-100 font-mono-price">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
          className="w-11 h-11 flex items-center justify-center text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAdd}
        disabled={isPending}
        className={`flex-1 py-3 rounded-full text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${
          justAdded
            ? "bg-green-600 text-white"
            : "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-[color:var(--color-primary-600)] dark:hover:bg-[color:var(--color-primary-500)]"
        } disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {isPending ? "Adding…" : justAdded ? "✓ Added" : "Add to Cart"}
      </button>
    </div>
  );
}
