"use client";

import { Text, PriceDisplay } from "@react-shop/design-system";
import { useUpdateCartItem, useRemoveFromCart } from "@react-shop/sdk";
import type { CartItem } from "@react-shop/sdk";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { mutate: updateItem, isPending: updating } = useUpdateCartItem();
  const { mutate: removeItem, isPending: removing } = useRemoveFromCart();

  const title = item.product?.title ?? "Product";
  const image = item.product?.images?.[0]?.url ?? "/placeholder-product.jpg";
  const variantName = item.variant?.name;

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
      <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <Text weight="medium" className="truncate block">
          {title}
        </Text>
        {variantName && (
          <Text size="sm" color="secondary">
            {variantName}
          </Text>
        )}
        <PriceDisplay price={item.price} size="sm" className="mt-1" />

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() =>
                updateItem({ cartItemId: item.id, quantity: item.quantity - 1 })
              }
              disabled={updating || item.quantity <= 1}
              className="px-2 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-40 transition-colors text-sm"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-2 py-1 text-sm font-medium min-w-[1.5rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateItem({ cartItemId: item.id, quantity: item.quantity + 1 })
              }
              disabled={updating}
              className="px-2 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-40 transition-colors text-sm"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            disabled={removing}
            className="text-sm text-error-600 hover:text-error-700 disabled:opacity-40 transition-colors"
          >
            {removing ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>

      <div className="flex-shrink-0 text-right">
        <PriceDisplay
          price={item.price * item.quantity}
          size="md"
        />
      </div>
    </div>
  );
}
